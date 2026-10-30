/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAPModuleId, CoordinateMap, ArrowStep, TransactionSimulation } from '../types/sap';

export interface ModuleInfo {
  id: SAPModuleId;
  name: string;
  fullName: string;
  badge: string;
  description: string;
  leadTCode: string;
  tCodes: string[];
}

export const SAP_MODULES: Record<SAPModuleId, ModuleInfo> = {
  SD: {
    id: 'SD',
    name: 'SAP SD',
    fullName: 'Satış ve Dağıtım (Sales & Distribution)',
    badge: 'Öncelikli Eğitim Modülü',
    description: 'Müşteri teklifinden siparişe, sevkiyattan e-Fatura ve e-İrsaliye kesimine kadar tüm satış döngüsü.',
    leadTCode: 'VA01',
    tCodes: ['VA01', 'VL01N', 'VF01', 'VA03'],
  },
  MM: {
    id: 'MM',
    name: 'SAP MM',
    fullName: 'Malzeme Yönetimi & Satın Alma (Materials Management)',
    badge: 'Depo & Tedarik Zinciri',
    description: 'Malzeme kartı açılışından satın alma siparişi, MIGO mal kabulü ve MIRO satıcı faturası girişine tam süreç.',
    leadTCode: 'MM01',
    tCodes: ['MM01', 'ME21N', 'MIGO', 'MIRO'],
  },
  FI: {
    id: 'FI',
    name: 'SAP FI',
    fullName: 'Mali Muhasebe (Financial Accounting)',
    badge: 'Mali Tablolar & TDHP',
    description: 'Tekdüzen hesap planı, FB50 mahsup fişi, FB60 satıcı faturası, FB70 müşteri faturası ve KDV tevkifatı.',
    leadTCode: 'FB50',
    tCodes: ['FB50', 'FB60', 'FB70', 'F-53'],
  },
  CO: {
    id: 'CO',
    name: 'SAP CO',
    fullName: 'Maliyet Muhasebesi ve Kontrol (Controlling)',
    badge: 'Karlılık & Masraf Yeri',
    description: 'Masraf yerleri, iç siparişler, CO-PA karlılık analizi ve ürün maliyetlendirme döngüsü.',
    leadTCode: 'KS01',
    tCodes: ['KS01', 'KSB1', 'KO01', 'KE30'],
  },
  PP: {
    id: 'PP',
    name: 'SAP PP',
    fullName: 'Üretim Planlama ve Kontrol (Production Planning)',
    badge: 'Fabrika & MRP İmalat',
    description: 'Ürün ağaçları (BOM), iş yerleri, MRP çalıştırma, CO01 üretim siparişi ve CO11N operasyon teyidi.',
    leadTCode: 'CO01',
    tCodes: ['CO01', 'MD04', 'CS01', 'CO11N'],
  },
  QM: {
    id: 'QM',
    name: 'SAP QM',
    fullName: 'Kalite Yönetimi & Laboratuvar (Quality Management)',
    badge: 'Giriş & Proses Kalite',
    description: 'Kalite muayene partisi oluşturma, QA32 ile inceleme, test sonuç girişi ve QA11 kullanım kararı (UD).',
    leadTCode: 'QA32',
    tCodes: ['QA32', 'QA11', 'QA01', 'QE01'],
  },
  PM: {
    id: 'PM',
    name: 'SAP PM',
    fullName: 'Bakım Onarım & Varlık Yönetimi (Plant Maintenance)',
    badge: 'Tesis & Arıza Bakımı',
    description: 'Ekipman sicil kartları, IW21 arıza bildirimleri, IW31 planlı/arızi iş emri ve teknisyen sevk süreci.',
    leadTCode: 'IW31',
    tCodes: ['IW31', 'IW21', 'IE01', 'IW38'],
  },
  WM: {
    id: 'WM',
    name: 'SAP WM/EWM',
    fullName: 'Depo Yönetimi & Antrepo (Extended Warehouse)',
    badge: 'Raf Adresleme & Rampa',
    description: 'Yüksek raflı depo yönetimi, LT01 transfer siparişi ve /SCWM/MON ile rampa/antrepo monitörü.',
    leadTCode: 'LT01',
    tCodes: ['LT01', '/SCWM/MON', 'LS01N', 'LT03'],
  },
  HCM: {
    id: 'HCM',
    name: 'SAP HCM',
    fullName: 'İnsan Kaynakları & Bordro (Human Capital Management)',
    badge: 'Özlük, SGK & Bordro',
    description: 'PA30 personel özlük dosyası bakımı, PA40 işe giriş hareketi ve Türkiye SGK/bordro uyumu.',
    leadTCode: 'PA30',
    tCodes: ['PA30', 'PA40', 'PA20', 'PT60'],
  },
  PS: {
    id: 'PS',
    name: 'SAP PS',
    fullName: 'Proje Sistemi & Yatırım Yönetimi (Project System)',
    badge: 'WBS & Yatırım Bütçesi',
    description: 'Büyük ölçekli projeler, CJ20N Proje Panosu, WBS (İş Kırılım Yapısı) ve bütçe maliyet takibi.',
    leadTCode: 'CJ20N',
    tCodes: ['CJ20N', 'CJ01', 'CJ30', 'CJ88'],
  },
  BASIS: {
    id: 'BASIS',
    name: 'SAP BASIS',
    fullName: 'Sistem İdaresi & ABAP (Basis Architecture & ABAP)',
    badge: 'Yetki, Güvenlik & DB',
    description: 'SU01 kullanıcı ve rol atama, SM50 iş süreçleri, ST02 bellek akordu, ST03N iş yükü analizi, ST06 sistem monitörü ve SE11 veri sözlüğü.',
    leadTCode: 'SM50',
    tCodes: ['SM50', 'ST02', 'ST03N', 'ST06', 'SU01', 'SE11', 'ST22', 'SM12', 'SM59'],
  },
  FICO: {
    id: 'FICO',
    name: 'SAP FICO',
    fullName: 'Finans ve Maliyet Muhasebesi (FI + CO)',
    badge: 'Mali Tablolar & TDHP',
    description: 'Genel muhasebe, satıcı faturası, müşteri faturası, masraf yerleri ve yasal mizan dengesi.',
    leadTCode: 'FB50',
    tCodes: ['FB50', 'FB60', 'FB70', 'F-53'],
  },
};

