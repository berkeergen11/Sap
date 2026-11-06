# SAP Akademi Türkiye — Fiori Öncelikli Teknik Denetim ve Uygulama Değişiklikleri

Tarih: 7 Kasım 2026. Hedef: Gerçek SAP S/4HANA'yı öğrenmeye yardımcı **bağımsız eğitim simülasyonu**. Hiçbir işlem gerçek SAP sunucusuna bağlanmıyor.

## Kaynak kapsamı ve sürüm ayırımı

SAP'nin resmî dokümanları esas alındı; Türkçe kaynakların eğitim dili ve modül konuları destekleyici nitelikte kullanılması tavsiye edildi. Aşağıdaki uygulama kimlikleri ve işlevler SAP Help'teki 2025 FPS01/FPS02 ve Cloud Public Edition 2608 belgelerinden doğrulandı. Belirtilen sürümlerin ekranları ve yetkileri **tam olarak aynı kabul edilmemelidir**.

| Uygulama | App ID | Doğrulama | Resmî referans |
|---|---|---|---|
| Manage Sales Orders – Version 2 | F3893 | Listede arama/filtre; tek sipariş oluşturma, değiştirme ve görüntüleme | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/ae4138d6a804446faa0a249f3a7e18d8.html |
| Manage Sales Orders | F1873 | Önceki ve ilişkili satış belgelerine geçiş, belge akışı | https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/ce158e56ba281e5ee10000000a4450e5.html |
| Create Outbound Deliveries – From Sales Orders | F0869A | Siparişten teslimat oluşturma | https://help.sap.com/docs/SAP_S4HANA_CLOUD/aff0b3f5f46c42a2b2c0fabfc233bab2/4bef7a69021f4e02b64ee69f85f52646.html |
| Manage Outbound Deliveries | F0867A | Açık teslimatları listeleme, uygun olduğunda PGI | https://help.sap.com/docs/PRODUCT_ID/aff0b3f5f46c42a2b2c0fabfc233bab2/7d9124f355bf4d2790e0776a68ea7bb6.html?locale=en-US&state=PRODUCTION&version=2602.500 |
| Create Billing Documents | F0798 | Faturalandırma vadesi gelen belgelerden fatura | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/7dc3125477a98c24e10000000a4450e5.html |
| Manage Business Partner Master Data | F3163 | İş ortağı ana verileri | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/61bca3e722954443b88eee2839e41610.html |
| Manage Product Master Data | F1602 | Malzeme ana verisi | https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/f5bcbdb5b23c45c98c33edebc59fc5d6.html?version=2025.000 |

Kaynak: SAP Fiori launchpad Spaces & Pages ve SAP GUI uygulamalarının launchpad içinde barındırılması: https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/753af2c410584bc98f0363ca69a404f1.html

Türkçe yardımcı eğitim kaynakları (işlem ekranı/sürüm doğrulaması için tek başına yeterli değildir): https://basakvarlioglu.com/sap-dokuman/dokumanlar/ ; https://sertifika.kent.edu.tr/sap-sd-satis-dagitim-surecleri-ve-kullanici-islemleri ; https://ulusem.uludag.edu.tr/egitim/4647/sap-sd-satis-ve-dagitim-modulu-ile-satis-surecleri-kullanici-egitimi

## Kaynak kodu incelemesinde bulunan sorunlar

1. Önceki `SapFioriLaunchpad.tsx` içinde çok sayıda karo yalnızca **eski T-code yönlendirmesi** yapıyor; kimisi doğru adla veya hiç işleviyle eşleşmiyor (örn. BP karosu VA01'e, F110 benzeri karo F-53'e yönleniyordu). Bu ekran **eski karo görünümü** olarak saklandı, güncel ana Fiori deneyimi olarak sunulmuyor.
2. `App.tsx` başlangıcında Fiori görünümü açık olsa da işlemler yine klasik `SapGuiSimulator` formuna gönderiliyordu. Artık ayrı Fiori-first iş akışı ekranı varsayılan.
3. Klasik işlem kodu kısayolunda VL01N açıklaması PGI ile yanlış birleştirilmişti; teslimat oluşturma olarak düzeltildi.
4. Video paneli baştan açık gelerek uygulama pratiğini gölgeliyordu; artık kullanıcı isteğine bağlı açılıyor.
5. FI faturası için bazı yıl alanları 2025'e sabitlenmişti; yeni fatura kaydı artık mevcut yılın değerini kullanıyor.
6. Önceki projede `VA02`, `VL09`, `MIGO`, ileri pricing/ATP, kısmi teslimat gibi işlemler hâlâ tam çalışmıyor. Yeni Fiori arayüzü bunları tamamlanmış gibi göstermiyor.
7. Veri tabanı `localStorage` içinde. Kullanıcı/cihazlar arasında senkronize olmaz; birden fazla gerçek SAP çalışanı tarafından paylaşılan ERP yapısı değildir.

## Bu sürümde yapılan somut değişiklikler

