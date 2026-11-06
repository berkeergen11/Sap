# SAP Akademi Türkiye — Kod Denetimi ve Düzeltme Raporu

**Denetim tarihi:** 7 Kasım 2026  
**Kaynak:** Kullanıcının gönderdiği `Sap-main(1).zip`  
**Sınır:** Statik kod analizi + izole veri-katmanı regresyon testleri; tam Vite/React tarayıcı derlemesi yapılamadı (bağımlılık kurulumu zaman aşımına uğradı). Gerçek SAP ortamıyla ekran-bazlı karşılaştırma yapılmadı.

## 1. Envanter

- ZIP: 99 dosya/klasör girdisi, yaklaşık 33,9 MB açılmış veri.
- Kaynak kod: 28 TypeScript/TSX dosyası, yaklaşık 21.178 satır.
- Eğitim kaynakları: 16 PNG/JPEG ve üç PDF dosya girdisi (iki PDF aynı içerik/hash).
- Resmî ekler: `Getting Started With SAP S/4HANA 2025` (18 s.) ve `SAP S/4HANA 2025 Feature Scope Description` (772 s.), her ikisi de 7 Ekim 2026 sürüm 3.0. Bu belgeler sürüm/kapsam referansıdır; tek tek VA01/VL02N ekranlarının doğrulama testi değildir.
- 57 SAP işlem kodu eğitim kataloğunda; bunların hepsi işlevsel olarak uygulanmış değil.
- Orijinal ZIP'de otomatik `.test` / `.spec` dosyası bulunmadı.

## 2. Orijinal sürümde doğrulanan kritik sorunlar

| Öncelik | Dosya/işlem | Sorun | Risk | Bu sürümde yapılan |
|---|---|---|---|---|
| Kritik | `sapPersistenceStore.ts`, VL01N/VL02N | Teslimat yaratılır yaratılmaz PGI/stok düşümü yapılıyordu | Yanlış SAP süreç eğitimi | Teslimat oluşturma (`executeCreateOutboundDelivery`) ile mal çıkışı (`executePostGoodsIssue`) ayrıldı |
| Kritik | `sapPersistenceStore.ts`, VF01 | Olmayan teslimattan F2 fatura oluşturulabiliyordu | Hayalî FI kaydı | Referans ve PGI doğrulaması eklendi |
| Kritik | Aynı | Aynı teslimata birden fazla F2 faturası oluşturulabiliyordu | Mükerrer muhasebe | Önleyici kontrol eklendi |
| Kritik | Aynı | Fatura tutarı kullanıcıdan gelen, referanssız UI toplamına dayanıyordu | Belge-tutar uyuşmazlığı | Sipariş kaydındaki tutar kullanılacak şekilde değiştirildi (ileri seviye kısmi fatura henüz yok) |
| Kritik | `SapGuiSimulator.tsx`, VA02 | VA02 değişiklik ekranı VA01 gibi yeni sipariş üretiyordu | Sahte değişiklik | Kalıcı güncelleme uygulanana kadar bloke edildi |
| Kritik | `SapGuiSimulator.tsx`, VL09 | Ters kayıt başarı mesajı verip stok hareketi yapmıyordu | Yanlış bilgi | Yanlış başarı kaldırıldı; işlev hâlâ uygulanmadı |
| Kritik | `sapPersistenceStore.ts`, MIGO | Doğrulanmamış PO üzerinden 101 mal kabul kaydedilebiliyordu | Sahte stok/GR-IR | Satın alma siparişi kayıt sistemi tamamlanana kadar kapatıldı |
| Kritik | `ClassicSapGuiWindow.tsx` | Rastgele numaralı 'kaydedildi' mesajları vardı | Yanlış kullanıcı eğitimi | Kaydetme gösterim/uyarı moduna çekildi |
| Yüksek | `sapPersistenceStore.ts`, VA01 | Sipariş numarası uzunluk/sayaçla üretildiği için çakışabilir ve malzeme/müşteri kontrolü eksikti | Hatalı kayıt | Var olan numaraları kontrol eden sıra; BP ve malzeme doğrulaması eklendi |
| Yüksek | `sapPersistenceStore.ts`, PGI | Bilinmeyen malzeme maliyetle geçirilebiliyor, yanlış depo stoklarından düşülebiliyordu | Stok tutarsızlığı | Malzeme+plant+storage location+birim kontrolü eklendi |
| Yüksek | `sapPersistenceStore.ts`, BP | Var olan BP aynı numarayla sessizce ezilebiliyordu | Ana veri kaybı | Mükerrer BP engeli eklendi |
| Yüksek | `sapPersistenceStore.ts`, storage | `localStorage` hata verse bile başarı akışı devam edebilirdi | Kaybolan kayıt | Saklama hataları üst katmana iletiliyor |
| Orta | `VideoPlayerPanel.tsx` | Zaman damgası oynatıcı URL'sini değiştirmiyordu | Video-egzersiz senkronizasyonu | Başlangıç saniyesi URL'ye bağlandı, modül değişince sıfırlandı; gerçek YouTube oynatma doğrulanmadı |
| Yüksek | `SapAuditAndArchitectureCenter.tsx` ve video ekranı | '%100 doğrulandı', 'ilişkisel ERP veritabanı' gibi test edilmemiş ifadeler | Kullanıcıyı yanıltma | Kanıtsız tam uyum iddiaları revize edildi |