// -------------------------------------------------------------
// COORDINATE MAPS (Kelime ile Çizilmiş Ekran Röntgeni Haritaları)
// -------------------------------------------------------------
export const COORDINATE_MAPS: Record<string, CoordinateMap> = {
  // SAP SD: VA01
  VA01: {
    title: 'Müşteri Siparişi Girişi',
    tCode: 'VA01',
    turkishName: 'Satış Siparişi Yarat',
    englishName: 'Create Sales Order',
    screenAnatomy: {
      commandBar: 'Ekranın en sol üst köşesinde beyaz yatay kutucuk (/nVA01 yazılır, yanındaki yeşil yuvarlak onay ikonuna basılır veya klavyeden Enter tuşuna basılır).',
      topRightButtons: [
        { label: 'Kaydet (Save)', color: 'Gümüş Gri üzerinde Mavi Disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Tüm siparişi doğrular ve sistemde kalıcı 10 haneli sipariş numarasını (Örn: 0000014205) üretir.' },
        { label: 'Geri (Back)', color: 'Yeşil daire içinde sola bakan beyaz ok', shortcut: 'F3', actionDescription: 'Değişiklikleri kaydetmeden bir önceki ekrana veya ana menüye döner.' },
        { label: 'Çıkış (Exit)', color: 'Sarı daire içinde yukarı bakan beyaz ok', shortcut: 'Shift + F3', actionDescription: 'İşlemi iptal edip tamamen ana SAP ekranına atar.' },
        { label: 'İptal (Cancel)', color: 'Kırmızı daire içinde beyaz X ikonu', shortcut: 'F12', actionDescription: 'Mevcut belge girişini siler/iptal eder.' },
      ],
      leftPanel: 'Başlangıç ekranında sol panel boştur; merkezde "Satış Verileri" kutusu yer alır. Belge içine girildiğinde kalem ağacı sol kenarda açılabilir.',
      centerForm: {
        mandatoryFields: [
          { name: 'Sipariş Türü', technicalName: 'VBAK-AUART', location: 'Ekranın tam ortasında, ilk açılan popup/sayfanın en üstünde', whyMandatory: 'Sisteme hangi satış sürecini çalıştıracağını söyler (ZOR: Standart Türkiye Siparişi, OR: Standart Sipariş).', sampleValue: 'ZOR (veya OR)' },
          { name: 'Satış Örgütü', technicalName: 'VBAK-VKORG', location: 'Sipariş Türünün hemen altında sol blok', whyMandatory: 'Siparişi hangi tüzel şirketin kestiğini belirler.', sampleValue: '1000 (TR Merkez)' },
          { name: 'Dağıtım Kanalı', technicalName: 'VBAK-VTWEG', location: 'Satış Örgütünün bir alt satırı', whyMandatory: 'Satışın toptan mı perakende mi internet mi olduğunu ayırır.', sampleValue: '10 (Toptan Satış)' },
          { name: 'Bölüm', technicalName: 'VBAK-SPART', location: 'Dağıtım Kanalının hemen altı', whyMandatory: 'Ürün grubunu (Örn: Elektronik, Kimya) belirler.', sampleValue: '00 (Genel Bölüm)' },
          { name: 'Sipariş Veren', technicalName: 'KUAG-KUNNR', location: 'Enter sonrası ana ekranın sol üst başlık bloğunda', whyMandatory: 'Faturanın ve borcun kime gideceğini belirleyen Müşteri Cari Kodudur.', sampleValue: '100021 (Koçak Lojistik A.Ş.)' },
        ],
        tabs: ['Satış (Sales)', 'Kalem Özeti (Item Overview)', 'Kalem Detayı (Item Detail)', 'Sipariş Veren Verisi', 'Sevkiyat (Shipping)', 'Faturalama (Billing/e-Invoice)'],
        tableColumns: ['Kalem (Item)', 'Malzeme Kodu (Material)', 'Sipariş Miktarı (Order Qty)', 'SU (Satış Birimi)', 'Net Fiyat (Price)', 'Tutar (Amount)', 'Tesis (Plant)'],
      },
      bottomStatusBar: 'Ekranın en alt sol kenarındaki tek satırlık koyu gri/beyaz şerit. Başarılı kayıtta yeşil onay çekiyle "Standart sipariş 14205 kaydedildi" yazar. Zorunlu alan boşsa kırmızı ikon ile durdurur.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Ekran iki aşamalı bir kapıdır. İlk kapıda sadece 4 kutu var (Sipariş Türü ZOR, 1000, 10, 00). Enter\'a bastığın an devasa sipariş masası açılır. Sol üstte müşteriyi yazarsın (100021), ortadaki ızgara tabloya malzemeyi (MAT-01) ve adedi yazıp sağ üstteki mavi diskete (Ctrl+S) basarsın.',
  },

  // SAP SD: VL01N
  VL01N: {
    title: 'Giden Teslimat Oluşturma & Mal Çıkışı (PGI)',
    tCode: 'VL01N',
    turkishName: 'Siparişle Birlikte Giden Teslimat Yarat',
    englishName: 'Outbound Delivery with Order Reference',
    screenAnatomy: {
      commandBar: 'Sol üstteki beyaz komut satırına /nVL01N yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Mal Çıkışını Kaydet (Post Goods Issue - PGI)', color: 'Mavi kamyon veya yeşil onay ikonu (Araç çubuğunda)', shortcut: 'Ctrl + Shift + F11', actionDescription: 'En kritik tuş! Stok miktarını depodan fiilen düşer ve otomatik Muhasebe Mal Maliyeti fişini üretir.' },
        { label: 'Kaydet', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Teslimat belgesini saklar.' },
      ],
      leftPanel: 'Sevkiyat birimleri ve palet listesi (varsa) sol kenarda hiyerarşik ağaç olarak listelenir.',
      centerForm: {
        mandatoryFields: [
          { name: 'Sevkiyat Noktası', technicalName: 'LIKP-VSTEL', location: 'Başlangıç ekranının en üstündeki ilk kutu', whyMandatory: 'Ürünün hangi fabrika veya liman rampasından çıkacağını belirler.', sampleValue: '1000 (Gebze Fabrika Rampası)' },
          { name: 'Seçim Tarihi', technicalName: 'LEDAT', location: 'Sevkiyat noktasının hemen sağında', whyMandatory: 'Depodaki toplama (picking) tarihini gösterir.', sampleValue: 'Bugünün Tarihi' },
          { name: 'Sipariş Numarası', technicalName: 'VBAK-VBELN', location: 'Referans bloğunda sol ortada', whyMandatory: 'Hangi satış siparişinin sevk edileceğini gösterir.', sampleValue: '0000014205' },
          { name: 'Çekme Miktarı (Pick Qty)', technicalName: 'LIPS-PIKMG', location: 'Teslimat ana ekranında "Toplama" (Picking) sekmesinde', whyMandatory: 'Sipariş edilen miktardan depoda kaç adedin fiilen toplanıp paletlendiğini belirtir.', sampleValue: '10 ST' },
        ],
        tabs: ['Kalem Özeti', 'Toplama (Picking)', 'Yükleme (Loading)', 'Taşıma (Transport/e-İrsaliye)', 'Durum Özeti'],
        tableColumns: ['Kalem', 'Malzeme', 'Teslimat Miktarı', 'Toplanan Miktar', 'Depo Yeri (LGORT)', 'Birim'],
      },
      bottomStatusBar: 'Alt barda: "Giden teslimat 80001923 kaydedildi" veya mal çıkışı yapıldıysa "Mal çıkışı kaydedildi (Muhasebe belgesi oluşturuldu)".',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Depo kapısındasın, tır yanaşmış. VL01N ekranında sipariş numaranı giriyorsun. İçeri girdiğinde "Toplama (Picking)" sekmesine tıklayıp depodan çıkan adedi yazıyorsun. Ardından üst menüdeki "Mavi Kamyon / Mal Çıkışını Kaydet" butonuna basıyorsun. Ürün stoktan düşüyor, e-İrsaliye tetikleniyor!',
  },

  // SAP SD: VF01
  VF01: {
    title: 'Müşteri Faturalama & e-Fatura Gönderimi',
    tCode: 'VF01',
    turkishName: 'Fatura Belgesi Yarat',
    englishName: 'Create Billing Document',
    screenAnatomy: {
      commandBar: 'Komut satırına /nVF01 yazılır ve Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet (Fatura Kes)', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Faturayı üretir, finans (FI) modülüne 120 Müşteriler ve 600 Gelir kayıtlarını atar, GİB e-Fatura kuyruğuna gönderir.' },
        { label: 'Muhasebeye Bırak (Release to Accounting)', color: 'Yeşil bayrak ikonu (Fatura içinde)', shortcut: 'Shift + F4', actionDescription: 'Fatura bloke ise muhasebeye otomatik aktarımı tetikler.' },
      ],
      leftPanel: 'Varsayılan olarak boştur.',
      centerForm: {
        mandatoryFields: [
          { name: 'Belge (Teslimat No)', technicalName: 'VBRP-VGBEL', location: 'Tablonun ilk satırındaki giriş hücresi', whyMandatory: 'Mal çıkışı tamamlanmış teslimatın numarasını (Örn: 80001923) referans alır.', sampleValue: '80001923' },
          { name: 'Fatura Türü', technicalName: 'VBRK-FKART', location: 'Üst sol alanda opsiyonel/varsayılan', whyMandatory: 'Standart fatura mı, iade mi, e-Arşiv mi olduğunu belirler.', sampleValue: 'F2 (Standart Ticari Fatura)' },
        ],
        tabs: ['Fatura Başlığı', 'Kalem Listesi', 'Muhasebe Verileri', 'e-Dönüşüm / GİB'],
      },
      bottomStatusBar: 'Alt barda: "Belge 90004512 kaydedildi (Muhasebe belgesi oluşturuldu)" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Bilgisayar başında muhasebecisin. VF01 yazıp az önce depodan çıkan teslimat numarasını (80001923) tabloya yapıştırıp Enter\'a basıyorsun. Ekran tutarları ve KDV\'yi hesaplıyor, mavi diskete (Ctrl+S) basıyorsun. Fatura kesiliyor ve eşzamanlı olarak Türkiye e-Fatura sistemiyle entegre oluyor.',
  },

  // SAP SD: VA03
  VA03: {
    title: 'Sipariş Görüntüleme & Belge Akışı (Document Flow)',
    tCode: 'VA03',
    turkishName: 'Satış Siparişi Görüntüle',
    englishName: 'Display Sales Order',
    screenAnatomy: {
      commandBar: '/nVA03 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Belge Akışı (Document Flow)', color: 'Sol üstte birbirine bağlı 3 beyaz kutu simgesi', shortcut: 'F5', actionDescription: 'Siparişten teslimata, faturadan banka tahsilatına kadar tüm zinciri ağaç yapısında gösterir.' },
        { label: 'Durum Özeti', color: 'Şapka / Belge başlığı ikonu', shortcut: 'Shift + F1', actionDescription: 'Siparişin onay, blokaj ve teslimat durumunu açar.' },
      ],
      leftPanel: 'Belge akışında hiyerarşik sipariş ağacı açılır.',
      centerForm: {
        mandatoryFields: [
          { name: 'Sipariş Numarası', technicalName: 'VBAK-VBELN', location: 'Ortadaki tek beyaz giriş kutusu', whyMandatory: 'İncelenmek istenen siparişin 10 haneli numarası.', sampleValue: '0000014205' },
        ],
        tabs: ['Satış', 'Kalem Özeti', 'Başlık Detayları'],
      },
      bottomStatusBar: 'Siparişin kilitli olup olmadığını veya salt okunur görüntülendiğini bildirir.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: "Bu sipariş nerede kaldı?" sorusuna tek tıkla cevap veren dedektif ekranı. VA03 yaz, numarayı gir, F5 (Belge Akışı) butonuna bas. Sipariş ➡️ Teslimat ➡️ Fatura ➡️ Muhasebe Belgesi zincirini yeşil onaylarla gör.',
  },

  // SAP MM: MM01
  MM01: {
    title: 'Malzeme Ana Kaydı Yaratma',
    tCode: 'MM01',
    turkishName: 'Malzeme Yarat (Genel)',
    englishName: 'Create Material',
    screenAnatomy: {
      commandBar: '/nMM01 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Görünüm Seçimi (Select Views)', color: 'Ekranın ortasındaki diyalogda onay butonu', shortcut: 'Enter', actionDescription: 'Malzemenin hangi departmanlar (Temel veriler, Satın alma, Muhasebe) tarafından kullanılacağını seçtirir.' },
        { label: 'Kaydet', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Yeni malzeme kartını kaydeder.' },
      ],
      leftPanel: 'Başlangıçta boştur; görünümler seçildikten sonra sekmeler üst şeritte sıralanır.',
      centerForm: {
        mandatoryFields: [
          { name: 'Sektör (Industry Sector)', technicalName: 'RMMG1-MBRSH', location: 'Başlangıç ekranının ikinci kutucuğu', whyMandatory: 'Malzemenin makine, kimya, gıda veya perakende sektörüne ait olduğunu belirler.', sampleValue: 'M (Makine İmalatı)' },
          { name: 'Malzeme Türü (Material Type)', technicalName: 'RMMG1-MTART', location: 'Sektörün hemen altındaki üçüncü kutucuk', whyMandatory: 'Hammadde mi (ROH), Mamul mü (FERT), Ticari mal mı (HAWA) olduğunu belirler.', sampleValue: 'ROH (Hammadde)' },
          { name: 'Malzeme Tanımı (Kısa Metin)', technicalName: 'MAKT-MAKTX', location: 'Temel Veriler 1 sekmesinde en üst geniş kutu', whyMandatory: 'Ürünün insan tarafından okunabilen adı.', sampleValue: 'Paslanmaz Çelik Vida M8x30' },
          { name: 'Temel Ölçü Birimi', technicalName: 'MARA-MEINS', location: 'Malzeme tanımının hemen alt solunda', whyMandatory: 'Stokun metre, adet, kg veya koli olarak tutulacağını belirler.', sampleValue: 'ST (Adet)' },
          { name: 'Değerleme Sınıfı (Valuation Class)', technicalName: 'MBEW-BKLAS', location: 'Muhasebe 1 sekmesinde ortada', whyMandatory: 'Muhasebede hangi 150/153 stok hesabına otomatik bağlanacağını belirler.', sampleValue: '3000 (Hammadde Hesabı)' },
        ],
        tabs: ['Temel Veriler 1', 'Satın Alma', 'Genel Tesis/Depo Verileri 1', 'Muhasebe 1', 'Maliyetlendirme 1'],
      },
      bottomStatusBar: 'Alt barda: "Malzeme MAT-TURK-01 yaratıldı" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Şirkete yeni bir vida veya telefon tanıtıyorsun. MM01 yazıyorsun. Önce sektör ve türünü (ROH/FERT) seçiyorsun. Açılan sekme menüsünden "Temel Veriler, Satın Alma, Depo, Muhasebe" sekmelerine onay verip kutuları dolduruyor ve kaydediyorsun.',
  },

  // SAP MM: ME21N
  ME21N: {
    title: 'Satın Alma Siparişi Yaratma (SAS)',
    tCode: 'ME21N',
    turkishName: 'Satın Alma Siparişi Yarat',
    englishName: 'Create Purchase Order',
    screenAnatomy: {
      commandBar: '/nME21N yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet', color: 'Standart mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Satın alma siparişini oluşturur (Örn: 4500018901).' },
        { label: 'Kontrol Et (Check)', color: 'Üst çubukta büyüteç veya yeşil onay ikonu', shortcut: 'Ctrl + F2', actionDescription: 'Eksik veya hatalı alan olup olmadığını denetler.' },
      ],
      leftPanel: 'Belge Özeti (Document Overview) paneli: Geçmiş siparişler, talepler ve sözleşmeler ağaç şeklinde yer alır.',
      centerForm: {
        mandatoryFields: [
          { name: 'Satıcı (Vendor)', technicalName: 'EKKO-LIFNR', location: 'Başlık (Header) alanında en üst solda', whyMandatory: 'Malzemenin kimden tedarik edileceğini belirler.', sampleValue: '200045 (Ege Çelik A.Ş.)' },
          { name: 'Satın Alma Örgütü', technicalName: 'EKKO-EKORG', location: 'Başlık > Organizasyonel Veriler sekmesinde', whyMandatory: 'Pazarlığı yapan satın alma departmanını belirler.', sampleValue: '1000' },
          { name: 'Satın Alma Grubu', technicalName: 'EKKO-EKGRP', location: 'Organizasyonel verilerin hemen altı', whyMandatory: 'Satın almacı uzman kodunu belirler.', sampleValue: '001' },
          { name: 'Şirket Kodu', technicalName: 'EKKO-BUKRS', location: 'Organizasyonel veriler sağ sütunu', whyMandatory: 'Mali tüzel kişiliği belirler.', sampleValue: 'TR01' },
        ],
        tabs: ['Başlık (Header)', 'Kalem Özeti (Item Overview)', 'Kalem Detayı (Item Detail)'],
        tableColumns: ['Kalem', 'Malzeme No', 'Kısa Metin', 'Sipariş Miktarı', 'Ölçü Birimi', 'Net Fiyat', 'Teslimat Tarihi', 'Tesis (WERKS)', 'Depo Yeri (LGORT)'],
      },
      bottomStatusBar: 'Alt barda: "Standart SAS 4500018901 numarası altında yaratıldı" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: 3 katlı bir ekran binası düşün. En üst kat Başlık (Kime sipariş veriyoruz: Satıcı 200045). Orta kat Izgara Masa (Ne alıyoruz: 50 Adet Çelik Vida, Birim fiyatı 120 TL). Alt kat Kalem Detayı (Hangi depoya gidecek: Tesis 1000, Depo 0001). Üstteki büyüteçle kontrol et, diskete bas kaydet!',
  },

  // SAP MM: MIGO
  MIGO: {
    title: 'Mal Kabulü (Depoya Giriş - Hareket Türü 101)',
    tCode: 'MIGO',
    turkishName: 'Mal Hareketi / Mal Kabulü',
    englishName: 'Goods Movement / Goods Receipt',
    screenAnatomy: {
      commandBar: '/nMIGO yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet (Post)', color: 'Üst araç çubuğunda yeşil onaylı mavi disket', shortcut: 'Ctrl + S', actionDescription: 'Stok miktarını arttırır, muhasebe belgesi üretir.' },
        { label: 'Kontrol Et (Check)', color: 'Gözlük/Onay ikonu', shortcut: 'F7', actionDescription: 'Belgeyi doğrular.' },
      ],
      leftPanel: 'Son işlemler ve bekleyen belgeler sol panelde görüntülenebilir.',
      centerForm: {
        mandatoryFields: [
          { name: 'İşlem Seçici 1', technicalName: 'GOHEAD-ACTION', location: 'Ekranın EN SOL ÜSTÜNDE ilk açılır kutu', whyMandatory: 'Sisteme ne yapacağını söyler: "A01 Mal Kabulü" seçilmelidir.', sampleValue: 'A01 Mal Kabulü' },
          { name: 'Referans Seçici 2', technicalName: 'GOHEAD-REFDOC', location: 'A01 kutusunun hemen yanındaki ikinci açılır kutu', whyMandatory: 'Neye istinaden mal alındığını söyler: "R01 Satın Alma Siparişi".', sampleValue: 'R01 Satın Alma Siparişi' },
          { name: 'SAS Numarası', technicalName: 'GOHEAD-EBELN', location: 'A01 ve R01 kutularının sağındaki beyaz giriş kutusu', whyMandatory: 'Gelen malın sipariş numarası (Örn: 4500018901).', sampleValue: '4500018901' },
          { name: 'İrsaliye No (e-İrsaliye)', technicalName: 'GOHEAD-LFSNR', location: 'Genel başlık verilerinde "İrsaliye" alanı', whyMandatory: 'Tedarikçinin getirdiği fiziksel veya e-İrsaliye numarası.', sampleValue: 'IRS202600004123' },
          { name: 'Kalem Tamam (Item OK)', technicalName: 'GOITEM-TAKE_IT', location: 'EN KRİTİK ALAN! Alt detay panelinde veya tablonun en sağındaki onay kutucuğu', whyMandatory: 'BU KUTU İŞARETLENMEZSE SAP ASLA KAYDETMEZ! "Bu kalemi saydım, depoma alıyorum" onayıdır.', sampleValue: '☑ Onaylı (Checked)' },
        ],
        tabs: ['Genel', 'Malzeme', 'Miktar', 'Nereye (Tesis/Depo)', 'Satın Alma Sipariş Verisi'],
      },
      bottomStatusBar: 'Alt barda: "Malzeme belgesi 5000031201 kaydedildi" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Depodasın, forklift kapıda. MIGO açılır. Sol üstte iki kutu var: A01 ve R01. Yanına 4500018901 yazıp Enter\'a basıyorsun. Sipariş ekrana dökülüyor. Malları sayıyorsun, ekranın altındaki KÜÇÜK "Kalem Tamam (Item OK)" kutusunu işaretliyorsun. Ardından üstteki Kaydet butonuna basıyorsun. Bu kutuyu işaretlemeyi unutan stajyerler saatlerce hata arar!',
  },

  // SAP MM: MIRO
  MIRO: {
    title: 'Gelen Satıcı Faturası Girişi (Lojistik Fatura Doğrulama)',
    tCode: 'MIRO',
    turkishName: 'Lojistik Fatura Doğrulama',
    englishName: 'Enter Incoming Invoice',
    screenAnatomy: {
      commandBar: '/nMIRO yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet (Post)', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Faturayı kaydeder, satıcı cari hesabına (320) borç/alacak kaydeder.' },
        { label: 'Simüle Et (Simulate)', color: 'Hesap makinesi / Gözlük ikonu', shortcut: 'F9', actionDescription: 'Muhasebe mahsup maddelerini önceden gösterir.' },
      ],
      leftPanel: 'Boştur.',
      centerForm: {
        mandatoryFields: [
          { name: 'Fatura Tarihi', technicalName: 'INVFO-BLDAT', location: 'Sol üstte Temel Veriler sekmesinin ilk kutusu', whyMandatory: 'Tedarikçinin e-Faturasındaki resmi tarih.', sampleValue: 'Bugünün Tarihi' },
          { name: 'Tutar (Amount)', technicalName: 'INVFO-WRBTR', location: 'Fatura tarihinin bir alt satırı', whyMandatory: 'KDV dahil fatura toplam tutarı.', sampleValue: '72.000,00 TRY' },
          { name: 'Vergiyi Hesapla (Calculate Tax)', technicalName: 'INVFO-XMWST', location: 'Tutar kutusunun hemen sağındaki onay kutucuğu (Checkbox)', whyMandatory: 'İşaretlendiğinde sistem KDV\'yi otomatik hesaplar ve sağ üstteki bakiye ışığını yeşile çevirir.', sampleValue: '☑ Onaylı (Checked)' },
          { name: 'Referans SAS No', technicalName: 'INVFO-EBELN', location: 'Orta panelde "Satın Alma Siparişi / Çizelgeleme" kutusu', whyMandatory: 'MIGO mal kabulü yapılmış sipariş numarası.', sampleValue: '4500018901' },
        ],
        tabs: ['Temel Veriler', 'Ödeme', 'Vergi / Stopaj', 'İletişim'],
      },
      bottomStatusBar: 'Sağ üstte Bakiye Işığı vardır: Kırmızı ise borç/alacak tutarsızdır, Yeşil ise 0,00 fark vardır ve kaydedilebilir.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Tedarikçiden e-Fatura geldi. MIRO açtın. Fatura tarihini ve toplam tutarı yazdın. Yanındaki "Vergiyi Hesapla" kutusunu tıkladın. Aşağıya sipariş numarasını yazdın. Sağ üstteki trafik lambasına baktın: YEŞİL yanıyor (Fark: 0,00 TL). Hemen Kaydet\'e basıp satıcıya borç kaydını attın.',
  },

  // SAP FICO: FB50
  FB50: {
    title: 'Genel Muhasebe Belgesi / Mahsup Fişi Girişi (G/L Account Posting)',
    tCode: 'FB50',
    turkishName: 'G/L Hesap Kalemi Girişi',
    englishName: 'Enter G/L Account Document',
    screenAnatomy: {
      commandBar: '/nFB50 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet (Post)', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Mahsup fişini defterikebire işler ve 10 haneli yevmiye no verir.' },
        { label: 'Simüle Et', color: 'Gözlük / İki sayfa ikonu', shortcut: 'F9', actionDescription: 'Borç ve alacak toplamlarının eşitliğini kontrol ettirir.' },
        { label: 'Şirket Kodu Değiştir', color: 'Bina / Şirket ikonu', shortcut: 'F7', actionDescription: 'TR01 veya başka bir şirket koduna geçiş yapar.' },
      ],
      leftPanel: 'Şablonlar ve park edilmiş taslak belgeler sol kenarda yer alır.',
      centerForm: {
        mandatoryFields: [
          { name: 'Belge Tarihi', technicalName: 'BKPF-BLDAT', location: 'Başlık alanında sol üst ilk kutu', whyMandatory: 'Yevmiye kaydının resmi işlem tarihidir.', sampleValue: 'Bugünün Tarihi' },
          { name: 'Para Birimi', technicalName: 'BKPF-WAERS', location: 'Tarihin sağında', whyMandatory: 'İşlemin para birimi (TRY, USD, EUR).', sampleValue: 'TRY' },
          { name: 'G/L Hesap (Borç)', technicalName: 'BSEG-HKONT', location: 'Tablonun ilk satırının ilk hücresi', whyMandatory: 'Borçlandırılacak Tekdüzen Hesap Kodu.', sampleValue: '770000 (Genel Yönetim Giderleri)' },
          { name: 'Borç/Alacak Göstergesi', technicalName: 'BSEG-SHKZG', location: 'G/L hesabın hemen sağ sütunu', whyMandatory: 'İlgili satırın Borç (Debit / S) mu Alacak (Credit / H) mi olduğunu söyler.', sampleValue: 'Borç (Debit)' },
          { name: 'Tutar', technicalName: 'BSEG-WRBTR', location: 'Borç/Alacak sütununun sağı', whyMandatory: 'Satır tutarı.', sampleValue: '15.000,00' },
          { name: 'G/L Hesap (Alacak)', technicalName: 'BSEG-HKONT', location: 'Tablonun ikinci satırı', whyMandatory: 'Alacaklandırılacak Tekdüzen Hesap Kodu.', sampleValue: '102000 (Bankalar - Ticari Mevduat)' },
        ],
        tabs: ['Temel Veriler', 'Detaylar'],
        tableColumns: ['G/L Hesabı', 'Borç/Alacak', 'Tutar', 'Vergi Kodu', 'Masraf Yeri (KOSTL)', 'Metin'],
      },
      bottomStatusBar: 'Sağ üst köşede Bakiye Trafik Işığı bulunur: Borç = Alacak ise YEŞİL (Bakiye: 0,00). Fark varsa KIRMIZI.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Çift taraflı muhasebe terazisi. Sol kefe Borç, sağ kefe Alacak. FB50\'de tabloya 1. satır: 770 Genel Yönetim Gideri (Borç 15.000 TL), 2. satır: 102 Bankalar (Alacak 15.000 TL). Sağ üstteki terazi ışığı yeşile döndüğü an Ctrl+S ile deftere kaydet.',
  },

  // SAP FICO: FB60
  FB60: {
    title: 'Satıcı Faturası Girişi (Accounts Payable)',
    tCode: 'FB60',
    turkishName: 'Satıcı Faturası Girişi',
    englishName: 'Enter Vendor Invoice',
    screenAnatomy: {
      commandBar: '/nFB60 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet (Post)', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Satıcı faturasını kaydeder.' },
        { label: 'Simüle Et', color: 'Gözlük ikonu', shortcut: 'F9', actionDescription: 'Kayıt öncesi borç/alacak dağılımını gösterir.' },
      ],
      leftPanel: 'Park edilmiş faturalar ve açık satıcı listesi.',
      centerForm: {
        mandatoryFields: [
          { name: 'Satıcı (Vendor Cari)', technicalName: 'INVFO-ACCNT', location: 'Üst sol alandaki ilk geniş kutu', whyMandatory: 'Borçlanılacak 320 Satıcı Cari Kodu.', sampleValue: '320001 (Yıldız Hukuk Danışmanlık)' },
          { name: 'Fatura Tarihi', technicalName: 'INVFO-BLDAT', location: 'Satıcının alt satırı', whyMandatory: 'Gelen faturanın teftiş tarihi.', sampleValue: 'Bugünün Tarihi' },
          { name: 'Tutar', technicalName: 'INVFO-WRBTR', location: 'Tarihin altındaki kalın çerçeveli alan', whyMandatory: 'KDV dahil ödenecek toplam borç.', sampleValue: '24.000,00 TRY' },
          { name: 'Vergiyi Hesapla', technicalName: 'INVFO-XMWST', location: 'Tutarın sağındaki kutucuk', whyMandatory: 'KDV (%20) ve varsa tevkifatı otomatik hesaplar.', sampleValue: '☑ Onaylı' },
          { name: 'Karşı Gider Hesabı', technicalName: 'BSEG-HKONT', location: 'Alt tablonun ilk sütunu', whyMandatory: 'Hizmetin muhasebeleşeceği gider hesabı.', sampleValue: '770020 (Müşavirlik Giderleri)' },
        ],
        tabs: ['Temel Veriler', 'Ödeme', 'Vergi', 'Stopaj / Tevkifat'],
      },
      bottomStatusBar: 'Alt barda: "1900002134 numaralı belge TR01 şirket kodunda kaydedildi" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Şirkete avukattan danışmanlık faturası geldi. Malzeme değil, doğrudan gider. FB60 yaz. Satıcı kutusuna 320 avukat cari kodunu yaz, tutarı yaz, Vergiyi Hesapla kutusunu işaretle. Aşağıdaki tabloya 770 gider kodunu yazıp kaydet.',
  },

  // SAP FICO: FB70
  FB70: {
    title: 'Müşteri Faturası Girişi (Accounts Receivable)',
    tCode: 'FB70',
    turkishName: 'Müşteri Faturası Girişi',
    englishName: 'Enter Customer Invoice',
    screenAnatomy: {
      commandBar: '/nFB70 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kaydet (Post)', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Müşteri alacağını (120) ve geliri (600) kaydeder.' },
      ],
      leftPanel: 'Müşteri açık kalemleri.',
      centerForm: {
        mandatoryFields: [
          { name: 'Müşteri (Customer Cari)', technicalName: 'INVFO-ACCNT', location: 'Üst sol alandaki ilk geniş kutu', whyMandatory: 'Alacaklanılacak 120 Müşteri Cari Kodu.', sampleValue: '120005 (Anadolu Endüstri A.Ş.)' },
          { name: 'Fatura Tarihi', technicalName: 'INVFO-BLDAT', location: 'Müşterinin alt satırı', whyMandatory: 'Faturanın resmi düzenleme tarihi.', sampleValue: 'Bugünün Tarihi' },
          { name: 'Tutar', technicalName: 'INVFO-WRBTR', location: 'Tarihin altındaki alan', whyMandatory: 'KDV dahil tahsil edilecek tutar.', sampleValue: '60.000,00 TRY' },
          { name: 'Karşı Gelir Hesabı', technicalName: 'BSEG-HKONT', location: 'Alt tablonun ilk hücresi', whyMandatory: 'Gelir hesabı kodu.', sampleValue: '600010 (Yurtiçi Satışlar Geliri)' },
        ],
        tabs: ['Temel Veriler', 'Ödeme', 'Vergi'],
      },
      bottomStatusBar: 'Alt barda: "1800005401 numaralı belge TR01 şirket kodunda kaydedildi" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Müşteriye danışmanlık veya doğrudan hizmet faturası kesiyorsun (SD modülü olmadan doğrudan finans üzerinden). FB70 yaz. Müşteri (120) kodunu ve tutarı yaz. Karşı tarafa 600 Gelir hesabını yazıp mavi diskete bas.',
  },

  // SAP FICO: F-53
  'F-53': {
    title: 'Satıcıya Ödeme Yapma & Açık Kalem Dengeleme (Clear Vendor)',
    tCode: 'F-53',
    turkishName: 'Çıkan Ödeme Girişi',
    englishName: 'Post Outgoing Payments',
    screenAnatomy: {
      commandBar: '/nF-53 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Açık Kalemleri İşle (Process Open Items)', color: 'Sağ alt veya üstte mavi buton', shortcut: 'Enter / F7', actionDescription: 'Satıcının henüz ödenmemiş faturalarını listeler.' },
        { label: 'Kaydet', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Bankadan para çıkışını ve satıcı faturasının kapatılmasını tamamlar.' },
      ],
      leftPanel: 'Boştur.',
      centerForm: {
        mandatoryFields: [
          { name: 'Belge Tarihi', technicalName: 'BKPF-BLDAT', location: 'Başlıkta sol üst', whyMandatory: 'Banka dekont tarihi.', sampleValue: 'Bugünün Tarihi' },
          { name: 'Banka Hesabı', technicalName: 'BSEG-HKONT', location: 'Banka Verileri bloğu', whyMandatory: 'Paranın hangi banka hesabından (102) çıktığı.', sampleValue: '102010 (Garanti Ticari TL)' },
          { name: 'Ödeme Tutarı', technicalName: 'BSEG-WRBTR', location: 'Banka hesabının altı', whyMandatory: 'Ödenen net meblağ.', sampleValue: '24.000,00 TRY' },
          { name: 'Satıcı Hesap No', technicalName: 'KONTO', location: 'Açık Kalem Seçimi bloğu', whyMandatory: 'Kimin faturasının kapatılacağı (320 Cari).', sampleValue: '320001' },
        ],
        tabs: ['Ödeme Başlığı', 'Açık Kalem Listesi'],
      },
      bottomStatusBar: 'Atanan Tutar = Girilen Tutar olduğunda fark 0,00 TL olur ve kayıt tamamlanır.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Borcumuzu ödüyoruz. F-53 açtın. Bankamızı yazdın (102 Garanti), tutarı yazdın (24.000 TL), satıcıyı yazdın (320001). "Açık Kalemleri İşle" butonuna bastın. Ekrandaki faturanın üzerine çift tıkladın (kalem mavi oldu). Fark sıfırlandı, Kaydet butonuna bastın. Fatura kapandı!',
  },

  // SAP PP: CO01
  CO01: {
    title: 'Üretim Siparişi Yaratma (İmalat Emri)',
    tCode: 'CO01',
    turkishName: 'Üretim Siparişi Yarat',
    englishName: 'Create Production Order',
    screenAnatomy: {
      commandBar: '/nCO01 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Serbest Bırak (Release)', color: 'Yeşil üçgen / Bayrak ikonu', shortcut: 'Ctrl + F1', actionDescription: 'Üretim emrini fabrikaya serbest bırakır (REL statüsü), malzeme rezervasyonlarını kilitler.' },
        { label: 'Kaydet', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Üretim siparişini kalıcı olarak numaralandırır (Örn: 1000845).' },
      ],
      leftPanel: 'Operasyon ve bileşen ağacı.',
      centerForm: {
        mandatoryFields: [
          { name: 'Malzeme', technicalName: 'AFPO-MATNR', location: 'Başlangıç ekranının ilk kutusu', whyMandatory: 'Hangi mamulün üretileceğini belirler.', sampleValue: 'MAT-01 (Akıllı Kontrol Modülü)' },
          { name: 'Üretim Tesisi', technicalName: 'CAUFVD-WERKS', location: 'Malzemenin hemen altı', whyMandatory: 'Hangi fabrikada üretileceğini belirler.', sampleValue: '1000 (Gebze Fabrikası)' },
          { name: 'Sipariş Türü', technicalName: 'AUFPAR-AUFART', location: 'Sağ üst kutu', whyMandatory: 'Standart üretim mi (PP01), fason mu olduğunu ayırır.', sampleValue: 'PP01 (Standart İmalat)' },
          { name: 'Toplam Miktar', technicalName: 'GAMNG', location: 'Detay ekranı Genel sekmesinde', whyMandatory: 'Kaç adet üretileceği.', sampleValue: '50 ST' },
        ],
        tabs: ['Genel Veriler', 'Operasyonlar (Rotalar)', 'Bileşenler (BOM Reçetesi)', 'Maliyetlendirme'],
      },
      bottomStatusBar: 'Alt barda: "1000845 numaralı sipariş kaydedildi" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Fabrika şefisin. CO01 yazıp mamul kodunu (MAT-01) ve Tesis 1000 yazıyorsun. Sistem otomatik olarak ürünün reçetesini (BOM) ve tezgahlardaki operasyonlarını çeker. Miktarı (50 Adet) girip Serbest Bırak ve Kaydet\'e basarsın. Fabrikada makineler çalışmaya başlar!',
  },

  // SAP PP: MD04
  MD04: {
    title: 'Stok / Gereksinim Listesi (MRP Kokpiti)',
    tCode: 'MD04',
    turkishName: 'Dinamik Stok / İhtiyaç Listesi',
    englishName: 'Stock / Requirements List',
    screenAnatomy: {
      commandBar: '/nMD04 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Yenile (Refresh)', color: 'İki dönen ok ikonu', shortcut: 'F5', actionDescription: 'Stok hareketlerini ve siparişleri anlık günceller.' },
      ],
      leftPanel: 'Malzeme listesi ve tesis ağacı.',
      centerForm: {
        mandatoryFields: [
          { name: 'Malzeme', technicalName: 'DISPO-MATNR', location: 'İlk kutu', whyMandatory: 'Hangi malzemenin stok durumu incelenecek.', sampleValue: 'MAT-01' },
          { name: 'Tesis', technicalName: 'DISPO-WERKS', location: 'İkinci kutu', whyMandatory: 'Tesis kodu.', sampleValue: '1000' },
        ],
        tabs: ['Gereksinim Listesi', 'MRP Unsurları Tablosu'],
      },
      bottomStatusBar: 'Net kullanılabilir stok ve emniyet stoğu dökümü.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Depoda kaç mal var, ne kadar satış siparişi gelmiş, fabrika ne kadar üretecek? Hepsi tek bir kronolojik tabloda: Mevcut Stok ➡️ Eksi Müşteri Siparişi ➡️ Artı Üretim Siparişi. Stok eksiye düşerse kırmızı yanar!',
  },

  // SAP QM: QA32
  QA32: {
    title: 'Kalite Muayene Partileri İnceleme & İşleme Listesi',
    tCode: 'QA32',
    turkishName: 'Muayene Partisi Seçimi',
    englishName: 'Inspection Lot Selection',
    screenAnatomy: {
      commandBar: '/nQA32 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Kullanım Kararı (Usage Decision)', color: 'Sarı terazi ikonu', shortcut: 'Ctrl + F1', actionDescription: 'Seçili partiyi inceleyip Kabul / Ret kararı vermeye götürür.' },
        { label: 'Sonuçlar (Results)', color: 'Mavi dosya ikonu', shortcut: 'F2', actionDescription: 'Laboratuvar ölçüm değerlerini açar.' },
      ],
      leftPanel: 'Açık partiler filtre kriterleri.',
      centerForm: {
        mandatoryFields: [
          { name: 'Tesis', technicalName: 'WERKS', location: 'Seçim ekranında üstte', whyMandatory: 'Kalite kontrolünün yapılacağı tesis.', sampleValue: '1000' },
          { name: 'Muayene Türü', technicalName: 'ART', location: 'Ortada', whyMandatory: 'Giriş kalite (01) veya üretim kalitesi (04).', sampleValue: '01 (Mal Kabul Muayenesi)' },
        ],
        tabs: ['Açık Partiler Izgarası'],
      },
      bottomStatusBar: 'Seçilen kriterlere uygun muayene partisi listelendi.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Beyaz önlüklü laboratuvar şefisin. QA32 açıyorsun, Tesis 1000 yazıp çalıştırıyorsun. Karşına depoda bekleyen kamyonların getirdiği partiler çıkıyor. Seçip sarı terazi butonuna basarak kalite onayını veriyorsun.',
  },

  // SAP PM: IW31
  IW31: {
    title: 'Bakım ve Onarım İş Emri Yaratma',
    tCode: 'IW31',
    turkishName: 'Bakım Siparişi Yarat',
    englishName: 'Create Maintenance Order',
    screenAnatomy: {
      commandBar: '/nIW31 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Serbest Bırak (Release)', color: 'Yeşil bayrak ikonu', shortcut: 'Ctrl + F1', actionDescription: 'Teknisyene iş emrini verir ve yedek parçayı depodan çektirir.' },
        { label: 'Kaydet', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Bakım siparişini kalıcı numaralandırır.' },
      ],
      leftPanel: 'Ekipman hiyerarşisi.',
      centerForm: {
        mandatoryFields: [
          { name: 'Sipariş Türü', technicalName: 'AUFART', location: 'Başlangıçta ilk kutu', whyMandatory: 'Arıza bakımı (PM01) mı planlı periyodik bakım (PM02) mi.', sampleValue: 'PM01 (Düzeltici Arıza Bakımı)' },
          { name: 'Ekipman', technicalName: 'EQUIPMENT', location: 'İkinci kutu', whyMandatory: 'Bozulan makinenin sicil kodu.', sampleValue: 'CNC-1002 (2 No\'lu Freze)' },
          { name: 'Tesis', technicalName: 'IWERK', location: 'Üçüncü kutu', whyMandatory: 'Bakım tesisi.', sampleValue: '1000' },
        ],
        tabs: ['Başlık', 'Operasyonlar', 'Bileşenler (Yedek Parça)', 'Maliyetler'],
      },
      bottomStatusBar: 'Alt barda: "4000189 numaralı sipariş kaydedildi" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Fabrikada CNC tezgahından duman çıktı. IW31 açıyorsun, sipariş türü PM01, ekipman CNC-1002 yazıyorsun. Operasyonlar sekmesine "Rulman Değişimi", Bileşenlere "1 Adet Rulman SKF-6205" yazıp kaydediyorsun. Teknisyen depodan rulmanı alıp makineyi tamir ediyor.',
  },

  // SAP BASIS: SU01
  SU01: {
    title: 'Kullanıcı Bakımı & Rol Atama (User Administration)',
    tCode: 'SU01',
    turkishName: 'Kullanıcı Bakımı',
    englishName: 'User Maintenance',
    screenAnatomy: {
      commandBar: '/nSU01 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Yarat (Create)', color: 'Beyaz sayfa ikonu', shortcut: 'F8', actionDescription: 'Yeni kullanıcı sicili oluşturur.' },
        { label: 'Kaydet', color: 'Mavi disket ikonu', shortcut: 'Ctrl + S', actionDescription: 'Kullanıcıyı ve yetkilerini aktifleştirir.' },
      ],
      leftPanel: 'Boştur.',
      centerForm: {
        mandatoryFields: [
          { name: 'Kullanıcı Adı', technicalName: 'USR02-BNAME', location: 'İlk kutu', whyMandatory: 'SAP giriş kimliği.', sampleValue: 'BERKE.ERGEN' },
          { name: 'Soyadı', technicalName: 'ADDR3_VAL-NAME_LAST', location: 'Adres sekmesinde', whyMandatory: 'Kullanıcının gerçek kimliği.', sampleValue: 'Ergen' },
          { name: 'Rol', technicalName: 'AGR_USERS-AGR_NAME', location: 'Roller sekmesinde ilk satır', whyMandatory: 'Hangi T-Code\'ları çalıştırmaya yetkisi olduğu.', sampleValue: 'Z_SD_SALES_TR' },
        ],
        tabs: ['Adres', 'Oturum Açma Verileri', 'Roller', 'Profiller', 'Parametreler'],
      },
      bottomStatusBar: 'Alt barda: "BERKE.ERGEN kullanıcısı yaratıldı" - Yeşil ikon.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: Şirkete yeni bir satış uzmanı işe başladı. Bilgi İşlem odasındasın. SU01 yazıyorsun. Kullanıcı adını girip şifresini belirliyorsun. Roller sekmesinden "Z_SD_SATIS" rolünü seçip diskete basıyorsun. Kullanıcı artık sisteme girip fatura ve sipariş kesebiliyor.',
  },

  // SAP ABAP: SE11
  SE11: {
    title: 'ABAP Veri Sözlüğü (ABAP Data Dictionary)',
    tCode: 'SE11',
    turkishName: 'ABAP Sözlüğü',
    englishName: 'ABAP Dictionary',
    screenAnatomy: {
      commandBar: '/nSE11 yazılır, Enter\'a basılır.',
      topRightButtons: [
        { label: 'Görüntüle (Display)', color: 'Gözlük ikonu', shortcut: 'F7', actionDescription: 'Tablo yapısını, alanları ve veri tiplerini açar.' },
      ],
      leftPanel: 'Boştur.',
      centerForm: {
        mandatoryFields: [
          { name: 'Veritabanı Tablosu', technicalName: 'DDOBJNAME', location: 'İlk radyo butonu altındaki kutu', whyMandatory: 'İncelenecek şeffaf tablo (Örn: VBAK - Sipariş Başlık, MARA - Malzeme, BKPF - Muhasebe).', sampleValue: 'VBAK (Satış Belgesi Başlık Tablosu)' },
        ],
        tabs: ['Alanlar (Fields)', 'Giriş Yardımı/Kontrol', 'Para Birimi/Miktar'],
      },
      bottomStatusBar: 'Tablonun HANA veri tabanındaki fiziksel alan tanımları listelenir.',
    },
    mentalVisualizationTip: 'Gözünde canlandır: SAP\'nin kalbindeki veri tabanına röntgen çekiyorsun. SE11 yaz, Veritabanı Tablosu kutusuna VBAK yaz ve Görüntüle\'ye bas. Karşına siparişin arkasındaki tüm SQL alanları çıkar: VBELN (Sipariş No), ERDAT (Kayıt Tarihi), NETWR (Net Değer). Bütün SAP bu tablolarda yaşar!',
  },
};

