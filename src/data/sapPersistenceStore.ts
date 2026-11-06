/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SapBusinessPartner {
  bpNumber: string; // BUT000-PARTNER
  category: '1' | '2'; // 1: Person, 2: Organization
  name1: string; // BUT000-NAME_ORG1
  city: string;
  country: string;
  address: string;
  taxNumberVkn: string; // DFKKBPTAXNUM-TAXNUM (TR0 / DE0)
  roles: string[]; // '000000' (Genel), 'FLCU00' (FI Müşteri), 'FLCU01' (SD Müşteri), 'FLVN00' (FI Satıcı), 'FLVN01' (MM Satıcı)
  companyCode: string; // KNB1/LFB1-BUKRS
  reconciliationAccount: string; // KNB1/LFB1-AKONT (120000 / 320000)
  salesOrg?: string; // KNVV-VKORG
  distChannel?: string; // KNVV-VTWEG
  division?: string; // KNVV-SPART
  currency: string;
  paymentTerms: string; // ZTERM (0001, Z030)
  incoterms?: string; // INCO1 (EXW, CIF, FOB)
  creditLimit?: number;
  cviSyncedCustomerNo?: string; // KNA1-KUNNR
  cviSyncedVendorNo?: string; // LFA1-LIFNR
}

export interface SapMaterialStock {
  matnr: string; // MARA-MATNR
  maktx: string; // MAKT-MAKTX
  mtart: 'FERT' | 'HAWA' | 'ROH'; // MARA-MTART
  meins: string; // MARA-MEINS
  werks: string; // MARD-WERKS
  lgort: string; // MARD-LGORT
  labst: number; // MARD-LABST (Tahditsiz Kullanılabilir Stok)
  insme: number; // MARD-INSME (Kalite Kontrol Stoğu)
  speme: number; // MARD-SPEME (Bloke Stok)
  bklas: string; // MBEW-BKLAS (Değerleme Sınıfı: 7920 Mamul, 3100 Ticari Mal, 3000 Hammadde)
  standardPrice: number; // MBEW-STPRS
  salesPricePr00: number; // PRCD_ELEMENTS PR00
  currency: string;
}

export interface SapSalesOrderRecord {
  vbeln: string; // VBAK-VBELN
  auart: 'OR' | 'ZOR' | 'RE' | 'FD'; // Standart: OR, Şirket Uyarlaması: ZOR
  isCustomOrderType: boolean; // Z/Y ile başlayan uyarlama mı?
  vkorg: string; // VBAK-VKORG
  vtweg: string; // VBAK-VTWEG
  spart: string; // VBAK-SPART
  kunnr: string; // Sold-to Party
  kunnrName: string;
  bstkd: string; // VBKD-BSTKD (Müşteri Referansı / PO No)
  bstdk: string; // VBKD-BSTDK
  erdat: string; // VBAK-ERDAT
  netwr: number; // VBAK-NETWR
  mwsbp: number; // Vergi Tutarı
  waerk: string; // VBAK-WAERK
  uvall: 'A' | 'C'; // Eksiklik durumu: 'A' = Eksik (Incompletion Log aktif), 'C' = Tamamlandı
  lfgsk: 'A' | 'B' | 'C'; // Teslimat durumu: 'A' = İşlenmedi, 'C' = Tamamen Sevk Edildi
  items: Array<{
    posnr: string; // VBAP-POSNR
    matnr: string; // VBAP-MATNR
    arktx: string; // VBAP-ARKTX
    kwmeng: number; // VBAP-KWMENG
    vrkme: string; // VBAP-VRKME
    netpr: number; // VBAP-NETPR
    netwr: number; // VBAP-NETWR
    werks: string; // VBAP-WERKS
    lgort: string; // VBAP-LGORT
  }>;
}

export interface SapDeliveryRecord {
  vbeln: string; // LIKP-VBELN (80040620 vb.)
  lfart: 'LF' | 'LR'; // LIKP-LFART
  vstel: string; // LIKP-VSTEL (Sevkiyat Noktası)
  kunnr: string; // LIKP-KUNNR (Malı Teslim Alan)
  kunnrName: string;
  vgbel: string; // LIPS-VGBEL (Referans Sipariş No)
  lddat: string; // LIKP-LDDAT
  kostk: 'A' | 'C'; // Çekme (Picking) durumu: 'A' = Çekilmedi, 'C' = Tamamen Çekildi
  wbstk: 'A' | 'C'; // Mal Hareketi (PGI) durumu: 'A' = PGI Yapılmadı, 'C' = PGI Tamamlandı
  fkstk: 'A' | 'C'; // Faturalama durumu: 'A' = Faturalanmadı, 'C' = Faturalandı
  mblnr?: string; // İlişkili 601 Malzeme Belgesi No
  items: Array<{
    posnr: string;
    matnr: string;
    arktx: string;
    lfimg: number; // Teslimat Miktarı
    pikmg: number; // Çekilen (Picked) Miktar
    vrkme: string;
    werks: string;
    lgort: string;
  }>;
}

