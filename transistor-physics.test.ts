/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  simulateBjt,
  simulateMosfet,
  testComponentJunction,
  calculateSmrLevel,
} from './transistor-physics';

test('BJT simulation correctly handles Cutoff (Corte) state', () => {
  const result = simulateBjt({
    type: 'NPN',
    vcc: 12,
    vin: 0.2, // Below 0.7V threshold
    rb: 10000,
    rc: 220,
    beta: 100,
  });

  assert.equal(result.region, 'corte');
  assert.equal(result.ibMicroAmps, 0);
  assert.equal(result.icMilliAmps, 0);
  assert.equal(result.vce, 12);
  assert.equal(result.isSwitchClosed, false);
  assert.equal(result.lampBrightnessPercent, 0);
});

test('BJT simulation correctly detects Saturation (Saturación) as a closed switch', () => {
  const result = simulateBjt({
    type: 'NPN',
    vcc: 12,
    vin: 5.0, // High base drive
    rb: 1000, // Low Rb -> high Ib
    rc: 220,
    beta: 150,
  });

  assert.equal(result.region, 'saturacion');
  assert.equal(result.isSwitchClosed, true);
  assert.equal(result.lampBrightnessPercent, 100);
  assert.equal(result.vce, 0.2); // Typical saturation voltage
  assert.ok(result.icMilliAmps > 50); // High collector current
});

test('BJT simulation handles Active (Activa/Lineal) amplification state', () => {
  const result = simulateBjt({
    type: 'NPN',
    vcc: 12,
    vin: 1.0, // (1.0 - 0.7) / 10000 = 30 uA
    rb: 10000,
    rc: 220,
    beta: 50, // Ic = 50 * 30 uA = 1.5 mA
  });

  assert.equal(result.region, 'activa');
  assert.equal(result.ibMicroAmps, 30);
  assert.equal(result.icMilliAmps, 1.5);
  assert.ok(result.vce < 12 && result.vce > 0.2);
});

test('MOSFET simulation differentiates Gate-Source threshold Vth', () => {
  const cutoff = simulateMosfet({
    type: 'N-Channel',
    vdd: 12,
    vgs: 1.5, // Below Vth 2.0
    vth: 2.0,
    rdson: 0.008,
    rLoad: 6,
  });
  assert.equal(cutoff.state, 'corte');
  assert.equal(cutoff.isOn, false);
  assert.equal(cutoff.fanSpeedRpm, 0);

  const conducting = simulateMosfet({
    type: 'N-Channel',
    vdd: 12,
    vgs: 5.0, // Above Vth
    vth: 2.0,
    rdson: 0.008,
    rLoad: 6,
    pwmPercent: 100,
  });
  assert.equal(conducting.isOn, true);
  assert.ok(conducting.fanSpeedRpm > 1500);
  assert.ok(conducting.vds < 1.0); // Low Vds due to low Rdson
});

test('Multimeter diode test identifies healthy BJT NPN junction', () => {
  const beForward = testComponentJunction('BJT_NPN', 'Base', 'Emitter');
  assert.equal(beForward.voltageDrop, 0.65);
  assert.equal(beForward.isConducting, true);

  const reverse = testComponentJunction('BJT_NPN', 'Emitter', 'Base');
  assert.equal(reverse.voltageDrop, 'OL');
  assert.equal(reverse.isConducting, false);
});

test('Multimeter diode test detects shorted MOSFET in VRM stage', () => {
  const shorted = testComponentJunction('MOSFET_N_SHORT', 'Drain', 'Source');
  assert.equal(shorted.isShortCircuit, true);
  assert.equal(shorted.voltageDrop, 0.01);
});

test('calculateSmrLevel computes progressive gamified tiers correctly', () => {
  assert.equal(calculateSmrLevel(50).level, 1);
  assert.equal(calculateSmrLevel(250).level, 2);
  assert.equal(calculateSmrLevel(600).level, 3);
});
