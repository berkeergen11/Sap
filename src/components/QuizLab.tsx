/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion, SAPModuleId } from '../types/sap';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  MapPin,
  RotateCcw,
  Award,
  ChevronRight,
  Terminal,
} from 'lucide-react';

interface QuizLabProps {
  onLaunchSimulator: (tCode: string) => void;
  onUpdateScore: (answered: number, correct: number) => void;
}

export const QuizLab: React.FC<QuizLabProps> = ({
  onLaunchSimulator,
  onUpdateScore,
}) => {
  const [selectedModule, setSelectedModule] = useState<SAPModuleId | 'ALL'>('ALL');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Filtered questions
  const questions = selectedModule === 'ALL'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.module === selectedModule);

  const activeQuestion: QuizQuestion | undefined = questions[currentIdx] || questions[0];

  const handleSelectOption = (optIndex: number) => {
    if (!activeQuestion || userAnswers[activeQuestion.id] !== undefined) return;

    const newAnswers = { ...userAnswers, [activeQuestion.id]: optIndex };
    setUserAnswers(newAnswers);
    setShowExplanation(true);

    // Calculate score
    const totalAnswered = Object.keys(newAnswers).length;
    const totalCorrect = Object.entries(newAnswers).filter(([qId, ans]) => {
      const q = QUIZ_QUESTIONS.find((item) => item.id === qId);
      return q && q.correctIndex === ans;
    }).length;

    onUpdateScore(totalAnswered, totalCorrect);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowExplanation(false);
    setCurrentIdx(0);
    onUpdateScore(0, 0);
  };

  if (!activeQuestion) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
        Bu modül için henüz soru eklenmedi.
      </div>
    );
  }

  const answeredChoice = userAnswers[activeQuestion.id];
  const isAnswered = answeredChoice !== undefined;
  const isCorrect = isAnswered && answeredChoice === activeQuestion.correctIndex;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
      
      {/* Header and Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
              ?
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Zihinsel Simülasyon & Görsel Buton Sınavı
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            "Şu an depodasın / muhasebedesin, hangi butona basarsın?" senaryo testleri
          </p>
        </div>

        {/* Module Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {(['ALL', 'SD', 'MM', 'FICO'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setSelectedModule(m);
                setCurrentIdx(0);
                setShowExplanation(false);
              }}
              className={`px-3 py-1 font-medium rounded-md transition-colors ${
                selectedModule === m
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m === 'ALL' ? 'Tümü (6 Soru)' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Question Info */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-purple-400 font-bold">
            Soru {currentIdx + 1} / {questions.length}
          </span>
          <span className="text-slate-600">·</span>
          <span className="bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded text-[11px]">
            {activeQuestion.module} Modülü ({activeQuestion.tCode})
          </span>
        </div>

        <button
          onClick={handleReset}
          className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Testi Sıfırla</span>
        </button>
      </div>

      {/* Scenario Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wide">
          <Sparkles className="w-4 h-4" />
          <span>Zihinsel Simülasyon Senaryosu</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          "{activeQuestion.scenarioText}"
        </p>

        <div className="pt-2 border-t border-slate-800 text-sm font-semibold text-white">
          {activeQuestion.question}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {activeQuestion.options.map((option, idx) => {
          let btnClass = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

          if (isAnswered) {
            if (idx === activeQuestion.correctIndex) {
              btnClass = 'bg-emerald-950/80 border-emerald-500/80 text-emerald-200 font-semibold shadow-sm shadow-emerald-500/20';
            } else if (idx === answeredChoice) {
              btnClass = 'bg-red-950/80 border-red-500/80 text-red-200 font-semibold';
            } else {
              btnClass = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnClass}`}
            >
              <span className="w-6 h-6 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation & Mental Trick (Shown after answering) */}
      {isAnswered && (
        <div className={`p-4 rounded-xl border space-y-3 ${
          isCorrect
            ? 'bg-emerald-950/40 border-emerald-500/40'
            : 'bg-amber-950/40 border-amber-500/40'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold">
            {isCorrect ? (
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>TEBRİKLER! DOĞRU CEVAP</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-amber-400">
                <XCircle className="w-4 h-4" />
                <span>DİKKAT: YANLIŞ CEVAP</span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            {activeQuestion.explanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
              <span className="font-bold text-sky-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Görsel Koordinat Tarifi</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activeQuestion.visualCoordinateHint}
              </p>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hafıza Kuralı</span>
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activeQuestion.mentalTrick}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => onLaunchSimulator(activeQuestion.tCode)}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1.5 font-medium transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Bu ekranı ({activeQuestion.tCode}) simülatörde gör</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>{currentIdx < questions.length - 1 ? 'Sonraki Soru' : 'Başa Dön'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