export interface SapBillingRecord {
  vbeln: string; // VBRK-VBELN (90017855 vb.)
  fkart: 'F2' | 'F5' | 'F8' | 'S1'; // F2: Standart Fatura, F5: Sipariş Proforma, F8: Teslimat Proforma, S1: İptal
  fkartDesc: string;
  isProforma: boolean; // F5 ve F8 Proforma faturadır -> Muhasebe (ACDOCA) kaydı üretmez!
  vgbel: string; // Referans Teslimat veya Sipariş No
  kunrg: string; // Ödeyen (Payer)
  kunrgName: string;
  fkdat: string; // VBRK-FKDAT
  netwr: number; // VBRK-NETWR
  mwsbk: number; // VBRK-MWSBK (Vergi)
  waerk: string; // VBRK-WAERK
  rfbsk: 'A' | 'C' | 'D'; // 'C': Muhasebeye Aktarıldı (ACDOCA), 'D': Muhasebe İçin Geçersiz (Proforma F5/F8)
  belnr?: string; // İlişkili FI Muhasebe Belgesi No (Sadece F2 için)
}

export interface SapMaterialDocRecord {
  mblnr: string; // MKPF-MBLNR (49000... / 50000...)
  mjahr: string; // MKPF-MJAHR (2025 / 2026)
  vgart: 'WL' | 'WE' | 'WA'; // WL: Teslimat Mal Çıkışı, WE: SAS Mal Girişi
  bwart: '601' | '602' | '101' | '321'; // 601: PGI, 602: PGI İptal (VL09), 101: MIGO Mal Girişi
  budat: string; // MKPF-BUDAT
  refDoc: string; // Teslimat veya SAS No
  matnr: string;
  maktx: string;
  menge: number;
  meins: string;
  werks: string;
  lgort: string;
  fiDocNo?: string; // Otomatik oluşan ACDOCA muhasebe belgesi
}

export interface SapUniversalJournalEntry {
  belnr: string; // BKPF-BELNR / ACDOCA-BELNR
  bukrs: string; // ACDOCA-RBUKRS (TR01 / 1010)
  gjahr: string; // ACDOCA-GJAHR (2025 / 2026)
  blart: 'RV' | 'WL' | 'WE' | 'RE' | 'SA' | 'KR' | 'DR' | 'KZ';
  bldat: string;
  awtyp: 'VBRK' | 'MKPF' | 'RMRP' | 'BKPF';
  awkey: string; // Kaynak belge numarası
  waers: string;
  headerText: string;
  lines: Array<{
    buzei: string;
    hkont: string; // TDHP G/L Hesap Kodu (120000, 600000, 391000, 621000, 153000, 770000, 102000)
    accountName: string;
    shkzg: 'S' | 'H'; // S: Borç (Debit), H: Alacak (Credit)
    wrbtr: number; // Tutar
    kostl?: string; // Masraf Yeri
    kunnr?: string;
    lifnr?: string;
  }>;
}

export interface SapDocumentFlowLink {
  id: string;
  vbelv: string; // Önceki Belge (Preceding Doc)
  vbtyp_v: string; // Önceki Belge Tipi (C: Sipariş, J: Teslimat, R: Mal Hareketi, M: Fatura)
  vbeln: string; // Sonraki Belge (Subsequent Doc)
  vbtyp_n: string; // Sonraki Belge Tipi
  rfmng: number;
  rfwrt: number;
  waers: string;
  erdat: string;
  statusText: string;
}

export interface SapDatabaseState {
  version: string;
  businessPartners: SapBusinessPartner[];
  materials: SapMaterialStock[];
  salesOrders: SapSalesOrderRecord[];
  deliveries: SapDeliveryRecord[];
  billings: SapBillingRecord[];
  materialDocs: SapMaterialDocRecord[];
  universalJournal: SapUniversalJournalEntry[];
  docFlow: SapDocumentFlowLink[];
}

const STORAGE_KEY = 'sap_s4hana_2025_fps01_db_v1';

