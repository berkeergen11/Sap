/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Truck,
  Percent,
  Landmark,
  Terminal,
  ArrowRight,
  BookOpen,
  Layers,
  Database,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Calculator,
  Workflow,
  Sparkles,
  ClipboardList,
  Tag,
  Boxes,
  Compass,
  Code2,
  Search,
  Eye,
  Sliders,
  DollarSign,
  AlertCircle,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';
import { sapSound } from '../utils/audioEffects';

interface TurkeyLocalizationGuideProps {
  onSelectTCode: (tCode: string) => void;
}

type GuideSection =
  | 'basak_sd_cycle'
  | 'basak_fi_consulting'
  | 'basak_bapi_lsmw'
  | 'sapnotlarim_fico'
  | 'sapnotlarim_integration'
  | 'sapnotlarim_tables'
  | 'gib_e_transformation';

export const TurkeyLocalizationGuide: React.FC<TurkeyLocalizationGuideProps> = ({
  onSelectTCode,
}) => {
  const [activeSection, setActiveSection] = useState<GuideSection>('basak_sd_cycle');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleLaunch = (tCode: string) => {
    sapSound.playEnter();
    onSelectTCode(tCode);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner with Official Reference Credits & Search */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/70 to-slate-900 border border-sky-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
          <Database className="w-80 h-80 text-sky-400" />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/90 px-2.5 py-0.5 rounded border border-sky-600 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Türkçe SAP Danışman Doküman & Bilgi Bankası</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
                GİB & TDHP Uyumlu S/4HANA TR01
              </span>
              <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-700">
                Görsel Şemalar & BAPI/Tablo Kılavuzları
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Türkiye SAP Bilgi Bankası & Uzman Danışman Rehberi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Resmi kaynaklar <strong>basakvarlioglu.com</strong> ve <strong>sapnotlarim.com</strong> temel alınarak derlenmiş;
              uçtan uca satış döngüsü, VK11 koşul tekniği, Tekdüzen Hesap Planı (TDHP), OMWB/VKOA entegrasyonu,
              Özel Defteri Kebir (ÖDK), BAPI_ACC_DOCUMENT_POST, LSMW, FBL3N alan ekleme, F110 ödeme programı ve GİB e-Dönüşüm mevzuatını kapsayan eksiksiz kılavuz.
            </p>

            {/* Authoritative Resource Badges with Live Direct Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-400 font-medium">Yetkili Kaynaklar:</span>
              <a
                href="https://basakvarlioglu.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-sky-300 hover:text-sky-200 hover:bg-slate-700 border border-slate-700 font-mono text-xs transition-colors shadow-sm"
                title="Başak Varlıoğlu - Kıdemli SAP FI/SD Danışmanı ve Yazar"
              >
                <span>basakvarlioglu.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </a>
              <a
                href="https://sapnotlarim.com/sap-finansal-moduller-turkce-dokuman/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-amber-300 hover:text-amber-200 hover:bg-slate-700 border border-slate-700 font-mono text-xs transition-colors shadow-sm"
                title="SAP Notlarım - SAP Finansal Modüller Türkçe Döküman Portalı"
              >
                <span>sapnotlarim.com/sap-finansal-moduller-turkce-dokuman/</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
              <a
                href="https://youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN&si=lYO6edjoy60nBo_j"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-red-300 hover:text-red-200 hover:bg-slate-700 border border-red-900/60 font-mono text-xs transition-colors shadow-sm"
                title="YouTube Temel Kaynak SAP Video Eğitim Serisi"
              >
                <span>YouTube Video Eğitim Serisi</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Topic Search Bar */}
        <div className="relative mt-4 z-10">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Dokümanda ara (Örn: BAPI, LSMW, VK11, OMWB, F110, FBL3N, ÖDK, Tevkifat, BKPF, KE51)..."
            className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
          />
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('basak_sd_cycle');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'basak_sd_cycle'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 ring-2 ring-sky-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Workflow className="w-4 h-4 text-sky-200" />
          <span>Başak Varlıoğlu: SD Satış Döngüsü & VK11</span>
        </button>

        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('basak_fi_consulting');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'basak_fi_consulting'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25 ring-2 ring-purple-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4 text-purple-200" />
          <span>Başak Varlıoğlu: ÖDK, Duran Varlık & İkame</span>
        </button>

        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('basak_bapi_lsmw');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'basak_bapi_lsmw'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Code2 className="w-4 h-4 text-indigo-200" />
          <span>Başak Varlıoğlu: BAPI & LSMW & FBL3N</span>
        </button>

        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('sapnotlarim_fico');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'sapnotlarim_fico'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4 text-emerald-200" />
          <span>SAP Notlarım: FI/CO, F110 & TDHP</span>
        </button>

        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('sapnotlarim_integration');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'sapnotlarim_integration'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 ring-2 ring-amber-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Boxes className="w-4 h-4 text-amber-200" />
          <span>SAP Notlarım: MM-FI (OMWB) & SD-FI (VKOA)</span>
        </button>

        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('sapnotlarim_tables');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'sapnotlarim_tables'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25 ring-2 ring-cyan-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-cyan-200" />
          <span>Kritik Veritabanı Tabloları (SE11/SE16N)</span>
        </button>

        <button
          onClick={() => {
            sapSound.playClick();
            setActiveSection('gib_e_transformation');
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeSection === 'gib_e_transformation'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25 ring-2 ring-rose-400/40'
              : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-200" />
          <span>GİB e-Dönüşüm & Tevkifat Mevzuatı</span>
        </button>
      </div>

      {/* SECTION 1: Başak Varlıoğlu - SD Satış Döngüsü & VK11 Fiyat Koşul Tekniği */}
      {activeSection === 'basak_sd_cycle' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-sky-400" />
                  <span>Uçtan Uca Siparişten Nakde (Order-to-Cash) Süreci & Belge Akışı</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kaynak: <strong className="text-sky-300">basakvarlioglu.com</strong> — Kıdemli SAP Danışman Rehberi
                </p>
              </div>
              <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2.5 py-1 rounded border border-sky-700">
                SD + LE + FI Döngüsü
              </span>
            </div>

            {/* Visual Process Flow Diagram (Textbook Style) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 space-y-2 relative">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center border border-sky-500/40">
                  1
                </span>
                <h3 className="text-xs font-bold text-white flex items-center justify-between">
                  <span>VA01: Satış Siparişi</span>
                  <span className="font-mono text-[10px] text-sky-400">ZOR / OR</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Müşteri (100021) siparişi girilir. Miktar, teslim tarihi, ödeme koşulu ve fiyat şeması belirlenir.
                </p>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800">
                  Tablo: <strong className="text-sky-300">VBAK</strong> (Başlık), <strong className="text-sky-300">VBAP</strong> (Kalem)
                </div>
                <button
                  onClick={() => handleLaunch('VA01')}
                  className="w-full mt-2 py-1 text-[11px] font-semibold text-sky-300 bg-sky-950/60 hover:bg-sky-900 border border-sky-800 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  <span>VA01 Simüle Et</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 space-y-2 relative">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center border border-amber-500/40">
                  2
                </span>
                <h3 className="text-xs font-bold text-white flex items-center justify-between">
                  <span>VL01N: Teslimat & PGI</span>
                  <span className="font-mono text-[10px] text-amber-400">PGI / Çıkış</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Depodan toplama (picking) ve mal çıkışı (PGI) kaydedilir. Stok 601 hareketiyle düşer ve e-İrsaliye tetiklenir.
                </p>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800">
                  Tablo: <strong className="text-amber-300">LIKP</strong> (Başlık), <strong className="text-amber-300">LIPS</strong> (Kalem)
                </div>
                <button
                  onClick={() => handleLaunch('VL01N')}
                  className="w-full mt-2 py-1 text-[11px] font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  <span>VL01N Simüle Et</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 space-y-2 relative">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center border border-emerald-500/40">
                  3
                </span>
                <h3 className="text-xs font-bold text-white flex items-center justify-between">
                  <span>VF01: Faturalama</span>
                  <span className="font-mono text-[10px] text-emerald-400">GİB e-Fatura</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Teslimat referansıyla fatura üretilir. GİB entegratörüne XML UBL formatında iletilir ve FI belgesi otomatik oluşur.
                </p>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800">
                  Tablo: <strong className="text-emerald-300">VBRK</strong> (Başlık), <strong className="text-emerald-300">VBRP</strong> (Kalem)
                </div>
                <button
                  onClick={() => handleLaunch('VF01')}
                  className="w-full mt-2 py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  <span>VF01 Simüle Et</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 space-y-2 relative">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center border border-purple-500/40">
                  4
                </span>
                <h3 className="text-xs font-bold text-white flex items-center justify-between">
                  <span>VA03 / FB03: Belge Akışı</span>
                  <span className="font-mono text-[10px] text-purple-400">F5 Zincir</span>
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Siparişten faturaya ve 120 Müşteri Alacak muhasebe kaydına kadar tüm zincir F5 tuşuyla eksiksiz izlenir.
                </p>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800">
                  Tablo: <strong className="text-purple-300">VBFA</strong> (Belge Akışı İlişki Tablosu)
                </div>
                <button
                  onClick={() => handleLaunch('VA03')}
                  className="w-full mt-2 py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/60 hover:bg-purple-900 border border-purple-800 rounded transition-colors flex items-center justify-center gap-1"
                >
                  <Terminal className="w-3 h-3" />
                  <span>VA03 Belge Akışı</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Condition Technique (VK11 & PR00) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-400" />
                  <span>VK11 Fiyatlandırma Koşul Tekniği (Pricing Condition Technique)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Başak Varlıoğlu Rehberi: SAP SD'de dinamik fiyat, iskonto ve vergi hesaplama omurgası
                </p>
              </div>
              <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2.5 py-1 rounded border border-amber-700">
                T-Code: VK11
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h3 className="font-bold text-sky-400 text-sm">Temel Koşul Türleri (Condition Types)</h3>
                <ul className="space-y-2 text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="font-mono font-bold text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      PR00
                    </span>
                    <div>
                      <strong className="text-white">Brüt Fiyat (Gross Price):</strong> Malzemenin baz liste satış fiyatıdır. Satış örgütü, dağıtım kanalı ve müşteri bazında VK11 ile tanımlanır.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono font-bold text-emerald-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      K004 / K007
                    </span>
                    <div>
                      <strong className="text-white">Müşteri / Malzeme İskontosu:</strong> Hacim veya sözleşmeye bağlı oransal yüzde (%5, %10) iskonto indirimidir.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono font-bold text-purple-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      KF00
                    </span>
                    <div>
                      <strong className="text-white">Navlun Bedeli (Freight):</strong> Taşıma ve lojistik masraflarının faturaya eklenmesini sağlar.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono font-bold text-rose-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      MWST
                    </span>
                    <div>
                      <strong className="text-white">Katma Değer Vergisi (KDV):</strong> Türkiye yerelleştirmesinde %20 standart oranı otomatik hesaplar.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h3 className="font-bold text-emerald-400 text-sm">Sipariş Türleri & Ortak İşlevleri (Partner Functions)</h3>
                <div className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                  <p>
                    <strong className="text-white">Sipariş Türleri:</strong>
                    <br />
                    • <span className="text-amber-300 font-mono">ZOR:</span> Türkiye Standart Müşteri Satış Siparişi
                    <br />
                    • <span className="text-amber-300 font-mono">RE:</span> İade Siparişi (Satış faturasına ters kayıt)
                    <br />
                    • <span className="text-amber-300 font-mono">FD:</span> Bedelsiz Malzeme Teslimatı
                  </p>
                  <p className="pt-2 border-t border-slate-800">
                    <strong className="text-white">Müşteri Ortak İşlevleri (Partner Functions):</strong>
                    <br />
                    • <span className="text-sky-300 font-mono">SP (Sold-to Party):</span> Siparişi veren müşteri
                    <br />
                    • <span className="text-sky-300 font-mono">SH (Ship-to Party):</span> Malın fiziken sevk edileceği depo
                    <br />
                    • <span className="text-sky-300 font-mono">BP (Bill-to Party):</span> e-Faturanın kesileceği tüzel kişilik
                    <br />
                    • <span className="text-sky-300 font-mono">PY (Payer):</span> Ödemeyi yapacak banka/muhatap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Başak Varlıoğlu - FI Danışmanlık, ÖDK, Duran Varlıklar & İkame */}
      {activeSection === 'basak_fi_consulting' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span>Özel Defteri Kebir (ÖDK - Special G/L) Uyarlamaları</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kaynak: <strong className="text-purple-300">basakvarlioglu.com</strong> — "SAP FI Danışman Rehberi"
                </p>
              </div>
              <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2.5 py-1 rounded border border-purple-700">
                FB60 / F-02 / F-47 / F-54
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                SAP'de cariler (120 Müşteriler ve 320 Satıcılar) standart kayıtlarda ana mutabakat hesabına gider. 
                Ancak avans, teminat mektubu veya şüpheli alacak durumunda bu bakiyelerin bilançonun farklı kalemlerinde 
                gösterilmesi gerekir. İşte burada <strong className="text-white">Özel Defteri Kebir Göstergesi (ÖDK)</strong> devreye girer:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                    ÖDK 'A' : Avanslar
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Satıcıya sipariş öncesi avans verildiğinde 320 cari yerine <strong className="text-white">159 Verilen Sipariş Avansları</strong> hesabına borç kaydedilir. Müşteriden avans alındığında ise <strong className="text-white">340 Alınan Avanslar</strong> hesabına alacak yazılır.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                    ÖDK 'E' : Teminatlar
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    İhalelerde veya bayilik sözleşmelerinde alınan/verilen teminat mektubu ve depozitolar bilançoda <strong className="text-white">126/226 Verilen Depozito ve Teminatlar</strong> hesabına otomatik yönlendirilir.
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    F-47 & F-54 Mahsup
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Avans talebi <strong className="text-white">F-47</strong> ile açılır. Asıl fatura (FB60) sisteme girdiğinde <strong className="text-white">F-54</strong> ile avans mahsubu yapılarak açık kalem kapatılır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FI-AA Duran Varlıklar Mali Yıl Kapanışı & Doğrulama (Validation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sky-400 text-sm flex items-center gap-2">
                <Landmark className="w-4 h-4 text-sky-400" />
                <span>Duran Varlıklar (FI-AA) Yıl Sonu Kapanışı</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Başak Varlıoğlu dokümanlarında detaylandırılan kritik yıl sonu işlem zinciri:
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-sky-300 font-bold">1. AFAB:</span>
                  <span>12. ayın son amortisman çalıştırmasını (Depreciation Run) arka planda yürüt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-sky-300 font-bold">2. AJRW:</span>
                  <span>Mali Yıl Değişimi — Yeni mali yılın duran varlık tablolarını aç.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-sky-300 font-bold">3. AJAB:</span>
                  <span>Eski mali yılın duran varlık kayıtlarını nihai olarak kilitle ve kapat.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-purple-400 text-sm flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-purple-400" />
                <span>Doğrulama ve İkame (GGB0 / GGB1)</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Hatalı muhasebe kayıtlarını önlemek için sistem düzeyinde uygulanan kurallar:
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-purple-300 font-bold">GGB0 (Validation):</span>
                  <span>"Eğer 770 hesabı seçilmişse, masraf yeri alanı boş bırakılamaz; aksi takdirde kullanıcıya kırmızı hata ver ve kaydı durdur."</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-purple-300 font-bold">GGB1 (Substitution):</span>
                  <span>"TR01 şirket kodunda kesilen faturada kar merkezi seçilmemişse, malzeme ana verisindeki varsayılan kâr merkezini otomatik doldur."</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Başak Varlıoğlu - BAPI_ACC_DOCUMENT_POST, LSMW & FBL3N Alan Ekleme */}
      {activeSection === 'basak_bapi_lsmw' && (
        <div className="space-y-6">
          {/* BAPI_ACC_DOCUMENT_POST Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  <span>BAPI_ACC_DOCUMENT_POST Entegrasyon Rehberi</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kaynak: <strong className="text-indigo-300">basakvarlioglu.com</strong> — Dış sistemlerden hatasız finansal kayıt atma
                </p>
              </div>
              <span className="text-xs font-mono bg-indigo-950 text-indigo-300 px-2.5 py-1 rounded border border-indigo-700">
                SE37 / BAPI
              </span>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                Dış sistemlerden (bankalar, portaller, e-ticaret, bordro sistemleri) SAP Financial Accounting modülüne doğrudan yevmiye kaydı atmak için kullanılan standart BAPI fonksiyonudur:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-sky-400 font-bold block">1. DOCUMENTHEADER (Başlık)</span>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">OBJ_TYPE:</strong> 'BKPFF'</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">COMP_CODE:</strong> 'TR01' (Şirket Kodu)</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">DOC_DATE / PSTNG_DATE:</strong> '20261029'</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">DOC_TYPE:</strong> 'SA' (Mahsup), 'KR' (Satıcı Faturası)</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">HEADER_TXT:</strong> 'Ekim 2026 Danışmanlık Hizmeti'</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-emerald-400 font-bold block">2. ACCOUNTGL / ACCOUNTPAYABLE</span>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">ITEMNO_ACC:</strong> 0000000001 (Satır No)</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">GL_ACCOUNT:</strong> 0000770020 (Gider Hesabı)</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">COSTCENTER:</strong> 1000CC01 (Masraf Yeri)</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">VENDOR_NO:</strong> 0000300045 (Satıcı Kodu - AP)</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">BLINE_DATE:</strong> Vade başlangıç tarihi</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-amber-400 font-bold block">3. CURRENCYAMOUNT (Tutar Tablosu)</span>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">CURRENCY:</strong> 'TRY'</p>
                  <p className="text-slate-400 font-sans">• <strong className="text-white">AMT_DOCCUR:</strong> Borç tutarları pozitif (+24.000,00), Alacak tutarları negatif (-24.000,00) olarak geçilmelidir.</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-purple-400 font-bold block">4. BAPI_TRANSACTION_COMMIT</span>
                  <p className="text-slate-400 font-sans">• Kayıt başarılı olduğunda <strong className="text-white">RETURN</strong> tablosundaki tipi kontrol edilir ('S' Success). Ardından kesinleştirme için <strong className="text-purple-300">BAPI_TRANSACTION_COMMIT</strong> çağrılır.</p>
                </div>
              </div>
            </div>
          </div>

          {/* LSMW & FBL3N Alan Ekleme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* LSMW */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-sky-400 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>LSMW ile Toplu Veri & Ana Hesap Aktarımı</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Başak Varlıoğlu dokümanlarında sıklıkla başvurulan LSMW (Legacy System Migration Workbench) adımları:
              </p>
              <ol className="space-y-1.5 text-slate-400 list-decimal pl-4">
                <li><strong className="text-white">Maintain Object Attributes:</strong> Batch Input Recording tanımla.</li>
                <li><strong className="text-white">Maintain Source Structures:</strong> Başlık ve kalem yapısı oluştur.</li>
                <li><strong className="text-white">Maintain Source Fields:</strong> Excel'deki alanları (Hesap Kodu, Bakiye, Metin) eşleştir.</li>
                <li><strong className="text-white">Maintain Field Mapping:</strong> SAP ekran alanlarına transfer kuralı bağla.</li>
                <li><strong className="text-white">Specify & Assign Files:</strong> UTF-8 formatlı veri dosyasını yükle.</li>
                <li><strong className="text-white">Read & Convert Data:</strong> Veriyi dönüştür ve Batch Session çalıştır.</li>
              </ol>
            </div>

            {/* FBL3N Alan Ekleme */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>FBL3N Raporuna Özel Alan Ekleme (Layout Değiştirme)</span>
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Başak Varlıoğlu kılavuzuna göre standart FBL3N defterikebir raporuna özel sütun ekleme:
              </p>
              <div className="space-y-2 text-slate-400">
                <p>1. <strong className="text-white">FBL3N</strong> çalıştırıldıktan sonra üst araç çubuğundaki <strong className="text-emerald-300">"Düzeni Değiştir (Ctrl+F8)"</strong> butonuna tıklanır.</p>
                <p>2. Sağdaki "Kullanılabilir Sütunlar" listesinden <strong className="text-white">Masraf Yeri, Tahsisat, Belge Başlık Metni</strong> seçilerek sola taşınır.</p>
                <p>3. <strong className="text-emerald-300">"Düzeni Kaydet"</strong> butonuna basılarak <strong className="text-white">/STANDART</strong> veya kullanıcıya özel varyant olarak saklanır.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SAP Notlarım - FI/CO & TDHP Muhasebe Modülü */}
      {activeSection === 'sapnotlarim_fico' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-emerald-400" />
                  <span>SAP Finansal Modüller (FI/CO) Türkçe Kılavuzu</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kaynak: <strong className="text-emerald-300">sapnotlarim.com</strong> — sapnotlarim.com/sap-finansal-moduller-turkce-dokuman/
                </p>
              </div>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded border border-emerald-700">
                FI-GL / FI-AP / FI-AR / CO
              </span>
            </div>

            {/* Sub-modules breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
              
              {/* FI-GL */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sky-400">Genel Muhasebe (FI-GL)</h3>
                  <span className="font-mono text-[10px] text-sky-300 bg-sky-950 px-1.5 py-0.5 rounded">
                    FB50 / FS00
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Tüm mali kayıtların toplandığı defterikebirdir. <strong className="text-white">FB50</strong> ile mahsup fişi girilirken borç-alacak bakiyesi sıfırlanınca sağ üstteki trafik lambası yeşile döner.
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleLaunch('FB50')}
                    className="w-full py-1 text-[11px] font-semibold text-sky-300 bg-sky-950/60 hover:bg-sky-900 border border-sky-800 rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>FB50 Mahsup Fişi Aç</span>
                  </button>
                </div>
              </div>

              {/* FI-AP & F110 */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-emerald-400">Satıcılar Muhasebesi (FI-AP)</h3>
                  <span className="font-mono text-[10px] text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded">
                    FB60 / F110
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Tedarikçilere borç kayıtları <strong className="text-white">FB60</strong> ile açılır (320 Cari). Toplu banka ödemeleri ise <strong className="text-white">F110</strong> (Payment Run) ile otomatik SWIFT/EFT dosyasında üretilir.
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleLaunch('FB60')}
                    className="w-full py-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>FB60 Satıcı Faturası Aç</span>
                  </button>
                </div>
              </div>

              {/* FI-AR */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-purple-400">Müşteriler Muhasebesi (FI-AR)</h3>
                  <span className="font-mono text-[10px] text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded">
                    FB70 / F-28
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Müşteri faturaları ve alacak takibi yapılır (120 Cari). Tahsilat bankaya girdiğinde <strong className="text-white">F-28</strong> ile müşteri açık kalemi kapatılır ve kur farkı otomatik hesaplanır.
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleLaunch('FB70')}
                    className="w-full py-1 text-[11px] font-semibold text-purple-300 bg-purple-950/60 hover:bg-purple-900 border border-purple-800 rounded transition-colors flex items-center justify-center gap-1"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>FB70 Müşteri Faturası Aç</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* F110 Otomatik Ödeme Programı (Payment Run) 4 Aşamalı Yaşam Döngüsü */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>F110 Otomatik Ödeme Programı (Automatic Payment Run) 4 Aşaması</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold">1. Parametreler</span>
                <p className="text-slate-400 text-[11px]">Çalışma Tarihi, Tanımlayıcı, Şirket Kodu (TR01), Ödeme Yöntemi (T: Havale/EFT) ve Gelecek Kayıt Tarihi girilir.</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-sky-400 font-bold">2. Öneri (Proposal)</span>
                <p className="text-slate-400 text-[11px]">Sistem vadesi gelmiş satıcı açık kalemlerini tarar ve geçici ödeme listesini simüle eder.</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-amber-400 font-bold">3. Öneri Düzenleme</span>
                <p className="text-slate-400 text-[11px]">Finans yöneticisi ödenmesi istenmeyen kalemleri blokeler veya banka hesabını revize eder.</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-purple-400 font-bold">4. Ödeme Çalıştırma</span>
                <p className="text-slate-400 text-[11px]">Fiili yevmiye kayıtları düşer, satıcı kalemleri kapanır ve banka ödeme dosyası (SWIFT/DTA) üretilir.</p>
              </div>
            </div>
          </div>

          {/* Tekdüzen Hesap Planı (TDHP) Standard Map */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Türkiye Tekdüzen Hesap Planı (TDHP) — SAP Entegrasyon Eşleşmeleri</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-sky-400 font-bold block">100 / 102</span>
                <span className="text-slate-400 text-[10px]">Kasa & Bankalar</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-sky-400 font-bold block">120</span>
                <span className="text-slate-400 text-[10px]">Alıcılar (Müşteriler)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold block">150 / 153</span>
                <span className="text-slate-400 text-[10px]">İlk Madde / Ticari Mal</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-rose-400 font-bold block">320</span>
                <span className="text-slate-400 text-[10px]">Satıcılar (Tedarikçi)</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-emerald-400 font-bold block">600</span>
                <span className="text-slate-400 text-[10px]">Yurtiçi Satış Geliri</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-purple-400 font-bold block">191 / 391</span>
                <span className="text-slate-400 text-[10px]">İndirilecek / Hes. KDV</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SAP Notlarım - MM-FI (OMWB) & SD-FI (VKOA) Entegrasyonu */}
      {activeSection === 'sapnotlarim_integration' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-amber-400" />
                  <span>Lojistik ve Finans Otomatik Hesap Tayini (MM-FI & SD-FI)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kaynak: <strong className="text-amber-300">sapnotlarim.com</strong> — Danışmanlık Notları
                </p>
              </div>
              <span className="text-xs font-mono bg-amber-950 text-amber-300 px-2.5 py-1 rounded border border-amber-700">
                OMWB / OBYC & VKOA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* MM-FI OBYC */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-400 text-sm">MM-FI: Otomatik Hesap Tayini (OBYC / OMWB)</h3>
                  <span className="font-mono text-[10px] text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded">
                    MIGO & MIRO
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Depoya mal kabulü (MIGO 101) yapıldığında veya lojistik fatura girildiğinde (MIRO), SAP'nin arka planda TDHP hesaplarını otomatik çalıştırma anahtarları:
                </p>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-sky-300 font-bold">BSX (Stok Kaydı)</span>
                    <span className="text-slate-300">150 / 153 Stok Hesabı</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-amber-300 font-bold">WRX (GR/IR Dengeleme)</span>
                    <span className="text-slate-300">381 Fatura Bekleme Hesabı</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-rose-300 font-bold">PRD (Fiyat Farkı)</span>
                    <span className="text-slate-300">656/646 Olumlu/Olumsuz Fark</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-emerald-300 font-bold">GBB (Tüketim / Sarf)</span>
                    <span className="text-slate-300">710 / 730 / 770 Masraf Hesabı</span>
                  </div>
                </div>
              </div>

              {/* SD-FI VKOA */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sky-400 text-sm">SD-FI: Gelir Hesabı Tayini (VKOA)</h3>
                  <span className="font-mono text-[10px] text-sky-300 bg-sky-950 px-1.5 py-0.5 rounded">
                    VF01 Fatura
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Satış faturası (VF01) kesildiğinde, sistem <strong className="text-white">KOFI</strong> hesap tayin şemasını okur. Satış Örgütü + Müşteri Hesap Tayin Grubu + Malzeme Hesap Grubu eşleşerek doğru gelir hesabına gider:
                </p>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-emerald-300 font-bold">KOFI - 1000/10/01</span>
                    <span className="text-slate-300">600 01 001 Yurtiçi Satışlar</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-purple-300 font-bold">MWST KDV Kuralı</span>
                    <span className="text-slate-300">391 20 001 %20 Hesaplanan KDV</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800 flex justify-between items-center">
                    <span className="text-amber-300 font-bold">İskonto (K007)</span>
                    <span className="text-slate-300">611 01 001 Satış İskontoları</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: Kritik Veritabanı Tabloları Haritası (SE11 / SE16N) */}
      {activeSection === 'sapnotlarim_tables' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span>Kritik SAP Veritabanı Tabloları Haritası (SE11 / SE16N)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kaynak: <strong className="text-cyan-300">sapnotlarim.com</strong> & <strong className="text-sky-300">basakvarlioglu.com</strong> — Danışman ve Denetçi Tablo Kılavuzu
                </p>
              </div>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2.5 py-1 rounded border border-cyan-700">
                SE11 / SE16N
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-sky-400 font-bold block text-sm">BKPF / BSEG</span>
                <span className="text-slate-300 font-sans font-semibold text-xs">Mali Muhasebe (FI) Belge Tabloları</span>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  • <strong className="text-white">BKPF:</strong> Belge Başlığı (Şirket Kodu, Belge No, Mali Yıl, Belge Türü, Kayıt Tarihi).
                  <br />
                  • <strong className="text-white">BSEG:</strong> Kalem Detayları (Borç/Alacak anahtarı BSCHL, Hesap HKONT, Tutar DMBTR, Masraf Yeri KOSTL).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-amber-400 font-bold block text-sm">BSIK / BSAK & BSID / BSAD</span>
                <span className="text-slate-300 font-sans font-semibold text-xs">Açık / Kapanmış Cari Kalemler</span>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  • <strong className="text-white">BSIK:</strong> Satıcı Açık Kalemler (Ödenmemiş faturalar).
                  <br />
                  • <strong className="text-white">BSAK:</strong> Satıcı Kapanmış Kalemler (Ödenmiş).
                  <br />
                  • <strong className="text-white">BSID:</strong> Müşteri Açık Kalemler (Tahsil edilmemiş).
                  <br />
                  • <strong className="text-white">BSAD:</strong> Müşteri Kapanmış Kalemler (Tahsil edilmiş).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold block text-sm">VBAK / VBAP & VBRK / VBRP</span>
                <span className="text-slate-300 font-sans font-semibold text-xs">Satış & Faturalama (SD)</span>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  • <strong className="text-white">VBAK:</strong> Satış Siparişi Başlığı (VBELN, AUART, VKORG).
                  <br />
                  • <strong className="text-white">VBAP:</strong> Satış Siparişi Kalemi (MATNR, KWMENG, NETWR).
                  <br />
                  • <strong className="text-white">VBRK:</strong> Satış Faturası Başlığı (FKART, KUNAG).
                  <br />
                  • <strong className="text-white">VBRP:</strong> Fatura Kalemleri (FARKG, NETWR, MWSBP).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-purple-400 font-bold block text-sm">EKKO / EKPO & MKPF / MSEG</span>
                <span className="text-slate-300 font-sans font-semibold text-xs">Satın Alma & Mal Hareketleri (MM)</span>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  • <strong className="text-white">EKKO:</strong> Satın Alma Siparişi Başlığı (EBELN, BSART, LIFNR).
                  <br />
                  • <strong className="text-white">EKPO:</strong> Satın Alma Siparişi Kalemi (MENGE, NETPR).
                  <br />
                  • <strong className="text-white">MKPF:</strong> Mal Belgesi Başlığı (MIGO Girişleri).
                  <br />
                  • <strong className="text-white">MSEG:</strong> Mal Hareketi Kalemleri (101, 201, 261, 601).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-rose-400 font-bold block text-sm">MARA / MARC & MARD</span>
                <span className="text-slate-300 font-sans font-semibold text-xs">Malzeme Ana Verisi (Material Master)</span>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  • <strong className="text-white">MARA:</strong> Malzeme Genel Verileri (MATNR, MTART, MEINS).
                  <br />
                  • <strong className="text-white">MARC:</strong> Üretim Yeri / Tesis Verileri (WERKS, EKGRP).
                  <br />
                  • <strong className="text-white">MARD:</strong> Depo Yeri Stok Verileri (LGORT, LABST).
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <span className="text-indigo-400 font-bold block text-sm">KNA1 & LFA1</span>
                <span className="text-slate-300 font-sans font-semibold text-xs">Müşteri & Satıcı Ana Verisi (BP)</span>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                  • <strong className="text-white">KNA1:</strong> Müşteri Genel Verileri (KUNNR, NAME1, STCEG).
                  <br />
                  • <strong className="text-white">LFA1:</strong> Satıcı Genel Verileri (LIFNR, NAME1, STCD1).
                  <br />
                  • <strong className="text-white">KNB1 / LFB1:</strong> Şirket Kodu bazlı mutabakat hesabı (AKONT).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: GİB e-Dönüşüm & Tevkifat Mevzuatı */}
      {activeSection === 'gib_e_transformation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Pillar 1: e-Fatura */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">1. GİB e-Fatura & e-Arşiv UBL Mimarisi</h3>
                </div>
                <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                  VF01 / VF03
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  SAP SD modülünde <strong className="text-white">VF01</strong> ile fatura kaydedildiğinde sistem VKN sorgulamasıyla zarf üretir:
                </p>
                <ul className="space-y-1.5 pl-2 border-l border-slate-800 text-slate-400">
                  <li>
                    <strong className="text-sky-300">Ticari Fatura (TICARIFATURA):</strong> Müşterinin 8 gün içinde faturayı GİB sistemi üzerinden kabul veya reddetme hakkı vardır.
                  </li>
                  <li>
                    <strong className="text-sky-300">Temel Fatura (TEMELFATURA):</strong> GİB üzerinden otomatik onaylanır, itiraz noter veya KEP yoluyla yapılır.
                  </li>
                  <li>
                    <strong className="text-sky-300">e-Arşiv Fatura:</strong> Müşteri e-Fatura mükellefi değilse üretilen dijital arşiv formatıdır.
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => handleLaunch('VF01')}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>VF01 Ekranında e-Fatura Alanlarını Gör</span>
                </button>
              </div>
            </div>

            {/* Pillar 2: e-İrsaliye */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">2. e-İrsaliye & Fiili Mal Çıkışı (PGI)</h3>
                </div>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                  VL01N / VT01N
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  Türkiye mevzuatında kamyon fabrika kapısından çıkmadan önce e-İrsaliye GİB'e iletilmek zorundadır:
                </p>
                <ul className="space-y-1.5 pl-2 border-l border-slate-800 text-slate-400">
                  <li>
                    <strong className="text-amber-300">Mal Çıkışını Kaydet (PGI):</strong> VL01N'de mavi kamyon butonuna basıldığında SAP otomatik 601 hareketiyle e-İrsaliye XML'ini oluşturur.
                  </li>
                  <li>
                    <strong className="text-amber-300">Zorunlu Alanlar:</strong> Taşıyıcı Araç Plakası, Sürücü TCKN ve Fiili Sevk Zamanı (Saat/Dakika).
                  </li>
                  <li>
                    <strong className="text-amber-300">MIGO Mal Kabulünde:</strong> Tedarikçinin 16 haneli e-İrsaliye numarası (Örn: GIB202600004123) başlıkta LFSNR alanına girilmelidir.
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => handleLaunch('VL01N')}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>VL01N Ekranında Sevkiyat Alanlarını İncele</span>
                </button>
              </div>
            </div>

            {/* Pillar 3: KDV Tevkifatı */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Percent className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">3. KDV Tevkifatı Formülleri (%20 KDV, 5/10, 9/10)</h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  FB60 / MIRO
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 text-slate-300 leading-relaxed">
                  <p>
                    Tevkifat, faturadaki hesaplanan KDV tutarının bir bölümünün alıcı tarafından kesilerek doğrudan devlete 2 No'lu KDV beyannamesiyle yatırılmasıdır.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
                    <p className="text-emerald-400 font-bold">Örnek: 100.000 TL Matrah + %20 KDV (20.000 TL)</p>
                    <p className="text-slate-300">• 5/10 Tevkifatında: 10.000 TL Satıcıya ödenir, 10.000 TL devlete aktarılır.</p>
                    <p className="text-slate-300">• 9/10 Tevkifatında: 2.000 TL Satıcıya ödenir, 18.000 TL devlete aktarılır.</p>
                  </div>
                </div>

                <div className="space-y-2 text-slate-300 leading-relaxed font-mono text-[11px]">
                  <p className="font-bold text-white font-sans text-xs">Standart GİB Tevkifat Kodları:</p>
                  <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p><strong className="text-sky-300">601:</strong> Yapım İşleri ile Bu İşlerle Birlikte İfa Edilen Mühendislik-Mimarlık (4/10)</p>
                    <p><strong className="text-sky-300">602:</strong> Etüt, Plan-Proje, Danışmanlık ve Denetim Hizmetleri (9/10)</p>
                    <p><strong className="text-sky-300">608:</strong> İşgücü Temin Hizmetleri (9/10)</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => handleLaunch('FB60')}
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>FB60 Satıcı Faturasında Tevkifatı Simüle Et</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
