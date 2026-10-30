/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SIMULATION_SCREENS } from '../data/sapModulesData';
import { GUIDED_MISSIONS } from '../data/guidedMissionData';
import { SimulationTableItem } from '../types/sap';
import { sapSound } from '../utils/audioEffects';

interface ClassicSapGuiWindowProps {
  currentTCode: string;
  onSelectTCode: (tCode: string) => void;
  onReturnToEasyAccess: () => void;
  guidedStepIndex?: number;
  onStepComplete?: () => void;
}

export const ClassicSapGuiWindow: React.FC<ClassicSapGuiWindowProps> = ({
  currentTCode,
  onSelectTCode,
  onReturnToEasyAccess,
  guidedStepIndex = 0,
  onStepComplete,
}) => {
  const targetTCode = SIMULATION_SCREENS[currentTCode] ? currentTCode : 'VA01';
  const screen = SIMULATION_SCREENS[targetTCode];
  const guidedSteps = GUIDED_MISSIONS[targetTCode] || [];
  const currentGuidedStep = guidedSteps[guidedStepIndex];

  // Simulator states
  const [commandText, setCommandText] = useState<string>(`/n${targetTCode}`);
  const [activeTab, setActiveTab] = useState<string>(screen.tabs[0]?.id || '');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [tableItems, setTableItems] = useState<SimulationTableItem[]>(screen.defaultTableItems || []);
  const [migoItemOk, setMigoItemOk] = useState<boolean>(false);
  const [glLines, setGlLines] = useState([
    { account: '770000', name: 'Genel Yönetim Giderleri', dc: 'S', amount: 15000, costCenter: '1000' },
    { account: '102000', name: 'Garanti Ticari Mevduat', dc: 'H', amount: 15000, costCenter: '' },
  ]);

  // F4 Matchcode Dialog State
  const [f4Modal, setF4Modal] = useState<{
    open: boolean;
    fieldId: string;
    fieldLabel: string;
    options: Array<{ code: string; text: string }>;
  } | null>(null);

  // Status Bar
  const [statusBar, setStatusBar] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    code: string;
    text: string;
  }>({
    type: screen.statusBarOnLoad.type,
    code: screen.statusBarOnLoad.code,
    text: screen.statusBarOnLoad.message,
  });

  // Sync state on T-Code change
  useEffect(() => {
    setCommandText(`/n${targetTCode}`);
    setActiveTab(screen.tabs[0]?.id || '');
    setStatusBar({
      type: screen.statusBarOnLoad.type,
      code: screen.statusBarOnLoad.code,
      text: screen.statusBarOnLoad.message,
    });
    setMigoItemOk(false);

    const initialValues: Record<string, string> = {};
    screen.headerFields.forEach((f) => {
      if (f.defaultValue) initialValues[f.id] = f.defaultValue;
    });
    screen.tabs.forEach((tab) => {
      tab.fields?.forEach((f) => {
        if (f.defaultValue) initialValues[f.id] = f.defaultValue;
      });
    });
    setFormData(initialValues);
    setTableItems(screen.defaultTableItems || []);
  }, [targetTCode]);

  // Command submit
  // Command submit
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = commandText.trim().toUpperCase();

    if (clean === '/N' || clean === '/O') {
      sapSound.playClick();
      onReturnToEasyAccess();
      return;
    }

    let parsed = clean;
    if (parsed.startsWith('/N')) parsed = parsed.substring(2);
    else if (parsed.startsWith('/O')) parsed = parsed.substring(2);

    if (SIMULATION_SCREENS[parsed]) {
      sapSound.playEnter();
      onSelectTCode(parsed);
    } else {
      sapSound.playError();
      setStatusBar({
        type: 'error',
        code: 'SY 002',
        text: `"${commandText}" işlem kodu bulunamadı. Lütfen VA01, VL01N, VF01, MIGO veya FB50 deneyin.`,
      });
    }
  };

  // Save handler
  const handleSave = () => {
    if (targetTCode === 'MIGO' && !migoItemOk) {
      sapSound.playError();
      setStatusBar({
        type: 'error',
        code: 'MIGO 019',
        text: 'Kayıt yapılamadı: Lütfen alt sekmedeki "Kalem Tamam (Item OK)" kutusunu işaretleyin!',
      });
      return;
    }

    const missing = screen.headerFields.find((f) => f.required && !formData[f.id]);
    if (missing) {
      sapSound.playError();
      setStatusBar({
        type: 'error',
        code: 'V1 005',
        text: `Zorunlu alan boş bırakılamaz: ${missing.label}`,
      });
      return;
    }

    const docNo =
      targetTCode === 'VA01'
        ? `0000014${Math.floor(100 + Math.random() * 900)}`
        : targetTCode === 'VL01N'
        ? `800019${Math.floor(10 + Math.random() * 90)}`
        : targetTCode === 'VF01'
        ? `900045${Math.floor(10 + Math.random() * 90)}`
        : targetTCode === 'MIGO'
        ? `5000031${Math.floor(100 + Math.random() * 900)}`
        : `1900002${Math.floor(100 + Math.random() * 900)}`;

    const text = screen.saveSuccessMessage.messageTemplate.replace('{docNo}', docNo);
    sapSound.playSaveSuccess();
    setStatusBar({
      type: 'success',
      code: screen.saveSuccessMessage.code,
      text,
    });

    if (onStepComplete) onStepComplete();
  };

  // Open F4 Search Dialog
  const openF4Dialog = (fieldId: string, label: string) => {
    sapSound.playClick();
    let options: Array<{ code: string; text: string }> = [];

    if (fieldId === 'auart') {
      options = [
        { code: 'ZOR', text: 'Standart Türkiye Siparişi (e-Fatura Entegre)' },
        { code: 'OR', text: 'Standart Sipariş (Global)' },
        { code: 'RE', text: 'İade Siparişi' },
        { code: 'FD', text: 'Bedelsiz Teslimat Siparişi' },
      ];
    } else if (fieldId === 'vkorg') {
      options = [
        { code: '1000', text: 'TR Şirket Satış Merkezi (İstanbul)' },
        { code: '2000', text: 'TR Fabrika Satış (İzmir)' },
      ];
    } else if (fieldId === 'vtweg') {
      options = [
        { code: '10', text: 'Toptan Satış (Bayi / Distribütör)' },
        { code: '20', text: 'Doğrudan Perakende Satış' },
        { code: '30', text: 'E-Ticaret Kanalı' },
      ];
    } else if (fieldId === 'spart') {
      options = [
        { code: '00', text: 'Bütün Bölümler (Genel Gam)' },
        { code: '01', text: 'Kimyevi & Hammadde' },
        { code: '02', text: 'Makine & Yedek Parça' },
      ];
    } else if (fieldId === 'kunnr') {
      options = [
        { code: '100021', text: 'Koçak Lojistik & Sanayi A.Ş. (VKN: 5480219482)' },
        { code: '100045', text: 'Anadolu Bilişim Teknolojileri Ltd. (VKN: 1049281729)' },
        { code: '100088', text: 'Doğu Marmara Dağıtım Ticaret (VKN: 3918274619)' },
      ];
    } else {
      options = [
        { code: '1000', text: 'Gebze Ana Sevkiyat Rampası' },
        { code: '1010', text: 'Dilovası Depo Rampası' },
      ];
    }

    setF4Modal({
      open: true,
      fieldId,
      fieldLabel: label,
      options,
    });
  };

  const selectF4Value = (code: string) => {
    if (!f4Modal) return;
    sapSound.playEnter();
    setFormData({ ...formData, [f4Modal.fieldId]: code });
    setF4Modal(null);
  };

  // Calculations
  const totalAmount = tableItems.reduce((acc, curr) => acc + curr.miktar * curr.fiyat, 0);
  const kdvAmount = totalAmount * 0.2;
  const grandTotal = totalAmount + kdvAmount;

  const totalDebit = glLines.filter((l) => l.dc === 'S').reduce((acc, l) => acc + Number(l.amount), 0);
  const totalCredit = glLines.filter((l) => l.dc === 'H').reduce((acc, l) => acc + Number(l.amount), 0);
  const ficoDiff = totalDebit - totalCredit;

  return (
    <div className="w-full bg-[#ECE9D8] text-slate-900 font-sans border-2 border-[#7192BF] shadow-2xl rounded-sm overflow-hidden text-xs select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. CLASSIC WINDOWS WINDOW HEADER (SAP GUI TITLEBAR) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-[#2B547E] via-[#356597] to-[#1E3F66] text-white px-2.5 py-1 flex items-center justify-between font-sans border-b border-[#1E3F66]">
        <div className="flex items-center gap-2">
          {/* Authentic SAP Cube / Diamond Icon */}
          <div className="w-4 h-4 bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 rounded-sm flex items-center justify-center font-bold text-[9px] text-slate-950 shadow-inner">
            S
          </div>
          <span className="font-semibold text-xs tracking-tight">
            [PRD(1)/100] {screen.screenTitle}
          </span>
        </div>

        {/* Windows Window Buttons: Minimize, Maximize, Close */}
        <div className="flex items-center gap-1">
          <button
            onClick={onReturnToEasyAccess}
            className="w-4 h-4 bg-[#ECE9D8] text-slate-900 border border-[#7192BF] hover:bg-slate-200 flex items-center justify-center text-[10px] font-bold leading-none"
            title="SAP Easy Access Ana Menüsüne Dön"
          >
            _
          </button>
          <div className="w-4 h-4 bg-[#ECE9D8] text-slate-900 border border-[#7192BF] flex items-center justify-center text-[10px] font-bold leading-none">
            □
          </div>
          <button
            onClick={onReturnToEasyAccess}
            className="w-4 h-4 bg-[#ECE9D8] hover:bg-red-600 hover:text-white text-slate-900 border border-[#7192BF] flex items-center justify-center text-[10px] font-bold leading-none"
            title="Çıkış (Ana Menüye Dön)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CLASSIC SAP MENU BAR (Menü, Düzenle, Favoriler...) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#ECE9D8] border-b border-[#A0A0A0] px-2 py-0.5 flex items-center gap-4 text-xs text-slate-800">
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Menü</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Düzenle</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Favoriler</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Ekler</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Sistem</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1.5 py-0.5 cursor-pointer">Yardım</span>

        <button
          onClick={onReturnToEasyAccess}
          className="ml-auto text-[11px] font-semibold text-[#1E3F66] hover:underline flex items-center gap-1"
        >
          <span>📁 SAP Easy Access Ağacına Dön (/n)</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CLASSIC SAP STANDARD TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-b from-[#F7F7F7] to-[#E0DFD8] border-b border-[#A0A0A0] px-2 py-1 flex flex-wrap items-center justify-between gap-2 shadow-inner">
        {/* Command field with Green Checkmark */}
        <form onSubmit={handleCommand} className="flex items-center gap-1">
          <input
            type="text"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            className="w-32 bg-white text-slate-900 px-1.5 py-0.5 text-xs font-mono font-bold border-2 border-[#7F9DB9] shadow-inner uppercase focus:outline-none focus:border-[#316AC5]"
            title="SAP Komut Satırı (/nVA01, /nMIGO, /nFB50 veya /n)"
          />
          <button
            type="submit"
            className="w-6 h-6 bg-gradient-to-b from-[#8BD26F] to-[#4EA932] hover:brightness-110 border border-[#2E6E1D] rounded-full flex items-center justify-center text-white font-bold shadow-sm"
            title="Giriş / Enter (Yeşil Onay Dairesi)"
          >
            ✔
          </button>
        </form>

        {/* Classic Standard Action Icons */}
        <div className="flex items-center gap-1">
          {/* Save Floppy Disk */}
          <button
            onClick={handleSave}
            className="px-2 py-0.5 bg-gradient-to-b from-[#F2F2F2] to-[#D8D7CF] hover:bg-[#EAEAEA] border border-[#8A8982] rounded-sm flex items-center gap-1 shadow-sm active:translate-y-px"
            title="Kaydet (Ctrl + S)"
          >
            <div className="w-4 h-4 bg-blue-600 rounded-sm border border-slate-700 flex flex-col justify-between p-0.5">
              <div className="w-full h-1 bg-white" />
              <div className="w-2 h-1.5 bg-yellow-400 self-end" />
            </div>
            <span className="font-semibold text-slate-800 text-[11px]">Kaydet</span>
          </button>

          {/* Green Back Arrow (F3) */}
          <button
            onClick={onReturnToEasyAccess}
            className="w-6 h-6 bg-gradient-to-b from-[#8BD26F] to-[#4EA932] hover:brightness-110 border border-[#2E6E1D] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
            title="Geri (F3)"
          >
            ◀
          </button>

          {/* Yellow Exit Arrow (Shift + F3) */}
          <button
            onClick={onReturnToEasyAccess}
            className="w-6 h-6 bg-gradient-to-b from-[#FFD34E] to-[#F1B51A] hover:brightness-110 border border-[#B38308] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
            title="Çıkış (Shift + F3)"
          >
            ▲
          </button>

          {/* Red Cancel X (F12) */}
          <button
            onClick={() => setStatusBar({ type: 'warning', code: 'SY 003', text: 'Giriş iptal edildi (F12).' })}
            className="w-6 h-6 bg-gradient-to-b from-[#E75D5D] to-[#C92A2A] hover:brightness-110 border border-[#8C1616] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
            title="İptal (F12)"
          >
            ✕
          </button>

          <div className="w-px h-5 bg-[#A0A0A0] mx-1" />

          {/* Classic Print / Find icons */}
          <div className="w-6 h-6 bg-[#E8E7E0] border border-[#A0A0A0] rounded-sm flex items-center justify-center text-slate-700 cursor-pointer" title="Yazdır (Ctrl+P)">
            🖨️
          </div>
          <div className="w-6 h-6 bg-[#E8E7E0] border border-[#A0A0A0] rounded-sm flex items-center justify-center text-slate-700 cursor-pointer" title="Bul (Ctrl+F)">
            🔍
          </div>

          <div className="w-px h-5 bg-[#A0A0A0] mx-1" />

          {/* New Session Button */}
          <div
            onClick={() => {
              setStatusBar({ type: 'info', code: 'SY 090', text: 'Yeni oturum açıldı: [PRD(2)/100]' });
            }}
            className="w-6 h-6 bg-[#E8E7E0] border border-[#A0A0A0] rounded-sm flex items-center justify-center text-slate-700 cursor-pointer text-xs"
            title="Yeni Oturum Yarat (/o)"
          >
            ✳
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. CLASSIC SAP APPLICATION TITLE & TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#DCE4EC] border-b border-[#A0A0A0] px-3 py-1 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1E3F66] text-sm tracking-tight font-sans">
            {screen.screenTitle}
          </span>
          <span className="text-[10px] bg-[#C4D5E7] text-[#1E3F66] font-mono px-1.5 py-0.5 rounded border border-[#A5C0DD]">
            T-Code: {targetTCode}
          </span>
        </div>

        {/* Classic Beveled Application Buttons */}
        <div className="flex items-center gap-1">
          {(targetTCode === 'VA01' || targetTCode === 'VA03') && (
            <button
              onClick={() => {
                onSelectTCode('VA03');
                setStatusBar({
                  type: 'info',
                  code: 'V1 200',
                  text: 'Belge akışı açıldı (F5): Sipariş ➡️ Teslimat ➡️ Fatura ➡️ Muhasebe Belgesi zinciri.',
                });
              }}
              className="px-2.5 py-0.5 bg-[#EAE8E1] hover:bg-[#DCDAD2] border border-[#8A8982] rounded-sm font-semibold text-slate-800 text-[11px] flex items-center gap-1 shadow-sm active:translate-y-px"
              title="Belge Akışı (Document Flow - F5)"
            >
              <span>📄 Belge Akışı (F5)</span>
            </button>
          )}

          {targetTCode === 'MM01' && (
            <button
              onClick={() => {
                setStatusBar({
                  type: 'info',
                  code: 'MM 010',
                  text: 'Görünümler seçildi: Temel Veriler 1, Satın Alma, Depo 1, Muhasebe 1.',
                });
              }}
              className="px-2.5 py-0.5 bg-[#EAE8E1] hover:bg-[#DCDAD2] border border-[#8A8982] rounded-sm font-semibold text-slate-800 text-[11px] flex items-center gap-1 shadow-sm"
              title="Görünüm Seçimi (Views Dialog)"
            >
              <span>📋 Görünüm Seçimi</span>
            </button>
          )}

          {targetTCode === 'ME21N' && (
            <button
              onClick={() => {
                setStatusBar({
                  type: 'info',
                  code: 'ME 024',
                  text: 'SAS denetlendi: 50 Adet Paslanmaz Çelik Vida için bütçe ve tolerans onaylandı.',
                });
              }}
              className="px-2.5 py-0.5 bg-[#EAE8E1] hover:bg-[#DCDAD2] border border-[#8A8982] rounded-sm font-semibold text-slate-800 text-[11px] flex items-center gap-1 shadow-sm"
              title="Kontrol Et (Check - Ctrl+F2)"
            >
              <span>🔍 Kontrol Et (Ctrl+F2)</span>
            </button>
          )}

          {(targetTCode === 'MIRO' || targetTCode === 'FB60' || targetTCode === 'FB50') && (
            <button
              onClick={() => {
                setStatusBar({
                  type: 'info',
                  code: 'FI 004',
                  text: 'Simülasyon (F9): Borç ve Alacak kayıtları dengede (Fark: 0,00 TL). Kaydedebilirsiniz.',
                });
              }}
              className="px-2.5 py-0.5 bg-[#EAE8E1] hover:bg-[#DCDAD2] border border-[#8A8982] rounded-sm font-semibold text-slate-800 text-[11px] flex items-center gap-1 shadow-sm"
              title="Simüle Et (F9)"
            >
              <span>🧮 Simüle Et (F9)</span>
            </button>
          )}

          {targetTCode === 'VL01N' && (
            <button
              onClick={handleSave}
              className="px-2.5 py-0.5 bg-gradient-to-b from-[#8BD26F] to-[#51AC35] text-white border border-[#2E6E1D] font-bold text-xs rounded-sm shadow-sm flex items-center gap-1"
            >
              <span>🚚 Mal Çıkışını Kaydet (PGI)</span>
            </button>
          )}

          {targetTCode === 'FB50' && (
            <div className="flex items-center gap-1.5 bg-white border border-[#A0A0A0] px-2 py-0.5 rounded-sm">
              <span className="text-[11px] font-mono">Bakiye:</span>
              <span className={`w-3 h-3 rounded-full ${ficoDiff === 0 ? 'bg-green-600' : 'bg-red-600'}`} />
              <span className="font-mono font-bold text-[11px]">{ficoDiff.toLocaleString('tr-TR')} TL</span>
            </div>
          )}

          <button
            onClick={() => {
              setStatusBar({ type: 'info', code: 'SY 101', text: 'Tüm alanlar kontrol edildi: Hata yok.' });
            }}
            className="px-2 py-0.5 bg-[#EAE8E1] hover:bg-[#DCDAD2] border border-[#8A8982] rounded-sm font-semibold text-slate-800 text-[11px]"
          >
            Kontrol et
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. CLASSIC SAP DYNPRO FORM (Beige background with grooved group boxes) */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 space-y-4 bg-[#ECE9D8] min-h-[480px] overflow-y-auto">
        
        {/* Classic Etched Group Box for Organization Data */}
        <fieldset className="border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white p-3 pt-1 rounded-none bg-[#ECE9D8]">
          <legend className="px-1 text-slate-800 font-bold text-xs">
            Organizasyonel Veriler & Parametreler
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pt-2">
            {screen.headerFields.map((field) => (
              <div key={field.id} className="flex items-center justify-between text-xs">
                {/* Dotted label like in real SAP */}
                <label className="text-slate-800 font-medium whitespace-nowrap pr-2">
                  <span>{field.label}</span>
                  <span className="text-slate-500 font-mono tracking-widest pl-1">. . . . .</span>
                  {field.required && <span className="text-red-600 font-bold ml-1">*</span>}
                </label>

                {/* Input box with classic F4 Matchcode icon [▤] */}
                <div className="flex items-center">
                  <input
                    type="text"
                    value={formData[field.id] || field.defaultValue || ''}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-36 bg-white text-slate-900 px-1.5 py-0.5 text-xs font-mono font-bold border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white focus:outline-none uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => openF4Dialog(field.id, field.label)}
                    className="w-5 h-5 bg-[#ECE9D8] hover:bg-slate-300 border border-[#808080] flex items-center justify-center text-[10px] font-bold text-slate-800 ml-0.5 shadow-sm active:translate-y-px"
                    title={`Değer Seçimi (F4 Matchcode): ${field.label}`}
                  >
                    ▤
                  </button>
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Classic SAP Tab Strip */}
        {screen.tabs.length > 0 && (
          <div className="space-y-0">
            <div className="flex items-end gap-0.5 border-b-2 border-[#808080] px-1 text-xs">
              {screen.tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sapSound.playClick();
                      setActiveTab(tab.id);
                    }}
                    className={`px-3 py-1 font-semibold rounded-t-sm border-2 border-b-0 transition-none ${
                      isActive
                        ? 'bg-[#ECE9D8] border-t-white border-l-white border-r-[#808080] text-slate-950 font-bold -mb-[2px] pb-1.5 shadow-sm'
                        : 'bg-[#DCDAD2] border-[#808080] text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#ECE9D8] p-3 space-y-3">
              {screen.tabs.map((tab) => {
                if (tab.id !== activeTab) return null;

                return (
                  <div key={tab.id} className="space-y-3">
                    {/* Specific tab fields */}
                    {tab.fields && tab.fields.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {tab.fields.map((f) => (
                          <div key={f.id} className="flex items-center justify-between text-xs">
                            <label className="text-slate-800 font-medium whitespace-nowrap pr-2">
                              <span>{f.label}</span>
                              <span className="text-slate-500 font-mono tracking-widest pl-1">. . . .</span>
                            </label>
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={formData[f.id] || f.defaultValue || ''}
                                onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
                                className="w-48 bg-white text-slate-900 px-1.5 py-0.5 text-xs font-mono border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white"
                              />
                              <button
                                type="button"
                                onClick={() => openF4Dialog(f.id, f.label)}
                                className="w-5 h-5 bg-[#ECE9D8] hover:bg-slate-300 border border-[#808080] flex items-center justify-center text-[10px] font-bold text-slate-800 ml-0.5 shadow-sm"
                              >
                                ▤
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Classic ALV Grid Table for Items */}
                    {(tab.tableType === 'items' || tab.tableType === 'delivery_items') && (
                      <div className="border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-white overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead className="bg-[#DCE4EC] border-b border-[#808080] text-slate-900 font-semibold font-mono text-[11px]">
                            <tr>
                              <th className="w-6 py-1 px-1 bg-[#C8D5E5] border-r border-[#808080] text-center">■</th>
                              <th className="py-1 px-2 border-r border-[#808080]">Kalem</th>
                              <th className="py-1 px-2 border-r border-[#808080]">Malzeme</th>
                              <th className="py-1 px-2 border-r border-[#808080]">Kısa Metin</th>
                              <th className="py-1 px-2 border-r border-[#808080] text-right">Sipariş Mik.</th>
                              <th className="py-1 px-2 border-r border-[#808080]">SU</th>
                              <th className="py-1 px-2 border-r border-[#808080] text-right">Net Fiyat</th>
                              <th className="py-1 px-2 border-r border-[#808080] text-right">Tutar (TRY)</th>
                              {targetTCode === 'MIGO' && (
                                <th className="py-1 px-2 text-center bg-yellow-100 text-yellow-900 font-bold">
                                  Kalem Tamam (Item OK)
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E0E0E0] font-mono">
                            {tableItems.map((item, idx) => (
                              <tr key={item.kalemNo} className="hover:bg-[#EBF2FA]">
                                <td className="py-0.5 px-1 bg-[#DCE4EC] border-r border-[#808080] text-center text-[10px] text-slate-600">
                                  ►
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0]">{item.kalemNo}</td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] font-bold text-blue-900">
                                  {item.malzeme}
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] text-slate-800">
                                  {item.kisaMetin}
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] text-right">
                                  <input
                                    type="number"
                                    value={item.miktar}
                                    onChange={(e) => {
                                      const updated = [...tableItems];
                                      updated[idx].miktar = Number(e.target.value);
                                      setTableItems(updated);
                                    }}
                                    className="w-16 bg-white border border-[#7F9DB9] px-1 text-right text-xs font-bold"
                                  />
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0]">{item.birim}</td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] text-right">
                                  {item.fiyat.toLocaleString('tr-TR')}
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] text-right font-bold">
                                  {(item.miktar * item.fiyat).toLocaleString('tr-TR')}
                                </td>
                                {targetTCode === 'MIGO' && (
                                  <td className="py-0.5 px-2 text-center bg-yellow-50">
                                    <label className="inline-flex items-center gap-1 cursor-pointer font-bold text-yellow-900">
                                      <input
                                        type="checkbox"
                                        checked={migoItemOk}
                                        onChange={(e) => setMigoItemOk(e.target.checked)}
                                        className="w-4 h-4 cursor-pointer"
                                      />
                                      <span>Kalem Tamam ☑</span>
                                    </label>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Classic ALV Bottom Summary */}
                        {targetTCode !== 'MIGO' && (
                          <div className="bg-[#ECE9D8] border-t border-[#808080] px-3 py-1 flex items-center justify-between text-xs font-mono font-bold text-slate-800">
                            <span>Kalem: {tableItems.length}</span>
                            <div className="flex items-center gap-4">
                              <span>Matrah: {totalAmount.toLocaleString('tr-TR')} TRY</span>
                              <span>KDV (%20): {kdvAmount.toLocaleString('tr-TR')} TRY</span>
                              <span className="text-blue-900 font-extrabold text-sm">
                                Genel Toplam: {grandTotal.toLocaleString('tr-TR')} TRY
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Classic Accounting Lines Table for FB50 */}
                    {tab.tableType === 'accounting_lines' && (
                      <div className="border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-white overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse font-mono">
                          <thead className="bg-[#DCE4EC] border-b border-[#808080] text-slate-900 font-semibold text-[11px]">
                            <tr>
                              <th className="w-6 py-1 px-1 bg-[#C8D5E5] border-r border-[#808080] text-center">■</th>
                              <th className="py-1 px-2 border-r border-[#808080]">G/L Hesap</th>
                              <th className="py-1 px-2 border-r border-[#808080]">Hesap Tanımı (TDHP)</th>
                              <th className="py-1 px-2 border-r border-[#808080]">B/A</th>
                              <th className="py-1 px-2 border-r border-[#808080] text-right">Tutar (TRY)</th>
                              <th className="py-1 px-2">Masraf Yeri</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E0E0E0]">
                            {glLines.map((line, idx) => (
                              <tr key={idx} className="hover:bg-[#EBF2FA]">
                                <td className="py-0.5 px-1 bg-[#DCE4EC] border-r border-[#808080] text-center text-[10px]">
                                  {idx + 1}
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] font-bold">{line.account}</td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0]">{line.name}</td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] font-bold">
                                  {line.dc === 'S' ? 'Borç (S)' : 'Alacak (H)'}
                                </td>
                                <td className="py-0.5 px-2 border-r border-[#E0E0E0] text-right font-bold">
                                  {line.amount.toLocaleString('tr-TR')}
                                </td>
                                <td className="py-0.5 px-2">{line.costCenter || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. CLASSIC SAP 3D SUNKEN STATUS BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#D8D6CC] border-t border-[#808080] px-2 py-0.5 flex items-center justify-between font-mono text-[11px] text-slate-800">
        {/* Left Status Message in 3D sunken box */}
        <div className="flex-1 bg-white border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-2 py-0.5 flex items-center gap-2 truncate mr-2">
          {statusBar.type === 'success' ? (
            <span className="w-3.5 h-3.5 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0">
              ✔
            </span>
          ) : statusBar.type === 'error' ? (
            <span className="w-3.5 h-3.5 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0">
              ✕
            </span>
          ) : (
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 text-slate-900 flex items-center justify-center font-bold text-[9px] shrink-0">
              !
            </span>
          )}
          <span className="font-bold text-slate-900">[{statusBar.code}]</span>
          <span className="truncate">{statusBar.text}</span>
        </div>

        {/* Right Sunken Technical Info Boxes */}
        <div className="flex items-center gap-1 shrink-0 text-[10px]">
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5">
            PRD(1)/100
          </div>
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5">
            sap-app01
          </div>
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5">
            OVR
          </div>
          <div className="bg-[#ECE9D8] border border-t-[#808080] border-l-[#808080] border-r-white border-b-white px-1.5 py-0.5 font-bold">
            INS
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 7. CLASSIC F4 MATCHCODE SEARCH POPUP DIALOG */}
      {/* ------------------------------------------------------------- */}
      {f4Modal && f4Modal.open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#ECE9D8] border-2 border-[#7192BF] rounded-none shadow-2xl w-full max-w-md overflow-hidden text-xs">
            {/* F4 Dialog Window Header */}
            <div className="bg-gradient-to-r from-[#2B547E] to-[#1E3F66] text-white px-2 py-1 flex items-center justify-between font-bold">
              <span>Değer Seçimi (F4): {f4Modal.fieldLabel}</span>
              <button
                onClick={() => setF4Modal(null)}
                className="w-4 h-4 bg-[#ECE9D8] hover:bg-red-600 hover:text-white text-slate-900 border border-[#7192BF] flex items-center justify-center text-[10px]"
              >
                ✕
              </button>
            </div>

            {/* F4 Dialog Body */}
            <div className="p-3 space-y-2">
              <p className="text-[11px] text-slate-700">
                Lütfen listeden bir değer seçin veya çift tıklayın:
              </p>

              <div className="bg-white border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white max-h-56 overflow-y-auto">
                <table className="w-full text-xs text-left border-collapse font-mono">
                  <thead className="bg-[#DCE4EC] border-b border-[#808080]">
                    <tr>
                      <th className="py-1 px-2 border-r border-[#808080]">Kod</th>
                      <th className="py-1 px-2">Tanım</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E0E0]">
                    {f4Modal.options.map((opt) => (
                      <tr
                        key={opt.code}
                        onClick={() => selectF4Value(opt.code)}
                        className="hover:bg-[#316AC5] hover:text-white cursor-pointer transition-colors"
                      >
                        <td className="py-1 px-2 border-r border-[#E0E0E0] font-bold">{opt.code}</td>
                        <td className="py-1 px-2">{opt.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#A0A0A0]">
                <button
                  onClick={() => setF4Modal(null)}
                  className="px-3 py-1 bg-[#ECE9D8] hover:bg-slate-300 border border-[#808080] font-bold rounded-sm text-xs"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