## 3. Düzeltme yapılmış olsa da halen eksik/kısıtlı alanlar

1. **Tam SAP eşdeğerliği yok.** Bu, React tabanlı eğitim simülatörüdür. SAP uygulaması veya bir SAP backend değildir.
2. **Gerçek DB yok.** `localStorage` tek tarayıcı ve tek cihazla sınırlıdır; eşzamanlılık, güçlü işlemsellik, migration, yetki, sunucu yedeği yoktur. Görünümdeki SAP tabloları (VBAK, VBRK, ACDOCA vb.) simüle edilmiş nesnelerdir.
3. **İşlemler eksik.** VA02, MIGO, VL09 ve birçok listedeki işlem şu anda korumalı/öğretici modda veya henüz uygulanmamış durumda. Bu, yanlış başarı üretmekten daha güvenlidir.
4. **Kısmi teslimat/parsiyel fatura** uygulanmadı; ilk eğitim senaryosu bir sipariş–bir teslimat–bir F2 faturasıyla sınırlı.
5. **SAP koşul/iş kuralı altyapısı:** ATP, pricing procedure, copy control, partner determination, credit management, tax/account determination, batch/serial number, plant/calendar, FI posting ve ters kayıtlar hedef SAP konfigürasyonu düzeyinde uygulanmadı.
6. **Fişler/muhasebe:** Hesaplar (`621000`, `153000`, `120000` vb.) eğitim verileri; gerçek şirket hesap planı değil. PGI maliyetinin satış para birimiyle ifade edilmesi çok para birimli işlemlerde doğru olmayabilir. Bu iş akışı yalnızca basitleştirilmiş eğitim örneğidir.
7. **Video kaynakları:** YouTube bağlantıları ve 11 adımlı zaman damgası tablosu kaynak kodda bulunuyor, fakat her anın gerçek videoya uyduğu canlı olarak doğrulanmadı.
8. **SAP görselleri:** IMG_3025–IMG_3041 vb. eğitim ekran görüntüleri statik referans. Her alanın canlı SAP S/4HANA 2025 FPS01 ile eşleştiği kanıtı yok.
9. **Tarih ve örnek bilgiler:** 2021 tarihli örnek müşteri/sipariş/teslimat/fatura kayıtları bulunuyor. Bunlar başlangıç verisi; bugün gerçekleştirilmiş işlem değildir.
10. **Güvenlik:** Kimlik doğrulama, SAP yetki nesneleri, audit log, veri maskeleme ve sunucu tarafı koruma gerçek seviyede uygulanmış değil. Gerçek müşteri verisiyle üretimde kullanılmamalıdır.
11. **Derleme testi engeli:** `npm install` bağımlılık indirme aşamasında zaman aşımına uğradı. `tsc --noEmit` ise bağımlılıklar kurulmadığı için `vite/client` tipini bulamıyor. Tüm TypeScript dosyalarının transpile/sözdizimi ve göreli importları ayrı kontrol edildi; bu tam tip kontrolü veya React tarayıcı testi yerine geçmez.
12. **Hata kodları:** `VL 609`, `M7 021` vb. ekran mesajlarının SAP'deki özgün hata kodlarına birebir uygunluğu doğrulanmamış; yeni korumalarda kasıtlı `SIM` kodu kullanıldı.

