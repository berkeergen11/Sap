/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SIMULATION_SCREENS } from '../data/sapModulesData';
import { GUIDED_MISSIONS } from '../data/guidedMissionData';
import { SimulationTableItem } from '../types/sap';
import { sapSound } from '../utils/audioEffects';
import {
  Save,
  ArrowLeft,
  X,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Truck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Home,
  Check,
  Play,
  RotateCcw,
  Layers,
  FileText,
  DollarSign,
  Maximize2,
  ListTree,
  Users,
  Eye,
  Edit3,
  GitFork,
  MoreHorizontal,
  Building,
  MapPin,
  Tag,
  HelpCircle,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

interface SapGuiSimulatorProps {
  currentTCode: string;
  onSelectTCode: (tCode: string) => void;
  onOpenCoordinateMap: () => void;
  onReturnToMainMenu?: () => void;
  onOpenScreenshotGuide?: (screenshotId?: string) => void;
}

// Authentic Customer Master Data (including YouTube course IDES customer & TR01 Turkey customers)
export const SAP_CUSTOMER_MASTER = [
  {
    code: 'TR1923',
    name: 'TÜRKİYE ŞUBE',
    address: 'Neusser Str. 120, 50765 köln, Almanya',
    city: 'Köln',
    country: 'DE',
    vkn: 'DE192384729',
    salesOrg: '1010',
    distChannel: '10',
    division: '00',
    currency: 'EUR',
    creditLimit: '150.000,00 EUR',
    badge: 'Videodaki Orijinal Kayıt',
  },
  {
    code: '100021',
    name: 'Koçak Lojistik & Sanayi A.Ş.',
    address: 'Gebze Organize Sanayi Bölgesi 4. Cad. No:12, Kocaeli',
    city: 'Kocaeli / Gebze',
    country: 'TR',
    vkn: '5480219482',
    salesOrg: '1000',
    distChannel: '10',
    division: '00',
    currency: 'TRY',
    creditLimit: '2.500.000,00 TRY',
    badge: 'TR01 Şirket Kodu',
  },
  {
    code: '100045',
    name: 'Anadolu Bilişim Teknolojileri Ltd.',
    address: 'ODTÜ Teknokent Silikon Blok Kat:2, Ankara',
    city: 'Ankara',
    country: 'TR',
    vkn: '1049281729',
    salesOrg: '1000',
    distChannel: '10',
    division: '00',
    currency: 'TRY',
    creditLimit: '750.000,00 TRY',
    badge: 'Kamu & Kurumsal',
  },
  {
    code: '100088',
    name: 'Doğu Marmara Dağıtım Ticaret',
    address: 'D-100 Karayolu Üzeri No:88, İzmit',
    city: 'Kocaeli',
    country: 'TR',
    vkn: '3918274619',
    salesOrg: '1000',
    distChannel: '20',
    division: '00',
    currency: 'TRY',
    creditLimit: '1.200.000,00 TRY',
    badge: 'Bayi Kanalı',
  },
  {
    code: 'DE5001',
    name: 'Berlin Retail Logistics GmbH',
    address: 'Alexanderplatz 7, 10178 Berlin',
    city: 'Berlin',
    country: 'DE',
    vkn: 'DE902184128',
    salesOrg: '1010',
    distChannel: '10',
    division: '00',
    currency: 'EUR',
    creditLimit: '300.000,00 EUR',
    badge: 'AB İçi Satış',
  },
  {
    code: 'US1000',
    name: 'Domestic US Customer',
    address: '5th Avenue Suite 900, New York, NY 10001',
    city: 'New York',
    country: 'US',
    vkn: 'US849102834',
    salesOrg: 'US01',
    distChannel: '10',
    division: '00',
    currency: 'USD',
    creditLimit: '500.000,00 USD',
    badge: 'Fiori Kutucuğu ($9,56B)',
  },
];

export const SapGuiSimulator: React.FC<SapGuiSimulatorProps> = ({
  currentTCode,
  onSelectTCode,
  onOpenCoordinateMap,
  onReturnToMainMenu,
  onOpenScreenshotGuide,
}) => {
  const targetTCode = SIMULATION_SCREENS[currentTCode] ? currentTCode : 'VA01';
  const screen = SIMULATION_SCREENS[targetTCode];
  const guidedSteps = GUIDED_MISSIONS[targetTCode] || [];

  // Multi-stage support (VA01, VL01N, VF01: initial -> overview)
  const isMultiStage = targetTCode === 'VA01' || targetTCode === 'VL01N' || targetTCode === 'VF01';
  const [stage, setStage] = useState<'initial' | 'overview'>('initial');

  // Active data preset mode: 'video' (TR1923, 531 Melone Tee, 532 üzümlü çay) or 'tr01' (100021 Koçak Lojistik)
  const [dataPreset, setDataPreset] = useState<'video' | 'tr01'>('video');

  // Customer state for Sold-To Party
  const [selectedCustomer, setSelectedCustomer] = useState(SAP_CUSTOMER_MASTER[0]);
  const [soldToDropdownOpen, setSoldToDropdownOpen] = useState<boolean>(false);
  const [customerModalOpen, setCustomerModalOpen] = useState<boolean>(false);
  const [customerSearchFilter, setCustomerSearchFilter] = useState<string>('');

  // Modals for Top Action Buttons
  const [docFlowModalOpen, setDocFlowModalOpen] = useState<boolean>(false);
  const [priceConditionsModalOpen, setPriceConditionsModalOpen] = useState<boolean>(false);
  const [statusDetailModalOpen, setStatusDetailModalOpen] = useState<boolean>(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);

  // Form & Command states
  const [commandInput, setCommandInput] = useState<string>(`/n${targetTCode}`);
  const [activeTab, setActiveTab] = useState<string>(screen.tabs[0]?.id || '');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [tableItems, setTableItems] = useState<SimulationTableItem[]>(screen.defaultTableItems || []);
  const [pickedQuantities, setPickedQuantities] = useState<Record<string, number>>({});
  const [migoItemOk, setMigoItemOk] = useState<boolean>(false);
  const [glLines, setGlLines] = useState([
    { account: '770000 - Genel Yönetim Giderleri', d_c: 'S', amount: 15000, costCenter: '1000' },
    { account: '102000 - Bankalar (Ticari TL)', d_c: 'H', amount: 15000, costCenter: '' },
  ]);

  // F4 Matchcode Modal for Sevkiyat Noktası (from screenshot IMG_3025)
  const [f4ModalOpen, setF4ModalOpen] = useState<boolean>(false);

  // Guided Mode & X-Ray
  const [xrayActive, setXrayActive] = useState<boolean>(false);
  const [guidedMode, setGuidedMode] = useState<boolean>(true);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  // Bottom WebGUI Toast / Status Bar
  const [statusBar, setStatusBar] = useState<{
    type: 'info' | 'warning' | 'success' | 'error';
    code: string;
    message: string;
  }>(screen.statusBarOnLoad);

  // Load Video Line Items
  const loadVideoItems = () => {
    setDataPreset('video');
    setSelectedCustomer(SAP_CUSTOMER_MASTER[0]); // TR1923
    setTableItems([
      {
        kalemNo: '10',
        malzeme: '531',
        kisaMetin: 'Melone Tee',
        miktar: 10,
        birim: 'KAR',
        fiyat: 290,
        paraBirimi: 'EUR',
        vergiKodu: 'MWST',
        depoYeri: '101A',
      },
      {
        kalemNo: '20',
        malzeme: '532',
        kisaMetin: 'üzümlü çay',
        miktar: 10,
        birim: 'KAR',
        fiyat: 15,
        paraBirimi: 'EUR',
        vergiKodu: 'MWST',
        depoYeri: '101A',
      },
    ]);
    setFormData((prev) => ({
      ...prev,
      kunnr: 'TR1923',
      kunwe: 'TR1923',
      bstkd: '32833',
      bstdk: '07.10.2021',
      vstel: '1010',
      vbeln: '32833',
      billing_doc: '80040620',
      netwr: '3.050,00',
      waerk: 'EUR',
    }));
    sapSound.playClick();
  };

  // Load TR01 Line Items
  const loadTr01Items = () => {
    setDataPreset('tr01');
    setSelectedCustomer(SAP_CUSTOMER_MASTER[1]); // 100021 Koçak Lojistik
    setTableItems([
      {
        kalemNo: '10',
        malzeme: 'MAT-TURK-01',
        kisaMetin: 'Endüstriyel Kontrol Modülü V3',
        miktar: 10,
        birim: 'ST',
        fiyat: 4500,
        paraBirimi: 'TRY',
        vergiKodu: 'V2',
        depoYeri: '0001',
      },
      {
        kalemNo: '20',
        malzeme: 'MAT-TURK-02',
        kisaMetin: 'Sensör Bağlantı Kablo Takımı (10m)',
        miktar: 25,
        birim: 'ST',
        fiyat: 320,
        paraBirimi: 'TRY',
        vergiKodu: 'V2',
        depoYeri: '0001',
      },
    ]);
    setFormData((prev) => ({
      ...prev,
      kunnr: '100021',
      kunwe: '100021',
      bstkd: 'PO-2026-OCT-8841',
      bstdk: '29.10.2026',
      vstel: 'TR01',
      vbeln: '0000014205',
      billing_doc: '80001923',
      netwr: '53.000,00',
      waerk: 'TRY',
    }));
    sapSound.playClick();
  };

  // Sync state when screen changes
  useEffect(() => {
    setCommandInput(`/n${targetTCode}`);
    setActiveTab(screen.tabs[0]?.id || '');
    setStatusBar(screen.statusBarOnLoad);
    setMigoItemOk(false);
    setCurrentStepIdx(0);
    setStage(isMultiStage ? 'initial' : 'overview');
    setSoldToDropdownOpen(false);
    setMoreMenuOpen(false);

    const initialValues: Record<string, string> = {};
    screen.headerFields.forEach((f) => {
      if (f.defaultValue) initialValues[f.id] = f.defaultValue;
    });
    screen.tabs.forEach((tab) => {
      tab.fields?.forEach((f) => {
        if (f.defaultValue) initialValues[f.id] = f.defaultValue;
      });
    });

    // Provide authentic default keys matching video
    if (targetTCode === 'VA01' || targetTCode === 'VA02' || targetTCode === 'VA03') {
      initialValues['auart'] = 'OR';
      initialValues['vkorg'] = '1010';
      initialValues['vtweg'] = '10';
      initialValues['spart'] = '00';
      initialValues['vkbur'] = '1000';
      initialValues['vkgrp'] = '100';
      initialValues['kunnr'] = 'TR1923';
      initialValues['kunwe'] = 'TR1923';
      initialValues['bstkd'] = '32833';
      initialValues['bstdk'] = '07.10.2021';
      initialValues['netwr'] = '3.050,00';
      initialValues['waerk'] = 'EUR';
    } else if (targetTCode === 'VL01N' || targetTCode === 'VL02N') {
      initialValues['vstel'] = '1010';
      initialValues['vbeln'] = '32833';
      initialValues['seldate'] = '07.10.2021';
      initialValues['kunnr'] = 'TR1923';
    } else if (targetTCode === 'VF01' || targetTCode === 'VF04') {
      initialValues['billing_doc'] = '80040620';
      initialValues['fkart'] = 'F2';
      initialValues['fkdat'] = '07.10.2021';
      initialValues['kunnr'] = 'TR1923';
      initialValues['netwr'] = '3.050,00';
      initialValues['waerk'] = 'EUR';
    }

    setFormData(initialValues);
    setTableItems(screen.defaultTableItems || []);

    // Default picked quantities
    const defaultPicked: Record<string, number> = {};
    (screen.defaultTableItems || []).forEach((item) => {
      defaultPicked[item.kalemNo] = item.miktar;
    });
    setPickedQuantities(defaultPicked);
  }, [targetTCode]);

  // Command input handler
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = commandInput.trim().toUpperCase();

    if (cleanCmd === '/N' || cleanCmd === '/O') {
      sapSound.playClick();
      if (onReturnToMainMenu) onReturnToMainMenu();
      return;
    }

    let parsedTCode = cleanCmd;
    if (parsedTCode.startsWith('/N')) {
      parsedTCode = parsedTCode.substring(2);
    } else if (parsedTCode.startsWith('/O')) {
      parsedTCode = parsedTCode.substring(2);
    }

    if (SIMULATION_SCREENS[parsedTCode]) {
      sapSound.playEnter();
      onSelectTCode(parsedTCode);
      setStatusBar({
        type: 'info',
        code: `${parsedTCode} 001`,
        message: `${parsedTCode} işlem koduna geçiş yapıldı.`,
      });
    } else {
      sapSound.playError();
      setStatusBar({
        type: 'error',
        code: 'SY 002',
        message: `İşlem kodu "${commandInput}" bulunamadı. Lütfen VA01, VL01N, VF01, MIGO veya FB50 deneyin.`,
      });
    }
  };

  // Move from Stage 1 to Stage 2 in multi-stage screens
  const handleProceedToOverview = () => {
    sapSound.playEnter();
    setStage('overview');
    if (targetTCode === 'VA01') {
      setActiveTab('tab_sales');
      setStatusBar({
        type: 'info',
        code: 'V1 011',
        message: 'Standart sipariş genel bakış ekranı açıldı. Sol üstten Sipariş Veren ve kalemleri inceleyin.',
      });
    } else if (targetTCode === 'VL01N') {
      setActiveTab('tab_picking');
      setStatusBar({
        type: 'info',
        code: 'VL 020',
        message: 'Teslimat genel bakış ekranı açıldı. Çekme (Picking) miktarını teyit edip "Mal çıkışını kaydet" butonuna basın.',
      });
    } else if (targetTCode === 'VF01') {
      setStatusBar({
        type: 'info',
        code: 'VF 011',
        message: 'Fatura (F2) taslağı oluşturuldu. Net tutar 3.050,00 EUR ve KDV hesaplamasını kontrol edip Kaydet butonuna basın.',
      });
    }
  };

  // Mal Çıkışını Kaydet (Post Goods Issue - PGI) action
  const handlePostGoodsIssue = () => {
    sapSound.playSuccess();
    const docNo = '80040620';
    setStatusBar({
      type: 'success',
      code: 'VL 311',
      message: `Yapılan teslimat ${docNo} saklandı. Mal çıkışı (PGI) tamamlandı ve depo stokları düşüldü.`,
    });
  };

  // Save (Ctrl+S) handler
  const handleSave = () => {
    if (targetTCode === 'MIGO' && !migoItemOk) {
      sapSound.playError();
      setStatusBar({
        type: 'error',
        code: 'MIGO 019',
        message: 'Kayıt yapılamadı: Lütfen alt paneldeki "Kalem Tamam (Item OK)" kutusunu işaretleyin!',
      });
      return;
    }

    sapSound.playSuccess();
    const docNo =
      targetTCode === 'VA01' || targetTCode === 'VA02' || targetTCode === 'VA03'
        ? `32833`
        : targetTCode === 'VL01N' || targetTCode === 'VL02N'
        ? `80040620`
        : targetTCode === 'VF01' || targetTCode === 'VF04'
        ? `90017855`
        : targetTCode === 'MIGO'
        ? `5000031892`
        : `1900002841`;

    const successMsg =
      targetTCode === 'VA01'
        ? `Standart sipariş ${docNo} saklandı.`
        : targetTCode === 'VL01N' || targetTCode === 'VL02N'
        ? `Yapılan teslimat ${docNo} saklandı.`
        : targetTCode === 'VF01' || targetTCode === 'VF04'
        ? `Belge ${docNo} saklandı.`
        : screen.saveSuccessMessage.messageTemplate.replace('{docNo}', docNo);

    setStatusBar({
      type: 'success',
      code: screen.saveSuccessMessage.code,
      message: successMsg,
    });
  };

  // Reverse Goods Issue / Reverse Billing
  const handleReverse = () => {
    sapSound.playClick();
    setStatusBar({
      type: 'warning',
      code: 'VL 091',
      message: 'Ters kayıt başarıyla yürütüldü. İlgili belge iptal edildi ve stok/muhasebe ters maddesi yazıldı.',
    });
  };

  // Select a customer
  const handleSelectCustomer = (customer: typeof SAP_CUSTOMER_MASTER[0]) => {
    setSelectedCustomer(customer);
    setFormData((prev) => ({
      ...prev,
      kunnr: customer.code,
      kunwe: customer.code,
      waerk: customer.currency,
    }));
    setSoldToDropdownOpen(false);
    setCustomerModalOpen(false);
    sapSound.playClick();
    setStatusBar({
      type: 'info',
      code: 'V1 045',
      message: `Sipariş veren "${customer.code} - ${customer.name}" olarak güncellendi.`,
    });
  };

  const currentGuidedStep = guidedSteps[currentStepIdx];
  const isTarget = (id: string) => guidedMode && currentGuidedStep && currentGuidedStep.targetId === id;

  const totalAmount = tableItems.reduce((acc, curr) => acc + curr.miktar * curr.fiyat, 0);
  const kdvRate = dataPreset === 'video' ? 0.19 : 0.20;
  const kdvAmount = totalAmount * kdvRate;
  const grandTotal = totalAmount + kdvAmount;
  const currencySymbol = dataPreset === 'video' ? 'EUR' : 'TRY';

  const totalDebit = glLines.filter((l) => l.d_c === 'S').reduce((acc, l) => acc + Number(l.amount), 0);
  const totalCredit = glLines.filter((l) => l.d_c === 'H').reduce((acc, l) => acc + Number(l.amount), 0);
  const ficoDiff = totalDebit - totalCredit;

  return (
    <div className="bg-slate-100 text-slate-900 border border-slate-300 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans select-none relative">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP WEBGUI TITLE & COMMAND BAR (Belize Light Theme Header) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#2f4257] text-white px-3 sm:px-4 py-2 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left: Command Box with Enter Checkmark & Title */}
        <div className="flex items-center gap-3">
          {onReturnToMainMenu && (
            <button
              onClick={onReturnToMainMenu}
              className="p-1 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              title="SAP Easy Access / Fiori Başlangıç Sayfasına Dön (/n)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* SAP Command Box Input */}
          <form onSubmit={handleCommandSubmit} className="flex items-center gap-1">
            <div className="relative flex items-center bg-white rounded text-slate-900 px-1 py-0.5 border border-slate-400 shadow-inner">
              <button
                type="submit"
                className="w-5 h-5 rounded bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px] shadow-sm transition-colors mr-1"
                title="Komutu Yürüt (Enter)"
              >
                ✔
              </button>
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                className="w-24 sm:w-28 bg-transparent text-xs font-mono font-bold uppercase tracking-wider text-slate-900 focus:outline-none"
                placeholder="/nVA01"
              />
            </div>
          </form>

          {/* Screen Title */}
          <div className="hidden md:flex items-center gap-2 border-l border-white/20 pl-3">
            <span className="font-bold text-white text-sm">
              {stage === 'initial' && targetTCode === 'VA01'
                ? 'Satış siparişleri oluştur: Başlangıç ekranı'
                : stage === 'overview' && targetTCode === 'VA01'
                ? 'Standart sipariş yarat: Genel bakış'
                : stage === 'initial' && targetTCode === 'VL01N'
                ? 'Gönderilen teslimatı sipariş referansı ile yarat'
                : stage === 'overview' && (targetTCode === 'VL01N' || targetTCode === 'VL02N')
                ? 'Yapılan teslimat 80040620 Değiştir: Genel bakış'
                : stage === 'initial' && targetTCode === 'VF01'
                ? 'Faturalama belgesi yarat'
                : stage === 'overview' && targetTCode === 'VF01'
                ? 'Fatura (F2) Yarat: Genel bakış-Faturalama belgesi kalemleri'
                : screen.screenTitle}
            </span>
          </div>
        </div>

        {/* Right Action Icons from WebGUI */}
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Quick Preset Data Switcher */}
          <div className="flex items-center bg-white/10 rounded p-0.5 text-[11px]">
            <button
              onClick={loadVideoItems}
              className={`px-2 py-0.5 rounded font-semibold transition-all ${
                dataPreset === 'video'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Videodaki 531 Melone Tee & 532 üzümlü çay (TR1923 / 3.050 EUR)"
            >
              🎬 Videodaki Veriler
            </button>
            <button
              onClick={loadTr01Items}
              className={`px-2 py-0.5 rounded font-semibold transition-all ${
                dataPreset === 'tr01'
                  ? 'bg-emerald-400 text-slate-950 shadow-sm font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="TR01 Şirket Kodu Örnek Verileri (Koçak Lojistik / 53.000 TL)"
            >
              🇹🇷 TR01 Verileri
            </button>
          </div>

          {/* Compare with Real Screenshot Button */}
          {onOpenScreenshotGuide && (
            <button
              onClick={() => {
                const targetScreenshotId =
                  targetTCode === 'VA01'
                    ? 'fiori_launchpad_zoom_va01'
                    : targetTCode === 'VL01N'
                    ? stage === 'initial'
                      ? 'vl01n_initial_screen'
                      : 'vl01n_picking_screen'
                    : targetTCode === 'VL02N'
                    ? 'vl02n_overview_header'
                    : targetTCode === 'VF01'
                    ? stage === 'initial'
                      ? 'vf01_initial_documents'
                      : 'vf01_overview_items'
                    : targetTCode === 'VF04'
                    ? 'fiori_launchpad_zoom_vf04'
                    : 'fiori_launchpad_main';
                onOpenScreenshotGuide(targetScreenshotId);
              }}
              className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              title="Bu ekranın videodaki orijinal ekran görüntüsünü gör"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Videoyla Karşılaştır</span>
            </button>
          )}

          {/* X-Ray Coordinate Inspection */}
          <button
            onClick={() => setXrayActive(!xrayActive)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              xrayActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {xrayActive ? 'Röntgen Kapat' : 'Röntgen'}
          </button>

          {/* Exit / Return */}
          {onReturnToMainMenu && (
            <button
              onClick={onReturnToMainMenu}
              className="px-3 py-1 rounded bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
              title="İşlemden Çık (Shift+F3)"
            >
              Çık
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1.1 ÜST BUTONLAR: WebGUI APPLICATION TOOLBAR (Videodaki Satır) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#e9eef2] border-b border-slate-300 px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 text-xs text-slate-700 shadow-sm relative z-20">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Dropdown chevron command */}
          <button className="px-2 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 font-bold">
            ▾
          </button>

          {/* Fiyat koşulları başlığı */}
          <button
            onClick={() => {
              setPriceConditionsModalOpen(true);
              sapSound.playClick();
            }}
            className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-sky-50 hover:text-sky-700 text-slate-800 font-medium text-xs flex items-center gap-1 transition-colors shadow-2xs"
            title="Fiyat koşulları başlığı (Header Pricing Conditions)"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fiyat koşulları başlığı</span>
          </button>

          {/* Değiştir */}
          <button
            onClick={() => {
              sapSound.playClick();
              setStatusBar({ type: 'info', code: 'V1 002', message: 'Değiştirme moduna geçildi.' });
            }}
            className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs flex items-center gap-1 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Değiştir</span>
          </button>

          {/* Görüntüle */}
          <button
            onClick={() => {
              sapSound.playClick();
              setStatusBar({ type: 'info', code: 'V1 003', message: 'Görüntüleme modu aktif.' });
            }}
            className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Görüntüle</span>
          </button>

          {/* Belge Akışı (Document Flow) */}
          <button
            onClick={() => {
              setDocFlowModalOpen(true);
              sapSound.playClick();
            }}
            className="px-2.5 py-1 rounded border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold text-xs flex items-center gap-1 transition-colors shadow-2xs"
            title="Belge Akışı (Document Flow - Sipariş -> Teslimat -> Fatura)"
          >
            <GitFork className="w-3.5 h-3.5 text-sky-600" />
            <span>Belge akışı</span>
          </button>

          {/* Durum */}
          <button
            onClick={() => {
              setStatusDetailModalOpen(true);
              sapSound.playClick();
            }}
            className="px-2 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1"
          >
            <span>Durum</span>
          </button>

          {/* Mal Çıkışını Kaydet Button (In Delivery Screens) */}
          {(targetTCode === 'VL01N' || targetTCode === 'VL02N') && stage === 'overview' && (
            <button
              onClick={handlePostGoodsIssue}
              className="px-3 py-1 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-colors"
              title="Mal çıkışını kaydet (Post Goods Issue - PGI)"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Mal çıkışını kaydet</span>
            </button>
          )}

          {/* Daha fazla ▾ Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs flex items-center gap-1 transition-colors"
            >
              <span>Daha fazla</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {moreMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-52 bg-white border border-slate-300 rounded shadow-xl py-1 text-xs text-slate-800 z-50 animate-in fade-in-50">
                <button
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setPriceConditionsModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800 flex items-center justify-between"
                >
                  <span>Başlık ayrıntıları</span>
                  <span className="text-[10px] text-slate-400">Ctrl+H</span>
                </button>
                <button
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setStatusBar({ type: 'success', code: 'V1 104', message: 'Eksiklik günlüğü tamamlandı: Belge tam ve eksiksiz.' });
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800 flex items-center justify-between"
                >
                  <span>Eksiklik günlüğü</span>
                  <span className="text-[10px] text-slate-400">Ctrl+F8</span>
                </button>
                <button
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setStatusBar({ type: 'info', code: 'V1 200', message: 'Çıktı önizleme: RD00 Fatura formu hazırlandı.' });
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800"
                >
                  <span>Çıktı önizleme (Print Preview)</span>
                </button>
                <div className="border-t border-slate-200 my-1" />
                <button
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setStatusDetailModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800"
                >
                  <span>Sistem bilgisi & Program Adı</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side search / exit icons */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
          <button className="p-1 hover:text-slate-800 rounded hover:bg-slate-200" title="Arama">
            <Search className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:text-slate-800 rounded hover:bg-slate-200" title="Büyüt">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          {onReturnToMainMenu && (
            <button
              onClick={onReturnToMainMenu}
              className="px-2 py-0.5 rounded text-xs text-red-600 hover:bg-red-50 font-semibold"
            >
              Çık
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. SUB-BAR: Guided Tutorial Strip if active */}
      {/* ------------------------------------------------------------- */}
      {guidedMode && currentGuidedStep && (
        <div className="bg-sky-50 border-b border-sky-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-sky-950">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
              {currentStepIdx + 1}
            </span>
            <div>
              <span className="font-bold text-slate-900 mr-2">
                {currentGuidedStep.title}
              </span>
              <span className="text-slate-600">
                {currentGuidedStep.instruction}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
              disabled={currentStepIdx === 0}
              className="px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 text-xs"
            >
              Geri
            </button>
            <span className="font-mono text-[10px] text-slate-500">
              {currentStepIdx + 1} / {guidedSteps.length}
            </span>
            <button
              onClick={() => setCurrentStepIdx(Math.min(guidedSteps.length - 1, currentStepIdx + 1))}
              disabled={currentStepIdx === guidedSteps.length - 1}
              className="px-2.5 py-0.5 rounded bg-sky-600 text-white font-semibold hover:bg-sky-700 disabled:opacity-40 text-xs"
            >
              İleri
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN FORM BODY */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 sm:p-5 flex-1 min-h-[480px] bg-slate-50 overflow-y-auto">
        
        {/* ============================================================= */}
        {/* AŞAMA 1: VA01 BAŞLANGIÇ EKRANI (SAPMV45A - Initial Screen)    */}
        {/* ============================================================= */}
        {targetTCode === 'VA01' && stage === 'initial' ? (
          <div className="max-w-3xl bg-white border border-slate-300 rounded-lg p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Satış siparişleri oluştur: Başlangıç ekranı</span>
                  <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-[10px]">VA01</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Videoda uygulanan parametreler: Sipariş türü OR, Satış Örgütü 1010, Dağıtım Kanalı 10, Bölüm 00
                </p>
              </div>
              <button
                onClick={handleProceedToOverview}
                className="px-3.5 py-1.5 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <span>Genel Bakışa Geç</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Sipariş Türü */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                <label className="font-semibold text-slate-700 sm:text-right">
                  <span className="text-red-600 mr-1">*</span>Sipariş türü:
                </label>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={formData['auart'] || 'OR'}
                    onChange={(e) => setFormData({ ...formData, auart: e.target.value })}
                    className="w-24 bg-white border border-slate-400 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                  <span className="text-slate-600 text-[11px]">
                    OR (Standart sipariş) / ZOR (Türkiye Standart)
                  </span>
                </div>
              </div>

              {/* Satış Dağıtım Alanı Başlığı */}
              <div className="border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-800 block mb-3 text-xs">
                  Satış ve dağıtım alanı (Organizasyonel Yapı)
                </span>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                    <label className="text-slate-600 sm:text-right">
                      <span className="text-red-600 mr-1">*</span>Satış örgütü:
                    </label>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={formData['vkorg'] || '1010'}
                        onChange={(e) => setFormData({ ...formData, vkorg: e.target.value })}
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900"
                      />
                      <span className="text-slate-500 text-[11px]">
                        1010 (Videodaki Satış Örgütü) / TR01 (İstanbul Merkez)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                    <label className="text-slate-600 sm:text-right">
                      <span className="text-red-600 mr-1">*</span>Dağıtım kanalı:
                    </label>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={formData['vtweg'] || '10'}
                        onChange={(e) => setFormData({ ...formData, vtweg: e.target.value })}
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900"
                      />
                      <span className="text-slate-500 text-[11px]">
                        10 (Son Kullanıcı / Doğrudan Toptan)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                    <label className="text-slate-600 sm:text-right">
                      <span className="text-red-600 mr-1">*</span>Bölüm:
                    </label>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={formData['spart'] || '00'}
                        onChange={(e) => setFormData({ ...formData, spart: e.target.value })}
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900"
                      />
                      <span className="text-slate-500 text-[11px]">
                        00 (Tüm Bölümler / Çapraz Sektör)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                    <label className="text-slate-600 sm:text-right">
                      Satış bürosu / grubu:
                    </label>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={formData['vkbur'] || '1000'}
                        className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono text-slate-700"
                      />
                      <input
                        type="text"
                        value={formData['vkgrp'] || '100'}
                        className="w-20 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : targetTCode === 'VL01N' && stage === 'initial' ? (
          /* ============================================================= */
          /* AŞAMA 1: VL01N BAŞLANGIÇ EKRANI (IMG_3027)                    */
          /* ============================================================= */
          <div className="max-w-3xl bg-white border border-slate-300 rounded-lg p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Gönderilen teslimatı sipariş referansı ile yarat
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Videoda uygulanan parametreler: Sevkiyat Noktası 1010 ve Sipariş 32833
                </p>
              </div>
              <button
                onClick={handleProceedToOverview}
                className="px-3.5 py-1.5 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <span>Genel Bakışa Geç</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Sevkiyat Noktası with F4 Search Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                <label className="font-semibold text-slate-700 sm:text-right">
                  <span className="text-red-600 mr-1">*</span>Sevkiyat noktası:
                </label>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <div className="relative w-44">
                    <input
                      type="text"
                      value={formData['vstel'] || '1010'}
                      onChange={(e) => setFormData({ ...formData, vstel: e.target.value })}
                      className="w-full bg-white border border-slate-400 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setF4ModalOpen(true)}
                      className="absolute right-1 top-1 p-0.5 text-slate-500 hover:text-sky-600"
                      title="F4 Arama Listesi (Sevkiyat Noktaları)"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-slate-500 text-[11px]">
                    Sevkiyat noktası 1010 / TR01 İstanbul
                  </span>
                </div>
              </div>

              {/* Müşteri Siparişi Verileri Group */}
              <div className="border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-800 block mb-2.5">
                  Müşteri siparişi verileri
                </span>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                    <label className="text-slate-600 sm:text-right">
                      Seçim tarihi:
                    </label>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={formData['seldate'] || '07.10.2021'}
                        onChange={(e) => setFormData({ ...formData, seldate: e.target.value })}
                        className="w-44 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                    <label className="font-semibold text-slate-700 sm:text-right">
                      <span className="text-red-600 mr-1">*</span>Sipariş:
                    </label>
                    <div className="sm:col-span-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={formData['vbeln'] || '32833'}
                        onChange={(e) => setFormData({ ...formData, vbeln: e.target.value })}
                        className="w-44 bg-white border border-slate-400 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900"
                      />
                      <span className="text-slate-500 text-[11px]">
                        (Videodaki Sipariş No: 32833)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teslimat Türü */}
              <div className="border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-800 block mb-2.5">
                  Teslimat türü belirle
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                  <label className="text-slate-600 sm:text-right">
                    Teslimat türü:
                  </label>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      defaultValue="LF (Standart Gönderilen Teslimat)"
                      className="w-64 bg-slate-100 border border-slate-300 rounded px-2.5 py-1 text-xs font-mono text-slate-700"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : targetTCode === 'VF01' && stage === 'initial' ? (
          /* ============================================================= */
          /* AŞAMA 1: VF01 BAŞLANGIÇ EKRANI (IMG_3034)                     */
          /* ============================================================= */
          <div className="max-w-4xl bg-white border border-slate-300 rounded-lg p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Faturalama belgesi yarat
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standart veriler ve faturalandırılacak teslimat referansı (80040620)
                </p>
              </div>
              <button
                onClick={handleProceedToOverview}
                className="px-3.5 py-1.5 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <span>Genel Bakışa Geç</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Standart Veriler */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <label className="w-28 text-slate-600">Faturalama türü:</label>
                  <input
                    type="text"
                    defaultValue="F2 (Standart Fatura)"
                    className="w-44 bg-white border border-slate-300 rounded px-2 py-1 font-mono text-xs"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-28 text-slate-600">Ftrl.tarihi:</label>
                  <input
                    type="text"
                    value={formData['fkdat'] || '07.10.2021'}
                    onChange={(e) => setFormData({ ...formData, fkdat: e.target.value })}
                    className="w-44 bg-white border border-slate-300 rounded px-2 py-1 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <label className="w-28 text-slate-600">SrvGrntOlşmTrh:</label>
                  <input
                    type="text"
                    className="w-44 bg-white border border-slate-300 rounded px-2 py-1 font-mono text-xs"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="w-28 text-slate-600">Fytl.trh.:</label>
                  <input
                    type="text"
                    value="07.10.2021"
                    className="w-44 bg-white border border-slate-300 rounded px-2 py-1 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* İşlenecek Belgeler Table */}
            <div className="border-t border-slate-200 pt-3">
              <span className="font-bold text-slate-800 block mb-2 text-xs">
                İşlenecek belgeler
              </span>

              <div className="border border-slate-300 rounded overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="py-2 px-3 w-8">#</th>
                      <th className="py-2 px-3">Belge (Teslimat No)</th>
                      <th className="py-2 px-3">Klm.</th>
                      <th className="py-2 px-3">SD belgesinin tipi</th>
                      <th className="py-2 px-3">İşleme durumu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr className="bg-white hover:bg-sky-50">
                      <td className="py-2 px-3 text-slate-400">1</td>
                      <td className="py-2 px-3">
                        <div className="relative w-48">
                          <input
                            type="text"
                            value={formData['billing_doc'] || '80040620'}
                            onChange={(e) => setFormData({ ...formData, billing_doc: e.target.value })}
                            className="w-full bg-white border border-slate-400 rounded px-2 py-0.5 text-xs font-bold text-slate-900"
                          />
                          <Search className="w-3.5 h-3.5 absolute right-2 top-1.5 text-slate-400" />
                        </div>
                      </td>
                      <td className="py-2 px-3 text-slate-600">Tümü</td>
                      <td className="py-2 px-3 text-slate-700">J (Teslimat)</td>
                      <td className="py-2 px-3 text-emerald-600 font-semibold">Mal Çıkışı Yapıldı</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================= */
          /* AŞAMA 2: GENEL BAKIŞ EKRANI (WebGUI Overview & Sold-To Header) */
          /* ============================================================= */
          <div className="space-y-4">
            
            {/* ------------------------------------------------------------- */}
            {/* SOL ÜSTTE SİPARİŞ VEREN KUTUSU, SEÇENEKLERİ VE BAŞLIK KARTI   */}
            {/* (Kullanıcının işaret ettiği ve videodaki birebir başlık bloğu) */}
            {/* ------------------------------------------------------------- */}
            <div className="bg-white border border-slate-300 rounded-lg p-3.5 shadow-sm space-y-3 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start text-xs">
                
                {/* SOL TARAF: Sipariş Veren (Sold-To Party) + Malı Teslim Alan + Sipariş No */}
                <div className="lg:col-span-8 space-y-2.5">
                  
                  {/* Satır 1: Sipariş Veren (Sold-To Party) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="w-28 font-semibold text-slate-700 flex items-center gap-1">
                      <span className="text-red-500 font-bold">*</span>
                      <span>Sipariş veren:</span>
                    </label>

                    {/* Müşteri Kodu Input + F4 Search + Dropdown Options */}
                    <div className="flex items-center gap-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={selectedCustomer.code}
                          onChange={(e) => {
                            const val = e.target.value;
                            const found = SAP_CUSTOMER_MASTER.find((c) => c.code.toUpperCase() === val.toUpperCase());
                            if (found) setSelectedCustomer(found);
                            setFormData({ ...formData, kunnr: val });
                          }}
                          className="w-24 bg-white border border-slate-400 rounded px-2 py-1 font-mono font-bold text-slate-900 focus:outline-none focus:border-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => setCustomerModalOpen(true)}
                          className="absolute right-1 top-1 p-0.5 text-slate-400 hover:text-sky-600"
                          title="F4 Müşteri Arama Listesi"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Dropdown Options Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setSoldToDropdownOpen(!soldToDropdownOpen)}
                          className="px-2 py-1 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
                          title="Sipariş Veren Seçenekleri"
                        >
                          <span>Seçenekler</span>
                          <ChevronDown className="w-3 h-3 text-slate-500" />
                        </button>

                        {/* Customer Options Dropdown Menu */}
                        {soldToDropdownOpen && (
                          <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-slate-300 rounded-lg shadow-2xl py-1.5 z-50 animate-in fade-in-50 divide-y divide-slate-100">
                            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Tanımlı Sipariş Veren Müşteriler (F4)
                            </div>
                            {SAP_CUSTOMER_MASTER.map((cust) => (
                              <button
                                key={cust.code}
                                type="button"
                                onClick={() => handleSelectCustomer(cust)}
                                className={`w-full text-left px-3 py-2 hover:bg-sky-50 flex items-start gap-2.5 transition-colors ${
                                  selectedCustomer.code === cust.code ? 'bg-sky-50/70 border-l-2 border-sky-600' : ''
                                }`}
                              >
                                <Building className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-sky-700">{cust.code}</span>
                                    <span className="text-[10px] px-1 rounded bg-slate-100 text-slate-600">{cust.badge}</span>
                                  </div>
                                  <div className="text-slate-800 font-medium truncate">{cust.name}</div>
                                  <div className="text-slate-500 text-[11px] truncate">{cust.address}</div>
                                </div>
                              </button>
                            ))}
                            <div className="p-2 bg-slate-50 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSoldToDropdownOpen(false);
                                  setCustomerModalOpen(true);
                                }}
                                className="text-sky-700 hover:text-sky-900 font-bold text-xs"
                              >
                                + Gelişmiş Müşteri Arama (F4)
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Müşteri Adı ve Adres Rozeti (IMG_3033 TÜRKİYE ŞUBE / 50765 köln) */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-xs">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-bold">{selectedCustomer.name}</span>
                      <span className="text-slate-500">/</span>
                      <span className="text-slate-600 font-mono text-[11px]">{selectedCustomer.city} ({selectedCustomer.country})</span>
                    </div>
                  </div>

                  {/* Satır 2: Malı Teslim Alan (Ship-To Party) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="w-28 text-slate-600 flex items-center gap-1">
                      <span>Malı tsl.alan:</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={selectedCustomer.code}
                        readOnly
                        className="w-24 bg-slate-50 border border-slate-300 rounded px-2 py-1 font-mono font-semibold text-slate-700"
                      />
                      <span className="text-slate-600 text-[11px]">
                        {selectedCustomer.name} / {selectedCustomer.address}
                      </span>
                    </div>
                  </div>

                  {/* Satır 3: Müşteri Sipariş No & Tarih */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <label className="w-28 text-slate-600">Sipariş no:</label>
                      <input
                        type="text"
                        value={formData['bstkd'] || '32833'}
                        onChange={(e) => setFormData({ ...formData, bstkd: e.target.value })}
                        className="w-32 bg-white border border-slate-300 rounded px-2 py-1 font-mono font-bold text-slate-900 text-xs"
                        placeholder="32833"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-slate-600">Sipariş tarihi:</label>
                      <input
                        type="text"
                        value={formData['bstdk'] || '07.10.2021'}
                        onChange={(e) => setFormData({ ...formData, bstdk: e.target.value })}
                        className="w-28 bg-white border border-slate-300 rounded px-2 py-1 font-mono text-slate-900 text-xs"
                      />
                    </div>
                  </div>

                </div>

                {/* SAĞ TARAF: Net Değer + Vergi + Z Tml.dğr. Butonu (IMG_3033 Birebir) */}
                <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Net değer:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Vergi (%{kdvRate * 100}):</span>
                    <span className="font-mono">
                      {kdvAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Toplam Belge Tutarı:</span>
                    <span className="font-mono font-bold text-sky-800 text-sm">
                      {grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
                    </span>
                  </div>

                  {/* Z Tml.dğr. Action Button (from screenshot IMG_3033) */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        sapSound.playClick();
                        setStatusBar({
                          type: 'info',
                          code: 'V1 088',
                          message: 'Tamamlama değeri (Z Tml.dğr.) başarıyla hesaplandı ve teyit edildi.',
                        });
                      }}
                      className="w-full px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1 shadow-2xs"
                      title="Z Tml.dğr. (Tamamlama Değeri Hesapla)"
                    >
                      <Tag className="w-3.5 h-3.5 text-sky-600" />
                      <span>Z Tml.dğr. (Tamamlama)</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Sub-Tabs (e.g. Satış, Kalem genel bakışı, Çekme, Yükle...) */}
            <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-100 border-b border-slate-300 px-3 flex items-center gap-1 overflow-x-auto scrollbar-none">
                {screen.tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        sapSound.playTab();
                      }}
                      className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
                        isActive
                          ? 'border-[#008FD3] text-[#0062A3] bg-white font-bold'
                          : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      {tab.name}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {screen.tabs.map((tab) => {
                  if (tab.id !== activeTab) return null;

                  return (
                    <div key={tab.id} className="space-y-4">
                      
                      {/* Delivery Items Table (with Picking / Çekilen Miktar - IMG_3026) */}
                      {tab.tableType === 'delivery_items' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
                            <span>Çekme Termini: 07.10.2021 | Genel Çekme Durumu: A (Henüz çekilmedi)</span>
                            <span className="font-semibold text-emerald-700">Depo Yeri: 101A / 0001</span>
                          </div>

                          <div className="border border-slate-300 rounded overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-semibold text-[11px]">
                                <tr>
                                  <th className="py-2 px-2.5">Klm</th>
                                  <th className="py-2 px-2.5">Malzeme</th>
                                  <th className="py-2 px-2.5">Malzeme Tanımı</th>
                                  <th className="py-2 px-2.5">ÜY</th>
                                  <th className="py-2 px-2.5">DpYr</th>
                                  <th className="py-2 px-2.5 text-right">Tsl.miktarı</th>
                                  <th className="py-2 px-2.5">ÖB</th>
                                  <th className="py-2 px-2.5 text-right font-bold text-sky-700">
                                    Çekilen Miktar (Pick)
                                  </th>
                                  <th className="py-2 px-2.5">ÖB</th>
                                  <th className="py-2 px-2.5">Durum</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 font-mono">
                                {tableItems.map((item) => (
                                  <tr key={item.kalemNo} className="hover:bg-sky-50">
                                    <td className="py-2 px-2.5 font-bold text-slate-700">{item.kalemNo}</td>
                                    <td className="py-2 px-2.5 font-bold text-[#0062A3]">{item.malzeme}</td>
                                    <td className="py-2 px-2.5 text-slate-800">{item.kisaMetin}</td>
                                    <td className="py-2 px-2.5 text-slate-600">1010</td>
                                    <td className="py-2 px-2.5 text-slate-600">{item.depoYeri || '101A'}</td>
                                    <td className="py-2 px-2.5 text-right font-bold">{item.miktar}</td>
                                    <td className="py-2 px-2.5 text-slate-500">{item.birim}</td>
                                    <td className="py-2 px-2.5 text-right">
                                      <input
                                        type="number"
                                        value={
                                          pickedQuantities[item.kalemNo] !== undefined
                                            ? pickedQuantities[item.kalemNo]
                                             : item.miktar
                                        }
                                        onChange={(e) =>
                                          setPickedQuantities({
                                            ...pickedQuantities,
                                            [item.kalemNo]: Number(e.target.value),
                                          })
                                        }
                                        className="w-16 bg-white border border-sky-400 rounded px-1.5 py-0.5 text-right font-bold text-sky-900 focus:outline-none"
                                      />
                                    </td>
                                    <td className="py-2 px-2.5 text-slate-500">{item.birim}</td>
                                    <td className="py-2 px-2.5">
                                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        Hazır
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Standard Items Table (Sales Order / Billing Items - IMG_3033) */}
                      {(tab.tableType === 'items' || (!tab.tableType && tab.id === 'tab_sales')) && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
                            <span className="font-semibold text-slate-800">
                              Belge Kalemleri ({tableItems.length} Kalem) — {selectedCustomer.name}
                            </span>
                            <span className="text-slate-500">
                              Para Birimi: <strong className="text-slate-900">{currencySymbol}</strong>
                            </span>
                          </div>

                          <div className="border border-slate-300 rounded overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-semibold text-[11px]">
                                <tr>
                                  <th className="py-2 px-2.5 w-12">Klm</th>
                                  <th className="py-2 px-2.5">Malzeme</th>
                                  <th className="py-2 px-2.5">Kalem Tanımı</th>
                                  <th className="py-2 px-2.5 text-right">Miktar</th>
                                  <th className="py-2 px-2.5">ÖB</th>
                                  <th className="py-2 px-2.5 text-right">Net Değer</th>
                                  <th className="py-2 px-2.5">PB</th>
                                  <th className="py-2 px-2.5 text-right">Vergi Tutarı</th>
                                  <th className="py-2 px-2.5">İhtiyaç Bölümü</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 font-mono">
                                {tableItems.map((item) => {
                                  const lineTotal = item.miktar * item.fiyat;
                                  const lineTax = lineTotal * kdvRate;
                                  return (
                                    <tr key={item.kalemNo} className="hover:bg-sky-50">
                                      <td className="py-2.5 px-2.5 font-bold text-slate-700">{item.kalemNo}</td>
                                      <td className="py-2.5 px-2.5 font-bold text-[#0062A3]">{item.malzeme}</td>
                                      <td className="py-2.5 px-2.5 text-slate-800">{item.kisaMetin}</td>
                                      <td className="py-2.5 px-2.5 text-right font-bold">{item.miktar}</td>
                                      <td className="py-2.5 px-2.5 text-slate-500">{item.birim}</td>
                                      <td className="py-2.5 px-2.5 text-right font-bold text-slate-900">
                                        {lineTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </td>
                                      <td className="py-2.5 px-2.5 text-slate-600">{currencySymbol}</td>
                                      <td className="py-2.5 px-2.5 text-right text-slate-600">
                                        {lineTax.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </td>
                                      <td className="py-2.5 px-2.5 text-slate-500">101A / 0001</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Fields if present */}
                      {tab.fields && tab.fields.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {tab.fields.map((field) => (
                            <div key={field.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                defaultValue={field.defaultValue}
                                className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 font-mono"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. ALT MENÜ BUTONLARI: BOTTOM DARK WEBGUI FOOTER BAR           */}
      {/* (Kullanıcının talep ettiği alt butonlar ve durum bildirimi)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#243342] text-white px-4 py-2.5 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
        
        {/* Left: Green Checkmark Toast Message (IMG_3032 & IMG_3027) */}
        <div
          onClick={() => setStatusDetailModalOpen(true)}
          className="flex items-center gap-2 text-xs font-mono max-w-xl truncate cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors"
          title="SAP Sistem İletisi Detayını Gör"
        >
          {statusBar.type === 'success' ? (
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0">
              ✔
            </div>
          ) : statusBar.type === 'error' ? (
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : statusBar.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
          )}

          <span className="font-bold text-slate-300">[{statusBar.code}]</span>
          <span
            className={`truncate ${
              statusBar.type === 'success'
                ? 'text-emerald-300 font-semibold'
                : statusBar.type === 'error'
                ? 'text-red-300 font-semibold'
                : 'text-slate-200'
            }`}
          >
            {statusBar.message}
          </span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {stage === 'initial' && isMultiStage ? (
            <>
              <button
                onClick={() => {
                  sapSound.playClick();
                  if (onReturnToMainMenu) onReturnToMainMenu();
                }}
                className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors"
              >
                İptal
              </button>

              <button
                onClick={handleProceedToOverview}
                className="px-4 py-1.5 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                title="Devam (Enter)"
              >
                <span>Devam (Enter)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {/* Ayrıntılar */}
              <button
                onClick={() => {
                  setPriceConditionsModalOpen(true);
                  sapSound.playClick();
                }}
                className="px-2.5 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors hidden sm:inline"
              >
                Ayrıntılar
              </button>

              {/* Yürüt */}
              <button
                onClick={() => {
                  sapSound.playClick();
                  setStatusBar({
                    type: 'info',
                    code: 'SY 000',
                    message: 'İşlem yürütüldü. Veriler kontrol edildi ve güncellendi.',
                  });
                }}
                className="px-2.5 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors hidden sm:inline"
              >
                Yürüt
              </button>

              {/* Ters kayıt */}
              <button
                onClick={handleReverse}
                className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors"
                title="Ters Kayıt (Reverse / Cancellation)"
              >
                Ters kayıt
              </button>

              {/* İptal */}
              <button
                onClick={() => {
                  sapSound.playClick();
                  setStage('initial');
                }}
                className="px-2.5 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium transition-colors"
                title="İptal (F12)"
              >
                İptal
              </button>

              {/* Mal Çıkışını Kaydet (In VL01N/VL02N) */}
              {(targetTCode === 'VL01N' || targetTCode === 'VL02N') && (
                <button
                  onClick={handlePostGoodsIssue}
                  className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1 shadow transition-colors"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Mal çıkışını kaydet</span>
                </button>
              )}

              {/* Kaydet (Ctrl+S) - Dark Blue Primary WebGUI Button */}
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                title="Kaydet (Ctrl+S)"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Kaydet</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. MODALS & POPUPS                                            */}
      {/* ------------------------------------------------------------- */}

      {/* 5.1 F4 CUSTOMER MASTER MODAL (Sipariş Veren Arama Listesi)    */}
      {customerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden text-slate-900 text-xs animate-in zoom-in-95 duration-150">
            <div className="bg-[#2f4257] text-white px-4 py-2.5 flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" />
                <span>Sipariş Veren (Sold-To Party) Arama Listesi — F4 Eşleşme Penceresi</span>
              </span>
              <button onClick={() => setCustomerModalOpen(false)}>
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 bg-slate-100 p-2 rounded">
                <Search className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Müşteri kodu, şirket unvanı, şehir veya VKN ile ara..."
                  value={customerSearchFilter}
                  onChange={(e) => setCustomerSearchFilter(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none"
                />
              </div>

              <div className="border border-slate-300 rounded overflow-hidden max-h-72 overflow-y-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 border-b border-slate-300 font-semibold text-slate-700">
                    <tr>
                      <th className="p-2">Müşteri No</th>
                      <th className="p-2">Unvan & Adres</th>
                      <th className="p-2">Şehir / Ülke</th>
                      <th className="p-2">VKN / Vergi No</th>
                      <th className="p-2">Kredi Limiti</th>
                      <th className="p-2 text-right">Seç</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {SAP_CUSTOMER_MASTER.filter(
                      (c) =>
                        c.code.toLowerCase().includes(customerSearchFilter.toLowerCase()) ||
                        c.name.toLowerCase().includes(customerSearchFilter.toLowerCase()) ||
                        c.city.toLowerCase().includes(customerSearchFilter.toLowerCase()) ||
                        c.vkn.includes(customerSearchFilter)
                    ).map((cust) => (
                      <tr
                        key={cust.code}
                        onClick={() => handleSelectCustomer(cust)}
                        className="hover:bg-sky-50 cursor-pointer transition-colors"
                      >
                        <td className="p-2 font-bold text-sky-700">{cust.code}</td>
                        <td className="p-2">
                          <div className="font-sans font-bold text-slate-800">{cust.name}</div>
                          <div className="text-[11px] text-slate-500">{cust.address}</div>
                        </td>
                        <td className="p-2 text-slate-600">{cust.city} ({cust.country})</td>
                        <td className="p-2 text-slate-600">{cust.vkn}</td>
                        <td className="p-2 text-emerald-700 font-semibold">{cust.creditLimit}</td>
                        <td className="p-2 text-right">
                          <button
                            type="button"
                            className="px-2 py-0.5 rounded bg-sky-600 text-white font-sans text-[11px] font-semibold hover:bg-sky-700"
                          >
                            Seç
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-100 px-4 py-2 flex justify-between items-center text-xs text-slate-500">
              <span>Seçim onaylandığında Sipariş Veren ve Teslim Alan otomatik güncellenir.</span>
              <button
                onClick={() => setCustomerModalOpen(false)}
                className="px-3 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-medium"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5.2 BELGE AKIŞI MODAL (Document Flow)                         */}
      {docFlowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden text-slate-900 text-xs animate-in zoom-in-95 duration-150">
            <div className="bg-[#2f4257] text-white px-4 py-2.5 flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-sky-400" />
                <span>Belge Akışı (Document Flow - VBFA)</span>
              </span>
              <button onClick={() => setDocFlowModalOpen(false)}>
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>

            <div className="p-4 space-y-3 font-mono">
              <p className="text-slate-600 font-sans text-xs">
                Videodaki Siparişten Tahsilata (Order-to-Cash) tam entegrasyon zinciri:
              </p>

              <div className="space-y-2 border-l-2 border-sky-500 pl-4 ml-2">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-800">1. Standart Sipariş 32833</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-sans">Tamamlandı</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Tarih: 07.10.2021 | Tutar: 3.050,00 EUR | Müşteri: TR1923</div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-800">2. Yapılan Teslimat 80040620</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-sans">Mal Çıkışı Yapıldı</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Tarih: 07.10.2021 | Sevkiyat Noktası: 1010 | Depo: 101A</div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-800">3. Fatura (F2) 90017855</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-sans">Muhasebeye İletildi</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Tarih: 07.10.2021 | Net: 3.050,00 EUR | KDV: 579,50 EUR</div>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-800">4. Muhasebe Belgesi 1900002841</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold font-sans">Açık Kalem (FI)</span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Borç/Alacak: 3.629,50 EUR | 120 Alıcılar & 600 Yurt İçi Satışlar</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 px-4 py-2 flex justify-end">
              <button
                onClick={() => setDocFlowModalOpen(false)}
                className="px-3 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-medium text-xs font-sans"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5.3 FİYAT KOŞULLARI BAŞLIĞI MODAL                           */}
      {priceConditionsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden text-slate-900 text-xs animate-in zoom-in-95 duration-150">
            <div className="bg-[#2f4257] text-white px-4 py-2.5 flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Fiyat Koşulları Başlığı (Header Pricing Conditions - KONV)</span>
              </span>
              <button onClick={() => setPriceConditionsModalOpen(false)}>
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <table className="w-full text-xs text-left border border-slate-300 rounded font-mono">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-2">Koşul Türü</th>
                    <th className="p-2">Tanım</th>
                    <th className="p-2 text-right">Oran / Tutar</th>
                    <th className="p-2 text-right">Koşul Değeri</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 font-bold text-sky-700">PR00</td>
                    <td className="p-2 font-sans">Temel Fiyat</td>
                    <td className="p-2 text-right">3.050,00 {currencySymbol}</td>
                    <td className="p-2 text-right font-bold">{totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {currencySymbol}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-sky-700">MWST</td>
                    <td className="p-2 font-sans">Katma Değer Vergisi</td>
                    <td className="p-2 text-right">%{kdvRate * 100}</td>
                    <td className="p-2 text-right font-bold text-slate-700">{kdvAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {currencySymbol}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-500">SKTO</td>
                    <td className="p-2 font-sans">Nakit İskonto</td>
                    <td className="p-2 text-right">0,00 %</td>
                    <td className="p-2 text-right font-bold text-slate-400">0,00 {currencySymbol}</td>
                  </tr>
                  <tr className="bg-sky-50 font-bold">
                    <td className="p-2 text-sky-900" colSpan={3}>Toplam Net Değer:</td>
                    <td className="p-2 text-right text-sky-900">{totalAmount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {currencySymbol}</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold">
                    <td className="p-2 text-slate-900" colSpan={3}>Toplam Son Tutar (Brüt):</td>
                    <td className="p-2 text-right text-emerald-800">{grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {currencySymbol}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-100 px-4 py-2 flex justify-end">
              <button
                onClick={() => setPriceConditionsModalOpen(false)}
                className="px-3 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-medium text-xs font-sans"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5.4 SAP SİSTEM İLETİSİ DETAY MODAL                             */}
      {statusDetailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg shadow-2xl w-full max-w-md overflow-hidden text-slate-900 text-xs animate-in zoom-in-95 duration-150">
            <div className="bg-[#2f4257] text-white px-4 py-2 flex items-center justify-between font-bold">
              <span>SAP Sistem İletisi Detayları</span>
              <button onClick={() => setStatusDetailModalOpen(false)}>
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>
            <div className="p-4 space-y-2.5 font-sans">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">İleti Numarası:</span>
                <span className="font-mono px-2 py-0.5 rounded bg-slate-100 font-bold text-sky-800">{statusBar.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">İleti Metni:</span>
                <span className="text-slate-900">{statusBar.message}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Program Adı:</span>
                <span className="font-mono text-slate-600">{screen.programName} (Ekran: {screen.screenNumber})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Kullanıcı:</span>
                <span className="font-mono text-slate-600">BERKE.ERGEN / TR1923 TÜRKİYE ŞUBE</span>
              </div>
            </div>
            <div className="bg-slate-100 px-4 py-2 flex justify-end">
              <button
                onClick={() => setStatusDetailModalOpen(false)}
                className="px-3 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-medium text-xs"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5.5 SEVKİYAT NOKTASI F4 MODAL (IMG_3025)                      */}
      {f4ModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-lg shadow-2xl w-full max-w-md overflow-hidden text-slate-900 text-xs animate-in zoom-in-95 duration-150">
            <div className="bg-[#2f4257] text-white px-3 py-2 flex items-center justify-between font-bold">
              <span>Sevkiyat Noktası Seçimi (F4 Eşleşme Penceresi)</span>
              <button onClick={() => setF4ModalOpen(false)}>
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              <p className="text-slate-500 text-[11px]">
                Videodaki Consolut IDES sisteminde ve TR01 şirket kodunda tanımlı sevkiyat noktaları:
              </p>
              <div className="border border-slate-200 rounded divide-y divide-slate-100 font-mono">
                {[
                  { code: '1010', desc: 'Sevkiyat noktası 1010 (Videodaki)' },
                  { code: 'TR01', desc: 'İstanbul Gebze Ana Rampa (TR01)' },
                  { code: '1012', desc: 'Sevkiyat noktası 1012' },
                  { code: '101C', desc: 'Sevkiyat noktası 101C' },
                  { code: '1020', desc: 'Sevkiyat noktası 1020' },
                  { code: '1030', desc: 'Sevkiyat noktası 1030' },
                  { code: 'SP01', desc: 'Özel Sevkiyat Noktası SP01' },
                ].map((s) => (
                  <div
                    key={s.code}
                    onClick={() => {
                      setFormData({ ...formData, vstel: s.code });
                      setF4ModalOpen(false);
                      sapSound.playClick();
                    }}
                    className="p-2 hover:bg-sky-50 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="font-bold text-sky-700">{s.code}</span>
                    <span className="text-slate-600 text-[11px]">{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-100 px-3 py-2 flex justify-end">
              <button
                onClick={() => setF4ModalOpen(false)}
                className="px-3 py-1 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded font-medium text-xs"
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
