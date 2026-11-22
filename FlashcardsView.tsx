/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookmarkCheck,
  Search,
  Sparkles,
  Layers,
  Wrench,
} from 'lucide-react';
import { Flashcard, FLASHCARDS_DATA } from '../data/flashcards-and-scenarios';
import { SchematicSvg } from './SchematicSvg';

interface FlashcardsViewProps {
  onAddXp: (amount: number, reason: string) => void;
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  onAddXp,
  masteredIds,
  onToggleMastered,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCards = FLASHCARDS_DATA.filter((card) => {
    const matchesCategory =
      selectedCategory === 'todos' || card.category === selectedCategory;
    const matchesSearch =
      card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentCard: Flashcard | undefined =
    filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleMarkMastered = (cardId: string) => {
    if (!masteredIds.includes(cardId)) {
      onToggleMastered(cardId);
      onAddXp(20, 'Tarjeta didáctica dominada');
    } else {
      onToggleMastered(cardId);
    }
  };

  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  return (
    <div className="space-y-6">
      {/* Top Banner and Category Segmented Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-2xs sm:text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <span>1º CFGM SMR · Módulo MME</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Bloque Componentes Electrónicos</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Tarjetas Didácticas: El Transistor en la Informática
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Domina los principios del BJT, MOSFET de potencia, fototransistores y su verificación con multímetro en placas base y fuentes ATX.
            </p>
          </div>

          {/* Gamified progress indicator */}
          <div className="flex items-center gap-3 bg-emerald-50/70 border border-emerald-200/60 rounded-lg px-4 py-3 shrink-0">
            <BookmarkCheck className="w-5 h-5 text-emerald-700" />
            <div>
              <div className="text-xs text-emerald-900 font-medium">Tarjetas Dominadas</div>
              <div className="text-lg font-bold font-mono text-emerald-950 tabular-nums">
                {masteredIds.length} <span className="text-xs text-emerald-700 font-sans">/ {FLASHCARDS_DATA.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar and Search */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Functional filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'todos', label: 'Todas las tarjetas' },
              { id: 'concepto', label: 'Concepto & Zonas' },
              { id: 'bjt', label: 'BJT NPN/PNP' },
              { id: 'mosfet', label: 'MOSFET' },
              { id: 'smr_hardware', label: 'Placas & VRM' },
              { id: 'diagnostico', label: 'Polímetro' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[200px] sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar concepto o fórmula..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Flashcard Stage */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Index & Control header */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 px-1 sm:px-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-800 text-2xs sm:text-xs">{currentCard.levelLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-2xs sm:text-xs">
                Tarjeta {currentIndex + 1} de {filteredCards.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMarkMastered(currentCard.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  isCurrentMastered
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentMastered ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>{isCurrentMastered ? 'Dominada (+20 XP)' : 'Marcar Dominada'}</span>
              </button>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            className="perspective-1000 min-h-[580px] cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                setIsFlipped(!isFlipped);
              }
            }}
            aria-label="Hacer clic o pulsar espacio para voltear tarjeta"
          >
            <div
              className={`relative w-full min-h-[580px] rounded-2xl transition-transform duration-500 transform-style-3d shadow-sm hover:shadow-md border border-slate-200 ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF THE CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/50">
                      Pregunta de Taller
                    </span>
                    <div className="flex items-center gap-1 text-2xs text-slate-400">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>Clic para voltear</span>
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                    {currentCard.question}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 mb-5">{currentCard.subtitle}</p>

                  {/* Visual Schematic Hint */}
                  {currentCard.schematicType && (
                    <div className="my-4 max-w-sm mx-auto">
                      <SchematicSvg type={currentCard.schematicType} className="w-full h-36" />
                    </div>
                  )}

                  {/* Bullet Clues */}
                  <div className="space-y-2 mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Claves de observación y análisis:</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      {currentCard.frontKeyPoints.map((point, i) => (
                        <li key={i} className="leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex gap-1.5">
                    {currentCard.tags.map((t) => (
                      <span key={t} className="text-slate-500 font-mono text-2xs">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="font-medium text-emerald-700">Ver respuesta explicada →</span>
                </div>
              </div>

              {/* BACK OF THE CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                      Solución Técnica Rigurosa
                    </span>
                    <span className="text-2xs text-slate-400">Clic para volver a la pregunta</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {currentCard.backTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {currentCard.explanation}
                  </p>

                  {/* Formula Box */}
                  {currentCard.keyFormula && (
                    <div className="my-3 bg-slate-800/90 rounded-lg p-3 border border-slate-700">
                      <div className="text-2xs font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
                        Fórmula / Relación Clave
                      </div>
                      <div className="text-xs font-mono font-bold text-amber-300">
                        {currentCard.keyFormula}
                      </div>
                    </div>
                  )}

                  {/* SMR Workshop Pro Tip */}
                  <div className="mt-3 bg-emerald-950/40 rounded-lg p-3.5 border border-emerald-800/50">
                    <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
                      <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Consejo Profesional de Taller SMR:</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentCard.smrTip}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-2xs text-slate-400">1º CFGM SMR · EFA Oretana</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
                    >
                      Voltear
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkMastered(currentCard.id);
                      }}
                      className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white cursor-pointer shadow-xs"
                    >
                      {isCurrentMastered ? '✓ Dominada' : '+20 XP Dominar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-2 pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium cursor-pointer shadow-2xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Voltear Tarjeta</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-2xs transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron tarjetas</h3>
          <p className="text-xs text-slate-500 mt-1">Prueba a seleccionar otra categoría o borrar la búsqueda.</p>
          <button
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-medium cursor-pointer"
          >
            Ver todas las tarjetas
          </button>
        </div>
      )}
    </div>
  );
};