## 4. Test sonuçları

- 28 TS/TSX kaynak dosyasında sözdizim/transpile hatası: **0**.
- Eksik göreli import: **0**.
- İzole veri katmanı regresyon senaryoları: **18/18 PASS**.
- Testler: sahte sipariş, mevcut teslimat, olmayan fatura referansı, çift fatura, olmayan proforma siparişi, mükerrer PGI, MIGO güvenli engel, geçersiz sipariş, yeni sipariş numarası, teslimat yaratma, teslimatın PGI öncesi stoğu etkilememesi, erken fatura reddi, gerçek PGI geçişi, mükerrer PGI reddi, referans fatura tutarı, çift fatura reddi, verinin yeniden yüklenmesi vb.
- Tam Vite build, `tsc` typecheck ve Playwright/gerçek tarayıcı E2E: **TEST EDİLEMEDİ**.
- Gerçek SAP S/4HANA sisteminde ekran ve işlem karşılaştırması: **TEST EDİLEMEDİ**.

## 5. Türkçe ve resmî kaynak doğrulaması

**Türkçe eğitim/müfredat kaynakları:**

- Başak Varlıoğlu MM: https://basakvarlioglu.com/sap-dokuman/dokumanlar/lojistik-moduller/sap-mm-ekranlarinin-kullanimi/
- İstanbul Kent Üniversitesi SD: https://sertifika.kent.edu.tr/sap-sd-satis-dagitim-surecleri-ve-kullanici-islemleri
- Bursa Uludağ Üniversitesi SD: https://ulusem.uludag.edu.tr/egitim/4647/sap-sd-satis-ve-dagitim-modulu-ile-satis-surecleri-kullanici-egitimi

Bu kaynaklar eğitim kapsamına yardımcıdır; tüm işlem alanlarının sürüm bazlı doğru olduğunu tek başlarına kanıtlamaz.

**Resmî SAP:**

- SAP S/4HANA satış belgesi ve belge akışı: https://learning.sap.com/courses/executing-basic-erp-processes-with-sap-s-4hana/executing-sales-order-management
- Sevkiyat, picking, PGI etkileri: https://learning.sap.com/courses/exploring-sap-s-4hana-sales-essentials/executing-the-shipping-process_e796d891-1485-4b97-874b-f4cbcbd9dbc9
- Satış faturası/muhasebe: https://learning.sap.com/courses/exploring-sap-s-4hana-sales-essentials/executing-the-billing-process-and-the-integration-to-sap-s-4hana-finance_e2dd5db3-73c3-4cda-8ad5-1e7f39f04fba
- BP: https://learning.sap.com/courses/exploring-fashion-functions-and-business-processes-in-sap-s-4hana-for-fashion-and-vertical-business/exploring-business-partner_ca26041f-1417-44f7-8373-f89be5f54796
- F5/F8 proforma: https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/1e70b6535fe6b74ce10000000a174cb4.html?locale=tr-TR
- SAP GUI for HTML: https://help.sap.com/docs/PRODUCT_ID/b97ada5a7a6a4ad190a524c603b8e570/4c3a83ddb48f1ca9e10000000a42189e.html?locale=en-US

