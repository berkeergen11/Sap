/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowStep } from '../types/sap';
import { ArrowRight, Copy, Check, Sparkles, Terminal } from 'lucide-react';

interface ArrowFormulaViewProps {
  arrowStep: ArrowStep;
  onLaunchSimulator: (tCode: string) => void;
}

export const ArrowFormulaView: React.FC<ArrowFormulaViewProps> = ({
  arrowStep,
  onLaunchSimulator,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(arrowStep.quickFormula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-6">
      
      {/* Title & Process name */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center font-mono font-bold text-sky-300 shadow-inner">
            {arrowStep.tCode}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {arrowStep.processTitle} - Saniyelik Ok Akışı
            </h3>
            <p className="text-xs text-slate-400">
              Ezberlemeye gerek kalmadan adım adım takip edilebilir formül
            </p>
          </div>
        </div>

        <button
          onClick={() => onLaunchSimulator(arrowStep.tCode)}
          className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Terminal className="w-4 h-4" />
          <span>Simülatörde Uygula</span>
        </button>
      </div>

      {/* Main Single-Line Quick Formula Box with Copy Button */}
      <div className="bg-slate-950 border border-sky-500/30 rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 overflow-x-auto w-full">
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Ok İşaretli Hızlı Formül (Quick Formula)
          </span>
          <div className="font-mono text-sm md:text-base font-bold text-white tracking-wide whitespace-nowrap py-1">
            {arrowStep.quickFormula}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-2 shrink-0 transition-colors shadow-sm"
          title="Panoya Kopyala"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
          <span>{copied ? 'Kopyalandı!' : 'Formülü Kopyala'}</span>
        </button>
      </div>

      {/* Step-by-Step Flow Cards */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
          Adım Adım Eylem Zinciri ({arrowStep.flowSteps.length} Adım)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {arrowStep.flowSteps.map((step) => {
            const getBadgeColor = () => {
              switch (step.actionType) {
                case 'tcode':
                  return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
                case 'tab':
                  return 'bg-amber-950/80 text-amber-300 border-amber-500/40';
                case 'field':
                  return 'bg-blue-950/80 text-blue-300 border-blue-500/40';
                case 'button':
                  return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
                case 'verify':
                  return 'bg-slate-800 text-slate-300 border-slate-700';
              }
            };

            const getTypeName = () => {
              switch (step.actionType) {
                case 'tcode':
                  return 'T-Code';
                case 'tab':
                  return 'Sekme';
                case 'field':
                  return 'Giriş Alanı';
                case 'button':
                  return 'Buton / Tuş';
                case 'verify':
                  return 'Doğrulama';
              }
            };

            return (
              <div
                key={step.stepNumber}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-lg p-3 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-slate-800 font-mono font-bold text-xs text-sky-400 flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${getBadgeColor()}`}
                    >
                      {getTypeName()}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-white font-mono flex items-center gap-1">
                      {step.text}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                  {step.shortcut ? (
                    <kbd className="bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-sky-300 font-mono">
                      {step.shortcut}
                    </kbd>
                  ) : (
                    <span className="text-slate-500">Standart</span>
                  )}

                  {step.turkeyContext && (
                    <span className="text-emerald-400 font-medium">🇹🇷 TR Özelliği</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
