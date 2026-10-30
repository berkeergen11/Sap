/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SAPModuleId, LearningMode } from '../types/sap';
import { SAP_MODULES } from '../data/sapModulesData';
import { BookOpen, HelpCircle, Layers, ShieldCheck, Terminal, Sparkles, Activity, Zap } from 'lucide-react';

interface HeaderProps {
  currentModule: SAPModuleId;
  onSelectModule: (module: SAPModuleId) => void;
  learningMode: LearningMode;
  onSelectMode: (mode: LearningMode) => void;
  onOpenDictionary: () => void;
  onOpenScreenshotGuide?: (screenshotId?: string) => void;
  onOpenFirstDayGuide?: () => void;
  onOpenFastTrack?: () => void;
  quizScore: { answered: number; correct: number };
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  onSelectModule,
  learningMode,
  onSelectMode,
  onOpenDictionary,
  onOpenScreenshotGuide,
  onOpenFirstDayGuide,
  onOpenFastTrack,
  quizScore,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Bar Contract: 3 Zones with gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <div
          onClick={() => onSelectMode('fiori_launchpad')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          title="Fiori Başlangıç Sayfasına Git"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20 font-mono font-bold text-white text-base group-hover:scale-105 transition-transform">
            SAP
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              SAP Akademi Türkiye
            </span>
            <span className="text-[11px] text-sky-400 font-mono">
              S/4HANA 2026 TR Edition
            </span>
          </div>
        </div>

        {/* Zone 2: All 11 SAP Modules Navigation */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1 max-w-2xl scrollbar-none">
          {([
            { id: 'SD', label: 'SD (Satış)' },
            { id: 'MM', label: 'MM (Satınalma/Depo)' },
            { id: 'FI', label: 'FI (Mali Muhasebe)' },
            { id: 'CO', label: 'CO (Maliyet)' },
            { id: 'PP', label: 'PP (Üretim/BOM)' },
            { id: 'QM', label: 'QM (Kalite Kontrol)' },
            { id: 'PM', label: 'PM (Bakım Onarım)' },
            { id: 'WM', label: 'WM (Depo/EWM)' },
            { id: 'HCM', label: 'HCM (İK/Bordro)' },
            { id: 'PS', label: 'PS (Proje/WBS)' },
            { id: 'BASIS', label: 'BASIS (Sistem/ABAP)' },
          ] as Array<{ id: SAPModuleId; label: string }>).map((item) => {
            const mod = SAP_MODULES[item.id];
            const isActive = currentModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  isActive
                    ? 'bg-sky-500/25 text-sky-200 border border-sky-400/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={mod.description}
              >
                <span>{item.label}</span>
                {item.id === 'SD' && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-500/25 text-amber-300 rounded font-normal">
                    Öncelik
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <div className="h-4 w-px bg-slate-700 mx-1" aria-hidden="true" />

          {/* New SAP First Day Guide Button */}
          {onOpenFirstDayGuide && (
            <button
              onClick={() => onOpenFirstDayGuide()}
              className="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 shadow-sm"
              title="Yeni bir şirkette veya projede SAP aldığınızda karşınıza çıkacak gerçek ekranlar ve süreçler"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Yeni SAP'de İlk Günüm?</span>
            </button>
          )}

          {/* Real Screenshots Button */}
          {onOpenScreenshotGuide && (
            <button
              onClick={() => onOpenScreenshotGuide()}
              className="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm"
              title="YouTube eğitim videosundan alınan 13 birebir orijinal SAP ekran görüntüsü"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>13 Video Ekranı</span>
            </button>
          )}

          <button
            onClick={() => onSelectMode('turkey_localization')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              learningMode === 'turkey_localization'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="sapnotlarim.com & basakvarlioglu.com Türkçe SAP Danışman Rehberi ve Doküman Portalı"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>TR Bilgi Bankası</span>
          </button>
        </div>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Fast-Track Crash Course Button */}
          {onOpenFastTrack && (
            <button
              onClick={() => onOpenFastTrack()}
              className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 ring-1 ring-amber-300"
              title="SAP'yi 3 dakikada hızla öğren: 4 kritik adım, kısayollar ve canlı simülatör"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>HIZLA ÖĞREN</span>
            </button>
          )}

          <button
            onClick={onOpenDictionary}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="İngilizce - Türkçe Terim ve T-Code Sözlüğü"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">SAP Sözlüğü</span>
          </button>

          <button
            onClick={() => onSelectMode(learningMode === 'fiori_launchpad' ? 'simulator' : 'fiori_launchpad')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              learningMode === 'fiori_launchpad'
                ? 'bg-sky-500 text-white hover:bg-sky-400 shadow-sky-500/25 ring-2 ring-sky-400/30'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-200" />
            <span>Fiori Başlangıç</span>
          </button>
        </div>

      </div>

      {/* Sub-bar: Mode Switcher (Fiori / Tree / Simulator / X-Ray / Arrow) */}
      <div className="bg-slate-950/70 border-t border-slate-800/60 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto gap-4">
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => onSelectMode('fiori_launchpad')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                learningMode === 'fiori_launchpad'
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              <span>1. Fiori Başlangıç Sayfası (Modern SAP)</span>
            </button>

            <button
              onClick={() => onSelectMode('easy_access')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                learningMode === 'easy_access'
                  ? 'bg-amber-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>2. Klasik Ağaç Menüsü (/n)</span>
            </button>

            <button
              onClick={() => onSelectMode('simulator')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                learningMode === 'simulator'
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>3. WebGUI Simülatörü</span>
            </button>

            <button
              onClick={() => onSelectMode('coordinate_map')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                learningMode === 'coordinate_map'
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4. Koordinat Röntgeni</span>
            </button>

            <button
              onClick={() => onSelectMode('arrow_formula')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                learningMode === 'arrow_formula'
                  ? 'bg-sky-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>5. Ok Formülü</span>
            </button>

            <button
              onClick={() => onSelectMode('system_performance')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                learningMode === 'system_performance'
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="SAP S/4HANA Throughput, CPU ve BASIS Performans Monitörü (SM50, ST02, ST03N)"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>6. Sistem Performansı (SM50 / ST02)</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-400 hidden lg:flex items-center gap-2">
            <span className="font-semibold text-slate-300">Aktif Modül:</span>
            <span>{SAP_MODULES[currentModule].fullName}</span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-sky-400">{SAP_MODULES[currentModule].tCodes.join(', ')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