export const INITIAL_SAP_DATABASE: SapDatabaseState = {
  version: 'SAP S/4HANA 2025 FPS01',
  businessPartners: [
    {
      bpNumber: 'TR1923',
      category: '2',
      name1: 'TÜRKİYE ŞUBE',
      city: 'Köln',
      country: 'DE',
      address: 'Neusser Str. 120, 50765 Köln, Almanya',
      taxNumberVkn: 'DE192384729',
      roles: ['000000', 'FLCU00', 'FLCU01'],
      companyCode: '1010',
      reconciliationAccount: '120000',
      salesOrg: '1010',
      distChannel: '10',
      division: '00',
      currency: 'EUR',
      paymentTerms: '0001',
      incoterms: 'CIF',
      creditLimit: 150000,
      cviSyncedCustomerNo: 'TR1923',
    },
    {
      bpNumber: '100021',
      category: '2',
      name1: 'Koçak Lojistik & Sanayi A.Ş.',
      city: 'Kocaeli / Gebze',
      country: 'TR',
      address: 'Gebze OSB 4. Cad. No:12, Kocaeli',
      taxNumberVkn: '5480219482',
      roles: ['000000', 'FLCU00', 'FLCU01'],
      companyCode: 'TR01',
      reconciliationAccount: '120000',
      salesOrg: '1000',
      distChannel: '10',
      division: '00',
      currency: 'TRY',
      paymentTerms: 'Z030',
      incoterms: 'EXW',
      creditLimit: 2500000,
      cviSyncedCustomerNo: '100021',
    },
    {
      bpNumber: '100045',
      category: '2',
      name1: 'Anadolu Bilişim Teknolojileri Ltd.',
      city: 'Ankara',
      country: 'TR',
      address: 'ODTÜ Teknokent Silikon Blok Kat:2, Ankara',
      taxNumberVkn: '1049281729',
      roles: ['000000', 'FLCU00', 'FLCU01'],
      companyCode: 'TR01',
      reconciliationAccount: '120000',
      salesOrg: '1000',
      distChannel: '10',
      division: '00',
      currency: 'TRY',
      paymentTerms: '0001',
      incoterms: 'FCA',
      creditLimit: 750000,
      cviSyncedCustomerNo: '100045',
    },
    {
      bpNumber: '300045',
      category: '2',
      name1: 'Borusan Endüstriyel Tedarik A.Ş.',
      city: 'İstanbul',
      country: 'TR',
      address: 'Halkalı Merkez Mah. Basın Ekspres, İstanbul',
      taxNumberVkn: '1800492817',
      roles: ['000000', 'FLVN00', 'FLVN01'],
      companyCode: 'TR01',
      reconciliationAccount: '320000',
      currency: 'TRY',
      paymentTerms: 'Z030',
      cviSyncedVendorNo: '300045',
    },
  ],
  materials: [
    {
      matnr: '531',
      maktx: 'Melone Tee (Kavunlu Çay)',
      mtart: 'HAWA',
      meins: 'KAR',
      werks: '1010',
      lgort: '101A',
      labst: 120,
      insme: 0,
      speme: 0,
      bklas: '3100',
      standardPrice: 180,
      salesPricePr00: 290,
      currency: 'EUR',
    },
    {
      matnr: '532',
      maktx: 'üzümlü çay',
      mtart: 'HAWA',
      meins: 'KAR',
      werks: '1010',
      lgort: '101A',
      labst: 85,
      insme: 0,
      speme: 0,
      bklas: '3100',
      standardPrice: 9,
      salesPricePr00: 15,
      currency: 'EUR',
    },
    {
      matnr: 'MAT-TURK-01',
      maktx: 'Endüstriyel Kontrol Modülü V3',
      mtart: 'FERT',
      meins: 'ST',
      werks: '1000',
      lgort: '0001',
      labst: 60,
      insme: 10,
      speme: 0,
      bklas: '7920',
      standardPrice: 2800,
      salesPricePr00: 4500,
      currency: 'TRY',
    },
    {
      matnr: 'MAT-TURK-02',
      maktx: 'Sensör Bağlantı Kablo Takımı (10m)',
      mtart: 'HAWA',
      meins: 'ST',
      werks: '1000',
      lgort: '0001',
      labst: 200,
      insme: 0,
      speme: 5,
      bklas: '3100',
      standardPrice: 190,
      salesPricePr00: 320,
      currency: 'TRY',
    },
  ],
  salesOrders: [
    {
      vbeln: '32833',
      auart: 'OR',
      isCustomOrderType: false,
      vkorg: '1010',
      vtweg: '10',
      spart: '00',
      kunnr: 'TR1923',
      kunnrName: 'TÜRKİYE ŞUBE',
      bstkd: '32833',
      bstdk: '07.10.2021',
      erdat: '07.10.2021',
      netwr: 3050,
      mwsbp: 579.5,
      waerk: 'EUR',
      uvall: 'C',
      lfgsk: 'C',
      items: [
        {
          posnr: '10',
          matnr: '531',
          arktx: 'Melone Tee',
          kwmeng: 10,
          vrkme: 'KAR',
          netpr: 290,
          netwr: 2900,
          werks: '1010',
          lgort: '101A',
        },
        {
          posnr: '20',
          matnr: '532',
          arktx: 'üzümlü çay',
          kwmeng: 10,
          vrkme: 'KAR',
          netpr: 15,
          netwr: 150,
          werks: '1010',
          lgort: '101A',
        },
      ],
    },
  ],
  deliveries: [
    {
      vbeln: '80040620',
      lfart: 'LF',
      vstel: '1010',
      kunnr: 'TR1923',
      kunnrName: 'TÜRKİYE ŞUBE',
      vgbel: '32833',
      lddat: '07.10.2021',
      kostk: 'C',
      wbstk: 'C',
      fkstk: 'C',
      mblnr: '4900018420',
      items: [
        {
          posnr: '10',
          matnr: '531',
          arktx: 'Melone Tee',
          lfimg: 10,
          pikmg: 10,
          vrkme: 'KAR',
          werks: '1010',
          lgort: '101A',
        },
        {
          posnr: '20',
          matnr: '532',
          arktx: 'üzümlü çay',
          lfimg: 10,
          pikmg: 10,
          vrkme: 'KAR',
          werks: '1010',
          lgort: '101A',
        },
      ],
    },
  ],
  billings: [
    {
      vbeln: '90017855',
      fkart: 'F2',
      fkartDesc: 'F2 - Standart Ticari Fatura (SD -> FI ACDOCA)',
      isProforma: false,
      vgbel: '80040620',
      kunrg: 'TR1923',
      kunrgName: 'TÜRKİYE ŞUBE',
      fkdat: '07.10.2021',
      netwr: 3050,
      mwsbk: 579.5,
      waerk: 'EUR',
      rfbsk: 'C',
      belnr: '1400000912',
    },
  ],
  materialDocs: [
    {
      mblnr: '4900018420',
      mjahr: '2025',
      vgart: 'WL',
      bwart: '601',
      budat: '07.10.2021',
      refDoc: '80040620',
      matnr: '531 / 532',
      maktx: 'Melone Tee (10 KAR) & üzümlü çay (10 KAR)',
      menge: 20,
      meins: 'KAR',
      werks: '1010',
      lgort: '101A',
      fiDocNo: '4900001102',
    },
  ],
  universalJournal: [
    {
      belnr: '4900001102',
      bukrs: '1010',
      gjahr: '2025',
      blart: 'WL',
      bldat: '07.10.2021',
      awtyp: 'MKPF',
      awkey: '4900018420',
      waers: 'EUR',
      headerText: 'PGI 601 Mal Çıkışı SMM Kaydı (80040620)',
      lines: [
        {
          buzei: '001',
          hkont: '621000',
          accountName: 'Satılan Ticari Mallar Maliyeti (GBB-VAX)',
          shkzg: 'S',
          wrbtr: 1890,
        },
        {
          buzei: '002',
          hkont: '153000',
          accountName: 'Ticari Mallar Stoğu (BSX)',
          shkzg: 'H',
          wrbtr: 1890,
        },
      ],
    },
    {
      belnr: '1400000912',
      bukrs: '1010',
      gjahr: '2025',
      blart: 'RV',
      bldat: '07.10.2021',
      awtyp: 'VBRK',
      awkey: '90017855',
      waers: 'EUR',
      headerText: 'VF01 F2 Satış Faturası (90017855 - TR1923)',
      lines: [
        {
          buzei: '001',
          hkont: '120000',
          accountName: 'Alıcılar (TR1923 TÜRKİYE ŞUBE)',
          shkzg: 'S',
          wrbtr: 3629.5,
          kunnr: 'TR1923',
        },
        {
          buzei: '002',
          hkont: '600000',
          accountName: 'Yurtiçi / İhraç Satışlar Geliri (ERL)',
          shkzg: 'H',
          wrbtr: 3050,
        },
        {
          buzei: '003',
          hkont: '391000',
          accountName: 'Hesaplanan KDV (%19 MWST)',
          shkzg: 'H',
          wrbtr: 579.5,
        },
      ],
    },
  ],
  docFlow: [
    {
      id: 'df-1',
      vbelv: '32833',
      vbtyp_v: 'C (Standart Sipariş)',
      vbeln: '80040620',
      vbtyp_n: 'J (Giden Teslimat)',
      rfmng: 20,
      rfwrt: 3050,
      waers: 'EUR',
      erdat: '07.10.2021',
      statusText: 'Tamamlandı',
    },
    {
      id: 'df-2',
      vbelv: '80040620',
      vbtyp_v: 'J (Giden Teslimat)',
      vbeln: '4900018420',
      vbtyp_n: 'R (601 Mal Çıkışı PGI)',
      rfmng: 20,
      rfwrt: 1890,
      waers: 'EUR',
      erdat: '07.10.2021',
      statusText: 'Stoktan Düşüldü (WBSTK=C)',
    },
    {
      id: 'df-3',
      vbelv: '80040620',
      vbtyp_v: 'J (Giden Teslimat)',
      vbeln: '90017855',
      vbtyp_n: 'M (F2 Ticari Fatura)',
      rfmng: 20,
      rfwrt: 3050,
      waers: 'EUR',
      erdat: '07.10.2021',
      statusText: 'ACDOCA Muhasebeleşti (1400000912)',
    },
  ],
};

