/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GuidedMissionStep } from '../types/sap';

export const GUIDED_MISSIONS: Record<string, GuidedMissionStep[]> = {
  VA01: [
    {
      stepIndex: 1,
      targetId: 'auart',
      title: '1. Adım: Sipariş Türünü Seç (ZOR)',
      instruction: 'Sipariş Türü kutucuğuna tıkla ve Türkiye için standart "ZOR - Standart Türkiye Siparişi" seç.',
      expectedAction: 'Sipariş Türü: ZOR',
      turkeyContext: 'ZOR türü, Türkiye e-Dönüşüm sistemine doğrudan entegre çalışır.',
    },
    {
      stepIndex: 2,
      targetId: 'vkorg',
      title: '2. Adım: Satış Dağıtım Alanını Belirle',
      instruction: 'Satış Örgütü: 1000, Dağıtım Kanalı: 10 ve Bölüm: 00 değerlerini incele.',
      expectedAction: 'Organizasyon Verisi Hazır',
    },
    {
      stepIndex: 3,
      targetId: 'kunnr',
      title: '3. Adım: Müşteri Cari Kodunu (Sipariş Veren) Seç',
      instruction: 'Sol üstteki "Sipariş Veren" kutusuna tıkla ve 100021 Koçak Lojistik A.Ş. carisini seç.',
      expectedAction: 'KUAG-KUNNR: 100021',
      turkeyContext: 'Müşterinin VKN numarası arka planda GİB e-Fatura mükellefi olarak taranır.',
    },
    {
      stepIndex: 4,
      targetId: 'tab_items',
      title: '4. Adım: Kalem Özeti Sekmesine Geç ve Miktarı Ayarla',
      instruction: '"Kalem Özeti" sekmesine tıkla, MAT-TURK-01 malzemesinin sipariş adedini incele veya değiştir.',
      expectedAction: 'Kalem Tablosu Doğrulandı',
    },
    {
      stepIndex: 5,
      targetId: 'tab_e_invoice',
      title: '5. Adım: Türkiye e-Dönüşüm / GİB Sekmesini İncele',
      instruction: '"Türkiye e-Dönüşüm / GİB" sekmesine tıkla; TICARIFATURA senaryosu ve %20 KDV teyidini yap.',
      expectedAction: 'GİB Fatura Senaryosu: TICARI',
      turkeyContext: 'Ticari faturada alıcıya 8 gün yasal itiraz süresi tanınır.',
    },
    {
      stepIndex: 6,
      targetId: 'save_button',
      title: '6. Adım: Sağ Üstteki Mavi Disket (Kaydet / Ctrl+S) Butonuna Bas!',
      instruction: 'Standart araç çubuğundaki mavi disket butonuna tıkla ve sipariş numarasının alt barda oluştuğunu gör.',
      expectedAction: 'Belge Kaydedildi',
    },
  ],

  VL01N: [
    {
      stepIndex: 1,
      targetId: 'vstel',
      title: '1. Adım: Sevkiyat Noktası ve Sipariş Referansı',
      instruction: 'Sevkiyat Noktası (1000) ve Sipariş Referansını (14205) kontrol et.',
      expectedAction: 'Sevkiyat Noktası Hazır',
    },
    {
      stepIndex: 2,
      targetId: 'tab_picking',
      title: '2. Adım: Toplama (Picking) Sekmesine Tıkla',
      instruction: 'Depo toplama miktarını (Pick Qty) belirlemek için Toplama sekmesine geç.',
      expectedAction: 'Toplama Sekmesi Açık',
    },
    {
      stepIndex: 3,
      targetId: 'plaka',
      title: '3. Adım: e-İrsaliye Araç Plakası ve Şoför Bilgisi',
      instruction: 'Sevkiyat için taşıyıcı plakasını (34 SAP 1923) ve şoför TCKN alanını gör.',
      expectedAction: 'e-İrsaliye Bilgileri Tam',
      turkeyContext: 'Kamyon fabrikadan çıkmadan e-İrsaliye GİB sistemine onaylatılmalıdır.',
    },
    {
      stepIndex: 4,
      targetId: 'pgi_button',
      title: '4. Adım: "Mal Çıkışını Kaydet (PGI)" Butonuna Bas!',
      instruction: 'Üst araç çubuğundaki mavi kamyon / "Mal Çıkışını Kaydet" butonuna tıkla. Stok depodan düşer ve muhasebe maliyeti oluşur.',
      expectedAction: 'Mal Çıkışı (PGI) Tamamlandı',
    },
  ],

  MIGO: [
    {
      stepIndex: 1,
      targetId: 'action',
      title: '1. Adım: Sol Üst İşlem Seçicisini Doğrula (A01 Mal Kabulü)',
      instruction: 'Sol üstteki birinci açılır kutuda "A01 - Mal Kabulü" seçili olduğunu gör.',
      expectedAction: 'İşlem: A01 Mal Kabulü',
    },
    {
      stepIndex: 2,
      targetId: 'refdoc',
      title: '2. Adım: Referans Belgeyi Doğrula (R01 SAS)',
      instruction: 'Hemen yanındaki ikinci kutunun "R01 - Satın Alma Siparişi" olduğunu teyit et.',
      expectedAction: 'Referans: R01',
    },
    {
      stepIndex: 3,
      targetId: 'lfsnr',
      title: '3. Adım: Gelen e-İrsaliye Numarasını İncele',
      instruction: 'Tedarikçinin irsaliye numarasını (GIB202600004123) başlıkta kontrol et.',
      expectedAction: 'İrsaliye No Girildi',
    },
    {
      stepIndex: 4,
      targetId: 'migo_item_ok',
      title: '4. Adım: ÇOK KRİTİK! "Kalem Tamam (Item OK) ☑" Kutusunu Tıkla',
      instruction: 'Malzeme tablosunun sağında yer alan sarı çerçeveli "Kalem Tamam ☑" kutucuğunu işaretle. Bu kutu olmadan SAP malı kabul etmez!',
      expectedAction: 'Kalem Tamam Onaylandı',
      turkeyContext: 'En yaygın depo hatası bu kutunun unutulmasıdır.',
    },
    {
      stepIndex: 5,
      targetId: 'save_button',
      title: '5. Adım: Kaydet Butonuna Bas ve Depoya Girişi Tamamla',
      instruction: 'Araç çubuğundaki mavi diskete tıkla. Malzeme belgesi 50000... üretilecek ve stoklar artacaktır.',
      expectedAction: 'Depoya Mal Girişi Yapıldı',
    },
  ],

  FB50: [
    {
      stepIndex: 1,
      targetId: 'bukrs',
      title: '1. Adım: Şirket Kodu (TR01) ve Belge Tarihini Gör',
      instruction: 'Şirket kodunun TR01 ve para biriminin TRY olduğunu kontrol et.',
      expectedAction: 'TR01 Şirket Kodu',
    },
    {
      stepIndex: 2,
      targetId: 'tab_gl_lines',
      title: '2. Adım: 770 Borç ve 102 Alacak Satırlarını İncele',
      instruction: 'Genel Yönetim Gideri (770) Borç 15.000 TL, Banka (102) Alacak 15.000 TL satırlarını gör.',
      expectedAction: 'Çift Taraflı Kayıt',
    },
    {
      stepIndex: 3,
      targetId: 'fico_traffic_light',
      title: '3. Adım: Sağ Üstteki Bakiye Trafik Lambasına Bak',
      instruction: 'Borç = Alacak olduğu için lambanın YEŞİL yandığını ve farkın 0,00 TL olduğunu doğrula.',
      expectedAction: 'Bakiye Işığı: Yeşil',
    },
    {
      stepIndex: 4,
      targetId: 'save_button',
      title: '4. Adım: Kaydet (Ctrl+S) ile Defterikebire İşle',
      instruction: 'Mavi diskete basarak yevmiye belgesini üret.',
      expectedAction: 'Muhasebe Fişi Kaydedildi',
    },
  ],
};
