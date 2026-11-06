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
  loadSapDatabase,
  runIncompletionCheck,
  persistSalesOrder,
  executePostGoodsIssue,
  executeCreateBilling,
  executeMigoGoodsReceipt,
  createBusinessPartnerRecord,
  SapDatabaseState,
} from '../data/sapPersistenceStore';
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

  // Persistent S/4HANA 2025 Database State
  const [sapDb, setSapDb] = useState<SapDatabaseState>(() => loadSapDatabase());

  // Authentic Incompletion Log State (IMG_2953.png & IMG_2954.png: "Yarat satis: Eksiklik günlüğü")
  const [incompletionModalOpen, setIncompletionModalOpen] = useState<boolean>(false);
  const [incompletionChecked, setIncompletionChecked] = useState<boolean>(false);
  const [incompletionCompletingField, setIncompletionCompletingField] = useState<boolean>(false);
  const [tempCustomerRef, setTempCustomerRef] = useState<string>('32833');

  useEffect(() => {
    const syncDb = () => setSapDb(loadSapDatabase());
    window.addEventListener('sap_db_updated', syncDb);
    return () => window.removeEventListener('sap_db_updated', syncDb);
  }, []);

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

  // F4 Matchcode Modal & Inline Search Results Popover for Sevkiyat Noktası (image_2a8a256d.png & IMG_3025)
  const [f4ModalOpen, setF4ModalOpen] = useState<boolean>(false);
  const [vstelInlineSearchOpen, setVstelInlineSearchOpen] = useState<boolean>(true);
  const [savedDeliveryDocNo, setSavedDeliveryDocNo] = useState<string>('');

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
    if (targetTCode === 'VL01N' || targetTCode === 'VL02N') {
      setActiveTab('tab_picking');
      setVstelInlineSearchOpen(true);
      setSavedDeliveryDocNo(targetTCode === 'VL02N' ? '80040620' : '');
    } else {
      setActiveTab(screen.tabs[0]?.id || '');
    }
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
      initialValues['kaynak_kalem'] = '';
      initialValues['kalem_son'] = '';
      initialValues['lfart'] = '';
    } else if (targetTCode === 'VF01' || targetTCode === 'VF04') {
      initialValues['billing_doc'] = '80040620';
      initialValues['fkart'] = 'F2';
      initialValues['fkdat'] = '07.10.2021';
      initialValues['prsdt'] = '07.10.2021';
      initialValues['kunnr'] = 'TR1923';
      initialValues['netwr'] = '3.050,00';
      initialValues['waerk'] = 'EUR';
    }

    setFormData(initialValues);

    const videoDefaultItems: SimulationTableItem[] = [
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
    ];

    const itemsToLoad =
      dataPreset === 'video' && (targetTCode === 'VA01' || targetTCode === 'VL01N' || targetTCode === 'VL02N' || targetTCode === 'VF01')
        ? videoDefaultItems
        : screen.defaultTableItems || videoDefaultItems;

    setTableItems(itemsToLoad);

    // Default picked quantities
    const defaultPicked: Record<string, number> = {};
    itemsToLoad.forEach((item) => {
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

    // S/4HANA 2025 FPS01 CVI Obsolete Transaction Redirect (XD01/FD01/XK01 -> BP)
    const obsoleteBpTCodes = ['XD01', 'XD02', 'XD03', 'FD01', 'FD02', 'FD03', 'XK01', 'XK02', 'XK03', 'VD01', 'VD02', 'VD03', 'MK01'];
    if (obsoleteBpTCodes.includes(parsedTCode)) {
      sapSound.playEnter();
      onSelectTCode('BP');
      setStatusBar({
        type: 'warning',
        code: 'CVI 001',
        message: `S/4HANA 2025 Mimari Kuralı: "${parsedTCode}" işlemi ECC'de kalmıştır. Otomatik olarak zorunlu "BP" (Business Partner) işlemine yönlendirildiniz.`,
      });
      return;
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
        message: `İşlem kodu "${commandInput}" bulunamadı. Lütfen BP, VA01, VL01N, VF01, MIGO veya FB50 deneyin.`,
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

  // Mal Çıkışını Kaydet (Post Goods Issue - PGI) action with real MARD stock & ACDOCA COGS
  const handlePostGoodsIssue = () => {
    const result = executePostGoodsIssue({
      orderNo: formData['vbeln'] || '32833',
      vstel: formData['vstel'] || '1010',
      kunnr: selectedCustomer.code,
      kunnrName: selectedCustomer.name,
      waerk: currencySymbol,
      pickedQuantities,
      items: tableItems,
    });

    if (!result.ok) {
      sapSound.playError();
      setStatusBar({
        type: 'error',
        code: result.errorCode || 'VL 609',
        message: result.errorMessage || 'Mal çıkışı kaydedilemedi.',
      });
      return;
    }

    sapSound.playSuccess();
    setSapDb(loadSapDatabase());
    setStatusBar({
      type: 'success',
      code: 'VL 311',
      message: `Yapılan teslimat ${result.delivery?.vbeln} saklandı. 601 Mal Çıkışı (${result.matDoc?.mblnr}) ile MARD stoğu düşüldü ve ACDOCA SMM fişi (${result.fiDoc?.belnr}) oluştu.`,
    });
  };

  // Save (Ctrl+S) handler with real S/4HANA validations & persistence
  const handleSave = () => {
    if (targetTCode === 'MIGO') {
      if (!migoItemOk) {
        sapSound.playError();
        setStatusBar({
          type: 'error',
          code: 'MIGO 019',
          message: 'Kayıt yapılamadı: Lütfen alt paneldeki "Kalem Tamam (Item OK)" kutusunu işaretleyin!',
        });
        return;
      }
      const migoRes = executeMigoGoodsReceipt({
        poNumber: formData['ebeln'] || '4500018901',
        items: tableItems,
      });
      sapSound.playSuccess();
      setSapDb(loadSapDatabase());
      setStatusBar({
        type: 'success',
        code: 'M7 060',
        message: `Malzeme belgesi ${migoRes.matDoc.mblnr} (Hareket 101) kaydedildi. MARD stoğu arttırıldı ve ACDOCA WRX fişi (${migoRes.fiDoc.belnr}) oluştu.`,
      });
      return;
    }

    // VA01 / VA02: Check OVA2 Incompletion Log (IMG_2953 & IMG_2954)
    if (targetTCode === 'VA01' || targetTCode === 'VA02') {
      const missingList = runIncompletionCheck({
        kunnr: selectedCustomer.code,
        bstkd: formData['bstkd'] || '',
        items: tableItems,
      });
      if (missingList.length > 0) {
        sapSound.playError();
        setIncompletionChecked(false);
        setIncompletionCompletingField(false);
        setIncompletionModalOpen(true);
        setStatusBar({
          type: 'warning',
          code: 'V1 501',
          message: 'Belge eksik: Kaydetmeden önce Eksiklik Günlüğündeki "Müşteri referansı" alanını tamamlamalısınız (IMG_2953).',
        });
        return;
      }

      const rawAuart = (formData['auart'] || 'OR').toUpperCase();
      const auartVal = (['OR', 'ZOR', 'RE', 'FD'].includes(rawAuart) ? rawAuart : 'OR') as 'OR' | 'ZOR' | 'RE' | 'FD';
      const saved = persistSalesOrder({
        auart: auartVal,
        vkorg: formData['vkorg'] || '1010',
        vtweg: formData['vtweg'] || '10',
        spart: formData['spart'] || '00',
        kunnr: selectedCustomer.code,
        kunnrName: selectedCustomer.name,
        bstkd: formData['bstkd'] || '32833',
        bstdk: formData['bstdk'] || '07.10.2021',
        waerk: currencySymbol,
        taxRate: kdvRate,
        items: tableItems,
      });
      sapSound.playSuccess();
      setSapDb(saved.db);
      setFormData((prev) => ({ ...prev, vbeln: saved.order.vbeln }));
      setStatusBar({
        type: 'success',
        code: 'V1 311',
        message: `${auartVal === 'ZOR' ? 'Kurumsal uyarlama siparişi (ZOR)' : 'Standart sipariş (OR)'} ${saved.order.vbeln} VBAK/VBAP tablosuna kalıcı olarak saklandı.`,
      });
      return;
    }

    // VL01N / VL02N Save
    if (targetTCode === 'VL01N' || targetTCode === 'VL02N') {
      handlePostGoodsIssue();
      return;
    }

    // VF01 / VF04 Billing Save (F2 Commercial vs F5/F8 Proforma)
    if (targetTCode === 'VF01' || targetTCode === 'VF04') {
      const rawFkart = (formData['fkart'] || 'F2').toUpperCase();
      const fkartVal = (['F2', 'F5', 'F8'].includes(rawFkart) ? rawFkart : 'F2') as 'F2' | 'F5' | 'F8';
      const billRes = executeCreateBilling({
        fkart: fkartVal,
        refDocNo: formData['billing_doc'] || '80040620',
        kunrg: selectedCustomer.code,
        kunrgName: selectedCustomer.name,
        netwr: totalAmount,
        mwsbk: kdvAmount,
        waerk: currencySymbol,
      });

      if (!billRes.ok) {
        sapSound.playError();
        setStatusBar({
          type: 'error',
          code: billRes.errorCode || 'VF 066',
          message: billRes.errorMessage || 'Fatura oluşturulamadı.',
        });
        return;
      }

      sapSound.playSuccess();
      setSapDb(loadSapDatabase());
      setStatusBar({
        type: 'success',
        code: 'VF 311',
        message: billRes.billing?.isProforma
          ? `Proforma fatura (${fkartVal}) ${billRes.billing.vbeln} saklandı. [Resmî SAP Kuralı: RFBSK='D' — Proforma fatura FI/ACDOCA muhasebe kaydı üretmez].`
          : `Belge ${billRes.billing?.vbeln} (F2 Ticari Fatura) saklandı ve ACDOCA Evrensel Yevmiye fişi (${billRes.fiDoc?.belnr}) otomatik oluşturuldu.`,
      });
      return;
    }

    // BP Save
    if (targetTCode === 'BP') {
      const bpNo = formData['bp_number'] || '100099';
      const role = formData['bp_role'] || 'FLCU01';
      const created = createBusinessPartnerRecord({
        bpNumber: bpNo,
        category: '2',
        name1: formData['bp_name1'] || 'Yeni Kurumsal İş Ortağı A.Ş.',
        city: formData['bp_city'] || 'İstanbul',
        country: 'TR',
        address: formData['bp_street'] || 'Organize Sanayi Bölgesi',
        taxNumberVkn: formData['bp_vkn'] || '9018273645',
        roles: ['000000', 'FLCU00', role],
        companyCode: formData['bp_bukrs'] || 'TR01',
        reconciliationAccount: '120000',
        salesOrg: '1000',
        distChannel: '10',
        division: '00',
        currency: 'TRY',
        paymentTerms: formData['bp_zterm'] || '0001',
        incoterms: formData['bp_inco'] || 'EXW',
      });
      sapSound.playSuccess();
      setSapDb(loadSapDatabase());
      setStatusBar({
        type: 'success',
        code: 'R1 210',
        message: `İş ortağı ${created.bpNumber} BUT000 tablosuna kaydedildi ve CVI ile KNA1 (${created.cviSyncedCustomerNo || '-'}) senkronize edildi.`,
      });
      return;
    }

    sapSound.playSuccess();
    const docNo = `1900002841`;
    const successMsg = screen.saveSuccessMessage.messageTemplate.replace('{docNo}', docNo);

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
      {/* 1. TOP FIORI / WEBGUI SHELL BAR (image_9d728736.png & image_2a8a256d.png) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#34495e] text-white px-4 py-2 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Back Arrow + SAP Logo + Exact Screen Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sapSound.playClick();
              if (stage === 'overview' && isMultiStage) {
                setStage('initial');
              } else if (onReturnToMainMenu) {
                onReturnToMainMenu();
              }
            }}
            className="p-1 rounded hover:bg-white/10 text-white transition-colors"
            title="Geri (F3)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* SAP Brand Logo */}
          <div className="px-1.5 py-0.5 rounded bg-gradient-to-b from-[#008FD3] to-[#0062A3] text-white font-extrabold text-xs tracking-wider shadow-xs">
            SAP
          </div>

          {/* Exact Screen Title from Screenshots */}
          <span className="font-bold text-white text-sm tracking-tight">
            {stage === 'initial' && targetTCode === 'VA01'
              ? 'Satış siparişleri oluştur: Başlangıç ekranı'
              : stage === 'overview' && targetTCode === 'VA01'
              ? 'Standart sipariş yarat: Genel bakış'
              : stage === 'initial' && targetTCode === 'VL01N'
              ? 'Gönderilen teslimatı sipariş referansı ile yarat'
              : stage === 'overview' && targetTCode === 'VL01N'
              ? savedDeliveryDocNo
                ? `Yapılan teslimat ${savedDeliveryDocNo} Değiştir: Genel bakış`
                : 'Yapılan teslimat Yarat: Genel bakış'
              : targetTCode === 'VL02N'
              ? 'Yapılan teslimat 80040620 Değiştir: Genel bakış'
              : stage === 'initial' && targetTCode === 'VF01'
              ? 'Faturalama belgesi yarat'
              : stage === 'overview' && targetTCode === 'VF01'
              ? 'Fatura (F2) Yarat: Genel bakış-Faturalama belgesi kalemleri'
              : screen.screenTitle}
          </span>
        </div>

        {/* Right: Data Preset Switcher + Video Comparison + Search + Bell + User B */}
        <div className="flex items-center gap-2.5 ml-auto flex-wrap">
          {/* Quick Stage Switcher for Multi-Stage T-Codes (Başlangıç Ekranı <-> Genel Bakış) */}
          {isMultiStage && (
            <div className="flex items-center bg-black/25 rounded p-0.5 text-[11px] border border-white/15">
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStage('initial');
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  stage === 'initial'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                1. Başlangıç Ekranı
              </button>
              <button
                type="button"
                onClick={() => {
                  sapSound.playEnter();
                  setStage('overview');
                  if (targetTCode === 'VL01N' || targetTCode === 'VL02N') {
                    setActiveTab('tab_picking');
                  }
                }}
                className={`px-2 py-0.5 rounded font-semibold transition-all ${
                  stage === 'overview'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                2. Genel Bakış Paneli
              </button>
            </div>
          )}

          {/* Quick Preset Data Switcher */}
          <div className="hidden lg:flex items-center bg-white/10 rounded p-0.5 text-[11px]">
            <button
              type="button"
              onClick={loadVideoItems}
              className={`px-2 py-0.5 rounded font-semibold transition-all ${
                dataPreset === 'video'
                  ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Videodaki 531 Melone Tee & 532 üzümlü çay (TR1923 / 3.050 EUR)"
            >
              🎬 Videodaki Veriler
            </button>
            <button
              type="button"
              onClick={loadTr01Items}
              className={`px-2 py-0.5 rounded font-semibold transition-all ${
                dataPreset === 'tr01'
                  ? 'bg-emerald-400 text-slate-950 shadow-xs font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="TR01 Şirket Kodu Örnek Verileri (Koçak Lojistik / 53.000 TL)"
            >
              🇹🇷 TR01 Verileri
            </button>
          </div>

          {/* Search Icon */}
          <Search className="w-4 h-4 text-white/85 cursor-pointer hover:text-white" />

          {/* Bell Icon */}
          <span className="text-white/85 text-sm cursor-pointer hover:text-white">🔔</span>

          {/* User Avatar B */}
          <div
            className="w-7 h-7 rounded-full bg-[#008FD3] text-white font-bold flex items-center justify-center text-xs shadow-xs"
            title="Kullanıcı: B (Berke Ergen)"
          >
            B
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1.1 ÜST WEBGUI ARAÇ ÇUBUĞU (EKRANA ÖZEL BİREBİR BUTONLAR)     */}
      {/* image_9d728736.png, image_2a8a256d.png, IMG_3032, IMG_3033, IMG_3034 */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-300 px-4 py-1.5 flex items-center justify-between gap-2 text-xs text-slate-800 shadow-2xs relative z-20">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Left Command Input Box with Dropdown Arrow [                 ▾] */}
          <form onSubmit={handleCommandSubmit} className="flex items-center">
            <div className="relative flex items-center w-40 bg-white border border-slate-300 rounded px-2 py-1 focus-within:border-sky-600">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                className="w-full bg-transparent text-xs font-mono text-slate-800 focus:outline-none"
                placeholder="/nVL01N"
              />
              <button
                type="submit"
                className="text-slate-500 hover:text-slate-800 ml-1"
                title="Komut Seç / Yürüt (Enter)"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* ========================================================= */}
          {/* CASE A: VL01N INITIAL SCREEN TOOLBAR (image_2a8a256d.png) */}
          {/* Sipariş referansı olmadan | Genel bakış | Daha fazla ▾     */}
          {/* ========================================================= */}
          {targetTCode === 'VL01N' && stage === 'initial' && (
            <>
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStatusBar({
                    type: 'info',
                    code: 'VL 012',
                    message: 'Sipariş referansı olmadan teslimat (VL01NO) modu seçildi.',
                  });
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 font-normal transition-colors"
              >
                Sipariş referansı olmadan
              </button>

              <button
                type="button"
                onClick={handleProceedToOverview}
                className="px-2.5 py-1 rounded hover:bg-sky-50 text-slate-900 font-medium border border-transparent hover:border-sky-300 transition-colors"
                title="Genel bakış ekranına geç (Yapılan teslimat Yarat: Genel bakış)"
              >
                Genel bakış
              </button>
            </>
          )}

          {/* ========================================================= */}
          {/* CASE B: VL01N OVERVIEW SCREEN TOOLBAR (image_9d728736.png)*/}
          {/* Diğer gönderilen teslimat | Başlık ayrıntıları | Ambalajla | Eksiklik | Mal çıkışını kaydet | Daha fazla ▾ */}
          {/* ========================================================= */}
          {targetTCode === 'VL01N' && stage === 'overview' && (
            <>
              {savedDeliveryDocNo && (
                <button
                  type="button"
                  onClick={() => {
                    sapSound.playClick();
                    setStatusBar({
                      type: 'info',
                      code: 'VL 020',
                      message: 'Görüntüle <-> Değiştir modları arasında geçiş yapıldı.',
                    });
                  }}
                  className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
                >
                  Görüntüle &lt;-&gt; değiştir
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStage('initial');
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Diğer gönderilen teslimat
              </button>

              {savedDeliveryDocNo && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      sapSound.playClick();
                      setStatusBar({
                        type: 'warning',
                        code: 'VL 090',
                        message: 'Teslimat belgesi silme kontrolü başlatıldı.',
                      });
                    }}
                    className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
                  >
                    Sil
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sapSound.playClick();
                      setDocFlowModalOpen(true);
                    }}
                    className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
                  >
                    Belge akışı
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStatusDetailModalOpen(true);
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Başlık ayrıntıları
              </button>

              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStatusBar({
                    type: 'info',
                    code: 'V51P 001',
                    message: 'Ambalajlama (Taşıma Birimi / Handling Unit - KP) ekranı kontrol edildi: 20 KAR paletlendi.',
                  });
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Ambalajla
              </button>

              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStatusBar({
                    type: 'success',
                    code: 'V1 104',
                    message: 'Teslimat belgesinde eksik veri bulunmamaktadır (Belge tamamlandı).',
                  });
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Eksiklik
              </button>

              <button
                type="button"
                onClick={handlePostGoodsIssue}
                className="px-2.5 py-1 rounded border border-slate-400 bg-slate-100 hover:bg-sky-50 hover:border-sky-500 text-slate-900 font-semibold transition-all shadow-2xs"
                title="Mal çıkışını kaydet (Post Goods Issue - PGI / Hareket 601)"
              >
                Mal çıkışını kaydet
              </button>
            </>
          )}

          {/* ========================================================= */}
          {/* CASE C: VL02N OVERVIEW SCREEN TOOLBAR (IMG_3032)          */}
          {/* Görüntüle <-> değiştir | Diğer gönderilen teslimat | Sil | Belge akışı | Başlık ayrıntıları | Ambalajla | Eksiklik | Mal çıkışını kaydet */}
          {/* ========================================================= */}
          {targetTCode === 'VL02N' && (
            <>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Görüntüle &lt;-&gt; değiştir
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Diğer gönderilen teslimat
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Sil
              </button>
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setDocFlowModalOpen(true);
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Belge akışı
              </button>
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStatusDetailModalOpen(true);
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Başlık ayrıntıları
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Ambalajla
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Eksiklik
              </button>
              <button
                type="button"
                onClick={handlePostGoodsIssue}
                className="px-2.5 py-1 rounded border border-slate-400 bg-slate-100 hover:bg-sky-50 text-slate-900 font-semibold transition-all"
              >
                Mal çıkışını kaydet
              </button>
            </>
          )}

          {/* ========================================================= */}
          {/* CASE D: VF01 INITIAL SCREEN TOOLBAR (IMG_3034)            */}
          {/* Değiştir | Görüntüle | Faturalama belgesi iş listesi | Faturalama belgesine genel bakış | Seçim tarihi | Seçim listesi | Diğer belgeler */}
          {/* ========================================================= */}
          {targetTCode === 'VF01' && stage === 'initial' && (
            <>
              <button
                type="button"
                onClick={() => onSelectTCode('VF02')}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Değiştir
              </button>
              <button
                type="button"
                onClick={() => onSelectTCode('VF03')}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Görüntüle
              </button>
              <button
                type="button"
                onClick={() => onSelectTCode('VF04')}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Faturalama belgesi iş listesi
              </button>
              <button
                type="button"
                onClick={handleProceedToOverview}
                className="px-2 py-1 rounded hover:bg-sky-50 text-slate-900 font-medium transition-colors"
              >
                Faturalama belgesine genel bakış
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Seçim tarihi
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Seçim listesi
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Diğer belgeler
              </button>
            </>
          )}

          {/* ========================================================= */}
          {/* CASE E: VF01 OVERVIEW SCREEN TOOLBAR (IMG_3033)           */}
          {/* Fiyat koşulları başlığı | Değiştir | Görüntüle | Daha fazla ▾ */}
          {/* ========================================================= */}
          {targetTCode === 'VF01' && stage === 'overview' && (
            <>
              <button
                type="button"
                onClick={() => {
                  setPriceConditionsModalOpen(true);
                  sapSound.playClick();
                }}
                className="px-2.5 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Fiyat koşulları başlığı
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Değiştir
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Görüntüle
              </button>
            </>
          )}

          {/* ========================================================= */}
          {/* CASE F: VA01 & ALL OTHER T-CODES TOOLBAR                  */}
          {/* ========================================================= */}
          {targetTCode !== 'VL01N' && targetTCode !== 'VL02N' && targetTCode !== 'VF01' && (
            <>
              <button
                type="button"
                onClick={() => {
                  setPriceConditionsModalOpen(true);
                  sapSound.playClick();
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Fiyat koşulları başlığı
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Değiştir
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Görüntüle
              </button>
              <button
                type="button"
                onClick={() => {
                  setDocFlowModalOpen(true);
                  sapSound.playClick();
                }}
                className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 transition-colors"
              >
                Belge akışı
              </button>
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setFormData((prev) => ({ ...prev, bstkd: '' }));
                  setIncompletionChecked(false);
                  setIncompletionCompletingField(false);
                  setIncompletionModalOpen(true);
                }}
                className="px-2.5 py-1 rounded border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Eksiklik günlüğü</span>
              </button>
            </>
          )}

          {/* Daha fazla ▾ Dropdown Menu (Always present as in all screenshots) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="px-2 py-1 rounded hover:bg-slate-100 text-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>Daha fazla</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {moreMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-60 bg-white border border-slate-300 rounded shadow-xl py-1 text-xs text-slate-800 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setPriceConditionsModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800 flex items-center justify-between"
                >
                  <span>Fiyat koşulları başlığı</span>
                  <span className="text-[10px] text-slate-400">PR00/MWST</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setDocFlowModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800 flex items-center justify-between"
                >
                  <span>Belge akışı (VBFA)</span>
                  <span className="text-[10px] text-slate-400">F5</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setFormData((prev) => ({ ...prev, bstkd: '' }));
                    setIncompletionChecked(false);
                    setIncompletionCompletingField(false);
                    setIncompletionModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800 flex items-center justify-between font-semibold text-amber-800"
                >
                  <span>Yarat satis: Eksiklik günlüğü</span>
                  <span className="text-[10px] text-slate-400">Ctrl+F8</span>
                </button>
                <div className="border-t border-slate-200 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    setStatusDetailModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-sky-50 hover:text-sky-800"
                >
                  <span>Sistem Bilgisi & Teknik Tablo</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side of WebGUI Toolbar: 🔍 🔍+ Çık (Exact match to image_9d728736.png) */}
        <div className="flex items-center gap-3 text-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => setF4ModalOpen(true)}
            className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900"
            title="Bul / Ara (Ctrl+F)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setXrayActive(!xrayActive)}
            className="p-1 hover:bg-slate-100 rounded text-slate-600 hover:text-slate-900 text-xs font-mono"
            title="Detay / Röntgen Görünümü (🔍+)"
          >
            🔍+
          </button>
          <button
            type="button"
            onClick={() => {
              sapSound.playClick();
              if (onReturnToMainMenu) onReturnToMainMenu();
            }}
            className="px-2 py-0.5 rounded hover:bg-slate-100 text-slate-800 font-normal"
            title="İşlemden Çık (Shift+F3)"
          >
            Çık
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN WEBGUI CANVAS AREA                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 min-h-[540px] bg-[#f7f7f7] overflow-y-auto">
        {/* ============================================================= */}
        {/* EKRAN 1: VL01N BAŞLANGIÇ EKRANI (image_2a8a256d.png & IMG_3028)*/}
        {/* Gönderilen teslimatı sipariş referansı ile yarat              */}
        {/* ============================================================= */}
        {targetTCode === 'VL01N' && stage === 'initial' ? (
          <div className="bg-white min-h-[540px] px-8 py-8 text-xs text-slate-800 relative">
            <div className="max-w-3xl space-y-6">
              {/* Row 1: * Sevkiyat noktası: [1010][🔍] Sevkiyat noktası 1010 + Inline "Arama sonuçları" Popover */}
              <div className="grid grid-cols-12 items-center gap-3 relative">
                <label className="col-span-3 text-right text-slate-700 font-normal">
                  <span className="text-red-600 font-bold mr-1">*</span>Sevkiyat noktası:
                </label>
                <div className="col-span-9 flex items-center gap-2 relative">
                  <div className="inline-flex items-center relative">
                    <input
                      type="text"
                      value={formData['vstel'] ?? '1010'}
                      onChange={(e) => {
                        setFormData({ ...formData, vstel: e.target.value });
                        setVstelInlineSearchOpen(true);
                      }}
                      onFocus={() => setVstelInlineSearchOpen(true)}
                      className="w-16 h-6 bg-white border border-[#2b6cb0] px-1.5 text-xs font-mono text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setVstelInlineSearchOpen(!vstelInlineSearchOpen)}
                      className="w-6 h-6 bg-[#346187] hover:bg-[#284b6a] text-white flex items-center justify-center border border-[#346187]"
                      title="Sevkiyat Noktası Arama Sonuçlarını Aç/Kapat (F4)"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-slate-700 text-xs">
                    Sevkiyat noktası {formData['vstel'] || '1010'}
                  </span>

                  {/* ======================================================= */}
                  {/* INLINE "ARAMA SONUÇLARI" POPOVER (image_2a8a256d.png)    */}
                  {/* ======================================================= */}
                  {vstelInlineSearchOpen && (
                    <div className="absolute left-0 top-7 w-72 bg-white border border-slate-300 shadow-xl z-40 text-xs text-slate-800 select-none">
                      {/* Top row inside popover: 1010 and (x) clear icon */}
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-200 bg-white">
                        <span className="font-mono text-slate-800">{formData['vstel'] || '1010'}</span>
                        <button
                          type="button"
                          onClick={() => setVstelInlineSearchOpen(false)}
                          className="text-slate-400 hover:text-slate-700 text-sm leading-none"
                          title="Kapat"
                        >
                          ⊗
                        </button>
                      </div>

                      {/* Arama sonuçları subheader */}
                      <div className="px-3 py-1.5 border-b border-slate-200 bg-white text-slate-700 font-normal">
                        Arama sonuçları
                      </div>

                      {/* Table Header: SNok | Tanım */}
                      <div className="grid grid-cols-12 px-3 py-1.5 bg-[#f7f7f7] border-b border-slate-200 text-slate-600 text-[11px]">
                        <div className="col-span-4">SNok</div>
                        <div className="col-span-8">Tanım</div>
                      </div>

                      {/* Rows matching image_2a8a256d.png & IMG_3026 */}
                      <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                        {[
                          { code: '1010', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                          { code: '1012', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                          { code: '101C', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                          { code: '1020', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                          { code: '1030', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                          { code: 'SP01', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                          { code: 'SP02', labelPrefix: 'Sevkiyat noktası ', boldPart: '1010' },
                        ].map((row) => (
                          <div
                            key={row.code}
                            onClick={() => {
                              setFormData({ ...formData, vstel: row.code });
                              setVstelInlineSearchOpen(false);
                              sapSound.playClick();
                            }}
                            className="grid grid-cols-12 px-3 py-1.5 hover:bg-[#e5f1fb] cursor-pointer items-center"
                          >
                            <div className="col-span-4 font-bold text-slate-900">{row.code}</div>
                            <div className="col-span-8 text-slate-700">
                              {row.labelPrefix}
                              <strong className="font-bold text-slate-900">{row.boldPart}</strong>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section 1: Müşteri siparişi verileri (image_2a8a256d.png & IMG_3028) */}
              <div className="pt-2">
                <div className="border-b border-slate-300 pb-1 mb-3 text-slate-800 font-normal text-sm">
                  Müşteri siparişi verileri
                </div>

                <div className="space-y-2.5">
                  {/* Seçim tarihi */}
                  <div className="grid grid-cols-12 items-center gap-3">
                    <label className="col-span-3 text-right text-slate-600">
                      Seçim tarihi:
                    </label>
                    <div className="col-span-9">
                      <input
                        type="text"
                        value={formData['seldate'] ?? '07.10.2021'}
                        onChange={(e) => setFormData({ ...formData, seldate: e.target.value })}
                        className="w-28 h-6 bg-white border border-slate-300 px-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                      />
                    </div>
                  </div>

                  {/* * Sipariş */}
                  <div className="grid grid-cols-12 items-center gap-3">
                    <label className="col-span-3 text-right text-slate-600">
                      <span className="text-red-600 font-bold mr-1">*</span>Sipariş:
                    </label>
                    <div className="col-span-9">
                      <input
                        type="text"
                        value={formData['vbeln'] ?? '32833'}
                        onChange={(e) => setFormData({ ...formData, vbeln: e.target.value })}
                        className="w-28 h-6 bg-white border border-slate-300 px-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                      />
                    </div>
                  </div>

                  {/* Kaynak kalem */}
                  <div className="grid grid-cols-12 items-center gap-3">
                    <label className="col-span-3 text-right text-slate-600">
                      Kaynak kalem:
                    </label>
                    <div className="col-span-9">
                      <input
                        type="text"
                        value={formData['kaynak_kalem'] ?? ''}
                        onChange={(e) => setFormData({ ...formData, kaynak_kalem: e.target.value })}
                        className="w-20 h-6 bg-white border border-slate-300 px-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                      />
                    </div>
                  </div>

                  {/* Kalem (son) */}
                  <div className="grid grid-cols-12 items-center gap-3">
                    <label className="col-span-3 text-right text-slate-600">
                      Kalem (son):
                    </label>
                    <div className="col-span-9">
                      <input
                        type="text"
                        value={formData['kalem_son'] ?? ''}
                        onChange={(e) => setFormData({ ...formData, kalem_son: e.target.value })}
                        className="w-20 h-6 bg-white border border-slate-300 px-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Teslimat türü belirle (image_2a8a256d.png & IMG_3028) */}
              <div className="pt-2">
                <div className="border-b border-slate-300 pb-1 mb-3 text-slate-800 font-normal text-sm">
                  Teslimat türü belirle
                </div>

                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Teslimat türü:
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={formData['lfart'] ?? ''}
                      onChange={(e) => setFormData({ ...formData, lfart: e.target.value })}
                      placeholder="LF"
                      className="w-16 h-6 bg-white border border-slate-300 px-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (targetTCode === 'VL01N' || targetTCode === 'VL02N') && stage === 'overview' ? (
          /* ============================================================= */
          /* EKRAN 2: VL01N / VL02N GENEL BAKIŞ EKRANI                     */
          /* (image_9d728736.png, IMG_3027_b41b9bed.jpeg, IMG_3032)        */
          /* Yapılan teslimat Yarat: Genel bakış                           */
          /* ============================================================= */
          <div className="bg-[#f5f7f9] min-h-[540px] text-xs text-slate-800 flex flex-col justify-between">
            <div>
              {/* 1. ÜST BAŞLIK PANELİ (image_9d728736.png BİREBİR) */}
              {/* Tsl.: [        ]  Belge tarihi: [07.10.2021]      [ ⇄ Tml.dğr. ] */}
              {/* Malı tsl.alan: [TR1923] [🗔] TÜRKİYE ŞUBE / 50765 köln           */}
              <div className="bg-[#f5f7f9] px-8 pt-4 pb-3 space-y-2 border-b border-slate-300">
                {/* Row 1: Tsl. + Belge tarihi + [⇄ Tml.dğr.] */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-12">
                    <div className="flex items-center gap-2">
                      <label className="w-24 text-right text-slate-600">Tsl.:</label>
                      <input
                        type="text"
                        value={
                          targetTCode === 'VL02N'
                            ? '80040620'
                            : savedDeliveryDocNo
                        }
                        onChange={(e) => setSavedDeliveryDocNo(e.target.value)}
                        className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs text-slate-900"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-slate-600">Belge tarihi:</label>
                      <input
                        type="text"
                        value={formData['bldat'] ?? '07.10.2021'}
                        onChange={(e) => setFormData({ ...formData, bldat: e.target.value })}
                        className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Right wide button: [ ⇄ Tml.dğr. ] (image_9d728736.png) */}
                  <button
                    type="button"
                    onClick={() => {
                      sapSound.playClick();
                      setStatusBar({
                        type: 'info',
                        code: 'VL 088',
                        message: 'Tamamlama değerleri (Tml.dğr.) kontrol edildi: Brüt/Net ağırlık ve hacim değerleri tam.',
                      });
                    }}
                    className="w-56 h-6 bg-[#f7f7f7] hover:bg-slate-200 border border-slate-400 rounded-xs text-slate-800 text-xs flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span className="font-mono text-[11px]">⇄</span>
                    <span>Tml.dğr.</span>
                  </button>
                </div>

                {/* Row 2: Malı tsl.alan: [TR1923] [🗔] TÜRKİYE ŞUBE / 50765 köln */}
                <div className="flex items-center gap-2">
                  <label className="w-24 text-right text-slate-600">Malı tsl.alan:</label>
                  <input
                    type="text"
                    value={formData['kunwe'] ?? selectedCustomer.code}
                    onChange={(e) => setFormData({ ...formData, kunwe: e.target.value })}
                    className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomerModalOpen(true)}
                    className="w-6 h-6 bg-[#f7f7f7] hover:bg-slate-200 border border-slate-300 rounded-xs flex items-center justify-center text-slate-600"
                    title="Muhatap / Müşteri Ana Verilerini Görüntüle"
                  >
                    🗔
                  </button>
                  <span className="text-slate-700 pl-2">
                    {selectedCustomer.code === 'TR1923'
                      ? 'TÜRKİYE ŞUBE / 50765 köln'
                      : `${selectedCustomer.name} / ${selectedCustomer.city}`}
                  </span>
                </div>

                {/* 6 TABS BAR (image_9d728736.png BİREBİR): */}
                {/* Kaleme genel bakış | Çekme | Yükle | Nakliye | Duruma genel bakış | Mal hareketi verileri */}
                <div className="pt-3 flex items-center gap-5 overflow-x-auto scrollbar-none">
                  {screen.tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id);
                          sapSound.playTab();
                        }}
                        className={`pb-1.5 text-xs whitespace-nowrap transition-all border-b-2 ${
                          isActive
                            ? 'border-[#0070f2] text-[#0070f2] font-semibold'
                            : 'border-transparent text-slate-700 hover:text-slate-950'
                        }`}
                      >
                        {tab.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. SEKME İÇERİĞİ (IMG_3027 & IMG_3032 Çekme Ekranı Birebir) */}
              <div className="bg-white mx-4 my-2 border border-slate-200 p-4 space-y-4 shadow-2xs">
                {(activeTab === 'tab_picking' || activeTab === 'tab_item_overview' || activeTab === 'tab_goods_movement') ? (
                  <>
                    {/* 3-Column Header inside Çekme Tab (IMG_3027 & IMG_3032) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-3 border-b border-slate-200 text-xs">
                      {/* Column 1: Çekme termini + Depo numarası */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <label className="w-28 text-right text-slate-600">Çekme termini:</label>
                          <input
                            type="text"
                            value={formData['kodat'] ?? '07.10.2021'}
                            onChange={(e) => setFormData({ ...formData, kodat: e.target.value })}
                            className="w-24 h-6 bg-white border border-slate-300 px-2 font-mono text-xs"
                          />
                          <input
                            type="text"
                            value={formData['kouhr'] ?? '00:0...'}
                            onChange={(e) => setFormData({ ...formData, kouhr: e.target.value })}
                            className="w-16 h-6 bg-white border border-slate-300 px-1.5 font-mono text-xs"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="w-28 text-right text-slate-600">Depo numarası:</label>
                          <input
                            type="text"
                            value={formData['lgnum'] ?? ''}
                            onChange={(e) => setFormData({ ...formData, lgnum: e.target.value })}
                            className="w-12 h-6 bg-[#f2f2f2] border border-slate-300 px-1.5 font-mono text-xs"
                          />
                        </div>
                      </div>

                      {/* Column 2: Genel çekme drm + DY akt.durumu */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <label className="w-28 text-right text-slate-600">Genel çekme drm:</label>
                          <input
                            type="text"
                            readOnly
                            value={
                              tableItems.every(
                                (it) => (pickedQuantities[it.kalemNo] ?? 0) >= it.miktar
                              )
                                ? 'C'
                                : 'A'
                            }
                            className="w-7 h-6 bg-[#f2f2f2] border border-slate-300 text-center font-mono text-xs"
                          />
                          <span className="text-slate-600">
                            {tableItems.every(
                              (it) => (pickedQuantities[it.kalemNo] ?? 0) >= it.miktar
                            )
                              ? 'Tamamen çekildi'
                              : 'Henüz çekilmedi'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="w-28 text-right text-slate-600">DY akt.durumu:</label>
                          <input
                            type="text"
                            readOnly
                            value=""
                            className="w-7 h-6 bg-[#f2f2f2] border border-slate-300 text-center font-mono text-xs"
                          />
                          <span className="text-slate-600">WM-nkl.sprş.gereksiz</span>
                        </div>
                      </div>

                      {/* Column 3: Glşm.ml.kbl.svk.ilş. + Depo yürütme */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <label className="w-36 text-right text-slate-600">Glşm.ml.kbl.svk.ilş.:</label>
                          <input
                            type="text"
                            readOnly
                            value=""
                            className="w-6 h-6 bg-[#f2f2f2] border border-slate-300 text-center font-mono text-xs"
                          />
                          <span className="text-slate-600">İlişkili değil</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="w-36 text-right text-slate-600">Depo yürütme:</label>
                          <input
                            type="text"
                            readOnly
                            value=""
                            className="w-6 h-6 bg-[#f2f2f2] border border-slate-300 text-center font-mono text-xs"
                          />
                          <span className="text-slate-600">İlişkili değil</span>
                        </div>
                      </div>
                    </div>

                    {/* Tüm kalemler Table (IMG_3027 & IMG_3032 Exact 17 Columns) */}
                    <div className="space-y-1.5">
                      <div className="text-sm font-normal text-slate-800">
                        Tüm kalemler
                      </div>

                      <div className="border border-slate-300 overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead className="bg-[#f2f2f2] border-b border-slate-300 text-slate-700 font-normal text-[11px]">
                            <tr className="divide-x divide-slate-300">
                              <th className="py-1.5 px-2 w-7 text-center"></th>
                              <th className="py-1.5 px-2 w-12">Klm</th>
                              <th className="py-1.5 px-2 w-44">Malzeme</th>
                              <th className="py-1.5 px-2 w-12">ÜY</th>
                              <th className="py-1.5 px-2 w-14">DpYr</th>
                              <th className="py-1.5 px-2 w-24">İhtiyaç bölümü</th>
                              <th className="py-1.5 px-2 w-24">Tsl.miktarı</th>
                              <th className="py-1.5 px-2 w-10">ÖB</th>
                              <th className="py-1.5 px-2 w-28 font-semibold text-slate-900 bg-sky-50/60">
                                Çekilen miktar
                              </th>
                              <th className="py-1.5 px-2 w-10">ÖB</th>
                              <th className="py-1.5 px-2 w-16">Parti</th>
                              <th className="py-1.5 px-1.5 w-8 text-center">P...</th>
                              <th className="py-1.5 px-1.5 w-8 text-center">Ç..</th>
                              <th className="py-1.5 px-1.5 w-8 text-center">D..</th>
                              <th className="py-1.5 px-2 w-24">Hzred.trh.</th>
                              <th className="py-1.5 px-2 w-16">Mlz....</th>
                              <th className="py-1.5 px-2 w-16">Dğrl.türü</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 font-mono text-xs">
                            {tableItems.map((item) => {
                              const currentPick =
                                pickedQuantities[item.kalemNo] !== undefined
                                  ? pickedQuantities[item.kalemNo]
                                  : item.miktar;
                              return (
                                <tr key={item.kalemNo} className="divide-x divide-slate-200 hover:bg-sky-50/40">
                                  <td className="py-1 px-2 text-center">
                                    <input type="checkbox" className="w-3.5 h-3.5" />
                                  </td>
                                  <td className="py-1 px-2 underline text-slate-800">{item.kalemNo}</td>
                                  <td className="py-1 px-2 underline text-slate-900">
                                    {item.malzeme}{' '}
                                    <span className="no-underline text-slate-500 font-sans text-[11px]">
                                      ({item.kisaMetin})
                                    </span>
                                  </td>
                                  <td className="py-1 px-2 text-slate-700">1010</td>
                                  <td className="py-1 px-2 text-slate-700">{item.depoYeri || '101A'}</td>
                                  <td className="py-1 px-2"></td>
                                  <td className="py-1 px-2 text-slate-900">{item.miktar}</td>
                                  <td className="py-1 px-2 text-slate-700">{item.birim}</td>
                                  <td className="py-0.5 px-1 bg-sky-50/30">
                                    <input
                                      type="number"
                                      value={currentPick}
                                      onChange={(e) =>
                                        setPickedQuantities({
                                          ...pickedQuantities,
                                          [item.kalemNo]: Number(e.target.value),
                                        })
                                      }
                                      className="w-full h-5 bg-white border border-slate-400 focus:border-sky-600 px-1.5 font-mono font-bold text-slate-900 focus:outline-none"
                                    />
                                  </td>
                                  <td className="py-1 px-2 text-slate-700">{item.birim}</td>
                                  <td className="py-1 px-2"></td>
                                  <td className="py-1 px-1.5 text-center">
                                    <input type="checkbox" disabled className="w-3 h-3" />
                                  </td>
                                  <td className="py-1 px-1.5 text-center text-slate-700">
                                    {currentPick >= item.miktar ? 'C' : 'A'}
                                  </td>
                                  <td className="py-1 px-1.5 text-center"></td>
                                  <td className="py-1 px-2 text-slate-700">07.10.2021</td>
                                  <td className="py-1 px-2 text-slate-700">00:00:</td>
                                  <td className="py-1 px-2"></td>
                                </tr>
                              );
                            })}
                            {/* Empty Input Rows matching IMG_3027 & IMG_3032 */}
                            {[1, 2, 3].map((emptyIdx) => (
                              <tr key={emptyIdx} className="divide-x divide-slate-200 h-6 bg-[#fafafa]">
                                <td className="py-0.5 px-2 text-center">
                                  <input type="checkbox" className="w-3.5 h-3.5" />
                                </td>
                                <td className="bg-[#f0f0f0]"></td>
                                <td className="p-0.5 bg-white relative">
                                  {emptyIdx === 1 && (
                                    <div className="flex items-center justify-end pr-1 text-slate-400">
                                      <Search className="w-3 h-3" />
                                    </div>
                                  )}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">
                                  <input type="checkbox" disabled className="w-3 h-3" />
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Bottom Table Action Toolbar (IMG_3027 & IMG_3032 Birebir) */}
                      <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-700">
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="p-1 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                          title="Kalem Ayrıntıları"
                        >
                          <Search className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-1.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                          title="Tümünü Seç"
                        >
                          ☑
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-1.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                          title="Seçimi Kaldır"
                        >
                          ☐
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-1.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                          title="Kalem Ekle"
                        >
                          ⊕
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-1.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                          title="Kalem Sil"
                        >
                          ⊖
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-2.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs flex items-center gap-1"
                        >
                          <Search className="w-3 h-3" />
                          <span>Parti ayrşt.</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-2.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                        >
                          ▽ Ana kalemler
                        </button>
                        <button
                          type="button"
                          onClick={() => sapSound.playClick()}
                          className="px-2.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                        >
                          ▽ Tüm kalemler
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriceConditionsModalOpen(true)}
                          className="px-1.5 py-0.5 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
                          title="Koşullar"
                        >
                          💲
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Other tabs in VL01N (Yükle, Nakliye, Duruma genel bakış) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {screen.tabs
                      .find((t) => t.id === activeTab)
                      ?.fields?.map((field) => (
                        <div key={field.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={formData[field.id] ?? field.defaultValue ?? ''}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-900 font-mono"
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : targetTCode === 'VF01' && stage === 'initial' ? (
          /* ============================================================= */
          /* EKRAN 3: VF01 BAŞLANGIÇ EKRANI (IMG_3034_390311a3.jpeg)        */
          /* Faturalama belgesi yarat                                      */
          /* ============================================================= */
          <div className="bg-white min-h-[540px] px-8 py-6 text-xs text-slate-800 space-y-6">
            {/* Section 1: Standart veriler */}
            <div className="max-w-3xl">
              <div className="border-b border-slate-300 pb-1 mb-3 text-slate-800 font-normal text-sm">
                Standart veriler
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="w-28 text-right text-slate-600">Faturalama türü:</label>
                    <select
                      value={formData['fkart'] ?? 'F2'}
                      onChange={(e) => setFormData({ ...formData, fkart: e.target.value })}
                      className="w-48 h-6 bg-white border border-slate-300 px-2 font-mono text-xs text-slate-900"
                    >
                      <option value="">(Otomatik: F2)</option>
                      <option value="F2">F2 - Standart Fatura (FI Kaydı Üretir)</option>
                      <option value="F8">F8 - Teslimat Bazlı Proforma (FI Üretmez)</option>
                      <option value="F5">F5 - Sipariş Bazlı Proforma (FI Üretmez)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="w-28 text-right text-slate-600">Ftrl.tarihi:</label>
                    <input
                      type="text"
                      value={formData['fkdat'] ?? '07.10.2021'}
                      onChange={(e) => setFormData({ ...formData, fkdat: e.target.value })}
                      className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="w-28 text-right text-slate-600">SrvGrntOlşmTrh:</label>
                    <input
                      type="text"
                      value={formData['serv_date'] ?? ''}
                      onChange={(e) => setFormData({ ...formData, serv_date: e.target.value })}
                      className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="w-28 text-right text-slate-600">Fytl.trh.:</label>
                    <input
                      type="text"
                      value={formData['prsdt'] ?? '07.10.2021'}
                      onChange={(e) => setFormData({ ...formData, prsdt: e.target.value })}
                      className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: İşlenecek belgeler (IMG_3034 Birebir) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-normal text-slate-800">İşlenecek belgeler</span>
                <Settings className="w-4 h-4 text-slate-500" />
              </div>

              <div className="border border-slate-300 overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-[#f2f2f2] border-b border-slate-300 text-slate-700 font-normal text-[11px]">
                    <tr className="divide-x divide-slate-300">
                      <th className="py-1.5 px-2 w-8 text-center"></th>
                      <th className="py-1.5 px-2 w-36">Belge</th>
                      <th className="py-1.5 px-2 w-14">Klm.</th>
                      <th className="py-1.5 px-2 w-36">SD belgesinin tipi</th>
                      <th className="py-1.5 px-2 w-56">İşleme durumu</th>
                      <th className="py-1.5 px-2 w-14">Fat...</th>
                      <th className="py-1.5 px-2">İptEdlnFtrlmBlg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    <tr className="divide-x divide-slate-200 bg-white">
                      <td className="py-1 px-2 text-center">
                        <input type="radio" name="vf01_doc" defaultChecked className="w-3.5 h-3.5" />
                      </td>
                      <td className="p-0.5">
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={formData['billing_doc'] ?? '80040620'}
                            onChange={(e) => setFormData({ ...formData, billing_doc: e.target.value })}
                            className="w-full h-5 bg-white border border-slate-400 px-1.5 font-mono text-xs text-slate-900 focus:outline-none"
                          />
                          <Search className="w-3.5 h-3.5 text-slate-500 mx-1 shrink-0" />
                        </div>
                      </td>
                      <td className="py-1 px-2"></td>
                      <td className="py-1 px-2"></td>
                      <td className="py-1 px-2"></td>
                      <td className="py-1 px-2"></td>
                      <td className="py-1 px-2"></td>
                    </tr>
                    {[2, 3, 4, 5, 6].map((r) => (
                      <tr key={r} className="divide-x divide-slate-200 h-6 bg-[#fafafa]">
                        <td className="py-1 px-2 text-center">
                          <input type="radio" name="vf01_doc" className="w-3.5 h-3.5" />
                        </td>
                        <td className="bg-white"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : targetTCode === 'VF01' && stage === 'overview' ? (
          /* ============================================================= */
          /* EKRAN 4: VF01 GENEL BAKIŞ EKRANI (IMG_3033_720db398.jpeg)      */
          /* Fatura (F2) Yarat: Genel bakış-Faturalama belgesi kalemleri   */
          /* ============================================================= */
          <div className="bg-white min-h-[540px] px-8 py-4 text-xs text-slate-800 space-y-4">
            {/* Header Block matching IMG_3033 */}
            <div className="space-y-2 border-b border-slate-200 pb-3">
              {/* Row 1: [Fatura ▾] [$000000001]    Net değer: [ 3.050,00 ] [EUR] */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-1">
                  <select
                    value={formData['fkart'] ?? 'F2'}
                    onChange={(e) => setFormData({ ...formData, fkart: e.target.value })}
                    className="w-36 h-6 bg-white border border-slate-400 px-1.5 text-xs text-slate-900"
                  >
                    <option value="F2">Fatura</option>
                    <option value="F8">Proforma (F8)</option>
                    <option value="F5">Proforma (F5)</option>
                  </select>
                  <input
                    type="text"
                    readOnly
                    value="$000000001"
                    className="w-28 h-6 bg-[#f2f2f2] border border-slate-300 px-2 font-mono text-xs text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-slate-600">Net değer:</label>
                  <input
                    type="text"
                    readOnly
                    value={totalAmount.toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    className="w-32 h-6 bg-[#f2f2f2] border border-slate-300 px-2 text-right font-mono text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    readOnly
                    value={currencySymbol}
                    className="w-12 h-6 bg-[#f2f2f2] border border-slate-300 px-1.5 font-mono text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* Row 2: Ödeyen: [TR1923] TÜRKİYE ŞUBE / 50765 köln */}
              <div className="flex items-center gap-2">
                <label className="w-36 text-right text-slate-600">Ödeyen:</label>
                <input
                  type="text"
                  readOnly
                  value={selectedCustomer.code}
                  className="w-28 h-6 bg-[#f2f2f2] border border-slate-300 px-2 font-mono text-xs text-slate-800"
                />
                <span className="text-slate-700 pl-2">
                  {selectedCustomer.code === 'TR1923'
                    ? 'TÜRKİYE ŞUBE / 50765 köln'
                    : `${selectedCustomer.name} / ${selectedCustomer.city}`}
                </span>
              </div>

              {/* Row 3: Faturalama tarihi: [07.10.2021]      [🗎🔍] [🧢] [ ⇄ Tml.dğr. ] */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <label className="w-36 text-right text-slate-600">Faturalama tarihi:</label>
                  <input
                    type="text"
                    value={formData['fkdat'] ?? '07.10.2021'}
                    onChange={(e) => setFormData({ ...formData, fkdat: e.target.value })}
                    className="w-28 h-6 bg-white border border-slate-300 px-2 font-mono text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStatusDetailModalOpen(true)}
                    className="px-2 h-6 bg-[#f7f7f7] hover:bg-slate-200 border border-slate-300 rounded-xs text-xs"
                    title="Başlık Ayrıntılarını Görüntüle"
                  >
                    🗎
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriceConditionsModalOpen(true)}
                    className="px-2 h-6 bg-[#f7f7f7] hover:bg-slate-200 border border-slate-300 rounded-xs text-xs"
                    title="Başlık Koşulları"
                  >
                    🧢
                  </button>
                  <button
                    type="button"
                    onClick={() => sapSound.playClick()}
                    className="w-40 h-6 bg-[#f7f7f7] hover:bg-slate-200 border border-slate-300 rounded-xs text-xs flex items-center justify-center gap-1"
                  >
                    <span>⇄</span>
                    <span>Tml.dğr.</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-toolbar above VF01 Items Table (IMG_3033) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
              >
                🗎
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
              >
                ☑
              </button>
              <button
                type="button"
                onClick={() => sapSound.playClick()}
                className="px-2 py-1 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs"
              >
                ☐
              </button>
              <button
                type="button"
                onClick={() => setPriceConditionsModalOpen(true)}
                className="px-2 py-1 border border-slate-300 bg-[#f7f7f7] hover:bg-slate-200 rounded-xs ml-36"
                title="Kalem Fiyat Koşulları (PR00 / MWST)"
              >
                💲
              </button>
            </div>

            {/* VF01 Billing Items Table (IMG_3033 Birebir) */}
            <div className="border border-slate-300 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-[#f2f2f2] border-b border-slate-300 text-slate-700 font-normal text-[11px]">
                  <tr className="divide-x divide-slate-300">
                    <th className="py-1.5 px-2 w-7 text-center">☐</th>
                    <th className="py-1.5 px-2 w-14">Kalem</th>
                    <th className="py-1.5 px-2 w-40">Malzeme</th>
                    <th className="py-1.5 px-2 w-48">Kalem tanımı</th>
                    <th className="py-1.5 px-2 w-28 text-right">Faturalanan mkt.</th>
                    <th className="py-1.5 px-2 w-12">ÖB</th>
                    <th className="py-1.5 px-2 w-28 text-right">Net değer</th>
                    <th className="py-1.5 px-2 w-12">PB</th>
                    <th className="py-1.5 px-2 w-28 text-right">Vergi tutarı</th>
                    <th className="py-1.5 px-2 w-28">İhtiyaç bölümü</th>
                    <th className="py-1.5 px-2 w-14">Stok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono text-xs">
                  {tableItems.map((item) => {
                    const lineNet = item.miktar * item.fiyat;
                    const lineVat = lineNet * kdvRate;
                    return (
                      <tr key={item.kalemNo} className="divide-x divide-slate-200 bg-white hover:bg-sky-50/40">
                        <td className="py-1.5 px-2 text-center">
                          <input type="checkbox" className="w-3.5 h-3.5" />
                        </td>
                        <td className="py-1.5 px-2 underline text-slate-900">{item.kalemNo}</td>
                        <td className="py-1.5 px-2 text-slate-900">{item.malzeme}</td>
                        <td className="py-1.5 px-2 font-sans text-slate-800">{item.kisaMetin}</td>
                        <td className="py-1.5 px-2 text-right text-slate-900">{item.miktar}</td>
                        <td className="py-1.5 px-2 text-slate-700">{item.birim}</td>
                        <td className="py-1.5 px-2 text-right text-slate-900">
                          {lineNet.toLocaleString('tr-TR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-1.5 px-2 text-slate-700">{currencySymbol}</td>
                        <td className="py-1.5 px-2 text-right text-slate-900">
                          {lineVat.toLocaleString('tr-TR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-1.5 px-2"></td>
                        <td className="py-1.5 px-2"></td>
                      </tr>
                    );
                  })}
                  {[1, 2, 3, 4].map((emptyRow) => (
                    <tr key={emptyRow} className="divide-x divide-slate-200 h-6 bg-[#fafafa]">
                      <td className="py-1 px-2 text-center">
                        <input type="checkbox" disabled className="w-3.5 h-3.5" />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : targetTCode === 'VA01' && stage === 'initial' ? (
          /* ============================================================= */
          /* EKRAN 5: VA01 BAŞLANGIÇ EKRANI (SAPMV45A - Initial Screen)    */
          /* ============================================================= */
          <div className="p-6">
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
                  type="button"
                  onClick={handleProceedToOverview}
                  className="px-3.5 py-1.5 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <span>Genel Bakışa Geç</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-3">
                  <label className="font-semibold text-slate-700 sm:text-right">
                    <span className="text-red-600 mr-1">*</span>Sipariş türü:
                  </label>
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={formData['auart'] ?? 'OR'}
                      onChange={(e) => setFormData({ ...formData, auart: e.target.value })}
                      className="w-24 bg-white border border-slate-400 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900"
                    />
                    <span className="text-slate-600 text-[11px]">
                      OR (Standart sipariş) / ZOR (Türkiye Standart)
                    </span>
                  </div>
                </div>

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
                          value={formData['vkorg'] ?? '1010'}
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
                          value={formData['vtweg'] ?? '10'}
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
                          value={formData['spart'] ?? '00'}
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
                          value={formData['vkbur'] ?? '1000'}
                          onChange={(e) => setFormData({ ...formData, vkbur: e.target.value })}
                          className="w-24 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono text-slate-700"
                        />
                        <input
                          type="text"
                          value={formData['vkgrp'] ?? '100'}
                          onChange={(e) => setFormData({ ...formData, vkgrp: e.target.value })}
                          className="w-20 bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono text-slate-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================= */
          /* EKRAN 6: VA01 GENEL BAKIŞ & DİĞER T-CODE EKRANLARI            */
          /* ============================================================= */
          <div className="p-4 sm:p-5 space-y-4">
            {/* SOL ÜSTTE SİPARİŞ VEREN KUTUSU, SEÇENEKLERİ VE BAŞLIK KARTI */}
            <div className="bg-white border border-slate-300 rounded-lg p-3.5 shadow-sm space-y-3 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start text-xs">
                <div className="lg:col-span-8 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="w-28 font-semibold text-slate-700 flex items-center gap-1">
                      <span className="text-red-500 font-bold">*</span>
                      <span>Sipariş veren:</span>
                    </label>

                    <div className="flex items-center gap-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={selectedCustomer.code}
                          onChange={(e) => {
                            const val = e.target.value;
                            const found = SAP_CUSTOMER_MASTER.find(
                              (c) => c.code.toUpperCase() === val.toUpperCase()
                            );
                            if (found) setSelectedCustomer(found);
                            setFormData({ ...formData, kunnr: val });
                          }}
                          className="w-24 bg-white border border-slate-400 rounded px-2 py-1 font-mono font-bold text-slate-900"
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

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setSoldToDropdownOpen(!soldToDropdownOpen)}
                          className="px-2 py-1 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1"
                        >
                          <span>Seçenekler</span>
                          <ChevronDown className="w-3 h-3 text-slate-500" />
                        </button>

                        {soldToDropdownOpen && (
                          <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-slate-300 rounded-lg shadow-2xl py-1.5 z-50 divide-y divide-slate-100">
                            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Tanımlı Sipariş Veren Müşteriler (F4)
                            </div>
                            {SAP_CUSTOMER_MASTER.map((cust) => (
                              <button
                                key={cust.code}
                                type="button"
                                onClick={() => handleSelectCustomer(cust)}
                                className={`w-full text-left px-3 py-2 hover:bg-sky-50 flex items-start gap-2.5 ${
                                  selectedCustomer.code === cust.code
                                    ? 'bg-sky-50/70 border-l-2 border-sky-600'
                                    : ''
                                }`}
                              >
                                <Building className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono font-bold text-sky-700">{cust.code}</span>
                                    <span className="text-[10px] px-1 rounded bg-slate-100 text-slate-600">
                                      {cust.badge}
                                    </span>
                                  </div>
                                  <div className="text-slate-800 font-medium truncate">{cust.name}</div>
                                  <div className="text-slate-500 text-[11px] truncate">{cust.address}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 text-xs">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-bold">{selectedCustomer.name}</span>
                      <span className="text-slate-500">/</span>
                      <span className="text-slate-600 font-mono text-[11px]">
                        {selectedCustomer.city} ({selectedCustomer.country})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="w-28 text-slate-600">Malı tsl.alan:</label>
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

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <label className="w-28 text-slate-600">Müşteri referansı:</label>
                      <input
                        type="text"
                        value={formData['bstkd'] ?? '32833'}
                        onChange={(e) => setFormData({ ...formData, bstkd: e.target.value })}
                        className="w-32 bg-white border border-slate-300 rounded px-2 py-1 font-mono font-bold text-slate-900 text-xs"
                        placeholder="32833"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-slate-600">Müş.ref.trh.:</label>
                      <input
                        type="text"
                        value={formData['bstdk'] ?? '07.10.2021'}
                        onChange={(e) => setFormData({ ...formData, bstdk: e.target.value })}
                        className="w-28 bg-white border border-slate-300 rounded px-2 py-1 font-mono text-slate-900 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Net değer:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {totalAmount.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      {currencySymbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Vergi (%{kdvRate * 100}):</span>
                    <span className="font-mono">
                      {kdvAmount.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      {currencySymbol}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-1.5 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Toplam Belge Tutarı:</span>
                    <span className="font-mono font-bold text-sky-800 text-sm">
                      {grandTotal.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      {currencySymbol}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Tabs for VA01 & Other T-Codes */}
            <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-100 border-b border-slate-300 px-3 flex items-center gap-1 overflow-x-auto scrollbar-none">
                {screen.tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
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

              <div className="p-4">
                {screen.tabs.map((tab) => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <div key={tab.id} className="space-y-4">
                      {(tab.tableType === 'items' || (!tab.tableType && tab.id === 'tab_sales')) && (
                        <div className="border border-slate-300 rounded overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-semibold text-[11px]">
                              <tr>
                                <th className="py-2 px-2.5 w-12">Klm</th>
                                <th className="py-2 px-2.5">Malzeme</th>
                                <th className="py-2 px-2.5">Kalem Tanımı</th>
                                <th className="py-2 px-2.5 text-right">Sipariş Miktarı</th>
                                <th className="py-2 px-2.5">ÖB</th>
                                <th className="py-2 px-2.5 text-right">Net Değer</th>
                                <th className="py-2 px-2.5">PB</th>
                                <th className="py-2 px-2.5 text-right">Vergi Tutarı</th>
                                <th className="py-2 px-2.5">ÜY / Depo</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 font-mono">
                              {tableItems.map((item) => {
                                const lineTotal = item.miktar * item.fiyat;
                                const lineTax = lineTotal * kdvRate;
                                return (
                                  <tr key={item.kalemNo} className="hover:bg-sky-50">
                                    <td className="py-2 px-2.5 font-bold text-slate-700">{item.kalemNo}</td>
                                    <td className="py-2 px-2.5 font-bold text-[#0062A3]">{item.malzeme}</td>
                                    <td className="py-2 px-2.5 text-slate-800">{item.kisaMetin}</td>
                                    <td className="py-2 px-2.5 text-right font-bold">{item.miktar}</td>
                                    <td className="py-2 px-2.5 text-slate-500">{item.birim}</td>
                                    <td className="py-2 px-2.5 text-right font-bold text-slate-900">
                                      {lineTotal.toLocaleString('tr-TR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td className="py-2 px-2.5 text-slate-600">{currencySymbol}</td>
                                    <td className="py-2 px-2.5 text-right text-slate-600">
                                      {lineTax.toLocaleString('tr-TR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                    </td>
                                    <td className="py-2 px-2.5 text-slate-500">1010 / 101A</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {tab.fields && tab.fields.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {tab.fields.map((field) => (
                            <div key={field.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                value={formData[field.id] ?? field.defaultValue ?? ''}
                                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
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
      {/* (IMG_3026, IMG_3027, IMG_3028, IMG_3032, IMG_3033, IMG_3034)   */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#35404a] text-white px-4 py-2 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
        {/* Left: Authentic SAP Status Toast Box (e.g. [✔] Yapılan teslimat 80040620 saklandı) */}
        <div
          onClick={() => setStatusDetailModalOpen(true)}
          className="flex items-center gap-2 text-xs bg-white text-slate-900 px-2.5 py-1 rounded-xs shadow-xs cursor-pointer max-w-2xl truncate border border-slate-300"
          title="SAP Sistem İletisi Detayını Gör"
        >
          {statusBar.type === 'success' ? (
            <span className="w-4 h-4 rounded-full border border-emerald-600 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              ✓
            </span>
          ) : statusBar.type === 'error' ? (
            <XCircle className="w-4 h-4 text-red-600 shrink-0" />
          ) : statusBar.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-sky-600 shrink-0" />
          )}
          <span className="truncate font-normal text-slate-800">{statusBar.message}</span>
        </div>

        {/* Right: Screen-Specific Footer Buttons matching exact screenshots */}
        <div className="flex items-center gap-2 ml-auto">
          {stage === 'initial' && (targetTCode === 'VL01N' || targetTCode === 'VA01') ? (
            /* IMG_3026 & IMG_3028: Right side has blue "Devam" button */
            <button
              type="button"
              onClick={handleProceedToOverview}
              className="px-3.5 py-1 rounded-xs bg-[#427cac] hover:bg-[#366891] text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Devam
            </button>
          ) : (targetTCode === 'VL01N' || targetTCode === 'VL02N') && stage === 'overview' ? (
            /* IMG_3027 & IMG_3032: Right side has "Kaydet" (blue) and "İptal" */
            <>
              <button
                type="button"
                onClick={() => {
                  setSavedDeliveryDocNo('80040620');
                  handleSave();
                }}
                className="px-3.5 py-1 rounded-xs bg-[#427cac] hover:bg-[#366891] text-white font-semibold text-xs shadow-xs transition-colors"
                title="Kaydet (Ctrl+S)"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStage('initial');
                }}
                className="px-3 py-1 rounded-xs bg-transparent hover:bg-white/10 text-white text-xs transition-colors"
              >
                İptal
              </button>
            </>
          ) : targetTCode === 'VF01' && stage === 'initial' ? (
            /* IMG_3034: Right side has "Kaydet" (blue), "Ters kayıt", "Yürüt" */
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1 rounded-xs bg-[#427cac] hover:bg-[#366891] text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={handleReverse}
                className="px-3 py-1 rounded-xs bg-transparent hover:bg-white/10 text-white text-xs transition-colors"
              >
                Ters kayıt
              </button>
              <button
                type="button"
                onClick={handleProceedToOverview}
                className="px-3 py-1 rounded-xs bg-transparent hover:bg-white/10 text-white text-xs transition-colors"
              >
                Yürüt
              </button>
            </>
          ) : targetTCode === 'VF01' && stage === 'overview' ? (
            /* IMG_3033: Right side has "Kaydet" (blue), "Ters kayıt" */
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1 rounded-xs bg-[#427cac] hover:bg-[#366891] text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={handleReverse}
                className="px-3 py-1 rounded-xs bg-transparent hover:bg-white/10 text-white text-xs transition-colors"
              >
                Ters kayıt
              </button>
            </>
          ) : (
            /* Default Footer for VA01 Overview & Other T-Codes */
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1 rounded-xs bg-[#427cac] hover:bg-[#366891] text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => {
                  sapSound.playClick();
                  setStage('initial');
                }}
                className="px-3 py-1 rounded-xs bg-transparent hover:bg-white/10 text-white text-xs transition-colors"
              >
                İptal
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

            <div className="p-4 space-y-3 font-mono max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between font-sans text-xs">
                <span className="text-slate-600">
                  Canlı VBFA Tablosu — Siparişten Tahsilata (Order-to-Cash) Belge Akışı:
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-[10px] font-bold">
                  {sapDb.docFlow.length} VBFA Bağlantısı
                </span>
              </div>

              <div className="space-y-2 border-l-2 border-sky-500 pl-4 ml-2">
                {sapDb.docFlow.map((flow, idx) => (
                  <div key={`${flow.vbelv}-${flow.vbeln}-${idx}`} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-800">
                        {idx + 1}. {flow.vbelv} → {flow.vbeln} ({flow.vbtyp_n})
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-sans">
                        {flow.erdat}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px] mt-0.5 font-sans">
                      {flow.description} | Miktar: <span className="font-mono font-bold">{flow.rfmng}</span> | Tutar:{' '}
                      <span className="font-mono font-bold">{flow.rfwrt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} EUR</span>
                    </div>
                  </div>
                ))}
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
                <span>Fiyat Koşulları Başlığı (S/4HANA: PRCD_ELEMENTS / ECC: KONV)</span>
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

      {/* 5.6 YARAT SATIŞ: EKSİKLİK GÜNLÜĞÜ (IMG_2953.png & IMG_2954.png BİREBİR EKRANI) */}
      {incompletionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#f7f7f7] border border-slate-400 rounded shadow-2xl w-full max-w-4xl overflow-hidden text-slate-900 text-xs animate-in zoom-in-95 duration-150 flex flex-col min-h-[460px]">
            {/* Top Fiori/WebGUI Blue Shell Bar from IMG_2953 */}
            <div className="bg-[#2c3e50] text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIncompletionModalOpen(false)}
                  className="p-1 hover:bg-white/10 rounded text-white"
                  title="Geri"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-1.5 py-0.5 rounded bg-[#008FD3] text-white font-bold text-[11px] tracking-wider">
                  SAP
                </div>
                <span className="font-bold text-sm tracking-tight">
                  Yarat satis: Eksiklik günlüğü
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Search className="w-4 h-4" />
                <div className="w-6 h-6 rounded-full bg-[#008FD3] text-white font-bold flex items-center justify-center text-[11px]">
                  B
                </div>
              </div>
            </div>

            {/* WebGUI Sub-Toolbar from IMG_2953 & IMG_2954: [Command] 🔍 [Select All] [Deselect All] [Verileri tamamla] [Daha fazla v] */}
            <div className="bg-white border-b border-slate-300 px-4 py-1.5 flex items-center gap-3 text-xs text-slate-700">
              <div className="w-36 h-6 border border-slate-300 rounded flex items-center justify-end px-1.5 text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <button
                type="button"
                onClick={() => {
                  setIncompletionChecked(true);
                  sapSound.playClick();
                }}
                className="p-1 rounded hover:bg-slate-100 border border-transparent hover:border-slate-300 text-slate-600"
                title="Tümünü Seç (Select All)"
              >
                ☑
              </button>
              <button
                type="button"
                onClick={() => {
                  setIncompletionChecked(false);
                  sapSound.playClick();
                }}
                className="p-1 rounded hover:bg-slate-100 border border-transparent hover:border-slate-300 text-slate-600"
                title="Seçimi Kaldır (Deselect All)"
              >
                ☐
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!incompletionChecked) {
                    sapSound.playError();
                    setStatusBar({
                      type: 'warning',
                      code: 'V1 504',
                      message: 'Lütfen önce tablodaki "Müşteri referansı" satırının solundaki kutucuğu işaretleyin (IMG_2954)!',
                    });
                    return;
                  }
                  sapSound.playEnter();
                  setIncompletionCompletingField(true);
                }}
                className={`px-3 py-1 rounded border text-xs font-semibold transition-all ${
                  incompletionChecked
                    ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-400/50 shadow-sm'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                Verileri tamamla
              </button>
              <span className="text-slate-600 flex items-center gap-1 cursor-pointer">
                <span>Daha fazla</span>
                <ChevronDown className="w-3 h-3" />
              </span>
            </div>

            {/* White Header Info Block from IMG_2953 */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 space-y-2">
              <h2 className="text-lg font-normal text-slate-900">
                Yarat satis: Eksiklik günlüğü
              </h2>
              <div className="text-xs text-slate-800">
                <strong className="font-bold mr-2">Sipariş veren</strong>
                <span className="font-mono">{selectedCustomer.code} {selectedCustomer.name}</span>
              </div>
              <p className="text-xs italic text-slate-700 pt-1">
                Şu verileri tamamlamalısınız
              </p>
            </div>

            {/* Table Area from IMG_2953 & IMG_2954 */}
            <div className="flex-1 p-6 bg-[#f2f2f2] flex flex-col justify-between">
              <div className="bg-white border border-slate-300 max-w-xl shadow-2xs">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-[#f7f7f7] border-b border-slate-300 text-slate-600 font-normal">
                    <tr>
                      <th className="w-8 py-1.5 px-2 border-r border-slate-300 text-center">☐</th>
                      <th className="w-20 py-1.5 px-2 border-r border-slate-300">Kalem</th>
                      <th className="w-32 py-1.5 px-2 border-r border-slate-300">Kısa tanım</th>
                      <th className="py-1.5 px-3">Eksik veriler</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      onClick={() => setIncompletionChecked(!incompletionChecked)}
                      className={`cursor-pointer transition-colors ${
                        incompletionChecked ? 'bg-[#e5f1fb]' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-1.5 px-2 border-r border-slate-200 text-center">
                        <input
                          type="checkbox"
                          checked={incompletionChecked}
                          onChange={(e) => setIncompletionChecked(e.target.checked)}
                          className="w-3.5 h-3.5 accent-sky-600 cursor-pointer"
                        />
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200 font-mono text-slate-500">
                        000000
                      </td>
                      <td className="py-1.5 px-2 border-r border-slate-200 text-slate-600">
                        Başlık
                      </td>
                      <td className="py-1.5 px-3 font-medium text-slate-900">
                        Müşteri referansı
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Completion Step when user clicks "Verileri tamamla" */}
              {incompletionCompletingField && (
                <div className="mt-4 bg-white border-2 border-sky-500 rounded-lg p-4 max-w-xl shadow-lg space-y-3 animate-in fade-in-50">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-sky-900">
                      Eksik Veriyi Tamamla: Müşteri Referansı (VBKD-BSTKD)
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">Alan: BSTKD</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="font-semibold text-slate-700 w-36">
                      * Müşteri referansı:
                    </label>
                    <input
                      type="text"
                      value={tempCustomerRef}
                      onChange={(e) => setTempCustomerRef(e.target.value)}
                      className="w-48 bg-white border border-sky-500 rounded px-2.5 py-1 text-xs font-mono font-bold text-slate-900 focus:outline-none"
                      placeholder="32833"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const finalRef = tempCustomerRef.trim() || '32833';
                        setFormData((prev) => ({ ...prev, bstkd: finalRef }));
                        setIncompletionModalOpen(false);
                        setIncompletionCompletingField(false);
                        sapSound.playSuccess();
                        setStatusBar({
                          type: 'success',
                          code: 'V1 104',
                          message: `Belge tamamlandı: Müşteri referansı "${finalRef}" girildi. Şimdi Kaydet (Ctrl+S) butonuna basabilirsiniz.`,
                        });
                      }}
                      className="px-3.5 py-1 rounded bg-[#008FD3] hover:bg-sky-500 text-white font-bold text-xs shadow"
                    >
                      Tamamla & Belgeye Dön (Enter)
                    </button>
                  </div>
                </div>
              )}

              {/* Video Caption Overlay Banner matching IMG_2953 & IMG_2954 */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="bg-black/75 text-white px-4 py-2 rounded text-sm font-sans">
                  {!incompletionChecked
                    ? '1. Adım: Kalem sütununuzu seçip (☑ kutucuğu işaretleyip) üstteki "Verileri tamamla" butonuna basın (IMG_2953).'
                    : '2. Adım: Şimdi üst araç çubuğundaki "Verileri tamamla" butonuna tıklayın (IMG_2954).'}
                </div>
                <button
                  onClick={() => setIncompletionModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
