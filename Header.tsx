/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Zap } from 'lucide-react';
import { LevelInfo } from '../utils/transistor-physics';

interface HeaderProps {
  activeTab: 'flashcards' | 'simulator' | 'troubleshooting' | 'quiz' | 'guide';
  onSelectTab: (tab: 'flashcards' | 'simulator' | 'troubleshooting' | 'quiz' | 'guide') => void;
  xp: number;
  levelInfo: LevelInfo;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  xp,
  levelInfo,
  onOpenReport,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
      {/* Strict Top Bar Contract: 3 zones separated by gap-8 on desktop */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand wordmark & institutional identity */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <img
            src="./assets/aistudio/EFA_ORETANA_615ce384.jpeg"
            alt="EFA Oretana"
            className="h-8 sm:h-11 w-auto object-contain rounded-xs"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-emerald-950 whitespace-nowrap">
              EFA Oretana
            </span>
            <span className="text-2xs sm:text-xs font-semibold text-emerald-700 tracking-wide whitespace-nowrap">
              1º CFGM SMR
            </span>
          </div>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('flashcards')}
            className={`cursor-pointer transition-colors whitespace-nowrap py-1 ${
              activeTab === 'flashcards'
                ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            Tarjetas Didácticas
          </button>
          <button
            onClick={() => onSelectTab('simulator')}
            className={`cursor-pointer transition-colors whitespace-nowrap py-1 ${
              activeTab === 'simulator'
                ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            Mapa de Funcionamiento
          </button>
          <button
            onClick={() => onSelectTab('troubleshooting')}
            className={`cursor-pointer transition-colors whitespace-nowrap py-1 ${
              activeTab === 'troubleshooting'
                ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            Fallas de Taller SMR
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`cursor-pointer transition-colors whitespace-nowrap py-1 ${
              activeTab === 'quiz'
                ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            Desafío Gamificado
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`cursor-pointer transition-colors whitespace-nowrap py-1 ${
              activeTab === 'guide'
                ? 'text-emerald-800 font-bold border-b-2 border-emerald-700'
                : 'text-slate-600 hover:text-emerald-900'
            }`}
          >
            Guía Polímetro
          </button>
        </nav>

        {/* Zone 3: 1 primary action / Gamified student progress badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-all cursor-pointer shadow-2xs group"
            title="Ver expediente del alumno y progreso gamificado"
            aria-label="Ver progreso del alumno"
          >
            <div className="p-1 rounded-md bg-emerald-700 text-white group-hover:scale-105 transition-transform">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-tight text-emerald-950 flex items-center gap-1.5">
                <span>{levelInfo.title}</span>
                <span className="text-emerald-700 font-mono text-2xs">({levelInfo.level}/3)</span>
              </div>
              <div className="text-2xs text-emerald-700 font-medium font-mono tabular-nums flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
                <span>{xp} XP</span>
              </div>
            </div>
            <div className="sm:hidden font-mono text-xs font-bold text-emerald-900">
              {xp} XP
            </div>
          </button>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 overflow-x-auto gap-2 text-xs">
        <button
          onClick={() => onSelectTab('flashcards')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-emerald-800 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Tarjetas
        </button>
        <button
          onClick={() => onSelectTab('simulator')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-emerald-800 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Simulador
        </button>
        <button
          onClick={() => onSelectTab('troubleshooting')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'troubleshooting'
              ? 'bg-emerald-800 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Fallas SMR
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-emerald-800 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Desafío
        </button>
        <button
          onClick={() => onSelectTab('guide')}
          className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-emerald-800 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Polímetro
        </button>
      </div>
    </header>
  );
};
