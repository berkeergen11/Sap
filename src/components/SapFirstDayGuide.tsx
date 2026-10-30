/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { sapSound } from '../utils/audioEffects';
import {
  X,
  Compass,
  CheckCircle2,
  HelpCircle,
  Laptop,
  Globe,
  Layers,
  Terminal,
  ShieldCheck,
  Building2,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckSquare,
  Square,
  RotateCcw,
  Settings,
  Key,
  Printer,
  Database,
  Calendar,
  DollarSign,
  AlertTriangle,
  BookmarkCheck,
  Sliders,
  FileCheck2,
  Clock,
  Wifi,
  Network,
  Cpu,
  Check,
} from 'lucide-react';

interface SapFirstDayGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchTCode: (tCode: string) => void;
}

interface ChecklistItem {
  id: string;
  number: number;
  englishTitle: string;
  turkishTitle: string;
  shortDesc: string;
  category: 'Sistem & Profil' | 'Kullanıcı & Yetki' | 'Bölge & Çıktı' | 'Finans & Dönem' | 'Lojistik & Yapı';
  tCode: string;
  importance: 'Kritik' | 'Yüksek' | 'Gerekli';
  actionLabel: string;
  icon: 'settings' | 'user' | 'clock' | 'printer' | 'wifi' | 'calendar' | 'database' | 'building' | 'dollar' | 'alert';
  details: {
    why: string;
    howTo: string;
    proTip: string;
  };
}

