# SAP Akademi Türkiye — Pratik Odaklı Derin Denetim

Tarih: 7 Kasım 2026
Kaynak: Kullanıcının `Sap-main(1).zip` dosyasındaki 99 girişli proje ve önceki koruyucu düzeltme paketi.

## Kesin hüküm
Bu proje gerçek SAP sunucusu değil, tek tarayıcıda çalışan bir React/TypeScript öğretici simülasyondur. 57 işlem kodunun listelenmesi onların tamamının uygulanmış veya test edilmiş olduğunu göstermez. Şu anda en güvenilir uygulama omurgası, kaynak kodda koruyucu doğrulamalar eklenmiş VA01 → VL01N → VL02N → VF01 zinciridir. MIGO, VA02, VL09 hâlâ tam işlemsel eğitim için hazır değildir.

## Öğrenme açısından tespitler
- `FastTrackMasterclassModal.tsx`: dört aşamalı özet hızlı bir zihinsel model sağlar ancak tek başına işlem yapma becerisini ölçmez. "3 dakikada öğren" etiketi pazarlama dili; yeterlik kanıtı değildir.
- `guidedMissionData.ts`: VA01 için `ZOR` Türkiye'nin standart sipariş türüymüş gibi yazılmıştır (yanlış; Z ile başlayan türler şirket özelidir). E-fatura/GİB bağlantısı yanlış biçimde otomatik varsayılmıştır. VL01N akışında PGI adımı yanlış konumlandırılmıştır. Bunlar revize edildi.
- `quizData.ts`: VL01N altında PGI gerçekleştirmeyi soran soru, teslimat oluşturma ile mal çıkışını karıştırmaktadır; işlem VL02N yönüne düzeltildi. Belge akışı F5 kısayolu kesin gerçek olarak sunulmak yerine işlem/toolbar üzerinden öğretilir.
- `SapGuiSimulator.tsx`: rehberli adımlar alanları vurgular ama gerçek iş sonucunu değerlendirecek merkezi rubrik sınırlıdır.
- `sapPersistenceStore.ts`: kalıcı veriler localStorage içindedir; gerçek veritabanı ya da SAP entegrasyonu değildir. Mevcut MIGO ve kimi ters kayıt işlemleri bloke; otomatik test sonuçları buna göre okunmalıdır.
- `QuizLab.tsx`: çoğunlukla çoktan seçmeli soru yapısı vardır; ezberle doğru yanıt vermek belge yaratmayı bildiğini kanıtlamaz.
- `VideoPlayerPanel.tsx`: video zaman damgası düzeltmesi vardır ancak her videonun her sahnesinin gerçek SAP S/4HANA ile eşleştiği canlı doğrulanmadı.

## Bu sürüme eklenen pratik paneli
`src/components/PracticeLearningCenter.tsx` eklendi ve `src/App.tsx` içinden “PRATİK YAP / 7 GÜN” düğmesiyle açılıyor.
- 7 günlük günlük görev planı (öz bildirimle işaretlenen eğitim günleri; sertifikasyon değildir).
- VA01 / VL01N / VL02N / VF01 belge temelli uygulama sınavı.
- Başlangıç anında mevcut kayıtların numaraları tutulur; uygulama başlamadan önceki tohum veriler başarı sayılmaz.
- Yeni bir satış siparişi, aynı siparişe bağlı yeni teslimat, PGI ve 601 malzeme hareketi, ardından F2 fatura ve FI belge bağlantısı kontrol edilir.
- Yardımlı ve yardımsız deneme; yalnızca belge ve durum kaydıyla doğrulanan adımlar yeşile döner.
- Öğrenme kaydı localStorage ile korunur. Bu yine de tarayıcıya bağlıdır, merkezi LMS/veritabanı değildir.

## Hızlı öğrenme yöntemi
Her oturum için önerilen tasarım:
1. 5–10 dk konunun ne işe yaradığını anlama (ön test)
2. 10 dk demonstrasyon / ekran alanlarını keşif
3. 30–45 dk iş senaryosunu kendin gerçekleştirme
4. 10 dk hata analizi (neden yanlış yaptım?)
5. 5 dk not ve ertesi gün için yeni görevi hazırlama
6. Ertesi gün aynı akışı farklı müşteri/malzeme ile ve yardım kapalı tekrar etme

Günler:
1 GUI/BP/MM03, 2 VA01/VA03, 3 VL01N/VL02N, 4 VF01/VF03, 5 ME21N/MIGO/MMBE/MIRO (kısıtlı görsel inceleme), 6 ihracat/Incoterms/döviz/proforma, 7 yardım kapalı tekrar.

## Eğitimde başarı ölçütleri
1. Öğrenci doğru işlem koduna açıklama olmadan girebiliyor.
2. Satış organizasyonu, müşteri, malzeme, miktar, depo ve para birimini doğru seçebiliyor.
3. Belge kaydedilince numarasını kopyalamadan not edebiliyor ve VA03 ile sorgulayabiliyor.
4. Satış siparişi, teslimat ve PGI arasındaki veri ve stok farkını açıklayabiliyor.
5. Yanlış referanslı teslimat veya fatura girişini fark edip düzeltebiliyor.
6. F2 ile F5/F8 proformanın FI etkisini ayırabiliyor.
7. Yeni senaryoyu yardımsız, tekrar ölçümünde yapabiliyor.

## Dış doğrulama
- SAP Learning, Executing Sales Order Management: https://learning.sap.com/courses/executing-basic-erp-processes-with-sap-s-4hana/executing-sales-order-management
- SAP Learning, Executing the Shipping Process: https://learning.sap.com/courses/exploring-sap-s-4hana-sales-essentials/executing-the-shipping-process_e796d891-1485-4b97-874b-f4cbcbd9dbc9
- SAP Learning, Managing Sales Orders: https://learning.sap.com/courses/cost-object-controlling-in-sap-s-4hana/managing-sales-orders
- SAP Learning, Practice Systems Support: https://learning.sap.com/helpcenter/learninghub-subscription/practice-systems

## Test sınırları
- Var olan store regresyon testleri: 18/18 PASS.
- Bu sürümdeki beş değiştirilen/eklenen TSX/TS dosyası: TypeScript transpile/sözdizimi kontrolünde 0 hata.
- Tam `npm install`, Vite build, React tarayıcı E2E: çalıştırılamadı; bu nedenle bu testler PASS değildir.
- Yeni panelin veritabanı doğrulaması sadece bu simülatörün yerel belge kayıtlarını okur. Gerçek SAP görev yetkinliğini veya canlı sistem uygunluğunu otomatik doğrulamaz.

## İleriki önemli geliştirmeler
Öncelik 1: Yeni panel için Playwright E2E, kalıcı görev geçmişi ve adım bazlı yardım logları.
Öncelik 2: VA02 değişiklik, VL09 602 geri alma, gerçek PO + MIGO 101 + MIRO eşleştirme.
Öncelik 3: ATP, kısmi sevkiyat ve faturalar, pricing/tax koşulları, FI hesap belirleme.
Öncelik 4: İhracat için Incoterms 2020, sipariş bazlı F5/teslimat bazlı F8, uygun FI etkisi, yurt dışı KDV senaryo farkları.
Öncelik 5: Gerçek SAP Learning Practice System ile ekran karşılaştırması ve telif/lisans uygunluğu.
