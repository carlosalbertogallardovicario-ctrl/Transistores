/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Zap,
  Sliders,
  Gauge,
  Activity,
  Flame,
  Lightbulb,
  Fan,
  Volume2,
  Info,
} from 'lucide-react';
import {
  simulateBjt,
  simulateMosfet,
  testComponentJunction,
  BjtType,
  MultimeterLead,
} from '../utils/transistor-physics';

interface CircuitSimulatorProps {
  onAddXp: (amount: number, reason: string) => void;
}

export const CircuitSimulator: React.FC<CircuitSimulatorProps> = ({ onAddXp }) => {
  const [activeModel, setActiveModel] = useState<'bjt' | 'mosfet'>('bjt');

  // BJT Simulation parameters
  const [bjtType, setBjtType] = useState<BjtType>('NPN');
  const [bjtVin, setBjtVin] = useState<number>(0.2); // Start at cutoff
  const [bjtVcc, setBjtVcc] = useState<number>(12);
  const [bjtRb, setBjtRb] = useState<number>(10000); // 10kΩ
  const [bjtRc, setBjtRc] = useState<number>(220); // 220Ω
  const [bjtBeta, setBjtBeta] = useState<number>(100);

  // MOSFET Simulation parameters
  const [mosfetVgs, setMosfetVgs] = useState<number>(1.2);
  const [mosfetVdd, setMosfetVdd] = useState<number>(12);
  const [mosfetVth, setMosfetVth] = useState<number>(2.5);
  const [mosfetRdson, setMosfetRdson] = useState<number>(0.006); // 6mΩ
  const [mosfetPwm, setMosfetPwm] = useState<number>(100);

  // Multimeter virtual bench
  const [multimeterMode, setMultimeterMode] = useState<'diode' | 'volts'>('diode');
  const [redLead, setRedLead] = useState<MultimeterLead>('Base');
  const [blackLead, setBlackLead] = useState<MultimeterLead>('Emitter');
  const [hasInteractedWithMeter, setHasInteractedWithMeter] = useState<boolean>(false);

  // Compute live physics
  const bjtState = useMemo(() => {
    return simulateBjt({
      type: bjtType,
      vcc: bjtVcc,
      vin: bjtVin,
      rb: bjtRb,
      rc: bjtRc,
      beta: bjtBeta,
    });
  }, [bjtType, bjtVcc, bjtVin, bjtRb, bjtRc, bjtBeta]);

  const mosfetState = useMemo(() => {
    return simulateMosfet({
      type: 'N-Channel',
      vdd: mosfetVdd,
      vgs: mosfetVgs,
      vth: mosfetVth,
      rdson: mosfetRdson,
      rLoad: 6, // 6Ω ventilator
      pwmPercent: mosfetPwm,
    });
  }, [mosfetVdd, mosfetVgs, mosfetVth, mosfetRdson, mosfetPwm]);

  // Multimeter calculation
  const multimeterResult = useMemo(() => {
    if (activeModel === 'bjt') {
      const compType = bjtType === 'NPN' ? 'BJT_NPN' : 'BJT_PNP';
      return testComponentJunction(compType, redLead, blackLead);
    } else {
      return testComponentJunction('MOSFET_N_GOOD', redLead, blackLead);
    }
  }, [activeModel, bjtType, redLead, blackLead]);

  const handleTestMeter = (red: MultimeterLead, black: MultimeterLead) => {
    setRedLead(red);
    setBlackLead(black);
    if (!hasInteractedWithMeter) {
      setHasInteractedWithMeter(true);
      onAddXp(25, 'Primera verificación con polímetro virtual');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Model Selector */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Laboratorio Virtual de Pruebas · 1º SMR
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Mapa Interactivo de Funcionamiento del Transistor
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Ajusta las variables de polarización en tiempo real y observa la respuesta de corrientes, caídas de tensión y estados de conmutación.
            </p>
          </div>

          {/* Model Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => {
                setActiveModel('bjt');
                setRedLead('Base');
                setBlackLead('Emitter');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
                activeModel === 'bjt'
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Transistor BJT (Bipolar)
            </button>
            <button
              onClick={() => {
                setActiveModel('mosfet');
                setRedLead('Gate');
                setBlackLead('Source');
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
                activeModel === 'mosfet'
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MOSFET Canal N (VRM / PWM)
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Zone: Circuit Schematic & Interactive Stage (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">
                {activeModel === 'bjt' ? 'Esquema de Conmutación BJT' : 'Etapa de Potencia MOSFET (Placa Base / FAN)'}
              </h2>
            </div>

            {/* Operating State Badge */}
            {activeModel === 'bjt' ? (
              <span
                className={`text-xs font-bold font-mono px-3 py-1 rounded-md uppercase tracking-wider ${
                  bjtState.region === 'corte'
                    ? 'bg-slate-100 text-slate-700 border border-slate-300'
                    : bjtState.region === 'activa'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                ● Estado: {bjtState.region}
              </span>
            ) : (
              <span
                className={`text-xs font-bold font-mono px-3 py-1 rounded-md uppercase tracking-wider ${
                  mosfetState.state === 'corte'
                    ? 'bg-slate-100 text-slate-700 border border-slate-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                ● {mosfetState.isOn ? 'En Conducción (ON)' : 'En Corte (OFF)'}
              </span>
            )}
          </div>

          {/* Interactive Circuit Canvas SVG */}
          <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800 text-slate-100 min-h-[300px] flex items-center justify-center overflow-hidden">
            {/* Animated particles / Current flow overlay */}
            <div className="w-full max-w-md">
              {activeModel === 'bjt' ? (
                <svg viewBox="0 0 400 240" className="w-full h-auto select-none" role="img" aria-label="Simulador BJT">
                  {/* Grid background */}
                  <defs>
                    <pattern id="circ-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="240" fill="url(#circ-grid)" />

                  {/* VCC Rail Top */}
                  <line x1="60" y1="30" x2="280" y2="30" stroke="#ef4444" strokeWidth="3" />
                  <circle cx="280" cy="30" r="4" fill="#ef4444" />
                  <text x="60" y="22" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">+{bjtVcc}V V_CC</text>

                  {/* Ground Rail Bottom */}
                  <line x1="60" y1="210" x2="340" y2="210" stroke="#64748b" strokeWidth="3" />
                  <line x1="220" y1="210" x2="220" y2="225" stroke="#64748b" strokeWidth="3" />
                  <line x1="210" y1="225" x2="230" y2="225" stroke="#64748b" strokeWidth="3" />
                  <line x1="214" y1="229" x2="226" y2="229" stroke="#64748b" strokeWidth="2" />
                  <text x="238" y="226" fill="#64748b" fontSize="11" fontFamily="monospace">GND (0V)</text>

                  {/* Base circuit (Left to Center) */}
                  <text x="30" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">Vin: {bjtVin.toFixed(2)}V</text>
                  <line x1="80" y1="120" x2="120" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                  {/* Resistor Rb */}
                  <rect x="120" y="112" width="36" height="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
                  <text x="124" y="124" fill="#94a3b8" fontSize="9" fontFamily="monospace">{bjtRb / 1000}k</text>
                  <line x1="156" y1="120" x2="190" y2="120" stroke="#f8fafc" strokeWidth="2.5" />

                  {/* Load (Lamp) in Collector line */}
                  <line x1="220" y1="30" x2="220" y2="60" stroke="#ef4444" strokeWidth="2.5" />
                  {/* Bulb circle */}
                  <circle
                    cx="220"
                    cy="75"
                    r="15"
                    fill={bjtState.lampBrightnessPercent > 0 ? '#fef08a' : '#334155'}
                    stroke={bjtState.lampBrightnessPercent > 0 ? '#eab308' : '#64748b'}
                    strokeWidth="2"
                    style={{
                      filter: bjtState.lampBrightnessPercent > 20
                        ? `drop-shadow(0 0 ${Math.min(20, bjtState.lampBrightnessPercent / 4)}px #facc15)`
                        : 'none',
                      opacity: Math.max(0.3, bjtState.lampBrightnessPercent / 100),
                    }}
                  />
                  <text x="245" y="79" fill="#facc15" fontSize="10" fontFamily="monospace">Carga ({bjtRc}Ω)</text>
                  <line x1="220" y1="90" x2="220" y2="105" stroke="#f8fafc" strokeWidth="2.5" />

                  {/* Transistor Symbol in Center */}
                  <circle cx="210" cy="120" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  {/* Base bar */}
                  <line x1="195" y1="104" x2="195" y2="136" stroke="#38bdf8" strokeWidth="3" />
                  {/* Collector branch */}
                  <line x1="196" y1="112" x2="220" y2="105" stroke="#f8fafc" strokeWidth="2.5" />
                  {/* Emitter branch with arrow */}
                  <line x1="196" y1="128" x2="220" y2="135" stroke="#f8fafc" strokeWidth="2.5" />
                  <polygon
                    points={bjtType === 'NPN' ? '216,131 222,137 212,137' : '204,124 200,131 209,130'}
                    fill="#22c55e"
                  />
                  <line x1="220" y1="135" x2="220" y2="210" stroke="#f8fafc" strokeWidth="2.5" />

                  {/* Probe test points */}
                  <circle cx="175" cy="120" r="4" fill="#38bdf8" />
                  <text x="165" y="112" fill="#38bdf8" fontSize="9" fontFamily="monospace">TP_B</text>

                  <circle cx="220" cy="98" r="4" fill="#f59e0b" />
                  <text x="228" y="102" fill="#f59e0b" fontSize="9" fontFamily="monospace">TP_C</text>

                  <circle cx="220" cy="160" r="4" fill="#22c55e" />
                  <text x="228" y="164" fill="#22c55e" fontSize="9" fontFamily="monospace">TP_E</text>

                  {/* Flow animation line if conducting */}
                  {bjtState.icMilliAmps > 0 && (
                    <line
                      x1="220"
                      y1="35"
                      x2="220"
                      y2="205"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  )}
                </svg>
              ) : (
                <svg viewBox="0 0 400 240" className="w-full h-auto select-none" role="img" aria-label="Simulador MOSFET">
                  <rect width="400" height="240" fill="#090d16" />
                  {/* 12V Rail */}
                  <line x1="60" y1="30" x2="340" y2="30" stroke="#ef4444" strokeWidth="3" />
                  <text x="345" y="34" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace">+12V (ATX)</text>

                  {/* Ground */}
                  <line x1="60" y1="210" x2="340" y2="210" stroke="#64748b" strokeWidth="3" />
                  <text x="240" y="225" fill="#64748b" fontSize="11" fontFamily="monospace">GND</text>

                  {/* Fan Motor in Drain line */}
                  <line x1="220" y1="30" x2="220" y2="60" stroke="#ef4444" strokeWidth="2.5" />
                  <rect x="200" y="60" width="40" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="206" y="78" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">FAN PC</text>
                  <line x1="220" y1="90" x2="220" y2="105" stroke="#f8fafc" strokeWidth="2.5" />

                  {/* MOSFET Symbol */}
                  <circle cx="210" cy="125" r="28" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  {/* Gate line */}
                  <line x1="80" y1="125" x2="190" y2="125" stroke="#38bdf8" strokeWidth="2.5" />
                  <line x1="190" y1="110" x2="190" y2="140" stroke="#38bdf8" strokeWidth="3" />
                  {/* Channel ticks */}
                  <line x1="196" y1="110" x2="196" y2="118" stroke="#10b981" strokeWidth="3" />
                  <line x1="196" y1="121" x2="196" y2="129" stroke="#10b981" strokeWidth="3" />
                  <line x1="196" y1="132" x2="196" y2="140" stroke="#10b981" strokeWidth="3" />

                  {/* Drain & Source */}
                  <line x1="196" y1="114" x2="220" y2="105" stroke="#f8fafc" strokeWidth="2.5" />
                  <line x1="196" y1="136" x2="220" y2="145" stroke="#f8fafc" strokeWidth="2.5" />
                  <line x1="220" y1="145" x2="220" y2="210" stroke="#f8fafc" strokeWidth="2.5" />

                  {/* Gate Voltage indicator */}
                  <text x="40" y="118" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">V_GS: {mosfetVgs.toFixed(2)}V</text>
                  <text x="40" y="134" fill="#94a3b8" fontSize="9" fontFamily="monospace">(Umbral: {mosfetVth}V)</text>

                  {/* Flow arrow if conducting */}
                  {mosfetState.isOn && (
                    <line
                      x1="220"
                      y1="35"
                      x2="220"
                      y2="205"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  )}
                </svg>
              )}
            </div>

            {/* Load visual widget (Bulb or PC Fan) */}
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3 flex flex-col items-center">
              {activeModel === 'bjt' ? (
                <>
                  <Lightbulb
                    className="w-8 h-8 transition-colors duration-200"
                    style={{
                      color: bjtState.lampBrightnessPercent > 10 ? '#facc15' : '#64748b',
                      filter: bjtState.lampBrightnessPercent > 20
                        ? `drop-shadow(0 0 10px #facc15)`
                        : 'none',
                    }}
                  />
                  <span className="text-2xs font-mono font-bold mt-1 text-slate-200">
                    Brillo: {bjtState.lampBrightnessPercent}%
                  </span>
                </>
              ) : (
                <>
                  <Fan
                    className={`w-8 h-8 text-emerald-400 ${
                      mosfetState.fanSpeedRpm > 0 ? 'animate-spin' : ''
                    }`}
                    style={{
                      animationDuration: mosfetState.fanSpeedRpm > 0
                        ? `${Math.max(0.1, 3000 / mosfetState.fanSpeedRpm)}s`
                        : '0s',
                    }}
                  />
                  <span className="text-2xs font-mono font-bold mt-1 text-emerald-300">
                    {mosfetState.fanSpeedRpm} RPM
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Real-time Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeModel === 'bjt' ? (
              <>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Corriente Base (I_B)</div>
                  <div className="text-sm font-bold font-mono text-sky-800 tabular-nums">
                    {bjtState.ibMicroAmps} µA
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Corriente Colector (I_C)</div>
                  <div className="text-sm font-bold font-mono text-emerald-800 tabular-nums">
                    {bjtState.icMilliAmps} mA
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Tensión Colector-Emisor (V_CE)</div>
                  <div className="text-sm font-bold font-mono text-amber-800 tabular-nums">
                    {bjtState.vce} V
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Disipación Térmica</div>
                  <div className="text-sm font-bold font-mono text-rose-800 tabular-nums flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-500 inline" />
                    <span>{(bjtState.powerDissipatedWatts * 1000).toFixed(1)} mW</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Corriente Drenador (I_D)</div>
                  <div className="text-sm font-bold font-mono text-emerald-800 tabular-nums">
                    {(mosfetState.idMilliAmps / 1000).toFixed(2)} A
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Caída V_DS</div>
                  <div className="text-sm font-bold font-mono text-sky-800 tabular-nums">
                    {(mosfetState.vds * 1000).toFixed(1)} mV
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Resistencia R_DS(on)</div>
                  <div className="text-sm font-bold font-mono text-amber-800 tabular-nums">
                    {(mosfetState.channelResistanceOhms * 1000).toFixed(1)} mΩ
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
                  <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">Pérdida en el VRM</div>
                  <div className="text-sm font-bold font-mono text-rose-800 tabular-nums">
                    {(mosfetState.powerLossWatts * 1000).toFixed(1)} mW
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Real-time Pedagogical Explanation Box */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <span className="font-bold">Interpretación Pedagógica SMR: </span>
              {activeModel === 'bjt' ? bjtState.explanation : mosfetState.explanation}
            </div>
          </div>
        </div>

        {/* Right Zone: Control Deck & Multimeter Test Bench (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Controls Deck */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">Panel de Control de Polarización</h3>
              </div>
              <span className="text-2xs text-slate-500">Ajuste manual</span>
            </div>

            {activeModel === 'bjt' ? (
              <div className="space-y-4">
                {/* NPN / PNP switch */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">Tipo de BJT:</span>
                  <div className="flex gap-1">
                    {(['NPN', 'PNP'] as BjtType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setBjtType(t)}
                        className={`px-3 py-1 rounded text-2xs font-bold cursor-pointer transition-colors ${
                          bjtType === t
                            ? 'bg-emerald-800 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Voltage Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="bjt-vin-slider" className="font-medium text-slate-700">Tensión de Entrada V_in (Base):</label>
                    <span className="font-mono font-bold text-emerald-800">{bjtVin.toFixed(2)} V</span>
                  </div>
                  <input
                    id="bjt-vin-slider"
                    type="range"
                    min="0"
                    max="5"
                    step="0.05"
                    value={bjtVin}
                    onChange={(e) => setBjtVin(parseFloat(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-3xs text-slate-400 font-mono mt-0.5">
                    <span>0.0V (Corte)</span>
                    <span>0.7V (Umbral)</span>
                    <span>5.0V (Saturación)</span>
                  </div>
                </div>

                {/* Quick Presets for BJT */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-2xs font-medium text-slate-500">Estados típicos:</span>
                  <button
                    onClick={() => setBjtVin(0.0)}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-2xs font-medium text-slate-700 cursor-pointer"
                  >
                    Corte (0V)
                  </button>
                  <button
                    onClick={() => setBjtVin(0.85)}
                    className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-2xs font-medium text-amber-800 cursor-pointer"
                  >
                    Activa (0.85V)
                  </button>
                  <button
                    onClick={() => setBjtVin(3.3)}
                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-2xs font-medium text-emerald-800 cursor-pointer"
                  >
                    Saturación (3.3V)
                  </button>
                </div>

                {/* Base Resistance slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="bjt-rb-slider" className="font-medium text-slate-700">Resistencia de Base (R_B):</label>
                    <span className="font-mono font-bold text-slate-800">{(bjtRb / 1000).toFixed(1)} kΩ</span>
                  </div>
                  <input
                    id="bjt-rb-slider"
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={bjtRb}
                    onChange={(e) => setBjtRb(parseInt(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>

                {/* Gain beta */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="bjt-beta-slider" className="font-medium text-slate-700">Ganancia de corriente (h_FE / β):</label>
                    <span className="font-mono font-bold text-slate-800">{bjtBeta}</span>
                  </div>
                  <input
                    id="bjt-beta-slider"
                    type="range"
                    min="30"
                    max="300"
                    step="10"
                    value={bjtBeta}
                    onChange={(e) => setBjtBeta(parseInt(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Gate-Source Voltage */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="mosfet-vgs-slider" className="font-medium text-slate-700">Tensión Puerta-Surtidor (V_GS):</label>
                    <span className="font-mono font-bold text-emerald-800">{mosfetVgs.toFixed(2)} V</span>
                  </div>
                  <input
                    id="mosfet-vgs-slider"
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={mosfetVgs}
                    onChange={(e) => setMosfetVgs(parseFloat(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-3xs text-slate-400 font-mono mt-0.5">
                    <span>0V</span>
                    <span>Umbral V_TH ({mosfetVth}V)</span>
                    <span>10V (TTL ON)</span>
                  </div>
                </div>

                {/* PWM Duty Cycle */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor="mosfet-pwm-slider" className="font-medium text-slate-700">Ciclo de Trabajo PWM (4 Pines):</label>
                    <span className="font-mono font-bold text-emerald-800">{mosfetPwm}%</span>
                  </div>
                  <input
                    id="mosfet-pwm-slider"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={mosfetPwm}
                    onChange={(e) => setMosfetPwm(parseInt(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-3xs text-slate-400 font-mono mt-0.5">
                    <span>0% (Parado)</span>
                    <span>50% (Silencioso)</span>
                    <span>100% (Turbina)</span>
                  </div>
                </div>

                {/* Quick Presets for MOSFET */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-2xs font-medium text-slate-500">Perfiles:</span>
                  <button
                    onClick={() => {
                      setMosfetVgs(0);
                      setMosfetPwm(0);
                    }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-2xs font-medium text-slate-700 cursor-pointer"
                  >
                    Apagado (0V)
                  </button>
                  <button
                    onClick={() => {
                      setMosfetVgs(5);
                      setMosfetPwm(45);
                    }}
                    className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-2xs font-medium text-emerald-800 cursor-pointer"
                  >
                    Curva Normal (45%)
                  </button>
                  <button
                    onClick={() => {
                      setMosfetVgs(10);
                      setMosfetPwm(100);
                    }}
                    className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-2xs font-medium text-rose-800 cursor-pointer"
                  >
                    Full Speed (100%)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Virtual Multimeter Diagnostic Bench */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Polímetro Digital de Taller SMR</h3>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setMultimeterMode('diode')}
                  className={`px-2 py-0.5 rounded text-2xs font-mono font-bold cursor-pointer ${
                    multimeterMode === 'diode'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Modo Diodo (V)
                </button>
              </div>
            </div>

            {/* 7-Segment Multimeter Screen Display */}
            <div className="bg-black/90 rounded-lg p-4 border border-emerald-950 font-mono text-center flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-3xs text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                <span>POLÍMETRO DIGITAL TRUE RMS</span>
                {multimeterResult.isConducting && (
                  <span className="flex items-center gap-0.5 text-emerald-400">
                    <Volume2 className="w-3 h-3 animate-pulse" />
                    <span>BEEP</span>
                  </span>
                )}
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-wider text-emerald-400 tabular-nums">
                {multimeterResult.voltageDrop === 'OL'
                  ? '0.L'
                  : `${multimeterResult.voltageDrop.toFixed(2)} V`}
              </div>
              <div className="text-2xs text-slate-400 mt-1">
                {multimeterResult.isConducting
                  ? 'Unión Semiconductora Conduciendo'
                  : 'Circuito Abierto / Inversa'}
              </div>
            </div>

            {/* Probes Selection Deck */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-600 inline-block"></span>
                  <span className="font-semibold text-slate-300">Sonda Roja (+):</span>
                </div>
                <div className="flex gap-1">
                  {(activeModel === 'bjt'
                    ? ['Base', 'Collector', 'Emitter']
                    : ['Gate', 'Drain', 'Source']
                  ).map((lead) => (
                    <button
                      key={lead}
                      onClick={() => handleTestMeter(lead as MultimeterLead, blackLead)}
                      className={`px-2 py-1 rounded text-2xs font-mono cursor-pointer transition-colors ${
                        redLead === lead
                          ? 'bg-red-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {lead[0]} ({lead})
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500 inline-block"></span>
                  <span className="font-semibold text-slate-300">Sonda Negra (-):</span>
                </div>
                <div className="flex gap-1">
                  {(activeModel === 'bjt'
                    ? ['Base', 'Collector', 'Emitter']
                    : ['Gate', 'Drain', 'Source']
                  ).map((lead) => (
                    <button
                      key={lead}
                      onClick={() => handleTestMeter(redLead, lead as MultimeterLead)}
                      className={`px-2 py-1 rounded text-2xs font-mono cursor-pointer transition-colors ${
                        blackLead === lead
                          ? 'bg-slate-600 text-white font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {lead[0]} ({lead})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnostic Interpretation */}
            <div className="bg-slate-800/80 rounded-lg p-3 text-xs border border-slate-700 text-slate-300 leading-relaxed">
              <span className="font-bold text-emerald-400">Diagnóstico del Técnico: </span>
              {multimeterResult.technicalInterpretation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
