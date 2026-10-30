/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAP_EASY_ACCESS_TREE } from '../data/easyAccessData';
import { EasyAccessNode, SAPModuleId } from '../types/sap';
import { sapSound } from '../utils/audioEffects';
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Briefcase,
  Truck,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Sparkles,
  ShieldCheck,
  Search,
  Factory,
  Wrench,
  ShieldAlert,
  Users,
  Server,
  Package,
  Maximize2,
  Minimize2,
  Grid,
  Layers,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

export type UserCorporateRole =
  | 'sales_manager'
  | 'logistics_operator'
  | 'finance_controller'
  | 'production_planner'
  | 'quality_manager'
  | 'maintenance_lead'
  | 'warehouse_lead'
  | 'hr_specialist'
  | 'basis_admin';

interface SapEasyAccessMenuProps {
  onSelectTCode: (tCode: string) => void;
  activeTCode: string;
  userRole: UserCorporateRole;
  onSelectRole: (role: UserCorporateRole) => void;
  onOpenDocumentation?: () => void;
}

// Helper: Collect all folder IDs so the tree opens 100% expanded by default
const collectAllFolderIds = (nodes: EasyAccessNode[]): Record<string, boolean> => {
  const map: Record<string, boolean> = {};
  const traverse = (node: EasyAccessNode) => {
    if (node.isFolder) {
      map[node.id] = true;
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
  };
  nodes.forEach(traverse);
  return map;
};

export const SapEasyAccessMenu: React.FC<SapEasyAccessMenuProps> = ({
  onSelectTCode,
  activeTCode,
  userRole,
  onSelectRole,
  onOpenDocumentation,
}) => {
  const [commandInput, setCommandInput] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');
  // All folders open by default so all items are visible upon entering the page
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(() =>
    collectAllFolderIds(SAP_EASY_ACCESS_TREE)
  );

  const handleExpandAll = () => {
    sapSound.playClick();
    setExpandedFolders(collectAllFolderIds(SAP_EASY_ACCESS_TREE));
  };

  const handleCollapseAll = () => {
    sapSound.playClick();
    setExpandedFolders({ favorites: true, sap_menu: true });
  };

  const toggleFolder = (folderId: string) => {
    sapSound.playClick();
    setExpandedFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  };

  const handleLaunch = (tCode: string) => {
    sapSound.playEnter();
    onSelectTCode(tCode);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = commandInput.trim().toUpperCase();
    if (!clean) return;
    let parsed = clean;
    if (parsed.startsWith('/N') || parsed.startsWith('/O')) {
      parsed = parsed.substring(2);
    }
    if (parsed) {
      handleLaunch(parsed);
    }
  };

  // Role Missions Data (Tüm Kurumsal Departmanlar)
  const ROLE_CONFIGS: Record<UserCorporateRole, {
    roleTitle: string;
    company: string;
    badge: string;
    icon: any;
    accentColor: string;
    welcomeMsg: string;
    missionTitle: string;
    missionDescription: string;
    primaryTCode: string;
    quickFlow: string;
    subTasks: Array<{ label: string; done: boolean }>;
  }> = {
    sales_manager: {
      roleTitle: 'Satış Müdürü & SD Uzmanı',
      company: 'TR01 - Türkiye Sanayi ve Dağıtım A.Ş.',
      badge: 'Order-to-Cash (Siparişten Nakite)',
      icon: Briefcase,
      accentColor: 'text-sky-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Satış Departmanını yönetiyorsunuz.',
      missionTitle: '1. Görev: Koçak Lojistik A.Ş. Sipariş Emrini Sisteme Girin (VA01)',
      missionDescription:
        'Müşteri temsilcisinden gelen siparişi sisteme girip onaylamanız gerekiyor: Müşteri Kodu: 100021, Sipariş Türü: ZOR, Satış Dağıtım Alanı: 1000/10/00. 10 Adet Kontrol Modülü için 54.000 TL + %20 KDV tutarını işleyin.',
      primaryTCode: 'VA01',
      quickFlow: 'Sol ağaçtan "VA01 - Yarat" veya komut kutusuna /nVA01 yazıp Enter\'a basın.',
      subTasks: [
        { label: 'Sipariş Türünü ZOR olarak seçin', done: false },
        { label: 'Müşteri kodunu 100021 olarak girin', done: false },
        { label: 'GİB Fatura Senaryosunu Ticari Fatura kontrol edin', done: false },
        { label: 'Mavi disketle (Ctrl+S) siparişi kaydedin', done: false },
      ],
    },
    logistics_operator: {
      roleTitle: 'Lojistik & Depo Operasyon Sorumlusu (MM)',
      company: 'TR01 - Gebze Ana Lojistik ve Antrepo Merkezi',
      badge: 'Procure-to-Pay (Depo & Tedarik)',
      icon: Truck,
      accentColor: 'text-amber-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Depo ve rampa operasyonlarından siz sorumlusunuz.',
      missionTitle: '1. Görev: Rampa Kapısındaki Tır İçin Depo Mal Kabulü Yapın (MIGO)',
      missionDescription:
        'Ege Çelik A.Ş. firmasından 4500018901 no\'lu satın alma siparişine istinaden 50 adet vida geldi. Depoya sayarak kabul edin. ÇOK ÖNEMLİ: Alt paneldeki "Kalem Tamam (Item OK) ☑" kutucuğunu işaretlemeyi unutmayın!',
      primaryTCode: 'MIGO',
      quickFlow: 'Sol ağaçtan "MIGO - Mal Hareketi" veya komut kutusuna /nMIGO yazıp Enter\'a basın.',
      subTasks: [
        { label: 'Sol üstte A01 Mal Kabulü ve R01 SAS seçin', done: false },
        { label: 'SAS Numarasını (4500018901) girin', done: false },
        { label: 'Alt sekmedeki "Kalem Tamam ☑" kutusunu işaretleyin', done: false },
        { label: 'Kaydet butonuyla stokları 101 hareketiyle depoya alın', done: false },
      ],
    },
    finance_controller: {
      roleTitle: 'Mali İşler & Muhasebe Sorumlusu (FI/CO)',
      company: 'TR01 - Finansman ve Maliyet Muhasebesi Müdürlüğü',
      badge: 'Record-to-Report (Genel Muhasebe & TDHP)',
      icon: DollarSign,
      accentColor: 'text-emerald-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Yasal defterler ve TDHP kayıtları size emanet.',
      missionTitle: '1. Görev: Satıcı Danışmanlık Faturasını KDV Tevkifatıyla İşleyin (FB60)',
      missionDescription:
        'Yıldız Hukuk Müşavirlik firmasından gelen 24.000 TL\'lik faturayı işleyin: 320 Satıcı carisini alacaklandırıp, 770 Genel Yönetim Giderini borçlandırın. Vergiyi Hesapla kutucuğunu işaretleyip mizan dengesini yeşil bakiye lambasıyla teyit edin.',
      primaryTCode: 'FB60',
      quickFlow: 'Sol ağaçtan "FB60 - Fatura Girişi" veya komut kutusuna /nFB60 yazıp Enter\'a basın.',
      subTasks: [
        { label: 'Satıcı cari kodunu 320001 olarak girin', done: false },
        { label: 'Fatura tutarını 24.000 TL yazın', done: false },
        { label: 'Vergiyi Hesapla kutucuğunu işaretleyin (KDV %20)', done: false },
        { label: 'Karşı gider hesabı olarak 770020 seçip kaydedin', done: false },
      ],
    },
    production_planner: {
      roleTitle: 'Üretim Planlama & İmalat Müdürü (PP)',
      company: 'TR01 - Gebze Otomotiv & Elektronik Fabrikası',
      badge: 'Plan-to-Produce (İmalat & MRP)',
      icon: Factory,
      accentColor: 'text-orange-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Fabrika üretim bantları ve sipariş teyitleri size emanet.',
      missionTitle: '1. Görev: 50 Adet Akıllı Kontrol Modülü İçin Üretim Siparişi Açın (CO01)',
      missionDescription:
        'Montaj hattı için CO01 ile üretim siparişi başlatın. Ürün Reçetesi (BOM) ve İş Yeri (Work Center) bileşen rezervasyonlarını doğrulayıp serbest bırakın.',
      primaryTCode: 'CO01',
      quickFlow: 'Sol ağaçtan Üretim Siparişi > CO01 veya komut kutusuna /nCO01 yazıp Enter\'a basın.',
      subTasks: [
        { label: 'Mamul Kodu MAT-01 ve Tesis 1000 seçin', done: false },
        { label: 'Sipariş Türünü PP01 (Standart Üretim) seçin', done: false },
        { label: 'Üretim miktarını 50 Adet olarak girin', done: false },
        { label: 'Mavi disketle (Ctrl+S) üretim emrini kaydedin', done: false },
      ],
    },
    quality_manager: {
      roleTitle: 'Kalite Güvence & Muayene Şefi (QM)',
      company: 'TR01 - Giriş ve Proses Kalite Laboratuvarı',
      badge: 'Quality-Inspection (Kalite & UD)',
      icon: ShieldAlert,
      accentColor: 'text-rose-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Depoya giren ve üretimden çıkan tüm ürünlerin kalite onayı sizde.',
      missionTitle: '1. Görev: Açık Muayene Partisi İçin Kullanım Kararı Verin (QA32 / QA11)',
      missionDescription:
        'QA32 listesinden tedarikçi partisini bulun. Ölçüm ve laboratuvar sonuçlarını inceleyip Kullanım Kararını (UD - Usage Decision) "A - Kabul" olarak stoğu depoya serbest bırakın.',
      primaryTCode: 'QA32',
      quickFlow: 'Sol ağaçtan Kalite Yönetimi > QA32 veya komut kutusuna /nQA32 yazın.',
      subTasks: [
        { label: 'Tesis 1000 açık muayene partilerini listeleyin', done: false },
        { label: 'Partiyi seçip Kullanım Kararı (UD) butonuna basın', done: false },
        { label: 'Karar kodunu "A - Kabul (Serbest Stok)" yapın', done: false },
        { label: 'Kaydet butonuyla stoğu kalite kontrolünden çıkarın', done: false },
      ],
    },
    maintenance_lead: {
      roleTitle: 'Bakım Onarım & Tesis Mühendisi (PM)',
      company: 'TR01 - Mekanik & Elektrik Bakım Atölyesi',
      badge: 'Plant-Maintenance (Kestirimci & Düzeltici)',
      icon: Wrench,
      accentColor: 'text-yellow-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Fabrika makinelerinin sıfır duruşla çalışmasından sorumlusunuz.',
      missionTitle: '1. Görev: 2 No\'lu CNC Tezgahı İçin Acil Bakım İş Emri Açın (IW31)',
      missionDescription:
        'CNC-1002 tezgahı rulman aşırı ısınma uyarısı verdi. IW31 ile PM01 acil bakım siparişi açarak mekanik teknisyen ve yedek parça rezervasyonu yapın.',
      primaryTCode: 'IW31',
      quickFlow: 'Sol ağaçtan Bakım Onarım > IW31 veya komut kutusuna /nIW31 yazın.',
      subTasks: [
        { label: 'Sipariş Türünü PM01 (Düzeltici Bakım) seçin', done: false },
        { label: 'Ekipman kodunu CNC-1002 olarak girin', done: false },
        { label: 'Arıza tanımını ve bakım teknisyen grubunu yazın', done: false },
        { label: 'İş emrini kaydedip teknisyene sevk edin', done: false },
      ],
    },
    warehouse_lead: {
      roleTitle: 'EWM & Antrepo Yöneticisi (WM/EWM)',
      company: 'TR01 - Yüksek Raflı Akıllı Lojistik Deposu',
      badge: 'Extended-Warehouse (Raf Adresleme & Toplama)',
      icon: Package,
      accentColor: 'text-cyan-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! 40.000 paletlik yüksek raflı deponun lojistik operasyonunu yönetiyorsunuz.',
      missionTitle: '1. Görev: Giriş Rampasındaki Paleti Raf Adresine Taşıyın (LT01)',
      missionDescription:
        'MIGO ile depoya alınan 10 palet malzemeyi LT01 ile Giriş Rampa Bölgesinden (902) A-04-12 raf gözüne Transfer Siparişi (TO) ile aktarın.',
      primaryTCode: 'LT01',
      quickFlow: 'Sol ağaçtan Depo Yönetimi > LT01 veya komut kutusuna /nLT01 yazın.',
      subTasks: [
        { label: 'Depo Numarası 100 ve Hareket Türü 999 seçin', done: false },
        { label: 'Kaynak bölge: Rampa 902 / Hedef: Raf A-04-12', done: false },
        { label: 'Malzeme ve palet miktarını teyit edin', done: false },
        { label: 'Transfer siparişini onaylayarak tamamlayın', done: false },
      ],
    },
    hr_specialist: {
      roleTitle: 'İnsan Kaynakları & Bordro Uzmanı (HCM)',
      company: 'TR01 - İnsan ve Organizasyon Direktörlüğü',
      badge: 'Human-Capital (SGK, Özlük & Bordro)',
      icon: Users,
      accentColor: 'text-pink-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! Çalışanların işe alım, özlük, izin ve SGK süreçleri sizde.',
      missionTitle: '1. Görev: İşe Yeni Başlayan Personel İçin Özlük Dosyası Açın (PA30)',
      missionDescription:
        'PA30 ile personel özlük dosyası bakımını açın. Infotype 0002 (Kişisel Bilgiler & TC Kimlik) ve Infotype 0008 (Temel Ücret) alanlarını Türkiye SGK mevzuatına uygun doldurun.',
      primaryTCode: 'PA30',
      quickFlow: 'Sol ağaçtan İnsan Kaynakları > PA30 veya komut kutusuna /nPA30 yazın.',
      subTasks: [
        { label: 'Sicil numarasını (2026041) girin', done: false },
        { label: 'Infotype 0002 (Kişisel Bilgiler) sekmesini seçin', done: false },
        { label: 'Infotype 0008 ile brüt ücret tanımını girin', done: false },
        { label: 'SGK bildirgesiyle dosyayı onaylayın', done: false },
      ],
    },
    basis_admin: {
      roleTitle: 'SAP Sistem Yöneticisi & Basis Danışmanı',
      company: 'TR01 - Bilgi Teknolojileri & SAP Sistem Odası',
      badge: 'Basis & Security (Yetki, Rol & Mimari)',
      icon: Server,
      accentColor: 'text-violet-400',
      welcomeMsg: 'Şirketteki 1. Gününüz Hoş Geldiniz! SAP S/4HANA sunucuları, ABAP tabloları ve kullanıcı yetkileri sizin denetiminizde.',
      missionTitle: '1. Görev: Satış Müdürü İçin SAP Kullanıcısı ve Yetki Rolü Açın (SU01)',
      missionDescription:
        'SU01 ile "BERKE.ERGEN" kullanıcısını yaratın. Şirket adresi, başlangıç şifresi belirleyin ve Z_SD_SALES_TR yetki rolünü kullanıcıya atayın.',
      primaryTCode: 'SU01',
      quickFlow: 'Sol ağaçtan Sistem Araçları > SU01 veya komut kutusuna /nSU01 yazın.',
      subTasks: [
        { label: 'Kullanıcı adını BERKE.ERGEN olarak yazın', done: false },
        { label: 'Adres sekmesinde departman ve e-posta tanımlayın', done: false },
        { label: 'Roller sekmesine "Z_SD_SALES_TR" rolünü ekleyin', done: false },
        { label: 'Mavi disketle (Ctrl+S) kullanıcıyı kaydedin', done: false },
      ],
    },
  };

  const currentRoleConfig = ROLE_CONFIGS[userRole];

  // Render tree node recursively
  const renderTreeNode = (node: EasyAccessNode, level: number = 0) => {
    const isFolder = node.isFolder;
    const isExpanded = expandedFolders[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const isCurrentActive = node.tCode === activeTCode;

    if (
      filterQuery &&
      !isFolder &&
      !node.label.toLowerCase().includes(filterQuery.toLowerCase()) &&
      (!node.tCode || !node.tCode.toLowerCase().includes(filterQuery.toLowerCase()))
    ) {
      return null;
    }

    return (
      <div key={node.id} className="select-none font-sans">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.id);
            } else if (node.tCode) {
              handleLaunch(node.tCode);
            }
          }}
          style={{ paddingLeft: `${Math.max(8, level * 14)}px` }}
          className={`py-1 px-2 rounded-none flex items-center justify-between gap-1 text-[11px] cursor-pointer transition-colors ${
            isCurrentActive
              ? 'bg-[#316AC5] text-white font-bold'
              : isFolder
              ? 'text-slate-900 hover:bg-[#D4E2F4] font-medium'
              : 'text-slate-800 hover:bg-[#316AC5] hover:text-white font-mono'
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            {isFolder ? (
              <span className="text-amber-600 shrink-0">
                {isExpanded ? (
                  <div className="flex items-center gap-0.5">
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                    <FolderOpen className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
                  </div>
                ) : (
                  <div className="flex items-center gap-0.5">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <Folder className="w-3.5 h-3.5 fill-amber-400 text-amber-600" />
                  </div>
                )}
              </span>
            ) : (
              <div className="flex items-center gap-1 pl-3 shrink-0">
                <FileText className="w-3 h-3 text-sky-700" />
              </div>
            )}

            <span className="truncate">{node.label}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {node.turkeyTag && (
              <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1 py-0.2 rounded font-sans">
                TR
              </span>
            )}
            {node.tCode && (
              <span className="text-[10px] font-mono font-bold bg-[#DCE4EC] text-[#1E3F66] px-1 py-0.2 border border-[#A0A0A0]">
                {node.tCode}
              </span>
            )}
          </div>
        </div>

        {isFolder && isExpanded && hasChildren && (
          <div className="border-l border-dashed border-[#A0A0A0] ml-3 pl-1 space-y-0.5">
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#ECE9D8] text-slate-900 font-sans border-2 border-[#7192BF] shadow-2xl rounded-sm overflow-hidden text-xs select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. CLASSIC WINDOWS WINDOW TITLEBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-[#2B547E] via-[#356597] to-[#1E3F66] text-white px-2.5 py-1 flex items-center justify-between font-sans border-b border-[#1E3F66]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 rounded-sm flex items-center justify-center font-bold text-[9px] text-slate-950 shadow-inner">
            S
          </div>
          <span className="font-semibold text-xs tracking-tight">
            [PRD(1)/100] SAP Easy Access - Kullanıcı Menüsü / {currentRoleConfig.roleTitle}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#ECE9D8] text-slate-900 border border-[#7192BF] flex items-center justify-center text-[10px] font-bold">_</div>
          <div className="w-4 h-4 bg-[#ECE9D8] text-slate-900 border border-[#7192BF] flex items-center justify-center text-[10px] font-bold">□</div>
          <div className="w-4 h-4 bg-[#ECE9D8] hover:bg-red-600 hover:text-white text-slate-900 border border-[#7192BF] flex items-center justify-center text-[10px] font-bold">✕</div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CLASSIC MENU BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#ECE9D8] border-b border-[#A0A0A0] px-2 py-0.5 flex items-center gap-4 text-xs text-slate-800">
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Menü</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Düzenle</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Favoriler</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Ekler</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Sistem</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Yardım</span>

        <div className="ml-auto flex items-center gap-1.5 text-[11px]">
          <span className="font-bold text-[#1E3F66] hidden sm:inline">Kurumsal Görev Masası:</span>
          <select
            value={userRole}
            onChange={(e) => {
              sapSound.playClick();
              onSelectRole(e.target.value as UserCorporateRole);
            }}
            className="bg-white text-slate-900 border-2 border-[#7192BF] font-semibold text-xs px-2 py-0.5 shadow-inner focus:outline-none focus:border-[#316AC5]"
            title="Şirketteki İş Rolünüzü Seçin"
          >
            <option value="sales_manager">💼 Satış Müdürü & SD Uzmanı (VA01)</option>
            <option value="logistics_operator">🚚 Lojistik & Satınalma Sorumlusu (MM / MIGO)</option>
            <option value="finance_controller">💵 Mali İşler & Muhasebe (FI/CO / FB60)</option>
            <option value="production_planner">🏭 Üretim Planlama & Fabrika Müdürü (PP / CO01)</option>
            <option value="quality_manager">🛡️ Kalite Güvence & Laboratuvar (QM / QA32)</option>
            <option value="maintenance_lead">⚙️ Bakım Onarım & Tesis Şefi (PM / IW31)</option>
            <option value="warehouse_lead">📦 EWM & Antrepo Yöneticisi (WM / LT01)</option>
            <option value="hr_specialist">👥 İnsan Kaynakları & Bordro (HCM / PA30)</option>
            <option value="basis_admin">💻 SAP Sistem Yöneticisi & Basis (SU01 / SE11)</option>
          </select>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CLASSIC STANDARD TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-b from-[#F7F7F7] to-[#E0DFD8] border-b border-[#A0A0A0] px-2 py-1 flex items-center justify-between gap-2 shadow-inner">
        {/* Command field with Enter button */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-1">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="İşlem Kodu (Örn: /nVA01, /nMIGO)"
            className="w-48 bg-white text-slate-900 px-1.5 py-0.5 text-xs font-mono font-bold border-2 border-[#7F9DB9] shadow-inner uppercase focus:outline-none focus:border-[#316AC5]"
            title="Komut Satırı: İşlem kodunu girip yeşil onay dairesine basın."
          />
          <button
            type="submit"
            className="w-6 h-6 bg-gradient-to-b from-[#8BD26F] to-[#4EA932] hover:brightness-110 border border-[#2E6E1D] rounded-full flex items-center justify-center text-white font-bold shadow-sm"
            title="Giriş / Enter (✔)"
          >
            ✔
          </button>
        </form>

        <div className="flex items-center gap-1 text-[11px] text-slate-700">
          <span>Şirket Kodu: <strong>TR01</strong></span>
          <span className="text-slate-400">|</span>
          <span>Sistem: <strong>PRD (S/4HANA 2026)</strong></span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. SPLIT BODY: LEFT SAP MENU TREE (40%) + RIGHT WATERMARK & DESK (60%) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px] border-b border-[#808080]">
        
        {/* LEFT COLUMN: AUTHENTIC SAP EASY ACCESS TREE (5 COLS - ALL NODES EXPANDED BY DEFAULT) */}
        <div className="md:col-span-5 bg-white border-r-2 border-[#808080] flex flex-col p-2 space-y-2">
          <div className="flex items-center justify-between border-b border-[#A0A0A0] pb-1 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <span>SAP Menüsü & Klasör Ağacı</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 border border-emerald-300 px-1 py-0.2 rounded font-sans font-medium">
                Tüm Kalemler Açık
              </span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleExpandAll}
                className="px-1.5 py-0.5 text-[10px] bg-slate-100 hover:bg-[#316AC5] hover:text-white text-slate-700 border border-[#A0A0A0] flex items-center gap-0.5 font-sans transition-colors active:translate-y-px"
                title="Tüm Modül ve Menü Klasörlerini Aç (Tüm Kalemler)"
              >
                <Maximize2 className="w-2.5 h-2.5" />
                <span>Tümünü Aç</span>
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="px-1.5 py-0.5 text-[10px] bg-slate-100 hover:bg-[#316AC5] hover:text-white text-slate-700 border border-[#A0A0A0] flex items-center gap-0.5 font-sans transition-colors active:translate-y-px"
                title="Tüm Klasörleri Daralt"
              >
                <Minimize2 className="w-2.5 h-2.5" />
                <span>Daralt</span>
              </button>
            </div>
          </div>

          {/* Quick Filter */}
          <div className="relative">
            <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Menüde ara (VA01, MIGO, CO01, QA32, FB60)..."
              className="w-full bg-[#FAF9F5] border border-[#A0A0A0] pl-6 pr-2 py-0.5 text-xs text-slate-900 placeholder-slate-400 font-mono"
            />
          </div>

          {/* Scrollable Tree with all items visible */}
          <div className="flex-1 overflow-y-auto max-h-[640px] border border-[#D0D0D0] bg-[#FAF9F5] p-1.5 space-y-0.5">
            {SAP_EASY_ACCESS_TREE.map((node) => renderTreeNode(node))}
          </div>

          <div className="bg-[#ECE9D8] p-1.5 border border-[#A0A0A0] text-[10px] text-slate-700 flex items-center justify-between">
            <span>Standart Başlangıç Kodu: /ns000</span>
            <span className="font-bold text-[#1E3F66]">TR Kurumsal Sürüm (11 Modül)</span>
          </div>
        </div>

        {/* RIGHT COLUMN: WATERMARK WALLPAPER + ROLE ONBOARDING DESK + ALL 11 MODULES OVERVIEW */}
        <div className="md:col-span-7 relative flex flex-col justify-between overflow-y-auto max-h-[740px] bg-slate-900 scrollbar-thin">
          
          {/* Authentic SAP Corporate Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/src/assets/images/sap_watermark_bg_1793228359981.jpg"
              alt="SAP Workstation Corporate Background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/75 to-slate-950/85" />
          </div>

          {/* Foreground Role Desk Card */}
          <div className="relative z-10 p-5 space-y-5">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                  {currentRoleConfig.company}
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-700">
                {currentRoleConfig.badge}
              </span>
            </div>

            {/* Welcome Greeting */}
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>{currentRoleConfig.roleTitle}</span>
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentRoleConfig.welcomeMsg}
              </p>
            </div>

            {/* Mission Box */}
            <div className="bg-slate-950/90 border border-slate-700/80 rounded-xl p-4 shadow-xl space-y-3 backdrop-blur-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Günlük Operasyon Göreviniz</span>
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {currentRoleConfig.missionTitle}
                  </h3>
                </div>

                <button
                  onClick={() => handleLaunch(currentRoleConfig.primaryTCode)}
                  className="px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-lg text-xs shadow-lg shadow-sky-500/25 flex items-center gap-1.5 shrink-0 transition-transform active:scale-95"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Görevi Başlat ({currentRoleConfig.primaryTCode})</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentRoleConfig.missionDescription}
              </p>

              {/* Sub-tasks checklist */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Görev Kontrol Listesi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentRoleConfig.subTasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-slate-900/80 p-2 rounded border border-slate-800 text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="text-[11px] leading-tight">{task.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation tip */}
              <div className="bg-sky-950/40 border border-sky-800/50 p-2.5 rounded-lg flex items-center justify-between text-[11px] text-sky-200">
                <span className="font-mono">{currentRoleConfig.quickFlow}</span>
                <span className="font-bold">Enter ↵</span>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* TURKISH SAP KNOWLEDGE BASE & CONSULTING BANNER (basakvarlioglu & sapnotlarim) */}
            {/* ----------------------------------------------------------------- */}
            <div className="bg-gradient-to-r from-slate-950 via-sky-950/70 to-slate-950 border border-sky-500/40 rounded-xl p-4 shadow-lg space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>Türkçe SAP Danışman Doküman & Rehber Portalı</span>
                      <span className="text-[9px] font-mono bg-sky-950 text-sky-300 border border-sky-700 px-1.5 py-0.2 rounded">
                        GİB + TDHP
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-300">
                      Kaynak: <strong className="text-sky-300">basakvarlioglu.com</strong> (SD Satış Döngüsü, VK11, Kopya Kontrol) & <strong className="text-amber-300">sapnotlarim.com</strong> (FI/CO, TDHP, OMWB, VKOA, Tevkifat)
                    </p>
                  </div>
                </div>

                {onOpenDocumentation && (
                  <button
                    onClick={() => {
                      sapSound.playClick();
                      onOpenDocumentation();
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/30 flex items-center gap-1.5 transition-all"
                  >
                    <span>Doküman Merkezini Aç</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80 text-[11px]">
                <a
                  href="https://basakvarlioglu.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono hover:underline"
                >
                  <span>basakvarlioglu.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://sapnotlarim.com/sap-finansal-moduller-turkce-dokuman/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono hover:underline"
                >
                  <span>sapnotlarim.com/sap-finansal-moduller-turkce-dokuman/</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN&si=lYO6edjoy60nBo_j"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-mono hover:underline"
                >
                  <span>YouTube Temel Playlist Kursu</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* ALL 11 ENTERPRISE MODULES INTERACTIVE LAUNCHPAD (TÜM KALEMLER AÇIK) */}
            {/* ----------------------------------------------------------------- */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Tüm Kurumsal SAP Modülleri & Hızlı Giriş Masası
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Tek Tıkla Simülatöre Geçiş
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* 1. SD */}
                <div className="bg-slate-950/85 border border-sky-800/40 rounded-lg p-3 space-y-2 hover:border-sky-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sky-300 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                      <span>SAP SD (Satış & Dağıtım)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('sales_manager')}
                      className="text-[10px] text-sky-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('VA01')} className="px-2 py-0.5 bg-slate-800 hover:bg-sky-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      VA01 (Sipariş Yarat)
                    </button>
                    <button onClick={() => handleLaunch('VL01N')} className="px-2 py-0.5 bg-slate-800 hover:bg-sky-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      VL01N (Sevkiyat/PGI)
                    </button>
                    <button onClick={() => handleLaunch('VF01')} className="px-2 py-0.5 bg-slate-800 hover:bg-sky-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      VF01 (e-Fatura)
                    </button>
                    <button onClick={() => handleLaunch('VA03')} className="px-2 py-0.5 bg-slate-800 hover:bg-sky-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      VA03 (Akış F5)
                    </button>
                  </div>
                </div>

                {/* 2. MM */}
                <div className="bg-slate-950/85 border border-amber-800/40 rounded-lg p-3 space-y-2 hover:border-amber-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-amber-400" />
                      <span>SAP MM (Malzeme & Satınalma)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('logistics_operator')}
                      className="text-[10px] text-amber-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('MM01')} className="px-2 py-0.5 bg-slate-800 hover:bg-amber-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      MM01 (Malzeme Yarat)
                    </button>
                    <button onClick={() => handleLaunch('ME21N')} className="px-2 py-0.5 bg-slate-800 hover:bg-amber-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      ME21N (Satın Alma SAS)
                    </button>
                    <button onClick={() => handleLaunch('MIGO')} className="px-2 py-0.5 bg-slate-800 hover:bg-amber-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-amber-300">
                      MIGO (Mal Kabulü 101)
                    </button>
                    <button onClick={() => handleLaunch('MIRO')} className="px-2 py-0.5 bg-slate-800 hover:bg-amber-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      MIRO (Fatura Girişi)
                    </button>
                  </div>
                </div>

                {/* 3. PP */}
                <div className="bg-slate-950/85 border border-orange-800/40 rounded-lg p-3 space-y-2 hover:border-orange-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-300 flex items-center gap-1.5">
                      <Factory className="w-3.5 h-3.5 text-orange-400" />
                      <span>SAP PP (Üretim Planlama & İmalat)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('production_planner')}
                      className="text-[10px] text-orange-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('CO01')} className="px-2 py-0.5 bg-slate-800 hover:bg-orange-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-orange-300">
                      CO01 (Üretim Siparişi)
                    </button>
                    <button onClick={() => handleLaunch('MD04')} className="px-2 py-0.5 bg-slate-800 hover:bg-orange-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      MD04 (MRP Kokpiti)
                    </button>
                    <button onClick={() => handleLaunch('CS01')} className="px-2 py-0.5 bg-slate-800 hover:bg-orange-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      CS01 (Ürün Ağacı BOM)
                    </button>
                  </div>
                </div>

                {/* 4. QM */}
                <div className="bg-slate-950/85 border border-rose-800/40 rounded-lg p-3 space-y-2 hover:border-rose-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                      <span>SAP QM (Kalite Yönetimi)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('quality_manager')}
                      className="text-[10px] text-rose-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('QA32')} className="px-2 py-0.5 bg-slate-800 hover:bg-rose-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-rose-300">
                      QA32 (Parti İnceleme)
                    </button>
                    <button onClick={() => handleLaunch('QA11')} className="px-2 py-0.5 bg-slate-800 hover:bg-rose-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      QA11 (Kullanım Kararı UD)
                    </button>
                    <button onClick={() => handleLaunch('QE01')} className="px-2 py-0.5 bg-slate-800 hover:bg-rose-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      QE01 (Sonuç Girişi)
                    </button>
                  </div>
                </div>

                {/* 5. PM */}
                <div className="bg-slate-950/85 border border-yellow-800/40 rounded-lg p-3 space-y-2 hover:border-yellow-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-yellow-300 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-yellow-400" />
                      <span>SAP PM (Bakım Onarım & Tesis)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('maintenance_lead')}
                      className="text-[10px] text-yellow-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('IW31')} className="px-2 py-0.5 bg-slate-800 hover:bg-yellow-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-yellow-300">
                      IW31 (Bakım Siparişi)
                    </button>
                    <button onClick={() => handleLaunch('IW21')} className="px-2 py-0.5 bg-slate-800 hover:bg-yellow-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      IW21 (Arıza Bildirimi)
                    </button>
                    <button onClick={() => handleLaunch('IE01')} className="px-2 py-0.5 bg-slate-800 hover:bg-yellow-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      IE01 (Ekipman Kartı)
                    </button>
                  </div>
                </div>

                {/* 6. WM */}
                <div className="bg-slate-950/85 border border-cyan-800/40 rounded-lg p-3 space-y-2 hover:border-cyan-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SAP WM / EWM (Depo & Antrepo)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('warehouse_lead')}
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('LT01')} className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-cyan-300">
                      LT01 (Transfer Siparişi TO)
                    </button>
                    <button onClick={() => handleLaunch('/SCWM/MON')} className="px-2 py-0.5 bg-slate-800 hover:bg-cyan-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      /SCWM/MON (EWM Monitör)
                    </button>
                  </div>
                </div>

                {/* 7. FI */}
                <div className="bg-slate-950/85 border border-emerald-800/40 rounded-lg p-3 space-y-2 hover:border-emerald-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>SAP FI (Mali Muhasebe & TDHP)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('finance_controller')}
                      className="text-[10px] text-emerald-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('FB50')} className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-emerald-300">
                      FB50 (Mahsup Fişi)
                    </button>
                    <button onClick={() => handleLaunch('FB60')} className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-emerald-300">
                      FB60 (Satıcı Faturası 320)
                    </button>
                    <button onClick={() => handleLaunch('FB70')} className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      FB70 (Müşteri Faturası 120)
                    </button>
                    <button onClick={() => handleLaunch('F-53')} className="px-2 py-0.5 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      F-53 (Satıcı Ödemesi)
                    </button>
                  </div>
                </div>

                {/* 8. CO */}
                <div className="bg-slate-950/85 border border-teal-800/40 rounded-lg p-3 space-y-2 hover:border-teal-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                      <span>SAP CO (Maliyet Muhasebesi)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('finance_controller')}
                      className="text-[10px] text-teal-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('KS01')} className="px-2 py-0.5 bg-slate-800 hover:bg-teal-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      KS01 (Masraf Yeri Yarat)
                    </button>
                    <button onClick={() => handleLaunch('KSB1')} className="px-2 py-0.5 bg-slate-800 hover:bg-teal-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      KSB1 (Fiili Gider Raporu)
                    </button>
                  </div>
                </div>

                {/* 9. HCM */}
                <div className="bg-slate-950/85 border border-pink-800/40 rounded-lg p-3 space-y-2 hover:border-pink-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-pink-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-pink-400" />
                      <span>SAP HCM (İnsan Kaynakları)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('hr_specialist')}
                      className="text-[10px] text-pink-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('PA30')} className="px-2 py-0.5 bg-slate-800 hover:bg-pink-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-pink-300">
                      PA30 (Özlük Dosyası)
                    </button>
                    <button onClick={() => handleLaunch('PA40')} className="px-2 py-0.5 bg-slate-800 hover:bg-pink-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      PA40 (İşe Giriş Hareketi)
                    </button>
                  </div>
                </div>

                {/* 10. PS */}
                <div className="bg-slate-950/85 border border-indigo-800/40 rounded-lg p-3 space-y-2 hover:border-indigo-500/60 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>SAP PS (Proje Sistemi & Yatırım)</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">WBS Bütçe</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('CJ20N')} className="px-2 py-0.5 bg-slate-800 hover:bg-indigo-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-indigo-300">
                      CJ20N (Proje Panosu WBS)
                    </button>
                  </div>
                </div>

                {/* 11. BASIS & ABAP */}
                <div className="bg-slate-950/85 border border-violet-800/40 rounded-lg p-3 space-y-2 hover:border-violet-500/60 transition-colors md:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-violet-300 flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-violet-400" />
                      <span>SAP BASIS & ABAP (Sistem İdaresi & Veri Tabanı)</span>
                    </span>
                    <button
                      onClick={() => onSelectRole('basis_admin')}
                      className="text-[10px] text-violet-400 hover:underline"
                    >
                      Role Geç
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleLaunch('SU01')} className="px-2 py-0.5 bg-slate-800 hover:bg-violet-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-violet-300">
                      SU01 (Kullanıcı & Yetki Rolü)
                    </button>
                    <button onClick={() => handleLaunch('SE11')} className="px-2 py-0.5 bg-slate-800 hover:bg-violet-600 hover:text-white rounded text-[11px] font-mono border border-slate-700 font-bold text-violet-300">
                      SE11 (ABAP Veri Sözlüğü - VBAK/MARA)
                    </button>
                    <button onClick={() => handleLaunch('ST22')} className="px-2 py-0.5 bg-slate-800 hover:bg-violet-600 hover:text-white rounded text-[11px] font-mono border border-slate-700">
                      ST22 (Sistem Hata Logu)
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Watermark Tag */}
          <div className="relative z-10 px-5 py-2 text-[10px] text-slate-400 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-sm flex items-center justify-between">
            <span>SAP S/4HANA Enterprise Management 2026 — 11 Modül Canlı Ekosistem</span>
            <span>GİB e-Fatura / e-İrsaliye ve TDHP Doğrulanmış Sistem</span>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. CLASSIC SUNKEN STATUS BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#D8D6CC] border-t border-[#808080] px-2 py-0.5 flex items-center justify-between font-mono text-[11px] text-slate-800">
        <div className="flex-1 bg-white border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-2 py-0.5 flex items-center gap-2 truncate mr-2">
          <span className="w-3 h-3 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-[8px]">
            ✔
          </span>
          <span className="font-bold text-slate-900">[S000 001]</span>
          <span className="truncate">
            SAP Easy Access hazır. Lütfen sol menüden bir işlem seçin veya komut kutusuna T-Code girin.
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-[10px]">
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5">
            PRD(1)/100
          </div>
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5">
            TR01
          </div>
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5 font-bold">
            INS
          </div>
        </div>
      </div>

    </div>
  );
};