export function loadSapDatabase(): SapDatabaseState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAP_DATABASE));
      return INITIAL_SAP_DATABASE;
    }
    return JSON.parse(raw) as SapDatabaseState;
  } catch {
    return INITIAL_SAP_DATABASE;
  }
}

export function saveSapDatabase(state: SapDatabaseState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('sap_db_updated'));
  } catch {
    // ignore storage errors
  }
}

export function resetSapDatabase(): SapDatabaseState {
  saveSapDatabase(INITIAL_SAP_DATABASE);
  return INITIAL_SAP_DATABASE;
}

export interface IncompletionItem {
  id: string;
  kalem: string;
  kisaTanim: string;
  eksikVeri: string;
  fieldKey: string;
  tableTechName: string;
}

/**
 * OVA2 / VUA2 Eksiklik Günlüğü Kontrolü (IMG_2953 & IMG_2954 ile Birebir)
 */
export function runIncompletionCheck(params: {
  kunnr: string;
  bstkd: string;
  items: Array<{ kalemNo: string; malzeme: string; kisaMetin: string; miktar: number; fiyat: number }>;
}): IncompletionItem[] {
  const missing: IncompletionItem[] = [];
  if (!params.kunnr || !params.kunnr.trim()) {
    missing.push({
      id: 'inc_kunnr',
      kalem: '000000',
      kisaTanim: 'Başlık verisi',
      eksikVeri: 'Sipariş veren (Sold-to Party)',
      fieldKey: 'kunnr',
      tableTechName: 'VBAK-KUNNR',
    });
  }
  if (!params.bstkd || !params.bstkd.trim()) {
    missing.push({
      id: 'inc_bstkd',
      kalem: '000000',
      kisaTanim: '',
      eksikVeri: 'Müşteri referansı',
      fieldKey: 'bstkd',
      tableTechName: 'VBKD-BSTKD',
    });
  }
  params.items.forEach((it) => {
    if (!it.miktar || it.miktar <= 0) {
      missing.push({
        id: `inc_qty_${it.kalemNo}`,
        kalem: it.kalemNo.padStart(6, '0'),
        kisaTanim: it.kisaMetin,
        eksikVeri: 'Sipariş miktarı',
        fieldKey: `qty_${it.kalemNo}`,
        tableTechName: 'VBAP-KWMENG',
      });
    }
    if (!it.fiyat || it.fiyat <= 0) {
      missing.push({
        id: `inc_prc_${it.kalemNo}`,
        kalem: it.kalemNo.padStart(6, '0'),
        kisaTanim: it.kisaMetin,
        eksikVeri: 'Net fiyat (PR00 Koşulu)',
        fieldKey: `price_${it.kalemNo}`,
        tableTechName: 'PRCD_ELEMENTS-KBETR',
      });
    }
  });
  return missing;
}