- `src/components/FioriPracticeWorkspace.tsx` yeni eklendi: rol seçimi, Fiori benzeri uygulama alanı, belge listesi, müşteri ve malzemeyle sipariş oluşturma, siparişten teslimat oluşturma, ayrı PGI, teslimata bağlı F2 fatura ve mevcut BP/malzeme verilerini inceleme.
- Bu işlemler mevcut `sapPersistenceStore.ts` fonksiyonlarını çağırıyor. Yani ayrı sahte belge kayıtları veya rastgele ön yüz sonuçları oluşturmuyor.
- `src/App.tsx`: Fiori-first çalışma alanı varsayılan, eski karo görünümü bir bağlantıyla erişilebilir, klasik GUI yoluna dönüş korunuyor. Video varsayılan kapalı.
- `src/data/sapPersistenceStore.ts`: F2 muhasebe kaydı yıl alanı dinamik.
- Ekranda kaynaklı uygulama kimlikleri gösteriliyor. SAPUI5 ekranlarının birebir kopyası/sertifikalı SAP ürünü olduğunu iddia etmiyor.
- Ana ekranda dört basamaklı iş görevi ve tekrar önerisi var: sipariş → teslimat → PGI → fatura.

## Nasıl pratik yapılmalı?

1. Fiori ekranından F3893'e gir, OR siparişi oluştur, sipariş numarasını kaydet. Önce farklı müşteri seçiminin hangi satış alanını getirdiğini anlamaya çalış.
2. F0869A'ya geç, **aynı sipariş** için teslimat yarat. Bu aşamada malzeme stoğunun değişmediğini gözlemle.
3. F0867A ekranında PGI yap. Güncel stok ve malzeme hareketini kontrol et. Yetersiz stokla işlem deneyerek anlamlı hata al.
4. F0798'de sevk edilmiş teslimatı faturalandır. Aynı belgenin ikinci kez faturalanmasını dene; sistem reddetmeli.
5. Ertesi gün rehbersiz farklı müşteri ve malzemeyle tekrar et. 7 gün sonunda süre ve hata sayısını kıyasla.

Önerilen günlük plan: 10 dakika eski görevin tekrarı + 10 dakika ekrana giriş + 35–45 dakika yardımsız işlem + 10 dakika hata inceleme + 5 dakika özet. Bu bir eğitim hedefidir, başarı garantisi değildir.

## Gerçekçilik sınırları — açıkça tamamlanmamış özellikler

- Bu arayüz, SAP Fiori tasarım kavramlarını temel alır; **gerçek SAPUI5/Fiori Elements iş bileşenlerini veya birebir S/4HANA uygulamalarını çalıştırmaz**.
- Sipariş ve fatura için simplifikasyonlar var: otomatik fiyatlandırma, vergilendirme, partner determination, ATP ve hesap belirleme tam SAP modeli değildir.
- `Picking + PGI` tek kullanıcı eyleminde birleştirildi; eğitim akışındaki iki ayrı süreç adımı ve SAP rolü kavramsal olarak ayrılmış olsa da ayrı picking ekranı henüz yapılmadı.
- F3893'e karşılık gelen bütün SAP alanları, filter variantlar, mass actions vb. mevcut değil.
- BP ekranı görüntüleme ağırlıklı; ana veri yaratma ve değiştirme gerçek F3163 işlevlerinin sadece bir kısmı.
- Eski eğitim ekranlarındaki tüm hatalar bu iterasyonda yeniden doğrulanmadı. Bir sonraki kontrol: modül bazlı ekran kaynak matrisi ve gerçek SAP practice system üzerinde yan yana karşılaştırma.

## Test durumu

- `node tests/store-regression.cjs`: 18 regresyon kontrolü geçti (mevcut veri katmanı senaryoları).
- TypeScript `transpileModule` sözdizimi kontrolleri: değiştirilen 3 dosyada 0 teşhis.
- `tsc --noEmit` **BLOCKED**: `vite/client` tanımı eksik, bağımlılıklar kurulu değil. Tam tip kontrolü geçti denemez.
- `npm run build` ve tarayıcı E2E testleri **ÇALIŞTIRILAMADI**. Yeni Fiori ekranı henüz tarayıcıda otomatik tıklama testinden geçmedi.

## Bir sonraki geliştirme için öncelik

1. React bağımlılıklarını kurup Vite build ve Playwright E2E çalıştırma.
2. Picking için ayrı gerçekçi Fiori adımı ve bağımsız kayıt.
3. F3893 alanları ve filtre kaydetme, satış alanı, teslimat tarihi ve indirim koşulları.
4. Fiori rol yetkileri/iş kataloğu, Spaces & Pages yönlendirmesi ve gerçek adaptif masaüstü/mobil görünüm.
5. VA02/VL09/MIGO eksik iş mantığı; hata mesajları, geri alımlar, stok ve muhasebe ilişkileri.
6. SAP Learning Practice System ile görsel ve işlem doğrulama; SAP ECC vs S/4HANA ve on-premise vs Cloud karşılaştırma.
