/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Flame,
  Award,
  Zap,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/flashcards-and-scenarios';

interface GamifiedQuizProps {
  onAddXp: (amount: number, reason: string) => void;
  onOpenReport: () => void;
}

export const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({ onAddXp, onOpenReport }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      const bonusStreak = streak > 1 ? streak * 5 : 0;
      const gainedXp = 30 + bonusStreak;
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      onAddXp(gainedXp, `Respuesta correcta (${currentQ.pillar}) con racha x${streak + 1}`);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onAddXp(50, '¡Desafío Gamificado completado!');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              Evaluación Formativa Gamificada · 1º SMR
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Desafío de Competencias: El Transistor
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Demuestra tu destreza en los 4 pilares: Observación, Consecuencia, Adaptación y Pensamiento Crítico.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-900 font-mono text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Racha: x{streak}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-950 font-mono text-xs font-bold">
              Aciertos: {score} / {QUIZ_QUESTIONS.length}
            </div>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          {/* Header metadata */}
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-800">{currentQ.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-500">Pilar: {currentQ.pillar}</span>
              <span aria-hidden="true">·</span>
              <span className="text-2xs bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-600">
                Nivel {currentQ.level}
              </span>
            </div>
            <span className="font-mono text-slate-400">
              {currentIdx + 1} de {QUIZ_QUESTIONS.length}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* Multiple choice options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((optionText, idx) => {
              const isSelected = selectedOptionIdx === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyles = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20 font-bold';
                } else if (isSelected) {
                  btnStyles = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/20';
                } else {
                  btnStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer flex items-center justify-between gap-3 ${btnStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center font-mono text-3xs font-bold text-slate-500 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{optionText}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Formative Explanation Box */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl text-xs leading-relaxed border ${
                selectedOptionIdx === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>
                  {selectedOptionIdx === currentQ.correctIndex
                    ? '¡Respuesta Perfecta!'
                    : 'Justificación Técnica de Aprendizaje:'}
                </span>
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs transition-colors"
              >
                <span>
                  {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados Finales'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
              Evaluación Completada
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Resultado: {score} de {QUIZ_QUESTIONS.length} Aciertos
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
              {score >= 7
                ? '¡Extraordinario dominio! Demuestras un alto nivel de observación y pensamiento crítico propio de un técnico especialista de SMR.'
                : score >= 5
                ? '¡Buen trabajo! Tienes las bases sólidas, repasa algunas tarjetas de MOSFETs y polarización para alcanzar la excelencia.'
                : 'Se recomienda repasar las tarjetas didácticas de taller antes de enfrentarte a placas base reales.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              Repetir Desafío
            </button>
            <button
              onClick={onOpenReport}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Ver Certificado de Taller EFA Oretana</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