/**
 * VA01: Satış Siparişini VBAK / VBAP tablosuna kalıcı olarak kaydeder
 */
export function persistSalesOrder(params: {
  auart: 'OR' | 'ZOR' | 'RE' | 'FD';
  vkorg: string;
  vtweg: string;
  spart: string;
  kunnr: string;
  kunnrName: string;
  bstkd: string;
  bstdk: string;
  waerk: string;
  taxRate: number;
  items: Array<{
    kalemNo: string;
    malzeme: string;
    kisaMetin: string;
    miktar: number;
    birim: string;
    fiyat: number;
    depoYeri?: string;
  }>;
}): { order: SapSalesOrderRecord; db: SapDatabaseState } {
  const db = loadSapDatabase();
  const netwr = params.items.reduce((acc, it) => acc + it.miktar * it.fiyat, 0);
  const mwsbp = Number((netwr * params.taxRate).toFixed(2));
  const nextNumber =
    params.kunnr === 'TR1923' && !db.salesOrders.some((o) => o.vbeln === '32834')
      ? '32834'
      : String(14205 + db.salesOrders.length);

  const newOrder: SapSalesOrderRecord = {
    vbeln: nextNumber,
    auart: params.auart,
    isCustomOrderType: params.auart.startsWith('Z') || params.auart.startsWith('Y'),
    vkorg: params.vkorg,
    vtweg: params.vtweg,
    spart: params.spart,
    kunnr: params.kunnr,
    kunnrName: params.kunnrName,
    bstkd: params.bstkd,
    bstdk: params.bstdk,
    erdat: params.bstdk || new Date().toLocaleDateString('tr-TR'),
    netwr,
    mwsbp,
    waerk: params.waerk,
    uvall: params.bstkd ? 'C' : 'A',
    lfgsk: 'A',
    items: params.items.map((it) => ({
      posnr: it.kalemNo,
      matnr: it.malzeme,
      arktx: it.kisaMetin,
      kwmeng: it.miktar,
      vrkme: it.birim,
      netpr: it.fiyat,
      netwr: it.miktar * it.fiyat,
      werks: params.vkorg === '1010' ? '1010' : '1000',
      lgort: it.depoYeri || (params.vkorg === '1010' ? '101A' : '0001'),
    })),
  };

  const updated: SapDatabaseState = {
    ...db,
    salesOrders: [newOrder, ...db.salesOrders],
  };
  saveSapDatabase(updated);
  return { order: newOrder, db: updated };
}

/**
 * VL01N / VL02N: Mal Çıkışını Kaydet (Post Goods Issue - PGI, Hareket Türü 601)
 * Gerçek stok kontrolü, MARD stok düşümü, MKPF/MSEG 601 belgesi ve ACDOCA SMM kaydı üretir.
 */
