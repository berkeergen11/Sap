/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAPModuleId } from '../types/sap';
import { sapSound } from '../utils/audioEffects';
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  FileText,
  Truck,
  DollarSign,
  Package,
  Layers,
  BarChart2,
  TrendingUp,
  Settings,
  Database,
  BookOpen,
  PieChart,
  ListTree,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
} from 'lucide-react';

interface FioriTile {
  id: string;
  title: string;
  subtitle?: string;
  tCode: string;
  module: SAPModuleId;
  iconType: 'document' | 'truck' | 'dollar' | 'cube' | 'chart_bars' | 'kpi_number' | 'chart_line' | 'settings' | 'user' | 'list';
  badge?: string;
  kpiData?: {
    type: 'bars' | 'big_number' | 'status';
    bigNumber?: string;
    subLabel?: string;
    bars?: Array<{ label: string; value: string; pct: number }>;
  };
}

interface SapFioriLaunchpadProps {
  onSelectTCode: (tCode: string) => void;
  onOpenClassicTree: () => void;
  onOpenScreenshotGuide: (screenshotId?: string) => void;
  onOpenFirstDayGuide?: () => void;
  onOpenPerformanceDashboard?: () => void;
  onOpenTurkeyDocs: () => void;
}

export const SapFioriLaunchpad: React.FC<SapFioriLaunchpadProps> = ({
  onSelectTCode,
  onOpenClassicTree,
  onOpenScreenshotGuide,
  onOpenFirstDayGuide,
  onOpenPerformanceDashboard,
  onOpenTurkeyDocs,
}) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  // Exact 26 Tiles from Screenshot IMG_3041_53522ce6.png (Ana sayfam / Satış & Lojistik SD)
  const homeTiles: FioriTile[] = [
    // Row 1
    {
      id: 'va01',
      title: 'Satış siparişleri oluştur',
      tCode: 'VA01',
      module: 'SD',
      iconType: 'document',
      subtitle: 'VA01',
    },
    {
      id: 'va02',
      title: 'Satış siparişlerini değiştir',
      tCode: 'VA02',
      module: 'SD',
      iconType: 'document',
      subtitle: 'VA02',
    },
    {
      id: 'va03',
      title: 'Satış siparişlerini görüntüle',
      tCode: 'VA03',
      module: 'SD',
      iconType: 'document',
      subtitle: 'VA03',
    },
    {
      id: 'vl01n',
      title: 'Teslimat oluştur',
      subtitle: 'Sipariş referansı ile',
      tCode: 'VL01N',
      module: 'SD',
      iconType: 'truck',
    },
    {
      id: 'vl02n',
      title: 'Gönderilen teslimatı değiştir',
      tCode: 'VL02N',
      module: 'SD',
      iconType: 'truck',
    },
    {
      id: 'vl03n',
      title: 'Gönderilen teslimatı görüntüle',
      tCode: 'VL03N',
      module: 'SD',
      iconType: 'truck',
    },
    {
      id: 'vf01',
      title: 'Faturalama belgeleri oluştur',
      tCode: 'VF01',
      module: 'SD',
      iconType: 'dollar',
      subtitle: 'VF01',
    },

    // Row 2
    {
      id: 'vf02',
      title: 'Faturalama belgelerini değiştir',
      tCode: 'VF02',
      module: 'SD',
      iconType: 'dollar',
      subtitle: 'VF02',
    },
    {
      id: 'vf03',
      title: 'Faturalama belgelerini görüntüle',
      tCode: 'VF03',
      module: 'SD',
      iconType: 'dollar',
      subtitle: 'VF03',
    },
    {
      id: 'vl10a',
      title: 'Teslimata hazır satış siparişlerim',
      subtitle: 'Kullanıcıya özgü ölç...',
      tCode: 'VL10A',
      module: 'SD',
      iconType: 'truck',
    },
    {
      id: 'vf04',
      title: 'Faturalama belgeleri oluştur',
      subtitle: 'VF04 (İş Listesi)',
      tCode: 'VF04',
      module: 'SD',
      iconType: 'dollar',
      badge: 'Videodaki Odak',
    },
    {
      id: 'vl09',
      title: 'Mal çıkışını ters kaydet',
      subtitle: 'Teslimat',
      tCode: 'VL09',
      module: 'SD',
      iconType: 'truck',
    },
    {
      id: 'vk11',
      title: 'Malzeme fiyatlarını belirle',
      subtitle: 'Satış',
      tCode: 'VK11',
      module: 'SD',
      iconType: 'dollar',
    },
    {
      id: 'vk12',
      title: 'Fiyatları yönet',
      subtitle: 'Satış (Değiştir)',
      tCode: 'VK12',
      module: 'SD',
      iconType: 'dollar',
    },

    // Row 3
    {
      id: 'vk13',
      title: 'Fiyatları yönet',
      subtitle: 'Satış (Görüntüle)',
      tCode: 'VK13',
      module: 'SD',
      iconType: 'dollar',
    },
    {
      id: 'mm02',
      title: 'Malzemeyi değiştir',
      tCode: 'MM02',
      module: 'MM',
      iconType: 'cube',
      subtitle: 'MM02',
    },
    {
      id: 'kpi_analyze',
      title: 'Satış siparişi gerçekleştirme',
      subtitle: 'Sorunları analiz et',
      tCode: 'VA05',
      module: 'SD',
      iconType: 'chart_bars',
      kpiData: {
        type: 'bars',
        bars: [
          { label: 'Domestic US Cu...', value: '9,56 B', pct: 85 },
          { label: 'CC Sportworld', value: '3,36 B', pct: 45 },
          { label: 'Fahrrad Großha...', value: '2,88 B', pct: 35 },
        ],
      },
    },
    {
      id: 'kpi_solve',
      title: 'Satış siparişi gerçekleştirme',
      subtitle: 'Sorunları çöz',
      tCode: 'VA02',
      module: 'SD',
      iconType: 'kpi_number',
      kpiData: {
        type: 'big_number',
        bigNumber: '26,0 B',
        subLabel: 'Açık Sipariş Kalemi',
      },
    },
    {
      id: 'dual_sales_docs',
      title: 'Çift satış belgelerini yönet',
      tCode: 'VA03',
      module: 'SD',
      iconType: 'document',
      subtitle: 'SD Doğrulama',
    },
    {
      id: 'customer_overview',
      title: 'Müşterilere genel bakış',
      tCode: 'XD03',
      module: 'SD',
      iconType: 'user',
      subtitle: 'BP / XD03',
    },
    {
      id: 'delivery_perf',
      title: 'Teslimat performansını analiz et',
      subtitle: 'Planlandığı gibi sevk...',
      tCode: 'VL06O',
      module: 'SD',
      iconType: 'chart_line',
    },

    // Row 4
    {
      id: 'manage_billing',
      title: 'Faturalama belgelerini yönet',
      tCode: 'VF03',
      module: 'SD',
      iconType: 'dollar',
      subtitle: 'Fatura Takip',
    },
    {
      id: 'va05',
      title: 'Satış siparişlerini listele',
      tCode: 'VA05',
      module: 'SD',
      iconType: 'list',
      subtitle: 'VA05',
    },
    {
      id: 'vl06o',
      title: 'Teslimat izlemem',
      tCode: 'VL06O',
      module: 'SD',
      iconType: 'truck',
      subtitle: 'VL06O',
    },
    {
      id: 'v01',
      title: 'Tamamlanmamış satış belgelerini listele',
      tCode: 'V.01',
      module: 'SD',
      iconType: 'list',
      subtitle: 'V.01',
    },
    {
      id: 'v21',
      title: 'Toplu çalıştırma günlüklerim',
      tCode: 'V.21',
      module: 'SD',
      iconType: 'list',
      subtitle: 'V.21',
    },
  ];

  // Category Tabs mapping - All Enterprise Department Spaces (S/4HANA Spaces & Pages)
  const categoryTabs = [
    { id: 'home', label: '📦 Satış & Sevkiyat (SD)', badge: '26' },
    { id: 'mm_space', label: '🏭 Satınalma & Depo (MM/WM)', badge: '10' },
    { id: 'fi_space', label: '💰 Mali İşler & Finans (FI/CO)', badge: '10' },
    { id: 'pp_space', label: '⚙️ Üretim & Kalite (PP/QM)', badge: '7' },
    { id: 'pm_space', label: '🔧 Tesis Bakım (PM)', badge: '4' },
    { id: 'basis_space', label: '👥 İK & Sistem (HCM/BASIS)', badge: '5' },
    { id: 'settings', label: 'Geçerli ayarlar' },
    { id: 'master_data', label: 'Ana veriler' },
    { id: 'journal', label: 'Yevmiye kayıtları' },
    { id: 'asset_periodic', label: 'Duran varlık dönemsel aktiviteler' },
    { id: 'asset_reports', label: 'Duran varlık raporlama' },
  ];

  // MM & WM Department Space Tiles
  const mmTiles: FioriTile[] = [
    { id: 'me21n_t', title: 'Satın Alma Siparişi Yarat (SAS)', subtitle: 'Tedarikçiye Sipariş Verme', tCode: 'ME21N', module: 'MM', iconType: 'document', badge: 'Tedarik' },
    { id: 'migo_t', title: 'Mal Kabulü Girişi (Hareket 101)', subtitle: 'Depoya Fiziki Mal Girişi', tCode: 'MIGO', module: 'MM', iconType: 'truck', badge: 'Stok Girişi' },
    { id: 'miro_t', title: 'Gelen Satıcı Faturası Doğrulama', subtitle: 'Lojistik Fatura Kontrolü', tCode: 'MIRO', module: 'MM', iconType: 'dollar', badge: 'Ödeme Öncesi' },
    { id: 'mm01_t2', title: 'Yeni Malzeme Kartı Açılışı', subtitle: 'ROH / FERT / HAWA Kartları', tCode: 'MM01', module: 'MM', iconType: 'cube' },
    { id: 'mm02_t2', title: 'Malzemeyi Değiştir & Güncelle', subtitle: 'Depo & Satış Parametreleri', tCode: 'MM02', module: 'MM', iconType: 'cube' },
    { id: 'mm03_t2', title: 'Malzeme Ana Verisini Görüntüle', subtitle: 'Stok ve Muhasebe Sınıfı', tCode: 'MM03', module: 'MM', iconType: 'cube' },
    { id: 'me51n_t', title: 'Satın Alma Talebi Yarat (SAT)', subtitle: 'Departman İç İstek Formu', tCode: 'ME51N', module: 'MM', iconType: 'document' },
    { id: 'mb52_t', title: 'Depo Stok Matrisi & Bakiye', subtitle: 'Serbest / Bloke Stok Raporu', tCode: 'MB52', module: 'MM', iconType: 'chart_bars' },
    { id: 'lt01_t', title: 'Depo İçi Transfer Siparişi (TO)', subtitle: 'Raf & Adres Yönetimi', tCode: 'LT01', module: 'WM', iconType: 'truck' },
    { id: 'ewm_t', title: 'Gelişmiş Depo Monitörü (EWM)', subtitle: 'Rampa & Palet Takip Kokpiti', tCode: '/SCWM/MON', module: 'WM', iconType: 'chart_line' },
  ];

  // FI & CO Department Space Tiles
  const fiTiles: FioriTile[] = [
    { id: 'fb50_f', title: 'Genel Yevmiye Kaydı Oluştur', subtitle: 'Mahsup Fişi (Tekdüzen TDHP)', tCode: 'FB50', module: 'FI', iconType: 'dollar', badge: 'TDHP' },
    { id: 'fb60_f', title: 'Satıcı Faturası Girişi (AP)', subtitle: 'Gelen Masraf & Tevkifat', tCode: 'FB60', module: 'FI', iconType: 'dollar', badge: 'KDV Tevkifat' },
    { id: 'fb70_f', title: 'Müşteri Faturası Girişi (AR)', subtitle: 'Doğrudan Alacak Dekontu', tCode: 'FB70', module: 'FI', iconType: 'dollar' },
    { id: 'f110_f', title: 'Otomatik Ödeme Programı (APP)', subtitle: 'Banka Talimatı & F110', tCode: 'F-53', module: 'FI', iconType: 'dollar', badge: '4 Aşama' },
    { id: 'f53_f', title: 'Çıkan Ödeme Kaydı (EFT/Havale)', subtitle: 'Banka 102 & 320 Dengeleme', tCode: 'F-53', module: 'FI', iconType: 'dollar' },
    { id: 'fs00_f', title: 'Defteri Kebir Ana Hesabı Yönet', subtitle: 'Hesap Planı Bakımı', tCode: 'FB50', module: 'FI', iconType: 'settings' },
    { id: 'ks01_f', title: 'Masraf Yeri Tanımla (Cost Center)', subtitle: 'Departman Gider Merkezi', tCode: 'KS01', module: 'CO', iconType: 'user' },
    { id: 'ksb1_f', title: 'Masraf Yeri Fiili Kalem Raporu', subtitle: '770/760 Gider Dökümü', tCode: 'KSB1', module: 'CO', iconType: 'chart_bars' },
    { id: 'aw01n_f', title: 'Duran Varlık Gezgini (Asset)', subtitle: 'Amortisman Cetveli ve Değerler', tCode: 'AW01N', module: 'FI', iconType: 'chart_line' },
    { id: 'afab_f', title: 'Amortisman Çalıştırma Programı', subtitle: 'Aylık Defterikebir Kapanışı', tCode: 'FB50', module: 'FI', iconType: 'settings' },
  ];

  // PP & QM Department Space Tiles
  const ppTiles: FioriTile[] = [
    { id: 'co01_p', title: 'Üretim Siparişi Yarat (İmalat)', subtitle: 'Fabrika Üretim Emri Açma', tCode: 'CO01', module: 'PP', iconType: 'cube', badge: 'Fabrika' },
    { id: 'co11n_p', title: 'Üretim Operasyon Teyidi', subtitle: 'Fiili Süre ve Hurda Bildirimi', tCode: 'CO11N', module: 'PP', iconType: 'chart_line' },
    { id: 'cs01_p', title: 'Ürün Ağacı (BOM) Tanımla', subtitle: 'Mamul Reçete Malzemeleri', tCode: 'CS01', module: 'PP', iconType: 'list' },
    { id: 'cr01_p', title: 'İş Yeri ve Tezgah Yarat', subtitle: 'Kapasite ve Rota Merkezi', tCode: 'CR01', module: 'PP', iconType: 'settings' },
    { id: 'md04_p', title: 'Stok / Gereksinim Listesi (MRP)', subtitle: 'Dinamik İhtiyaç Planlama', tCode: 'MD04', module: 'PP', iconType: 'chart_bars', badge: 'MRP' },
    { id: 'qa32_p', title: 'Kalite Muayene Partileri', subtitle: 'Giriş ve Üretim Kalite Testi', tCode: 'QA32', module: 'QM', iconType: 'document', badge: 'Laboratuvar' },
    { id: 'qa11_p', title: 'Kalite Kullanım Kararı (UD)', subtitle: 'Stok Serbest Bırak / İade', tCode: 'QA11', module: 'QM', iconType: 'settings' },
  ];

  // PM Department Space Tiles
  const pmTiles: FioriTile[] = [
    { id: 'iw31_m', title: 'Bakım ve Onarım İş Emri Yarat', subtitle: 'Arıza ve Periyodik Bakım', tCode: 'IW31', module: 'PM', iconType: 'settings', badge: 'Teknik Servis' },
    { id: 'iw21_m', title: 'Bakım Bildirimi Yarat', subtitle: 'Makine Arıza İhbarı', tCode: 'IW21', module: 'PM', iconType: 'document' },
    { id: 'iw51_m', title: 'Müşteri Servis Talebi Yarat', subtitle: 'Saha Garanti & Montaj', tCode: 'IW51', module: 'PM', iconType: 'truck' },
    { id: 'pm_eq', title: 'Ekipman ve Makine Sicil Kartı', subtitle: 'CNC ve Motor Tanımları', tCode: 'IW31', module: 'PM', iconType: 'cube' },
  ];

  // HCM & BASIS Space Tiles
  const basisTiles: FioriTile[] = [
    { id: 'sm50_b', title: 'İş Süreçleri Monitörü (SM50 / SM66)', subtitle: 'Canlı Work Process & CPU Analizi', tCode: 'SM50', module: 'BASIS', iconType: 'chart_bars', badge: 'Canlı' },
    { id: 'st02_b', title: 'Tampon ve Bellek Akordu (ST02)', subtitle: 'Buffer Hit Ratio & Swaps Analizi', tCode: 'ST02', module: 'BASIS', iconType: 'kpi_number', badge: 'Hit: %98.7' },
    { id: 'st03n_b', title: 'İş Yükü ve Yanıt Süresi (ST03N)', subtitle: 'Avg Response Time: 412ms', tCode: 'ST03N', module: 'BASIS', iconType: 'chart_line', badge: 'Throughput' },
    { id: 'st06_b', title: 'İşletim Sistemi ve Donanım (ST06)', subtitle: 'Sunucu CPU: %36, RAM, Disk I/O', tCode: 'ST06', module: 'BASIS', iconType: 'settings', badge: 'Donanım' },
    { id: 'pa40_b', title: 'Personel İşe Giriş & Terfi Hareketi', subtitle: 'PA40 SGK e-Bildirge Süreci', tCode: 'PA40', module: 'HCM', iconType: 'user', badge: 'İK' },
    { id: 'pa30_b', title: 'Personel Bilgi Tipleri Bakımı', subtitle: 'Maaş, Adres ve İzin Verileri', tCode: 'PA40', module: 'HCM', iconType: 'document' },
    { id: 'su01_b', title: 'Kullanıcı Yönetimi ve Rol Atama', subtitle: 'SAP Giriş Şifresi ve Yetkiler', tCode: 'SU01', module: 'BASIS', iconType: 'user', badge: 'Yetki' },
    { id: 'se11_b', title: 'ABAP Veri Sözlüğü (Tablo İnceleme)', subtitle: 'BKPF, BSEG, VBAK, EKKO', tCode: 'SE11', module: 'BASIS', iconType: 'list', badge: 'Veritabanı' },
    { id: 'st22_b', title: 'ABAP Dump ve Sistem Hata Analizi', subtitle: 'Çalışma Zamanı Hataları', tCode: 'ST22', module: 'BASIS', iconType: 'chart_line' },
  ];

  // Extra Tiles for other tabs
  const settingsTiles: FioriTile[] = [
    { id: 'su3', title: 'Kullanıcı Parametrelerini Tanımla', subtitle: 'Varsayılan Şirket: TR01', tCode: 'SU01', module: 'BASIS', iconType: 'settings' },
    { id: 'ob08', title: 'Döviz Kurlarını Güncelle', subtitle: 'TCMB Efektif Satış Kurları', tCode: 'FB50', module: 'FI', iconType: 'dollar' },
    { id: 'ob52', title: 'Mali Dönemleri Aç/Kapa', subtitle: 'FI Dönem Kontrolü', tCode: 'FB60', module: 'FI', iconType: 'settings' },
    { id: 'omwb', title: 'MM-FI Otomatik Hesap Tayini', subtitle: 'OBYC Entegrasyonu (BSX/WRX)', tCode: 'MIGO', module: 'MM', iconType: 'settings' },
  ];

  const masterDataTiles: FioriTile[] = [
    { id: 'bp_cust', title: 'İş Ortağı / Müşteri Yarat', subtitle: 'BP / XD01 (Koçak Lojistik)', tCode: 'VA01', module: 'SD', iconType: 'user' },
    { id: 'mm01_t', title: 'Malzeme Ana Verisi Oluştur', subtitle: 'MM01 (Endüstriyel Motor)', tCode: 'MM01', module: 'MM', iconType: 'cube' },
    { id: 'fs00_t', title: 'Defteri Kebir Ana Hesabı Yönet', subtitle: 'FS00 (TDHP Tekdüzen)', tCode: 'FB50', module: 'FI', iconType: 'dollar' },
    { id: 'cs01_t', title: 'Ürün Ağacı (BOM) Yarat', subtitle: 'CS01 (Montaj Malzemeleri)', tCode: 'CS01', module: 'PP', iconType: 'cube' },
    { id: 'ks01_t', title: 'Masraf Yeri Tanımla', subtitle: 'KS01 (Genel Üretim Gideri)', tCode: 'KS01', module: 'CO', iconType: 'dollar' },
  ];

  const journalTiles: FioriTile[] = [
    { id: 'fb50_t', title: 'Genel Yevmiye Kaydı Oluştur', subtitle: 'FB50 Mahsup Fişi', tCode: 'FB50', module: 'FI', iconType: 'dollar', badge: 'TDHP' },
    { id: 'fb60_t', title: 'Satıcı Faturası Girişi', subtitle: 'FB60 Gelen İrsaliyeli Fatura', tCode: 'FB60', module: 'FI', iconType: 'dollar', badge: 'Tevkifat' },
    { id: 'fb70_t', title: 'Müşteri Faturası Girişi', subtitle: 'FB70 Doğrudan Satış', tCode: 'FB70', module: 'FI', iconType: 'dollar' },
    { id: 'f110_t', title: 'Otomatik Ödeme Programı', subtitle: 'F110 4 Aşamalı Ödeme', tCode: 'F-53', module: 'FI', iconType: 'dollar' },
    { id: 'fbl3n_t', title: 'Defteri Kebir Kalemlerini İncele', subtitle: 'FBL3N Hesap Ekstresi', tCode: 'FB50', module: 'FI', iconType: 'list' },
  ];

  const assetPeriodicTiles: FioriTile[] = [
    { id: 'afab_t', title: 'Amortisman Çalıştırma', subtitle: 'AFAB Aylık/Yıllık Amortisman', tCode: 'FB50', module: 'FI', iconType: 'dollar' },
    { id: 'ajrw_t', title: 'Mali Yıl Değişimi', subtitle: 'AJRW Duran Varlık Açılış', tCode: 'FB50', module: 'FI', iconType: 'settings' },
    { id: 'ajab_t', title: 'Yıl Sonu Kapanışı', subtitle: 'AJAB Duran Varlık Kapatma', tCode: 'FB50', module: 'FI', iconType: 'settings' },
    { id: 'f90_t', title: 'Satıcı Referansıyla Varlık Alımı', subtitle: 'F-90 Duran Varlık Aktifleştirme', tCode: 'FB60', module: 'FI', iconType: 'dollar' },
  ];

  const assetReportsTiles: FioriTile[] = [
    { id: 'aw01n_t', title: 'Duran Varlık Gezgini', subtitle: 'AW01N Amortisman Değerleri', tCode: 'AW01N', module: 'FI', iconType: 'chart_line' },
    { id: 'salr_t', title: 'Duran Varlık Cetveli', subtitle: 'S_ALR_87011990 Resmi Rapor', tCode: 'FB50', module: 'FI', iconType: 'list' },
    { id: 'sim_t', title: 'Amortisman Simülasyonu', subtitle: 'Gelecek Yıllar Maliyet Tahmini', tCode: 'KSB1', module: 'CO', iconType: 'chart_bars' },
  ];

  // Get active tiles list
  const getActiveTiles = (): FioriTile[] => {
    switch (activeTab) {
      case 'mm_space':
        return mmTiles;
      case 'fi_space':
        return fiTiles;
      case 'pp_space':
        return ppTiles;
      case 'pm_space':
        return pmTiles;
      case 'basis_space':
        return basisTiles;
      case 'settings':
        return settingsTiles;
      case 'master_data':
        return masterDataTiles;
      case 'journal':
        return journalTiles;
      case 'asset_periodic':
        return assetPeriodicTiles;
      case 'asset_reports':
        return assetReportsTiles;
      default:
        return homeTiles;
    }
  };

  const filteredTiles = getActiveTiles().filter((tile) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      tile.title.toLowerCase().includes(q) ||
      (tile.subtitle && tile.subtitle.toLowerCase().includes(q)) ||
      tile.tCode.toLowerCase().includes(q)
    );
  });

  const handleTileClick = (tile: FioriTile) => {
    sapSound.playEnter();
    onSelectTCode(tile.tCode);
  };

  return (
    <div className="w-full bg-[#1c2d42] min-h-[820px] rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col font-sans select-none">
      
      {/* 1. Authentic Top Fiori Shell Bar (Belize / Horizon Shell) */}
      <div className="bg-gradient-to-r from-[#172534] via-[#1f3347] to-[#172534] border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-4 text-white z-30">
        
        {/* Left Side: Back Arrow, SAP Logo, "Başlangıç sayfası ▾" Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenClassicTree}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-white/80 hover:text-white"
            title="Klasik SAP Easy Access Ağaç Menüsüne Geç (/n)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* SAP Brand Mark */}
          <div className="w-9 h-7 rounded bg-gradient-to-b from-[#008FD3] to-[#0062A3] flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
            SAP
          </div>

          {/* View Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded hover:bg-white/10 transition-colors text-sm font-semibold tracking-tight text-white/95"
            >
              <span>Başlangıç sayfası</span>
              <ChevronDown className="w-4 h-4 text-white/70" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-[#233549] border border-white/15 rounded-lg shadow-2xl py-1.5 text-xs text-white z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-sky-400 tracking-wider border-b border-white/10">
                  Görünüm ve Menü Seçimi
                </div>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center justify-between font-medium text-white"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>Fiori Başlangıç Sayfası</span>
                  </span>
                  <span className="text-[10px] text-sky-300">Aktif</span>
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenClassicTree();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center justify-between text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <ListTree className="w-3.5 h-3.5 text-amber-400" />
                    <span>Klasik SAP Easy Access Ağacı</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-300">/n</span>
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenTurkeyDocs();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center justify-between text-slate-300 border-t border-white/10 mt-1"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Türkiye Danışman Notları & Bilgi Bankası</span>
                  </span>
                </button>
                {onOpenFirstDayGuide && (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenFirstDayGuide();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center justify-between text-sky-300 border-t border-white/10"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                      <span>Yeni SAP'de İlk Günüm? (Rehber)</span>
                    </span>
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1 rounded">Önemli</span>
                  </button>
                )}
                {onOpenPerformanceDashboard && (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenPerformanceDashboard();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-white/10 flex items-center justify-between text-emerald-300 border-t border-white/10"
                  >
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sistem Performans Kokpiti (SM50/ST02)</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1 rounded">Canlı</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center / Right Side: Search, Real Screenshot Guide, First Day Guide, Performance, Notification Bell, User Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search on Launchpad */}
          <div className="relative hidden xl:block w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Uygulama veya T-Code ara..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 focus:border-sky-400 rounded-full pl-8 pr-3 py-1 text-xs text-white placeholder-white/40 focus:outline-none transition-all"
            />
          </div>

          {/* System Performance Dashboard Button */}
          {onOpenPerformanceDashboard && (
            <button
              onClick={() => {
                sapSound.playEnter();
                onOpenPerformanceDashboard();
              }}
              className="px-3 py-1 rounded-full bg-emerald-500/25 hover:bg-emerald-500/40 border border-emerald-400/50 text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Throughput, CPU Kullanımı ve BASIS İşlemleri Monitörü (SM50, ST02, ST03N)"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span className="hidden sm:inline">Sistem Performansı</span>
              <span className="sm:hidden">SM50</span>
            </button>
          )}

          {/* First Day Orientation Guide Button */}
          {onOpenFirstDayGuide && (
            <button
              onClick={() => {
                sapSound.playEnter();
                onOpenFirstDayGuide();
              }}
              className="px-3 py-1 rounded-full bg-sky-500/25 hover:bg-sky-500/40 border border-sky-400/50 text-sky-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Yeni bir şirkette veya projede SAP aldığınızda karşınıza çıkacak gerçek ekranlar ve süreçler rehberi"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-300" />
              <span className="hidden sm:inline">Yeni SAP'de İlk Günüm?</span>
              <span className="sm:hidden">İlk Gün</span>
            </button>
          )}

          {/* Real Video Screenshot Gallery Button */}
          <button
            onClick={() => onOpenScreenshotGuide()}
            className="px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Videodaki 13 orijinal ekran görüntüsünü incele"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden md:inline">13 Video Ekranı</span>
            <span className="md:hidden">Görseller</span>
          </button>

          {/* Classic Tree Shortcut Button */}
          <button
            onClick={onOpenClassicTree}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/10"
            title="Klasik Ağaç Menüsüne Geçiş"
          >
            <ListTree className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Klasik Ağaç</span>
          </button>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-[#172534]" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#233549] border border-white/15 rounded-lg shadow-2xl p-3 text-xs text-white z-50">
                <div className="font-bold text-sky-300 border-b border-white/10 pb-2 mb-2 flex items-center justify-between">
                  <span>SAP S/4HANA Bildirimleri</span>
                  <span className="text-[10px] text-white/60">3 Yeni</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <p className="font-semibold text-emerald-300">Teslimat 80040620 Hazır</p>
                    <p className="text-[11px] text-white/70">TR1923 Türkiye Şube için mal çıkışı (PGI) kaydedildi.</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <p className="font-semibold text-sky-300">Fatura 90017855 Kesildi</p>
                    <p className="text-[11px] text-white/70">VF01 üzerinden 3.050,00 EUR tutarlı F2 fatura oluşturuldu.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar (B - Berke / Satış Müdürü) */}
          <div
            className="w-8 h-8 rounded-full bg-[#008FD3] text-white font-bold flex items-center justify-center text-xs shadow-md ring-2 ring-white/20"
            title="Kullanıcı: B (Berke Ergen - Satış & Operasyon Sorumlusu)"
          >
            B
          </div>
        </div>
      </div>

      {/* 2. Category Tab Navigation (Directly from Screenshots) */}
      <div className="bg-[#21354b] px-4 border-b border-white/10 flex items-center gap-1 overflow-x-auto scrollbar-none">
        {categoryTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                sapSound.playTab();
              }}
              className={`px-3.5 py-3 text-xs font-semibold whitespace-nowrap transition-all relative border-b-2 flex items-center gap-1.5 ${
                isActive
                  ? 'border-sky-400 text-white font-bold'
                  : 'border-transparent text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
              {tab.id === 'home' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-500/30 text-sky-300 font-mono">
                  26
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Sub-Banner Context Strip */}
      <div className="bg-[#19283a] px-5 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white/90">
            {categoryTabs.find((t) => t.id === activeTab)?.label}
          </span>
          <span className="text-white/40">·</span>
          <span className="text-[11px] text-white/60">
            Tıklayarak doğrudan WebGUI işlem ekranına geçiş yapabilirsiniz
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
            Sistem: i20.ides.consolut.com:850 (TR)
          </span>
          <span className="text-white/40">|</span>
          <span className="font-mono text-emerald-300">
            Şirket Kodu: TR01 / 1010
          </span>
        </div>
      </div>

      {/* 4. Main Fiori Tiles Grid (Authentic White Cards with Belize Hover) */}
      <div className="flex-1 p-5 md:p-6 overflow-y-auto bg-gradient-to-b from-[#1c2d42] to-[#152334]">
        
        {filteredTiles.length === 0 ? (
          <div className="py-20 text-center text-white/60">
            <p className="text-sm font-semibold">Arama kriterine uygun kutucuk bulunamadı.</p>
            <p className="text-xs text-white/40 mt-1">Lütfen farklı bir T-Code veya anahtar kelime deneyin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
            {filteredTiles.map((tile) => {
              return (
                <div
                  key={tile.id}
                  onClick={() => handleTileClick(tile)}
                  className="group relative bg-white hover:bg-slate-50 text-slate-800 rounded-lg p-3.5 shadow-md hover:shadow-xl transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[140px] border border-slate-200/90 active:scale-[0.98]"
                >
                  {/* Top: Title & Subtitle */}
                  <div>
                    <h3 className="text-xs font-semibold text-slate-900 leading-tight group-hover:text-[#0062A3] transition-colors line-clamp-2">
                      {tile.title}
                    </h3>
                    {tile.subtitle && (
                      <p className="text-[11px] text-slate-500 mt-1 truncate">
                        {tile.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Middle: KPI Visualization if Present */}
                  {tile.kpiData && (
                    <div className="my-1.5">
                      {tile.kpiData.type === 'big_number' && (
                        <div className="text-center py-1">
                          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
                            {tile.kpiData.bigNumber}
                          </div>
                          {tile.kpiData.subLabel && (
                            <div className="text-[10px] text-slate-500">
                              {tile.kpiData.subLabel}
                            </div>
                          )}
                        </div>
                      )}

                      {tile.kpiData.type === 'bars' && tile.kpiData.bars && (
                        <div className="space-y-1 text-[10px]">
                          {tile.kpiData.bars.map((bar, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <div className="flex justify-between text-slate-600">
                                <span className="truncate max-w-[70px]">{bar.label}</span>
                                <span className="font-mono font-semibold">{bar.value}</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-sky-600 h-full rounded-full"
                                  style={{ width: `${bar.pct}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom: Icon, T-Code and Badge */}
                  <div className="flex items-end justify-between pt-2 border-t border-slate-100 mt-2">
                    {/* Icon based on type */}
                    <div className="text-slate-400 group-hover:text-sky-600 transition-colors">
                      {tile.iconType === 'document' && <FileText className="w-4 h-4" />}
                      {tile.iconType === 'truck' && <Truck className="w-4 h-4" />}
                      {tile.iconType === 'dollar' && <DollarSign className="w-4 h-4" />}
                      {tile.iconType === 'cube' && <Package className="w-4 h-4" />}
                      {tile.iconType === 'chart_bars' && <BarChart2 className="w-4 h-4" />}
                      {tile.iconType === 'chart_line' && <TrendingUp className="w-4 h-4" />}
                      {tile.iconType === 'settings' && <Settings className="w-4 h-4" />}
                      {tile.iconType === 'kpi_number' && <TrendingUp className="w-4 h-4" />}
                      {tile.iconType === 'list' && <ListTree className="w-4 h-4" />}
                      {tile.iconType === 'user' && <Database className="w-4 h-4" />}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {tile.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300">
                          {tile.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-sky-700 transition-colors">
                        {tile.tCode}
                      </span>
                    </div>
                  </div>

                  {/* Hover Indicator Bar */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-transparent group-hover:bg-[#008FD3] rounded-b-lg transition-colors" />
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 5. Bottom Quick Action & Tutorial Ribbon */}
      <div className="bg-[#172534] border-t border-white/10 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white">SAP S/4HANA Fiori Launchpad Aktif</span>
          <span className="text-white/40">·</span>
          <span className="text-white/60">
            Herhangi bir kutucuğa tıklayarak doğrudan o işlemin simülatörüne gidebilirsiniz.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenScreenshotGuide('vl01n_picking_screen')}
            className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Picking & PGI Eğitimi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={onOpenClassicTree}
            className="text-sky-300 hover:text-sky-200 font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Klasik SAP GUI Ağaç Menüsü</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