// -------------------------------------------------------------
// ARROW FORMULAS (Ok İşaretleriyle Hızlı Formüller)
// -------------------------------------------------------------
export const ARROW_FORMULAS: Record<string, ArrowStep> = {
  VA01: {
    tCode: 'VA01',
    processTitle: 'Müşteri Satış Siparişi Yaratma Süreci',
    quickFormula: 'VA01 ➡️ Sipariş Türü: ZOR ➡️ 1000/10/00 ➡️ Enter ➡️ Müşteri: 100021 ➡️ Kalemler: MAT-01 & Miktar ➡️ Kaydet [Ctrl+S]',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nVA01', description: 'Komut kutusuna yaz ve Enter tuşuna bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Sipariş Türü: ZOR', description: 'Türkiye standart sipariş türünü gir (Standart: OR veya kurumsal ZOR).', turkeyContext: 'TR şirketlerinde çoğunlukla ZOR kullanılır.' },
      { stepNumber: 3, actionType: 'field', text: 'Satış Dağıtım Alanı', description: 'Satış Örgütü: 1000 ➡️ Dağıtım Kanalı: 10 ➡️ Bölüm: 00 alanlarını doldur.' },
      { stepNumber: 4, actionType: 'button', text: 'Yeşil Onay / Enter', description: 'Ana sipariş detay ekranına geçiş yap.', shortcut: 'Enter' },
      { stepNumber: 5, actionType: 'field', text: 'Sipariş Veren: 100021', description: 'Müşteri cari kodunu sol üstteki alana yaz.' },
      { stepNumber: 6, actionType: 'tab', text: 'Sekme: Kalem Özeti', description: 'Tabloda Malzeme No (MAT-TURK-01) ve Sipariş Miktarını (10 ST) gir.' },
      { stepNumber: 7, actionType: 'button', text: 'Kaydet Butonu', description: 'Sağ üstteki mavi diskete tıkla veya Ctrl+S yap.', shortcut: 'Ctrl + S', turkeyContext: 'Kayıtla birlikte e-Fatura profili atanır.' },
      { stepNumber: 8, actionType: 'verify', text: 'Durum Çubuğunu Kontrol Et', description: 'Alt barda yeşil "Standart sipariş 14205 kaydedildi" mesajını teyit et.' },
    ],
  },
  VL01N: {
    tCode: 'VL01N',
    processTitle: 'Giden Teslimat & Mal Çıkışı (PGI) Akışı',
    quickFormula: 'VL01N ➡️ Sevkiyat Noktası: 1000 ➡️ Sipariş No Gir ➡️ Enter ➡️ Toplama Sekmesi ➡️ Çekme Miktarı Yaz ➡️ Mal Çıkışını Kaydet (PGI)',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nVL01N', description: 'Komut satırına yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Sevkiyat Noktası: 1000', description: 'Ürünün çıkacağı fabrika/depo sevkiyat noktasını yaz.' },
      { stepNumber: 3, actionType: 'field', text: 'Sipariş No: 14205', description: 'VA01\'de oluşturulan sipariş numarasını referans gir.' },
      { stepNumber: 4, actionType: 'button', text: 'Enter', description: 'Teslimat belgesi detayına gir.' },
      { stepNumber: 5, actionType: 'tab', text: 'Sekme: Toplama (Picking)', description: 'Üstteki sekmelerden "Toplama" sekmesine tıkla.' },
      { stepNumber: 6, actionType: 'field', text: 'Çekme Mik. (Pick Qty): 10', description: 'Depodan toplanan fiili miktarı ve Depo Yeri: 0001 bilgisini gir.' },
      { stepNumber: 7, actionType: 'button', text: 'Mal Çıkışını Kaydet (PGI)', description: 'Araç çubuğundaki mavi kamyon / yeşil onay ikonuna bas.', shortcut: 'Ctrl + Shift + F11', turkeyContext: 'Bu buton GİB e-İrsaliye belgesini otomatik tetikler.' },
    ],
  },
  VF01: {
    tCode: 'VF01',
    processTitle: 'Müşteri Faturası Kesme & e-Fatura Süreci',
    quickFormula: 'VF01 ➡️ Teslimat No Yapıştır ➡️ Enter ➡️ Tutarları İncele ➡️ Kaydet [Ctrl+S] ➡️ GİB e-Fatura Kuyruğu',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nVF01', description: 'Komut satırına /nVF01 yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Belge No: 80001923', description: 'VL01N ile oluşturulan giden teslimat numarasını ilk satıra yaz.' },
      { stepNumber: 3, actionType: 'button', text: 'Enter', description: 'Fatura simülasyonunu ve KDV hesaplamasını ekrana getir.' },
      { stepNumber: 4, actionType: 'verify', text: 'KDV (%20) Kontrolü', description: 'Türkiye KDV oranını ve genel toplamı doğrula.', turkeyContext: 'Müşteri e-Fatura mükellefi ise Ticari/Temel e-Fatura olarak etiketlenir.' },
      { stepNumber: 5, actionType: 'button', text: 'Kaydet Butonu', description: 'Mavi disket ikonuna bas.', shortcut: 'Ctrl + S' },
      { stepNumber: 6, actionType: 'verify', text: 'Muhasebe Belgesi Teyidi', description: 'Alt barda "Belge 90004512 kaydedildi (Muhasebe belgesi oluşturuldu)" mesajını gör.' },
    ],
  },
  MM01: {
    tCode: 'MM01',
    processTitle: 'Malzeme Kartı Açılış Akışı',
    quickFormula: 'MM01 ➡️ Sektör & Malzeme Türü: ROH ➡️ Enter ➡️ Görünüm Seç (Temel, Satınalma, Depo, Muhasebe) ➡️ Tesis: 1000 ➡️ Verileri Gir ➡️ Kaydet',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nMM01', description: 'Komut satırına yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Sektör: M, Tür: ROH', description: 'Sektörü Makine, Malzeme Türünü ROH (Hammadde) seç.' },
      { stepNumber: 3, actionType: 'button', text: 'Görünümleri Seç', description: 'Enter\'a bas, açılan pencereden Temel Veriler 1, Satın Alma, Depo 1, Muhasebe 1 sekmelerini işaretle.' },
      { stepNumber: 4, actionType: 'field', text: 'Organizasyon Düzeyleri', description: 'Tesis: 1000, Depo Yeri: 0001 yaz ve yeşil tike bas.' },
      { stepNumber: 5, actionType: 'field', text: 'Kısa Metin & Ölçü Birimi', description: 'Malzemenin adını ve temel ölçü birimini (ST - Adet) gir.' },
      { stepNumber: 6, actionType: 'tab', text: 'Muhasebe 1 Sekmesi', description: 'Değerleme Sınıfı: 3000 ve Fiyat Kontrolü: V (Hareketli Ortalama) gir.' },
      { stepNumber: 7, actionType: 'button', text: 'Kaydet', description: 'Ctrl+S ile kartı tamamla.', shortcut: 'Ctrl + S' },
    ],
  },
  ME21N: {
    tCode: 'ME21N',
    processTitle: 'Satın Alma Siparişi (SAS) Verme Akışı',
    quickFormula: 'ME21N ➡️ Satıcı: 200045 ➡️ Org: 1000/001/TR01 ➡️ Kalemler: Malzeme + Miktar + Fiyat ➡️ Tesis: 1000 ➡️ Büyüteç Kontrol ➡️ Kaydet',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nME21N', description: 'Komut kutusuna /nME21N yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Satıcı Kodu: 200045', description: 'Başlık (Header) satıcı alanına tedarikçi cari kodunu yaz.' },
      { stepNumber: 3, actionType: 'tab', text: 'Başlık > Organizasyonel Veriler', description: 'Satın Alma Örgütü: 1000, Satın Alma Grubu: 001, Şirket Kodu: TR01 gir.' },
      { stepNumber: 4, actionType: 'field', text: 'Kalem Tablosu', description: 'Malzeme: MAT-TURK-01, Miktar: 50, Net Fiyat: 120 TRY, Tesis: 1000, Depo: 0001 satırını yaz.' },
      { stepNumber: 5, actionType: 'button', text: 'Kontrol Et (Check)', description: 'Araç çubuğundaki büyüteç ikonuna tıkla, hataları kontrol et.', shortcut: 'Ctrl + F2' },
      { stepNumber: 6, actionType: 'button', text: 'Kaydet (Save)', description: 'Mavi disket ikonuna basarak 4500018901 no\'lu siparişi üret.', shortcut: 'Ctrl + S' },
    ],
  },
  MIGO: {
    tCode: 'MIGO',
    processTitle: 'Mal Kabulü (Depoya Fiziksel Giriş) Akışı',
    quickFormula: 'MIGO ➡️ Sol Üst: A01 Mal Kabulü ➡️ Yanı: R01 SAS ➡️ SAS No Gir ➡️ Enter ➡️ İrsaliye No Yaz ➡️ Alt Kısım: Kalem Tamam ☑ ➡️ Kaydet [Ctrl+S]',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nMIGO', description: 'Komut kutusuna /nMIGO yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'İşlem: A01 Mal Kabulü', description: 'Sol üstteki birinci açılır listeden A01 seç.' },
      { stepNumber: 3, actionType: 'field', text: 'Referans: R01 SAS', description: 'Hemen yanındaki ikinci açılır listeden R01 seç.' },
      { stepNumber: 4, actionType: 'field', text: 'SAS Numarası', description: 'Sağındaki beyaz kutucuğa 4500018901 yazıp Enter\'a bas.' },
      { stepNumber: 5, actionType: 'field', text: 'İrsaliye No', description: 'Gelen fiziksel / e-İrsaliye numarasını (IRS2026...) gir.' },
      { stepNumber: 6, actionType: 'button', text: 'Kalem Tamam (Item OK) ☑', description: 'ÇOK KRİTİK: Alt detay sekmesindeki veya tablodaki "Kalem Tamam" kutusunu tıkla!', turkeyContext: 'İşaretlenmezse SAP "Malzeme belgesi kaydedilemez" hatası verir.' },
      { stepNumber: 7, actionType: 'button', text: 'Kaydet (Post)', description: 'Üst araç çubuğundaki Kaydet ikonuna bas.', shortcut: 'Ctrl + S' },
    ],
  },
  FB50: {
    tCode: 'FB50',
    processTitle: 'Genel Muhasebe Mahsup Fişi Akışı',
    quickFormula: 'FB50 ➡️ Belge Tarihi ➡️ Şirket: TR01 ➡️ Satır 1: 770 Borç 15.000 TL ➡️ Satır 2: 102 Alacak 15.000 TL ➡️ Bakiye Işığı Yeşil ➡️ Kaydet',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nFB50', description: 'Komut satırına /nFB50 yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Tarih & Para Birimi', description: 'Belge Tarihini ve Para Birimi: TRY yaz.' },
      { stepNumber: 3, actionType: 'field', text: 'Borç Satırı (Debit)', description: 'G/L Hesabı: 770000 (Genel Yönetim), Borç seç, Tutar: 15.000, Masraf Yeri: 1000.' },
      { stepNumber: 4, actionType: 'field', text: 'Alacak Satırı (Credit)', description: 'G/L Hesabı: 102000 (Bankalar), Alacak seç, Tutar: 15.000.' },
      { stepNumber: 5, actionType: 'verify', text: 'Bakiye Trafik Lambası', description: 'Sağ üst köşedeki lambanın YEŞİL (Bakiye: 0,00) yandığını gör.' },
      { stepNumber: 6, actionType: 'button', text: 'Kaydet (Post)', description: 'Mavi disket ikonuna bas.', shortcut: 'Ctrl + S' },
    ],
  },
  FB60: {
    tCode: 'FB60',
    processTitle: 'Satıcı Faturası Girişi (Borç Kaydı)',
    quickFormula: 'FB60 ➡️ Satıcı: 320001 ➡️ Fatura Tarihi ➡️ Tutar: 24.000 TL ➡️ Vergiyi Hesapla ☑ ➡️ Gider Hesabı: 770020 ➡️ Simüle Et ➡️ Kaydet',
    flowSteps: [
      { stepNumber: 1, actionType: 'tcode', text: '/nFB60', description: 'Komut kutusuna /nFB60 yaz ve Enter\'a bas.' },
      { stepNumber: 2, actionType: 'field', text: 'Satıcı Cari: 320001', description: 'Tedarikçi 320 cari kodunu gir.' },
      { stepNumber: 3, actionType: 'field', text: 'Tarih ve Tutar', description: 'Fatura Tarihini ve KDV dahil toplam tutarı (24.000 TL) yaz.' },
      { stepNumber: 4, actionType: 'button', text: 'Vergiyi Hesapla ☑', description: 'Tutarın yanındaki kutucuğu tıkla, sistem KDV %20\'yi otomatik ayırsın.' },
      { stepNumber: 5, actionType: 'field', text: 'Karşı Gider Kalemi', description: 'Alt tabloya G/L Hesabı: 770020 ve Masraf Yeri: 1000 yaz.' },
      { stepNumber: 6, actionType: 'button', text: 'Simüle Et (F9)', description: '320 Alacak, 770 Borç, 191 İndirilecek KDV Borç maddelerini denetle.', shortcut: 'F9' },
      { stepNumber: 7, actionType: 'button', text: 'Kaydet (Post)', description: 'Mavi disketle defterikebire işle.', shortcut: 'Ctrl + S' },
    ],
  },
};

