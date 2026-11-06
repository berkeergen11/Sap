# SAP Akademi Türkiye — PDF tabanlı Fiori iş akışı güncellemesi
Tarih: 7 Kasım 2026

## Kapsam ve kanıt
Temel: `SAP_Akademi_Fiori_Playlist_22_Ders_Entegrasyonu.zip`.

1. Ekli **SAP S/4HANA 2025 Feature Scope Description** (772 s., 7 Ekim 2026): basılı 115–124. sayfalar satış ana verileri, satış teklifi, çok kalemli siparişler, fiyatlandırma, konfigürasyona bağlı ATP, sevkiyat ve faturalama yeteneklerini kapsar. Bu belge işlem kapsamıdır; 2608 Cloud ekran tasarımının kanıtı değildir.
2. Ekli **Getting Started With SAP S/4HANA 2025** (18 s.): sürüm/mimari bilgisi; alan alan Fiori ekran referansı değildir.
3. **SAP Cloud Public Edition 2608** resmî Help:
   - https://help.sap.com/docs/SAP_S4HANA_CLOUD/aff0b3f5f46c42a2b2c0fabfc233bab2/e5441eb4b6cc42e3a6f877864a6c3923.html — teslimat oluşturma, kısmi/tam durum ve sevkiyat.
   - https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/0e70b6535fe6b74ce10000000a174cb4.html — sipariş/teslimat referanslı fatura, kısmi miktarlar.
   - https://help.sap.com/docs/SAP_S4HANA_CLOUD/e6a740f26c994f63a89b514683e060a0/e26fb6535fe6b74ce10000000a174cb4.html — teslimattan miktar, siparişten fiyat alma mantığı.

## Bu sürümde uygulanan değişiklikler
- `src/components/FioriPracticeWorkspace.tsx`: F3893 eğitim ekranında birden fazla sipariş kalemi ekle/sil, kalem miktarı, birim fiyat ve net tutar gösterimi. Para birimleri dönüştürme altyapısı bulunmadığı için eşleşmeyen malzemelerde yanıltıcı toplama yapılmıyor.
- `src/data/sapPersistenceStore.ts`: tekrar eden kalem numarası kontrolü, kalan açık miktar sorgulama, miktar bazında kısmi teslimatlar ve fazla teslimatı önleme. Aynı siparişe birden çok teslimat destekleniyor.
- F0869A eğitim ekranında açık miktar seçimi: F3893 sipariş detayından teslimat kalem miktarlarını belirleme. Kalan miktar otomatik hesaplanır.
- Teslimat yaratılmasıyla sipariş teslimat durumu kısmi/tam olarak güncellenir; mal çıkışı ayrı stok işlemidir.
- `executeCreateBilling`: F2/F8 teslimat referansında net fatura tutarı sadece ilgili teslimat kalem miktarı × satış siparişi kalem fiyatı ile hesaplanır; tüm sipariş yanlışlıkla tekrar faturalanmaz. Eğitim vergisi sipariş örnek oranından orantılanır. Gerçek fiyat yeniden belirleme ve SAP vergi belirleme uygulanmaz.
- `tests/fiori-partial-flow.cjs`: iki kalemli siparişten iki kısmi teslimat, iki picking/PGI, iki fatura, stok ve tutar tutarlılığı, hatalı miktar kontrolleri (20 test).

## Test sonucu
- `node tests/store-regression.cjs`: başarılı (mevcut testler).
- `node tests/playlist-curriculum.cjs`: başarılı (9 kontrol).
- `node tests/fiori-partial-flow.cjs`: 20/20 başarılı.
- TypeScript `transpileModule` ile tüm kaynak `.ts` ve `.tsx` dosyaları sözdizimi kontrolünden geçirildi.
- **Tam `tsc --noEmit`, Vite build ve gerçek tarayıcı E2E tamamlanmadı**: `node_modules` paketlenmemiş, bağımlılıklar bu ortamda kurulu değil.

## Önemli sınırlamalar
Bu bir **SAP bağlantısız eğitim simülasyonu**; gerçek SAP S/4HANA Cloud 2608 veya SAPUI5/Fiori Elements değil. Fiori ekranlarındaki alanların ve davranışların birebir eşleşmesi doğrulanmadı.

Eksik veya bilinçli olarak simüle edilmeyenler:
- Gerçek condition technique, vergi ve kur belirleme, ATP/MRP, sevkiyat noktası/rota belirleme, kredi limiti kontrolü ve copy control.
- Teslimat bölme/split, sevkiyat takvimi, picking alt miktar, stok rezervasyonu, depo yönetimi.
- FI açık kalem, tahsilat, ters kayıt, gerçek finansal dönem ve muhasebe belirleme.
- Çok kullanıcılı ilişkisel DB: şu an tarayıcı `localStorage` eğitim deposu.
- SAP erişim rolleri ve yetki kontrolleri.
- Gerçek SAP ekranları ve YouTube derslerinin her alan için görüntü/ses karşılaştırması.
- F0798'de sipariş referanslı veya kalem bazında kısmi billing, billing due list tam davranışı; burada sadece teslimat-bazlı F2.

## Öğrenme önerisi
1. F3893: iki kalemli yeni sipariş oluştur ve belge numarasını kaydet.
2. F0869A: ilk kalemin küçük bir miktarını teslimata seç, açık miktarı doğrula.
3. F0868: teslimatın picking miktarlarını tamamla.
4. F0867A: PGI yap, stok değişimini incele.
5. F0798: yalnızca o teslimata bağlı fatura tutarını doğrula.
6. Siparişin kalan miktarıyla ikinci teslimat/fatura tekrarla.
7. Kasten fazla teslimat veya PGI öncesi fatura dene; hatayı açıklayabil.
8. Eğitimdeki sonuçları gerçek SAP eğitim tenantındaki ekranlarla karşılaştır; konfigürasyon farklarını not et.
