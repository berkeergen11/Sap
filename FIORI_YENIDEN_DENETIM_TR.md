# SAP Akademi Türkiye — İkinci bağımsız Fiori denetimi

Tarih: 7 Kasım 2026. Kapsam: `SAP_Akademi_Fiori_Oncelikli_Gelistirilmis_2026.zip` içindeki kod ve gömülü belgeler.

## Temel sonuç

Fiori odaklı ilerleme yapılmış fakat ürün gerçek SAPUI5/Fiori Elements değildir. İşletme kuralları sınırlı bir yerel simülatördür. Fiori uygulama **kimliğinin** doğru olması, ekranın o SAP uygulamasının tüm özelliklerini/iş adımlarını sunduğu anlamına gelmez.

## SAP resmî kontrol

- Manage Sales Orders – Version 2: F3893; listeleme, filtreleme ve sipariş işlemleri: https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/ae4138d6a804446faa0a249f3a7e18d8.html
- Create Outbound Deliveries – From Sales Orders: F0869A; sevkiyat noktası ve sipariş seçimi üzerinden teslimat: https://help.sap.com/docs/SAP_S4HANA_CLOUD_BEST_PRACTICES/b674ab5db10ef73a4d1da9d08a3770d2/222c646d709a4916a11a8068c17675f6.html?locale=en-US&state=PRODUCTION&version=2608
- Pick Outbound Delivery: F0868, ardından uygun teslimatta PGI. Kaynak: https://help.sap.com/docs/s4hana-cloud-best-practices/substance-volume-tracking-4ol-es/post-goods-issue-for-outbound-delivery
- Manage Outbound Deliveries: F0867A; teslimat listesi/işleme, PGI ve koşullara göre ters kayıt: https://help.sap.com/docs/PRODUCT_ID/aff0b3f5f46c42a2b2c0fabfc233bab2/7d9124f355bf4d2790e0776a68ea7bb6.html?locale=en-US&state=PRODUCTION&version=2602.500
- Create Billing Documents: F0798; billing due list içinden işlem ve uygun fatura kaydı: https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/7dc3125477a98c24e10000000a4450e5.html

**Sürüm uyarısı:** SAP S/4HANA 2025 on-premise dokümanı ile SAP S/4HANA Cloud Public Edition 2602/2608 dokümanları farklı ürün/sürüm referanslarıdır. Her ekran bir hedef dağıtım ve sürümle ayrıca ilişkilendirilmeli; tek bir '2026 SAP sistemi' gibi sunulmamalıdır.

## Kod üzerinden tespit edilen hatalar

1. `src/components/FioriPracticeWorkspace.tsx`: F0869A ve F0867A aynı `deliveries` görünümünü açıyordu; rol eğitimi ve işlem ayrımı zayıftı. **Düzeltildi:** Teslimat oluşturma (F0869A) ve teslimat yönetimi (F0867A) ayrıldı.
2. Aynı bileşen: `Picking + PGI` tek butondu. **Düzeltildi:** F0868 picking ekranı, ayrı picking kaydı ve sonrasında PGI.
3. `src/data/sapPersistenceStore.ts`: PGI kayıtlı picking olmadan çağrılabiliyordu; gönderilen `pickedQuantities` verisi işlem tarafından kabul edilebiliyordu. **Düzeltildi:** PGI yalnızca kayıtlı, tamamlanmış picking ile çalışıyor. Miktar, kalıcı teslimat belgesinden doğrulanıyor.
4. Aynı veri katmanı: satış alanı ile müşteri ve malzeme/para birimi ana verileri arasında eşleşme doğrulaması yetersizdi. **Düzeltildi:** Satış alanı, birim, para birimi ve depo yeri temel kontrolleri eklendi. **Kapsam sınırı:** SAP fiyatlandırma prosedürü, vergiler, ölçü birimi dönüşümü ve şirket kodu customizing henüz uygulanmış değildir.
5. Aynı veri katmanı: Fatura para birimi kullanıcı isteminden gelebiliyordu. **Düzeltildi:** Fatura ve muhasebe para birimi referans siparişin kalıcı kaydından alınıyor.
6. Fiori rol menüsü satış uygulamalarını diğer rollere de gösteriyordu. **Düzeltildi:** Ana rol kartları rol bazında filtreleniyor. **Gerçek yetkilendirme yoktur:** Üstteki eğitim geçişleri ve yerel veri katmanı yetkilendirme kontrolü yapmaz.
7. F0868 picking formunda farklı teslimatların aynı kalem numaraları birbirinin girişini etkileyebilirdi. **Düzeltildi:** Giriş anahtarı teslimat+kalem olarak ayrıldı.