export function executePostGoodsIssue(params: {
  orderNo: string;
  vstel: string;
  kunnr: string;
  kunnrName: string;
  waerk: string;
  pickedQuantities: Record<string, number>;
  items: Array<{
    kalemNo: string;
    malzeme: string;
    kisaMetin: string;
    miktar: number;
    birim: string;
    depoYeri?: string;
  }>;
}): {
  ok: boolean;
  errorCode?: string;
  errorMessage?: string;
  delivery?: SapDeliveryRecord;
  matDoc?: SapMaterialDocRecord;
  fiDoc?: SapUniversalJournalEntry;
} {
  const db = loadSapDatabase();

  // 1. Check Picking Quantities === Delivery Quantities (SAP Error VL 609)
  for (const item of params.items) {
    const picked =
      params.pickedQuantities[item.kalemNo] !== undefined
        ? params.pickedQuantities[item.kalemNo]
        : item.miktar;
    if (picked !== item.miktar) {
      return {
        ok: false,
        errorCode: 'VL 609',
        errorMessage: `Kalem ${item.kalemNo} (${item.malzeme}): Teslimat miktarı (${item.miktar} ${item.birim}) ile Çekilen miktar (${picked} ${item.birim}) eşit olmalıdır!`,
      };
    }
  }

  // 2. Check Stock Availability in MARD (SAP Error M7 021)
  const updatedMaterials = [...db.materials];
  let totalCogs = 0;

  for (const item of params.items) {
    const matIdx = updatedMaterials.findIndex((m) => m.matnr === item.malzeme);
    if (matIdx !== -1) {
      if (updatedMaterials[matIdx].labst < item.miktar) {
        return {
          ok: false,
          errorCode: 'M7 021',
          errorMessage: `Malzeme ${item.malzeme} (${ updatedMaterials[matIdx].werks}/${updatedMaterials[matIdx].lgort}) için ${item.miktar} ${item.birim} açık miktar eksiği var! Mevcut stok: ${updatedMaterials[matIdx].labst}`,
        };
      }
      updatedMaterials[matIdx] = {
        ...updatedMaterials[matIdx],
        labst: updatedMaterials[matIdx].labst - item.miktar,
      };
      totalCogs += item.miktar * updatedMaterials[matIdx].standardPrice;
    } else {
      totalCogs += item.miktar * 100;
    }
  }

  const delivNo = String(80040620 + db.deliveries.length);
  const matDocNo = String(4900018420 + db.materialDocs.length);
  const fiDocNo = String(4900001102 + db.universalJournal.length);
  const todayStr = new Date().toLocaleDateString('tr-TR');

  const newDelivery: SapDeliveryRecord = {
    vbeln: delivNo,
    lfart: 'LF',
    vstel: params.vstel,
    kunnr: params.kunnr,
    kunnrName: params.kunnrName,
    vgbel: params.orderNo,
    lddat: todayStr,
    kostk: 'C',
    wbstk: 'C',
    fkstk: 'A',
    mblnr: matDocNo,
    items: params.items.map((it) => ({
      posnr: it.kalemNo,
      matnr: it.malzeme,
      arktx: it.kisaMetin,
      lfimg: it.miktar,
      pikmg: it.miktar,
      vrkme: it.birim,
      werks: params.vstel === '1010' ? '1010' : '1000',
      lgort: it.depoYeri || '101A',
    })),
  };

  const newMatDoc: SapMaterialDocRecord = {
    mblnr: matDocNo,
    mjahr: '2025',
    vgart: 'WL',
    bwart: '601',
    budat: todayStr,
    refDoc: delivNo,
    matnr: params.items.map((i) => i.malzeme).join(', '),
    maktx: params.items.map((i) => `${i.kisaMetin} (${i.miktar} ${i.birim})`).join(' + '),
    menge: params.items.reduce((a, b) => a + b.miktar, 0),
    meins: params.items[0]?.birim || 'ST',
    werks: params.vstel === '1010' ? '1010' : '1000',
    lgort: params.items[0]?.depoYeri || '101A',
    fiDocNo,
  };

  const newFiDoc: SapUniversalJournalEntry = {
    belnr: fiDocNo,
    bukrs: params.vstel === '1010' ? '1010' : 'TR01',
    gjahr: '2025',
    blart: 'WL',
    bldat: todayStr,
    awtyp: 'MKPF',
    awkey: matDocNo,
    waers: params.waerk,
    headerText: `PGI 601 Mal Çıkışı SMM (${delivNo})`,
    lines: [
      {
        buzei: '001',
        hkont: '621000',
        accountName: 'Satılan Ticari Mallar Maliyeti (GBB-VAX)',
        shkzg: 'S',
        wrbtr: totalCogs,
      },
      {
        buzei: '002',
        hkont: '153000',
        accountName: 'Ticari Mallar Stoğu (BSX)',
        shkzg: 'H',
        wrbtr: totalCogs,
      },
    ],
  };

  const newFlows: SapDocumentFlowLink[] = [
    {
      id: `df-${Date.now()}-1`,
      vbelv: params.orderNo,
      vbtyp_v: 'C (Satış Siparişi)',
      vbeln: delivNo,
      vbtyp_n: 'J (Giden Teslimat)',
      rfmng: newMatDoc.menge,
      rfwrt: totalCogs,
      waers: params.waerk,
      erdat: todayStr,
      statusText: 'PGI Tamamlandı (WBSTK=C)',
    },
    {
      id: `df-${Date.now()}-2`,
      vbelv: delivNo,
      vbtyp_v: 'J (Giden Teslimat)',
      vbeln: matDocNo,
      vbtyp_n: 'R (601 Mal Çıkışı PGI)',
      rfmng: newMatDoc.menge,
      rfwrt: totalCogs,
      waers: params.waerk,
      erdat: todayStr,
      statusText: `ACDOCA SMM Fişi: ${fiDocNo}`,
    },
  ];

  const updatedOrders = db.salesOrders.map((o) =>
    o.vbeln === params.orderNo ? { ...o, lfgsk: 'C' as const } : o
  );

  const updatedDb: SapDatabaseState = {
    ...db,
    materials: updatedMaterials,
    salesOrders: updatedOrders,
    deliveries: [newDelivery, ...db.deliveries],
    materialDocs: [newMatDoc, ...db.materialDocs],
    universalJournal: [newFiDoc, ...db.universalJournal],
    docFlow: [...newFlows, ...db.docFlow],
  };
  saveSapDatabase(updatedDb);

  return {
    ok: true,
    delivery: newDelivery,
    matDoc: newMatDoc,
    fiDoc: newFiDoc,
  };
}

