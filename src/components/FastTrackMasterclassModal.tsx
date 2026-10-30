/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { sapSound } from '../utils/audioEffects';
import {
  Zap,
  X,
  ArrowRight,
  CheckCircle2,
  Package,
  Truck,
  FileText,
  DollarSign,
  ShoppingCart,
  Layers,
  Sparkles,
  Play,
  RotateCcw,
  ExternalLink,
  Keyboard,
  Building2,
  Compass,
} from 'lucide-react';

interface FastTrackMasterclassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchTCode: (tCode: string) => void;
}

export const FastTrackMasterclassModal: React.FC<FastTrackMasterclassModalProps> = ({
  isOpen,
  onClose,
  onLaunchTCode,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeFlow, setActiveFlow] = useState<'SD' | 'MM'>('SD');
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  if (!isOpen) return null;

  const sdSteps = [
    {
      step: 1,
      tCode: 'VA01',
      title: '1. Adım: Müşteri Siparişi Girişi (VA01)',
      subtitle: 'Müşteri aradı ve 10 adet ürün istedi',
      whatHappens: 'Sipariş Türü "ZOR/OR", Müşteri "100021 Koçak Lojistik", Malzeme "MAT-TURK-01" girilir. Sistem fiyatı, iskonto ve KDV\'yi otomatik hesaplar.',
      result: 'Belge Numarası Oluşur: Örn. 14205. Henüz stok düşmez, fatura kesilmez.',
      icon: <ShoppingCart className="w-5 h-5 text-sky-400" />,
      color: 'sky',
    },
    {
      step: 2,
      tCode: 'VL01N',
      title: '2. Adım: Depoya Teslimat Emri Açma (VL01N)',
      subtitle: 'Siparişi depocunun ekranına düşürme',
      whatHappens: 'Sipariş numarası (14205) referans verilir, Sevkiyat Noktası "1010 / TR01" seçilir ve Devam butonuna basılır.',
      result: 'Giden Teslimat Belgesi oluşur: Örn. 80040620. Depo ekibine toplama talimatı iletilir.',
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
      color: 'indigo',
    },
    {
      step: 3,
      tCode: 'VL02N',
      title: '3. Adım: Depoda Çekme ve Mal Çıkışı (VL02N - PGI)',
      subtitle: 'Forklift malı raftan çeker ve kamyona yükler',
      whatHappens: 'Çekme (Picking) sekmesinde toplanan miktar (10 ST) yazılır. Sağ alttaki "Mal çıkışını kaydet (Post Goods Issue)" butonuna basılır.',
      result: '🔴 DİKKAT: Stok depodan RESMEN düşer! Muhasebede Satılan Malın Maliyeti (621 Borç / 153 Alacak) fişi anında kesilir.',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      color: 'amber',
    },
    {
      step: 4,
      tCode: 'VF01',
      title: '4. Adım: Müşteri Faturasını Kesme (VF01)',
      subtitle: 'Muhasebe parayı tahsil etmek için faturayı oluşturur',
      whatHappens: 'Teslimat numarası (80040620) girilir, Kaydet butonuna basılır. GİB e-Fatura entegratörüne XML gider.',
      result: 'Fatura Belgesi oluşur: Örn. 90017855. Muhasebe kaydı otomatik oluşur: 120 Alıcılar (Borç) / 600 Yurtiçi Satışlar & 391 Hesaplanan KDV (Alacak).',
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
    },
  ];

  const mmSteps = [
    {
      step: 1,
      tCode: 'ME21N',
      title: '1. Adım: Satınalma Siparişi Yarat (ME21N)',
      subtitle: 'Tedarikçiye hammadde siparişi verme',
      whatHappens: 'Satıcı (Vendor: 320001), Tesis (1000) ve Malzeme (ROH-01) seçilir. Fiyat ve teslimat tarihi belirlenir.',
      result: 'Satınalma Siparişi (PO) numarası oluşur: Örn. 4500012900.',
      icon: <Package className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
    },
    {
      step: 2,
      tCode: 'MIGO',
      title: '2. Adım: Fabrika Kapısında Mal Kabulü (MIGO - 101)',
      subtitle: 'Kamyon geldiğinde malları depoya alma',
      whatHappens: 'Hareket Türü "101 (Satınalma siparişine istinaden mal girişi)" seçilir. Gelen irsaliye miktarı sayılır ve onaylanır.',
      result: '🟢 Depo Stoğu Artar! Muhasebede 150/153 Stok Hesabı (Borç) / 102/320 Geçiçi Tedarik Borcu (Alacak) oluşur.',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      color: 'sky',
    },
    {
      step: 3,
      tCode: 'MIRO',
      title: '3. Adım: Gelen Satıcı Faturası Girişi (MIRO)',
      subtitle: 'Tedarikçinin gönderdiği faturayı eşleştirme (3-Way Match)',
      whatHappens: 'Sipariş (PO) ve Mal Kabul (GR) belgeleri fatura tutarıyla karşılaştırılır. Miktar ve fiyat tutuyorsa onaylanır.',
      result: 'Satıcı Cari Hesabı (320) borçlandırılır ve ödeme planına alınır.',
      icon: <FileText className="w-5 h-5 text-purple-400" />,
      color: 'purple',
    },
    {
      step: 4,
      tCode: 'FB60',
      title: '4. Adım: Bankadan Satıcıya Ödeme Yapma (F-53 / F110)',
      subtitle: 'Muhasebe parayı banka hesabından transfer eder',
      whatHappens: 'Garanti / İş Bankası ticari hesabı seçilir, satıcının açık faturası kapatılır.',
      result: '102 Banka (Alacak) / 320 Satıcı (Borç). Süreç başarıyla kapanır!',
      icon: <DollarSign className="w-5 h-5 text-amber-400" />,
      color: 'amber',
    },
  ];

  const currentSteps = activeFlow === 'SD' ? sdSteps : mmSteps;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-amber-500/50 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-amber-950 px-5 py-3.5 border-b border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 font-bold">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>HIZLI SAP ÖĞRENİMİ (3 DAKİKALIK ŞAMPİYON ÖZETİ)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50">
                  En Kritik 4 Adım
                </span>
              </h2>
              <p className="text-xs text-amber-200/80">
                SAP'de dönen tüm işlerin %90'ı işte bu zincirden ibarettir!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector: Satış & Dağıtım (SD) vs Satınalma & Depo (MM) */}
        <div className="bg-slate-950/80 px-5 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveFlow('SD');
                setActiveStep(1);
                sapSound.playTab();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFlow === 'SD'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>1. Satış & Dağıtım Zinciri (VA01 ➔ VL01N ➔ VL02N ➔ VF01)</span>
            </button>

            <button
              onClick={() => {
                setActiveFlow('MM');
                setActiveStep(1);
                sapSound.playTab();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFlow === 'MM'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>2. Satınalma & Depo Zinciri (ME21N ➔ MIGO ➔ MIRO ➔ F-53)</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-amber-400 hidden sm:inline">
            Şirket Kodu: TR01 / 1010
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-900/90">
          
          {/* Step Sequence Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {currentSteps.map((s) => {
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setActiveStep(s.step);
                    sapSound.playClick();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-bold text-amber-300">
                      Adım {s.step}
                    </span>
                    <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.2 rounded text-white font-bold">
                      /{s.tCode}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {s.icon}
                    <span className="text-xs font-bold text-white line-clamp-1">
                      {s.tCode}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          {(() => {
            const stepInfo = currentSteps.find((s) => s.step === activeStep) || currentSteps[0];
            return (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {stepInfo.icon}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {stepInfo.title}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium">
                        {stepInfo.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      sapSound.playEnter();
                      onClose();
                      onLaunchTCode(stepInfo.tCode);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                  >
                    <span>Bu Ekranı Simülatörde Dene (/{stepInfo.tCode})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-sky-400 flex items-center gap-1">
                      <span>⚙️ Ne Yapılır? (İşlem Mantığı):</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11.5px]">
                      {stepInfo.whatHappens}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <span>🎯 Sistemde Ne Değişir? (Sonuç):</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11.5px]">
                      {stepInfo.result}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Golden Rules Strip (Ezberlenecek 4 Kural) */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Keyboard className="w-4 h-4" />
              <span>Ezberlemen Gereken 5 Süper Kısayol (Bunu Bil, Gerisini Unut!)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold">/n[Kod]</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Bulunduğun yerden o ekrana fırlar (Örn: /nVA01)</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold">/o[Kod]</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Mevcut ekranı kapatmadan yeni sekmede açar</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold">/n</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Doğrudan ana Fiori / Easy Access menüsüne döner</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold">F4</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Kutucuğun arama yardımını ve seçeneklerini açar</p>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="font-mono text-amber-400 font-bold">Ctrl + S</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Belgeyi sisteme kaydeder (Sol altta yeşil mesaj)</p>
              </div>
            </div>
          </div>

          {/* Quick 10-Second Mastery Check */}
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-amber-950/40 border border-amber-500/40 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>10 Saniyelik Hızlı Kontrol: Stok Ne Zaman Depodan Düşer?</span>
              </span>
              {quizAnswer !== null && (
                <button
                  onClick={() => setQuizAnswer(null)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Tekrar Dene</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 1, text: 'A) Müşteri siparişi girildiğinde (VA01)', isCorrect: false },
                { id: 2, text: 'B) Mal çıkışı (PGI) kaydedildiğinde (VL02N)', isCorrect: true },
                { id: 3, text: 'C) Fatura kesildiğinde (VF01)', isCorrect: false },
              ].map((opt) => {
                const isSelected = quizAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setQuizAnswer(opt.id);
                      if (opt.isCorrect) {
                        sapSound.playSuccess();
                      } else {
                        sapSound.playClick();
                      }
                    }}
                    className={`p-2 rounded-lg text-xs font-semibold text-left transition-all border ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/40'
                          : 'bg-rose-950 border-rose-400 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {quizAnswer !== null && (
              <p className="text-[11px] font-medium pt-1 text-emerald-400">
                {quizAnswer === 2
                  ? '🎉 DOĞRU! Sipariş sadece niyet bildirir, fatura sadece parasal kayıttır. Fiziki mal çıkışı (PGI) VL02N ile yapıldığı anda stok ve maliyet düşer!'
                  : '❌ Yanlış! Doğru cevap B şıkkıdır: Sipariş girildiğinde stok düşmez; VL02N Mal Çıkışı (PGI) yapıldığında resmi olarak stok azalır.'}
              </p>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Artık mantığı biliyorsunuz: Sipariş ➔ Teslimat ➔ Çekme/Mal Çıkışı ➔ Fatura!</span>
          <button
            onClick={() => {
              sapSound.playEnter();
              onClose();
              onLaunchTCode('VA01');
            }}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>VA01 ile Hemen Başla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
