/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types/sap';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. SD - VL01N Mal Çıkışı Butonu
  {
    id: 'sd_pgi_button',
    module: 'SD',
    tCode: 'VL01N',
    type: 'scenario',
    scenarioText: 'Sen bir lojistik sevkiyat yöneticisisin. Müşteriye gidecek 10 adet Kontrol Modülü depoda hazırlandı, kamyona yüklendi ve şoför irsaliyesini bekliyor. Depo stoklarının fiilen düşmesi ve muhasebe maliyet kaydının oluşması gerekiyor.',
    question: 'VL01N ekranında bu işlemi tamamlamak için standart araç çubuğundaki hangi kritik butona basarsın?',
    options: [
      'Mal Çıkışını Kaydet (Post Goods Issue - PGI / Mavi Kamyon İkonu)',
      'Yalnızca Mavi Disket (Kaydet / Ctrl+S)',
      'Durum Özeti (Shift + F1)',
      'Geri Dön (F3)',
    ],
    correctIndex: 0,
    explanation: 'Doğru! Yalnızca Kaydet (Ctrl+S) yapmak teslimatı kaydeder ancak mal çıkışını yapmaz. Stokların depodan fiilen düşmesi ve e-İrsaliye düzenlenmesi için "Mal Çıkışını Kaydet (PGI)" butonuna basılması şarttır.',
    visualCoordinateHint: 'Ekranın üst standart araç çubuğunda, Kaydet disketinin hemen sağında veya solunda yer alan mavi kamyon / yeşil onay ikonudur (Kısayol: Ctrl+Shift+F11).',
    mentalTrick: 'Zihinsel Formül: "Kamyon kapıdaysa ➡️ Mavi Kamyon Butonuna bas (PGI)!"',
  },

  // 2. MM - MIGO "Kalem Tamam" Kutusu
  {
    id: 'mm_migo_item_ok',
    module: 'MM',
    tCode: 'MIGO',
    type: 'scenario',
    scenarioText: 'Tedarikçiden gelen tır fabrikaya yanaştı. Satın Alma Siparişi 4500018901 referansıyla MIGO ekranını açtın. Sipariş numarası, irsaliye no, depo yeri (0001) ve sayılan miktar (50 adet) eksiksiz girildi. Ancak yukarıdaki Kaydet butonuna bastığında SAP kırmızı hata veriyor: "Kayıt yapılamadı".',
    question: 'Sisteme yeni başlayan personelin sıklıkla unuttuğu ve ekranın alt kısmında gizlenen zorunlu onay nedir?',
    options: [
      'Ekranın alt detay panelindeki "Kalem Tamam (Item OK)" onay kutucuğunu işaretlemek',
      'Ekranı kapatıp yeniden açmak',
      'Satın alma yöneticisinin şifresini girmek',
      'Şirket kodunu manuel olarak silip baştan yazmak',
    ],
    correctIndex: 0,
    explanation: 'Harika tespit! SAP MIGO ekranında her satır için kullanıcının "Bu ürünü gözümle gördüm ve saydım" anlamına gelen "Kalem Tamam (Item OK)" kutucuğunu işaretlemesi zorunludur. İşaretlenmezse SAP malı kabul etmez.',
    visualCoordinateHint: 'Ekranın orta-alt sekme panelinde veya malzemenin listelendiği ızgara tablonun en sağ sütununda yer alan "Kalem Tamam" onay kutusudur (Checkbox).',
    mentalTrick: 'Zihinsel Kural: MIGO\'da malı say ➡️ Alttaki "Kalem Tamam" kutusunu tıkla ➡️ Yukarıdan Kaydet!',
  },

  // 3. FICO - FB60 KDV Otomatik Hesaplama Kutusu
  {
    id: 'fico_fb60_calc_tax',
    module: 'FICO',
    tCode: 'FB60',
    type: 'button_location',
    scenarioText: 'Hukuk danışmanlık firmasından 24.000 TL (KDV Dahil) tutarında serbest meslek faturası geldi. FB60 ekranında Satıcı 320001 kodunu ve 24.000 TL tutarını girdin. KDV\'yi (%20) manuel olarak hesap makinesiyle hesaplamadan SAP\'nin otomatik ayırmasını istiyorsun.',
    question: 'Bu işlemi yaptırmak için hangi kutucuk işaretlenmelidir ve ekranın neresinde yer alır?',
    options: [
      'Tutar alanının hemen sağındaki "Vergiyi Hesapla (Calculate Tax)" onay kutusu',
      'Ekranın en alt solundaki komut satırı',
      'Üst menü çubuğundaki Yardım (Help) sekmesi',
      'Sağ üst köşedeki Çıkış (Exit) butonu',
    ],
    correctIndex: 0,
    explanation: 'Kesinlikle doğru! FB60 ve FB70 ekranlarında Tutar kutucuğunun yanındaki "Vergiyi Hesapla" (Calculate Tax) kutucuğu işaretlendiğinde sistem Türkiye KDV oranını ve matrahı otomatik hesaplar.',
    visualCoordinateHint: 'Ekranın sol üst çeyreğinde, "Tutar" (Amount) giriş kutusunun hemen sağında yer alan küçük onay kutucuğudur.',
    mentalTrick: 'Zihinsel Kural: Tutarı yaz ➡️ Hemen yanındaki "Vergiyi Hesapla" kutusunu tıkla!',
  },

  // 4. SD - Belge Akışı (Document Flow)
  {
    id: 'sd_doc_flow',
    module: 'SD',
    tCode: 'VA03',
    type: 'scenario',
    scenarioText: 'Müşteri hizmetleri departmanındasın. Müşteri arayıp "Siparişimi vermiştim, faturam kesildi mi acaba?" diye sordu. Elinde sadece 0000014205 numaralı Satış Siparişi var.',
    question: 'VA03 ekranında siparişten teslimata, oradan faturaya ve muhasebe belgesine kadar tüm zinciri tek ekranda görmek için hangi kısayol tuşuna veya butona basarsın?',
    options: [
      'F5 Tuşu / "Belge Akışı (Document Flow)" Butonu',
      'Ctrl + P (Yazdır)',
      'F12 (İptal)',
      'Shift + F3 (Çıkış)',
    ],
    correctIndex: 0,
    explanation: 'Mükemmel! Belge Akışı (Document Flow - F5 tuşu), SAP SD modülünün en güçlü ekranıdır. Sipariş ➡️ Teslimat ➡️ Mal Çıkışı ➡️ Fatura ➡️ Muhasebe Belgesi zincirini tarihleriyle ve durumlarıyla (Tamamlandı/Açık) ağaç şeklinde listeler.',
    visualCoordinateHint: 'Ekranın üst uygulama araç çubuğunda, sol başta yer alan birbirine zincirle bağlı 3 sayfa simgesidir.',
    mentalTrick: 'Zihinsel Kural: "Sipariş nerede kaldı dedektifliği" ➡️ VA03 içinde F5 (Belge Akışı)!',
  },

  // 5. MM - Satın Alma Siparişi Büyüteç Kontrol Butonu
  {
    id: 'mm_me21n_check',
    module: 'MM',
    tCode: 'ME21N',
    type: 'button_location',
    scenarioText: 'ME21N ekranında 50 adet paslanmaz çelik vida için satıcı, miktar ve fiyat girdin. Belgeyi kaydetmeden önce sistemde herhangi bir eksik alan veya bütçe aşımı olup olmadığını test etmek istiyorsun.',
    question: 'Üst araç çubuğunda yer alan ve belgeyi kaydetmeden denetleyen buton hangisidir?',
    options: [
      'Kontrol Et (Check / Büyüteç İkonu - Ctrl+F2)',
      'İptal Et (F12)',
      'Yeni Oturum Aç (/o)',
      'Yazdır (Ctrl+P)',
    ],
    correctIndex: 0,
    explanation: 'Doğru! ME21N ve ME51N ekranlarında "Kontrol Et (Check)" büyüteç butonu (Ctrl+F2), girilen verileri kaydetmeden önce SAP doğrulama kurallarından geçirir ve varsa sarı/kırmızı uyarıları listeler.',
    visualCoordinateHint: 'Başlık seviyesi araç çubuğunda, Kaydet disketinin yanında yer alan büyüteç simgesidir.',
    mentalTrick: 'Zihinsel Kural: Satın alma emrini vermeden önce ➡️ Büyüteçle Kontrol Et (Check)!',
  },

  // 6. FICO - Terazi Trafik Lambası
  {
    id: 'fico_traffic_light',
    module: 'FICO',
    tCode: 'FB50',
    type: 'coordinate',
    scenarioText: 'FB50 ekranında genel muhasebe mahsup fişi giriyorsun. Borç tarafına 15.000 TL yazdın, ancak henüz alacak tarafını girmedin.',
    question: 'Ekranın sağ üst köşesinde yer alan Bakiye Trafik Lambası hangi renkte yanar ve kaydedilebilir durumda ne renge döner?',
    options: [
      'Şu an KIRMIZI yanar; Alacak tarafına da 15.000 TL yazılıp fark 0,00 olduğunda YEŞİL\'e döner.',
      'Sürekli mavi yanar.',
      'Hiçbir zaman renk değiştirmez.',
      'Borç girildiği an yeşil yanar.',
    ],
    correctIndex: 0,
    explanation: 'Kesinlikle doğru! Çift taraflı muhasebe mantığında Borç = Alacak olmak zorundadır. Fark varken lamba KIRMIZI yanar ve sistem kayda izin vermez. Bakiye 0,00 olduğunda lamba YEŞİL olur ve kaydedilebilir.',
    visualCoordinateHint: 'Ekranın sağ üst köşesinde, genel başlık kutusunun tam karşısında yer alan renkli dairesel durum göstergesidir.',
    mentalTrick: 'Zihinsel Kural: Muhasebe lambası Kırmızıysa dur, Yeşile dönünce kaydet!',
  },
];