// -------------------------------------------------------------
// REALISTIC SIMULATION SCREENS (Çalışan Canlı Simülatör Ekranları)
// -------------------------------------------------------------
export const SIMULATION_SCREENS: Record<string, TransactionSimulation> = {
  VA01: {
    tCode: 'VA01',
    module: 'SD',
    screenTitle: 'Standart Sipariş Yarat: Başlangıç Ekranı',
    subTitle: 'Satış Dağıtım Alanı ve Müşteri Başlangıç Parametreleri',
    programName: 'SAPMV45A',
    screenNumber: '0101',
    statusBarOnLoad: {
      type: 'info',
      code: 'V1 100',
      message: 'Lütfen sipariş türü ve satış dağıtım alanı verilerini girin.',
    },
    saveSuccessMessage: {
      code: 'V1 311',
      messageTemplate: 'Standart sipariş {docNo} kaydedildi. (Müşteri Bildirimi Tetiklendi)',
    },
    headerFields: [
      {
        id: 'auart',
        label: 'Sipariş Türü',
        techName: 'VBAK-AUART',
        type: 'select',
        defaultValue: 'ZOR',
        required: true,
        options: [
          { value: 'ZOR', label: 'ZOR - Standart Türkiye Siparişi (Önerilen)' },
          { value: 'OR', label: 'OR - Standart Sipariş' },
          { value: 'RE', label: 'RE - İade Siparişi' },
          { value: 'SO', label: 'SO - Konsinye Siparişi' },
        ],
        turkeyNote: 'Türkiye yerelleştirmesinde fatura profilleri ZOR türüne bağlıdır.',
      },
      {
        id: 'vkorg',
        label: 'Satış Örgütü',
        techName: 'VBAK-VKORG',
        type: 'select',
        defaultValue: '1000',
        required: true,
        options: [
          { value: '1000', label: '1000 - TR Şirket Satış Merkezi (İstanbul)' },
          { value: '2000', label: '2000 - TR Fabrika Satış (İzmir)' },
        ],
      },
      {
        id: 'vtweg',
        label: 'Dağıtım Kanalı',
        techName: 'VBAK-VTWEG',
        type: 'select',
        defaultValue: '10',
        required: true,
        options: [
          { value: '10', label: '10 - Toptan Satış (Bayiler / Kurumsal)' },
          { value: '20', label: '20 - Doğrudan Perakende Satış' },
          { value: '30', label: '30 - E-Ticaret / Online Kanal' },
        ],
      },
      {
        id: 'spart',
        label: 'Bölüm',
        techName: 'VBAK-SPART',
        type: 'select',
        defaultValue: '00',
        required: true,
        options: [
          { value: '00', label: '00 - Bütün Bölümler (Genel Ürün Grubu)' },
          { value: '01', label: '01 - Kimyevi & Hammadde Grubu' },
          { value: '02', label: '02 - Bitmiş Mamul / Yedek Parça' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_sales',
        name: 'Satış (Sales)',
        fields: [
          {
            id: 'kunnr',
            label: 'Sipariş Veren (Sold-To Party)',
            techName: 'KUAG-KUNNR',
            type: 'select',
            defaultValue: '100021',
            required: true,
            options: [
              { value: '100021', label: '100021 - Koçak Lojistik & Sanayi A.Ş. (VKN: 5480219482)' },
              { value: '100045', label: '100045 - Anadolu Bilişim Teknolojileri Ltd. (VKN: 1049281729)' },
              { value: '100088', label: '100088 - Doğu Marmara Dağıtım Ticaret (VKN: 3918274619)' },
            ],
            turkeyNote: 'VKN sistem tarafından GİB e-Fatura mükellef sorgusuyla taranır.',
          },
          {
            id: 'kunwe',
            label: 'Malı Teslim Alan (Ship-To)',
            techName: 'KUWE-KUNNR',
            type: 'text',
            defaultValue: '100021 (Aynı Adres - Gebze Antrepo)',
          },
          {
            id: 'bstkd',
            label: 'Müşteri Sipariş No (PO)',
            techName: 'VBKD-BSTKD',
            type: 'text',
            defaultValue: 'PO-2026-OCT-8841',
            placeholder: 'Müşterinin gönderdiği sipariş referansı',
          },
          {
            id: 'inco1',
            label: 'Teslim Şekli (Incoterms)',
            techName: 'VBKD-INCO1',
            type: 'select',
            defaultValue: 'DAP',
            options: [
              { value: 'DAP', label: 'DAP - Belirlenen Yerde Teslim' },
              { value: 'EXW', label: 'EXW - Fabrikada Teslim' },
              { value: 'FCA', label: 'FCA - Taşıyıcıya Masrafsız' },
            ],
          },
        ],
      },
      {
        id: 'tab_items',
        name: 'Kalem Özeti (Item Overview)',
        tableType: 'items',
      },
      {
        id: 'tab_shipping',
        name: 'Sevkiyat (Shipping)',
        fields: [
          {
            id: 'vstel',
            label: 'Sevkiyat Noktası',
            techName: 'VBAP-VSTEL',
            type: 'select',
            defaultValue: '1000',
            options: [
              { value: '1000', label: '1000 - Gebze Ana Sevkiyat Rampası' },
              { value: '1010', label: '1010 - Dilovası Kimya Depo Rampası' },
            ],
          },
          {
            id: 'e_irsaliye_durum',
            label: 'e-İrsaliye Profili',
            techName: 'ZTR-IRS-TYP',
            type: 'text',
            defaultValue: 'TEMEL İRSALİYE (GİB Kayıtlı Kullanıcı)',
            turkeyNote: 'Mal çıkışı yapıldığında otomatik UBL-TR formatında üretilecektir.',
          },
        ],
      },
      {
        id: 'tab_e_invoice',
        name: 'Türkiye e-Dönüşüm / GİB',
        fields: [
          {
            id: 'einvoice_senaryo',
            label: 'Fatura Senaryosu',
            techName: 'ZTR-FAT-SEN',
            type: 'select',
            defaultValue: 'TICARIFATURA',
            options: [
              { value: 'TICARIFATURA', label: 'TICARIFATURA (GİB Onay/Red Kabul Edilir)' },
              { value: 'TEMELFATURA', label: 'TEMELFATURA (Sistemden Otomatik Onaylanır)' },
              { value: 'EARSIVFATURA', label: 'EARSIVFATURA (e-Fatura Olmayan Mükellefe)' },
            ],
            turkeyNote: 'Kurumsal müşteriler için çoğunlukla Ticari Fatura senaryosu seçilir.',
          },
          {
            id: 'tevkifat_kodu',
            label: 'KDV Tevkifat Kodu',
            techName: 'ZTR-TEVKIFAT',
            type: 'select',
            defaultValue: 'YOK',
            options: [
              { value: 'YOK', label: 'Tevkifat Yok (Tam KDV %20)' },
              { value: '601', label: '601 - Yapım İşleri ile Bu İşlerle Birlikte İfa Edilen Mimarlık/Mühendislik (4/10)' },
              { value: '602', label: '602 - Etüt, Plan-Proje, Danışmanlık Hizmetleri (9/10)' },
              { value: '608', label: '608 - İşgücü Temin Hizmetleri (9/10)' },
            ],
          },
        ],
      },
    ],
    defaultTableItems: [
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
    ],
  },

  VL01N: {
    tCode: 'VL01N',
    module: 'SD',
    screenTitle: 'Siparişle Birlikte Giden Teslimat Yarat',
    subTitle: 'Depo Toplama (Picking) ve Mal Çıkışını Kaydetme (PGI)',
    programName: 'SAPMV50A',
    screenNumber: '4001',
    statusBarOnLoad: {
      type: 'info',
      code: 'VL 010',
      message: 'Sipariş numarasına istinaden teslimat hazırlanıyor. Toplama miktarını girin.',
    },
    saveSuccessMessage: {
      code: 'VL 311',
      messageTemplate: 'Giden teslimat {docNo} kaydedildi. Mal çıkışı (PGI) tamamlandı ve stok düşüldü.',
    },
    headerFields: [
      {
        id: 'vstel',
        label: 'Sevkiyat Noktası',
        techName: 'LIKP-VSTEL',
        type: 'select',
        defaultValue: '1000',
        required: true,
        options: [{ value: '1000', label: '1000 - Gebze Ana Lojistik Rampası' }],
      },
      {
        id: 'vbeln',
        label: 'Satış Siparişi Referansı',
        techName: 'VBAK-VBELN',
        type: 'text',
        defaultValue: '0000014205',
        required: true,
      },
      {
        id: 'route',
        label: 'Güzergah (Route)',
        techName: 'LIKP-ROUTE',
        type: 'text',
        defaultValue: 'TR0001 - İstanbul / Kocaeli Çevresi',
      },
      {
        id: 'plaka',
        label: 'Taşıyıcı Araç Plakası (e-İrsaliye)',
        techName: 'LIKP-TRAID',
        type: 'text',
        defaultValue: '34 SAP 1923',
        turkeyNote: 'e-İrsaliye UBL zorunlu alanıdır.',
      },
    ],
    tabs: [
      {
        id: 'tab_picking',
        name: 'Toplama (Picking) - En Kritik Sekme',
        tableType: 'delivery_items',
      },
      {
        id: 'tab_loading',
        name: 'Yükleme & Paketleme',
        fields: [
          {
            id: 'sofor_ad',
            label: 'Sürücü Ad Soyad',
            techName: 'LIKP-DRIVER',
            type: 'text',
            defaultValue: 'Ahmet Yılmaz',
          },
          {
            id: 'sofor_tckn',
            label: 'Sürücü TCKN',
            techName: 'LIKP-TCKN',
            type: 'text',
            defaultValue: '28491029384',
            turkeyNote: 'GİB e-İrsaliye denetiminde doğrulanır.',
          },
        ],
      },
    ],
    defaultTableItems: [
      {
        kalemNo: '10',
        malzeme: 'MAT-TURK-01',
        kisaMetin: 'Endüstriyel Kontrol Modülü V3',
        miktar: 10,
        birim: 'ST',
        fiyat: 4500,
        paraBirimi: 'TRY',
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
        depoYeri: '0001',
      },
    ],
  },

  VF01: {
    tCode: 'VF01',
    module: 'SD',
    screenTitle: 'Fatura Belgesi Yarat: Başlangıç Ekranı',
    subTitle: 'Teslimata İstinaden Fatura Kesimi ve Muhasebe Belgesi Entegrasyonu',
    programName: 'SAPMV60A',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'VF 001',
      message: 'Teslimat belgesi referans alındı. Faturayı kaydedip muhasebeye aktarabilirsiniz.',
    },
    saveSuccessMessage: {
      code: 'VF 311',
      messageTemplate: 'Fatura {docNo} kaydedildi. Muhasebe belgesi oluşturuldu ve GİB kuyruğuna iletildi.',
    },
    headerFields: [
      {
        id: 'fkart',
        label: 'Fatura Türü',
        techName: 'VBRK-FKART',
        type: 'select',
        defaultValue: 'F2',
        required: true,
        options: [
          { value: 'F2', label: 'F2 - Standart Fatura' },
          { value: 'ZF2', label: 'ZF2 - e-Fatura / e-Arşiv Fatura' },
          { value: 'S1', label: 'S1 - İptal Faturası' },
        ],
      },
      {
        id: 'vgbel',
        label: 'Teslimat Referansı',
        techName: 'VBRP-VGBEL',
        type: 'text',
        defaultValue: '80001923',
        required: true,
      },
      {
        id: 'fkdat',
        label: 'Faturalama Tarihi',
        techName: 'VBRK-FKDAT',
        type: 'date',
        defaultValue: '2026-10-28',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_invoice_items',
        name: 'Fatura Kalemleri & KDV %20',
        tableType: 'items',
      },
      {
        id: 'tab_fi_integration',
        name: 'Muhasebe (FI) Yevmiye Maddesi',
        tableType: 'accounting_lines',
      },
    ],
    defaultTableItems: [
      {
        kalemNo: '10',
        malzeme: 'MAT-TURK-01',
        kisaMetin: 'Endüstriyel Kontrol Modülü V3',
        miktar: 10,
        birim: 'ST',
        fiyat: 4500,
        paraBirimi: 'TRY',
        vergiKodu: 'V2',
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
      },
    ],
  },

  MIGO: {
    tCode: 'MIGO',
    module: 'MM',
    screenTitle: 'Mal Hareketi / Mal Kabulü (Hareket Türü 101)',
    subTitle: 'Satın Alma Siparişine İstinaden Depoya Fiziksel Giriş',
    programName: 'SAPLMIGO',
    screenNumber: '0001',
    statusBarOnLoad: {
      type: 'info',
      code: 'MIGO 001',
      message: 'Mal kabulü için SAS referansı seçildi. Lütfen "Kalem Tamam" onayını unutmayın.',
    },
    saveSuccessMessage: {
      code: 'MIGO 311',
      messageTemplate: 'Malzeme belgesi {docNo} kaydedildi. Depo stoklarına (101) giriş yapıldı.',
    },
    headerFields: [
      {
        id: 'action',
        label: 'İşlem',
        techName: 'GOHEAD-ACTION',
        type: 'select',
        defaultValue: 'A01',
        required: true,
        options: [
          { value: 'A01', label: 'A01 - Mal Kabulü' },
          { value: 'A02', label: 'A02 - İade Teslimatı' },
          { value: 'A07', label: 'A07 - Görüntüle' },
        ],
      },
      {
        id: 'refdoc',
        label: 'Referans Belge',
        techName: 'GOHEAD-REFDOC',
        type: 'select',
        defaultValue: 'R01',
        required: true,
        options: [
          { value: 'R01', label: 'R01 - Satın Alma Siparişi' },
          { value: 'R02', label: 'R02 - Malzeme Belgesi' },
          { value: 'R08', label: 'R08 - Sipariş' },
        ],
      },
      {
        id: 'ebeln',
        label: 'SAS No',
        techName: 'GOHEAD-EBELN',
        type: 'text',
        defaultValue: '4500018901',
        required: true,
      },
      {
        id: 'lfsnr',
        label: 'İrsaliye No (Tedarikçi e-İrsaliye)',
        techName: 'GOHEAD-LFSNR',
        type: 'text',
        defaultValue: 'GIB202600004123',
        required: true,
        turkeyNote: 'Gelen e-İrsaliyenin 16 haneli GİB takip numarası girilir.',
      },
    ],
    tabs: [
      {
        id: 'tab_migo_items',
        name: 'Malzeme Kalemleri (Sayım & Kalem Tamam)',
        tableType: 'items',
      },
      {
        id: 'tab_migo_where',
        name: 'Nereye (Tesis & Depo Yeri)',
        fields: [
          {
            id: 'werks',
            label: 'Tesis',
            techName: 'GOITEM-WERKS',
            type: 'text',
            defaultValue: '1000 - Gebze Ana Üretim Tesisi',
          },
          {
            id: 'lgort',
            label: 'Depo Yeri',
            techName: 'GOITEM-LGORT',
            type: 'text',
            defaultValue: '0001 - Hammadde & Yarı Mamul Deposu',
          },
          {
            id: 'bwart',
            label: 'Hareket Türü',
            techName: 'GOITEM-BWART',
            type: 'text',
            defaultValue: '101 (SAS İçin Depoya Mal Girişi)',
          },
        ],
      },
    ],
    defaultTableItems: [
      {
        kalemNo: '1',
        malzeme: 'MAT-TURK-01',
        kisaMetin: 'Paslanmaz Çelik Vida M8x30',
        miktar: 50,
        birim: 'ST',
        fiyat: 120,
        paraBirimi: 'TRY',
        depoYeri: '0001',
      },
    ],
  },

  FB50: {
    tCode: 'FB50',
    module: 'FICO',
    screenTitle: 'G/L Hesap Kalemi Girişi (Genel Muhasebe Mahsup Fişi)',
    subTitle: 'Tekdüzen Hesap Planına Göre Çift Taraflı Yevmiye Kaydı',
    programName: 'SAPMF05A',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'FB 001',
      message: 'Şirket Kodu: TR01. Borç ve Alacak tutarlarını eşitleyip yeşil ışığı kontrol edin.',
    },
    saveSuccessMessage: {
      code: 'FB 311',
      messageTemplate: '{docNo} numaralı muhasebe belgesi TR01 şirket kodunda kaydedildi.',
    },
    headerFields: [
      {
        id: 'bukrs',
        label: 'Şirket Kodu',
        techName: 'BKPF-BUKRS',
        type: 'text',
        defaultValue: 'TR01 (Türkiye Sanayi A.Ş.)',
        required: true,
      },
      {
        id: 'bldat',
        label: 'Belge Tarihi',
        techName: 'BKPF-BLDAT',
        type: 'date',
        defaultValue: '2026-10-28',
        required: true,
      },
      {
        id: 'waers',
        label: 'Para Birimi',
        techName: 'BKPF-WAERS',
        type: 'select',
        defaultValue: 'TRY',
        required: true,
        options: [
          { value: 'TRY', label: 'TRY - Türk Lirası' },
          { value: 'USD', label: 'USD - ABD Doları' },
          { value: 'EUR', label: 'EUR - Euro' },
        ],
      },
      {
        id: 'xblnr',
        label: 'Referans No',
        techName: 'BKPF-XBLNR',
        type: 'text',
        defaultValue: 'REF-2026-9901',
      },
    ],
    tabs: [
      {
        id: 'tab_gl_lines',
        name: 'Yevmiye Satırları (TDHP Hesapları)',
        tableType: 'accounting_lines',
      },
    ],
  },

  MM01: {
    tCode: 'MM01',
    module: 'MM',
    screenTitle: 'Malzeme Yarat (Genel): Başlangıç Ekranı',
    subTitle: 'Sektör ve Malzeme Türü (ROH/FERT/HAWA) Belirleme',
    programName: 'SAPLMGMM',
    screenNumber: '0060',
    statusBarOnLoad: {
      type: 'info',
      code: 'MM 001',
      message: 'Malzeme tanımlamak için sektör ve malzeme türünü seçip Görünüm Seçimi yapın.',
    },
    saveSuccessMessage: {
      code: 'MM 311',
      messageTemplate: 'Malzeme {docNo} numarası altında TR01 tesisinde yaratıldı.',
    },
    headerFields: [
      {
        id: 'matnr',
        label: 'Malzeme Kodu',
        techName: 'RMMG1-MATNR',
        type: 'text',
        defaultValue: 'MAT-TURK-03',
        placeholder: 'Boş bırakılırsa dahili numara üretilir',
      },
      {
        id: 'mbrsh',
        label: 'Sektör (Industry Sector)',
        techName: 'RMMG1-MBRSH',
        type: 'select',
        defaultValue: 'M',
        required: true,
        options: [
          { value: 'M', label: 'M - Makine İmalatı / Metal' },
          { value: 'C', label: 'C - Kimya & Hammadde' },
          { value: 'P', label: 'P - İlaç & Sağlık' },
          { value: 'F', label: 'F - Gıda Sanayi' },
        ],
      },
      {
        id: 'mtart',
        label: 'Malzeme Türü (Material Type)',
        techName: 'RMMG1-MTART',
        type: 'select',
        defaultValue: 'ROH',
        required: true,
        options: [
          { value: 'ROH', label: 'ROH - Hammadde (Satın Alınır, Üretime Girer)' },
          { value: 'FERT', label: 'FERT - Bitmiş Mamul (Üretilir, Müşteriye Satılır)' },
          { value: 'HALB', label: 'HALB - Yarı Mamul' },
          { value: 'HAWA', label: 'HAWA - Ticari Mal (Al-Sat)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_basic',
        name: 'Temel Veriler 1',
        fields: [
          {
            id: 'maktx',
            label: 'Malzeme Tanımı (Kısa Metin)',
            techName: 'MAKT-MAKTX',
            type: 'text',
            defaultValue: 'Yüksek Mukavemetli Çelik Cıvata M12x50',
          },
          {
            id: 'meins',
            label: 'Temel Ölçü Birimi',
            techName: 'MARA-MEINS',
            type: 'text',
            defaultValue: 'ST (Adet)',
          },
          {
            id: 'matkl',
            label: 'Mal Grubu',
            techName: 'MARA-MATKL',
            type: 'text',
            defaultValue: '001 - Bağlantı Elemanları',
          },
        ],
      },
      {
        id: 'tab_purchasing',
        name: 'Satın Alma',
        fields: [
          {
            id: 'ekgrp',
            label: 'Satın Alma Grubu',
            techName: 'MARC-EKGRP',
            type: 'text',
            defaultValue: '001 (Yurtiçi Satın Alma)',
          },
        ],
      },
      {
        id: 'tab_accounting',
        name: 'Muhasebe 1',
        fields: [
          {
            id: 'bklas',
            label: 'Değerleme Sınıfı',
            techName: 'MBEW-BKLAS',
            type: 'text',
            defaultValue: '3000 (150 Hammaddeler Muhasebe Hesabı)',
            turkeyNote: 'Tekdüzen 150 stok hesabına doğrudan bağlanır.',
          },
          {
            id: 'vprsv',
            label: 'Fiyat Denetimi',
            techName: 'MBEW-VPRSV',
            type: 'text',
            defaultValue: 'V - Hareketli Ortalama Fiyat (Moving Average)',
          },
        ],
      },
    ],
  },

  ME21N: {
    tCode: 'ME21N',
    module: 'MM',
    screenTitle: 'Satın Alma Siparişi Yarat (Vendor Bilinen SAS)',
    subTitle: 'Tedarikçiye Resmi Sipariş Verme ve Malzeme Emri',
    programName: 'SAPLMEGUI',
    screenNumber: '0014',
    statusBarOnLoad: {
      type: 'info',
      code: 'ME 001',
      message: 'Satıcı cari kodunu girin ve kalem tablosuna malzeme bilgilerini ekleyin.',
    },
    saveSuccessMessage: {
      code: 'ME 311',
      messageTemplate: 'Standart SAS {docNo} numarası altında TR01 şirketinde yaratıldı.',
    },
    headerFields: [
      {
        id: 'lifnr',
        label: 'Satıcı (Vendor)',
        techName: 'EKKO-LIFNR',
        type: 'select',
        defaultValue: '200045',
        required: true,
        options: [
          { value: '200045', label: '200045 - Ege Çelik ve Metal Sanayi A.Ş. (VKN: 3829104829)' },
          { value: '200088', label: '200088 - Bosch Sanayi ve Ticaret A.Ş. (VKN: 1827492049)' },
        ],
      },
      {
        id: 'ekorg',
        label: 'Satın Alma Örgütü',
        techName: 'EKKO-EKORG',
        type: 'text',
        defaultValue: '1000 - TR Merkez Satın Alma',
      },
      {
        id: 'ekgrp',
        label: 'Satın Alma Grubu',
        techName: 'EKKO-EKGRP',
        type: 'text',
        defaultValue: '001 - Hammadde Satın Alma Ekibi',
      },
      {
        id: 'bukrs',
        label: 'Şirket Kodu',
        techName: 'EKKO-BUKRS',
        type: 'text',
        defaultValue: 'TR01',
      },
    ],
    tabs: [
      {
        id: 'tab_po_items',
        name: 'Kalem Özeti (Item Overview)',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      {
        kalemNo: '10',
        malzeme: 'MAT-TURK-01',
        kisaMetin: 'Paslanmaz Çelik Vida M8x30',
        miktar: 50,
        birim: 'ST',
        fiyat: 120,
        paraBirimi: 'TRY',
        depoYeri: '0001',
      },
    ],
  },

  MIRO: {
    tCode: 'MIRO',
    module: 'MM',
    screenTitle: 'Lojistik Fatura Doğrulama: Gelen Satıcı Faturası',
    subTitle: 'Satın Alma Siparişi ve MIGO Mal Kabulü ile 3-Way Eşleştirme',
    programName: 'SAPLMR1M',
    screenNumber: '6000',
    statusBarOnLoad: {
      type: 'info',
      code: 'MR 001',
      message: 'Fatura tarihi, tutar ve SAS referansı girildiğinde bakiye ışığı yeşile döner.',
    },
    saveSuccessMessage: {
      code: 'MR 311',
      messageTemplate: '{docNo} numaralı fatura belgesi kaydedildi. 320 Satıcı carisine borç kaydı atıldı.',
    },
    headerFields: [
      {
        id: 'bldat',
        label: 'Fatura Tarihi',
        techName: 'INVFO-BLDAT',
        type: 'date',
        defaultValue: '2026-10-28',
        required: true,
      },
      {
        id: 'wrbtr',
        label: 'Fatura Tutarı (KDV Dahil)',
        techName: 'INVFO-WRBTR',
        type: 'text',
        defaultValue: '7.200,00 TRY',
        required: true,
      },
      {
        id: 'ebeln',
        label: 'Referans SAS No',
        techName: 'INVFO-EBELN',
        type: 'text',
        defaultValue: '4500018901',
        required: true,
      },
      {
        id: 'xmwst',
        label: 'Vergiyi Hesapla (Calculate Tax)',
        techName: 'INVFO-XMWST',
        type: 'select',
        defaultValue: 'EVET',
        options: [
          { value: 'EVET', label: '☑ Evet - KDV %20 Otomatik Ayrıştır' },
          { value: 'HAYIR', label: '☐ Hayır - Manuel Vergi Girişi' },
        ],
        turkeyNote: 'İşaretlendiğinde sağ üst bakiye trafik lambası yeşile döner.',
      },
    ],
    tabs: [
      {
        id: 'tab_invoice_overview',
        name: 'Satın Alma Kalemleri & Kabul Edilen Miktar',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      {
        kalemNo: '1',
        malzeme: 'MAT-TURK-01',
        kisaMetin: 'Paslanmaz Çelik Vida M8x30',
        miktar: 50,
        birim: 'ST',
        fiyat: 120,
        paraBirimi: 'TRY',
        vergiKodu: 'V2',
      },
    ],
  },

  FB60: {
    tCode: 'FB60',
    module: 'FICO',
    screenTitle: 'Satıcı Faturası Girişi (Hesap Borçları - AP)',
    subTitle: 'Doğrudan Finans Üzerinden Satıcı Borçlandırma ve Tevkifat',
    programName: 'SAPMF05A',
    screenNumber: '1100',
    statusBarOnLoad: {
      type: 'info',
      code: 'FB 002',
      message: 'Satıcı cari kodunu, tutarı girip Vergiyi Hesapla kutusunu işaretleyin.',
    },
    saveSuccessMessage: {
      code: 'FB 312',
      messageTemplate: '{docNo} numaralı satıcı faturası TR01 şirket kodunda muhasebeleştirildi.',
    },
    headerFields: [
      {
        id: 'lifnr',
        label: 'Satıcı Cari Kodu (320)',
        techName: 'INVFO-ACCNT',
        type: 'select',
        defaultValue: '320001',
        required: true,
        options: [
          { value: '320001', label: '320001 - Yıldız Hukuk ve Müşavirlik A.Ş.' },
          { value: '320045', label: '320045 - Sistem Bilgisayar Donanım Ltd.' },
        ],
      },
      {
        id: 'bldat',
        label: 'Fatura Tarihi',
        techName: 'INVFO-BLDAT',
        type: 'date',
        defaultValue: '2026-10-28',
        required: true,
      },
      {
        id: 'wrbtr',
        label: 'Fatura Tutarı (TRY)',
        techName: 'INVFO-WRBTR',
        type: 'text',
        defaultValue: '24.000,00',
        required: true,
      },
      {
        id: 'waers',
        label: 'Para Birimi',
        techName: 'BKPF-WAERS',
        type: 'text',
        defaultValue: 'TRY',
      },
    ],
    tabs: [
      {
        id: 'tab_fb60_lines',
        name: 'Gider Kalemleri (770 / Tevkifat)',
        tableType: 'accounting_lines',
      },
    ],
  },

  FB70: {
    tCode: 'FB70',
    module: 'FICO',
    screenTitle: 'Müşteri Faturası Girişi (Hesap Alacakları - AR)',
    subTitle: 'Doğrudan Finans Üzerinden Müşteri Alacaklandırma ve Gelir Kaydı',
    programName: 'SAPMF05A',
    screenNumber: '1200',
    statusBarOnLoad: {
      type: 'info',
      code: 'FB 003',
      message: 'Müşteri cari kodunu, tutarı girip gelir hesabını (600) seçin.',
    },
    saveSuccessMessage: {
      code: 'FB 313',
      messageTemplate: '{docNo} numaralı müşteri faturası TR01 şirket kodunda muhasebeleştirildi.',
    },
    headerFields: [
      {
        id: 'kunnr',
        label: 'Müşteri Cari Kodu (120)',
        techName: 'INVFO-ACCNT',
        type: 'select',
        defaultValue: '120005',
        required: true,
        options: [
          { value: '120005', label: '120005 - Anadolu Endüstri ve Ticaret A.Ş.' },
          { value: '120010', label: '120010 - Marmara Lojistik Dağıtım A.Ş.' },
        ],
      },
      {
        id: 'bldat',
        label: 'Fatura Tarihi',
        techName: 'INVFO-BLDAT',
        type: 'date',
        defaultValue: '2026-10-28',
        required: true,
      },
      {
        id: 'wrbtr',
        label: 'Fatura Tutarı (TRY)',
        techName: 'INVFO-WRBTR',
        type: 'text',
        defaultValue: '60.000,00',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_fb70_lines',
        name: 'Gelir Kalemleri (600 / 391)',
        tableType: 'accounting_lines',
      },
    ],
  },

  VA03: {
    tCode: 'VA03',
    module: 'SD',
    screenTitle: 'Satış Siparişi Görüntüle: Belge Akışı Dedektifliği',
    subTitle: 'Siparişten Teslimata, Faturadan Tahsilata Tüm Akış Zinciri',
    programName: 'SAPMV45A',
    screenNumber: '0102',
    statusBarOnLoad: {
      type: 'info',
      code: 'V1 003',
      message: 'Sipariş numarası yüklendi. Üst menüden "Belge Akışı (F5)" butonuna basarak zinciri görün.',
    },
    saveSuccessMessage: {
      code: 'V1 000',
      messageTemplate: 'Görüntüleme modu aktif: Değişiklikler için VA02 kullanın.',
    },
    headerFields: [
      {
        id: 'vbeln',
        label: 'Sipariş Numarası',
        techName: 'VBAK-VBELN',
        type: 'text',
        defaultValue: '0000014205',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_doc_flow',
        name: 'Belge Akışı (Document Flow - F5 Ağacı)',
        fields: [
          {
            id: 'siparis_durum',
            label: '1. Satış Siparişi 0000014205',
            techName: 'VBFA-STATUS',
            type: 'text',
            defaultValue: 'Tamamlandı (28.10.2026 - 54.000 TL)',
          },
          {
            id: 'teslimat_durum',
            label: '2. Giden Teslimat 80001923',
            techName: 'VBFA-STATUS',
            type: 'text',
            defaultValue: 'Mal Çıkışı Yapıldı (e-İrsaliye: GIB202600001923)',
          },
          {
            id: 'fatura_durum',
            label: '3. Fatura Belgesi 90004512',
            techName: 'VBFA-STATUS',
            type: 'text',
            defaultValue: 'GİB e-Fatura Onaylandı (64.800 TL KDV Dahil)',
          },
          {
            id: 'muhasebe_durum',
            label: '4. FI Muhasebe Belgesi 100002491',
            techName: 'BKPF-STATUS',
            type: 'text',
            defaultValue: '120 Alıcılar Borç / 600 Gelir Alacak / 391 KDV Alacak',
          },
        ],
      },
    ],
  },

  CO01: {
    tCode: 'CO01',
    module: 'PP',
    screenTitle: 'Üretim Siparişi Yarat: Başlangıç Ekranı',
    subTitle: 'Mamul, Üretim Tesisi ve İmalat Emri Parametreleri',
    programName: 'SAPLCOKO',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'CO 101',
      message: 'Lütfen mamul malzeme kodu ve üretim tesisini girip Enter\'a basın.',
    },
    saveSuccessMessage: {
      code: 'CO 001',
      messageTemplate: 'Üretim siparişi {docNo} kaydedildi (Serbest Statüsü: REL, Rezervasyon Açıldı).',
    },
    headerFields: [
      {
        id: 'matnr',
        label: 'Malzeme (Mamul)',
        techName: 'AFPO-MATNR',
        type: 'select',
        defaultValue: 'MAT-01',
        required: true,
        options: [
          { value: 'MAT-01', label: 'MAT-01 - Endüstriyel Akıllı Kontrol Modülü' },
          { value: 'FERT-200', label: 'FERT-200 - Elektrikli Motor Kontrol Ünitesi' },
        ],
        turkeyNote: 'BOM reçetesi ve iş planı (routing) otomatik çekilir.',
      },
      {
        id: 'werks',
        label: 'Üretim Tesisi',
        techName: 'CAUFVD-WERKS',
        type: 'select',
        defaultValue: '1000',
        required: true,
        options: [
          { value: '1000', label: '1000 - Gebze Ana Üretim Fabrikası' },
          { value: '2000', label: '2000 - İzmir Montaj Tesisi' },
        ],
      },
      {
        id: 'aufast',
        label: 'Sipariş Türü',
        techName: 'AUFPAR-AUFART',
        type: 'select',
        defaultValue: 'PP01',
        required: true,
        options: [
          { value: 'PP01', label: 'PP01 - Standart İmalat Üretim Siparişi' },
          { value: 'PP02', label: 'PP02 - Fason Üretim Siparişi' },
        ],
      },
      {
        id: 'gamng',
        label: 'Üretim Miktarı',
        techName: 'AFKO-GAMNG',
        type: 'number',
        defaultValue: '50',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_general',
        name: 'Genel & Tarihler',
        fields: [
          {
            id: 'gstrp',
            label: 'Planlanan Başlangıç Tarihi',
            techName: 'AFKO-GSTRP',
            type: 'date',
            defaultValue: '2026-10-29',
          },
          {
            id: 'gltrp',
            label: 'Planlanan Bitiş Tarihi',
            techName: 'AFKO-GLTRP',
            type: 'date',
            defaultValue: '2026-11-05',
          },
          {
            id: 'dispo',
            label: 'MRP Sorumlusu',
            techName: 'MARC-DISPO',
            type: 'text',
            defaultValue: '001 (Montaj Hattı Şefi)',
          },
        ],
      },
      {
        id: 'tab_bom',
        name: 'Reçete Bileşenleri (BOM)',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      { kalemNo: '0010', malzeme: 'ROH-1001', kisaMetin: 'Mikroişlemci Entegre Kartı', miktar: 50, birim: 'ST', fiyat: 250, paraBirimi: 'TRY', depoYeri: '0001' },
      { kalemNo: '0020', malzeme: 'ROH-1002', kisaMetin: 'Alüminyum Soğutucu Blok', miktar: 50, birim: 'ST', fiyat: 80, paraBirimi: 'TRY', depoYeri: '0001' },
      { kalemNo: '0030', malzeme: 'ROH-1003', kisaMetin: 'Bağlantı Kablo Demeti M8', miktar: 100, birim: 'ST', fiyat: 15, paraBirimi: 'TRY', depoYeri: '0001' },
    ],
  },

  QA32: {
    tCode: 'QA32',
    module: 'QM',
    screenTitle: 'Kalite Muayene Partileri Seçimi ve İnceleme Listesi',
    subTitle: 'Giriş Kalite ve Proses Kontrolü İçin Muayene Partisi Kokpiti',
    programName: 'RQEVAM30',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'QE 001',
      message: 'Muayene partileri listelendi. Partiyi seçip "Kullanım Kararı (UD)" verin.',
    },
    saveSuccessMessage: {
      code: 'QA 100',
      messageTemplate: 'Muayene partisi için Kullanım Kararı (UD: A - Kabul) kaydedildi. Stok serbest bırakıldı.',
    },
    headerFields: [
      {
        id: 'werks',
        label: 'Tesis',
        techName: 'QALS-WERKS',
        type: 'select',
        defaultValue: '1000',
        required: true,
        options: [
          { value: '1000', label: '1000 - Gebze Ana Fabrika Kalite Laboratuvarı' },
        ],
      },
      {
        id: 'art',
        label: 'Muayene Türü',
        techName: 'QALS-ART',
        type: 'select',
        defaultValue: '01',
        required: true,
        options: [
          { value: '01', label: '01 - Mal Kabulü Muayenesi (SAS Referanslı)' },
          { value: '04', label: '04 - Üretimden Giriş Muayenesi' },
        ],
      },
      {
        id: 'ud_code',
        label: 'Kullanım Kararı Kodu (UD)',
        techName: 'QAVE-VCODE',
        type: 'select',
        defaultValue: 'A',
        required: true,
        options: [
          { value: 'A', label: 'A - Kabul (Serbest Kullanıma Uygun)' },
          { value: 'R', label: 'R - Ret (Tedarikçiye İade Edilecek)' },
          { value: 'C', label: 'C - Şartlı Kabul (İmtiyazlı Kullanım)' },
        ],
        turkeyNote: 'Kabul kararı verildiğinde malzeme otomatik olarak 101 Serbest Stoğa aktarılır.',
      },
    ],
    tabs: [
      {
        id: 'tab_lots',
        name: 'Açık Muayene Partisi İncelemesi',
        fields: [
          {
            id: 'prueflos',
            label: 'Muayene Partisi No',
            techName: 'QALS-PRUEFLOS',
            type: 'text',
            defaultValue: '01000004821',
          },
          {
            id: 'matnr_desc',
            label: 'Malzeme',
            techName: 'QALS-MATNR',
            type: 'text',
            defaultValue: 'ROH-1001 - Mikroişlemci Entegre Kartı',
          },
          {
            id: 'lieferant',
            label: 'Tedarikçi Firma',
            techName: 'QALS-LIFNR',
            type: 'text',
            defaultValue: '200045 - Ege Çelik & Elektronik A.Ş.',
          },
          {
            id: 'lot_qty',
            label: 'Parti Miktarı',
            techName: 'QALS-LOSMENGE',
            type: 'text',
            defaultValue: '50 Adet (Numune Boyutu: 5 Adet)',
          },
        ],
      },
    ],
  },

  IW31: {
    tCode: 'IW31',
    module: 'PM',
    screenTitle: 'Bakım Siparişi Yarat: Başlangıç Ekranı',
    subTitle: 'Arıza ve Periyodik Bakım İş Emri Parametreleri',
    programName: 'SAPLCOIH',
    screenNumber: '0101',
    statusBarOnLoad: {
      type: 'info',
      code: 'IW 010',
      message: 'Sipariş türü ve ekipman numarasını girip Enter\'a basın.',
    },
    saveSuccessMessage: {
      code: 'IW 001',
      messageTemplate: 'Bakım siparişi {docNo} kaydedildi (Bakım Teknisyenine Sevk Edildi).',
    },
    headerFields: [
      {
        id: 'aufast',
        label: 'Sipariş Türü',
        techName: 'AUFART',
        type: 'select',
        defaultValue: 'PM01',
        required: true,
        options: [
          { value: 'PM01', label: 'PM01 - Düzeltici Arıza Bakım Siparişi' },
          { value: 'PM02', label: 'PM02 - Planlı Periyodik Bakım' },
          { value: 'PM03', label: 'PM03 - Tesis İyileştirme / Revizyon' },
        ],
      },
      {
        id: 'equnr',
        label: 'Ekipman Kodu',
        techName: 'EQUIPMENT',
        type: 'select',
        defaultValue: 'CNC-1002',
        required: true,
        options: [
          { value: 'CNC-1002', label: 'CNC-1002 - 5 Eksen CNC Freze Tezgahı (Hattı: 02)' },
          { value: 'ROB-004', label: 'ROB-004 - Rampa Otomatik Paletleme Robotu' },
        ],
      },
      {
        id: 'iwerk',
        label: 'Planlama Tesisi',
        techName: 'IWERK',
        type: 'select',
        defaultValue: '1000',
        required: true,
        options: [
          { value: '1000', label: '1000 - Gebze Tesis Bakım Atölyesi' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_operations',
        name: 'Operasyon ve Arıza Detayı',
        fields: [
          {
            id: 'ktext',
            label: 'Arıza Açıklaması',
            techName: 'AUFK-KTEXT',
            type: 'text',
            defaultValue: 'Mil Yatağı Aşırı Isınma ve Titreşim Hatası',
          },
          {
            id: 'arbpl',
            label: 'Sorumlu İş Yeri / Atölye',
            techName: 'AFVGD-ARBPL',
            type: 'text',
            defaultValue: 'MEK-01 (Mekanik Bakım Ekibi)',
          },
          {
            id: 'dauer',
            label: 'Tahmini Onarım Süresi',
            techName: 'AFVGD-DAUNO',
            type: 'text',
            defaultValue: '3,5 Saat',
          },
        ],
      },
      {
        id: 'tab_parts',
        name: 'Yedek Parça Rezervasyonu (Bileşenler)',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      { kalemNo: '0010', malzeme: 'SKF-6205', kisaMetin: 'Yüksek Hızlı Sabit Bilyalı Rulman', miktar: 2, birim: 'ST', fiyat: 450, paraBirimi: 'TRY', depoYeri: '0002' },
      { kalemNo: '0020', malzeme: 'OIL-VG46', kisaMetin: 'Hidrolik ve Kızak Yağı 5L', miktar: 1, birim: 'ST', fiyat: 320, paraBirimi: 'TRY', depoYeri: '0002' },
    ],
  },

  SU01: {
    tCode: 'SU01',
    module: 'BASIS',
    screenTitle: 'Kullanıcı Bakımı: Başlangıç Ekranı (User Administration)',
    subTitle: 'Kullanıcı Kimliği, Güvenlik Parametreleri ve Yetki Rolleri',
    programName: 'SAPMSU01',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: '01 001',
      message: 'Kullanıcı adını girip "Yarat (F8)" veya düzenleme moduna geçin.',
    },
    saveSuccessMessage: {
      code: '01 100',
      messageTemplate: 'Kullanıcı {docNo} başarıyla kaydedildi ve yetki rolleri aktifleşti.',
    },
    headerFields: [
      {
        id: 'bname',
        label: 'Kullanıcı Adı (User ID)',
        techName: 'USR02-BNAME',
        type: 'text',
        defaultValue: 'BERKE.ERGEN',
        required: true,
      },
      {
        id: 'ustyp',
        label: 'Kullanıcı Türü',
        techName: 'USR02-USTYP',
        type: 'select',
        defaultValue: 'A',
        required: true,
        options: [
          { value: 'A', label: 'A - Dialog (Etkileşimli Gerçek Kullanıcı)' },
          { value: 'S', label: 'S - System (Arka Plan Entegrasyon Servis Kullanıcısı)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_address',
        name: 'Adres & İletişim',
        fields: [
          {
            id: 'name_first',
            label: 'Adı',
            techName: 'ADDR3_VAL-NAME_FIRST',
            type: 'text',
            defaultValue: 'Berke',
          },
          {
            id: 'name_last',
            label: 'Soyadı',
            techName: 'ADDR3_VAL-NAME_LAST',
            type: 'text',
            defaultValue: 'Ergen',
          },
          {
            id: 'department',
            label: 'Departman',
            techName: 'ADDR3_VAL-DEPARTMENT',
            type: 'text',
            defaultValue: 'Satış ve Kurumsal Operasyon Direktörlüğü',
          },
          {
            id: 'email',
            label: 'E-Posta',
            techName: 'ADDR3_VAL-SMTP_ADDR',
            type: 'text',
            defaultValue: 'berke.ergen@turkiyesanayi.com.tr',
          },
        ],
      },
      {
        id: 'tab_roles',
        name: 'Roller & Yetkilendirme (PFCG)',
        fields: [
          {
            id: 'role_1',
            label: '1. Yetki Rolü (Rol Adı)',
            techName: 'AGR_USERS-AGR_NAME',
            type: 'select',
            defaultValue: 'Z_SD_SALES_MANAGER_TR',
            options: [
              { value: 'Z_SD_SALES_MANAGER_TR', label: 'Z_SD_SALES_MANAGER_TR - Tam Satış ve Dağıtım Yetkisi' },
              { value: 'Z_MM_LOGISTICS_LEAD', label: 'Z_MM_LOGISTICS_LEAD - Malzeme ve Depo Yetkisi' },
              { value: 'SAP_ALL', label: 'SAP_ALL - Tam Sistem Yöneticisi (Super Admin)' },
            ],
            turkeyNote: 'PFCG rolü Türkiye e-Fatura/e-İrsaliye işlem kodlarını da içerir.',
          },
        ],
      },
    ],
  },

  SE11: {
    tCode: 'SE11',
    module: 'BASIS',
    screenTitle: 'ABAP Sözlüğü: Başlangıç Ekranı (Data Dictionary)',
    subTitle: 'Veritabanı Tabloları, Veri Öğeleri ve Görünümler',
    programName: 'SAPMSED7',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'DT 001',
      message: 'Tablo adını (Örn: VBAK, MARA, BKPF) girip "Görüntüle (F7)" butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'DT 101',
      messageTemplate: 'Veritabanı tablosu {docNo} HANA üzerinde aktifleştirildi.',
    },
    headerFields: [
      {
        id: 'table_name',
        label: 'Veritabanı Tablosu',
        techName: 'DDOBJNAME',
        type: 'select',
        defaultValue: 'VBAK',
        required: true,
        options: [
          { value: 'VBAK', label: 'VBAK - Satış Belgesi: Başlık Verileri (Sales Order Header)' },
          { value: 'VBAP', label: 'VBAP - Satış Belgesi: Kalem Verileri (Sales Order Items)' },
          { value: 'MARA', label: 'MARA - Genel Malzeme Verileri (Material Master)' },
          { value: 'BKPF', label: 'BKPF - Muhasebe Belgesi: Başlık Verileri (FI Header)' },
          { value: 'BSEG', label: 'BSEG - Muhasebe Belgesi: Kalem Parçaları (FI Line Items)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_fields',
        name: 'Alanlar (Fields - SQL Şeması)',
        fields: [
          {
            id: 'f1',
            label: 'MANDT (İstemci)',
            techName: 'MANDT',
            type: 'text',
            defaultValue: 'CLNT(3) - Şirket SAP İstemcisi (Örn: 100)',
          },
          {
            id: 'f2',
            label: 'VBELN (Satış Belgesi No)',
            techName: 'VBELN',
            type: 'text',
            defaultValue: 'CHAR(10) - Birincil Anahtar (Primary Key)',
          },
          {
            id: 'f3',
            label: 'ERDAT (Kayıt Tarihi)',
            techName: 'ERDAT',
            type: 'text',
            defaultValue: 'DATS(8) - Sisteme Giriş Tarihi',
          },
          {
            id: 'f4',
            label: 'AUART (Sipariş Türü)',
            techName: 'AUART',
            type: 'text',
            defaultValue: 'CHAR(4) - ZOR / OR / RE',
          },
          {
            id: 'f5',
            label: 'VKORG (Satış Örgütü)',
            techName: 'VKORG',
            type: 'text',
            defaultValue: 'CHAR(4) - 1000 TR Satış Merkezi',
          },
          {
            id: 'f6',
            label: 'NETWR (Net Değer)',
            techName: 'NETWR',
            type: 'text',
            defaultValue: 'CURR(15,2) - KDV Hariç Belge Toplamı',
          },
        ],
      },
    ],
  },

  PA30: {
    tCode: 'PA30',
    module: 'HCM',
    screenTitle: 'Personel Ana Verisi Bakımı (Maintain HR Master Data)',
    subTitle: 'Çalışan Özlük Dosyası, SGK ve Ücret Bilgi Tipleri (Infotypes)',
    programName: 'SAPMP50A',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'HR 001',
      message: 'Personel sicil numarasını ve bilgi tipini (Infotype) seçin.',
    },
    saveSuccessMessage: {
      code: 'HR 100',
      messageTemplate: 'Personel {docNo} özlük dosyası güncellendi (SGK İşe Giriş Bildirgesi Üretildi).',
    },
    headerFields: [
      {
        id: 'pernr',
        label: 'Personel Sicil Numarası',
        techName: 'PERNR-PERNR',
        type: 'text',
        defaultValue: '2026041',
        required: true,
      },
      {
        id: 'infotype',
        label: 'Bilgi Tipi (Infotype)',
        techName: 'P0000-INFTY',
        type: 'select',
        defaultValue: '0002',
        required: true,
        options: [
          { value: '0002', label: '0002 - Kişisel Veriler (TC Kimlik, Doğum, Uyruk)' },
          { value: '0001', label: '0001 - Organizasyonel Atama (Şirket, Departman)' },
          { value: '0008', label: '0008 - Temel Ücret & Brüt Maaş (Mevzuat TR)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_personal',
        name: 'Kişisel Veriler & TC SGK',
        fields: [
          {
            id: 'tckn',
            label: 'TC Kimlik Numarası',
            techName: 'Q0002-PERID',
            type: 'text',
            defaultValue: '38192047192',
          },
          {
            id: 'cinsiyet',
            label: 'Cinsiyet & Medeni Hal',
            techName: 'P0002-GESCH',
            type: 'text',
            defaultValue: 'Erkek / Bekar',
          },
          {
            id: 'gorev',
            label: 'İş Unvanı',
            techName: 'P0001-PLANS',
            type: 'text',
            defaultValue: 'Kıdemli Satış & Operasyon Mühendisi',
          },
          {
            id: 'brut_maas',
            label: 'Brüt Aylık Maaş (TRY)',
            techName: 'Q0008-BET01',
            type: 'text',
            defaultValue: '95.000,00 TRY (SGK Tavanı Kapsamında)',
          },
        ],
      },
    ],
  },

  LT01: {
    tCode: 'LT01',
    module: 'WM',
    screenTitle: 'Transfer Siparişi Yarat (Create Transfer Order)',
    subTitle: 'Depo Rafları Arası Mal Taşıma ve Rampa Yerleştirme',
    programName: 'SAPML03T',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'L3 001',
      message: 'Depo numarası ve hareket türünü girip Enter\'a basın.',
    },
    saveSuccessMessage: {
      code: 'L3 100',
      messageTemplate: 'Transfer siparişi {docNo} yaratıldı. Malzeme raf adresine yerleştirildi.',
    },
    headerFields: [
      {
        id: 'lgnum',
        label: 'Depo Numarası',
        techName: 'LTAK-LGNUM',
        type: 'select',
        defaultValue: '100',
        required: true,
        options: [
          { value: '100', label: '100 - Gebze Yüksek Raflı Akıllı Lojistik Deposu' },
        ],
      },
      {
        id: 'bwlvs',
        label: 'Hareket Türü',
        techName: 'LTAK-BWLVS',
        type: 'select',
        defaultValue: '999',
        required: true,
        options: [
          { value: '999', label: '999 - Depo İçi Manuel Transfer' },
          { value: '101', label: '101 - Satın Alma Mal Kabulünden Rafa Yerleştirme' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_bins',
        name: 'Kaynak ve Hedef Raf Adresleri',
        fields: [
          {
            id: 'von_typ',
            label: 'Kaynak Depo Tipi & Gözü',
            techName: 'LTAP-VLTYP',
            type: 'text',
            defaultValue: '902 (Giriş Rampası / Mal Kabul Bölgesi)',
          },
          {
            id: 'nach_typ',
            label: 'Hedef Depo Tipi & Gözü',
            techName: 'LTAP-NLTYP',
            type: 'text',
            defaultValue: '001 (Yüksek Raf Bölgesi) / Raf No: A-04-12',
          },
          {
            id: 'matnr_wm',
            label: 'Taşınan Malzeme',
            techName: 'LTAP-MATNR',
            type: 'text',
            defaultValue: 'MAT-01 - Endüstriyel Kontrol Modülü (10 Palet)',
          },
        ],
      },
    ],
  },

  VK11: {
    tCode: 'VK11',
    module: 'SD',
    screenTitle: 'Koşul Kayıtları Yarat: Fiyatlandırma (PR00 / K007 / MWST)',
    subTitle: 'Başak Varlıoğlu Koşul Tekniği Rehberi — Satış Fiyatı ve İskonto Matrisi',
    programName: 'SAPMV13A',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'VK 001',
      message: 'Koşul türü PR00 seçildi. Müşteri ve malzeme bazlı satış fiyatını tanımlayın.',
    },
    saveSuccessMessage: {
      code: 'VK 100',
      messageTemplate: 'Koşul kayıtları kaydedildi (Belge: {docNo} - PR00 Fiyat Tablosu Güncellendi).',
    },
    headerFields: [
      {
        id: 'kschl',
        label: 'Koşul Türü (Condition Type)',
        techName: 'RV13A-KSCHL',
        type: 'select',
        defaultValue: 'PR00',
        required: true,
        options: [
          { value: 'PR00', label: 'PR00 - Baz Liste Satış Fiyatı (Gross Price)' },
          { value: 'K007', label: 'K007 - Müşteri Özel İskontosu (%)' },
          { value: 'KF00', label: 'KF00 - Navlun ve Taşıma Bedeli' },
          { value: 'MWST', label: 'MWST - Hesaplanan KDV (%20 Türkiye)' },
        ],
      },
      {
        id: 'vkorg',
        label: 'Satış Örgütü',
        techName: 'KOMG-VKORG',
        type: 'text',
        defaultValue: '1000 - Türkiye Merkez Satış',
        required: true,
      },
      {
        id: 'vtweg',
        label: 'Dağıtım Kanalı',
        techName: 'KOMG-VTWEG',
        type: 'text',
        defaultValue: '10 - Kurumsal Yurtiçi Satış',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vk11_matrix',
        name: 'Fiyat Koşul Tablosu (Anahtar Kombinasyonu)',
        fields: [
          {
            id: 'matnr_vk',
            label: 'Malzeme Kodu',
            techName: 'KOMG-MATNR',
            type: 'text',
            defaultValue: 'MAT-TURK-01 (Endüstriyel Kontrol Modülü V3)',
          },
          {
            id: 'kbetr',
            label: 'Birim Tutar / Oran',
            techName: 'KONP-KBETR',
            type: 'text',
            defaultValue: '4.500,00 TRY / 1 ST',
          },
          {
            id: 'datab',
            label: 'Geçerlilik Başlangıcı',
            techName: 'RV13A-DATAB',
            type: 'date',
            defaultValue: '2026-01-01',
          },
          {
            id: 'datbi',
            label: 'Geçerlilik Bitişi',
            techName: 'RV13A-DATBI',
            type: 'date',
            defaultValue: '9999-12-31',
          },
        ],
      },
    ],
  },

  VT01N: {
    tCode: 'VT01N',
    module: 'SD',
    screenTitle: 'Nakliye Emri Yarat: Lojistik Yürütme (LE-TRA)',
    subTitle: 'Giden Teslimatların Kamyon/Tır Seferine Atanması ve Rota Planlama',
    programName: 'SAPMV56A',
    screenNumber: '1010',
    statusBarOnLoad: {
      type: 'info',
      code: 'VT 001',
      message: 'Ulaştırma planlama noktasını ve nakliye türünü seçip teslimatları ekleyin.',
    },
    saveSuccessMessage: {
      code: 'VT 100',
      messageTemplate: 'Nakliye emri {docNo} kaydedildi. Sefer ve araç plakası GİB e-İrsaliye sistemine bağlandı.',
    },
    headerFields: [
      {
        id: 'tplst',
        label: 'Ulaştırma Planlama Noktası',
        techName: 'VTTK-TPLST',
        type: 'text',
        defaultValue: '1000 - Gebze Lojistik Filo Yönetimi',
        required: true,
      },
      {
        id: 'shtyp',
        label: 'Nakliye Türü',
        techName: 'VTTK-SHTYP',
        type: 'select',
        defaultValue: '0001',
        required: true,
        options: [
          { value: '0001', label: '0001 - Karayolu Kamyon / Tır Münferit Sefer' },
          { value: '0002', label: '0002 - Denizyolu Konteyner Sevkiyatı' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_vt01_stages',
        name: 'Sefer, Plaka ve Nakliye Aşamaları',
        fields: [
          {
            id: 'tdlnr',
            label: 'Nakliye Firması (Lojistik Satıcısı)',
            techName: 'VTTK-TDLNR',
            type: 'text',
            defaultValue: '300090 - Ekol / Mars Lojistik Taşımacılık A.Ş.',
          },
          {
            id: 'signi',
            label: 'Çekici / Dorse Plaka No',
            techName: 'VTTK-SIGNI',
            type: 'text',
            defaultValue: '34 SAP 1923 / 34 DOR 88',
          },
          {
            id: 'exti1',
            label: 'Sürücü Adı & TCKN',
            techName: 'VTTK-EXTI1',
            type: 'text',
            defaultValue: 'Ahmet Yılmaz (TCKN: 28491029384)',
          },
        ],
      },
    ],
  },

  MD04: {
    tCode: 'MD04',
    module: 'PP',
    screenTitle: 'Stok / Gereksinim Listesi (Stock/Requirements List - MRP)',
    subTitle: 'Anlık Depo Stoğu, Müşteri Siparişleri ve Üretim/Satınalma Çağrıları',
    programName: 'SAPMM61R',
    screenNumber: '0300',
    statusBarOnLoad: {
      type: 'info',
      code: 'MD 001',
      message: 'MRP listesi güncel. Kırmızı satırlar malzeme açığını, yeşil satırlar gelen tedariki gösterir.',
    },
    saveSuccessMessage: {
      code: 'MD 100',
      messageTemplate: 'MRP planlı siparişi {docNo} üretim emrine (CO01) dönüştürüldü.',
    },
    headerFields: [
      {
        id: 'matnr',
        label: 'Malzeme Kodu',
        techName: 'RM61R-MATNR',
        type: 'text',
        defaultValue: 'MAT-01 (Endüstriyel Akıllı Kontrol Modülü)',
        required: true,
      },
      {
        id: 'werks',
        label: 'Üretim Tesisi',
        techName: 'RM61R-WERKS',
        type: 'text',
        defaultValue: '1000 - Gebze Ana Fabrika',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_md04_list',
        name: 'MRP Dinamik Arz / Talep Kokpiti',
        fields: [
          {
            id: 'mrp_1',
            label: '1. Fabrika Başlangıç Stoğu (WBSt)',
            techName: 'MARD-LABST',
            type: 'text',
            defaultValue: '+ 25,00 ST (Serbest Kullanılabilir Depo Stoğu)',
          },
          {
            id: 'mrp_2',
            label: '2. Müşteri Siparişi (MüşSip 0000014205)',
            techName: 'VBAK-VBELN',
            type: 'text',
            defaultValue: '- 50,00 ST (İhtiyaç Tarihi: 05.11.2026 -> Açık: -25 ST)',
          },
          {
            id: 'mrp_3',
            label: '3. Planlı Sipariş (PlnSip 000089102)',
            techName: 'PLAF-PLNUM',
            type: 'text',
            defaultValue: '+ 50,00 ST (MRP Otomatik Üretim Önerisi -> Net Stok: +25 ST)',
          },
        ],
      },
    ],
  },

  CS01: {
    tCode: 'CS01',
    module: 'PP',
    screenTitle: 'Malzeme Ürün Ağacı Yarat (Create Material BOM)',
    subTitle: 'Mamul Üretimi İçin Alt Hammadde ve Yarı Mamul Reçetesi',
    programName: 'SAPMC29S',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'CS 001',
      message: 'Mamul kodu, tesis ve ürün ağacı kullanımını (1: Üretim) girin.',
    },
    saveSuccessMessage: {
      code: 'CS 100',
      messageTemplate: 'Malzeme ürün ağacı (BOM) {docNo} kaydedildi ve MRP için aktifleştirildi.',
    },
    headerFields: [
      {
        id: 'matnr',
        label: 'Mamul Malzeme Kodu',
        techName: 'RC29N-MATNR',
        type: 'text',
        defaultValue: 'MAT-01',
        required: true,
      },
      {
        id: 'werks',
        label: 'Tesis',
        techName: 'RC29N-WERKS',
        type: 'text',
        defaultValue: '1000',
        required: true,
      },
      {
        id: 'stlan',
        label: 'Ürün Ağacı Kullanımı',
        techName: 'RC29N-STLAN',
        type: 'select',
        defaultValue: '1',
        required: true,
        options: [
          { value: '1', label: '1 - Fabrika İmalat Üretimi' },
          { value: '3', label: '3 - Evrensel (Üretim + Satış + Maliyet)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_cs01_items',
        name: 'Ürün Ağacı Kalemleri (Bileşen Reçetesi)',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      { kalemNo: '0010', malzeme: 'ROH-1001', kisaMetin: 'Mikroişlemci Entegre Kartı', miktar: 1, birim: 'ST', fiyat: 250, paraBirimi: 'TRY', depoYeri: '0001' },
      { kalemNo: '0020', malzeme: 'ROH-1002', kisaMetin: 'Alüminyum Soğutucu Blok', miktar: 1, birim: 'ST', fiyat: 80, paraBirimi: 'TRY', depoYeri: '0001' },
      { kalemNo: '0030', malzeme: 'ROH-1003', kisaMetin: 'Bağlantı Kablo Demeti M8', miktar: 2, birim: 'ST', fiyat: 15, paraBirimi: 'TRY', depoYeri: '0001' },
    ],
  },

  CR01: {
    tCode: 'CR01',
    module: 'PP',
    screenTitle: 'İş Yeri Yarat (Create Work Center)',
    subTitle: 'Fabrika Üretim Hattı, Kapasite ve Maliyet Merkezi Entegrasyonu',
    programName: 'SAPLCR01',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'CR 001',
      message: 'İş yeri kodunu ve kategorisini (0001: Makine) girin.',
    },
    saveSuccessMessage: {
      code: 'CR 100',
      messageTemplate: 'İş yeri {docNo} Gebze fabrikasında oluşturuldu ve CO masraf yerine bağlandı.',
    },
    headerFields: [
      {
        id: 'werks',
        label: 'Tesis',
        techName: 'RCR01-WERKS',
        type: 'text',
        defaultValue: '1000',
        required: true,
      },
      {
        id: 'arbpl',
        label: 'İş Yeri Kodu',
        techName: 'RCR01-ARBPL',
        type: 'text',
        defaultValue: 'MONTAJ-01',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_cr01_cost',
        name: 'Kapasite & Maliyet Muhasebesi (CO) Bağlantısı',
        fields: [
          {
            id: 'ktext',
            label: 'İş Yeri Tanımı',
            techName: 'CRHD-KTEXT',
            type: 'text',
            defaultValue: 'Otomatik SMD Elektronik Dizgi ve Montaj Hattı 1',
          },
          {
            id: 'kostl',
            label: 'Bağlı Masraf Yeri (CO)',
            techName: 'CRCO-KOSTL',
            type: 'text',
            defaultValue: '1000CC01 - Üretim Montaj Gider Yeri',
          },
          {
            id: 'lar01',
            label: 'Aktivite Türü (Makine / İşçilik)',
            techName: 'CRCO-LSTAR',
            type: 'text',
            defaultValue: 'MACH (Makine Saati) / PERS (Direkt İşçilik Saati)',
          },
        ],
      },
    ],
  },

  CO11N: {
    tCode: 'CO11N',
    module: 'PP',
    screenTitle: 'Üretim Siparişi Operasyon Teyidi (Time Ticket Confirmation)',
    subTitle: 'Vardiya Sonu Üretilen Sağlam Miktar, Fire ve Süre Bildirimi',
    programName: 'SAPLCORU_S',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'RU 001',
      message: 'Üretim siparişi numarasını ve üretilen sağlam adedi (Yield) girin.',
    },
    saveSuccessMessage: {
      code: 'RU 100',
      messageTemplate: 'Teyit {docNo} kaydedildi. Hammadde sarfiyatı (261) ve mamul girişi (101) otomatik yapıldı.',
    },
    headerFields: [
      {
        id: 'aufnr',
        label: 'Üretim Siparişi No',
        techName: 'AFRUD-AUFNR',
        type: 'text',
        defaultValue: '00001004520',
        required: true,
      },
      {
        id: 'vornr',
        label: 'Operasyon No',
        techName: 'AFRUD-VORNR',
        type: 'text',
        defaultValue: '0010 - Elektronik Kart Montaj ve Lehimleme',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_co11n_qty',
        name: 'Miktarlar ve Aktivite Süreleri',
        fields: [
          {
            id: 'lmnga',
            label: 'Sağlam Üretim Miktarı (Yield)',
            techName: 'AFRUD-LMNGA',
            type: 'number',
            defaultValue: '50',
          },
          {
            id: 'xmnga',
            label: 'Hurda / Fire Miktarı (Scrap)',
            techName: 'AFRUD-XMNGA',
            type: 'number',
            defaultValue: '0',
          },
          {
            id: 'ism01',
            label: 'Fiili Makine Çalışma Süresi',
            techName: 'AFRUD-ISM01',
            type: 'text',
            defaultValue: '4,5 Saat',
          },
        ],
      },
    ],
  },

  QA11: {
    tCode: 'QA11',
    module: 'QM',
    screenTitle: 'Kullanım Kararı Kaydet (Record Usage Decision - UD)',
    subTitle: 'Kalite Kontrol Partisinin Kabul Edilerek Serbest Stoğa Aktarımı',
    programName: 'SAPMQEVA',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'QV 001',
      message: 'Muayene partisi 01000004821 yüklendi. UD kodunu A (Kabul) seçin.',
    },
    saveSuccessMessage: {
      code: 'QV 100',
      messageTemplate: 'Kullanım kararı {docNo} kaydedildi. Stok Kalite Blokesinden Serbest Kullanıma geçti (321 Hareketi).',
    },
    headerFields: [
      {
        id: 'prueflos',
        label: 'Muayene Partisi No',
        techName: 'QALS-PRUEFLOS',
        type: 'text',
        defaultValue: '01000004821',
        required: true,
      },
      {
        id: 'vcode',
        label: 'UD Karar Kodu',
        techName: 'QAVE-VCODE',
        type: 'select',
        defaultValue: 'A',
        required: true,
        options: [
          { value: 'A', label: 'A - Kabul (Serbest Stoğa Otomatik Aktar - Puan: 100)' },
          { value: 'R', label: 'R - Ret (Bloke Stoğa Al ve Satıcıya İade Başlat - Puan: 1)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_qa11_stock',
        name: 'Kalite Stok Kaydı (Inventory Posting)',
        fields: [
          {
            id: 'lmengeist',
            label: 'Serbest Stoğa Aktarılacak Miktar',
            techName: 'RQEVA-LMENGE01',
            type: 'text',
            defaultValue: '50,00 ST (Tamamı Onaylandı)',
          },
          {
            id: 'qual_score',
            label: 'Tedarikçi Kalite Puanı',
            techName: 'QAVE-QKENNZAHL',
            type: 'text',
            defaultValue: '100 / 100 (A Sınıfı Onaylı Tedarikçi)',
          },
        ],
      },
    ],
  },

  IW21: {
    tCode: 'IW21',
    module: 'PM',
    screenTitle: 'Bakım Bildirimi Yarat: Arıza Çağrısı (M2)',
    subTitle: 'Üretim Hattındaki Makine Arızasının Bakım Ekibine Bildirilmesi',
    programName: 'SAPLIQS0',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'IM 001',
      message: 'Bildirim türü M2 (Arıza Raporu) seçildi. Arızalı ekipmanı ve önceliği girin.',
    },
    saveSuccessMessage: {
      code: 'IM 100',
      messageTemplate: 'Arıza bildirimi {docNo} kaydedildi ve bakım başmühendisine iletildi.',
    },
    headerFields: [
      {
        id: 'qmart',
        label: 'Bildirim Türü',
        techName: 'RIWO00-QMART',
        type: 'select',
        defaultValue: 'M2',
        required: true,
        options: [
          { value: 'M2', label: 'M2 - Makine Arıza Bildirimi (Malfunction Report)' },
          { value: 'M1', label: 'M1 - Bakım İsteği' },
        ],
      },
      {
        id: 'equnr',
        label: 'Arızalı Ekipman',
        techName: 'VIQMEL-EQUNR',
        type: 'text',
        defaultValue: 'CNC-1002 (5 Eksen CNC İşleme Merkezi)',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_iw21_detail',
        name: 'Arıza Tanımı & Duruş (Breakdown)',
        fields: [
          {
            id: 'qmtxt',
            label: 'Kısa Metin (Arıza Özeti)',
            techName: 'VIQMEL-QMTXT',
            type: 'text',
            defaultValue: 'Hidrolik Basınç Düşüklüğü ve Mil Kilitleme Hatası',
          },
          {
            id: 'priok',
            label: 'Öncelik',
            techName: 'VIQMEL-PRIOK',
            type: 'text',
            defaultValue: '1 - Çok Yüksek (Hat Duruşu / Acil Müdahale)',
          },
        ],
      },
    ],
  },

  IW51: {
    tCode: 'IW51',
    module: 'PM',
    screenTitle: 'Servis Bildirimi Yarat: Müşteri Hizmetleri (CS)',
    subTitle: 'Müşteri Sahasındaki Ürün Arızası ve Garanti Kapsamı Kaydı',
    programName: 'SAPLIQS0',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'CS 010',
      message: 'Müşteri kodunu ve seri numarasını girerek garanti kontrolü yapın.',
    },
    saveSuccessMessage: {
      code: 'CS 110',
      messageTemplate: 'Müşteri servis bildirimi {docNo} açıldı. Saha servis teknisyeni atandı.',
    },
    headerFields: [
      {
        id: 'qmart',
        label: 'Servis Bildirim Türü',
        techName: 'RIWO00-QMART',
        type: 'text',
        defaultValue: 'S1 - Müşteri Destek ve Arıza Çağrısı',
        required: true,
      },
      {
        id: 'kunum',
        label: 'Müşteri (Sold-To Party)',
        techName: 'VIQMEL-KUNUM',
        type: 'text',
        defaultValue: '100021 - Koçak Lojistik A.Ş.',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_iw51_warranty',
        name: 'Seri No & Garanti Durumu',
        fields: [
          {
            id: 'sernr',
            label: 'Cihaz Seri Numarası',
            techName: 'VIQMEL-SERNR',
            type: 'text',
            defaultValue: 'SN-TR-2026-99812 (MAT-TURK-01)',
          },
          {
            id: 'garanti',
            label: 'Garanti Durumu',
            techName: 'BGMT-WARR',
            type: 'text',
            defaultValue: '✔ Garanti Devam Ediyor (Bitiş: 28.10.2028 - Ücretsiz Servis)',
          },
        ],
      },
    ],
  },

  '/SCWM/MON': {
    tCode: '/SCWM/MON',
    module: 'WM',
    screenTitle: 'EWM Depo Yönetim Monitörü (Warehouse Management Monitor)',
    subTitle: 'Rampa, Antrepo, Palet (HU) ve RF El Terminali Görev Kontrol Merkezi',
    programName: '/SCWM/SAPLWIP_MON',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'EWM 001',
      message: 'Depo 1000 canlı izleme aktif. Açık depo görevlerini (Warehouse Tasks) denetleyin.',
    },
    saveSuccessMessage: {
      code: 'EWM 100',
      messageTemplate: 'Depo görevi {docNo} RF el terminaline atandı ve onaylandı.',
    },
    headerFields: [
      {
        id: 'lgnum',
        label: 'EWM Depo Numarası',
        techName: '/SCWM/LGNUM',
        type: 'text',
        defaultValue: 'W100 - Gebze Akıllı Lojistik & Antrepo Merkezi',
        required: true,
      },
      {
        id: 'monit',
        label: 'Monitör Şeması',
        techName: '/SCWM/MONIT',
        type: 'text',
        defaultValue: 'SAP - Standart Depo Yöneticisi Kokpiti',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_ewm_ overview',
        name: 'Canlı Rampa & Raf Doluluk Durumu',
        fields: [
          {
            id: 'door_1',
            label: 'Rampa Kapı 01 (Inbound)',
            techName: 'DOOR-01',
            type: 'text',
            defaultValue: '34 SAP 1923 Tır Yanaştı — %85 Boşaltma Tamamlandı',
          },
          {
            id: 'hu_count',
            label: 'Aktif Palet / Taşıma Birimi (HU)',
            techName: 'HU-TOTAL',
            type: 'text',
            defaultValue: '1.420 Adet SSCC Barkodlu Palet Raf Adreslerinde',
          },
          {
            id: 'rf_queue',
            label: 'RF El Terminali Kuyruğu',
            techName: 'RF-QUEUE',
            type: 'text',
            defaultValue: '12 Forklift Operatörü Çevrimiçi (Bekleyen Görev: 3)',
          },
        ],
      },
    ],
  },

  CJ20N: {
    tCode: 'CJ20N',
    module: 'PS',
    screenTitle: 'Proje Oluşturucu: WBS ve Ağ Diyagramı (Project Builder)',
    subTitle: 'Yatırım Projeleri, İş Kırılım Yapısı (WBS) ve Bütçe Kontrolü',
    programName: 'SAPLCNPB_M',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'CJ 001',
      message: 'Proje TR-2026-FABRIKA yüklendi. WBS öğelerini ve yatırım bütçesini inceleyin.',
    },
    saveSuccessMessage: {
      code: 'CJ 100',
      messageTemplate: 'Proje {docNo} ve WBS kırılımları kaydedildi (Durum: REL - Serbest).',
    },
    headerFields: [
      {
        id: 'pspid',
        label: 'Proje Tanımı (Project Def.)',
        techName: 'PROJ-PSPID',
        type: 'text',
        defaultValue: 'TR-2026-01 (Yeni Gebze Otomasyon Hattı Yatırımı)',
        required: true,
      },
      {
        id: 'vbukr',
        label: 'Şirket Kodu',
        techName: 'PROJ-VBUKR',
        type: 'text',
        defaultValue: 'TR01',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_cj20n_wbs',
        name: 'WBS İş Kırılım Ağacı & Yatırım Bütçesi',
        fields: [
          {
            id: 'wbs_1',
            label: 'Faz 1: Mühendislik & Tasarım (TR-2026-01.01)',
            techName: 'PRPS-POSID',
            type: 'text',
            defaultValue: 'Bütçe: 1.500.000 TRY | Fiili Harcama: 1.200.000 TRY',
          },
          {
            id: 'wbs_2',
            label: 'Faz 2: Robotik Hat Kurulumu (TR-2026-01.02)',
            techName: 'PRPS-POSID',
            type: 'text',
            defaultValue: 'Bütçe: 8.500.000 TRY | Fiili Harcama: 4.100.000 TRY',
          },
          {
            id: 'wbs_3',
            label: 'Faz 3: Devreye Alma & Test (TR-2026-01.03)',
            techName: 'PRPS-POSID',
            type: 'text',
            defaultValue: 'Bütçe: 500.000 TRY | Durum: Planlandı',
          },
        ],
      },
    ],
  },

  KS01: {
    tCode: 'KS01',
    module: 'CO',
    screenTitle: 'Masraf Yeri Yarat (Create Cost Center)',
    subTitle: 'Departman Gider Merkezleri ve Maliyet Muhasebesi Hiyerarşisi',
    programName: 'SAPLKMA1',
    screenNumber: '0200',
    statusBarOnLoad: {
      type: 'info',
      code: 'KS 001',
      message: 'Kontrol alanı TR01. Masraf yeri kodunu ve geçerlilik tarihini girin.',
    },
    saveSuccessMessage: {
      code: 'KS 100',
      messageTemplate: 'Masraf yeri {docNo} TR01 kontrol alanında oluşturuldu.',
    },
    headerFields: [
      {
        id: 'kokrs',
        label: 'Kontrol Alanı (Controlling Area)',
        techName: 'CSKSZ-KOKRS',
        type: 'text',
        defaultValue: 'TR01 - Türkiye Maliyet Kontrol Alanı',
        required: true,
      },
      {
        id: 'kostl',
        label: 'Masraf Yeri Kodu',
        techName: 'CSKSZ-KOSTL',
        type: 'text',
        defaultValue: '1000CC05',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_ks01_basic',
        name: 'Temel Veriler & Hiyerarşi',
        fields: [
          {
            id: 'ktext',
            label: 'Masraf Yeri Adı',
            techName: 'CSKSZ-KTEXT',
            type: 'text',
            defaultValue: 'Kurumsal Satış ve Pazarlama Direktörlüğü',
          },
          {
            id: 'verak',
            label: 'Sorumlu Yönetici',
            techName: 'CSKSZ-VERAK',
            type: 'text',
            defaultValue: 'Berke Ergen',
          },
          {
            id: 'kosar',
            label: 'Masraf Yeri Türü',
            techName: 'CSKSZ-KOSAR',
            type: 'text',
            defaultValue: 'V - Satış & Dağıtım (760 Hesap Entegreli)',
          },
        ],
      },
    ],
  },

  KSB1: {
    tCode: 'KSB1',
    module: 'CO',
    screenTitle: 'Masraf Yerleri: Fiili Münferit Kalemler Raporu',
    subTitle: 'Departman Bazında Harcanan Tüm Giderlerin Detay Analizi',
    programName: 'RKAEP000',
    screenNumber: '0110',
    statusBarOnLoad: {
      type: 'info',
      code: 'KA 001',
      message: 'Masraf yeri ve masraf çeşidi aralığını seçip F8 (Yürüt) tuşuna basın.',
    },
    saveSuccessMessage: {
      code: 'KA 100',
      messageTemplate: 'Rapor düzeni {docNo} kaydedildi ve Excel çıktısı hazırlandı.',
    },
    headerFields: [
      {
        id: 'kostl',
        label: 'Masraf Yeri',
        techName: 'KOSTL',
        type: 'text',
        defaultValue: '1000CC01 - 1000CC99',
        required: true,
      },
      {
        id: 'kstar',
        label: 'Masraf Çeşidi (770 / 760)',
        techName: 'KSTAR',
        type: 'text',
        defaultValue: '770000 - 770999 (Genel Yönetim Giderleri)',
      },
    ],
    tabs: [
      {
        id: 'tab_ksb1_lines',
        name: 'Fiili Masraf Kalemleri Listesi',
        fields: [
          {
            id: 'line_1',
            label: 'Belge 100002488 (28.10.2026)',
            techName: 'COEP-BELNR',
            type: 'text',
            defaultValue: '770020 Danışmanlık Gideri | 1000CC01 | 24.000,00 TRY',
          },
          {
            id: 'line_2',
            label: 'Belge 100002490 (29.10.2026)',
            techName: 'COEP-BELNR',
            type: 'text',
            defaultValue: '760010 Lojistik Navlun Gideri | 1000CC05 | 18.500,00 TRY',
          },
        ],
      },
    ],
  },

  'F-53': {
    tCode: 'F-53',
    module: 'FI',
    screenTitle: 'Çıkan Ödeme Kaydı: Başlangıç Ekranı (Post Outgoing Payments)',
    subTitle: 'Bankadan Tedarikçiye EFT/Havale Gönderimi ve 320 Açık Kalem Dengeleme',
    programName: 'SAPMF05A',
    screenNumber: '0103',
    statusBarOnLoad: {
      type: 'info',
      code: 'F5 001',
      message: 'Banka hesabını (102), ödeme tutarını ve satıcı kodunu (320) girip Açık Kalemleri İşle butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'F5 312',
      messageTemplate: 'Ödeme belgesi {docNo} kaydedildi. Satıcı açık faturası kapatıldı (BSIK -> BSAK).',
    },
    headerFields: [
      {
        id: 'bldat',
        label: 'Belge Tarihi',
        techName: 'BKPF-BLDAT',
        type: 'date',
        defaultValue: '2026-10-29',
        required: true,
      },
      {
        id: 'bukrs',
        label: 'Şirket Kodu',
        techName: 'BKPF-BUKRS',
        type: 'text',
        defaultValue: 'TR01',
        required: true,
      },
      {
        id: 'konto_bank',
        label: 'Banka Ana Hesabı (102)',
        techName: 'RF05A-KONTO',
        type: 'text',
        defaultValue: '102001 - Garanti BBVA Ticari TL Hesabı',
        required: true,
      },
      {
        id: 'wrbtr',
        label: 'Ödenen Tutar',
        techName: 'BSEG-WRBTR',
        type: 'text',
        defaultValue: '24.000,00 TRY',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_f53_open',
        name: 'Satıcı Açık Kalem Seçimi (320 Cari Kapatma)',
        fields: [
          {
            id: 'agkon',
            label: 'Satıcı Hesabı (Vendor)',
            techName: 'RF05A-AGKON',
            type: 'text',
            defaultValue: '320001 - Yıldız Hukuk ve Müşavirlik A.Ş.',
          },
          {
            id: 'open_inv',
            label: 'Eşleşen Açık Fatura',
            techName: 'BSIK-BELNR',
            type: 'text',
            defaultValue: 'Belge: 190000412 | Tutar: 24.000,00 TRY | Atanan: 24.000,00 TRY (Fark: 0,00)',
          },
        ],
      },
    ],
  },

  VA02: {
    tCode: 'VA02',
    module: 'SD',
    screenTitle: 'Satış Siparişi Değiştir: Başlangıç Ekranı',
    subTitle: 'Mevcut Siparişte Miktar, Fiyat, Teslim Tarihi veya Blokaj Güncelleme',
    programName: 'SAPMV45A',
    screenNumber: '0102',
    statusBarOnLoad: {
      type: 'info',
      code: 'V1 002',
      message: 'Değiştirilecek sipariş numarasını girip Enter\'a basın.',
    },
    saveSuccessMessage: {
      code: 'V1 311',
      messageTemplate: 'Standart sipariş {docNo} değiştirildi ve revizyon geçmişine işlendi.',
    },
    headerFields: [
      {
        id: 'vbeln',
        label: 'Sipariş Numarası',
        techName: 'VBAK-VBELN',
        type: 'text',
        defaultValue: '0000014205',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_va02_items',
        name: 'Sipariş Kalem Revizyonu',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      { kalemNo: '10', malzeme: 'MAT-TURK-01', kisaMetin: 'Endüstriyel Kontrol Modülü V3', miktar: 15, birim: 'ST', fiyat: 4500, paraBirimi: 'TRY', depoYeri: '0001' },
    ],
  },

  VF03: {
    tCode: 'VF03',
    module: 'SD',
    screenTitle: 'Fatura Belgesi Görüntüle & Muhasebe Fişi Kontrolü',
    subTitle: 'Kesilen e-Faturanın GİB Zarflarını ve 120/600/391 Muhasebe Kaydını İnceleme',
    programName: 'SAPMV60A',
    screenNumber: '0101',
    statusBarOnLoad: {
      type: 'info',
      code: 'VF 003',
      message: 'Fatura 90004512 görüntülendi. "Muhasebe" butonuna basarak yevmiye kaydını inceleyin.',
    },
    saveSuccessMessage: {
      code: 'VF 000',
      messageTemplate: 'Görüntüleme tamamlandı (Belge: {docNo}).',
    },
    headerFields: [
      {
        id: 'vbeln',
        label: 'Fatura Belgesi No',
        techName: 'VBRK-VBELN',
        type: 'text',
        defaultValue: '90004512',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vf03_fi',
        name: 'Entegre FI Yevmiye Kaydı & GİB Durumu',
        fields: [
          {
            id: 'gib_uuid',
            label: 'GİB e-Fatura ETTN / Durum',
            techName: 'ZTR-ETTN',
            type: 'text',
            defaultValue: 'GIB2026000004512 — ✔ Alıcıya Başarıyla İletildi (1300)',
          },
          {
            id: 'fi_doc',
            label: 'Oluşan FI Muhasebe Belgesi',
            techName: 'BKPF-BELNR',
            type: 'text',
            defaultValue: '100002491 (120 Müşteri Borç: 64.800 | 600 Satış Alacak: 54.000 | 391 KDV: 10.800)',
          },
        ],
      },
    ],
  },

  MM03: {
    tCode: 'MM03',
    module: 'MM',
    screenTitle: 'Malzeme Görüntüle: Görünüm Seçimi',
    subTitle: 'Malzeme Ana Verisi, Stok Değerleme Sınıfı ve MRP Parametreleri',
    programName: 'SAPLMGMM',
    screenNumber: '0060',
    statusBarOnLoad: {
      type: 'info',
      code: 'MM 003',
      message: 'Malzeme MAT-TURK-01 ana verileri görüntülendi.',
    },
    saveSuccessMessage: {
      code: 'MM 000',
      messageTemplate: 'Malzeme {docNo} incelemesi tamamlandı.',
    },
    headerFields: [
      {
        id: 'matnr',
        label: 'Malzeme Kodu',
        techName: 'RMMG1-MATNR',
        type: 'text',
        defaultValue: 'MAT-TURK-01',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_mm03_views',
        name: 'Temel Veriler, MRP ve Muhasebe 1',
        fields: [
          {
            id: 'maktx',
            label: 'Malzeme Kısa Metni',
            techName: 'MAKT-MAKTX',
            type: 'text',
            defaultValue: 'Endüstriyel Kontrol Modülü V3',
          },
          {
            id: 'bklas',
            label: 'Değerleme Sınıfı (OMWB)',
            techName: 'MBEW-BKLAS',
            type: 'text',
            defaultValue: '7920 - Bitmiş Mamuller (TDHP: 152 Mamuller Hesabı)',
          },
          {
            id: 'stprs',
            label: 'Standart Maliyet Fiyatı (S)',
            techName: 'MBEW-STPRS',
            type: 'text',
            defaultValue: '3.100,00 TRY',
          },
        ],
      },
    ],
  },

  ME51N: {
    tCode: 'ME51N',
    module: 'MM',
    screenTitle: 'Satın Alma Talebi Yarat (Create Purchase Requisition - PR)',
    subTitle: 'Departmanların Satın Alma Bölümünden İç Malzeme/Hizmet İsteği',
    programName: 'SAPLMEGUI',
    screenNumber: '0014',
    statusBarOnLoad: {
      type: 'info',
      code: 'ME 051',
      message: 'Talep edilen malzeme, miktar ve teslim tarihini girin.',
    },
    saveSuccessMessage: {
      code: 'ME 151',
      messageTemplate: 'Satın alma talebi (SAT) {docNo} oluşturuldu ve onay stratejisine (ME54N) gönderildi.',
    },
    headerFields: [
      {
        id: 'bsart',
        label: 'Belge Türü',
        techName: 'EBAN-BSART',
        type: 'text',
        defaultValue: 'NB - Standart Satın Alma Talebi (SAT)',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_me51n_items',
        name: 'Talep Kalemleri',
        tableType: 'items',
      },
    ],
    defaultTableItems: [
      { kalemNo: '10', malzeme: 'ROH-1001', kisaMetin: 'Mikroişlemci Entegre Kartı', miktar: 100, birim: 'ST', fiyat: 250, paraBirimi: 'TRY', depoYeri: '0001' },
    ],
  },

  MB52: {
    tCode: 'MB52',
    module: 'MM',
    screenTitle: 'Malzeme Depo Stoklarını Görüntüle (Warehouse Stocks)',
    subTitle: 'Tesis ve Depo Yeri Bazında Serbest, Kalite Kontrol ve Bloke Stok Raporu',
    programName: 'RM07MLBS',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'M7 001',
      message: 'Tesis 1000 stok bakiyeleri listelendi.',
    },
    saveSuccessMessage: {
      code: 'M7 100',
      messageTemplate: 'Stok raporu {docNo} dışa aktarıldı.',
    },
    headerFields: [
      {
        id: 'werks',
        label: 'Tesis (Plant)',
        techName: 'WERKS',
        type: 'text',
        defaultValue: '1000 - Gebze Ana Fabrika ve Lojistik Merkezi',
        required: true,
      },
      {
        id: 'lgort',
        label: 'Depo Yeri (Storage Location)',
        techName: 'LGORT',
        type: 'text',
        defaultValue: '0001 (Hammadde) / 0002 (Mamul)',
      },
    ],
    tabs: [
      {
        id: 'tab_mb52_stocks',
        name: 'Anlık Depo Stok Matrisi (MARD)',
        fields: [
          {
            id: 'st_1',
            label: 'MAT-TURK-01 (Depo 0002)',
            techName: 'MARD-LABST',
            type: 'text',
            defaultValue: 'Serbest: 120 ST | Kalite: 0 ST | Bloke: 0 ST | Değer: 372.000,00 TRY',
          },
          {
            id: 'st_2',
            label: 'ROH-1001 (Depo 0001)',
            techName: 'MARD-LABST',
            type: 'text',
            defaultValue: 'Serbest: 450 ST | Kalite: 50 ST | Bloke: 5 ST | Değer: 125.000,00 TRY',
          },
        ],
      },
    ],
  },

  PA40: {
    tCode: 'PA40',
    module: 'HCM',
    screenTitle: 'Personel İşlemleri (Personnel Actions - İşe Giriş / Terfi / Çıkış)',
    subTitle: 'Yeni Personel İşe Alım Süreci ve Bilgi Tipleri (Infogroup) Zinciri',
    programName: 'SAPMP50A',
    screenNumber: '2000',
    statusBarOnLoad: {
      type: 'info',
      code: 'PG 001',
      message: 'Başlangıç tarihini girin ve "İşe Giriş (Hiring)" işlemini seçip F8\'e basın.',
    },
    saveSuccessMessage: {
      code: 'PG 100',
      messageTemplate: 'Personel işe giriş hareketi {docNo} tamamlandı. SGK e-Bildirge XML hazırlandı.',
    },
    headerFields: [
      {
        id: 'begda',
        label: 'İşe Başlangıç Tarihi',
        techName: 'P0000-BEGDA',
        type: 'date',
        defaultValue: '2026-11-01',
        required: true,
      },
      {
        id: 'massn',
        label: 'İşlem Türü (Action Type)',
        techName: 'P0000-MASSN',
        type: 'select',
        defaultValue: '01',
        required: true,
        options: [
          { value: '01', label: '01 - İşe Giriş (Hiring)' },
          { value: '02', label: '02 - Organizasyonel Değişiklik / Terfi' },
          { value: '10', label: '10 - İşten Ayrılış (Leaving)' },
        ],
      },
    ],
    tabs: [
      {
        id: 'tab_pa40_steps',
        name: 'Otomatik Açılan Bilgi Tipleri Sırası',
        fields: [
          {
            id: 'it0000',
            label: '1. IT0000 - İşlemler',
            techName: 'IT0000',
            type: 'text',
            defaultValue: 'Aktif Çalışan / Belirsiz Süreli İş Sözleşmesi',
          },
          {
            id: 'it0001',
            label: '2. IT0001 - Kurumsal Atama',
            techName: 'IT0001',
            type: 'text',
            defaultValue: 'Şirket: TR01 | Personel Alanı: TR10 İstanbul | Masraf Yeri: 1000CC05',
          },
          {
            id: 'it0002',
            label: '3. IT0002 - Kişisel Veriler',
            techName: 'IT0002',
            type: 'text',
            defaultValue: 'Ad Soyad, TCKN, Doğum Tarihi ve SGK Sicil No',
          },
        ],
      },
    ],
  },

  ST22: {
    tCode: 'ST22',
    module: 'BASIS',
    screenTitle: 'ABAP Çalışma Zamanı Hata Analizi (ABAP Dump Analysis)',
    subTitle: 'Sistemde Oluşan Short Dump Kayıtlarının ve Kod Satırlarının İncelenmesi',
    programName: 'SAPMS380',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'ST 022',
      message: 'Bugün oluşan ABAP çalışma zamanı hatalarını görmek için "Bugün" butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'ST 100',
      messageTemplate: 'Hata raporu {docNo} ABAP geliştirici ekibine iletildi.',
    },
    headerFields: [
      {
        id: 'datum',
        label: 'Hata Tarihi',
        techName: 'SNAP-DATUM',
        type: 'date',
        defaultValue: '2026-10-29',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_st22_log',
        name: 'Son Sistem Kayıtları & Durum',
        fields: [
          {
            id: 'status_sys',
            label: 'Canlı Sistem Durumu (TR01)',
            techName: 'SYS-STAT',
            type: 'text',
            defaultValue: '✔ 0 Kritik Short Dump — Tüm S/4HANA Uygulama Sunucuları Sağlıklı',
          },
          {
            id: 'last_warn',
            label: 'Son İncelenen İstisna',
            techName: 'EXC-NAME',
            type: 'text',
            defaultValue: 'CX_SY_ZERODIVIDE (Test Sisteminde Çözüldü - ZSD_FIYAT_HESAP)',
          },
        ],
      },
    ],
  },

  VL02N: {
    tCode: 'VL02N',
    module: 'SD',
    screenTitle: 'Yapılan Teslimat 80040620 Değiştir: Genel Bakış',
    subTitle: 'Çekme (Picking), Sevkiyat Noktası ve Mal Çıkışını Kaydet (PGI)',
    programName: 'SAPMV50A',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'VL 002',
      message: 'Teslimat kalemlerini toplayın, Çekilen Miktar alanını doldurup "Mal çıkışını kaydet" butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'VL 311',
      messageTemplate: 'Yapılan teslimat {docNo} saklandı. Mal çıkışı (PGI) tamamlandı.',
    },
    headerFields: [
      {
        id: 'vbeln_vl',
        label: 'Teslimat No',
        techName: 'LIKP-VBELN',
        type: 'text',
        defaultValue: '80040620',
        required: true,
      },
      {
        id: 'kunnr_vl',
        label: 'Malı Teslim Alan',
        techName: 'LIKP-KUNNR',
        type: 'text',
        defaultValue: 'TR1923 - TÜRKİYE ŞUBE / 50765 Köln',
      },
      {
        id: 'vstel_vl',
        label: 'Sevkiyat Noktası',
        techName: 'LIKP-VSTEL',
        type: 'text',
        defaultValue: '1010 (Sevkiyat Noktası 1010 / TR01)',
      },
      {
        id: 'bldat_vl',
        label: 'Belge Tarihi',
        techName: 'LIKP-BLDAT',
        type: 'date',
        defaultValue: '2021-10-07',
      },
    ],
    tabs: [
      {
        id: 'tab_vl02n_picking',
        name: 'Çekme (Picking) - Videodaki Aktif Sekme',
        tableType: 'delivery_items',
      },
      {
        id: 'tab_vl02n_items',
        name: 'Kaleme Genel Bakış',
        fields: [
          {
            id: 'pick_status',
            label: 'Genel Çekme Durumu',
            techName: 'VBUK-KOSTK',
            type: 'text',
            defaultValue: 'C - Tamamen Çekildi (Mal Çıkışına Hazır)',
          },
          {
            id: 'storage_loc',
            label: 'Varsayılan Depo Yeri',
            techName: 'LIPS-LGORT',
            type: 'text',
            defaultValue: '101A (Genel Mamul Deposu / 0001)',
          },
        ],
      },
      {
        id: 'tab_vl02n_loading',
        name: 'Yükleme & Nakliye',
        fields: [
          {
            id: 'carrier',
            label: 'Nakliyeci Firma',
            techName: 'LIKP-TDLNR',
            type: 'text',
            defaultValue: 'Koçak Express Lojistik A.Ş.',
          },
          {
            id: 'plate',
            label: 'Araç Plakası (e-İrsaliye UBL)',
            techName: 'LIKP-TRAID',
            type: 'text',
            defaultValue: '34 SAP 1923',
          },
        ],
      },
    ],
    defaultTableItems: [
      {
        kalemNo: '10',
        malzeme: '531',
        kisaMetin: 'Melone Tee / Endüstriyel Kontrol Modülü',
        miktar: 10,
        birim: 'KAR',
        fiyat: 290,
        paraBirimi: 'EUR',
        depoYeri: '101A',
      },
      {
        kalemNo: '20',
        malzeme: '532',
        kisaMetin: 'Üzümlü Çay / Sensör Kablo Seti',
        miktar: 10,
        birim: 'KAR',
        fiyat: 15,
        paraBirimi: 'EUR',
        depoYeri: '101A',
      },
    ],
  },

  VL03N: {
    tCode: 'VL03N',
    module: 'SD',
    screenTitle: 'Gönderilen Teslimatı Görüntüle',
    subTitle: 'Sevk Edilmiş Teslimat Belgesi, Ambalajlama ve Mal Çıkış Durumu',
    programName: 'SAPMV50A',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'VL 003',
      message: 'Teslimat belgesi salt okunur modda açıldı.',
    },
    saveSuccessMessage: {
      code: 'VL 000',
      messageTemplate: 'Teslimat {docNo} incelendi.',
    },
    headerFields: [
      {
        id: 'vbeln_disp',
        label: 'Teslimat Numarası',
        techName: 'LIKP-VBELN',
        type: 'text',
        defaultValue: '80040620',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vl03n_view',
        name: 'Teslimat Detayı & Durum',
        fields: [
          {
            id: 'pgi_status',
            label: 'Mal Çıkış Durumu',
            techName: 'VBUK-WBSTK',
            type: 'text',
            defaultValue: 'C - Tamamlandı (Malzeme Belgesi: 4900018921)',
          },
        ],
      },
    ],
  },

  VF02: {
    tCode: 'VF02',
    module: 'SD',
    screenTitle: 'Faturalama Belgesini Değiştir',
    subTitle: 'Fatura Muhasebeye Aktarımı, Koşul Düzeltme ve Çıktı Belirleme',
    programName: 'SAPMV60A',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'VF 002',
      message: 'Faturalama belgesi açıldı. Muhasebeye aktarmak için Yeşil Bayrak (Muhasebeye Bırak) butonuna basabilirsiniz.',
    },
    saveSuccessMessage: {
      code: 'VF 003',
      messageTemplate: 'Faturalama belgesi {docNo} güncellendi.',
    },
    headerFields: [
      {
        id: 'vbeln_vf',
        label: 'Faturalama Belgesi',
        techName: 'VBRK-VBELN',
        type: 'text',
        defaultValue: '90017855',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vf02_header',
        name: 'Fatura Başlığı & Vergi',
        fields: [
          {
            id: 'payer',
            label: 'Ödeyen Müşteri',
            techName: 'VBRK-KUNRG',
            type: 'text',
            defaultValue: 'TR1923 (TÜRKİYE ŞUBE)',
          },
          {
            id: 'netwr_val',
            label: 'Net Tutar / KDV',
            techName: 'VBRK-NETWR',
            type: 'text',
            defaultValue: '3.050,00 EUR / Vergi: 579,50 EUR',
          },
        ],
      },
    ],
  },

  VF04: {
    tCode: 'VF04',
    module: 'SD',
    screenTitle: 'Faturalama Belgesi İş Listesini İşle (VF04)',
    subTitle: 'Teslimatı Tamamlanmış Açık Siparişlerin Toplu Faturalandırılması',
    programName: 'SBDC0100',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'VF 040',
      message: 'Faturalamaya hazır teslimatlar listelendi. Toplu faturalamak için "Otomatik faturalama" butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'VF 041',
      messageTemplate: 'Toplu faturalama çalıştırması tamamlandı. Üretilen Fatura No: {docNo}',
    },
    headerFields: [
      {
        id: 'vkorg_f4',
        label: 'Satış Örgütü',
        techName: 'VKORG',
        type: 'text',
        defaultValue: '1010 / TR01',
        required: true,
      },
      {
        id: 'vtweg_f4',
        label: 'Dağıtım Kanalı',
        techName: 'VTWEG',
        type: 'text',
        defaultValue: '10',
      },
      {
        id: 'fkdat_f4',
        label: 'Faturalama Tarihi',
        techName: 'FKDAT',
        type: 'date',
        defaultValue: '2021-10-07',
      },
    ],
    tabs: [
      {
        id: 'tab_vf04_list',
        name: 'Faturalamaya Hazır Açık Belgeler Havuzu',
        fields: [
          {
            id: 'due_items',
            label: 'Açık Teslimat Belgesi',
            techName: 'VBUK-VBELN',
            type: 'text',
            defaultValue: 'Teslimat: 80040620 | Müşteri: TR1923 | Tutar: 3.050,00 EUR | Durum: Mal Çıkışı Tamamlandı',
          },
          {
            id: 'due_items2',
            label: 'İkinci Açık Teslimat',
            techName: 'VBUK-VBELN2',
            type: 'text',
            defaultValue: 'Teslimat: 80040621 | Müşteri: 100021 Koçak Lojistik | Tutar: 45.000,00 TRY',
          },
        ],
      },
    ],
  },

  VL09: {
    tCode: 'VL09',
    module: 'SD',
    screenTitle: 'Mal Çıkışını Ters Kaydet (Teslimat için İptal)',
    subTitle: 'Hatalı Yapılan Mal Çıkışını Geri Alarak Stokları Eski Haline Getirme',
    programName: 'RV50G001',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'warning',
      code: 'VL 090',
      message: 'Dikkat: Ters kayıt yapıldığında stoklar depoya geri yüklenir ve muhasebe ters maddesi oluşur.',
    },
    saveSuccessMessage: {
      code: 'VL 091',
      messageTemplate: 'Teslimat {docNo} için mal çıkışı başarıyla ters kaydedildi. Stoklar iade alındı.',
    },
    headerFields: [
      {
        id: 'vbeln_rev',
        label: 'Teslimat Numarası',
        techName: 'VBELN',
        type: 'text',
        defaultValue: '80040620',
        required: true,
      },
      {
        id: 'vstel_rev',
        label: 'Sevkiyat Noktası',
        techName: 'VSTEL',
        type: 'text',
        defaultValue: '1010',
      },
    ],
    tabs: [
      {
        id: 'tab_vl09_reason',
        name: 'Ters Kayıt Nedeni & Stok Teyidi',
        fields: [
          {
            id: 'rev_reason',
            label: 'İptal Nedeni',
            techName: 'REV-REASON',
            type: 'select',
            defaultValue: '01',
            options: [
              { value: '01', label: '01 - Müşteri sevkiyatı erteledi' },
              { value: '02', label: '02 - Hatalı parti veya miktar seçimi' },
              { value: '03', label: '03 - Hasarlı ambalaj tespiti' },
            ],
          },
        ],
      },
    ],
  },

  VL10A: {
    tCode: 'VL10A',
    module: 'SD',
    screenTitle: 'Teslimata Hazır Satış Siparişleri (Kullanıcıya Özgü Ölçüm)',
    subTitle: 'Sevk Tarihi Gelmiş Siparişlerin Filtrelenmesi ve Teslimat Yaratma',
    programName: 'RVV05L01',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'VL 100',
      message: 'Teslimat oluşturulacak siparişleri seçin ve "Arka planda teslimat" veya "Ön planda teslimat" butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'VL 101',
      messageTemplate: 'Toplu teslimat oluşturma başarılı. Üretilen Teslimat: {docNo}',
    },
    headerFields: [
      {
        id: 'vstel_10a',
        label: 'Sevkiyat Noktası',
        techName: 'VSTEL',
        type: 'text',
        defaultValue: '1010 / TR01',
        required: true,
      },
      {
        id: 'ledat_10a',
        label: 'Teslimat Yaratma Tarihi',
        techName: 'LEDAT',
        type: 'date',
        defaultValue: '2021-10-07',
      },
    ],
    tabs: [
      {
        id: 'tab_vl10a_orders',
        name: 'Teslimata Hazır Açık Siparişler',
        fields: [
          {
            id: 'order_row_1',
            label: 'Açık Sipariş No',
            techName: 'VBAK-VBELN',
            type: 'text',
            defaultValue: '32833 | Kalem: 10, 20 | Müşteri: TR1923 | Miktar: 20 KAR',
          },
        ],
      },
    ],
  },

  VK12: {
    tCode: 'VK12',
    module: 'SD',
    screenTitle: 'Fiyat Koşul Kayıtlarını Değiştir',
    subTitle: 'Mevcut Satış Fiyatları (PR00), İskontolar ve KDV Değerlerini Güncelleme',
    programName: 'SAPMV13A',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'VK 012',
      message: 'Koşul türünü (PR00, MWST vb.) seçip Geçerlilik Tarihleri ve Tutarları güncelleyin.',
    },
    saveSuccessMessage: {
      code: 'VK 001',
      messageTemplate: 'Fiyat koşul kaydı {docNo} güncellendi.',
    },
    headerFields: [
      {
        id: 'kschl_v12',
        label: 'Koşul Türü',
        techName: 'KONH-KSCHL',
        type: 'text',
        defaultValue: 'PR00 (Brüt Satış Fiyatı)',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vk12_rates',
        name: 'Koşul Tablosu & Geçerlilik',
        fields: [
          {
            id: 'mat_rate',
            label: '531 Melone Tee Fiyatı',
            techName: 'KBETR',
            type: 'text',
            defaultValue: '290,00 EUR / KAR (Yeni Kampanya: 280,00 EUR)',
          },
        ],
      },
    ],
  },

  VK13: {
    tCode: 'VK13',
    module: 'SD',
    screenTitle: 'Fiyat Koşul Kayıtlarını Görüntüle',
    subTitle: 'Geçmiş ve Gelecek Fiyatlandırma Koşullarının İncelenmesi',
    programName: 'SAPMV13A',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'VK 013',
      message: 'Koşul kayıtları salt okunur modda listelendi.',
    },
    saveSuccessMessage: {
      code: 'VK 000',
      messageTemplate: 'Koşul kaydı {docNo} görüntülendi.',
    },
    headerFields: [
      {
        id: 'kschl_v13',
        label: 'Koşul Türü',
        techName: 'KONH-KSCHL',
        type: 'text',
        defaultValue: 'PR00',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vk13_view',
        name: 'Aktif Fiyat Çizelgesi',
        fields: [
          {
            id: 'pr00_active',
            label: 'Geçerli Fiyat Bilgisi',
            techName: 'KONP-KBETR',
            type: 'text',
            defaultValue: 'Ürün 531: 290 EUR/KAR | Ürün 532: 15 EUR/KAR | Para Birimi: EUR / TRY',
          },
        ],
      },
    ],
  },

  MM02: {
    tCode: 'MM02',
    module: 'MM',
    screenTitle: 'Malzemeyi Değiştir (Change Material)',
    subTitle: 'Malzeme Tanımı, Satış & Dağıtım Görünümü, Muhasebe Fiyatı Güncelleme',
    programName: 'SAPLMGMM',
    screenNumber: '0060',
    statusBarOnLoad: {
      type: 'info',
      code: 'MM 002',
      message: 'Değiştirilecek malzemenin kodunu girin ve Görünümleri Seç butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'MM 010',
      messageTemplate: 'Malzeme {docNo} başarıyla değiştirildi ve yeni parametreler kaydedildi.',
    },
    headerFields: [
      {
        id: 'matnr_mm02',
        label: 'Malzeme Kodu',
        techName: 'MARA-MATNR',
        type: 'text',
        defaultValue: '531 (Melone Tee)',
        required: true,
      },
      {
        id: 'maktx_mm02',
        label: 'Malzeme Kısa Metni',
        techName: 'MAKT-MAKTX',
        type: 'text',
        defaultValue: 'Melone Tee / Endüstriyel Soğutma Modülü',
      },
    ],
    tabs: [
      {
        id: 'tab_mm02_sales',
        name: 'Satış: Satış Örgütü 1 & 2',
        fields: [
          {
            id: 'dwerk_def',
            label: 'Teslimat Tesisi (DWERK)',
            techName: 'MVKE-DWERK',
            type: 'text',
            defaultValue: '1010 / TR01 (Gebze Fabrika)',
          },
          {
            id: 'tax_class',
            label: 'Vergi Sınıflandırması (KDV %20)',
            techName: 'MLAN-TAXM1',
            type: 'text',
            defaultValue: '1 - Tam Vergi (%20 KDV)',
          },
        ],
      },
    ],
  },

  VA05: {
    tCode: 'VA05',
    module: 'SD',
    screenTitle: 'Satış Siparişlerini Listele',
    subTitle: 'Açık, Teslim Edilmiş ve Faturalanmış Siparişlerin Raporu',
    programName: 'SAPMV75A',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'VA 050',
      message: 'Müşteri veya Satış Örgütüne göre filtreleyerek Yürüt (F8) butonuna basın.',
    },
    saveSuccessMessage: {
      code: 'VA 051',
      messageTemplate: 'Sipariş listesi {docNo} raporlandı.',
    },
    headerFields: [
      {
        id: 'vkorg_va05',
        label: 'Satış Örgütü',
        techName: 'VKORG',
        type: 'text',
        defaultValue: '1010 / TR01',
      },
      {
        id: 'kunnr_va05',
        label: 'Müşteri Cari',
        techName: 'KUNNR',
        type: 'text',
        defaultValue: 'TR1923 (TÜRKİYE ŞUBE)',
      },
    ],
    tabs: [
      {
        id: 'tab_va05_report',
        name: 'Sipariş Raporu',
        fields: [
          {
            id: 'ord_1',
            label: 'Sipariş 32833',
            techName: 'VBAK',
            type: 'text',
            defaultValue: 'Tarih: 07.10.2021 | Tutar: 3.050,00 EUR | Durum: Sevk Edildi & Faturalandı',
          },
          {
            id: 'ord_2',
            label: 'Sipariş 14205',
            techName: 'VBAK',
            type: 'text',
            defaultValue: 'Tarih: 29.10.2026 | Tutar: 45.000,00 TRY | Durum: Açık (Teslimat Bekliyor)',
          },
        ],
      },
    ],
  },

  VL06O: {
    tCode: 'VL06O',
    module: 'SD',
    screenTitle: 'Teslimat İzlemem — Giden Teslimat Monitörü',
    subTitle: 'Toplama (Picking), Mal Çıkışı ve Faturalama Bekleyen Teslimatların Genel İzlenmesi',
    programName: 'WS_DELIVERY_UPDATE',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'VL 060',
      message: 'Seçim kriterlerini belirleyip teslimat listesini açın.',
    },
    saveSuccessMessage: {
      code: 'VL 061',
      messageTemplate: 'Teslimat izleme listesi {docNo} yenilendi.',
    },
    headerFields: [
      {
        id: 'vstel_vl06',
        label: 'Sevkiyat Noktası',
        techName: 'VSTEL',
        type: 'text',
        defaultValue: '1010 / TR01',
        required: true,
      },
    ],
    tabs: [
      {
        id: 'tab_vl06_monitor',
        name: 'Sevkiyat Monitörü Kalemleri',
        fields: [
          {
            id: 'del_status',
            label: 'Teslimat 80040620',
            techName: 'LIKP',
            type: 'text',
            defaultValue: 'Çekme: Tamamlandı | Mal Çıkışı: Kaydedildi | Fatura Durumu: Hazır (VF01/VF04)',
          },
        ],
      },
    ],
  },

  'V.01': {
    tCode: 'V.01',
    module: 'SD',
    screenTitle: 'Tamamlanmamış Satış Belgelerini Listele',
    subTitle: 'Eksik Fiyat, Sevkiyat Noktası veya Vergi Bilgisi Olan Belgelerin Tespiti',
    programName: 'RVAUFS01',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'V0 001',
      message: 'Eksiklik günlüğü (Incompletion Log) kontrol edildi.',
    },
    saveSuccessMessage: {
      code: 'V0 002',
      messageTemplate: 'Belgeler incelendi. Eksiklik bulunmadı.',
    },
    headerFields: [
      {
        id: 'vkorg_v01',
        label: 'Satış Örgütü',
        techName: 'VKORG',
        type: 'text',
        defaultValue: '1010 / TR01',
      },
    ],
    tabs: [
      {
        id: 'tab_v01_list',
        name: 'Eksiklik Günlüğü',
        fields: [
          {
            id: 'inc_status',
            label: 'Tüm Belgeler Tamam',
            techName: 'STATUS',
            type: 'text',
            defaultValue: '✔ Sistemde sipariş aşamasında bloke kalmış veya eksik veri içeren satış belgesi yok.',
          },
        ],
      },
    ],
  },

  'V.21': {
    tCode: 'V.21',
    module: 'SD',
    screenTitle: 'Toplu Çalıştırma Günlüklerim (Billing / Delivery Logs)',
    subTitle: 'VF04 veya VL10 Arka Plan Toplu İşlemlerinin Başarı Günlükleri',
    programName: 'RVV21LOG',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'V2 001',
      message: 'Son toplu faturalama ve teslimat işleme günlükleri listelendi.',
    },
    saveSuccessMessage: {
      code: 'V2 002',
      messageTemplate: 'İşlem günlüğü {docNo} arşivlendi.',
    },
    headerFields: [
      {
        id: 'datum_v21',
        label: 'İşlem Tarihi',
        techName: 'DATUM',
        type: 'date',
        defaultValue: '2021-10-07',
      },
    ],
    tabs: [
      {
        id: 'tab_v21_log',
        name: 'Toplu İşlem Başarı Detayı',
        fields: [
          {
            id: 'job_log',
            label: 'Fatura Toplu İş No: JOB_BILL_TR01',
            techName: 'JOBNAME',
            type: 'text',
            defaultValue: 'Teslimat 80040620 başarıyla faturalandı ➔ Fatura 90017855 oluşturuldu (Hata: 0).',
          },
        ],
      },
    ],
  },

  AW01N: {
    tCode: 'AW01N',
    module: 'FI',
    screenTitle: 'Duran Varlık Gezgini (Asset Explorer)',
    subTitle: 'Duran Varlık Değerleri, Birikmiş Amortisman ve Yıllık Planlanan Amortisman',
    programName: 'RAAMORT1',
    screenNumber: '1000',
    statusBarOnLoad: {
      type: 'info',
      code: 'AA 001',
      message: 'Duran varlık ana kartı değerleri ve amortisman simülasyonu ekrana getirildi.',
    },
    saveSuccessMessage: {
      code: 'AA 002',
      messageTemplate: 'Duran varlık {docNo} amortisman hesaplaması doğrulandı.',
    },
    headerFields: [
      {
        id: 'anln1',
        label: 'Duran Varlık No',
        techName: 'ANLA-ANLN1',
        type: 'text',
        defaultValue: '100001 (CNC Tezgahı / Sunucu Donanımı)',
        required: true,
      },
      {
        id: 'bukrs_aa',
        label: 'Şirket Kodu',
        techName: 'ANLA-BUKRS',
        type: 'text',
        defaultValue: 'TR01',
      },
    ],
    tabs: [
      {
        id: 'tab_aw01n_values',
        name: 'Planlanan & Kaydedilen Amortisman',
        fields: [
          {
            id: 'apc_val',
            label: 'Aktifleşen Maliyet Değeri (APC)',
            techName: 'ANLC-KANSW',
            type: 'text',
            defaultValue: '500.000,00 TRY',
          },
          {
            id: 'dep_val',
            label: 'Yıllık Amortisman Tutarı (%20 Normal)',
            techName: 'ANLC-NAFAG',
            type: 'text',
            defaultValue: '100.000,00 TRY / Yıl (Aylık AFAB: 8.333,33 TRY)',
          },
          {
            id: 'net_book',
            label: 'Net Defter Değeri',
            techName: 'ANLC-NETWV',
            type: 'text',
            defaultValue: '400.000,00 TRY',
          },
        ],
      },
    ],
  },

  SM50: {
    tCode: 'SM50',
    module: 'BASIS',
    screenTitle: 'İş Süreçleri Genel Görünümü (Process Overview / Work Processes)',
    subTitle: 'Uygulama Sunucusundaki DIA, BGD, UPD, SPO Süreçleri, CPU Süresi ve Aktif Kullanıcılar',
    programName: 'SAPLSM50',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'WP 001',
      message: 'Sunucu s4h-app-01: 20 Work Process aktif. Uzun süren sorgular (Long-running) izleniyor.',
    },
    saveSuccessMessage: {
      code: 'WP 002',
      messageTemplate: 'Süreç listesi {docNo} güncellendi.',
    },
    headerFields: [
      {
        id: 'server_name',
        label: 'SAP Örnek Sunucusu',
        techName: 'MSHOST',
        type: 'text',
        defaultValue: 's4h-app-01_PRD_00 (HANA In-Memory Enterprise)',
        required: true,
      },
      {
        id: 'total_wp',
        label: 'Toplam İş Süreci Sayısı',
        techName: 'WP_TOTAL',
        type: 'text',
        defaultValue: '20 Süreç (12 DIA, 4 BGD, 2 UPD, 1 SPO, 1 ENQ)',
      },
    ],
    tabs: [
      {
        id: 'tab_sm50_processes',
        name: 'Aktif Süreç Tablosu (Work Processes)',
        fields: [
          {
            id: 'proc_1',
            label: 'No 03 | DIA (Diyalog) | Çalışıyor (Running)',
            techName: 'WP_03',
            type: 'text',
            defaultValue: 'Kullanıcı: BERKE.ERGEN | T-Code: VA01 | Program: SAPMV45A | CPU: 1.4s | Tablo: VBAK',
          },
          {
            id: 'proc_2',
            label: 'No 07 | DIA (Diyalog) | Çalışıyor (Running)',
            techName: 'WP_07',
            type: 'text',
            defaultValue: 'Kullanıcı: AHMET.YILMAZ | T-Code: VL01N | Program: SAPMV50A | CPU: 0.8s | Tablo: LIKP',
          },
          {
            id: 'proc_3',
            label: 'No 13 | BGD (Arka Plan) | Çalışıyor (Running)',
            techName: 'WP_13',
            type: 'text',
            defaultValue: 'Kullanıcı: BATCH_USER | Job: JOB_BILLING_VF04 | Program: RVV21LOG | CPU: 14.2s',
          },
          {
            id: 'proc_4',
            label: 'No 17 | UPD (Güncelleme) | Bekliyor (Waiting)',
            techName: 'WP_17',
            type: 'text',
            defaultValue: 'V1 Update Kuyruğu: Boşta (Hemen yazma hazır)',
          },
        ],
      },
    ],
  },

  ST02: {
    tCode: 'ST02',
    module: 'BASIS',
    screenTitle: 'Tampon ve Bellek Akort Analizi (Tune Summary / Setups / Buffers)',
    subTitle: 'SAP Tampon İsabet Oranları (Hit Ratio), Takaslar (Swaps) ve Genişletilmiş Bellek (EM)',
    programName: 'SAPLST02',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'BF 001',
      message: 'Tampon analizi yüklendi. Program tamponu hit ratio %99.2 (Optimum yeşil seviye).',
    },
    saveSuccessMessage: {
      code: 'BF 002',
      messageTemplate: 'Tampon istatistiği {docNo} arşivlendi.',
    },
    headerFields: [
      {
        id: 'buffer_quality',
        label: 'Genel Tampon Kalitesi',
        techName: 'BUFFER_STAT',
        type: 'text',
        defaultValue: '%98.7 İsabet Oranı (Tavsiye: > %95)',
      },
      {
        id: 'ext_mem',
        label: 'Genişletilmiş Bellek (EM)',
        techName: 'EM_USAGE',
        type: 'text',
        defaultValue: '16.4 GB Kullanımda / 32.0 GB Tahsisli (%51.2)',
      },
    ],
    tabs: [
      {
        id: 'tab_st02_buffers',
        name: 'SAP Tampon İsabet & Takas Tablosu',
        fields: [
          {
            id: 'prog_buf',
            label: 'Program Tamponu (Program Buffer)',
            techName: 'PROG_BUF',
            type: 'text',
            defaultValue: 'Kullanım: 4.200 MB | Hit Ratio: %99.4 | Swaps (Takas): 0 (Mükemmel)',
          },
          {
            id: 'tab_buf',
            label: 'Tablo Tamponu (Table Buffer - Single/Generic)',
            techName: 'TAB_BUF',
            type: 'text',
            defaultValue: 'Kullanım: 2.100 MB | Hit Ratio: %98.1 | Swaps: 3 (Normal)',
          },
          {
            id: 'screen_buf',
            label: 'Ekran & CUA Tamponu (GUI Buffers)',
            techName: 'GUI_BUF',
            type: 'text',
            defaultValue: 'Kullanım: 512 MB | Hit Ratio: %99.8 | Swaps: 0',
          },
        ],
      },
    ],
  },

  ST03N: {
    tCode: 'ST03N',
    module: 'BASIS',
    screenTitle: 'İş Yükü ve Yanıt Süresi Monitörü (Workload Monitor)',
    subTitle: 'İşlem Başına Ortalama Yanıt Süresi (Response Time), CPU Süresi ve Veritabanı Süresi Dağılımı',
    programName: 'SAPLST03N',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'WL 001',
      message: 'Bugünün iş yükü istatistiği yüklendi. Ortalama yanıt süresi: 412 ms (< 800 ms hedefine uygun).',
    },
    saveSuccessMessage: {
      code: 'WL 002',
      messageTemplate: 'İş yükü raporu {docNo} dışa aktarıldı.',
    },
    headerFields: [
      {
        id: 'avg_resp_time',
        label: 'Ortalama Yanıt Süresi',
        techName: 'AVG_RESP',
        type: 'text',
        defaultValue: '412 ms (Diyalog İşlemleri)',
      },
      {
        id: 'throughput_rate',
        label: 'İşlem Hacmi (Throughput)',
        techName: 'THROUGHPUT',
        type: 'text',
        defaultValue: '1.280 İşlem / Dakika (21.3 TPS)',
      },
    ],
    tabs: [
      {
        id: 'tab_st03n_breakdown',
        name: 'Yanıt Süresi Bileşenleri (Time Breakdown)',
        fields: [
          {
            id: 'cpu_time',
            label: 'İşlemci Süresi (CPU Time)',
            techName: 'CPU_TIME',
            type: 'text',
            defaultValue: '84 ms (%20.4) — ABAP program yorumlama ve hesaplama',
          },
          {
            id: 'db_time',
            label: 'Veritabanı Süresi (DB HANA Time)',
            techName: 'DB_TIME',
            type: 'text',
            defaultValue: '248 ms (%60.2) — HANA bellek içi SQL veri okuma',
          },
          {
            id: 'wait_time',
            label: 'Bekleme Süresi (Wait Time)',
            techName: 'WAIT_TIME',
            type: 'text',
            defaultValue: '52 ms (%12.6) — Boşta work process bekleme süresi',
          },
          {
            id: 'gui_time',
            label: 'GUI / Ağ Süresi (Frontend Load)',
            techName: 'GUI_TIME',
            type: 'text',
            defaultValue: '28 ms (%6.8) — Web tarayıcısına veri aktarımı',
          },
        ],
      },
    ],
  },

  ST06: {
    tCode: 'ST06',
    module: 'BASIS',
    screenTitle: 'İşletim Sistemi ve Donanım Monitörü (Operating System Monitor)',
    subTitle: 'Sunucu CPU Kullanımı, Fiziksel Bellek (RAM), Disk I/O ve Ağ Yükü',
    programName: 'SAPLST06',
    screenNumber: '0100',
    statusBarOnLoad: {
      type: 'info',
      code: 'OS 001',
      message: 'Donanım izleme aktif: CPU %34, Bellek %58, Disk I/O bekleme süresi 2.1 ms.',
    },
    saveSuccessMessage: {
      code: 'OS 002',
      messageTemplate: 'Donanım logları {docNo} kaydedildi.',
    },
    headerFields: [
      {
        id: 'cpu_util',
        label: 'Toplam CPU Kullanımı',
        techName: 'CPU_UTIL',
        type: 'text',
        defaultValue: '%34.2 (User: %22.4, System: %8.1, Idle: %65.8)',
      },
      {
        id: 'phys_ram',
        label: 'Fiziksel Bellek (RAM)',
        techName: 'PHYS_MEM',
        type: 'text',
        defaultValue: '128 GB Toplam / 54 GB Boşta (%57.8 Kullanım)',
      },
    ],
    tabs: [
      {
        id: 'tab_st06_io',
        name: 'Disk & Ağ Gecikme Metrikleri',
        fields: [
          {
            id: 'disk_io',
            label: 'HANA Disk NVMe I/O Wait',
            techName: 'DISK_WAIT',
            type: 'text',
            defaultValue: '1.8 ms (Hedef: < 10 ms — Çok Hızlı)',
          },
          {
            id: 'net_traffic',
            label: 'Ağ Bant Genişliği (Network Throughput)',
            techName: 'NET_MBPS',
            type: 'text',
            defaultValue: '420 MB/s (10 Gbit/s Hat Kapasitesi)',
          },
        ],
      },
    ],
  },
};

