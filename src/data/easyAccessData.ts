/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EasyAccessNode } from '../types/sap';

export const SAP_EASY_ACCESS_TREE: EasyAccessNode[] = [
  {
    id: 'favorites',
    label: 'Favorilerim (Sık Kullanılan Türkiye Süreçleri)',
    isFolder: true,
    children: [
      {
        id: 'fav_va01',
        label: 'VA01 - Satış Siparişi Yarat (Standart ZOR)',
        tCode: 'VA01',
        module: 'SD',
        turkeyTag: 'e-Fatura Entegre',
        fioriTile: {
          subtitle: 'Müşteri Satış Siparişi Girişi',
          kpi: 'ZOR 1000/10/00',
        },
      },
      {
        id: 'fav_vl01n',
        label: 'VL01N - Giden Teslimat & Mal Çıkışı (PGI)',
        tCode: 'VL01N',
        module: 'SD',
        turkeyTag: 'e-İrsaliye Tetikler',
        fioriTile: {
          subtitle: 'Depo Toplama & Çıkış',
          kpi: 'Rampa 1000',
        },
      },
      {
        id: 'fav_vf01',
        label: 'VF01 - Fatura Belgesi Kes & GİB Gönder',
        tCode: 'VF01',
        module: 'SD',
        turkeyTag: 'Ticari / Temel Fatura',
        fioriTile: {
          subtitle: 'Müşteri Fatura Kesimi',
          kpi: 'KDV %20',
        },
      },
      {
        id: 'fav_migo',
        label: 'MIGO - Mal Kabulü (Depo Girişi - 101)',
        tCode: 'MIGO',
        module: 'MM',
        turkeyTag: 'Kalem Tamam Kuralı',
        fioriTile: {
          subtitle: 'Depoya Mal Alma & Sayım',
          kpi: 'A01 / R01',
        },
      },
      {
        id: 'fav_fb50',
        label: 'FB50 - Genel Muhasebe Mahsup Fişi (TDHP)',
        tCode: 'FB50',
        module: 'FICO',
        turkeyTag: 'Bakiye Trafik Lambası',
        fioriTile: {
          subtitle: 'Defterikebir Yevmiye Fişi',
          kpi: 'TR01 0,00 TL',
        },
      },
    ],
  },
  {
    id: 'sap_menu',
    label: 'SAP Menüsü (Kurumsal Hiyerarşi)',
    isFolder: true,
    children: [
      {
        id: 'logistics',
        label: 'Lojistik (Logistics)',
        isFolder: true,
        children: [
          {
            id: 'sd_folder',
            label: 'Satış ve Dağıtım (Sales & Distribution - SD)',
            isFolder: true,
            module: 'SD',
            children: [
              {
                id: 'sd_master',
                label: 'Ana Veriler (Master Data)',
                isFolder: true,
                children: [
                  {
                    id: 'vk11_node',
                    label: 'VK11 - Fiyat Koşul Kaydı Yarat (PR00, K007, MWST)',
                    tCode: 'VK11',
                    module: 'SD',
                    turkeyTag: 'Fiyat Koşul Tekniği',
                    fioriTile: { subtitle: 'Satış Fiyatlandırma Matrisi', kpi: 'VK11 Fiyat' },
                  },
                ],
              },
              {
                id: 'sd_sales',
                label: 'Satış (Sales)',
                isFolder: true,
                children: [
                  {
                    id: 'sd_order',
                    label: 'Sipariş (Order)',
                    isFolder: true,
                    children: [
                      {
                        id: 'va01_node',
                        label: 'VA01 - Yarat (Sipariş Girişi - Standart ZOR)',
                        tCode: 'VA01',
                        module: 'SD',
                        turkeyTag: 'ZOR Sipariş',
                        fioriTile: { subtitle: 'Satış Siparişi Oluştur', kpi: 'Yeni Kayıt' },
                      },
                      {
                        id: 'va02_node',
                        label: 'VA02 - Değiştir (Sipariş Güncelleme)',
                        tCode: 'VA02',
                        module: 'SD',
                        turkeyTag: 'Kalem Revizyon',
                        fioriTile: { subtitle: 'Sipariş Kalem Değişikliği', kpi: 'Güncelle' },
                      },
                      {
                        id: 'va03_node',
                        label: 'VA03 - Görüntüle (Belge Akışı F5)',
                        tCode: 'VA03',
                        module: 'SD',
                        turkeyTag: 'Zincir Şeması',
                        fioriTile: { subtitle: 'Sipariş & Belge Akışı', kpi: 'F5 Akış' },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'sd_shipping',
                label: 'Sevkiyat ve Nakliye (Shipping)',
                isFolder: true,
                children: [
                  {
                    id: 'sd_delivery',
                    label: 'Giden Teslimat (Outbound Delivery)',
                    isFolder: true,
                    children: [
                      {
                        id: 'vl01n_node',
                        label: 'VL01N - Sipariş Referansıyla Yarat (PGI)',
                        tCode: 'VL01N',
                        module: 'SD',
                        turkeyTag: 'e-İrsaliye',
                        fioriTile: { subtitle: 'Giden Teslimat & Mal Çıkışı', kpi: 'PGI' },
                      },
                    ],
                  },
                ],
              },
              {
                id: 'sd_billing',
                label: 'Faturalama (Billing)',
                isFolder: true,
                children: [
                  {
                    id: 'vf01_node',
                    label: 'VF01 - Fatura Belgesi Yarat (GİB e-Fatura)',
                    tCode: 'VF01',
                    module: 'SD',
                    turkeyTag: 'GİB e-Fatura',
                    fioriTile: { subtitle: 'Faturalama & Muhasebe', kpi: 'e-Dönüşüm' },
                  },
                  {
                    id: 'vf03_node',
                    label: 'VF03 - Fatura Görüntüle & Muhasebe Belgesi',
                    tCode: 'VF03',
                    module: 'SD',
                    turkeyTag: '120/600 Entegrasyonu',
                    fioriTile: { subtitle: 'Kesilen Fatura Detayı', kpi: 'Görüntüle' },
                  },
                ],
              },
            ],
          },
          {
            id: 'mm_folder',
            label: 'Malzeme Yönetimi (Materials Management - MM)',
            isFolder: true,
            module: 'MM',
            children: [
              {
                id: 'mm_master',
                label: 'Malzeme Ana Verisi (Material Master)',
                isFolder: true,
                children: [
                  {
                    id: 'mm01_node',
                    label: 'MM01 - Malzeme Yarat (ROH/FERT/HALB)',
                    tCode: 'MM01',
                    module: 'MM',
                    fioriTile: { subtitle: 'Malzeme Kartı Açılışı', kpi: 'Ana Veri' },
                  },
                  {
                    id: 'mm03_node',
                    label: 'MM03 - Malzeme Görüntüle (Görünüm Seçimi)',
                    tCode: 'MM03',
                    module: 'MM',
                    fioriTile: { subtitle: 'Malzeme Görünüm İnceleme', kpi: 'Görüntüle' },
                  },
                ],
              },
              {
                id: 'mm_purchasing',
                label: 'Satın Alma (Purchasing)',
                isFolder: true,
                children: [
                  {
                    id: 'me21n_node',
                    label: 'ME21N - Satın Alma Siparişi Yarat (SAS)',
                    tCode: 'ME21N',
                    module: 'MM',
                    turkeyTag: 'Tedarik Emri',
                    fioriTile: { subtitle: 'Satın Alma Emri', kpi: 'Tedarik' },
                  },
                  {
                    id: 'me51n_node',
                    label: 'ME51N - Satın Alma Talebi Yarat (SAT/PR)',
                    tCode: 'ME51N',
                    module: 'MM',
                    turkeyTag: 'Talep Onayı',
                    fioriTile: { subtitle: 'Departman Satınalma Talebi', kpi: 'Talep' },
                  },
                ],
              },
              {
                id: 'mm_inv_mgmt',
                label: 'Stok Yönetimi (Inventory Management)',
                isFolder: true,
                children: [
                  {
                    id: 'migo_node',
                    label: 'MIGO - Mal Hareketi (Mal Kabulü 101)',
                    tCode: 'MIGO',
                    module: 'MM',
                    turkeyTag: 'Kalem Tamam!',
                    fioriTile: { subtitle: 'Depo Mal Kabulü', kpi: '101 Stok' },
                  },
                  {
                    id: 'mb52_node',
                    label: 'MB52 - Depo Yeri Stok Raporu',
                    tCode: 'MB52',
                    module: 'MM',
                    turkeyTag: 'Canlı Bakiye',
                    fioriTile: { subtitle: 'Depo ve Parti Bazlı Stok', kpi: 'Konsolide' },
                  },
                ],
              },
              {
                id: 'mm_inv_verif',
                label: 'Lojistik Fatura Doğrulama (MIRO)',
                isFolder: true,
                children: [
                  {
                    id: 'miro_node',
                    label: 'MIRO - Gelen Satıcı Faturası Girişi (3-Way Match)',
                    tCode: 'MIRO',
                    module: 'MM',
                    turkeyTag: '3-Way Match',
                    fioriTile: { subtitle: 'Tedarikçi Fatura Onayı', kpi: 'Doğrulama' },
                  },
                ],
              },
            ],
          },
          {
            id: 'le_folder',
            label: 'Lojistik Yürütme & Sevkiyat (Logistics Execution - LE)',
            isFolder: true,
            module: 'SD',
            children: [
              {
                id: 'le_outbound',
                label: 'Giden Teslimat & Çekme (Outbound Process)',
                isFolder: true,
                children: [
                  {
                    id: 'le_vl01n',
                    label: 'VL01N - Giden Teslimat & Mal Çıkışı (PGI)',
                    tCode: 'VL01N',
                    module: 'SD',
                    turkeyTag: 'e-İrsaliye Tetikler',
                    fioriTile: { subtitle: 'Toplama & Fiili Mal Çıkışı', kpi: 'PGI' },
                  },
                ],
              },
              {
                id: 'le_transport',
                label: 'Nakliye & Sevk Planlama (Transportation)',
                isFolder: true,
                children: [
                  {
                    id: 'vt01n_node',
                    label: 'VT01N - Nakliye Emri Yarat (Kamyon / Rota)',
                    tCode: 'VT01N',
                    module: 'SD',
                    turkeyTag: 'Plaka / Sürücü Sevk',
                    fioriTile: { subtitle: 'Kamyon Yükleme & Nakliye Planı', kpi: 'Sevk Emri' },
                  },
                ],
              },
            ],
          },
          {
            id: 'pp_folder',
            label: 'Üretim Planlama ve Kontrol (Production Planning - PP)',
            isFolder: true,
            module: 'PP',
            children: [
              {
                id: 'pp_master',
                label: 'Ana Veriler (BOM, İş Yeri, Routing)',
                isFolder: true,
                children: [
                  {
                    id: 'cs01_node',
                    label: 'CS01 - Malzeme Ürün Ağacı (BOM) Yarat',
                    tCode: 'CS01',
                    module: 'PP',
                    turkeyTag: 'Mamul Reçetesi',
                    fioriTile: { subtitle: 'Reçete / BOM Tanımlama', kpi: 'Ana Veri' },
                  },
                  {
                    id: 'cr01_node',
                    label: 'CR01 - İş Yeri (Work Center) Yarat',
                    tCode: 'CR01',
                    module: 'PP',
                    turkeyTag: 'Üretim Tezgahı',
                    fioriTile: { subtitle: 'Üretim Tezgahı & Kapasite', kpi: 'Kapasite' },
                  },
                ],
              },
              {
                id: 'pp_mrp',
                label: 'Malzeme İhtiyaç Planlaması (MRP)',
                isFolder: true,
                children: [
                  {
                    id: 'md04_node',
                    label: 'MD04 - Stok / Gereksinim Listesi (MRP Kokpiti)',
                    tCode: 'MD04',
                    module: 'PP',
                    turkeyTag: 'MRP Analizi',
                    fioriTile: { subtitle: 'Stok & Talep Dengesi', kpi: 'Dinamik' },
                  },
                ],
              },
              {
                id: 'pp_production_order',
                label: 'Üretim Siparişi (Production Order)',
                isFolder: true,
                children: [
                  {
                    id: 'co01_node',
                    label: 'CO01 - Üretim Siparişi Yarat (İmalat Emri)',
                    tCode: 'CO01',
                    module: 'PP',
                    turkeyTag: 'İmalat Başlat',
                    fioriTile: { subtitle: 'Fabrika Üretim Emri', kpi: 'Üretim' },
                  },
                  {
                    id: 'co11n_node',
                    label: 'CO11N - Üretim Operasyon Teyidi (Puantaj/Çıktı)',
                    tCode: 'CO11N',
                    module: 'PP',
                    turkeyTag: 'Vardiya Teyidi',
                    fioriTile: { subtitle: 'Üretim Miktarı Teyidi', kpi: 'Teyit' },
                  },
                ],
              },
            ],
          },
          {
            id: 'qm_folder',
            label: 'Kalite Yönetimi (Quality Management - QM)',
            isFolder: true,
            module: 'QM',
            children: [
              {
                id: 'qm_inspection',
                label: 'Kalite Muayene Partileri (Inspection Lots)',
                isFolder: true,
                children: [
                  {
                    id: 'qa32_node',
                    label: 'QA32 - Muayene Partisi İnceleme & Seçimi',
                    tCode: 'QA32',
                    module: 'QM',
                    turkeyTag: 'Laboratuvar',
                    fioriTile: { subtitle: 'Giriş & Proses Kalite', kpi: 'Parti Listesi' },
                  },
                  {
                    id: 'qa11_node',
                    label: 'QA11 - Kullanım Kararı (Usage Decision - UD)',
                    tCode: 'QA11',
                    module: 'QM',
                    turkeyTag: 'Kabul / Ret Kararı',
                    fioriTile: { subtitle: 'Depoya Kabul / Ret Kararı', kpi: 'UD Onay' },
                  },
                ],
              },
            ],
          },
          {
            id: 'pm_folder',
            label: 'Bakım Onarım & Varlık Yönetimi (Plant Maintenance - PM)',
            isFolder: true,
            module: 'PM',
            children: [
              {
                id: 'pm_notifications',
                label: 'Bakım Bildirimleri (Notifications)',
                isFolder: true,
                children: [
                  {
                    id: 'iw21_node',
                    label: 'IW21 - Arıza Bildirimi Yarat (M1/M2)',
                    tCode: 'IW21',
                    module: 'PM',
                    turkeyTag: 'Arıza Çağrısı',
                    fioriTile: { subtitle: 'Makine Arıza Kaydı', kpi: 'Bakım Bildirimi' },
                  },
                ],
              },
              {
                id: 'pm_orders',
                label: 'Bakım Siparişleri (Maintenance Orders)',
                isFolder: true,
                children: [
                  {
                    id: 'iw31_node',
                    label: 'IW31 - Bakım Siparişi Yarat (İş Emri)',
                    tCode: 'IW31',
                    module: 'PM',
                    turkeyTag: 'Tesis Bakımı',
                    fioriTile: { subtitle: 'Periyodik & Düzeltici Bakım', kpi: 'İş Emri' },
                  },
                ],
              },
            ],
          },
          {
            id: 'cs_folder',
            label: 'Müşteri Hizmetleri & Servis (Customer Service - CS)',
            isFolder: true,
            module: 'PM',
            children: [
              {
                id: 'cs_notifications',
                label: 'Servis Bildirimleri (Service Notifications)',
                isFolder: true,
                children: [
                  {
                    id: 'iw51_node',
                    label: 'IW51 - Servis Bildirimi Yarat (Müşteri Arıza)',
                    tCode: 'IW51',
                    module: 'PM',
                    turkeyTag: 'Garanti & Servis',
                    fioriTile: { subtitle: 'Müşteri Destek & Servis Çağrısı', kpi: 'Servis Kaydı' },
                  },
                ],
              },
              {
                id: 'cs_orders',
                label: 'Servis Siparişleri (Service Orders)',
                isFolder: true,
                children: [
                  {
                    id: 'cs_iw31_node',
                    label: 'IW31 - Müşteri Servis Siparişi Yarat (Saha Müdahale)',
                    tCode: 'IW31',
                    module: 'PM',
                    turkeyTag: 'Teknisyen Sevk',
                    fioriTile: { subtitle: 'Saha Servis Ekibi Görevlendirme', kpi: 'Saha Servisi' },
                  },
                ],
              },
            ],
          },
          {
            id: 'wm_folder',
            label: 'Depo Yönetimi (Warehouse Management - WM / EWM)',
            isFolder: true,
            module: 'WM',
            children: [
              {
                id: 'wm_bins',
                label: 'Depo Adresleri & Transfer',
                isFolder: true,
                children: [
                  {
                    id: 'lt01_node',
                    label: 'LT01 - Transfer Siparişi Yarat (Raf Adresleme)',
                    tCode: 'LT01',
                    module: 'WM',
                    turkeyTag: 'Raf Hareketi',
                    fioriTile: { subtitle: 'Depo İçi Mal Taşıma', kpi: 'Transfer' },
                  },
                  {
                    id: 'scwm_mon_node',
                    label: '/SCWM/MON - EWM Depo Yönetim Monitörü',
                    tCode: '/SCWM/MON',
                    module: 'WM',
                    turkeyTag: 'Rampa & Antrepo',
                    fioriTile: { subtitle: 'EWM Canlı Rampa Takibi', kpi: 'Monitör' },
                  },
                ],
              },
            ],
          },
          {
            id: 'ps_folder',
            label: 'Proje Sistemi & Yatırım (Project System - PS)',
            isFolder: true,
            module: 'PS',
            children: [
              {
                id: 'ps_workbench',
                label: 'Proje Oluşturucu & WBS',
                isFolder: true,
                children: [
                  {
                    id: 'cj20n_node',
                    label: 'CJ20N - Proje Panosu (Project Builder - WBS)',
                    tCode: 'CJ20N',
                    module: 'PS',
                    turkeyTag: 'Yatırım Bütçesi',
                    fioriTile: { subtitle: 'Proje Ağacı & Fazlar', kpi: 'WBS' },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'financials',
        label: 'Mali İşler (Financials & Controlling - FI / CO)',
        isFolder: true,
        module: 'FI',
        children: [
          {
            id: 'fi_gl',
            label: 'Genel Muhasebe (General Ledger - FI-GL)',
            isFolder: true,
            children: [
              {
                id: 'fb50_node',
                label: 'FB50 - G/L Hesap Kalemi Girişi (Mahsup Fişi)',
                tCode: 'FB50',
                module: 'FI',
                turkeyTag: 'TDHP Terazisi',
                fioriTile: { subtitle: 'Defterikebir Mahsup Kaydı', kpi: 'Mizan' },
              },
            ],
          },
          {
            id: 'fi_ap',
            label: 'Satıcılar Muhasebesi (Accounts Payable - FI-AP)',
            isFolder: true,
            children: [
              {
                id: 'fb60_node',
                label: 'FB60 - Satıcı Faturası Girişi (Borç Kaydı)',
                tCode: 'FB60',
                module: 'FI',
                turkeyTag: 'Tevkifat / Stopaj',
                fioriTile: { subtitle: 'Satıcı Borçlandırma', kpi: '320 Cari' },
              },
              {
                id: 'f53_node',
                label: 'F-53 - Çıkan Ödeme & Açık Kalem Dengeleme',
                tCode: 'F-53',
                module: 'FI',
                fioriTile: { subtitle: 'Banka Ödemesi & Kapatma', kpi: 'Dengeleme' },
              },
            ],
          },
          {
            id: 'fi_ar',
            label: 'Müşteriler Muhasebesi (Accounts Receivable - FI-AR)',
            isFolder: true,
            children: [
              {
                id: 'fb70_node',
                label: 'FB70 - Müşteri Faturası Girişi (Alacak Kaydı)',
                tCode: 'FB70',
                module: 'FI',
                fioriTile: { subtitle: 'Müşteri Alacaklandırma', kpi: '120 Cari' },
              },
            ],
          },
          {
            id: 'co_cca',
            label: 'Maliyet Muhasebesi ve Kontrol (Controlling - CO)',
            isFolder: true,
            module: 'CO',
            children: [
              {
                id: 'ks01_node',
                label: 'KS01 - Masraf Yeri Yarat (Cost Center)',
                tCode: 'KS01',
                module: 'CO',
                turkeyTag: 'Masraf Merkezi',
                fioriTile: { subtitle: 'Gider Yeri Açılışı', kpi: 'Masraf Yeri' },
              },
              {
                id: 'ksb1_node',
                label: 'KSB1 - Masraf Yeri Fiili Kalem Raporu',
                tCode: 'KSB1',
                module: 'CO',
                fioriTile: { subtitle: 'Departman Gider Dökümü', kpi: 'Fiili Masraf' },
              },
            ],
          },
        ],
      },
      {
        id: 'human_resources',
        label: 'İnsan Kaynakları (Human Capital Management - HCM)',
        isFolder: true,
        module: 'HCM',
        children: [
          {
            id: 'hcm_pa',
            label: 'Personel Yönetimi (Personnel Administration)',
            isFolder: true,
            children: [
              {
                id: 'pa30_node',
                label: 'PA30 - Personel Ana Verisi Bakımı (Özlük Dosyası)',
                tCode: 'PA30',
                module: 'HCM',
                turkeyTag: 'SGK & Özlük',
                fioriTile: { subtitle: 'Çalışan Bilgi Kartı', kpi: 'Personel' },
              },
              {
                id: 'pa40_node',
                label: 'PA40 - Personel Hareketi (İşe Giriş / Çıkış)',
                tCode: 'PA40',
                module: 'HCM',
                turkeyTag: 'İşe Başlatma',
                fioriTile: { subtitle: 'İşe Alım Süreci', kpi: 'İşe Giriş' },
              },
            ],
          },
        ],
      },
      {
        id: 'cross_applications',
        label: 'Sistem Araçları & ABAP (Basis & Development)',
        isFolder: true,
        module: 'BASIS',
        children: [
          {
            id: 'basis_admin_folder',
            label: 'Sistem İdaresi & Yetki (Basis / Security)',
            isFolder: true,
            children: [
              {
                id: 'su01_node',
                label: 'SU01 - Kullanıcı Bakımı (Yetki & Roller)',
                tCode: 'SU01',
                module: 'BASIS',
                turkeyTag: 'Kullanıcı Açma',
                fioriTile: { subtitle: 'SAP Kullanıcı & Şifre', kpi: 'Yetki' },
              },
              {
                id: 'st22_node',
                label: 'ST22 - ABAP Sistem Hata Dökümü (Short Dumps)',
                tCode: 'ST22',
                module: 'BASIS',
                fioriTile: { subtitle: 'Sistem Hata Analizi', kpi: 'Dump' },
              },
            ],
          },
          {
            id: 'abap_workbench',
            label: 'ABAP Geliştirme Çalışma Alanı (ABAP Workbench)',
            isFolder: true,
            children: [
              {
                id: 'se11_node',
                label: 'SE11 - ABAP Veri Sözlüğü (Data Dictionary)',
                tCode: 'SE11',
                module: 'BASIS',
                turkeyTag: 'VBAK / MARA',
                fioriTile: { subtitle: 'SAP Veri Tabanı Tabloları', kpi: 'Tablo/Görünüm' },
              },
            ],
          },
        ],
      },
    ],
  },
];