/**
 * VF01: Faturalama Belgesi Yarat (F2 Standart Fatura vs. F5 / F8 Proforma Fatura)
 * Resmî SAP Kuralı:
 * - F2: Teslimatta PGI (WBSTK='C') zorunludur. Kaydedildiğinde ACDOCA tablosuna 120 / 600 / 391 FI belgesi atar (RFBSK='C').
 * - F5 (Sipariş Proforma) & F8 (Teslimat Proforma): İhracat ve gümrük beyannamesi içindir. Muhasebe belgesi ÜRETMEZ (RFBSK='D').
 */
export function executeCreateBilling(params: {
  fkart: 'F2' | 'F5' | 'F8';
  refDocNo: string;
  kunrg: string;
  kunrgName: string;
  netwr: number;
  mwsbk: number;
  waerk: string;
}): {
  ok: boolean;
  errorCode?: string;
  errorMessage?: string;
  billing?: SapBillingRecord;
  fiDoc?: SapUniversalJournalEntry;
} {
  const db = loadSapDatabase();
  const isProforma = params.fkart === 'F5' || params.fkart === 'F8';

  // F2 Commercial Invoice requires PGI completed on Delivery
  if (params.fkart === 'F2') {
    const foundDeliv = db.deliveries.find((d) => d.vbeln === params.refDocNo);
    if (foundDeliv && foundDeliv.wbstk !== 'C') {
      return {
        ok: false,
        errorCode: 'VF 066',
        errorMessage: `Teslimat ${params.refDocNo} için henüz Mal Çıkışı (PGI) kaydedilmemiş! F2 ticari fatura kesmeden önce VL02N ile PGI yapınız.`,
      };
    }
  }

  const billNo = String(90017855 + db.billings.length);
  const todayStr = new Date().toLocaleDateString('tr-TR');
  let fiDoc: SapUniversalJournalEntry | undefined;

  if (!isProforma) {
    const fiDocNo = String(1400000912 + db.universalJournal.length);
    fiDoc = {
      belnr: fiDocNo,
      bukrs: params.kunrg === 'TR1923' ? '1010' : 'TR01',
      gjahr: '2025',
      blart: 'RV',
      bldat: todayStr,
      awtyp: 'VBRK',
      awkey: billNo,
      waers: params.waerk,
      headerText: `VF01 F2 Satış Faturası (${billNo} - ${params.kunrg})`,
      lines: [
        {
          buzei: '001',
          hkont: '120000',
          accountName: `Alıcılar (${params.kunrg} ${params.kunrgName})`,
          shkzg: 'S',
          wrbtr: Number((params.netwr + params.mwsbk).toFixed(2)),
          kunnr: params.kunrg,
        },
        {
          buzei: '002',
          hkont: '600000',
          accountName: 'Yurtiçi / İhraç Satışlar Geliri (VKOA-ERL)',
          shkzg: 'H',
          wrbtr: Number(params.netwr.toFixed(2)),
        },
        {
          buzei: '003',
          hkont: '391000',
          accountName: 'Hesaplanan KDV (MWST)',
          shkzg: 'H',
          wrbtr: Number(params.mwsbk.toFixed(2)),
        },
      ],
    };
  }

  const newBilling: SapBillingRecord = {
    vbeln: billNo,
    fkart: params.fkart,
    fkartDesc:
      params.fkart === 'F2'
        ? 'F2 - Standart Ticari Fatura (FI/ACDOCA Entegre)'
        : params.fkart === 'F5'
        ? 'F5 - Sipariş Bazlı Proforma Fatura (FI Kaydı Üretmez)'
        : 'F8 - Teslimat Bazlı Proforma Fatura (İhracat/Gümrük - FI Kaydı Üretmez)',
    isProforma,
    vgbel: params.refDocNo,
    kunrg: params.kunrg,
    kunrgName: params.kunrgName,
    fkdat: todayStr,
    netwr: params.netwr,
    mwsbk: params.mwsbk,
    waerk: params.waerk,
    rfbsk: isProforma ? 'D' : 'C',
    belnr: fiDoc?.belnr,
  };

  const newFlow: SapDocumentFlowLink = {
    id: `df-bill-${Date.now()}`,
    vbelv: params.refDocNo,
    vbtyp_v: params.fkart === 'F5' ? 'C (Satış Siparişi)' : 'J (Giden Teslimat)',
    vbeln: billNo,
    vbtyp_n: isProforma ? `U (${params.fkart} Proforma Fatura)` : 'M (F2 Ticari Fatura)',
    rfmng: 20,
    rfwrt: params.netwr,
    waers: params.waerk,
    erdat: todayStr,
    statusText: isProforma
      ? 'Proforma (RFBSK=D: Muhasebe Belgesi Yok)'
      : `ACDOCA FI Belgesi: ${fiDoc?.belnr}`,
  };

  const updatedDeliveries = db.deliveries.map((d) =>
    d.vbeln === params.refDocNo && !isProforma ? { ...d, fkstk: 'C' as const } : d
  );

  const updatedDb: SapDatabaseState = {
    ...db,
    deliveries: updatedDeliveries,
    billings: [newBilling, ...db.billings],
    universalJournal: fiDoc ? [fiDoc, ...db.universalJournal] : db.universalJournal,
    docFlow: [newFlow, ...db.docFlow],
  };
  saveSapDatabase(updatedDb);

  return {
    ok: true,
    billing: newBilling,
    fiDoc,
  };
}

