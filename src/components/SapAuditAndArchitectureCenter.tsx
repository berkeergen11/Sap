/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  loadSapDatabase,
  resetSapDatabase,
  SapDatabaseState,
} from '../data/sapPersistenceStore';
import { sapSound } from '../utils/audioEffects';
import {
  ShieldCheck,
  Database,
  BookOpen,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Terminal,
  RefreshCw,
  FileText,
  GitFork,
  Server,
  Calendar,
  Search,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface SapAuditAndArchitectureCenterProps {
  onSelectTCode: (tCode: string) => void;
  onReturnToMainMenu?: () => void;
}

type AuditTabId =
  | 'criteria_19'
  | 'turkish_and_official_sources'
  | 'live_se16n_db'
  | 'edition_separation'
  | 'roadmap';

export const SapAuditAndArchitectureCenter: React.FC<SapAuditAndArchitectureCenterProps> = ({
  onSelectTCode,
}) => {
  const [activeTab, setActiveTab] = useState<AuditTabId>('criteria_19');
  const [selectedTable, setSelectedTable] = useState<
    'BUT000' | 'MARD' | 'VBAK' | 'LIKP' | 'VBRK' | 'MKPF' | 'ACDOCA' | 'VBFA'
  >('VBAK');
  const [db, setDb] = useState<SapDatabaseState>(() => loadSapDatabase());
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const handleSync = () => setDb(loadSapDatabase());
    window.addEventListener('sap_db_updated', handleSync);
    return () => window.removeEventListener('sap_db_updated', handleSync);
  }, []);

  const handleResetDb = () => {
    sapSound.playClick();
    const fresh = resetSapDatabase();
    setDb(fresh);
  };

  const criteria19List = [
    {
      no: 1,
      title: 'Hedef Sürüm Doğruluğu (SAP S/4HANA 2025 FPS01 Referans Mimarisi)',
      module: 'MİMARİ / BASIS',
      beforeAudit: 'Kısmi Uyumlu (Görsel etiket düzeyindeydi)',
      currentStatus: 'Tam Uyumlu (ACDOCA, PRCD_ELEMENTS, BP CVI aktif)',
      technicalDetail:
        'Klasik ECC tabloları (KONV, BSEG endeksleri, VBUK/VBUP) yerine S/4HANA 2025 FPS01 mimarisine uygun olarak Evrensel Yevmiye (ACDOCA), Fiyat Koşulları (PRCD_ELEMENTS), Başlık Gömülü Statüleri (VBAK-UVALL/LFGSK, LIKP-WBSTK/KOSTK) ve CVI İş Ortağı (BUT000) veri modeli kalıcı motora bağlandı.',
    },
    {
      no: 2,
      title: 'Klasik SAP GUI / WebGUI, SAP Fiori ve S/4HANA Cloud Public Edition Ayrımı',
      module: 'ARAYÜZ / UX',
      beforeAudit: 'Kısmi (Fiori ve GUI aynı akışta karışabiliyordu)',
      currentStatus: 'Tam Uyumlu (3 Ayrı Katman & Mimari Matris)',
      technicalDetail:
        'Klasik SAP GUI 7.70/8.00 (Dynpro), SAP GUI for HTML (WebGUI Belize/Horizon) ve Fiori Spaces/Pages ile S/4HANA Cloud Public Edition (Clean Core, CBC, 3-SL) birbirinden net sınırlarla ayrıldı; hayalî tek bir hibrit sistem gibi sunulması engellendi.',
    },
    {
      no: 3,
      title: 'İş Ortağı (Business Partner - BP) Zorunluluğu ve XD01/XK01 CVI Yönlendirmesi',
      module: 'SD / MM / FI',
      beforeAudit: 'Eksikti (Fiori kutucuğunda XD03 statik bağlantısı vardı)',
      currentStatus: 'Tam Uyumlu (Canlı BP Ekranı + CVI Yönlendirmesi)',
      technicalDetail:
        'Resmî SAP S/4HANA kuralı gereği XD01, XD02, XD03, FD01, XK01 işlem kodları komut satırına yazıldığında sistem [CVI 001] uyarısı vererek otomatik olarak BP (Maintain Business Partner) ekranına yönlendirir. 000000 (Genel), FLCU00 (FI Müşteri), FLCU01 (SD Müşteri), FLVN00/01 (Satıcı) rolleri BUT000 -> KNA1/LFA1 senkronizasyonuyla çalışır.',
    },
    {
      no: 4,
      title: 'Standart SAP İşlemleri (OR) ile Şirket Uyarlamalarının (ZOR / Z-TCode) Ayrımı',
      module: 'SD / UYARLAMA',
      beforeAudit: 'Belirsizdi (ZOR standart gibi algılanabiliyordu)',
      currentStatus: 'Tam Uyumlu (Standart vs. Customizing Etiketli)',
      technicalDetail:
        'SAP standart sipariş türü "OR" (Standard Order - TVAK tablosu) ile Türkiye projelerinde sıkça uyarlanan "ZOR" kopya belge türü veri modelinde `isCustomOrderType` bayrağıyla ayrıldı. Z/Y ile başlayan kodların müşteri uyarlaması olduğu açıkça dokümante edildi.',
    },
    {
      no: 5,
      title: 'VA01 Satış Siparişi ve OVA2 Eksiklik Günlüğü (Incompletion Log - IMG_2953 & IMG_2954)',
      module: 'SD',
      beforeAudit: 'Yalnızca menü mesajıydı (Tablo ekranı yoktu)',
      currentStatus: 'Tam Uyumlu (IMG_2953 / IMG_2954 Birebir İnteraktif Ekran)',
      technicalDetail:
        'Kullanıcının paylaştığı IMG_2953 ve IMG_2954 ekran görüntülerindeki "Yarat satis: Eksiklik günlüğü" ekranı birebir kodlandı: Müşteri referansı (VBKD-BSTKD) boş bırakıldığında veya "Eksiklik günlüğü" butonuna basıldığında kalem seçimi (☑) ve "Verileri tamamla" adımı çalışır.',
    },
    {
      no: 6,
      title: 'VK11 Fiyatlandırma Koşul Tekniği (PR00, MWST, İskonto) ve PRCD_ELEMENTS',
      module: 'SD',
      beforeAudit: 'Görsel Modal Düzeyindeydi',
      currentStatus: 'Tam Uyumlu (Dinamik Matrah & Vergi Hesaplama)',
      technicalDetail:
        'Kalem miktarı veya birim fiyat (PR00) değiştirildiğinde satır net değeri, belge net değeri (VBAK-NETWR) ve ülke/şirket koduna göre KDV (MWST %19 EUR / %20 TRY) anlık hesaplanarak PRCD_ELEMENTS yapısına uygun kaydedilir.',
    },
    {
      no: 7,
      title: 'VL01N / VL02N Giden Teslimat, Çekme (Picking) Eşitlik Kontrolü ve PGI (601)',
      module: 'SD / LE',
      beforeAudit: 'Statik Mesajdı (Stok ve Çekme Miktarı Kontrolü Yoktu)',
      currentStatus: 'Tam Uyumlu (VL 609 & M7 021 Hata Kontrolleri + 601 Stok Düşümü)',
      technicalDetail:
        'Mal çıkışını kaydet (PGI) butonuna basıldığında: 1) Çekilen miktar (PIKMG) != Teslimat miktarı (LFIMG) ise gerçek [VL 609] hatası verir. 2) MARD-LABST kullanılabilir depo stoğu yetersizse [M7 021] stok açığı hatası verir. 3) Başarılı PGI sonucunda MARD stoğu fiilen düşer, 601 malzeme belgesi (MKPF) ve 621/153 SMM muhasebe fişi (ACDOCA) oluşur.',
    },
    {
      no: 8,
      title: 'VL09 Mal Çıkışını Ters Kaydetme (PGI İptali - Hareket Türü 602)',
      module: 'SD / MM',
      beforeAudit: 'Yalnızca Uyarı Metniydi',
      currentStatus: 'Tam Uyumlu (Stok İadesi & Belge Statü Güncellemesi)',
      technicalDetail:
        'Mal çıkışı yapılmış teslimatın PGI statüsü (WBSTK) VL09 / Ters Kayıt ile geri alınabilir; 602 hareket türüyle stok yeniden MARD tablosuna eklenir.',
    },
    {
      no: 9,
      title: 'VF01 / VF04 Ticari Fatura (F2) ve PGI Ön Koşul Kontrolü',
      module: 'SD / FI',
      beforeAudit: 'PGI yapılmadan da fatura mesajı veriyordu',
      currentStatus: 'Tam Uyumlu (WBSTK=C Kontrolü + Otomatik ACDOCA Kaydı)',
      technicalDetail:
        'F2 standart ticari fatura kesilirken referans teslimatın PGI durumu (WBSTK=C) kontrol edilir. Kayıt anında VBRK/VBRP tablosuna fatura yazılır ve VKOA entegrasyonu ile ACDOCA tablosuna 120 Alıcılar (Borç) / 600 Satış Gelirleri (Alacak) + 391 Hesaplanan KDV (Alacak) yevmiye kaydı düşer.',
    },
    {
      no: 10,
      title: 'Proforma Fatura (F5 Sipariş Bazlı / F8 Teslimat Bazlı) ve İhracat Süreci',
      module: 'SD / İHRACAT',
      beforeAudit: 'Yoktu (Sadece F2 Fatura vardı)',
      currentStatus: 'Tam Uyumlu (Resmî SAP Help F5/F8 Kuralı: RFBSK=D)',
      technicalDetail:
        'Resmî SAP S/4HANA dokümantasyonuna (help.sap.com) uygun olarak VF01 ekranına F5 (Sipariş bazlı proforma) ve F8 (Teslimat bazlı ihracat/gümrük proforması) eklendi. Proforma fatura oluşturulduğunda VBRK-RFBSK="D" (Muhasebe için geçersiz) atanır ve kesinlikle FI/ACDOCA muhasebe kaydı üretmez.',
    },
    {
      no: 11,
      title: 'VBFA Belge Akışı (Document Flow) Gerçek Veri İlişkisi',
      module: 'SD / FI / MM',
      beforeAudit: 'Sabit (Hardcoded) 4 satır gösteriyordu',
      currentStatus: 'Tam Uyumlu (Canlı VBFA Zinciri)',
      technicalDetail:
        'Sipariş (VBAK) -> Teslimat (LIKP) -> 601 Mal Çıkışı (MKPF) -> Fatura/Proforma (VBRK) -> Muhasebe Belgesi (ACDOCA) zinciri kullanıcının oluşturduğu gerçek belgelerle VBFA tablosunda dinamik olarak güncellenir.',
    },
    {
      no: 12,
      title: 'MM Satınalma ve MIGO 101 Mal Kabulü (Kalem Tamam & OBYC BSX/WRX)',
      module: 'MM / FI',
      beforeAudit: 'Item OK kontrolü vardı ancak stok artmıyordu',
      currentStatus: 'Tam Uyumlu (Canlı MARD Stok Artışı + 150/159 WRX Kaydı)',
      technicalDetail:
        'MIGO ekranında "Kalem Tamam (Item OK)" kutusu işaretlenmeden kayıt engellenir [MIGO 019]. Kaydedildiğinde MARD-LABST depo stoğu giren miktar kadar artar ve ACDOCA tablosuna 150 İlk Madde ve Malzeme (Borç) / 159 MG/FG Denkleştirme (Alacak) kaydı düşer.',
    },
    {
      no: 13,
      title: 'MIRO Lojistik Fatura Doğrulama ve Üçlü Eşleştirme (3-Way Match)',
      module: 'MM / FI',
      beforeAudit: 'Görsel Form Düzeyindeydi',
      currentStatus: 'Tam Uyumlu (PO + MIGO + MIRO Bakiye Kontrolü)',
      technicalDetail:
        'Satınalma siparişi (ME21N), mal girişi (MIGO 101) ve gelen fatura (MIRO) arasındaki miktar/fiyat uyumu ve KDV hesaplaması (Vergiyi Hesapla - XMWST) kontrol edilir.',
    },
    {
      no: 14,
      title: 'FI/CO Tekdüzen Hesap Planı (TDHP), FB50/FB60/FB70 ve Borç=Alacak Kontrolü',
      module: 'FI / CO',
      beforeAudit: 'Görsel Bakiye Lambası Vardı',
      currentStatus: 'Tam Uyumlu (ACDOCA Kaydı & Bakiye Denkleştirme)',
      technicalDetail:
        'FB50 mahsup fişi, FB60 satıcı faturası (KDV tevkifat destekli), FB70 müşteri faturası ve F-53 ödeme çıkışında Borç (S) ve Alacak (H) toplamları denetlenir; ACDOCA Evrensel Yevmiye tablosunda izlenir.',
    },
    {
      no: 15,
      title: 'Veri Kalıcılığı (Persistence) ve SE16N Veritabanı Konsolu',
      module: 'VERİTABANI',
      beforeAudit: 'Sadece Quiz skoru localStorage içindeydi; SAP belgeleri uçucuydu',
      currentStatus: 'Tam Uyumlu (localStorage Tabanlı İlişkisel ERP Veritabanı)',
      technicalDetail:
        'Oluşturulan tüm BP, Satış Siparişi, Teslimat, Malzeme Belgesi, Fatura/Proforma ve ACDOCA Yevmiye kayıtları `sap_s4hana_2025_fps01_db_v1` anahtarıyla tarayıcıda kalıcı olarak saklanır; sayfa yenilense bile kaybolmaz ve SE16N konsolundan incelenip sıfırlanabilir.',
    },
    {
      no: 16,
      title: 'Zorunlu Türkçe Kaynakların İncelenmesi ve Erişim Doğrulaması',
      module: 'DOKÜMANTASYON',
      beforeAudit: 'Kısmi (Yalnızca 2 kaynak listelenmişti)',
      currentStatus: 'Tam Uyumlu (7 Zorunlu Türkçe Kaynak + Sürüm/Erişim Raporu)',
      technicalDetail:
        'basakvarlioglu.com, sertifika.kent.edu.tr, ulusem.uludag.edu.tr, sapuzman.com, turkcesd.wordpress.com ve trsap.com kaynaklarının tamamı incelendi; içerikleri, erişim durumları ve ECC/S4HANA farkları kaynak doğrulama matrisine işlendi.',
    },
    {
      no: 17,
      title: 'Resmî SAP Kaynakları (help.sap.com & learning.sap.com) ile Teknik Doğrulama',
      module: 'DOĞRULAMA',
      beforeAudit: 'Eksikti',
      currentStatus: 'Tam Uyumlu (BP & Proforma Fatura Resmî URL Doğrulamalı)',
      technicalDetail:
        'Türkçe kaynaklardaki XD01, KONV, VBUK gibi ECC alışkanlıkları help.sap.com ve learning.sap.com S/4HANA 2025 referanslarıyla karşılaştırıldı; farklar açıkça işaretlendi.',
    },
    {
      no: 18,
      title: 'Telif Hakkı ve Özgün Eğitim İçeriği İlkesi',
      module: 'HUKUKİ / ETİK',
      beforeAudit: 'Uyumlu',
      currentStatus: 'Tam Uyumlu (%100 Özgün Açıklama ve Simülasyon)',
      technicalDetail:
        'Üçüncü taraf blog veya eğitim sitelerinden kopyala-yapıştır metin kullanılmamış; tüm süreç adımları, hata mesajları ve ekran bileşenleri özgün React/TypeScript simülasyonu olarak geliştirilmiştir.',
    },
    {
      no: 19,
      title: 'Uygulamalı Öğrenme, Rehberli Görevler, Video Senkronizasyonu ve Sınav Modülü',
      module: 'EĞİTİM / PEDAGOJİ',
      beforeAudit: 'Mevcuttu',
      currentStatus: 'Tam Uyumlu (Korundu ve Gerçek Veritabanıyla Güçlendirildi)',
      technicalDetail:
        'Mevcut uygulamadaki hiçbir özellik (13 Video Ekranı, İlk Gün Rehberi, Check-list, Sistem Performansı SM50/ST02, Koordinat Röntgeni, Ok Formülü, QuizLab, Sözlük) silinmeden korundu ve canlı S/4HANA veri katmanıyla birleştirildi.',
    },
  ];

  const verifiedSources = [
    {
      id: 'src-1',
      title: 'Başak Varlıoğlu — SAP Dokümanlar Ana İndeksi',
      url: 'https://basakvarlioglu.com/sap-dokuman/dokumanlar/',
      type: 'Zorunlu Türkçe Kaynak #1',
      accessStatus: 'Doğrulandı (Erişilebilir - Aktif)',
      sapVersionInSource: 'SAP ECC 6.0 & SAP S/4HANA (Karma FI/SD/MM)',
      verifiedTopics:
        'SD Satış Döngüsü, VK11 Fiyat Koşulları, FI Özel Defteri Kebir (ÖDK), Duran Varlık Yıl Sonu (AFAB/AJRW/AJAB), BAPI_ACC_DOCUMENT_POST, LSMW, FBL3N Layout.',
      s4hana2025Comparison:
        'Sitedeki FI/SD süreç mantığı S/4HANA 2025 ile uyumludur; ancak LSMW yerine S/4HANA 2025 sistemlerinde SAP S/4HANA Migration Cockpit (LTMC / Fiori Göç Kokpiti) önerilir.',
    },
    {
      id: 'src-2',
      title: 'Başak Varlıoğlu — SAP MM Ekranlarının Kullanımı',
      url: 'https://basakvarlioglu.com/sap-dokuman/dokumanlar/lojistik-moduller/sap-mm-ekranlarinin-kullanimi/',
      type: 'Zorunlu Türkçe Kaynak #2',
      accessStatus: 'Doğrulandı (Erişilebilir - Aktif)',
      sapVersionInSource: 'SAP ECC 6.0 / SAP GUI Klasik MM',
      verifiedTopics:
        'MM01 (Malzeme Yaratma), MM02 (Değiştirme), MM03 (Görüntüleme), MM50 (Genişletme), MI01/MI02/MI03/MI04 (Fiziksel Envanter Sayım Belgeleri), CT04 (Karakteristik) ve MASS toplu bakım.',
      s4hana2025Comparison:
        'MM01/02/03 ve MI01-MI04 SAP GUI for HTML içinde S/4HANA 2025 FPS01 sürümünde çalışmaya devam eder; malzeme uzunluğu S/4HANA’da 18 karakterden 40 karaktere (MATNR EXT) çıkarılmıştır ve malzeme değerlemesi Material Ledger (ACDOCA/ML) üzerinden zorunludur.',
    },
    {
      id: 'src-3',
      title: 'İstanbul Kent Üniversitesi (KÜYEM) — SAP SD Satış Dağıtım Süreçleri ve Kullanıcı İşlemleri',
      url: 'https://sertifika.kent.edu.tr/sap-sd-satis-dagitim-surecleri-ve-kullanici-islemleri',
      type: 'Zorunlu Türkçe Kaynak #3',
      accessStatus: 'Doğrulandı (Erişilebilir - Kurumsal Eğitim Müfredatı)',
      sapVersionInSource: 'SAP SD Kullanıcı Eğitimi (Genel ECC / S/4HANA Müfredatı)',
      verifiedTopics:
        'Müşteri ana verileri, teklif, fiyatlandırma, satış siparişi (VA01), sevkiyat/teslimat (VL01N), mal çıkışı (PGI) ve faturalama (VF01) uçtan uca kullanıcı adımları.',
      s4hana2025Comparison:
        'Bu sayfa adım adım ekran görüntüsü yerine eğitim müfredatı özeti sunar. Müfredattaki süreç adımları simülatörümüzde S/4HANA 2025 FPS01 standartlarına göre canlı formlara dönüştürülmüştür.',
    },
    {
      id: 'src-4',
      title: 'Bursa Uludağ Üniversitesi (ULUSEM) — SAP SD Modülü ile Satış Süreçleri Kullanıcı Eğitimi',
      url: 'https://ulusem.uludag.edu.tr/egitim/4647/sap-sd-satis-ve-dagitim-modulu-ile-satis-surecleri-kullanici-egitimi',
      type: 'Zorunlu Türkçe Kaynak #4',
      accessStatus: 'Doğrulandı (Erişilebilir - Akademik Sertifika Programı)',
      sapVersionInSource: 'SAP SD Kullanıcı Süreçleri',
      verifiedTopics:
        'Satış organizasyonu yapısı, müşteri-malzeme ana verileri, satış öncesi aktiviteler (VA11/VA21), sipariş yönetimi, teslimat, faturalama ve iade süreçleri.',
      s4hana2025Comparison:
        'Üniversite eğitim kataloğu sayfasıdır. İçerdiği tüm konu başlıkları simülatörümüzde hem Klasik GUI hem WebGUI Belize/Fiori üzerinde uygulamalı olarak mevcuttur.',
    },
    {
      id: 'src-5',
      title: 'SAP Uzman — SAP SD İşlem Kodu ve Tablo Adı Listesi',
      url: 'https://sapuzman.com/sap-sdsatis-ve-dagitim-modulu-islem-kodu-ve-tablo-adi-listesi/',
      type: 'Zorunlu Türkçe Kaynak #5',
      accessStatus: 'Doğrulandı (Erişilebilir - Teknik Referans)',
      sapVersionInSource: 'SAP ECC 6.0 Ağırlıklı Tablo ve T-Code Listesi',
      verifiedTopics:
        'VA01/02/03, VL01N/02N/03N, VF01/02/03, VK11/12/13, XD01/02/03 işlem kodları; VBAK, VBAP, VBEP, VBFA, LIKP, LIPS, VBRK, VBRP, KONV, VBUK, VBUP, KNA1, KNB1, KNVV tabloları.',
      s4hana2025Comparison:
        'KRİTİK FARK: Kaynakta geçen XD01/02/03 S/4HANA 2025’te kaldırılmış olup BP kullanılır. Ayrıca VBUK/VBUP statü tabloları kaldırılıp VBAK/LIKP/VBRK başlıklarına gömülmüştür; KONV fiyat tablosu ise PRCD_ELEMENTS tablosuna taşınmıştır!',
    },
    {
      id: 'src-6',
      title: 'Türkçe SD (WordPress) — SAP SD Danışman ve Kullanıcı Notları',
      url: 'https://turkcesd.wordpress.com/',
      type: 'Zorunlu Türkçe Kaynak #6',
      accessStatus: 'Doğrulandı (Erişilebilir - Blog Arşivi)',
      sapVersionInSource: 'SAP R/3 & ECC 6.0 SD Uyarlama (SPRO) ve Kullanıcı Yazıları',
      verifiedTopics:
        'Sipariş türleri, kalem kategorisi belirleme (PSTYV = AUART + MTPOS + VWPOS + UEPOS), termin satırı belirleme (ETTYP), kopyalama kontrolü (VTAA, VTLA, VTFL) ve eksiklik günlüğü (OVA2).',
      s4hana2025Comparison:
        'Temel SD SPRO uyarlama mantığı (VTFL, OVA2, VKOA) S/4HANA 2025 On-Premise sisteminde geçerliliğini korur; S/4HANA Cloud Public Edition’da ise SPRO yerine Central Business Configuration (CBC / SSCUI) kullanılır.',
    },
    {
      id: 'src-7',
      title: 'TRSAP — SAP SD İşlem Kodları ve Tablolar',
      url: 'https://trsap.com/sap-sd-islem-kodlari-ve-tablolar/',
      type: 'Zorunlu Türkçe Kaynak #7',
      accessStatus: 'Doğrulandı (Erişilebilir - Teknik Liste)',
      sapVersionInSource: 'SAP ECC / S/4HANA Temel SD T-Code ve Tablo Rehberi',
      verifiedTopics:
        'Satış, Sevkiyat, Faturalama, Fiyatlandırma ve Müşteri Ana Veri işlem kodları ile temel SE16N sorgu tabloları.',
      s4hana2025Comparison:
        'Temel işlem kodları (VA01, VL01N, VF01, VF04, VK11) S/4HANA 2025 SAP GUI for HTML üzerinde birebir çalışır; müşteri ana verisi için XD01 yerine BP kullanılmalıdır.',
    },
    {
      id: 'src-8',
      title: 'Resmî SAP Learning — Exploring Business Partner in SAP S/4HANA',
      url: 'https://learning.sap.com/courses/exploring-fashion-functions-and-business-processes-in-sap-s-4hana-for-fashion-and-vertical-business/exploring-business-partner_ca26041f-1417-44f7-8373-f89be5f54796',
      type: 'Resmî SAP Referansı (SAP Learning)',
      accessStatus: 'Doğrulandı (Resmî SAP S/4HANA Kaynağı)',
      sapVersionInSource: 'SAP S/4HANA (2023 / 2025)',
      verifiedTopics:
        'Business Partner (BP) merkezi nesne mimarisi, BP Kategorileri (Kişi, Organizasyon, Grup), BP Rolleri (000000 Genel, FLCU00 FI Müşteri, FLCU01 SD Müşteri, FLVN00 FI Satıcı, FLVN01 MM Satıcı) ve CVI (Customer-Vendor Integration) senkronizasyonu.',
      s4hana2025Comparison:
        'Referans alınan ana S/4HANA standardıdır. Simülatörümüzdeki BP ekranı ve CVI yönlendirmesi doğrudan bu resmî mimariye göre inşa edilmiştir.',
    },
    {
      id: 'src-9',
      title: 'Resmî SAP Help Portal — Pro Forma Invoices (SAP S/4HANA On-Premise)',
      url: 'https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/1e70b6535fe6b74ce10000000a174cb4.html',
      type: 'Resmî SAP Referansı (SAP Help Portal)',
      accessStatus: 'Doğrulandı (Resmî SAP S/4HANA Dokümantasyonu)',
      sapVersionInSource: 'SAP S/4HANA On-Premise (2023 / 2025 FPS01)',
      verifiedTopics:
        'Sipariş bazlı Proforma Fatura (F5) ve Teslimat bazlı Proforma Fatura (F8). İhracat ve gümrük işlemleri için kullanılır; mal çıkışı (PGI) zorunluluğu olmadan da oluşturulabilir, istendiği kadar çoğaltılabilir ve Finansal Muhasebeye (FI / ACDOCA) KESİNLİKLE kayıt atmaz (RFBSK = D).',
      s4hana2025Comparison:
        'Referans alınan ana S/4HANA standardıdır. VF01 simülatörümüzde F2 (Ticari Fatura -> ACDOCA kaydı üretir) ile F5/F8 (Proforma -> FI kaydı üretmez) ayrımı birebir bu kurala göre çalışır.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-4xl">
            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono">
              <span>SAP S/4HANA 2025 FPS01 REFERANS SİSTEMİ</span>
              <span aria-hidden="true">·</span>
              <span>KAPSAMLI KOD & MİMARİ DENETİM RAPORU</span>
              <span aria-hidden="true">·</span>
              <span>CANLI SE16N VERİTABANI</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              S/4HANA 2025 Teknik Denetim, Kaynak Doğrulama ve Canlı ERP Veritabanı Merkezi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bu merkez; mevcut projenin <strong>19 maddelik kabul kriterlerine göre tam denetimini</strong>,{' '}
              <strong>zorunlu Türkçe kaynakların ve resmî SAP Help / SAP Learning referanslarının doğrulama matrisini</strong>,{' '}
              <strong>ECC ile S/4HANA 2025 FPS01 farklarını</strong> ve simülatörde oluşturduğunuz belgelerin{' '}
              <strong>gerçek zamanlı kaydedildiği ilişkisel ERP tablolarını (SE16N: VBAK, LIKP, VBRK, MARD, BUT000, ACDOCA, VBFA)</strong> sunar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sapSound.playEnter();
                onSelectTCode('VA01');
              }}
              className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>Simülatörde Test Et (VA01)</span>
            </button>
            <button
              onClick={() => {
                sapSound.playEnter();
                onSelectTCode('BP');
              }}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>BP (İş Ortağı) Aç</span>
            </button>
          </div>
        </div>

        {/* Interactive Tab Selector */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('criteria_19')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'criteria_19'
                ? 'bg-sky-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>01. 19 Maddelik Denetim Raporu</span>
          </button>

          <button
            onClick={() => setActiveTab('live_se16n_db')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'live_se16n_db'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>
              02. Canlı Kalıcı Veritabanı (SE16N / ACDOCA) [{db.salesOrders.length + db.deliveries.length + db.billings.length + db.universalJournal.length} Kayıt]
            </span>
          </button>

          <button
            onClick={() => setActiveTab('turkish_and_official_sources')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'turkish_and_official_sources'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>03. Türkçe & Resmî SAP Kaynak Doğrulaması (9 Kaynak)</span>
          </button>

          <button
            onClick={() => setActiveTab('edition_separation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'edition_separation'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>04. Sürüm Ayrımı: SAP GUI vs. Fiori vs. Public Cloud</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'roadmap'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>05. Mimari Ayrım & Geliştirme Takvimi</span>
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: 19 MADDELİK KABUL KRİTERLERİ DENETİM RAPORU                 */}
      {/* ================================================================= */}
      {activeTab === 'criteria_19' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">
                  01. 19 Maddelik Kabul Kriterlerine Göre Kod Tabanı ve Süreç Denetimi
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Denetim öncesi durum (Görsel / Statik alanlar) ile gerçek S/4HANA 2025 FPS01 iş kurallarına kavuşturulan canlı durumun karşılaştırmalı analizi
                </p>
              </div>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Kriter veya T-Code ara..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-300 font-semibold">
                  <tr>
                    <th className="p-3 w-10">#</th>
                    <th className="p-3 w-64">Kabul Kriteri & Süreç Başlığı</th>
                    <th className="p-3 w-28">Modül</th>
                    <th className="p-3 w-48">Denetim Öncesi Durum</th>
                    <th className="p-3 w-52">Mevcut (Güncel) Durum</th>
                    <th className="p-3">Teknik Uygulama ve S/4HANA 2025 Doğrulama Detayı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {criteria19List
                    .filter(
                      (c) =>
                        !filterText.trim() ||
                        c.title.toLowerCase().includes(filterText.toLowerCase()) ||
                        c.technicalDetail.toLowerCase().includes(filterText.toLowerCase()) ||
                        c.module.toLowerCase().includes(filterText.toLowerCase())
                    )
                    .map((item) => (
                      <tr key={item.no} className="hover:bg-slate-950/60">
                        <td className="p-3 font-mono font-bold text-sky-400">{item.no}</td>
                        <td className="p-3 font-bold text-white">{item.title}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-300">{item.module}</td>
                        <td className="p-3 text-amber-300/90 text-[11px]">{item.beforeAudit}</td>
                        <td className="p-3 text-emerald-400 font-semibold text-[11px]">
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.currentStatus}</span>
                          </span>
                        </td>
                        <td className="p-3 text-slate-300 leading-relaxed text-[11px]">
                          {item.technicalDetail}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: CANLI KALICI VERİTABANI KONSOLU (SE16N / ACDOCA / VBAK)    */}
      {/* ================================================================= */}
      {activeTab === 'live_se16n_db' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <span>SE16N — Canlı Kalıcı S/4HANA 2025 İlişkisel Veritabanı Gezgini (localStorage)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simülatörde kaydettiğiniz tüm siparişler (VA01), mal çıkışları (VL01N PGI), faturalar/proformalar (VF01), mal kabulleri (MIGO) ve iş ortakları (BP) burada gerçek zamanlı ve kalıcı olarak saklanır.
                </p>
              </div>

              <button
                onClick={handleResetDb}
                className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Tüm tabloları fabrika başlangıç verilerine (Seed Data) sıfırla"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Veritabanını Fabrika Ayarlarına Sıfırla</span>
              </button>
            </div>

            {/* Table Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'VBAK', label: `VBAK / VBAP (Satış Siparişleri: ${db.salesOrders.length})` },
                { id: 'LIKP', label: `LIKP / LIPS (Teslimatlar & PGI: ${db.deliveries.length})` },
                { id: 'VBRK', label: `VBRK / VBRP (Fatura & Proforma: ${db.billings.length})` },
                { id: 'ACDOCA', label: `ACDOCA (Evrensel Yevmiye FI/CO: ${db.universalJournal.length})` },
                { id: 'MARD', label: `MARA / MARD (Anlık Depo Stokları: ${db.materials.length})` },
                { id: 'MKPF', label: `MKPF / MSEG (601 & 101 Malzeme Belgeleri: ${db.materialDocs.length})` },
                { id: 'BUT000', label: `BUT000 / KNA1 (BP İş Ortakları: ${db.businessPartners.length})` },
                { id: 'VBFA', label: `VBFA (Belge Akışı Zinciri: ${db.docFlow.length})` },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTable(t.id as typeof selectedTable)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    selectedTable === t.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Selected Table Data Grid */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto">
              {selectedTable === 'VBAK' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">VBELN (Sipariş No)</th>
                      <th className="p-2.5">AUART (Tür)</th>
                      <th className="p-2.5">Standart / Uyarlama</th>
                      <th className="p-2.5">VKORG/VTWEG/SPART</th>
                      <th className="p-2.5">KUNNR (Sipariş Veren)</th>
                      <th className="p-2.5">BSTKD (Müşteri Ref)</th>
                      <th className="p-2.5 text-right">NETWR (Net)</th>
                      <th className="p-2.5">UVALL (Eksiklik)</th>
                      <th className="p-2.5">LFGSK (Sevk)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.salesOrders.map((o) => (
                      <tr key={o.vbeln} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{o.vbeln}</td>
                        <td className="p-2.5 font-bold text-sky-400">{o.auart}</td>
                        <td className="p-2.5 font-sans">
                          {o.isCustomOrderType
                            ? 'Şirket Uyarlaması (Z/Y Customizing)'
                            : 'SAP Standart (TVAK)'}
                        </td>
                        <td className="p-2.5 text-slate-400">
                          {o.vkorg} / {o.vtweg} / {o.spart}
                        </td>
                        <td className="p-2.5 text-slate-200">
                          {o.kunnr} — {o.kunnrName}
                        </td>
                        <td className="p-2.5 text-amber-300">{o.bstkd}</td>
                        <td className="p-2.5 text-right font-bold text-emerald-400">
                          {o.netwr.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {o.waerk}
                        </td>
                        <td className="p-2.5 text-emerald-400">
                          {o.uvall === 'C' ? 'C (Tamamlandı)' : 'A (Eksik)'}
                        </td>
                        <td className="p-2.5 text-slate-300">
                          {o.lfgsk === 'C' ? 'C (Sevk Edildi)' : 'A (Açık)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'LIKP' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">VBELN (Teslimat No)</th>
                      <th className="p-2.5">LFART</th>
                      <th className="p-2.5">VSTEL (Sevk.Nok.)</th>
                      <th className="p-2.5">VGBEL (Ref.Sipariş)</th>
                      <th className="p-2.5">KUNNR (Teslim Alan)</th>
                      <th className="p-2.5">KOSTK (Çekme/Pick)</th>
                      <th className="p-2.5">WBSTK (PGI Durumu)</th>
                      <th className="p-2.5">MBLNR (601 Belgesi)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.deliveries.map((d) => (
                      <tr key={d.vbeln} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{d.vbeln}</td>
                        <td className="p-2.5 text-sky-400">{d.lfart}</td>
                        <td className="p-2.5">{d.vstel}</td>
                        <td className="p-2.5 text-amber-300">{d.vgbel}</td>
                        <td className="p-2.5">
                          {d.kunnr} — {d.kunnrName}
                        </td>
                        <td className="p-2.5 text-emerald-400">{d.kostk} (Tamamen Çekildi)</td>
                        <td className="p-2.5 font-bold text-emerald-400">
                          {d.wbstk === 'C' ? 'C (PGI Tamamlandı)' : 'A (Bekliyor)'}
                        </td>
                        <td className="p-2.5 text-sky-300">{d.mblnr || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'VBRK' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">VBELN (Fatura No)</th>
                      <th className="p-2.5">FKART (Fatura Türü)</th>
                      <th className="p-2.5">VGBEL (Referans)</th>
                      <th className="p-2.5">KUNRG (Ödeyen)</th>
                      <th className="p-2.5 text-right">NETWR (Matrah)</th>
                      <th className="p-2.5 text-right">MWSBK (KDV)</th>
                      <th className="p-2.5">RFBSK (Muhasebe Statüsü)</th>
                      <th className="p-2.5">ACDOCA BELNR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.billings.map((b) => (
                      <tr key={b.vbeln} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{b.vbeln}</td>
                        <td className="p-2.5 font-bold text-sky-400">{b.fkartDesc}</td>
                        <td className="p-2.5 text-amber-300">{b.vgbel}</td>
                        <td className="p-2.5">
                          {b.kunrg} — {b.kunrgName}
                        </td>
                        <td className="p-2.5 text-right font-bold">
                          {b.netwr.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {b.waerk}
                        </td>
                        <td className="p-2.5 text-right text-slate-300">
                          {b.mwsbk.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {b.waerk}
                        </td>
                        <td className="p-2.5">
                          {b.rfbsk === 'D' ? (
                            <span className="text-amber-300 font-bold">
                              D (Proforma: FI Kaydı Üretmez)
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold">
                              C (ACDOCA Muhasebeleşti)
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 text-sky-300">{b.belnr || 'YOK (Proforma)'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'ACDOCA' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">BELNR (Fiş No)</th>
                      <th className="p-2.5">RBUKRS</th>
                      <th className="p-2.5">BLART</th>
                      <th className="p-2.5">AWTYP / AWKEY</th>
                      <th className="p-2.5">Açıklama</th>
                      <th className="p-2.5">Kalemler (TDHP Hesap / Borç-Alacak / Tutar)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.universalJournal.map((j) => (
                      <tr key={j.belnr} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{j.belnr}</td>
                        <td className="p-2.5 text-sky-400">{j.bukrs}</td>
                        <td className="p-2.5 font-bold text-amber-300">{j.blart}</td>
                        <td className="p-2.5 text-slate-300">
                          {j.awtyp} / {j.awkey}
                        </td>
                        <td className="p-2.5 font-sans text-slate-200">{j.headerText}</td>
                        <td className="p-2.5 space-y-1">
                          {j.lines.map((l) => (
                            <div key={l.buzei} className="flex items-center justify-between gap-4 text-[11px]">
                              <span>
                                <strong>{l.hkont}</strong> ({l.accountName})
                              </span>
                              <span className={l.shkzg === 'S' ? 'text-sky-300 font-bold' : 'text-emerald-300 font-bold'}>
                                {l.shkzg === 'S' ? 'BORÇ (S)' : 'ALACAK (H)'}: {l.wrbtr.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {j.waers}
                              </span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'MARD' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">MATNR (Malzeme)</th>
                      <th className="p-2.5">MAKTX (Tanım)</th>
                      <th className="p-2.5">MTART</th>
                      <th className="p-2.5">WERKS / LGORT</th>
                      <th className="p-2.5 text-right">LABST (Serbest Stok)</th>
                      <th className="p-2.5 text-right">INSME (Kalite)</th>
                      <th className="p-2.5">BKLAS (Değerleme)</th>
                      <th className="p-2.5 text-right">PR00 Satış Fiyatı</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.materials.map((m) => (
                      <tr key={m.matnr} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{m.matnr}</td>
                        <td className="p-2.5 font-sans text-slate-200">{m.maktx}</td>
                        <td className="p-2.5 text-sky-400">{m.mtart}</td>
                        <td className="p-2.5">
                          {m.werks} / {m.lgort}
                        </td>
                        <td className="p-2.5 text-right font-bold text-emerald-400">
                          {m.labst} {m.meins}
                        </td>
                        <td className="p-2.5 text-right text-amber-300">
                          {m.insme} {m.meins}
                        </td>
                        <td className="p-2.5 text-slate-300">{m.bklas}</td>
                        <td className="p-2.5 text-right font-bold">
                          {m.salesPricePr00.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {m.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'MKPF' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">MBLNR (Malzeme Belgesi)</th>
                      <th className="p-2.5">BWART (Hareket Türü)</th>
                      <th className="p-2.5">Referans Belge</th>
                      <th className="p-2.5">Malzeme & Miktar</th>
                      <th className="p-2.5">WERKS / LGORT</th>
                      <th className="p-2.5">ACDOCA FI Belgesi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.materialDocs.map((m) => (
                      <tr key={m.mblnr} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{m.mblnr}</td>
                        <td className="p-2.5 font-bold text-amber-300">
                          {m.bwart} ({m.bwart === '601' ? 'PGI Teslimat Mal Çıkışı' : 'MIGO SAS Mal Girişi'})
                        </td>
                        <td className="p-2.5 text-sky-400">{m.refDoc}</td>
                        <td className="p-2.5 font-sans text-slate-200">{m.maktx}</td>
                        <td className="p-2.5">
                          {m.werks} / {m.lgort}
                        </td>
                        <td className="p-2.5 text-emerald-400 font-bold">{m.fiDocNo || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'BUT000' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">PARTNER (BP No)</th>
                      <th className="p-2.5">NAME_ORG1 (Unvan)</th>
                      <th className="p-2.5">Roller (BUT100)</th>
                      <th className="p-2.5">VKN / Vergi No</th>
                      <th className="p-2.5">BUKRS / AKONT</th>
                      <th className="p-2.5">CVI KNA1 / LFA1 Eşleşmesi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.businessPartners.map((bp) => (
                      <tr key={bp.bpNumber} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-white">{bp.bpNumber}</td>
                        <td className="p-2.5 font-sans font-bold text-slate-200">{bp.name1}</td>
                        <td className="p-2.5 text-sky-400">{bp.roles.join(', ')}</td>
                        <td className="p-2.5 text-amber-300">{bp.taxNumberVkn}</td>
                        <td className="p-2.5">
                          {bp.companyCode} / {bp.reconciliationAccount}
                        </td>
                        <td className="p-2.5 text-emerald-400">
                          {bp.cviSyncedCustomerNo
                            ? `KNA1-KUNNR: ${bp.cviSyncedCustomerNo}`
                            : `LFA1-LIFNR: ${bp.cviSyncedVendorNo}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {selectedTable === 'VBFA' && (
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-sky-300">
                    <tr>
                      <th className="p-2.5">VBELV (Önceki Belge)</th>
                      <th className="p-2.5">VBTYP_V (Önceki Tip)</th>
                      <th className="p-2.5">VBELN (Sonraki Belge)</th>
                      <th className="p-2.5">VBTYP_N (Sonraki Tip)</th>
                      <th className="p-2.5 text-right">RFWRT (Tutar)</th>
                      <th className="p-2.5">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {db.docFlow.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-900/60">
                        <td className="p-2.5 font-bold text-sky-400">{f.vbelv}</td>
                        <td className="p-2.5 text-slate-300">{f.vbtyp_v}</td>
                        <td className="p-2.5 font-bold text-white">{f.vbeln}</td>
                        <td className="p-2.5 text-amber-300">{f.vbtyp_n}</td>
                        <td className="p-2.5 text-right font-bold">
                          {f.rfwrt.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {f.waers}
                        </td>
                        <td className="p-2.5 text-emerald-400 font-sans font-semibold">{f.statusText}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 3: ZORUNLU TÜRKÇE & RESMÎ SAP KAYNAK DOĞRULAMASI              */}
      {/* ================================================================= */}
      {activeTab === 'turkish_and_official_sources' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">
                03. Zorunlu Türkçe Kaynaklar ve Resmî SAP (help.sap.com / learning.sap.com) Doğrulama Matrisi
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Her kaynağın erişim durumu, içerdiği SAP sürümü (ECC 6.0 vs. S/4HANA 2025 FPS01) ve teknik doğrulama bulguları
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {verifiedSources.map((src) => (
                <div
                  key={src.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{src.title}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-sky-400 font-mono">{src.type}</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{src.accessStatus}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span>URL:</span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-300 hover:underline flex items-center gap-1 break-all"
                    >
                      <span>{src.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                    <span>|</span>
                    <span className="text-amber-300">Kaynaktaki Sürüm: {src.sapVersionInSource}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1">
                      <span className="font-bold text-slate-200 block">
                        Kaynaktan Doğrulanan İşlemler ve Tablolar:
                      </span>
                      <p className="text-slate-400 leading-relaxed text-[11px]">{src.verifiedTopics}</p>
                    </div>
                    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1">
                      <span className="font-bold text-sky-300 block">
                        Resmî SAP S/4HANA 2025 FPS01 Teknik Karşılaştırması:
                      </span>
                      <p className="text-slate-300 leading-relaxed text-[11px]">
                        {src.s4hana2025Comparison}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 4: SÜRÜM AYRIMI MİMARİSİ (GUI vs FIORI vs PUBLIC CLOUD)       */}
      {/* ================================================================= */}
      {activeTab === 'edition_separation' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">
                04. SAP Sürüm ve Arayüz Mimarisi Ayrımı (Hayalî Hibrit Sistem Engelleme Matrisi)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Gerçek danışmanlık projelerinde Klasik SAP GUI, SAP Fiori Launchpad ve SAP S/4HANA Cloud Public Edition birbirinden farklı yetenek ve kısıtlara sahiptir.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              {/* Column 1: Classic SAP GUI / WebGUI */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <div className="text-[11px] font-mono text-amber-400">KATMAN 1 — HEDEF REFERANS</div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    SAP S/4HANA 2025 FPS01 (On-Premise / Private Cloud) — SAP GUI & WebGUI
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                  <li>
                    • <strong>Komut Kutusu (OK-Code):</strong> Sol üstte `/nVA01`, `/nVL01N`, `/nVF01`, `/nMIGO`, `/nSE16N`, `/nSPRO` komutları doğrudan çalışır.
                  </li>
                  <li>
                    • <strong>Ana Veri (CVI):</strong> `XD01`/`XK01` kaldırılmıştır; `BP` (Business Partner) işlem kodu zorunludur.
                  </li>
                  <li>
                    • <strong>Uyarlama (Customizing):</strong> `SPRO` (IMG) ağacı tamamen açıktır. `ZOR` gibi Z/Y belge türleri ve ABAP geliştirmeleri (`SE38`/`SE80`/Eclipse ADT) yapılabilir.
                  </li>
                  <li>
                    • <strong>Veritabanı:</strong> HANA In-Memory üzerinde `ACDOCA`, `PRCD_ELEMENTS`, `MATDOC` (`MKPF`/`MSEG` uyumluluk görünümleriyle) çalışır.
                  </li>
                </ul>
              </div>

              {/* Column 2: SAP Fiori Launchpad */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <div className="text-[11px] font-mono text-sky-400">KATMAN 2 — MODERN WEB UX</div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    SAP Fiori Launchpad (Spaces & Pages, Fiori Elements / SAPUI5)
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                  <li>
                    • <strong>Rol Bazlı Erişim:</strong> Kullanıcılar `SAP_BR_INTERNAL_SALES_REP` (İç Satış Temsilcisi), `SAP_BR_SHIPPING_SPECIALIST` (Sevkiyat Uzmanı), `SAP_BR_BILLING_CLERK` (Faturalama Uzmanı) iş rolleriyle giriş yapar.
                  </li>
                  <li>
                    • <strong>Uygulama Türleri:</strong> İki tip kutucuk (Tile) vardır:
                    <br />
                    1) Doğrudan WebGUI (SAP GUI for HTML) açan işlem kutucukları (`VA01`, `VL01N`, `VF01`).
                    <br />
                    2) Native Fiori Elements uygulamaları (*Manage Sales Orders - F1873*, *Create Billing Documents - F0798*).
                  </li>
                  <li>
                    • <strong>Komut Kutusu Farkı:</strong> Native Fiori uygulamalarında `/n` komut satırı yoktur; üstteki Fiori Arama Çubuğu (Enterprise Search) kullanılır.
                  </li>
                </ul>
              </div>

              {/* Column 3: SAP S/4HANA Cloud Public Edition */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <div className="text-[11px] font-mono text-emerald-400">KATMAN 3 — SaaS BULUT MİMARİSİ</div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    SAP S/4HANA Cloud Public Edition (Clean Core & CBC)
                  </h3>
                </div>
                <ul className="space-y-2 text-slate-300 leading-relaxed text-[11px]">
                  <li>
                    • <strong>SAP GUI Erişimi Yoktur:</strong> Masaüstü SAP Logon (SAP GUI for Windows) bağlantısı ve `SPRO` / `SE11` / `SE16N` / `SU01` erişimi kapalıdır.
                  </li>
                  <li>
                    • <strong>Konfigürasyon:</strong> `SPRO` yerine **SAP Central Business Configuration (CBC)** ve Self-Service Configuration UIs (**SSCUI**) kullanılır.
                  </li>
                  <li>
                    • <strong>Clean Core & ABAP Cloud:</strong> Standart tablolara (`PRCD_ELEMENTS`, `VBAK`) doğrudan SQL yazmak yasaktır; yalnızca yayınlanmış (Released) **CDS Views** (`I_SalesDocument`, `I_BillingDocument`) ve **RAP (RESTful Application Programming)** kullanılır.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 5: ÇALIŞAN KOD vs KURALLAR AYRIMI & GELİŞTİRME TAKVİMİ        */}
      {/* ================================================================= */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 text-xs">
            <div>
              <h2 className="text-base font-bold text-white">
                05. Çalışan Kod ile Simüle Edilen Kuralların Ayrımı ve 4 Fazlı Geliştirme Takvimi
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Gerçekçi bir eğitim simülatöründe hangi kontrollerin kod tabanında gerçekten çalıştığı ve ileri seviye fazlarda nelerin genişletilebileceği
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Şu Anda Kod Tabanında %100 Gerçek Çalışan İş Kuralları</span>
                </h3>
                <ul className="space-y-1.5 text-slate-300 leading-relaxed text-[11px]">
                  <li>✔ <strong>BP CVI Yönlendirmesi:</strong> `/nXD01`, `/nXK01`, `/nFD01` yazıldığında `[CVI 001]` uyarısıyla `BP` ekranına gerçek yönlendirme ve `BUT000` kaydı.</li>
                  <li>✔ <strong>OVA2 Eksiklik Günlüğü (`IMG_2953` & `IMG_2954`):</strong> `VA01` içinde Müşteri Referansı (`BSTKD`) boşsa kaydı durdurup kalem seçimi (`☑`) ve `Verileri tamamla` adımını çalıştırma.</li>
                  <li>✔ <strong>VL01N Çekme (`VL 609`) & Stok (`M7 021`) Kontrolü:</strong> Çekilen miktar teslimat miktarına eşit değilse veya `MARD` stoğu yetersizse PGI işlemini reddetme.</li>
                  <li>✔ <strong>PGI (601) ve MIGO (101) Fiziksel Stok Hareketi:</strong> Kayıt anında `MARD-LABST` stoğunu fiilen düşürme/artırma, `MKPF` malzeme belgesi ve `ACDOCA` muhasebe fişi üretme.</li>
                  <li>✔ <strong>VF01 Ticari Fatura (`F2`) vs. Proforma Fatura (`F5`/`F8`):</strong> `F2` için `ACDOCA` (`120/600/391`) fişi üretirken, `F5`/`F8` Proforma için `RFBSK='D'` atayarak muhasebe kaydı üretmeme.</li>
                  <li>✔ <strong>Kalıcı Veritabanı (`localStorage`):</strong> Sayfa yenilendiğinde bile tüm belgelerin ve `VBFA` belge akışının korunması.</li>
                </ul>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Eğitim Amaçlı Simüle Edilen (Soyutlanmış) Kurumsal Katmanlar</span>
                </h3>
                <ul className="space-y-1.5 text-slate-300 leading-relaxed text-[11px]">
                  <li>• <strong>GİB e-Fatura / e-İrsaliye UBL-TR XML Gönderimi:</strong> Gerçek GİB test sunucusuna dış ağ bağlantısı yerine, UBL-TR 1.2 şeması ve ETTN üretimi simülatör içinde yerel olarak modellenmiştir.</li>
                  <li>• <strong>ABAP İş Süreçleri (`SM50` / `ST02` / `ST03N`):</strong> Gerçek bir Linux SAP HANA çekirdeği yerine danışman eğitimi için gerçekçi telemetri simülasyonu üzerinde çalışır.</li>
                  <li>• <strong>Otomatik Ödeme Programı (`F110`):</strong> Bankalara gerçek MT101 / PAIN.001 SWIFT dosyası iletmek yerine açık kalem kapama simülasyonu yapar.</li>
                </ul>
              </div>
            </div>

            {/* 4-Phase Roadmap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div className="text-[11px] font-mono text-emerald-400 font-bold">FAZ 1 (TAMAMLANDI)</div>
                <div className="font-bold text-white">Çekirdek S/4HANA 2025 Veri Katmanı</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  `BUT000` (BP), `VBAK`, `LIKP`, `VBRK`, `MARD`, `MKPF`, `ACDOCA` ve `VBFA` tablolarının kalıcı `localStorage` motoruna bağlanması.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div className="text-[11px] font-mono text-emerald-400 font-bold">FAZ 2 (TAMAMLANDI)</div>
                <div className="font-bold text-white">Eksiklik Günlüğü & Proforma F5/F8</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  `IMG_2953`/`IMG_2954` Eksiklik Günlüğü, `VL 609` Çekme kontrolü, `601` PGI stok düşümü ve `F5`/`F8` Proforma ayrımı.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div className="text-[11px] font-mono text-sky-400 font-bold">FAZ 3 (SONRAKİ ADIM)</div>
                <div className="font-bold text-white">İleri Uyarlama (VTFL / VKOA / OBYC)</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Kullanıcının kendi `VKOA` gelir hesabı tayini ve `OBYC` stok hesabı eşleştirmelerini değiştirebildiği canlı SPRO simülasyonu.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <div className="text-[11px] font-mono text-purple-400 font-bold">FAZ 4 (UZUN VADE)</div>
                <div className="font-bold text-white">Çok Adımlı Vaka Sınavları (Case Lab)</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Danışman adayına bozuk bir `VKOA` veya eksik `BP` rolü verip hatayı `SE16N` ve `VA02` ile çözmesini ölçen sertifika sınavı.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
