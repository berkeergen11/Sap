# Bilgisenin 22 Derslik SAP SD–Fiori Serisi ↔ SAP Akademi ↔ SAP S/4HANA Cloud Public Edition 2608

**Durum: sınırlı doğrulama ve kısmi işlevsel iyileştirme; 22 videonun tamamı izlenmiş değildir.**

## Doğrulanabilen kaynak bilgisi
- Playlist: https://www.youtube.com/playlist?list=PLrJDJ1lSN-wNM8c5IJkUfgwMknEXaseMN
- Kanal: Bilgisenin. 2022'de yayımlanan video açıklamalarında **22 bölüm ve sıraları** yazıyor.
- #8 Listeleme ve Raporlama: https://www.youtube.com/watch?v=8tdXcR15ldc — video açıklaması başlıklar ve kısmi zaman damgaları sağlıyor.
- #22 Sevkiyat ve Nakliye Planlaması: https://www.youtube.com/watch?v=1pLUur4c00k — 22 bölümün tam indeksini listeliyor.
- Video sayfası tam transkript veya kare-kare ekran karşılaştırması sağlamadı. **Dersin içerisindeki buton/alanların yerini gördüğümüz iddia edilmemelidir.**
- SAP 2608 satış işlem alternatifleri: https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/3d3612b918354d6993bb20caddf7750d.html
- SAP 2608 satış süreçleri: https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/ca99f8b976864af2ab55d83280b8d014.html
- SAP 2608 teslimat yönetimi: https://help.sap.com/docs/SAP_S4HANA_CLOUD/aff0b3f5f46c42a2b2c0fabfc233bab2/68b5df080ed149698a4ad2ad03523a8c.html
- SAP 2608 faturalama: https://help.sap.com/docs/SAP_S4HANA_CLOUD/b51655f09e1144828aeafec20470b9c8/a95b52cecd6c47318754fe5d1f2430f1.html

## 22 konunun dürüst kapsam matrisi

| No | Ders başlığı (yayıncı açıklaması) | Bu sürümde | Gerçek SAP 2608 eşleşme sınırı |
|---|---|---|---|
| 1 | Fiori'ye giriş | Ana ekran/menü var | SAPUI5 ve Spaces & Pages tam değil |
| 2 | SAP SD nedir? | Siparişten faturaya zincir var | Kısmi iş kuralı |
| 3 | İşletme yapısı | Satış alanı ve plant veri alanları var | Tam organizasyon uyarlaması yok |
| 4 | Belge yapısı ve belge verileri | Sipariş/teslimat/fatura kayıtları var | Kalem/kopyalama denetimi kısmi |
| 5 | SD giriş ve belirleme mantığı | Basit kontrol var | Item category / partner determination eksik |
| 6 | Belgelerin birleştirme ve ayrıştırması | **Eksik** | Kısmi/seçimli teslimat yok |
| 7 | Belge ters kaydı ve değişiklik geçmişi | **Eksik** | VL09 ve değişiklik izi yok |
| 8 | Listeleme ve raporlama | Temel metin filtreli liste var | Çok kriterli rapor ve analitik eksik |
| 9 | SD giriş ve fiyatlandırma | Tek ürün baz fiyatı var | Pricing procedure/condition determination eksik |
| 10 | SD ve genişletilmiş kontroller | Temel alan validasyonu var | Blokajlar/yetki/credit kontrolü eksik |
| 11 | Uyarlama – satış siparişi | OR var | Kategori/termin satırı ve yapılandırma eksik |
| 12 | Uyarlama – teslimat | F0869A var | Due-list/çoklu seçim/log eksik |
| 13 | Uyarlama – faturalama | F0798/F2 var | Billing due list, copy control eksik |
| 14 | Kopyalama denetimi | Temel belge referansı var | Tam copy control eksik |
| 15 | ATP ve kullanılabilirlik | Stok görüntüleme/temel limit var | Gerçek ATP motoru eksik |
| 16 | Gelir hesabı belirleme | Eğitim muhasebe satırları var | Customizing esaslı account determination yok |
| 17 | Eksiklik kontrolü | Temel geçerlilik denetimi var | SAP incompletion log eşdeğeri yok |
| 18 | SD belgesindeki verileri kontrol etme | Temel akış ve referanslar var | Değişiklik geçmişi ve denetim kısmi |
| 19 | Bedelsiz ürün | **Eksik** | Free goods determination yok |
| 20 | Ürün ağacı (BOM) | **Eksik** | BOM explosion ve item category yok |
| 21 | Çıktı belirleme | **Eksik** | Output management eksik |
| 22 | Sevkiyat ve nakliye planlaması | Teslimat/picking/PGI var | Nakliye planı ve taşıma belgeleri eksik |

## Bu turda gerçek değişen dosyalar
- `src/data/sdFioriPlaylistCurriculum.ts`: Yayıncının açıkladığı 22 dersin kaynak bilgisi, özgün ders hedefleri ve dürüst kapsam işaretleri.
- `src/components/SdFioriLearningPath.tsx`: 22 ders listesi, ders kontrolü, sınırlamalar, playlist bağlantıları ve yeni belge kayıtlarıyla değerlendirilen uçtan uca uygulama sınavı.
- `src/components/FioriPracticeWorkspace.tsx`: Öğrenme yolu navigasyonu, 2608 hedef etiketi ve picking'in önce geldiği yeni görev açıklaması.
- `tests/playlist-curriculum.cjs`: Kaynak konu sayısı, sıralama, benzersizlik, söz dizimi ve kaynak bağlantısı kontrolleri.

**Uçtan uca değerlendirme mantığı:** Kullanıcı “Yeni deneme başlat” ile mevcut sipariş/teslimat/fatura kimliklerinin anlık görüntüsünü alır. Bu andan sonra ortaya çıkan bir siparişin aynı kaynaktan teslimatı, picking'i, PGI'si ve F2 faturası kontrol edilir. Önceki örnek belgeler puan kazandırmaz. Birden çok yeni sipariş varsa en ilerlemiş tutarlı zincir seçilir. Bu bir ERP simülasyon testidir; gerçek SAP sunucu/iş yetkisi testi değildir.

## Öncelikli kalan gerçek geliştirme borcu
1. F3893 gerçekçi liste filtreleme, çoklu kalem, değişiklik, durum ve fiyatlandırma.
2. F3163 BP create/edit ve F1602 ürün create/edit.
3. F0869A due-list, kısmi teslimat, F0868 kısmi picking, F0867A reversals.
4. F0798 billing due list, ödeme ve gerçekçi FI hesap belirleme.
5. Bölüm 6/7/9/14/15/16/19/20/21/22 için yapılandırılabilir iş kuralları.
6. SAP 2608 gerçek tenant ekran görüntüsü / ekran kaydıyla karşılaştırmalı doğrulama.
7. Tam `tsc`, Vite build ve tarayıcı E2E testleri; bu ortamda eksik proje bağımlılıkları nedeniyle çalıştırılamadı.

**Bu ZIP, playlistte anlatılan 22 işlemin hepsi tamamlandı anlamına gelmez.** Bu sürüm doğrulanmış playlist müfredatı + mevcut işlem motoruna bağlı gerçek kayıt kontrolünün ilk entegrasyonudur.
