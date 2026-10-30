/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CoordinateMap } from '../types/sap';
import { Eye, MapPin, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

interface CoordinateMapCardProps {
  coordinateMap: CoordinateMap;
  onLaunchSimulator: (tCode: string) => void;
}

export const CoordinateMapCard: React.FC<CoordinateMapCardProps> = ({
  coordinateMap,
  onLaunchSimulator,
}) => {
  const { screenAnatomy, mentalVisualizationTip, tCode, turkishName, englishName } = coordinateMap;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-6">
      
      {/* Header with T-Code and titles */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center font-mono font-bold text-sky-300 text-lg shadow-inner">
            {tCode}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">{turkishName}</h3>
              <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                {englishName}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Görsel Hafıza ve Zihinsel Simülasyon Koordinat Haritası
            </p>
          </div>
        </div>

        <button
          onClick={() => onLaunchSimulator(tCode)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Terminal className="w-4 h-4" />
          <span>Bu Ekranı Simülatörde Canlandır</span>
        </button>
      </div>

      {/* Mental Visualization Highlight Box (Gözünde Canlandır) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Zihinsel Hafıza İpucu (Gözünde Canlandır)
            </h4>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {mentalVisualizationTip}
            </p>
          </div>
        </div>
      </div>

      {/* 4-Zone Anatomical X-Ray Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Zone 1: Sol Menü & Komut Satırı */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>1. Sol Menü & Komut Satırı Konumu</span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800/80">
            <p className="font-semibold text-sky-300 mb-1">Sol Üst Köşe (Komut Alanı):</p>
            <p>{screenAnatomy.commandBar}</p>
          </div>
          <div className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Sol Ağaç Menü Durumu: </span>
            {screenAnatomy.leftPanel}
          </div>
        </div>

        {/* Zone 2: Sağ Üst Butonlar ve Renkleri */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>2. Sağ Üst En Kritik Butonlar & Renkleri</span>
          </div>
          <div className="space-y-2">
            {screenAnatomy.topRightButtons.map((btn, idx) => (
              <div key={idx} className="bg-slate-900/80 p-2.5 rounded border border-slate-800 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{btn.label}</span>
                    {btn.shortcut && (
                      <kbd className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.2 rounded font-mono text-sky-300">
                        {btn.shortcut}
                      </kbd>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{btn.actionDescription}</p>
                </div>
                <span className="text-[11px] text-amber-300 font-mono shrink-0 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                  {btn.color}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Zone 3: Orta Alan Zorunlu Kutucuklar (Mandatory Fields) */}
        <div className="md:col-span-2 bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>3. Orta Alanda Doldurulması Zorunlu Kutucuklar (Fields Röntgeni)</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Sekmeler: {screenAnatomy.centerForm.tabs.join(' · ')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {screenAnatomy.centerForm.mandatoryFields.map((field, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 p-3 rounded-lg space-y-1.5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {field.name}
                  </span>
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-950 px-1.5 py-0.2 rounded">
                    {field.technicalName}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Konum:</strong> {field.location}
                </p>
                <p className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Neden Zorunlu:</strong> {field.whyMandatory}
                </p>
                <div className="text-[11px] text-emerald-400 bg-emerald-950/30 px-2 py-1 rounded font-mono border border-emerald-900/50">
                  Örnek Değer: {field.sampleValue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone 4: Alt Durum Çubuğu (Status Bar) */}
        <div className="md:col-span-2 bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">Alt Durum Çubuğu Röntgeni:</strong> {screenAnatomy.bottomStatusBar}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 shrink-0 hidden sm:inline">
            Status Code: [V1 311 / S&D]
          </span>
        </div>

      </div>

    </div>
  );
};
