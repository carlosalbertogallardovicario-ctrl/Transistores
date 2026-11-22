/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
  ShieldAlert,
  Brain,
  HelpCircle,
  RotateCcw,
  Sparkles,
  CircuitBoard,
} from 'lucide-react';
import {
  DIAGNOSTIC_SCENARIOS,
  DiagnosticScenario,
} from '../data/flashcards-and-scenarios';

interface TroubleshootingScenariosProps {
  onAddXp: (amount: number, reason: string) => void;
  resolvedCaseIds: string[];
  onMarkCaseResolved: (id: string) => void;
}

export const TroubleshootingScenarios: React.FC<TroubleshootingScenariosProps> = ({
  onAddXp,
  resolvedCaseIds,
  onMarkCaseResolved,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(DIAGNOSTIC_SCENARIOS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [activeTestPointId, setActiveTestPointId] = useState<string | null>(null);

  const currentCase: DiagnosticScenario =
    DIAGNOSTIC_SCENARIOS.find((c) => c.id === selectedCaseId) ||
    DIAGNOSTIC_SCENARIOS[0];

  const currentStep = currentCase.steps[activeStepIndex];
  const selectedOptionId = selectedAnswers[activeStepIndex];
  const selectedOption = currentStep.options.find((o) => o.id === selectedOptionId);
  const isCaseCompleted = resolvedCaseIds.includes(currentCase.id);

  const handleSelectOption = (optionId: string) => {
    if (showFeedback && selectedOption?.isCorrect) return; // Prevent changing after success
    setSelectedAnswers((prev) => ({ ...prev, [activeStepIndex]: optionId }));
    setShowFeedback(true);

    const option = currentStep.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      onAddXp(25, `Fase superada: ${currentStep.title}`);
    }
  };

  const handleNextStep = () => {
    setShowFeedback(false);
    if (activeStepIndex < currentCase.steps.length - 1) {
      setActiveStepIndex((prev) => prev + 1);
    } else {
      // Completed all 4 pillars
      if (!isCaseCompleted) {
        onMarkCaseResolved(currentCase.id);
        onAddXp(60, `¡Caso de taller ${currentCase.title} resuelto!`);
      }
    }
  };

  const handleResetCase = () => {
    setSelectedAnswers({});
    setActiveStepIndex(0);
    setShowFeedback(false);
    setActiveTestPointId(null);
  };

  const getPillarIcon = (phase: string) => {
    switch (phase) {
      case 'observacion':
        return <Eye className="w-4 h-4 text-sky-600" />;
      case 'consecuencia':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'adaptacion':
        return <RotateCcw className="w-4 h-4 text-emerald-600" />;
      case 'pensamiento_critico':
        return <Brain className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Resolución de Fallas Técnicas · 1º CFGM SMR
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Taller de Diagnóstico y Pensamiento Crítico
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Enfréntate a averías reales de ordenadores y periféricos. Utiliza el polímetro, observa síntomas, deduce consecuencias y aplica pensamiento crítico profesional.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600">Casos Resueltos:</span>
            <span className="text-sm font-bold font-mono text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {resolvedCaseIds.length} / {DIAGNOSTIC_SCENARIOS.length}
            </span>
          </div>
        </div>

        {/* Case selector buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100">
          {DIAGNOSTIC_SCENARIOS.map((c, idx) => {
            const isResolved = resolvedCaseIds.includes(c.id);
            const isSelected = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  handleResetCase();
                }}
                className={`text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-2xs font-bold ${isSelected ? 'text-emerald-300' : 'text-emerald-800'}`}>
                    CASO 0{idx + 1}
                  </span>
                  {isResolved && (
                    <span className="text-2xs font-bold text-emerald-400 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 inline" />
                      <span>Resuelto</span>
                    </span>
                  )}
                </div>
                <div className="font-bold line-clamp-1">{c.title.split(':')[1] || c.title}</div>
                <div className={`text-2xs mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {c.difficultyLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Troubleshooting Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Hardware Inspection Bench & Multimeter Test Points (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CircuitBoard className="w-4 h-4 text-emerald-700" />
                <h2 className="text-sm font-bold text-slate-900">Banco de Inspección de Hardware</h2>
              </div>
              <span className="text-2xs text-slate-500 font-mono">Puntos de Prueba (TP)</span>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 text-slate-100 space-y-3">
              <div className="text-2xs text-slate-400 font-mono">Contexto de Taller:</div>
              <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 p-2.5 rounded border border-emerald-800/40">
                {currentCase.hardwareContext}
              </div>

              <div className="text-2xs text-slate-400 font-mono pt-1">Síntoma Inicial Reportado:</div>
              <div className="text-xs text-slate-200 bg-slate-800/80 p-3 rounded border border-slate-700 leading-relaxed">
                {currentCase.initialSymptom}
              </div>
            </div>

            {/* Test Points Selector */}
            <div>
              <div className="text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>Haz clic en un punto de prueba con el polímetro:</span>
                <span className="text-2xs text-emerald-700 font-normal">Sondas conectadas</span>
              </div>

              <div className="space-y-2">
                {currentCase.testPoints.map((tp) => {
                  const isActive = activeTestPointId === tp.id;
                  return (
                    <button
                      key={tp.id}
                      onClick={() => {
                        setActiveTestPointId(tp.id);
                        onAddXp(5, `Medición en ${tp.label}`);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{tp.label}</span>
                        <span
                          className={`text-2xs px-2 py-0.5 rounded font-mono font-bold ${
                            tp.status === 'defectuoso'
                              ? 'bg-rose-100 text-rose-800'
                              : tp.status === 'alerta'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {tp.status === 'defectuoso' ? 'FALLA' : tp.status === 'alerta' ? 'ATENCIÓN' : 'OK'}
                        </span>
                      </div>
                      <div className="text-2xs text-slate-500 mt-0.5">{tp.location}</div>

                      {/* Display live reading if active */}
                      {isActive && (
                        <div className="mt-2.5 pt-2 border-t border-emerald-200/60 bg-white rounded p-2.5 space-y-1">
                          <div className="flex items-center justify-between text-2xs font-mono">
                            <span className="text-slate-500">Lectura Diodo:</span>
                            <span className="font-bold text-emerald-800">
                              {tp.diodeReading === 'OL' ? 'OL (Abierto)' : `${tp.diodeReading} V`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-2xs font-mono">
                            <span className="text-slate-500">Tensión / Resistencia:</span>
                            <span className="font-bold text-slate-800">{tp.voltageReading}</span>
                          </div>
                          <div className="text-2xs text-emerald-950 font-medium mt-1 pt-1 border-t border-slate-100">
                            💡 {tp.hint}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The 4 Pedagogical Pillars Interactive Solver (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs space-y-5">
            {/* 4 Pillars Stepper Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-1.5 sm:gap-3">
                {currentCase.steps.map((st, i) => {
                  const isDone = selectedAnswers[i] && currentCase.steps[i].options.find(o => o.id === selectedAnswers[i])?.isCorrect;
                  const isCurrent = i === activeStepIndex;
                  return (
                    <div
                      key={st.phase}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        isCurrent
                          ? 'bg-emerald-900 text-white font-bold'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {getPillarIcon(st.phase)}
                      <span className="hidden sm:inline capitalize">{st.phase.replace('_', ' ')}</span>
                      <span className="sm:hidden font-mono">{i + 1}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleResetCase}
                className="text-2xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>

            {/* Current Step Stage */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1">
                <span>{currentStep.title}</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{currentStep.instruction}</p>

              <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                {currentStep.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mt-4">
                {currentStep.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  let optionStyles = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                  if (showFeedback && isSelected) {
                    if (option.isCorrect) {
                      optionStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                    } else {
                      optionStyles = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-slate-100 border-slate-400 text-slate-900';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-xs leading-relaxed cursor-pointer flex items-start gap-3 ${optionStyles}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {showFeedback && isSelected ? (
                          option.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )
                        ) : (
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-3xs font-mono font-bold ${
                              isSelected ? 'border-slate-800 text-slate-800' : 'border-slate-300 text-slate-400'
                            }`}
                          >
                            ●
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert Box */}
              {showFeedback && selectedOption && (
                <div
                  className={`mt-5 p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedOption.isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {selectedOption.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>¡Razonamiento Correcto! (+25 XP)</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4 text-rose-700" />
                        <span>Riesgo o Diagnóstico Erróneo:</span>
                      </>
                    )}
                  </div>
                  <p>{selectedOption.feedback}</p>
                </div>
              )}
            </div>

            {/* Stepper Navigation */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 font-mono">
                  Pilar {activeStepIndex + 1} de {currentCase.steps.length}
                </span>
                <span className="text-2xs text-slate-500 font-medium capitalize">
                  {currentStep.phase.replace('_', ' ')}
                </span>
              </div>

              {showFeedback && selectedOption?.isCorrect && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs transition-colors"
                >
                  <span>
                    {activeStepIndex < currentCase.steps.length - 1
                      ? 'Siguiente Pilar →'
                      : '¡Finalizar Caso con Éxito! 🏆'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Summary Learning Card when finished */}
            {isCaseCompleted && activeStepIndex === currentCase.steps.length - 1 && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950 text-emerald-100 text-xs leading-relaxed border border-emerald-800">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Conclusión Técnico-Formativa EFA Oretana:</span>
                </div>
                <p className="text-emerald-200">{currentCase.summaryLearning}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
