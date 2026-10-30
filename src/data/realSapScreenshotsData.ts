/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAPModuleId } from '../types/sap';

export interface RealSapScreenshot {
  id: string;
  tCode: string;
  module: SAPModuleId;
  title: string;
  stageName: string;
  imagePath: string;
  summary: string;
  courseTimestamp?: string;
  keyCallouts: Array<{
    title: string;
    description: string;
    location: string;
  }>;
  relatedTCode: string;
}

export const REAL_SAP_SCREENSHOTS: RealSapScreenshot[] = [
  {
    id: 'fiori_launchpad_main',
    tCode: 'FLP',
    module: 'SD',
    title: 'SAP S/4HANA Fiori Launchpad — Başlangıç Sayfası (Ana Sayfam)',
    stageName: 'Fiori Ana Giriş Ekranı (26 Uygulama Kutucuğu)',
    imagePath: '/assets/aistudio/IMG_3041_53522ce6.png',
    summary: 'S/4HANA modern web arayüzü olan Fiori Launchpad ana ekranı. 6 ana kategori sekmesi ve Satış & Dağıtım / Lojistik için en sık kullanılan 26 Fiori kutucuğunu (Tile) gösterir.',
    courseTimestamp: 'Giriş / Fiori Tanıtımı',
    keyCallouts: [
      {
        title: 'Üst Shell Bar ve Kategori Sekmeleri',
        location: 'Ekranın üst kısmı',
        description: 'Ana sayfam, Geçerli ayarlar, Ana veriler, Yevmiye kayıtları ve Duran varlık muhasebesi sekmeleri arasında gezinti yapılır.',
      },
      {
        title: 'Satış & Teslimat Kutucukları',
        location: '1. ve 2. Satır',
        description: 'VA01, VA02, VA03 (Satış Siparişleri), VL01N, VL02N, VL03N (Teslimat), VF01, VF02, VF03 (Fatura).',
      },
      {
        title: 'Canlı KPI Analiz Kutucukları',
        location: '3. Satır',
        description: 'Satış siparişi gerçekleştirme (Sorunları analiz et & 26,0 B Sorunları çöz) ve Sevkiyat performansı anlık grafikleri.',
      },
    ],
    relatedTCode: 'VA01',
  },
  {
    id: 'fiori_launchpad_zoom_vf04',
    tCode: 'VF04',
    module: 'SD',
    title: 'Fiori Launchpad — Faturalama Belgeleri Oluştur (VF04 İş Listesi)',
    stageName: 'VF04 Fiori Kutucuğu Seçimi',
    imagePath: '/assets/aistudio/IMG_3036_040fcd3d.png',
    summary: 'Eğitmence VF04 (Faturalama belgesi iş listesi) kutucuğuna tıklanarak teslimatların toplu faturalandırılması süreci başlatılıyor.',
    courseTimestamp: 'Faturalama Bölümü',
    keyCallouts: [
      {
        title: 'VF04 İş Listesi',
        location: '2. Satır 4. Kutucuk',
        description: 'Teslimatı tamamlanmış ve mal çıkışı yapılmış tüm siparişleri tek ekranda listeleyip faturalama havuzuna alır.',
      },
      {
        title: 'Kutucuk İkonu',
        location: 'VF04 Kutusu',
        description: 'Hiyerarşi ve dolar ($) simgesi faturalama ve muhasebe entegrasyonunu ifade eder.',
      },
    ],
    relatedTCode: 'VF04',
  },
  {
    id: 'fiori_launchpad_vf04_highlight',
    tCode: 'VF04',
    module: 'SD',
    title: 'Fiori Launchpad — VF04 Toplu Fatura Yaratma Kutucuğu',
    stageName: 'VF04 Vurgusu ve Açıklaması',
    imagePath: '/assets/aistudio/IMG_3035_6c2ae3ef.png',
    summary: 'Fatura oluştururken ya bireysel teslimat bazında (VF01) ya da teslimat havuzundan toplu olarak (VF04) ilerlenebilir.',
    courseTimestamp: 'Faturalama Alternatifleri',
    keyCallouts: [
      {
        title: 'İki Alternatif Faturalama',
        location: 'VF01 vs VF04',
        description: 'VF01 tek tek teslimat referansıyla fatura yaratır; VF04 ise teslimata hazır tüm açık siparişleri filtreler.',
      },
    ],
    relatedTCode: 'VF01',
  },
  {
    id: 'fiori_launchpad_wide',
    tCode: 'FLP',
    module: 'SD',
    title: 'Fiori Launchpad — Geniş Açı Modül Görünümü',
    stageName: 'Fiori Tam Ekran Perspektifi',
    imagePath: '/assets/aistudio/IMG_3031_0ba41747.png',
    summary: 'S/4HANA Fiori masaüstünün tam çözünürlüklü görünümü: Sevkiyat ve fatura izleme, ters kayıt (VL09) ve fiyat yönetimi (VK11).',
    courseTimestamp: 'S/4HANA Arayüzü',
    keyCallouts: [
      {
        title: 'VL09 Ters Kayıt',
        location: '2. Satır 5. Kutu',
        description: 'Hatalı mal çıkışı yapıldığında stoğu geri almak için kullanılan ters kayıt işlem kodu.',
      },
      {
        title: 'VK11 Fiyat Belirleme',
        location: '2. Satır 6. Kutu',
        description: 'PR00 temel fiyatı, indirimler ve KDV koşul kayıtlarının girildiği Fiori uygulaması.',
      },
    ],
    relatedTCode: 'VK11',
  },
  {
    id: 'fiori_launchpad_categories',
    tCode: 'FLP',
    module: 'FI',
    title: 'Fiori Launchpad — Muhasebe ve Duran Varlık Kategori Başlıkları',
    stageName: 'Fiori Kategori Çubuğu',
    imagePath: '/assets/aistudio/IMG_3030_6a27f580.png',
    summary: 'Üst menü çubuğunda Yevmiye Kayıtları (FI) ve Duran Varlık Muhasebesi (AA) dönemsel aktiviteleri ve raporlama sekmeleri görünür.',
    courseTimestamp: 'Kategori Sekmeleri',
    keyCallouts: [
      {
        title: 'Yevmiye Kayıtları',
        location: '4. Sekme',
        description: 'FB50, FB60, FB70 ve hesap bakiyeleri (FBL3N) uygulamalarına direkt geçiş sağlar.',
      },
      {
        title: 'Duran Varlık Aktiviteleri',
        location: '5. Sekme',
        description: 'AFAB amortisman çalıştırma, AJRW yıl değişimi ve AJAB yıl sonu kapanışı.',
      },
    ],
    relatedTCode: 'FB50',
  },
  {
    id: 'fiori_launchpad_row1',
    tCode: 'VA01',
    module: 'SD',
    title: 'Fiori Launchpad — Sipariş ve Teslimat Kutucukları Detayı',
    stageName: '1. Satır Uygulamaları',
    imagePath: '/assets/aistudio/IMG_3029_924999ec.png',
    summary: 'Siparişi oluşturma (VA01), değiştirme (VA02) ve teslimatı başlatma (VL01N) kutucuklarının yerleşimi.',
    courseTimestamp: 'Siparişten Teslimata',
    keyCallouts: [
      {
        title: 'Sipariş Referansı ile Teslimat',
        location: 'VL01N Kutusu',
        description: 'Satış siparişi tamamlandıktan sonra bu kutuya tıklayarak teslimat başlatılır.',
      },
    ],
    relatedTCode: 'VA01',
  },
  {
    id: 'vl01n_initial_screen',
    tCode: 'VL01N',
    module: 'SD',
    title: 'VL01N — Gönderilen Teslimatı Sipariş Referansı ile Yarat (Başlangıç Ekranı)',
    stageName: 'Teslimat Başlangıç Parametreleri',
    imagePath: '/assets/aistudio/IMG_3027_b41b9bed.jpeg',
    summary: 'WebGUI Belize temasında teslimat açılış ekranı. Sevkiyat noktası (1010), seçim tarihi (07.10.2021) ve satış siparişi numarası (32833) girilerek sağ alttaki "Devam" butonuna basılır.',
    courseTimestamp: 'VL01N Başlangıç',
    keyCallouts: [
      {
        title: 'Sevkiyat Noktası (1010 / TR01)',
        location: 'Formun ilk alanı',
        description: 'Malın fiziki olarak yükleneceği rampa/depo noktası. F4 ile liste açılır.',
      },
      {
        title: 'Müşteri Siparişi No (32833 / 14205)',
        location: 'Sipariş alanı',
        description: 'Referans alınacak VA01 satış belgesi numarası girilir.',
      },
      {
        title: 'Sağ Altta "Devam" Butonu',
        location: 'Koyu gri alt durum çubuğu',
        description: 'Enter tuşuyla aynı görevi görerek teslimat detay ekranını açar.',
      },
    ],
    relatedTCode: 'VL01N',
  },
  {
    id: 'vl01n_f4_popup',
    tCode: 'VL01N',
    module: 'SD',
    title: 'VL01N — Sevkiyat Noktası F4 Arama & Eşleşme Penceresi',
    stageName: 'F4 Arama Yardımı',
    imagePath: '/assets/aistudio/IMG_3025_a4c840e6.jpeg',
    summary: 'Sevkiyat noktası alanında büyüteç (F4) tuşuna basıldığında açılan kurumsal tesis listesi: 1010 (Sevkiyat noktası 1010), 1012, 101C, 1020, 1030, SP01, SP02 ve TR01.',
    courseTimestamp: 'F4 Arama',
    keyCallouts: [
      {
        title: 'F4 Matchcode Penceresi',
        location: 'Ekran ortasında modal',
        description: 'Kullanıcının ezbere kod bilmesine gerek kalmadan tanımlı sevkiyat noktalarını listeler.',
      },
    ],
    relatedTCode: 'VL01N',
  },
  {
    id: 'vl01n_picking_screen',
    tCode: 'VL01N',
    module: 'SD',
    title: 'VL01N / VL02N — Teslimat Çekme (Picking) ve Mal Çıkışını Kaydet (PGI)',
    stageName: 'Çekme Sekmesi ve PGI',
    imagePath: '/assets/aistudio/IMG_3026_6e2df709.png',
    summary: 'Teslimat belgesinin en kritik aşaması: "Çekme" sekmesinde Çekilen Miktar (10 KAR) girilir ve üst araç çubuğundaki "Mal çıkışını kaydet" butonuna basılır.',
    courseTimestamp: 'Picking & PGI',
    keyCallouts: [
      {
        title: 'Üstte "Mal Çıkışını Kaydet" Butonu',
        location: 'Üst araç çubuğu',
        description: 'Bu butona basıldığında depodan stok fiilen düşer ve muhasebe maliyet kaydı (GBB-VAX) oluşur.',
      },
      {
        title: 'Çekilen Miktar (Pick Qty)',
        location: 'Tabloda 8. sütun',
        description: 'Teslimat miktarına eşit girilmelidir (10 KAR). Boş kalırsa SAP mal çıkışına izin vermez.',
      },
      {
        title: 'Kalemler: Melone Tee & Üzümlü Çay',
        location: 'Tüm kalemler tablosu',
        description: 'Depo yeri 101A üzerinden ürünlerin toplanması.',
      },
    ],
    relatedTCode: 'VL02N',
  },
  {
    id: 'vl02n_overview_header',
    tCode: 'VL02N',
    module: 'SD',
    title: 'VL02N — Yapılan Teslimat 80040620 Değiştir: Genel Bakış',
    stageName: 'Müşteri ve Başlık Bilgileri',
    imagePath: '/assets/aistudio/IMG_3028_b112fd34.jpeg',
    summary: 'Teslimat numarası 80040620 olan belgenin başlık alanında Malı Teslim Alan: TR1923 (TÜRKİYE ŞUBE / Köln) ve Belge Tarihi doğrulanır.',
    courseTimestamp: 'Teslimat Değiştirme',
    keyCallouts: [
      {
        title: 'Malı Teslim Alan: TR1923',
        location: 'Başlık alanı',
        description: 'Alıcı firmanın adı ve cari kodu.',
      },
      {
        title: 'Genel Çekme Durumu: A (Henüz çekilmedi)',
        location: 'Çekme sekmesi üstü',
        description: 'Çekilen miktar doldurulup kaydedildiğinde C (Tamamen çekildi) durumuna geçer.',
      },
    ],
    relatedTCode: 'VL02N',
  },
  {
    id: 'vf01_initial_documents',
    tCode: 'VF01',
    module: 'SD',
    title: 'VF01 — Faturalama Belgesi Yarat (İşlenecek Belgeler)',
    stageName: 'Faturalanacak Teslimatın Girilmesi',
    imagePath: '/assets/aistudio/IMG_3034_390311a3.jpeg',
    summary: 'Mal çıkışı tamamlanan 80040620 no\'lu teslimat belgesi "İşlenecek belgeler" tablosundaki Belge sütununa yazılır. Sağ alttaki "Kaydet" veya "Yürüt" butonuna basılır.',
    courseTimestamp: 'Fatura Yaratma',
    keyCallouts: [
      {
        title: 'Belge Sütununda Büyüteç İkonu',
        location: 'Tablo satır 1',
        description: '80040620 teslimat numarası buraya girilir.',
      },
      {
        title: 'Sağ Altta 3 Buton: Kaydet / Ters Kayıt / Yürüt',
        location: 'Koyu alt durum çubuğu',
        description: 'Doğrudan kaydet ile fatura no üretilir veya Yürüt ile önce önizleme açılır.',
      },
    ],
    relatedTCode: 'VF01',
  },
  {
    id: 'vf01_saved_toast',
    tCode: 'VF01',
    module: 'SD',
    title: 'VF01 — Fatura Saklandı Bildirimi (Alt Durum Çubuğu)',
    stageName: 'Başarılı Kayıt ve Belge No Üretimi',
    imagePath: '/assets/aistudio/IMG_3032_ae92d0c0.jpeg',
    summary: 'Fatura başarıyla kaydedildiğinde alt sol durum çubuğunda yeşil onay işaretiyle "Belge 90017855 saklandı." mesajı belirir. Muhasebe kaydı otomatik oluşur.',
    courseTimestamp: 'Fatura Onayı',
    keyCallouts: [
      {
        title: 'Sol Altta Yeşil Mesaj: [✔] Belge 90017855 saklandı',
        location: 'Alt barın en solu',
        description: 'SAP standart başarı mesajı. 90017855 numarası faturanın sistemdeki kalıcı kimliğidir.',
      },
    ],
    relatedTCode: 'VF01',
  },
  {
    id: 'vf01_overview_items',
    tCode: 'VF01',
    module: 'SD',
    title: 'VF01 / VF03 — Fatura (F2) Yarat: Genel Bakış — Kalemler ve KDV',
    stageName: 'Fatura Kalem ve Vergi Genel Bakışı',
    imagePath: '/assets/aistudio/IMG_3033_720db398.jpeg',
    summary: 'Faturanın detay ekranı: Net Değer 3.050,00 EUR, Ödeyen TR1923 (TÜRKİYE ŞUBE). 10 Melone Tee (2.900 EUR + 551 EUR KDV) ve 20 üzümlü çay (150 EUR + 28,50 EUR KDV).',
    courseTimestamp: 'Fatura Detayları',
    keyCallouts: [
      {
        title: 'Net Değer ve Para Birimi: 3.050,00 EUR',
        location: 'Başlık alanı',
        description: 'Kalemlerin matrah toplamıdır.',
      },
      {
        title: 'Vergi Tutarı (%19 / TR %20 KDV)',
        location: 'Tabloda 8. sütun',
        description: 'Yasal KDV tutarı hesaplanarak TDHP 391 Hesaplanan KDV hesabına aktarılır.',
      },
      {
        title: 'Fiyat Koşulları Başlığı',
        location: 'Üst araç çubuğu',
        description: 'PR00 temel fiyat, MWST KDV ve varsa navlun/iskonto kalemlerini detaylandırır.',
      },
    ],
    relatedTCode: 'VF03',
  },
];
