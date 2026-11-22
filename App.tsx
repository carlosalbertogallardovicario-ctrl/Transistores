/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FlashcardsView } from './components/FlashcardsView';
import { CircuitSimulator } from './components/CircuitSimulator';
import { TroubleshootingScenarios } from './components/TroubleshootingScenarios';
import { GamifiedQuiz } from './components/GamifiedQuiz';
import { MultimeterGuideModal } from './components/MultimeterGuideModal';
import { StudentReportModal } from './components/StudentReportModal';
import { calculateSmrLevel } from './utils/transistor-physics';
import { FLASHCARDS_DATA, DIAGNOSTIC_SCENARIOS } from './data/flashcards-and-scenarios';
import { Zap, Award, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'simulator' | 'troubleshooting' | 'quiz' | 'guide'>('flashcards');
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('efa_smr_xp');
    return saved ? parseInt(saved, 10) : 100; // Initial seed XP
  });
  const [masteredCards, setMasteredCards] = useState<string[]>(() => {
    const saved = localStorage.getItem('efa_smr_mastered');
    return saved ? JSON.parse(saved) : ['fc-1'];
  });
  const [resolvedCases, setResolvedCases] = useState<string[]>(() => {
    const saved = localStorage.getItem('efa_smr_cases');
    return saved ? JSON.parse(saved) : [];
  });
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [lastXpNotification, setLastXpNotification] = useState<{ amount: number; reason: string } | null>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('efa_smr_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('efa_smr_mastered', JSON.stringify(masteredCards));
  }, [masteredCards]);

  useEffect(() => {
    localStorage.setItem('efa_smr_cases', JSON.stringify(resolvedCases));
  }, [resolvedCases]);

  // Support ?autostart=1 query param (Ultra Mode guideline)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['flashcards', 'simulator', 'troubleshooting', 'quiz', 'guide'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, []);

  const handleAddXp = (amount: number, reason: string) => {
    setXp((prev) => prev + amount);
    setLastXpNotification({ amount, reason });
    setTimeout(() => {
      setLastXpNotification((curr) => (curr?.reason === reason ? null : curr));
    }, 3500);
  };

  const handleToggleMastered = (id: string) => {
    setMasteredCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkCaseResolved = (id: string) => {
    if (!resolvedCases.includes(id)) {
      setResolvedCases((prev) => [...prev, id]);
    }
  };

  const levelInfo = calculateSmrLevel(xp);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-emerald-800 selection:text-white">
      {/* Top Bar with EFA Oretana Branding */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        xp={xp}
        levelInfo={levelInfo}
        onOpenReport={() => setShowReportModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'flashcards' && (
          <FlashcardsView
            onAddXp={handleAddXp}
            masteredIds={masteredCards}
            onToggleMastered={handleToggleMastered}
          />
        )}

        {activeTab === 'simulator' && (
          <CircuitSimulator onAddXp={handleAddXp} />
        )}

        {activeTab === 'troubleshooting' && (
          <TroubleshootingScenarios
            onAddXp={handleAddXp}
            resolvedCaseIds={resolvedCases}
            onMarkCaseResolved={handleMarkCaseResolved}
          />
        )}

        {activeTab === 'quiz' && (
          <GamifiedQuiz
            onAddXp={handleAddXp}
            onOpenReport={() => setShowReportModal(true)}
          />
        )}

        {activeTab === 'guide' && (
          <MultimeterGuideModal />
        )}
      </main>

      {/* Floating XP Gain Toast */}
      {lastXpNotification && (
        <aside
          aria-label="Notificación de experiencia"
          className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-4 py-3 rounded-xl shadow-xl border border-emerald-700/60 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <div className="p-1.5 rounded-lg bg-emerald-700 text-amber-300">
            <Zap className="w-5 h-5 fill-amber-300 text-amber-300" />
          </div>
          <div>
            <div className="text-xs font-bold font-mono text-amber-300">
              +{lastXpNotification.amount} XP Ganados
            </div>
            <div className="text-2xs text-slate-300">{lastXpNotification.reason}</div>
          </div>
        </aside>
      )}

      {/* Student Academic & Competencies Report Modal */}
      <StudentReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        xp={xp}
        levelInfo={levelInfo}
        masteredCardsCount={masteredCards.length}
        totalCardsCount={FLASHCARDS_DATA.length}
        resolvedCasesCount={resolvedCases.length}
        totalCasesCount={DIAGNOSTIC_SCENARIOS.length}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src="./assets/aistudio/EFA_ORETANA_615ce384.jpeg"
              alt="EFA Oretana"
              className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-80"
              referrerPolicy="no-referrer"
            />
            <span>
              EFA Oretana · Ciclos Formativos de Grado Medio (CFGM) · Montaje y Mantenimiento de Equipos
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setShowReportModal(true)}
              className="hover:text-emerald-800 transition-colors cursor-pointer font-medium"
            >
              Expediente SMR
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-emerald-800 transition-colors cursor-pointer font-medium"
            >
              Protocolo Polímetro
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-2xs text-slate-400">v2.4 CFGM-SMR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
