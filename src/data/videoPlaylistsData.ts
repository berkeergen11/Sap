/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAPModuleId } from '../types/sap';

export interface VideoLesson {
  id: string;
  module: SAPModuleId;
  title: string;
  youtubeId: string; // YouTube Video or Playlist ID
  playlistId: string;
  shareUrl?: string;
  duration: string;
  description: string;
  tCode: string;
  timestamps: Array<{
    timeSeconds: number;
    timeDisplay: string;
    topicTitle: string;
    tCodeTarget: string;
    screenName: string;
    summaryTR: string;
    englishTerms: Array<{ en: string; tr: string }>;
    quickFormula: string;
  }>;
}

export const MASTER_PLAYLIST_ID = 'PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN';
export const MASTER_PLAYLIST_SHARE_URL = 'https://youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN&si=lYO6edjoy60nBo_j';

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'master_sap_course_01',
    module: 'SD',
    title: 'SAP Kurumsal Video Eğitim Serisi (Temel Video Kaynak)',
    youtubeId: 'videoseries?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN',
    playlistId: 'PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN',
    shareUrl: 'https://youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN&si=lYO6edjoy60nBo_j',
    duration: 'Tam Oynatma Listesi',
    description: 'Temel kaynak olarak belirlenen resmi oynatma listesi: SAP Easy Access arayüzü, Sipariş Yönetimi (VA01), Teslimat ve Sevkiyat (VL01N), Depo Mal Kabulü (MIGO) ve Faturalama (VF01/MIRO) uçtan uca uygulamalı eğitim serisi.',
    tCode: 'VA01',
    timestamps: [
      {
        timeSeconds: 0,
        timeDisplay: '00:00',
        topicTitle: 'SAP Fiori Launchpad & 26 Uygulama Kutucuğu',
        tCodeTarget: 'FLP',
        screenName: 'Fiori Launchpad — Başlangıç Sayfası (Ana Sayfam)',
        summaryTR: 'S/4HANA modern web arayüzünde 6 ana kategori sekmesi ve Satış & Dağıtım / Lojistik için en sık kullanılan 26 Fiori kutucuğu (VA01, VL01N, VF01, VF04...).',
        englishTerms: [
          { en: 'Fiori Launchpad', tr: 'Fiori Başlangıç Sayfası' },
          { en: 'Spaces & Pages', tr: 'Alanlar ve Sayfalar (Kategori Sekmeleri)' },
          { en: 'Tile / App', tr: 'Uygulama Kutucuğu (26 Adet)' },
        ],
        quickFormula: 'Fiori Ana Menü ➡️ Satış Siparişleri Oluştur [VA01]',
      },
      {
        timeSeconds: 155,
        timeDisplay: '02:35',
        topicTitle: 'VA01 Sipariş Türü (OR) & Satış Dağıtım Alanı Girişi',
        tCodeTarget: 'VA01',
        screenName: 'Satış siparişleri oluştur: Başlangıç ekranı',
        summaryTR: 'Sipariş Türü OR (veya ZOR) seçilir. Satış Örgütü: 1010, Dağıtım Kanalı: 10, Bölüm: 00 girilip Enter / Devam butonuna basılır.',
        englishTerms: [
          { en: 'Order Type (AUART)', tr: 'Sipariş Türü (OR/ZOR)' },
          { en: 'Sales Organization', tr: 'Satış Örgütü (1010 / TR01)' },
          { en: 'Distribution Channel', tr: 'Dağıtım Kanalı (10)' },
          { en: 'Division', tr: 'Bölüm (00)' },
        ],
        quickFormula: 'VA01 ➡️ OR ➡️ 1010 / 10 / 00 ➡️ Devam [Enter]',
      },
      {
        timeSeconds: 490,
        timeDisplay: '08:10',
        topicTitle: 'Sipariş Veren (TR1923 TÜRKİYE ŞUBE Köln) & Kalem Tablosu (531/532 Çay)',
        tCodeTarget: 'VA01',
        screenName: 'Standart sipariş yarat: Genel bakış (SAPMV45A)',
        summaryTR: 'Sol üstte Sipariş Veren: TR1923 (TÜRKİYE ŞUBE / Köln), Sipariş No: 32833 girilir. Kalem 10: 531 Melone Tee (2.900 EUR), Kalem 20: 532 üzümlü çay (150 EUR), Toplam Net: 3.050,00 EUR.',
        englishTerms: [
          { en: 'Sold-To Party (KUNNR)', tr: 'Sipariş Veren (TR1923)' },
          { en: 'Purchase Order No (BSTNK)', tr: 'Müşteri Sipariş No (32833)' },
          { en: 'Header Pricing Conditions', tr: 'Fiyat Koşulları Başlığı' },
          { en: 'Net Value', tr: 'Net Değer (3.050,00 EUR)' },
        ],
        quickFormula: 'Sipariş Veren: TR1923 ➡️ Sipariş No: 32833 ➡️ 531 + 532 ➡️ 3.050 EUR',
      },
      {
        timeSeconds: 840,
        timeDisplay: '14:00',
        topicTitle: 'Siparişi Kaydet (Ctrl+S) & Belge Akışı Entegrasyonu',
        tCodeTarget: 'VA01',
        screenName: 'Belge Akışı & Standart Sipariş 32833 Saklandı Bildirimi',
        summaryTR: 'Mavi disket / Kaydet (Ctrl+S) butonuna basılır. Alt durum çubuğunda "Standart sipariş 32833 saklandı." yeşil onayı alınır ve teslimat aşamasına geçilir.',
        englishTerms: [
          { en: 'Save / Post (Ctrl+S)', tr: 'Kaydet (Mavi Buton)' },
          { en: 'Document Flow (VBFA)', tr: 'Belge Akışı' },
          { en: 'Status Bar Toast', tr: 'Alt Durum Çubuğu Yeşil Onayı' },
        ],
        quickFormula: 'Fiyat Koşulları Kontrolü ➡️ Kaydet [Ctrl+S] ➡️ Sipariş 32833 Saklandı',
      },
      {
        timeSeconds: 1020,
        timeDisplay: '17:00',
        topicTitle: 'VL01N Teslimat Başlangıç Parametreleri (Sevkiyat Noktası 1010)',
        tCodeTarget: 'VL01N',
        screenName: 'Gönderilen teslimatı sipariş referansı ile yarat (Başlangıç)',
        summaryTR: 'Sevkiyat Noktası: 1010, Seçim Tarihi: 07.10.2021 ve Sipariş: 32833 referans verilir. F4 tuşuna basılarak tanımlı sevkiyat noktaları listelenir.',
        englishTerms: [
          { en: 'Shipping Point (VSTEL)', tr: 'Sevkiyat Noktası (1010 / TR01)' },
          { en: 'Selection Date', tr: 'Seçim Tarihi (07.10.2021)' },
          { en: 'F4 Matchcode Search', tr: 'F4 Arama Listesi (1010, TR01, 1012...)' },
        ],
        quickFormula: 'VL01N ➡️ Sevkiyat: 1010 ➡️ Sipariş: 32833 ➡️ Devam',
      },
      {
        timeSeconds: 1215,
        timeDisplay: '20:15',
        topicTitle: 'VL01N/VL02N Çekme (Picking) & Mal Çıkışını Kaydet (PGI)',
        tCodeTarget: 'VL02N',
        screenName: 'Yapılan teslimat 80040620 Değiştir: Genel bakış (Çekme Sekmesi)',
        summaryTR: 'Çekme sekmesinde Depo Yeri 101A seçilir, Çekilen Miktar 10 KAR girilir ve üst araç çubuğundaki "Mal çıkışını kaydet" butonuna basılır. 80040620 numaralı teslimat saklanır.',
        englishTerms: [
          { en: 'Picking (KOSTK)', tr: 'Toplama / Çekme (Durum C)' },
          { en: 'Storage Location (LGORT)', tr: 'Depo Yeri (101A / 0001)' },
          { en: 'Post Goods Issue (PGI)', tr: 'Mal Çıkışını Kaydet (PGI)' },
        ],
        quickFormula: 'Çekme Sekmesi ➡️ Çekilen Miktar: 10 KAR ➡️ Mal Çıkışını Kaydet [PGI]',
      },
      {
        timeSeconds: 1440,
        timeDisplay: '24:00',
        topicTitle: 'VF01 Faturalama Belgesi Yarat & İşlenecek Belgeler (80040620)',
        tCodeTarget: 'VF01',
        screenName: 'Faturalama belgesi yarat: Başlangıç ekranı',
        summaryTR: 'Fatura türü F2, faturalama tarihi 07.10.2021 seçilir. İşlenecek belgeler tablosuna 80040620 teslimat numarası girilerek Yürüt veya Kaydet butonuna basılır.',
        englishTerms: [
          { en: 'Billing Document Type', tr: 'Faturalama Türü (F2 Standart Fatura)' },
          { en: 'Delivery Reference', tr: 'İşlenecek Belge (80040620 Teslimat)' },
        ],
        quickFormula: 'VF01 ➡️ Fatura Türü F2 ➡️ Belge: 80040620 ➡️ Yürüt / Kaydet',
      },
      {
        timeSeconds: 1680,
        timeDisplay: '28:00',
        topicTitle: 'VF01/VF03 Fatura (F2) Genel Bakış & Belge 90017855 Saklandı',
        tCodeTarget: 'VF01',
        screenName: 'Fatura (F2) Yarat: Genel bakış-Faturalama belgesi kalemleri',
        summaryTR: 'Faturada Ödeyen TR1923 (TÜRKİYE ŞUBE / Köln), Net Değer 3.050,00 EUR, MWST %19 KDV 579,50 EUR doğrulanır. Kaydet ile alt barda "Belge 90017855 saklandı." onayı çıkar.',
        englishTerms: [
          { en: 'Payer (KUNRG)', tr: 'Ödeyen (TR1923 TÜRKİYE ŞUBE)' },
          { en: 'Tax Amount (MWST)', tr: 'Vergi Tutarı (%19 / 579,50 EUR)' },
          { en: 'Document Saved', tr: 'Belge 90017855 Saklandı' },
        ],
        quickFormula: 'Fatura Genel Bakış ➡️ Fiyat Koşulları ➡️ Kaydet ➡️ Belge 90017855 Saklandı',
      },
      {
        timeSeconds: 1940,
        timeDisplay: '32:20',
        topicTitle: 'VF04 Faturalama Belgesi İş Listesi (Toplu Fatura Havuzu)',
        tCodeTarget: 'VF04',
        screenName: 'Faturalama belgesi iş listesini işle',
        summaryTR: 'Faturalamaya hazır tüm açık teslimat belgelerini tek bir havuzda toplar ve toplu faturalama çalıştırmasını tetikler.',
        englishTerms: [
          { en: 'Billing Due List', tr: 'Faturalama Belgesi İş Listesi' },
          { en: 'Collective Run', tr: 'Toplu Faturalama Çalıştırması' },
        ],
        quickFormula: 'VF04 ➡️ Tarih & Satış Örgütü 1010 ➡️ F8 [İş Listesini Görüntüle]',
      },
      {
        timeSeconds: 2160,
        timeDisplay: '36:00',
        topicTitle: 'Uçtan Uca Belge Akışı & Muhasebe (FI) 120/600 Entegrasyonu',
        tCodeTarget: 'VA03',
        screenName: 'Belge Akışı (Document Flow - VBFA)',
        summaryTR: 'Sipariş 32833 ➔ Teslimat 80040620 ➔ Fatura 90017855 ➔ Muhasebe Belgesi 1900002841 zinciri teyit edilir. Açık kalem 3.629,50 EUR olarak muhasebeye düşer.',
        englishTerms: [
          { en: 'Document Flow', tr: 'Belge Akışı (Tüm Zincir)' },
          { en: 'Accounting Document', tr: 'Muhasebe Belgesi (FI 1900002841)' },
          { en: 'Open Item', tr: 'Açık Kalem (Alacak Takibi)' },
        ],
        quickFormula: 'VA03 ➡️ Belge Akışı ➡️ 32833 ➔ 80040620 ➔ 90017855 ➔ 1900002841',
      },
    ],
  },
  {
    id: 'mm_master_course_02',
    module: 'MM',
    title: 'SAP MM (Malzeme Yönetimi & Satınalma) - Temel Video Kaynak',
    youtubeId: 'videoseries?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN',
    playlistId: 'PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN',
    shareUrl: 'https://youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN&si=lYO6edjoy60nBo_j',
    duration: 'Tam Oynatma Listesi',
    description: 'Malzeme Ana Verisi (MM01), Satın Alma Siparişi (ME21N), Depo Mal Kabulü (MIGO 101) ve Satıcı Fatura Doğrulama (MIRO).',
    tCode: 'MIGO',
    timestamps: [
      {
        timeSeconds: 0,
        timeDisplay: '00:00',
        topicTitle: 'MM01 Malzeme Kartı Açılışı (ROH Hammadde / FERT Mamul)',
        tCodeTarget: 'MM01',
        screenName: 'Malzeme yarat: Başlangıç ekranı',
        summaryTR: 'Sektör: M (Makine), Malzeme Türü: ROH seçilir. Görünüm seçiminden Temel veriler, Satın alma, Depo ve Muhasebe onaylanır.',
        englishTerms: [
          { en: 'Material Master', tr: 'Malzeme Kartı' },
          { en: 'Material Type (ROH)', tr: 'Hammadde Türü' },
        ],
        quickFormula: 'MM01 ➡️ Sektör M ➡️ Tür ROH ➡️ Görünümler ➡️ Tesis 1000 ➡️ Kaydet',
      },
      {
        timeSeconds: 380,
        timeDisplay: '06:20',
        topicTitle: 'ME21N Satın Alma Siparişi (Tedarikçi Borusan)',
        tCodeTarget: 'ME21N',
        screenName: 'Satın alma siparişi yarat',
        summaryTR: 'Başlıkta Satıcı 300045, Satın Alma Örgütü 1000 girilir. Tabloya Malzeme ve Miktar yazılır. Büyüteç ile kontrol edilip kaydedilir.',
        englishTerms: [
          { en: 'Purchase Order (PO)', tr: 'Satın Alma Siparişi (SAS)' },
          { en: 'Vendor', tr: 'Satıcı / Tedarikçi' },
        ],
        quickFormula: 'ME21N ➡️ Satıcı: 300045 ➡️ Kalemler ➡️ Büyüteç Kontrol ➡️ Kaydet [Ctrl+S]',
      },
      {
        timeSeconds: 840,
        timeDisplay: '14:00',
        topicTitle: 'MIGO Mal Kabulü (A01 / R01 & Kalem Tamam Kutusu)',
        tCodeTarget: 'MIGO',
        screenName: 'Mal hareketi / Mal kabulü (101)',
        summaryTR: 'Sol üstte A01 ve R01 seçilir. SAS numarası yazılır. En kritik adım: Alt paneldeki "Kalem Tamam (Item OK) ☑" kutucuğu işaretlenir!',
        englishTerms: [
          { en: 'Goods Receipt', tr: 'Mal Kabulü' },
          { en: 'Movement Type 101', tr: 'Hareket Türü 101 (Depoya Giriş)' },
          { en: 'Item OK Checkbox', tr: 'Kalem Tamam Onay Kutucuğu' },
        ],
        quickFormula: 'MIGO ➡️ A01 ➡️ R01 ➡️ SAS No ➡️ Kalem Tamam ☑ ➡️ Kaydet [Ctrl+S]',
      },
      {
        timeSeconds: 1420,
        timeDisplay: '23:40',
        topicTitle: 'MIRO Lojistik Fatura Doğrulama & Bakiye Işığı',
        tCodeTarget: 'MIRO',
        screenName: 'Gelen fatura girişi (3-Way Match)',
        summaryTR: 'Fatura tarihi, toplam tutar girilir. Vergiyi Hesapla kutucuğu işaretlenir. Sağ üstteki bakiye lambası yeşil olduğunda kaydedilir.',
        englishTerms: [
          { en: 'Invoice Verification', tr: 'Lojistik Fatura Doğrulama' },
          { en: 'Calculate Tax', tr: 'Vergiyi Hesapla Kutusu' },
        ],
        quickFormula: 'MIRO ➡️ Tarih ➡️ Tutar ➡️ Vergiyi Hesapla ☑ ➡️ SAS No ➡️ Bakiye Yeşil ➡️ Kaydet',
      },
    ],
  },
  {
    id: 'fico_master_course_03',
    module: 'FI',
    title: 'SAP FICO (Mali Muhasebe & Kontrol) - Temel Video Kaynak',
    youtubeId: 'videoseries?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN',
    playlistId: 'PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN',
    shareUrl: 'https://youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN&si=lYO6edjoy60nBo_j',
    duration: 'Tam Oynatma Listesi',
    description: 'FB50 Mahsup Fişi, FB60 Satıcı Faturası, FB70 Müşteri Faturası ve TDHP Muhasebe Mantığı.',
    tCode: 'FB50',
    timestamps: [
      {
        timeSeconds: 0,
        timeDisplay: '00:00',
        topicTitle: 'FB50 Genel Muhasebe Mahsup Fişi (G/L Account Posting)',
        tCodeTarget: 'FB50',
        screenName: 'G/L hesap kalemi girişi: Şirket kodu TR01',
        summaryTR: 'Belge tarihi ve para birimi TRY girilir. Borç tarafına 770 Genel Yönetim Gideri, Alacak tarafına 102 Banka yazılır. Sağ üst bakiye ışığı yeşil olunca kaydedilir.',
        englishTerms: [
          { en: 'General Ledger (G/L)', tr: 'Büyük Defter / Defterikebir' },
          { en: 'Debit / Credit', tr: 'Borç / Alacak (S/H)' },
          { en: 'Balance Traffic Light', tr: 'Bakiye Trafik Lambası' },
        ],
        quickFormula: 'FB50 ➡️ Belge Tarihi ➡️ 770 Borç ➡️ 102 Alacak ➡️ Bakiye Yeşil (0,00) ➡️ Kaydet',
      },
      {
        timeSeconds: 520,
        timeDisplay: '08:40',
        topicTitle: 'FB60 Satıcı Faturası & KDV Tevkifatı (Stopaj)',
        tCodeTarget: 'FB60',
        screenName: 'Satıcı faturası girişi (Hesap Borçları)',
        summaryTR: 'Satıcı 320 cari kodu, fatura tutarı girilir. Vergiyi Hesapla kutucuğu işaretlenir. Stopaj sekmesinde 5/10 veya 9/10 tevkifat kodu seçilir.',
        englishTerms: [
          { en: 'Vendor Invoice (AP)', tr: 'Satıcı Faturası' },
          { en: 'Withholding Tax / Tevkifat', tr: 'KDV Tevkifatı' },
        ],
        quickFormula: 'FB60 ➡️ Satıcı: 320001 ➡️ Tutar ➡️ Vergiyi Hesapla ☑ ➡️ Gider 770 ➡️ Kaydet',
      },
      {
        timeSeconds: 1100,
        timeDisplay: '18:20',
        topicTitle: 'FB70 Müşteri Faturası & 120/600 Alacak Kaydı',
        tCodeTarget: 'FB70',
        screenName: 'Müşteri faturası girişi (Hesap Alacakları)',
        summaryTR: 'Müşteri 120 cari kodu ve tutar girilir. Gelir hesabı (600 Yurtiçi Satışlar) seçilerek doğrudan mali muhasebe üzerinden fatura kaydedilir.',
        englishTerms: [
          { en: 'Customer Invoice (AR)', tr: 'Müşteri Faturası' },
          { en: 'Sales Revenue (600)', tr: 'Yurtiçi Satış Gelirleri' },
        ],
        quickFormula: 'FB70 ➡️ Müşteri: 120005 ➡️ Tutar ➡️ Karşı Hesap 600010 ➡️ Kaydet [Ctrl+S]',
      },
    ],
  },
];
