/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAP_DICTIONARY } from '../data/dictionaryData';
import { DictionaryItem, SAPModuleId } from '../types/sap';
import { Search, X, BookOpen, ArrowRight, Terminal } from 'lucide-react';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTCode: (tCode: string) => void;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
  onSelectTCode,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<SAPModuleId | 'ALL'>('ALL');

  if (!isOpen) return null;

  const filteredItems = SAP_DICTIONARY.filter((item) => {
    const matchesModule = selectedModule === 'ALL' || item.module === selectedModule;
    const query = searchTerm.toLowerCase();
    const matchesQuery =
      item.english.toLowerCase().includes(query) ||
      item.turkish.toLowerCase().includes(query) ||
      (item.tCode && item.tCode.toLowerCase().includes(query)) ||
      item.description.toLowerCase().includes(query);

    return matchesModule && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                SAP İngilizce - Türkçe Terim & T-Code Sözlüğü
              </h3>
              <p className="text-xs text-slate-400">
                Tüm SD, MM, FICO terimleri, işlem kodları ve Türkiye mevzuat notları
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Terim, T-Code veya Türkçe karşılık ara (Örn: Sales Order, VA01, PGI)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Module Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['ALL', 'SD', 'MM', 'FICO'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModule(m)}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  selectedModule === m
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m === 'ALL' ? 'Tümü' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Dictionary Table / List View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              "{searchTerm}" ile eşleşen SAP terimi bulunamadı.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl transition-all space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.english}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-bold text-sky-400 text-sm">{item.turkish}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.tCode && (
                      <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                        {item.tCode}
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.module} · {item.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.turkeyLocalizationNote && (
                  <div className="text-[11px] text-emerald-400/90 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40 leading-relaxed">
                    <strong>🇹🇷 Türkiye Notu:</strong> {item.turkeyLocalizationNote}
                  </div>
                )}

                {item.tCode && (item.tCode.includes('VA01') || item.tCode.includes('VL01N') || item.tCode.includes('VF01') || item.tCode.includes('MIGO') || item.tCode.includes('FB50')) && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => {
                        const code = item.tCode?.split(' ')[0].split('/')[0] || 'VA01';
                        onSelectTCode(code);
                        onClose();
                      }}
                      className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Terminal className="w-3 h-3" />
                      <span>Simülatörde Canlandır ({item.tCode.split(' ')[0]})</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 text-xs text-slate-500 flex items-center justify-between">
          <span>Toplam {filteredItems.length} terim listelendi</span>
          <span>S/4HANA Türkiye Sözlüğü</span>
        </div>

      </div>
    </div>
  );
};
