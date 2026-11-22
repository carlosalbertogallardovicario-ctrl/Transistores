/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SchematicSvgProps {
  type: 'bjt_npn' | 'bjt_pnp' | 'mosfet_n' | 'diode_test' | 'vrm_phase';
  className?: string;
  isConducting?: boolean;
}

export const SchematicSvg: React.FC<SchematicSvgProps> = ({
  type,
  className = 'w-full h-44',
  isConducting = false,
}) => {
  if (type === 'bjt_npn') {
    return (
      <svg
        viewBox="0 0 280 180"
        className={`${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`}
        role="img"
        aria-label="Esquema Transistor BJT NPN"
      >
        <title>Transistor BJT NPN</title>
        {/* Grid lines */}
        <defs>
          <pattern id="grid-npn" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="280" height="180" fill="url(#grid-npn)" />

        {/* Outer Circle */}
        <circle cx="140" cy="90" r="42" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />

        {/* Base line */}
        <line x1="40" y1="90" x2="120" y2="90" stroke="#f8fafc" strokeWidth="3" />
        <rect x="120" y="66" width="5" height="48" fill="#38bdf8" rx="1" />

        {/* Collector */}
        <line x1="123" y1="78" x2="160" y2="55" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="55" x2="230" y2="55" stroke="#f8fafc" strokeWidth="3" />

        {/* Emitter with arrow pointing OUTWARD (NPN) */}
        <line x1="123" y1="102" x2="160" y2="125" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="125" x2="230" y2="125" stroke="#f8fafc" strokeWidth="3" />
        <polygon points="152,114 163,127 146,125" fill="#22c55e" stroke="#22c55e" strokeWidth="1" />

        {/* Terminals Labels */}
        <text x="30" y="85" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">BASE (B)</text>
        <text x="180" y="45" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="monospace">COLECTOR (C)</text>
        <text x="180" y="145" fill="#22c55e" fontSize="13" fontWeight="bold" fontFamily="monospace">EMISOR (E)</text>

        {/* Type indicator badge */}
        <rect x="10" y="10" width="80" height="22" rx="4" fill="#1e293b" stroke="#334155" />
        <text x="18" y="25" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">BJT · NPN</text>

        {/* Flow indicator when conducting */}
        {isConducting && (
          <path
            d="M 195 55 L 140 90 L 195 125"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        )}
      </svg>
    );
  }

  if (type === 'bjt_pnp') {
    return (
      <svg
        viewBox="0 0 280 180"
        className={`${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`}
        role="img"
        aria-label="Esquema Transistor BJT PNP"
      >
        <title>Transistor BJT PNP</title>
        {/* Outer Circle */}
        <circle cx="140" cy="90" r="42" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />

        {/* Base line */}
        <line x1="40" y1="90" x2="120" y2="90" stroke="#f8fafc" strokeWidth="3" />
        <rect x="120" y="66" width="5" height="48" fill="#a855f7" rx="1" />

        {/* Collector */}
        <line x1="123" y1="102" x2="160" y2="125" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="125" x2="230" y2="125" stroke="#f8fafc" strokeWidth="3" />

        {/* Emitter with arrow pointing INWARD (PNP) */}
        <line x1="123" y1="78" x2="160" y2="55" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="55" x2="230" y2="55" stroke="#f8fafc" strokeWidth="3" />
        <polygon points="135,70 126,82 143,80" fill="#a855f7" stroke="#a855f7" strokeWidth="1" />

        <text x="30" y="85" fill="#a855f7" fontSize="13" fontWeight="bold" fontFamily="monospace">BASE (B)</text>
        <text x="180" y="45" fill="#22c55e" fontSize="13" fontWeight="bold" fontFamily="monospace">EMISOR (E)</text>
        <text x="180" y="145" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="monospace">COLECTOR (C)</text>

        <rect x="10" y="10" width="80" height="22" rx="4" fill="#1e293b" stroke="#334155" />
        <text x="18" y="25" fill="#a855f7" fontSize="11" fontWeight="bold" fontFamily="monospace">BJT · PNP</text>
      </svg>
    );
  }

  if (type === 'mosfet_n') {
    return (
      <svg
        viewBox="0 0 280 180"
        className={`${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`}
        role="img"
        aria-label="Esquema Transistor MOSFET Canal N"
      >
        <title>MOSFET Canal N</title>
        <circle cx="140" cy="90" r="44" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />

        {/* Gate (isolated bar) */}
        <line x1="40" y1="90" x2="110" y2="90" stroke="#f8fafc" strokeWidth="3" />
        <line x1="110" y1="65" x2="110" y2="115" stroke="#38bdf8" strokeWidth="4" />

        {/* Oxide gap (SiO2 isolation) */}
        <line x1="117" y1="65" x2="117" y2="78" stroke="#10b981" strokeWidth="3.5" />
        <line x1="117" y1="84" x2="117" y2="96" stroke="#10b981" strokeWidth="3.5" />
        <line x1="117" y1="102" x2="117" y2="115" stroke="#10b981" strokeWidth="3.5" />

        {/* Drain */}
        <line x1="117" y1="72" x2="160" y2="72" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="72" x2="160" y2="40" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="40" x2="230" y2="40" stroke="#f8fafc" strokeWidth="3" />

        {/* Source and Substrate arrow pointing IN (N-Channel) */}
        <line x1="117" y1="90" x2="150" y2="90" stroke="#f8fafc" strokeWidth="3" />
        <polygon points="123,90 135,84 135,96" fill="#10b981" />

        <line x1="117" y1="108" x2="160" y2="108" stroke="#f8fafc" strokeWidth="3" />
        <line x1="150" y1="90" x2="160" y2="108" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="108" x2="160" y2="140" stroke="#f8fafc" strokeWidth="3" />
        <line x1="160" y1="140" x2="230" y2="140" stroke="#f8fafc" strokeWidth="3" />

        <text x="30" y="85" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">GATE (G)</text>
        <text x="180" y="32" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="monospace">DRAIN (D)</text>
        <text x="180" y="158" fill="#10b981" fontSize="13" fontWeight="bold" fontFamily="monospace">SOURCE (S)</text>

        <rect x="10" y="10" width="105" height="22" rx="4" fill="#1e293b" stroke="#334155" />
        <text x="16" y="25" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">MOSFET N-CH</text>
      </svg>
    );
  }

  if (type === 'diode_test') {
    return (
      <svg
        viewBox="0 0 280 180"
        className={`${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`}
        role="img"
        aria-label="Modelo de dos diodos para comprobación con multímetro"
      >
        <title>Modelo 2 Diodos BJT para Multímetro</title>
        <rect x="30" y="75" width="220" height="32" rx="6" fill="#1e293b" stroke="#475569" />

        {/* Diode 1 (Base to Collector) */}
        <polygon points="115,79 115,103 135,91" fill="#f59e0b" stroke="#f59e0b" />
        <line x1="135" y1="79" x2="135" y2="103" stroke="#f59e0b" strokeWidth="3" />

        {/* Diode 2 (Base to Emitter) */}
        <polygon points="165,79 165,103 145,91" fill="#22c55e" stroke="#22c55e" />
        <line x1="145" y1="79" x2="145" y2="103" stroke="#22c55e" strokeWidth="3" />

        {/* Center Base connection */}
        <line x1="140" y1="91" x2="140" y2="40" stroke="#38bdf8" strokeWidth="3" />
        <circle cx="140" cy="40" r="4" fill="#38bdf8" />
        <text x="110" y="30" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">BASE (Ánodo Común)</text>

        {/* Left Collector */}
        <line x1="50" y1="91" x2="115" y2="91" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="50" cy="91" r="4" fill="#f59e0b" />
        <text x="25" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">COLECTOR</text>
        <text x="25" y="145" fill="#94a3b8" fontSize="10" fontFamily="monospace">(Caída ~0.63V)</text>

        {/* Right Emitter */}
        <line x1="165" y1="91" x2="230" y2="91" stroke="#22c55e" strokeWidth="3" />
        <circle cx="230" cy="91" r="4" fill="#22c55e" />
        <text x="195" y="130" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">EMISOR</text>
        <text x="195" y="145" fill="#94a3b8" fontSize="10" fontFamily="monospace">(Caída ~0.65V)</text>

        <rect x="10" y="10" width="115" height="20" rx="4" fill="#0f172a" stroke="#334155" />
        <text x="15" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">TEST POLÍMETRO</text>
      </svg>
    );
  }

  // VRM Phase
  return (
    <svg
      viewBox="0 0 280 180"
      className={`${className} bg-slate-900 rounded-lg p-2 text-slate-100 select-none`}
      role="img"
      aria-label="Esquema Fase VRM Placa Base"
    >
      <title>Fase de Alimentación VRM Buck Converter</title>
      {/* 12V EPS input */}
      <line x1="20" y1="40" x2="70" y2="40" stroke="#eab308" strokeWidth="3" />
      <text x="15" y="30" fill="#eab308" fontSize="11" fontWeight="bold" fontFamily="monospace">+12V EPS</text>

      {/* High-Side MOSFET */}
      <rect x="70" y="28" width="38" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="73" y="44" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">Q1 High</text>

      {/* Intermediate Switching Node */}
      <line x1="108" y1="40" x2="160" y2="40" stroke="#f8fafc" strokeWidth="3" />
      <line x1="130" y1="40" x2="130" y2="90" stroke="#f8fafc" strokeWidth="3" />

      {/* Low-Side MOSFET */}
      <rect x="111" y="90" width="38" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="114" y="106" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">Q2 Low</text>
      <line x1="130" y1="114" x2="130" y2="140" stroke="#64748b" strokeWidth="3" />
      {/* Ground */}
      <line x1="120" y1="140" x2="140" y2="140" stroke="#64748b" strokeWidth="3" />
      <line x1="124" y1="144" x2="136" y2="144" stroke="#64748b" strokeWidth="2" />

      {/* Choke Inductor */}
      <path d="M 160 40 Q 170 28 180 40 Q 190 28 200 40 Q 210 28 220 40" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
      <text x="175" y="24" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">Choke</text>

      {/* Output V_Core to CPU */}
      <line x1="220" y1="40" x2="265" y2="40" stroke="#22c55e" strokeWidth="3" />
      <circle cx="265" cy="40" r="4" fill="#22c55e" />
      <text x="215" y="65" fill="#22c55e" fontSize="11" fontWeight="bold" fontFamily="monospace">V_CORE CPU</text>
      <text x="215" y="78" fill="#94a3b8" fontSize="9" fontFamily="monospace">(1.2V / 40A)</text>

      {/* Smoothing Solid Capacitor */}
      <line x1="240" y1="40" x2="240" y2="110" stroke="#f8fafc" strokeWidth="2" />
      <line x1="230" y1="110" x2="250" y2="110" stroke="#0ea5e9" strokeWidth="3" />
      <line x1="230" y1="116" x2="250" y2="116" stroke="#0ea5e9" strokeWidth="3" />
      <line x1="240" y1="116" x2="240" y2="130" stroke="#64748b" strokeWidth="2" />
      <text x="230" y="145" fill="#94a3b8" fontSize="8" fontFamily="monospace">Condensador</text>

      <rect x="10" y="148" width="90" height="18" rx="3" fill="#0f172a" stroke="#334155" />
      <text x="15" y="160" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">ETAPA BUCK VRM</text>
    </svg>
  );
};
