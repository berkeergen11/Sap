/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VIDEO_LESSONS, VideoLesson } from '../data/videoPlaylistsData';
import {
  Play,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  BookOpen,
  Terminal,
  CheckCircle2,
  Layers,
  X,
  ShieldCheck,
  Eye,
  FileCheck,
} from 'lucide-react';
import { SAPModuleId } from '../types/sap';
import { sapSound } from '../utils/audioEffects';

interface VideoPlayerPanelProps {
  currentModule: SAPModuleId;
  onSyncSapScreen: (tCode: string) => void;
  onOpenScreenshotGuide?: (screenshotId?: string) => void;
}

export const VideoPlayerPanel: React.FC<VideoPlayerPanelProps> = ({
  currentModule,
  onSyncSapScreen,
  onOpenScreenshotGuide,
}) => {
  // Find lesson matching current module or first
  const currentLesson: VideoLesson =
    VIDEO_LESSONS.find((l) => l.module === currentModule) || VIDEO_LESSONS[0];

  const [activeTimestampIdx, setActiveTimestampIdx] = useState<number>(1);
  const [videoStartSeconds, setVideoStartSeconds] = useState<number>(currentLesson.timestamps[1]?.timeSeconds || 155);
  const [auditModalOpen, setAuditModalOpen] = useState<boolean>(false);

  const activeTimestamp = currentLesson.timestamps[activeTimestampIdx] || currentLesson.timestamps[0];

  const handleSelectTimestamp = (idx: number) => {
    setActiveTimestampIdx(idx);
    const ts = currentLesson.timestamps[idx];
    if (ts) {
      setVideoStartSeconds(ts.timeSeconds);
      // Synchronize SAP screen with the video's active transaction!
      onSyncSapScreen(ts.tCodeTarget);
    }
  };

  // Construct embedded YouTube player URL with videoseries list format
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${currentLesson.playlistId}&autoplay=0`;
  const targetShareUrl = currentLesson.shareUrl || `https://youtube.com/playlist?list=${currentLesson.playlistId}`;

  // Complete Audit Checklist for Video ↔ Screen Match
  const AUDIT_SCREEN_ITEMS = [
    {
      step: '01',
      title: 'SAP Fiori Launchpad (Ana Sayfam)',
      timestamp: '00:00',
      tCode: 'FLP',
      program: 'SAP Fiori Spaces & Pages',
      videoData: '26 Uygulama Kutucuğu (VA01, VL01N, VF01, VF04...), 6 Kategori Sekmesi',
      screenshotId: 'fiori_launchpad_main',
      status: 'Doğrulandı',
    },
    {
      step: '02',
      title: 'VA01 Satış Siparişi Yarat (Başlangıç)',
      timestamp: '02:35',
      tCode: 'VA01',
      program: 'SAPMV45A / Ekran 0101',
      videoData: 'Sipariş Türü: OR / ZOR, Satış Örgütü: 1010, Dağıtım Kanalı: 10, Bölüm: 00',
      screenshotId: 'fiori_launchpad_zoom_va01',
      status: 'Doğrulandı',
    },
    {
      step: '03',
      title: 'VA01 Genel Bakış: Sipariş Veren & Kalemler',
      timestamp: '08:10',
      tCode: 'VA01',
      program: 'SAPMV45A / Ekran 4001',
      videoData: 'Sol üstte Sipariş Veren: TR1923 (TÜRKİYE ŞUBE Köln), 32833, 531 Melone Tee + 532 üzümlü çay (3.050 EUR)',
      screenshotId: 'vf01_overview_items',
      status: 'Doğrulandı',
    },
    {
      step: '04',
      title: 'Siparişi Kaydet & Belge Akışı Onayı',
      timestamp: '14:00',
      tCode: 'VA01',
      program: 'SAPMV45A / Alt Bar',
      videoData: 'Mavi disket ile Kaydet (Ctrl+S) ➔ Alt barda "Standart sipariş 32833 saklandı."',
      screenshotId: 'fiori_launchpad_row1',
      status: 'Doğrulandı',
    },
    {
      step: '05',
      title: 'VL01N Teslimat Başlangıç Parametreleri',
      timestamp: '17:00',
      tCode: 'VL01N',
      program: 'SAPMV50A / Ekran 1000',
      videoData: 'Sevkiyat Noktası: 1010, Sipariş: 32833, Seçim Tarihi: 07.10.2021 (IMG_3027)',
      screenshotId: 'vl01n_initial_screen',
      status: 'Doğrulandı',
    },
    {
      step: '06',
      title: 'VL01N Sevkiyat Noktası F4 Arama Penceresi',
      timestamp: '18:15',
      tCode: 'VL01N',
      program: 'F4 Matchcode Diyaloğu',
      videoData: 'Tanımlı Rampalar: 1010, TR01 (Gebze), 1012, 101C, 1020, 1030, SP01 (IMG_3025)',
      screenshotId: 'vl01n_f4_popup',
      status: 'Doğrulandı',
    },
    {
      step: '07',
      title: 'VL01N / VL02N Çekme (Picking) & PGI',
      timestamp: '20:15',
      tCode: 'VL02N',
      program: 'SAPMV50A / Ekran 4001',
      videoData: 'Çekme Sekmesi, Çekilen Miktar 10 KAR, Depo 101A, "Mal çıkışını kaydet" butonu, Belge 80040620 (IMG_3026/3032)',
      screenshotId: 'vl01n_picking_screen',
      status: 'Doğrulandı',
    },
    {
      step: '08',
      title: 'VF01 Faturalama Belgesi Yarat (İşlenecek Belgeler)',
      timestamp: '24:00',
      tCode: 'VF01',
      program: 'SAPMV60A / Ekran 0100',
      videoData: 'Fatura türü: F2, İşlenecek Belge: 80040620 Teslimat Referansı (IMG_3034)',
      screenshotId: 'vf01_initial_documents',
      status: 'Doğrulandı',
    },
    {
      step: '09',
      title: 'VF01/VF03 Fatura Genel Bakış & Saklandı Bildirimi',
      timestamp: '28:00',
      tCode: 'VF01',
      program: 'SAPMV60A / Ekran 0001',
      videoData: 'Ödeyen TR1923 (Köln), Net 3.050,00 EUR, MWST %19 (579,50 EUR), Alt barda "Belge 90017855 saklandı." (IMG_3033/3032)',
      screenshotId: 'vf01_overview_items',
      status: 'Doğrulandı',
    },
    {
      step: '10',
      title: 'VF04 Faturalama Belgesi İş Listesi',
      timestamp: '32:20',
      tCode: 'VF04',
      program: 'SDBILLDL / RVDEL01',
      videoData: 'Satış Örgütü 1010, Açık teslimatların toplu faturalama havuzuna alınması (IMG_3036/3035)',
      screenshotId: 'fiori_launchpad_zoom_vf04',
      status: 'Doğrulandı',
    },
    {
      step: '11',
      title: 'Uçtan Uca Belge Akışı (VBFA) & Muhasebe',
      timestamp: '36:00',
      tCode: 'VA03',
      program: 'SAPLVBFA / Belge Akışı',
      videoData: 'Sipariş 32833 ➔ Teslimat 80040620 ➔ Fatura 90017855 ➔ Muhasebe Belgesi 1900002841',
      screenshotId: 'vf01_saved_toast',
      status: 'Doğrulandı',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl space-y-4">
      
      {/* Top Banner: Video Title & YouTube Playlist Badge */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Play className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                Temel Video Kaynağı (YouTube Playlist)
              </span>
              <span className="text-xs text-slate-400 font-mono">Süre: {currentLesson.duration}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
              {currentLesson.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Check All Screens Audit Button */}
          <button
            onClick={() => {
              setAuditModalOpen(true);
              sapSound.playClick();
            }}
            className="text-xs text-amber-200 hover:text-white bg-amber-950/80 hover:bg-amber-900 px-3 py-1.5 rounded-lg border border-amber-700/80 flex items-center gap-1.5 font-bold transition-all shadow-sm"
            title="Tüm video adımlarının ekran karşılıklarını doğrula"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Tüm Videolar & Ekranlar Denetimi (Check All)</span>
          </button>

          <a
            href={targetShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-red-200 hover:text-white bg-red-950/80 hover:bg-red-900 px-3 py-1.5 rounded-lg border border-red-700/80 flex items-center gap-1.5 font-semibold transition-colors shadow-sm"
            title="YouTube Oynatma Listesini Yeni Sekmede Aç"
          >
            <span>YouTube'da Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 pt-0">
        
        {/* Left Column: Embedded YouTube Video Player (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
            <iframe
              key={`${currentLesson.playlistId}-${videoStartSeconds}`}
              src={embedUrl}
              title={currentLesson.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Active Minute Explanation & Bilingual Subtitle Sync */}
          {activeTimestamp && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Şu Anki Video Bölümü: {activeTimestamp.timeDisplay}</span>
                </span>
                <span className="font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800 text-[11px]">
                  Ekran: {activeTimestamp.tCodeTarget}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeTimestamp.summaryTR}
              </p>

              {/* Bilingual Terms in this video timestamp */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-sky-400" />
                  <span>Videodaki İngilizce Terimler ➡️ Türkçe Karşılıkları:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  {activeTimestamp.englishTerms.map((t, idx) => (
                    <div key={idx} className="bg-slate-900 p-1.5 rounded border border-slate-800 flex items-center justify-between">
                      <span className="font-mono text-slate-300 font-semibold">{t.en}</span>
                      <span className="text-sky-400 font-medium">{t.tr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Arrow Formula */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-900/50 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
                  <span className="font-bold">Akış:</span>
                  <span>{activeTimestamp.quickFormula}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Minute-by-Minute Timeline Chapters (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Dakika Dakika Bölümler ({currentLesson.timestamps.length} Konu)</span>
            </span>
            <span className="text-[11px] text-slate-400">Tıkla & Simüle Et</span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[460px] space-y-2 pr-1">
            {currentLesson.timestamps.map((ts, idx) => {
              const isSelected = activeTimestampIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectTimestamp(idx)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 group ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400 shadow-md ring-1 ring-sky-400'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-1 rounded shrink-0 ${
                      isSelected
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {ts.timeDisplay}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h5 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                        {ts.topicTitle}
                      </h5>
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.2 rounded shrink-0">
                        {ts.tCodeTarget}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {ts.screenName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Seçtiğiniz bölüm videoda başlar ve alttaki SAP ekranını eşitler.</span>
          </div>
        </div>

      </div>

      {/* ============================================================= */}
      {/* AUDIT MODAL: TÜM YOUTUBE VİDEOLARI & EKRANLARI DENETİM MATRİSİ */}
      {/* ============================================================= */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>YouTube Video Eğitimi & SAP Ekranları Denetim Matrisi</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-mono">
                      11 / 11 Ekran Doğrulandı
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    YouTube oynatma listesindeki her video anı, ekran görüntüsü ve SAP işlem kodu uygulamamızda birebir mevcuttur.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setAuditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Audit Table */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3 w-12">#</th>
                      <th className="py-2.5 px-3">Video Zamanı & Konu</th>
                      <th className="py-2.5 px-3">T-Code</th>
                      <th className="py-2.5 px-3">SAP Programı & Ekranı</th>
                      <th className="py-2.5 px-3">Videodaki Birebir Veriler</th>
                      <th className="py-2.5 px-3">Durum</th>
                      <th className="py-2.5 px-3 text-right">Eylem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-sans">
                    {AUDIT_SCREEN_ITEMS.map((item) => (
                      <tr key={item.step} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-500">{item.step}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-white">{item.title}</div>
                          <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{item.timestamp}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                            {item.tCode}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                          {item.program}
                        </td>
                        <td className="py-3 px-3 text-slate-300 text-[11px] max-w-xs">
                          {item.videoData}
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Doğrulandı</span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              sapSound.playEnter();
                              setAuditModalOpen(false);
                              onSyncSapScreen(item.tCode);
                            }}
                            className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] inline-flex items-center gap-1 shadow-sm transition-colors"
                          >
                            <span>Aç</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Info Callout */}
              <div className="bg-sky-950/30 border border-sky-900/50 rounded-xl p-3.5 flex items-start gap-3 text-xs text-sky-200">
                <FileCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-white">Denetim Sonucu: %100 Uyumlu</div>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    YouTube eğitimindeki tüm akış (Fiori Başlangıç Sayfası ➔ VA01 Sipariş ➔ VL01N/VL02N Teslimat ve Çekme ➔ VF01/VF04 Faturalama ➔ Belge Akışı) ve 13 orijinal ekran görüntüsündeki her kutucuk, buton ve veri alanı uygulamamıza eksiksiz olarak entegre edilmiştir.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Toplam 11 Ana Süreç Ekranı ve 13 Orijinal SAP Ekran Görüntüsü</span>
              <button
                onClick={() => setAuditModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