## Hâlâ kritik açıklar / yanlış öğrenme riski

- F3893: SAP'nin gerçek liste filtreleri, sipariş güncelleme, blokaj yönetimi, çoklu kalem, termin satırları, pricing, ATP, arama yardımı ve belge değişiklikleri eksik.
- F0869A: gerçek sevkiyat noktası tayini, teslimat tarihleri, ATP, delivery due/selection, kısmi teslimatlar yok. Şu an sipariş başına yalnızca bir tam teslimat destekleniyor.
- F0868: sadece **tam picking** destekleniyor; kısmi toplama, depo yönetimi/WM-EWM işlemleri bulunmuyor.
- F0867A: gerçek ters PGI (VL09 eşdeğeri), yönetim varyantları ve istisna akışları eksik.
- F0798: billing due list çok basit; iptal, vergi/fiyatlandırma, muhasebe transferi hata durumları, billing type/copy-control yapılandırması yok.
- F3163: BP ana veri oluşturma ve değiştirme Fiori ekranında uygulanmamış, listeleme ağırlıklı.
- Simülatör kalıcı veri katmanı `localStorage`: ilişkisel DB, transaction isolation, kullanıcı bazlı veri ayrımı, güvenli yetki veya çoklu cihaz senkronizasyonu yok.
- Fiyatlandırma: yeni siparişte `taxRate:0` sabit; gerçek vergi tayini yok. Farklı ülkeler için 0 vergi doğruymuş gibi öğrenilmemeli.
- Eğitim/ölçme: Fiori içindeki dört adımlı görev metni gerçek bir yeterlik sınavı değil; görev ve puanlama veri tabanı tarafından ayrı bir rubrikle doğrulanmıyor.
- Tüm SAP ekranlarının piksel hassasiyetinde eşleşmesi ve bütün ekran düğmelerinin işlevselliği doğrulanmadı.

## Ek kaynak dosyalarıyla karşılaştırma

- Paket içinde resmî `Getting Started With SAP S/4HANA 2025` (18 sayfa) ve `SAP S/4HANA 2025 Feature Scope Description` (772 sayfa) PDF'leri var. İkinci PDF iki farklı isimle **aynı dosya** olarak eklenmiş (SHA256 aynı).
- `public/assets/aistudio` içerisinde `IMG_` ekran referans görselleri mevcut; `src/data/realSapScreenshotsData.ts` bunların bazılarını eğitimde işaret ediyor.
- Bu dokümanlar ürün kapsamı ve sistem yönlendirmesiyle ilgili kaynaklardır; tek başına F3893/F0868 ekranlarının piksel düzeyinde birebir doğru olduğunu kanıtlamazlar.
- Video/screenshot örneklerinde 2021 tarihli örnek belge ve vergi oranı verileri bulunuyor. Bunlar '2026 güncel gerçek şirket verisi' gibi sunulmamalı.

## Test kanıtı

- `node tests/store-regression.cjs`: **22/22 davranış kontrolü geçti** (VM içinde TypeScript transpilation + mock localStorage). Bunlar gerçek SAP entegrasyon testi değildir.
- Değiştirilen `FioriPracticeWorkspace.tsx`, `sapPersistenceStore.ts` ve `App.tsx` için TS/TSX **sözdizimi** kontrolünde 0 hata.
- Tam `tsc --noEmit` / `npm run build` / tarayıcı uçtan uca testleri çalıştırılamadı: bu çalışma ortamında npm bağımlılıkları kurulmamış. Sözdizimi testinden tip hatası veya tarayıcı sorunsuzluğu sonucu çıkarılmaz.

## Hızlı öğrenme için hedef akış

Rolü `Sales` seç, F3893 sipariş oluştur, numara ve alanları kontrol et. `Shipping` rolüne geç, F0869A'dan teslimat oluştur; F0868 picking miktarını ayrı kaydet; F0867A'da PGI yap ve stok değişimini doğrula. `Billing` rolünde F0798'den faturala ve belge akışını kontrol et. Ertesi gün müşteri/malzeme değiştirerek yardımsız tekrar et. Aynı örneği ezberlemek yerine yeni değerlerle kontrol soruları yap.

**Sonuç:** Bu sürüm, yanlış iş sırası öğreten tek tıklamalı 'Picking+PGI'yi düzeltiyor. Ancak güncel SAP S/4HANA/Fiori'ye birebir denk gelen veya iş ortamına tek başına hazırlayan bir sistem olduğunu iddia etmek için yeterli kanıt yok.