const FIRST_DAY_CHECKLIST: ChecklistItem[] = [
  {
    id: 'task_profile_parameters',
    number: 1,
    englishTitle: 'Checking system profile parameters',
    turkishTitle: 'Sistem Profil Parametrelerinin Kontrolü (RZ10 / SU3)',
    shortDesc: 'Şirket Kodu (TR01), Üretim Yeri (1000/1010) ve oturum parametreleri (login/min_password_lng, rdisp/max_wprun_time) doğrulayın.',
    category: 'Sistem & Profil',
    tCode: 'SU01',
    importance: 'Kritik',
    actionLabel: 'SU01 / RZ10 Profil Parametrelerine Git',
    icon: 'settings',
    details: {
      why: 'Sistem profil parametreleri oturum kurallarını, bellek limitlerini ve arka plan işlem sürelerini belirler. Danışman kullanıcısında varsayılan parametre kimlikleri (PID: BUK, WRK, VKO) girilmezse her ekranda şirket kodunu baştan yazmak zorunda kalırsınız.',
      howTo: 'Sistem > Kullanıcı Profili > Kendi Verileriniz (SU3) veya RZ10 Sistem Profilleri ekranına gidin. "Parametreler" sekmesinde BUK (Şirket Kodu: TR01), WRK (Tesis: 1000) ve VKO (Satış Örgütü: 1000) parametrelerini tanımlayın.',
      proTip: 'Kullanıcı parametreleri doğru girildiğinde F4 yardım listesi otomatik olarak sizin şirket kodunuzla açılır ve günlük veri girişinde %40 hız kazandırır.',
    },
  },
  {
    id: 'task_user_master_data',
    number: 2,
    englishTitle: 'Verifying user master data',
    turkishTitle: 'Kullanıcı Ana Verisi ve Rol Yetkilerinin Doğrulanması (SU01 / SU53)',
    shortDesc: 'Kullanıcı rol atamalarını (SAP_BR_*), lisans tipini ve yetki hataları için SU53 analiz pratiğini teyit edin.',
    category: 'Kullanıcı & Yetki',
    tCode: 'SU01',
    importance: 'Kritik',
    actionLabel: 'Kullanıcı & Yetki Doğrulaması',
    icon: 'user',
    details: {
      why: 'Yeni başlayan danışmanların ilk gün en çok vakit kaybettiği konu eksik yetki nesneleridir. Eksik bir nesne bildirilmezse BASIS ekibi yetkilendirmeyi tamamlayamaz.',
      howTo: 'SU01 ile kullanıcı ana verinizdeki Rolleri (Roles) ve Profilleri (Profiles) kontrol edin. Yetki uyarısı aldığınız anda komut satırına "/nSU53" yazarak kırmızı renkle işaretlenen yetki nesnesini (Örn: M_BEST_WRK, V_VBAK_AAT) görüntüleyin.',
      proTip: 'SU53 ekran görüntüsünü proje liderinize veya BASIS ekibine gönderirken "Objekt", "Field" ve "Value" alanlarının net göründüğünden emin olun.',
    },
  },
  {
    id: 'task_local_timezone',
    number: 3,
    englishTitle: 'Configuring local time zone settings',
    turkishTitle: 'Yerel Saat Dilimi ve Tarih Formatı Ayarları (SU3 / STZBC)',
    shortDesc: 'Saat dilimini (Turkey UTC+3 / Europe/Istanbul), tarih formatını (DD.MM.YYYY) ve ondalık ayracını (1.234.567,89) ayarlayın.',
    category: 'Bölge & Çıktı',
    tCode: 'SU01',
    importance: 'Yüksek',
    actionLabel: 'Saat & Tarih Formatını Ayarla',
    icon: 'clock',
    details: {
      why: 'Sunucu Almanya (CET / UTC+1) saatinde çalışırken yerel saat diliminiz ayarlanmazsa, fatura kesim ve mal çıkış belgeleri yanlış saat damgası alır. Muhasebe ve e-Fatura kontrollerinde saat uyumsuzluğu cezaya sebep olabilir.',
      howTo: 'SU3 Sabit Değerler (Defaults) sekmesinde: Saat Dilimi (Time Zone) alanını "TURKEY" veya "UTC+3", Tarih Formatını "1 - GG.AA.YYYY", Ondalık Gösterimini "1.234.567,89" (virgül ondalık, nokta binlik) olarak seçin ve kaydedin.',
      proTip: 'Ondalık ayracın nokta yerine virgül olması Türkiye Tekdüzen Muhasebe ve Excel aktarımlarında formül bozulmalarını tamamen önler.',
    },
  },
  {
    id: 'task_printer_output_devices',
    number: 4,
    englishTitle: 'Setting initial printer output devices',
    turkishTitle: 'İlk Yazıcı ve Çıktı Aygıtı Tanımlamaları (SPAD / SU3 / SP01)',
    shortDesc: 'Çıktı aygıtı olarak LOCL (Yerel Yazıcı) belirleyin ve "Hemen Çıkar (Print Immediately)" bayrağını aktif edin.',
    category: 'Bölge & Çıktı',
    tCode: 'SU01',
    importance: 'Gerekli',
    actionLabel: 'Yazıcı & Spool Ayarlarını Yap',
    icon: 'printer',
    details: {
      why: 'Sipariş onayı, teslimat irsaliyesi veya fatura önizleme alırken varsayılan yazıcı tanımlı değilse sistem yazdırma isteğini askıya alır veya hata fırlatır.',
      howTo: 'SU3 > Sabit Değerler ekranında "Çıktı Aygıtı (Spool: Output Device)" kutusuna "LOCL" yazın. "Hemen Çıkış (Print Immediately)" ve "Yazdırıldıktan Sonra Sil" seçeneklerini işaretleyin.',
      proTip: 'Yazdırdığınız belgelerin kuyruktaki durumunu takip etmek, PDF olarak dışa aktarmak veya tekrar göndermek için /nSP01 Spool Yöneticisi ekranını kullanın.',
    },
  },
  {
    id: 'task_system_connectivity',
    number: 5,
    englishTitle: 'Testing system connectivity',
    turkishTitle: 'Sistem ve RFC Ağ Bağlantı Testleri (SM59 / PING)',
    shortDesc: 'Entegrasyon RFC hedeflerini (GİB e-Fatura, TCMB Kurlar, WMS depo servisi) ve ağ gecikmesini test edin.',
    category: 'Sistem & Profil',
    tCode: 'VA01',
    importance: 'Kritik',
    actionLabel: 'Bağlantı & Entegrasyon Kontrolü',
    icon: 'wifi',
    details: {
      why: 'Modern SAP S/4HANA sistemleri izole çalışmaz; GİB e-Fatura entegratörüne, banka servislerine ve el terminallerine bağlıdır. Bağlantı kopuksa ilk gün fatura veya irsaliye kuyruğu kilitlenir.',
      howTo: '/nSM59 işlem koduna gidin. "HTTP Bağlantıları" veya "ABAP Bağlantıları" altındaki harici servis hedefini seçip "Bağlantı Testi (Connection Test)" ve "Yetkilendirme Testi (Authorization Test)" butonlarına tıklayın.',
      proTip: 'Ping süresinin 50ms altında olması gerekir; yüksek gecikme Fiori Launchpad ekranlarında donma ve WebGUI oturum düşmelerine yol açar.',
    },
  },
  {
    id: 'task_posting_periods',
    number: 6,
    englishTitle: 'Checking posting periods and calendar settings',
    turkishTitle: 'Mali ve Malzeme Dönemlerinin Doğrulanması (OB52 / MMRV / SCAL)',
    shortDesc: 'Mali Yıl/Ay (FI OB52) ve Malzeme Döneminin (MM MMRV) açık olduğunu kontrol edin.',
    category: 'Finans & Dönem',
    tCode: 'FB60',
    importance: 'Kritik',
    actionLabel: 'Dönem & Muhasebe Kontrolü',
    icon: 'calendar',
    details: {
      why: 'Ay başlarında veya yeni test sistemlerinde dönem açılmamışsa, en basit malzeme girişi (MIGO) veya satış faturası (VF01) "Dönem kapalıdır" uyarısıyla reddedilir.',
      howTo: 'FI için /nOB52 ile şirket kodunuz (TR01) için cari mali ayın açık olduğunu teyit edin. MM için /nMMRV ile izin verilen dönemleri kontrol edin (Gerekirse MMPV ile kapatıp yeni döneme geçin).',
      proTip: 'Fabrika Takvimi için SCAL işlem kodundan resmi tatillerin ve cumartesi/pazar çalışma günlerinin doğru işaretlendiğini kontrol edin.',
    },
  },
  {
    id: 'task_transport_requests',
    number: 7,
    englishTitle: 'Creating and managing transport requests',
    turkishTitle: 'Taşıma Talebi (Transport Request - TR) Yönetimi (SE09 / SE10)',
    shortDesc: 'Uyarlamalarınız (Customizing) için adınıza TR açıldığını ve taşıma düzenini doğrulayın.',
    category: 'Sistem & Profil',
    tCode: 'SE11',
    importance: 'Yüksek',
    actionLabel: 'SE09 / SE11 Taşıma Yöneticisi',
    icon: 'database',
    details: {
      why: 'SPRO üzerinden yapılan her menü ayarı bir TR\'ye bağlanmak zorundadır. Adınıza TR tanımlı değilse sistem ayarlarınızı kaydetmenize izin vermez.',
      howTo: '/nSE09 Taşıma Yöneticisi ekranında "Customizing İsteği" oluşturun. Standart açıklama formatını uygulayın: "[MODÜL]_[İSİM]_[GÖREV_TANIMI]" (Örn: SD_BERKE_FIYATLANDIRMA).',
      proTip: 'Her bağımsız iş paketi için ayrı bir alt görev (Task) açın; böylece canlıya taşıma sırasında diğer danışmanların işleriyle çakışma yaşamazsınız.',
    },
  },
  {
    id: 'task_org_structures',
    number: 8,
    englishTitle: 'Reviewing enterprise organizational structures',
    turkishTitle: 'Şirket Kodu ve Organizasyon Yapısının İncelenmesi (EC01 / OX02)',
    shortDesc: 'Şirket Kodu (TR01), Satış Alanı (Satış Örgütü + Dağıtım Kanalı + Bölüm) ve Tesis eşleşmelerini haritalayın.',
    category: 'Lojistik & Yapı',
    tCode: 'VA01',
    importance: 'Yüksek',
    actionLabel: 'Satış & Sipariş Ekranında İncele',
    icon: 'building',
    details: {
      why: 'Sipariş (VA01) veya satınalma (ME21N) girerken sistem sizden hiyerarşik organizasyonel veriler ister. Yanlış kombinasyon seçilirse müşteri veya stok bulunamaz.',
      howTo: 'Uygulamamızdaki "Koordinat Haritası" veya EC01 üzerinden: Şirket Kodu (TR01) ➔ Satış Örgütü (1000) ➔ Dağıtım Kanalı (10) ➔ Bölüm (00) ➔ Tesis (1000 Gebze) ağacını inceleyin.',
      proTip: 'Müşteri ana verisini açarken hangi Satış Alanına ait olduğunu baştan bilmek faturalama tıkanıklıklarının %80\'ini engeller.',
    },
  },
  {
    id: 'task_exchange_rate_feeds',
    number: 9,
    englishTitle: 'Verifying exchange rate feeds and tables',
    turkishTitle: 'Günlük Döviz Kurlarının Teyidi (OB08 / TCURR)',
    shortDesc: 'USD/EUR/TRY TCMB kurlarının cari tarihle sistemde girilmiş olduğunu teyit edin.',
    category: 'Finans & Dönem',
    tCode: 'FB50',
    importance: 'Yüksek',
    actionLabel: 'OB08 Kur Tablosuna Git',
    icon: 'dollar',
    details: {
      why: 'Dövizli satışlarda veya ithalat satıcı faturalarında o günün tarihiyle kur girilmemişse sistem "Döviz kuru bulunamadı" uyarısıyla işlemi durdurur.',
      howTo: '/nOB08 işlem koduna gidin. "M" (Banka Alış/Satış) kur tipinde bugünün tarihiyle USD ve EUR kurunun sisteme işlendiğini kontrol edin.',
      proTip: 'Kurumsal sistemlerde bu işlem her sabah saat 15:30\'da TCMB servisinden otomatik çekilir; ilk gün bu otomatik job\'ın çalıştığını teyit edin.',
    },
  },
  {
    id: 'task_runtime_dumps',
    number: 10,
    englishTitle: 'Monitoring runtime dumps and system logs',
    turkishTitle: 'Sistem Dump ve Hata Günlüklerinin İzlenmesi (ST22 / SM21 / SM12)',
    shortDesc: 'Sistemde beklenmeyen çökme olursa ST22 ile çalışma zamanı ABAP dump analizini okuyun.',
    category: 'Kullanıcı & Yetki',
    tCode: 'ST22',
    importance: 'Gerekli',
    actionLabel: 'ST22 Dump Analizini Aç',
    icon: 'alert',
    details: {
      why: 'Bir işlem yaparken aniden kırmızı "ABAP Runtime Error" ekranı çıkarsa paniğe kapılmayın. ST22 hatanın koddan mı, eksik veriden mi kaynaklandığını satır satır söyler.',
      howTo: 'Komut satırına "/nST22" yazın. "Today\'s Dumps (Bugünkü Çökmeler)" listesine çift tıklayın. "What happened" ve "Error analysis" başlıklarını inceleyin.',
      proTip: 'ABAP ekibine hata bildirirken "Sistem çöktü" demek yerine ST22\'deki Hata Anahtarını (Örn: `TIME_OUT` veya `OBJECTS_OBJREF_NOT_ASSIGNED`) iletin.',
    },
  },
];

