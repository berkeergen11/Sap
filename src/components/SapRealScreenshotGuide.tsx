/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REAL_SAP_SCREENSHOTS, RealSapScreenshot } from '../data/realSapScreenshotsData';
import { sapSound } from '../utils/audioEffects';
import {
  X,
  ExternalLink,
  Play,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  ZoomIn,
} from 'lucide-react';

interface SapRealScreenshotGuideProps {
  isOpen: boolean;
  onClose: () => void;
  initialScreenshotId?: string;
  onLaunchSimulator: (tCode: string) => void;
}

export const SapRealScreenshotGuide: React.FC<SapRealScreenshotGuideProps> = ({
  isOpen,
  onClose,
  initialScreenshotId,
  onLaunchSimulator,
}) => {
  const [activeId, setActiveId] = useState<string>(
    initialScreenshotId || REAL_SAP_SCREENSHOTS[0].id
  );
  const [zoomModal, setZoomModal] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentScreenshot: RealSapScreenshot =
    REAL_SAP_SCREENSHOTS.find((s) => s.id === activeId) || REAL_SAP_SCREENSHOTS[0];

  const currentIndex = REAL_SAP_SCREENSHOTS.findIndex((s) => s.id === currentScreenshot.id);

  const handlePrev = () => {
    sapSound.playClick();
    const prevIdx = (currentIndex - 1 + REAL_SAP_SCREENSHOTS.length) % REAL_SAP_SCREENSHOTS.length;
    setActiveId(REAL_SAP_SCREENSHOTS[prevIdx].id);
  };

  const handleNext = () => {
    sapSound.playClick();
    const nextIdx = (currentIndex + 1) % REAL_SAP_SCREENSHOTS.length;
    setActiveId(REAL_SAP_SCREENSHOTS[nextIdx].id);
  };

  const handleLaunch = () => {
    sapSound.playEnter();
    onClose();
    onLaunchSimulator(currentScreenshot.relatedTCode);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Orijinal SAP S/4HANA Eğitim Ekran Görüntüleri Rehberi</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60">
                  {currentIndex + 1} / {REAL_SAP_SCREENSHOTS.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                YouTube eğitim videosundaki gerçek SAP sisteminden (ides.consolut.com) alınan 13 birebir ekran
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLaunch}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simülatörde Uygula ({currentScreenshot.relatedTCode})</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Split View (Left Thumbnails, Center Big Image, Right Callouts) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
          
          {/* Left Thumbnails List (3 cols) */}
          <div className="lg:col-span-3 bg-slate-950/70 border-r border-slate-800 p-3 overflow-y-auto space-y-2 max-h-[200px] lg:max-h-none scrollbar-thin">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-1">
              13 Eğitim Ekranı
            </div>
            {REAL_SAP_SCREENSHOTS.map((screen, idx) => {
              const isSelected = screen.id === currentScreenshot.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    sapSound.playClick();
                    setActiveId(screen.id);
                  }}
                  className={`w-full text-left p-2 rounded-xl transition-all border flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400/80 ring-1 ring-sky-400/50 shadow-md'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={screen.imagePath}
                    alt={screen.title}
                    className="w-14 h-10 object-cover rounded border border-slate-700 shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-sky-400">
                        {screen.tCode}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-white truncate">
                      {screen.stageName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center: Large Image Preview with Zoom (6 cols) */}
          <div className="lg:col-span-6 bg-black flex flex-col items-center justify-center relative p-3 overflow-hidden group">
            <div className="relative max-h-[500px] w-full flex items-center justify-center">
              <img
                src={currentScreenshot.imagePath}
                alt={currentScreenshot.title}
                className="max-h-[480px] w-auto max-w-full object-contain rounded-lg border border-slate-800 shadow-2xl transition-transform"
              />
              
              {/* Zoom In Button */}
              <button
                onClick={() => setZoomModal(true)}
                className="absolute bottom-3 right-3 p-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-lg border border-slate-700/80 shadow-lg flex items-center gap-1.5 text-xs font-medium backdrop-blur-sm"
                title="Tam Boyut İncele"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Büyüt</span>
              </button>
            </div>

            {/* Nav Arrows */}
            <div className="absolute inset-x-3 flex items-center justify-between pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg transition-transform active:scale-95"
                title="Önceki Ekran"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg transition-transform active:scale-95"
                title="Sonraki Ekran"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Step Details & Callouts (3 cols) */}
          <div className="lg:col-span-3 bg-slate-900/90 border-l border-slate-800 p-4 overflow-y-auto space-y-4">
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                {currentScreenshot.tCode} · {currentScreenshot.stageName}
              </span>
              <h3 className="text-sm font-bold text-white mt-2 leading-snug">
                {currentScreenshot.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {currentScreenshot.summary}
              </p>
            </div>

            {/* Critical Field Highlights */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Videoda Dikkat Edilen Noktalar
              </span>
              {currentScreenshot.keyCallouts.map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {c.title}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {c.location}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Launch CTA */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleLaunch}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Bu Adımı Simülatörde Aç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomModal && (
        <div
          onClick={() => setZoomModal(false)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={currentScreenshot.imagePath}
            alt={currentScreenshot.title}
            className="max-w-full max-h-full object-contain rounded shadow-2xl"
          />
          <button
            onClick={() => setZoomModal(false)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
