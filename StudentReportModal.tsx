/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Award,
  CheckCircle2,
  Zap,
  Printer,
  Sparkles,
  ShieldCheck,
  Cpu,
  BookOpen,
} from 'lucide-react';
import { LevelInfo } from '../utils/transistor-physics';

interface StudentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  xp: number;
  levelInfo: LevelInfo;
  masteredCardsCount: number;
  totalCardsCount: number;
  resolvedCasesCount: number;
  totalCasesCount: number;
}

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  isOpen,
  onClose,
  xp,
  levelInfo,
  masteredCardsCount,
  totalCardsCount,
  resolvedCasesCount,
  totalCasesCount,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Corporate Certificate Header */}
        <div className="text-center pb-6 border-b border-slate-100">
          <img
            src="./assets/aistudio/EFA_ORETANA_615ce384.jpeg"
            alt="EFA Oretana"
            className="h-14 mx-auto mb-3 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="text-2xs font-mono font-bold text-emerald-800 uppercase tracking-widest">
            Centro de Formación Profesional EFA Oretana · Ciudad Real
          </div>
          <h2 id="report-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Certificación de Competencias Técnicas en Semiconductores
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Ciclo Formativo de Grado Medio en Sistemas Microinformáticos y Redes (1º SMR)
          </p>
        </div>

        {/* Level & Rank Badge Card */}
        <div className="my-6 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-xl p-5 border border-emerald-800 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-800/80 border-2 border-emerald-400 flex items-center justify-center text-amber-300 shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xs text-emerald-300 uppercase tracking-wider font-mono">
                Rango Alcanzado
              </div>
              <div className="text-lg font-bold text-white tracking-tight">{levelInfo.title}</div>
              <div className="text-xs text-emerald-200 mt-0.5">
                Nivel {levelInfo.level} de 3 · Especialista de Hardware
              </div>
            </div>
          </div>

          <div className="text-center sm:text-right bg-emerald-950/60 px-4 py-2.5 rounded-lg border border-emerald-700/50">
            <div className="text-2xs text-emerald-400 font-mono uppercase tracking-wider">Experiencia Acumulada</div>
            <div className="text-2xl font-black font-mono text-amber-400 flex items-center justify-center sm:justify-end gap-1">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Key Indicators */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <BookOpen className="w-5 h-5 text-emerald-700 mx-auto mb-1.5" />
            <div className="text-xl font-bold font-mono text-slate-900">
              {masteredCardsCount} / {totalCardsCount}
            </div>
            <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Tarjetas Didácticas Dominadas
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <Cpu className="w-5 h-5 text-emerald-700 mx-auto mb-1.5" />
            <div className="text-xl font-bold font-mono text-slate-900">
              {resolvedCasesCount} / {totalCasesCount}
            </div>
            <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Casos de Taller Resueltos
            </div>
          </div>
        </div>

        {/* Competencies Checklist for 1º SMR */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Competencias Evaluadas en el Laboratorio:</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950">Observación Rigurosa: </span>
                <span className="text-slate-600">
                  Capacidad para medir con polímetro (escala de diodos y continuidad) sin emitir juicios apresurados.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950">Deducción de Consecuencias: </span>
                <span className="text-slate-600">
                  Comprensión del disparo de protecciones OCP/SCP en fuentes ATX ante cortocircuitos en VRM.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950">Adaptación Técnica: </span>
                <span className="text-slate-600">
                  Descarte de acciones destructivas (puentes de fuente) y priorización de mantenimiento preventivo.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/50">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-950">Pensamiento Crítico: </span>
                <span className="text-slate-600">
                  Selección de MOSFETs de reemplazo con baja R_DS(on) y verificación de seguridad eléctrica.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-2xs text-slate-400 font-mono">
            Documento de autoevaluación generado en el entorno SMR EFA Oretana
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