export const SapFirstDayGuide: React.FC<SapFirstDayGuideProps> = ({
  isOpen,
  onClose,
  onLaunchTCode,
}) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'overview'>('checklist');
  const [activeTopic, setActiveTopic] = useState<number>(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Checkbox persistent state via localStorage
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sap_first_day_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const newState = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem('sap_first_day_checklist', JSON.stringify(newState));
      } catch {
        // ignore
      }
      if (!prev[taskId]) {
        sapSound.playSuccess();
      } else {
        sapSound.playClick();
      }
      return newState;
    });
  };

  const handleResetChecklist = () => {
    sapSound.playClick();
    setCompletedTasks({});
    try {
      localStorage.removeItem('sap_first_day_checklist');
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  const topics = [
    {
      id: 'browser_vs_desktop',
      title: '1. Tarayıcı mı Masaüstü Programı mı Açacaksınız?',
      icon: <Globe className="w-4 h-4 text-sky-400" />,
      badge: 'Giriş Yöntemi',
      summary: 'Yeni bir kurumsal şirkette işe başladığınızda bilgisayarınızda karşılaşacağınız ilk senaryo.',
      content: [
        {
          heading: 'Modern Şirketler (S/4HANA Cloud / RISE with SAP):',
          text: 'Bilgisayarınıza hiçbir program kurmazsınız! IT departmanı size bir web bağlantısı verir (Örn: https://sirketiniz.s4hana.cloud.sap/fiori). Chrome, Edge veya Safari tarayıcınızdan şirket kullanıcı adınız ve şifrenizle giriş yaparsınız. Karşınıza bu uygulamamızdaki Fiori Başlangıç Sayfası (Launchpad) çıkar.',
        },
        {
          heading: 'Masaüstü Kullanan Şirketler (SAP GUI for Windows 8.00):',
          text: 'Bazı köklü sanayi kuruluşları masaüstünde "SAP Logon" ikonunu kullanmaya devam eder. Orada şirket sunucusu (PRD / QAS / DEV) seçilir ve gri/bej renkli klasik SAP Easy Access Ağaç Menüsü açılır.',
        },
        {
          heading: 'Bu Uygulamada:',
          text: 'Uygulamamız her iki dünyayı da tam olarak simüle eder: Varsayılan olarak modern web tarayıcısındaki Fiori Launchpad ile başlarsınız; istediğiniz an sağ üstten veya komut kutusundan (/n) klasik masaüstü ağaç menüsüne geçebilirsiniz.',
        },
      ],
      quickAction: { label: 'Fiori Başlangıç Sayfasını Gör', tCode: 'VA01' },
    },
    {
      id: 'business_roles',
      title: '2. Ekranda Hangi Kutucuklar Görünecek? (İş Rolleri)',
      icon: <Users className="w-4 h-4 text-emerald-400" />,
      badge: 'Yetkilendirme',
      summary: 'SAP\'de herkes her şeyi görmez; ekrandaki kutucuklar şirketteki unvanınıza ve rolünüze göredir.',
      content: [
        {
          heading: 'İş Rolleri (SAP Business Roles - SAP_BR_*):',
          text: 'Şirkette Satış Yöneticisi iseniz (SAP_BR_INTERNAL_SALES_REP) karşınıza sadece Satış Siparişleri (VA01/VA02/VA03), Teslimat (VL01N) ve Müşteri Raporları (VA05) kutucukları çıkar. Muhasebe ve üretim kutucukları kalabalık yapmasın diye gizlenir.',
        },
        {
          heading: 'Depo & Lojistik Sorumlusu İseniz (SAP_BR_SHIPPING_SPECIALIST):',
          text: 'Önünüze Teslimat Çıkarma (VL01N), Depo Çekme (VL02N Picking), Mal Çıkışını Kaydetme (PGI) ve Mal Kabul (MIGO) kutucukları gelir.',
        },
        {
          heading: 'Finans Müdürü İseniz (SAP_BR_GL_ACCOUNTANT):',
          text: 'Yevmiye Kaydı (FB50), Satıcı Faturası (FB60), Ödeme Programı (F110) ve Bilanço/Mizan kutucukları gelir.',
        },
        {
          heading: 'Bu Uygulamada Neden Hepsi Var?',
          text: 'Siz "hepsi" seçeneğini talep ettiğiniz için sistemde "Süper Kullanıcı / Proje Yöneticisi" rolü aktiftir. Üst sekmelerden (SD, MM, FI, PP, QM, PM, HCM, BASIS) tüm departmanların kutucuklarını özgürce gezebilirsiniz.',
        },
      ],
      quickAction: { label: 'Satış & Teslimat Ekranını Aç (VL01N)', tCode: 'VL01N' },
    },
    {
      id: 'fiori_vs_webgui',
      title: '3. Kutucuğa Tıkladığımda Ne Açılacak? (Fiori vs WebGUI)',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      badge: 'Ekran Tipi',
      summary: 'Neden bazı ekranlar modern web sayfası, bazıları ise videodaki gibi gri/beyaz Belize işlem ekranıdır?',
      content: [
        {
          heading: 'İki Ayrı Ekran Teknolojisi Birlikte Çalışır:',
          text: 'SAP, 30 yıllık devasa ERP süreçlerini modernize ederken iki katman kullanır:',
        },
        {
          heading: 'A. Fiori Web Uygulamaları (Fiori Elements):',
          text: 'Filtreleme, arama, KPI kartları ve analitikler için kullanılan modern, esnek web arayüzleridir (Örn: "Satış siparişlerini listele", "Sorunları analiz et").',
        },
        {
          heading: 'B. SAP GUI for HTML (WebGUI - Videodaki Ekranlar):',
          text: 'Fiziki sipariş girişi (VA01), depoda çekme ve mal çıkışı (VL01N/VL02N) veya fatura kesimi (VF01) gibi kritik işlemlerde, arka plandaki güçlü SAP çekirdeği doğrudan tarayıcı içinde WebGUI (Belize/Horizon teması) olarak açılır. Üstteki komut çubuğu ve alttaki yeşil onay toast mesajı bu yüzden birebir mevcuttur!',
        },
      ],
      quickAction: { label: 'WebGUI Fatura Ekranını Gör (VF01)', tCode: 'VF01' },
    },
    {
      id: 'tcodes_still_used',
      title: '4. T-Code (İşlem Kodu) Ezberlemek Zorunda mıyım?',
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      badge: 'İpuçları',
      summary: 'Modern SAP\'de VA01, MIGO, FB60 gibi kodlar bitti mi yoksa hala yaşıyor mu?',
      content: [
        {
          heading: 'T-Code\'lar Asla Bitmez!',
          text: 'Deneyimli SAP uzmanları, danışmanlar ve operasyon sorumluları kutucuk aramakla vakit kaybetmez. Fiori Launchpad\'in arama kutusuna veya WebGUI komut satırına doğrudan "/nVA01" veya "/nVL01N" yazarak 1 saniyede ekrana ulaşırlar.',
        },
        {
          heading: 'Yeni Başlayanlar İçin Kolaylık:',
          text: 'Yeni başlayanlar için Fiori kutucuklarının üzerinde Türkçe açıklamalar ("Satış siparişleri oluştur", "Teslimat oluştur") yazar. Uygulamamızda her iki yöntemi de kullanabilirsiniz: İster kutucuğa tıklayın, ister komut kutusuna /n... yazın!',
        },
      ],
      quickAction: { label: 'Hızlı T-Code Fırlatıcıyı Kullan', tCode: 'VA01' },
    },
    {
      id: 'real_company_vs_ides',
      title: '5. Videodaki IDES ile Canlı Şirket Farkı Nedir?',
      icon: <Building2 className="w-4 h-4 text-rose-400" />,
      badge: 'Gerçek Dünya',
      summary: 'Videoda 1010 ve TR1923 görünüyor; benim şirketimde ne olacak?',
      content: [
        {
          heading: 'IDES (Eğitim Sistemi):',
          text: 'Videodaki "ides.consolut.com" sistemi SAP\'nin global eğitim veritabanıdır. Orada fabrika 1010, müşteri TR1923 (Köln Türkiye Şubesi), ürün "Melone Tee" olarak tanımlanmıştır.',
        },
        {
          heading: 'Gerçek Şirket Sistemi (Canlı PRD):',
          text: 'Türkiye\'de bir şirkette işe başladığınızda Şirket Kodu "TR01", Tesis/Depo "1000 Gebze", Müşterileriniz ise Koçak Lojistik, Borusan vb. gerçek firmalar olacaktır. Vergiler de Türkiye KDV %20 ve GİB e-Fatura/e-İrsaliye profilleriyle çalışacaktır.',
        },
        {
          heading: 'Uygulamamızın Benzersizliği:',
          text: 'Sistemimiz hem videodaki IDES verilerini (1010, TR1923, Melone Tee) hem de Türkiye kurumsal TR01 verilerini (Koçak Lojistik, %20 KDV, e-İrsaliye) birlikte destekler. Böylece hem videodaki adımları birebir takip edebilir hem de gerçek şirket tecrübesi kazanırsınız.',
        },
      ],
      quickAction: { label: 'TR01 Mal Kabulünü İncele (MIGO)', tCode: 'MIGO' },
    },
  ];

  const currentTopic = topics[activeTopic];

  // Checklist Calculations
  const totalTasks = FIRST_DAY_CHECKLIST.length;
  const completedCount = FIRST_DAY_CHECKLIST.filter((t) => completedTasks[t.id]).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const filteredChecklist = FIRST_DAY_CHECKLIST.filter((task) => {
    if (categoryFilter === 'all') return true;
    return task.category === categoryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Yeni SAP S/4HANA'da İlk Günüm Rehberi</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  Danışman Oryantasyonu
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                10 kritik ilk gün danışman kontrol adımı ve S/4HANA kurumsal sistem oryantasyonu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Tab Switcher: Check-list vs Overview */}
        <div className="bg-slate-950/80 px-5 sm:px-6 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => {
                setActiveTab('checklist');
                sapSound.playTab();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'checklist'
                  ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Check-list (10 Kritik Görev)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                {completedCount}/{totalTasks}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('overview');
                sapSound.playTab();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'overview'
                  ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>S/4HANA Ekranları & Merak Edilenler</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 font-mono">
                5 Soru
              </span>
            </button>
          </div>

          {activeTab === 'checklist' && (
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
              <span>İlerleme: %{progressPercent}</span>
              <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tab 1: Check-list Pane */}
        {activeTab === 'checklist' && (
          <div className="flex-1 overflow-hidden flex flex-col bg-slate-900/90">
            {/* Filter & Progress Header Strip */}
            <div className="p-3.5 sm:px-6 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Kategori:
                </span>
                {[
                  { id: 'all', label: 'Tümü (10)' },
                  { id: 'Sistem & Profil', label: 'Sistem & Profil' },
                  { id: 'Kullanıcı & Yetki', label: 'Kullanıcı & Yetki' },
                  { id: 'Bölge & Çıktı', label: 'Bölge & Çıktı' },
                  { id: 'Finans & Dönem', label: 'Finans & Dönem' },
                  { id: 'Lojistik & Yapı', label: 'Lojistik & Yapı' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setCategoryFilter(f.id);
                      sapSound.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                      categoryFilter === f.id
                        ? 'bg-sky-500 text-white font-bold'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleResetChecklist}
                  className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900 rounded-md transition-colors flex items-center gap-1"
                  title="Tüm işaretleri sıfırla"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Sıfırla</span>
                </button>
              </div>
            </div>

            {/* Checklist Items Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
              {filteredChecklist.map((task) => {
                const isChecked = !!completedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    className={`rounded-xl border transition-all p-4 ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Interactive Completion Toggle Button */}
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                          isChecked
                            ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 shadow-md shadow-emerald-500/20 scale-105'
                            : 'border-2 border-slate-600 hover:border-sky-400 text-transparent hover:text-slate-400 bg-slate-900/60'
                        }`}
                        title={isChecked ? 'Görevi tamamlanmadı yap' : 'Görevi tamamlandı olarak işaretle'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      {/* Task Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                              #{task.number}
                            </span>
                            <div className="flex flex-col">
                              <h4
                                onClick={() => toggleTask(task.id)}
                                className={`text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                                  isChecked ? 'text-emerald-300 line-through' : 'text-white hover:text-sky-300'
                                }`}
                              >
                                {task.englishTitle}
                              </h4>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {task.turkishTitle}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Completion Status Pill */}
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors flex items-center gap-1 ${
                                isChecked
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                              <span>{isChecked ? 'Tamamlandı' : 'Bekliyor'}</span>
                            </button>

                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {task.category}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                task.importance === 'Kritik'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : task.importance === 'Yüksek'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-sky-950 text-sky-300 border border-sky-800'
                              }`}
                            >
                              {task.importance}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {task.shortDesc}
                        </p>

                        {/* Detailed Guidance Cards: Why, HowTo, ProTip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-[11px]">
                          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                            <div className="font-bold text-amber-400 mb-1 flex items-center gap-1">
                              <span>❓ Neden Yapılır?</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                              {task.details.why}
                            </p>
                          </div>

                          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                            <div className="font-bold text-sky-400 mb-1 flex items-center gap-1">
                              <span>🛠️ Nasıl Yapılır?</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                              {task.details.howTo}
                            </p>
                          </div>

                          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                            <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                              <span>💡 Danışman Püf Noktası:</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                              {task.details.proTip}
                            </p>
                          </div>
                        </div>

                        {/* Direct simulator launch action */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-mono text-slate-500">
                            İşlem Kodu: <strong className="text-sky-400 font-bold">/{task.tCode}</strong>
                          </span>
                          <button
                            onClick={() => {
                              sapSound.playEnter();
                              onClose();
                              onLaunchTCode(task.tCode);
                            }}
                            className="text-xs font-semibold text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 transition-all"
                          >
                            <span>{task.actionLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checklist Footer Summary */}
            <div className="p-3.5 px-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">
                  Durum: <strong className="text-white">{completedCount}</strong> / {totalTasks} görev tamamlandı ({progressPercent}%)
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Tüm kontroller tarayıcınızın hafızasında otomatik kaydedilir.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Overview / Q&A Layout */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
            {/* Left Navigation Topics */}
            <div className="md:col-span-4 bg-slate-950/60 border-r border-slate-800 p-3 space-y-1.5 overflow-y-auto">
              <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Merak Edilen Sorular
              </div>
              {topics.map((t, idx) => {
                const isSelected = activeTopic === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      sapSound.playClick();
                      setActiveTopic(idx);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 ${
                      isSelected
                        ? 'bg-sky-950/80 border-sky-500/80 ring-1 ring-sky-500/50 shadow-md'
                        : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">{t.icon}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white truncate">
                          {t.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {t.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Topic Reading Pane */}
            <div className="md:col-span-8 p-5 sm:p-6 overflow-y-auto bg-slate-900/90 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    {currentTopic.badge}
                  </span>
                  <span className="text-xs text-slate-400">· Bölüm {activeTopic + 1} / {topics.length}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {currentTopic.title}
                </h3>

                <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                  {currentTopic.content.map((sec, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                      <h4 className="font-bold text-sky-300 text-xs">
                        {sec.heading}
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-[11.5px]">
                        {sec.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Action Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Bu adımı canlı simülatörde hemen test etmek için:
                </span>
                <button
                  onClick={() => {
                    sapSound.playEnter();
                    onClose();
                    onLaunchTCode(currentTopic.quickAction.tCode);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
                >
                  <span>{currentTopic.quickAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
