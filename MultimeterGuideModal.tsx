/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { SchematicSvg } from './SchematicSvg';

export const MultimeterGuideModal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Guía Rápida de Taller · 1º CFGM SMR
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Protocolo de Comprobación con Polímetro Digital
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Instrucciones paso a paso para medir transistores BJT, MOSFETs de potencia y líneas de alimentación en el laboratorio de hardware.
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-3.5 py-2 rounded-lg text-xs font-bold font-mono">
            EFA Oretana · MME
          </div>
        </div>
      </div>

      {/* Guide Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Testing BJT */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold font-mono text-xs">
              01
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Comprobación de Transistor BJT (Bipolar)
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Se utiliza la <strong>escala de diodos</strong> del polímetro. Un transistor BJT se comprueba considerando que la base actúa como punto común de dos diodos contrapuestos.
          </p>

          <SchematicSvg type="diode_test" className="w-full h-36" />

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">1. Transistor NPN:</span>
              <ul className="list-disc list-inside text-slate-600 mt-1 space-y-1">
                <li>Sonda ROJA en Base + NEGRA en Emisor: <strong>0.6V a 0.7V</strong> (caída directa).</li>
                <li>Sonda ROJA en Base + NEGRA en Colector: <strong>0.6V a 0.68V</strong> (ligeramente inferior a B-E).</li>
                <li>Invertir sondas (Negra en Base): debe dar <strong>OL</strong> (Open Loop).</li>
                <li>Entre Colector y Emisor en cualquier sentido: siempre <strong>OL</strong>.</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">2. Transistor PNP:</span>
              <p className="text-slate-600 mt-0.5">
                La sonda NEGRA se coloca en la Base y la ROJA en Emisor y Colector para obtener la caída directa (~0.65V).
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Testing MOSFET */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold font-mono text-xs">
              02
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Comprobación de MOSFET de Potencia (Placas Base)
            </h2>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Los MOSFETs en encapsulado SMD (SO-8, PowerPAK, DPAK) en fases VRM se verifican identificando el diodo interno de protección (Body Diode) y el aislamiento de Gate.
          </p>

          <SchematicSvg type="mosfet_n" className="w-full h-36" />

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">1. Prueba del Diodo Interno:</span>
              <p className="text-slate-600 mt-0.5">
                En Canal N: Sonda ROJA en Source + NEGRA en Drain -&gt; marca entre <strong>0.45V y 0.55V</strong>. Al invertir (Roja en Drain + Negra en Source) debe dar <strong>OL</strong>.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">2. Aislamiento de la Puerta (Gate):</span>
              <p className="text-slate-600 mt-0.5">
                La Puerta (Gate) está aislada por SiO2. Con la sonda en Gate y en cualquier otro terminal debe dar siempre <strong>OL</strong>. Si pita o da resistencia baja, la puerta está perforada.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 font-medium">
              ⚠️ Síntoma de fallo habitual en placas base: Cortocircuito directo Drenador-Surtidor (0.00V / 0Ω). La fuente entra en protección OCP.
            </div>
          </div>
        </div>
      </div>

      {/* Safety and ESD Rules Banner */}
      <div className="bg-emerald-950 text-emerald-100 rounded-xl p-6 border border-emerald-900 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>Normas de Seguridad Obligatorias en el Taller de 1º SMR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-emerald-200 pt-1">
          <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-800">
            <span className="font-bold text-white block mb-1">1. Descarga de Condensadores:</span>
            En fuentes de alimentación ATX, nunca medir semiconductores sin descargar antes los condensadores primarios de 400V con una resistencia de potencia de 1kΩ.
          </div>

          <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-800">
            <span className="font-bold text-white block mb-1">2. Protección Antiestática (ESD):</span>
            La puerta de los transistores MOSFET se destruye con descargas estáticas de tan solo 20V. Utilizar siempre pulsera antiestática conectada a toma de tierra.
          </div>

          <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-800">
            <span className="font-bold text-white block mb-1">3. Prohibido Forzar Fuentes:</span>
            Nunca puentear el cable verde con negro de la fuente ATX ante un cortocircuito comprobado en placa base; derretirás las pistas internas de cobre.
          </div>
        </div>
      </div>
    </div>
  );
};
