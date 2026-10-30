# Uygulama Planı: Modern SAP S/4HANA'da Karşınıza Çıkacak Gerçek Ekran Mimarisi (Fiori Spaces, Pages, WebGUI ve Çoklu Departman Rolleri)

Yaptığımız derin SAP kurumsal standartları araştırmasına (SAP S/4HANA 2023/2026, RISE with SAP, Fiori Spaces & Pages ve SAP GUI for HTML WebGUI standartları) göre; **günümüzde yeni bir şirkete işe başladığınızda veya şirketinize yeni SAP kurulduğunda** karşınıza tam olarak ne çıkacağı ve bunun nasıl deneyimleneceği aşağıda planlanmıştır:

---

## 1. Yeni SAP Aldığınızda Karşınıza Ne Çıkar? (Araştırma & Gerçek Dünya Bulguları)

1. **Masaüstü SAP Logon İstemcisi mi, Web Tarayıcısı mı?**
   * **Gerçek:** Modern SAP S/4HANA (Cloud / Private Cloud) projelerinde kullanıcıların %90'ı bilgisayarlarına bir program kurmadan doğrudan Chrome veya Edge tarayıcısını açar ve şirketin `https://[sirket-adi].s4hana.cloud.sap/fiori` veya intranet WebGUI adresine girer.
   * Ancak arka planda çalışan eski alışkanlıklar ve derin konfigürasyonlar için **SAP GUI for HTML (WebGUI)** kullanılır. Yani tarayıcı içindeyken tek tıkla video ekranlarınızdaki gibi beyaz/mavi modern WebGUI (Belize/Horizon) açılır.

2. **Giriş Yaptığınızda Ekranda Hangi Kutucuklar Olur?**
   * Kullanıcının SAP kullanıcı adına tanımlı **İş Rollerine (Business Roles - `SAP_BR_*`)** göre kutucuklar gelir.
   * Sizin seçtiğiniz gibi **"Hepsi"** (Tüm departmanlar) yetkisine sahip bir süper kullanıcı / direktör rolünde, üst tarafta **Spaces & Pages (Alanlar ve Sayfalar)** sekmeleri sıralanır.

3. **Kutucuğa Tıkladığınızda Ne Olur?**
   * İki tip ekran açılır:
     1. **Modern Fiori Uygulaması (Fiori Elements):** Filtre çubuğu, akıllı liste, KPI analitiği olan temiz web arayüzü (Örn: *Satış Siparişlerini Yönet*, *Fatura Listesi*).
     2. **WebGUI Belize İşlem Ekranı:** Videodaki gibi üst barda komut kutucuğu (`/n`), *Sipariş referansı olmadan*, *Çekme*, *Mal çıkışını kaydet* butonları ve alt barda yeşil onay mesajı (`[✔] Belge saklandı`) olan standart SAP işlem ekranı.

---

## 2. Geliştirilecek Yeni Özellikler ve Ekran Düzenlemeleri

### A. Fiori Spaces & Pages Çoklu Departman Mimarisinin Genişletilmesi
Kullanıcı tüm departmanları istediği için Fiori Başlangıç Sayfası üst sekme yapısı SAP S/4HANA Spaces standardına dönüştürülecektir:
1. 📦 **Satış & Sevkiyat (SD Space):** `VA01`, `VA02`, `VA03`, `VL01N`, `VL02N`, `VF01`, `VF04`, `VK11`, `VK12`, `VA05`, `VL06O`, `V.01`, Satış KPI analitikleri.
2. 🏭 **Satınalma & Depo (MM/WM Space):** `ME21N` (SAS Açma), `MIGO` (Mal Kabulü 101), `MIRO` (Satıcı Faturası), `MM01`/`MM02` (Malzeme Kartı), `ME51N` (Talep), `MB52` (Depo Stok Matrisi), `LT01` (Raf Transferi).
3. 💰 **Mali İşler & Muhasebe (FI/CO Space):** `FB50` (Genel Yevmiye Mahsup), `FB60` (Satıcı Faturası & Tevkifat), `FB70` (Müşteri Faturası), `F110` (Otomatik Ödeme), `F-53` (Ödeme Çıkışı), `FS00` (Ana Hesap), `KS01`/`KSB1` (Masraf Yeri), `AW01N` (Duran Varlık Gezgini).
4. ⚙️ **Üretim & Kalite (PP/QM Space):** `CO01` (Üretim Siparişi), `CO11N` (Operasyon Teyidi), `CS01` (Ürün Ağacı BOM), `CR01` (İş Yeri), `MD04` (MRP İhtiyaç Listesi), `QA32`/`QA11` (Kalite Muayene Partisi & Kullanım Kararı).
5. 🔧 **Tesis & Bakım (PM/CS Space):** `IW31` (Bakım İş Emri Yarat), `IW21` (Arıza Bildirimi), Ekipman Sicil Kartı.
6. 👥 **İnsan Kaynakları & Sistem (HCM/BASIS Space):** `PA40` (İşe Giriş/Terfi), `PA30` (Özlük Bilgi Tipleri), `SU01` (Kullanıcı & Yetki), `SE11` (ABAP Sözlüğü), `ST22` (Dump Analizi).

### B. "Yeni SAP'de İlk Günüm: Ne Nerededir?" İnteraktif Rehber Modu
Kullanıcının aklındaki *"İşe girdiğimde karşıma tam olarak bunlar mı çıkacak?"* sorusunu adım adım yanıtlayan canlı bir interaktif rehber bileşeni eklenecektir:
* **"İlk Gün Oryantasyonu" Butonu:**
  * Şirkete başladığınızda açacağınız tarayıcı URL'si nasıl görünür?
  * `SAP_BR_*` rollerinin ekrandaki kutucukları nasıl değiştirdiği.
  * Hangi durumda Fiori uygulamasının, hangi durumda WebGUI ekranının açılacağı.
  * Kutucukların üzerindeki rakamların (Örn: `26,0 B` açık sipariş, bekleyen faturalar) ne anlama geldiği.

### C. WebGUI ve Modern Fiori Görünümünün İki Taraflı Geçişi
* Her işlemde kullanıcının hem **Fiori Liste Görünümünü** hem de video görüntülerindeki **WebGUI Belize/Quartz Ekranını** deneyimleyebilmesi.
* Sol üstteki komut alanına `/n` yazıldığında anında bu ana ekrana dönülmesi.
* TR01 şirket kodu ve kurumsal verilerin tüm modüllerde kesintisiz çalışması.