**Önemli SAP farkları:** VL01N ile teslimat yaratma ve PGI ayrı; SAP F5 satış siparişi, F8 teslimat referanslı proformadır ve FI muhasebe kaydı yaratmaz; BP 000000/FLCU00/FLCU01 rolleri ayrıdır. SAP 2025 FPS01 GUI for HTML belge referansı bulundu, ancak her kullanıcının işletmesindeki ekran konfigürasyonu aynı olmak zorunda değildir.

## 6. İzleyen sürümler için gerekli mimari plan

1. Yerel geliştirme ortamında `npm install`, `npm run lint`, `npm run build` ve gerçek tarayıcı testlerini geçir.
2. Daha önceki v1 `localStorage` verilerine migrasyon/test ekle; mevcut kayıtları otomatik silme.
3. Gerçek bir eğitim veritabanı (ör. SQLite/PostgreSQL + backend API) tasarla; belge, kalem, hareket, FI kayıtlarını tek işlem sınırında yönet.
4. Satın alma siparişi/PO kalemleri, doğrulama, parça-parça 101 mal kabul, MIRO ve ters kayıt işlevleri ekle.
5. VA02 değişiklik, VL09 PGI geri alma, VF11 fatura iptali için ayrı belge durumu ve dengeleme hareketleri uygula.
6. ATP, sevkiyat noktası, kalem/termin satırı, şart kaydı, tax/account determination gibi kuralları varsayımsal değil, seçilen eğitim şirketinin konfigürasyonuna göre uygula.
7. Tüm 57 T-Code için kapsama matrisi ve ekran sürümü farkı oluştur; her işlem için PASSED/FAILED/BLOCKED/NOT IMPLEMENTED durumu ver.
8. Eğitim videolarını/screenshot'ları gerçek kaynak bazında manuel kontrol et, doğrulanmamış olanları etiketle.
9. Gerçek SAP logosu, ekran görüntüsü ve PDF içerikleri için kullanım haklarını ayrıca gözden geçir; kamuya açık PDF eğitim materyali her zaman yeniden dağıtım lisansı anlamına gelmez.

**Sonuç:** Düzeltme paketi SAP'nin yerine geçen eksiksiz bir ürün değildir. Öncelikle hatalı başarı mesajlarını engelleyen, temel belge referanslarını doğrulayan ve giriş seviyesi eğitim iş akışını daha güvenli kılan bir ara sürümdür.

## 7. Kullanıcının AI Studio'ya eklediği görsellerin kontrolü

- `IMG_3025`–`IMG_3041` grubundaki **13 görüntü dosyası** okunabilir; görsel incelemede bunlar ağırlıkla SAP/Fiori veya SAP GUI benzeri eğitim ekranlarının fotoğrafı/ekran görüntüsü, bazıları altyazı ve işaretleme içeriyor. Yani ekran akışını göstermek için referans kullanılabilir; uygulamanın dinamik olarak ekranı birebir kopyaladığına kanıt teşkil etmez.
- `image_*.png` grubundaki üç ek PNG dosyası da pakette bulunuyor.
- React kaynak kodlarında görsel dosyalarının adlarına referanslar var, fakat **her görselin doğru işlem kodu, ekran numarası ve video saniyesiyle eşleştirildiği canlı doğrulanmamış**. Kaynak kodda “11/11 doğrulandı” ifadesi bu yüzden düşürüldü.
- PDF eklerinde 772 sayfalık Feature Scope Description iki farklı dosya adıyla aynı içerik olarak bulunuyor. Dosyalardan biri gereksiz depolama tekrarı; kullanıcı kaynaklarını korumak için bu ara sürümde silinmedi.
- Eklerde tam SAP sunucusu veritabanı, SAP kaynak kodu veya SAP sistemine bağlanan API anahtarları bulunmuyor. Bunlar eğitim ve ekran referans dosyalarıdır.