/**
 * MIGO 101: Satınalma Siparişine İstinaden Mal Kabulü
 */
export function executeMigoGoodsReceipt(params: {
  poNumber: string;
  items: Array<{ malzeme: string; kisaMetin: string; miktar: number; birim: string; fiyat: number }>;
}): { matDoc: SapMaterialDocRecord; fiDoc: SapUniversalJournalEntry } {
  const db = loadSapDatabase();
  const updatedMaterials = [...db.materials];
  let totalValue = 0;

  for (const item of params.items) {
    totalValue += item.miktar * item.fiyat;
    const idx = updatedMaterials.findIndex((m) => m.matnr === item.malzeme);
    if (idx !== -1) {
      updatedMaterials[idx] = {
        ...updatedMaterials[idx],
        labst: updatedMaterials[idx].labst + item.miktar,
      };
    }
  }

  const matDocNo = String(5000031892 + db.materialDocs.length);
  const fiDocNo = String(5100004410 + db.universalJournal.length);
  const todayStr = new Date().toLocaleDateString('tr-TR');

  const matDoc: SapMaterialDocRecord = {
    mblnr: matDocNo,
    mjahr: '2025',
    vgart: 'WE',
    bwart: '101',
    budat: todayStr,
    refDoc: params.poNumber,
    matnr: params.items.map((i) => i.malzeme).join(', '),
    maktx: params.items.map((i) => `${i.kisaMetin} (+${i.miktar} ${i.birim})`).join(', '),
    menge: params.items.reduce((a, b) => a + b.miktar, 0),
    meins: params.items[0]?.birim || 'ST',
    werks: '1000',
    lgort: '0001',
    fiDocNo,
  };

  const fiDoc: SapUniversalJournalEntry = {
    belnr: fiDocNo,
    bukrs: 'TR01',
    gjahr: '2025',
    blart: 'WE',
    bldat: todayStr,
    awtyp: 'MKPF',
    awkey: matDocNo,
    waers: 'TRY',
    headerText: `MIGO 101 Mal Girişi (${params.poNumber})`,
    lines: [
      {
        buzei: '001',
        hkont: '150000',
        accountName: 'İlk Madde ve Malzeme Stoğu (OBYC-BSX)',
        shkzg: 'S',
        wrbtr: totalValue,
      },
      {
        buzei: '002',
        hkont: '159900',
        accountName: 'MG/FG Mal Girişi Fatura Girişi Denkleştirme (OBYC-WRX)',
        shkzg: 'H',
        wrbtr: totalValue,
      },
    ],
  };

  saveSapDatabase({
    ...db,
    materials: updatedMaterials,
    materialDocs: [matDoc, ...db.materialDocs],
    universalJournal: [fiDoc, ...db.universalJournal],
  });

  return { matDoc, fiDoc };
}

/**
 * BP (Business Partner): Yeni İş Ortağı Yaratma ve CVI Senkronizasyonu
 */
export function createBusinessPartnerRecord(bp: Omit<SapBusinessPartner, 'cviSyncedCustomerNo' | 'cviSyncedVendorNo'>): SapBusinessPartner {
  const db = loadSapDatabase();
  const isCust = bp.roles.includes('FLCU00') || bp.roles.includes('FLCU01');
  const isVend = bp.roles.includes('FLVN00') || bp.roles.includes('FLVN01');

  const fullBp: SapBusinessPartner = {
    ...bp,
    cviSyncedCustomerNo: isCust ? bp.bpNumber : undefined,
    cviSyncedVendorNo: isVend ? bp.bpNumber : undefined,
  };

  saveSapDatabase({
    ...db,
    businessPartners: [fullBp, ...db.businessPartners.filter((x) => x.bpNumber !== bp.bpNumber)],
  });

  return fullBp;
}
