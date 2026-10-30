/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SAPModuleId, LearningMode } from './types/sap';
import { SAP_MODULES, COORDINATE_MAPS, ARROW_FORMULAS, SIMULATION_SCREENS } from './data/sapModulesData';
import { Header } from './components/Header';
import { ClassicSapGuiWindow } from './components/ClassicSapGuiWindow';
import { SapGuiSimulator } from './components/SapGuiSimulator';
import { SapEasyAccessMenu, UserCorporateRole } from './components/SapEasyAccessMenu';
import { SapFioriLaunchpad } from './components/SapFioriLaunchpad';
import { SapRealScreenshotGuide } from './components/SapRealScreenshotGuide';
import { SapFirstDayGuide } from './components/SapFirstDayGuide';
import { FastTrackMasterclassModal } from './components/FastTrackMasterclassModal';
import { SystemPerformanceDashboard } from './components/SystemPerformanceDashboard';
import { VideoPlayerPanel } from './components/VideoPlayerPanel';
import { CoordinateMapCard } from './components/CoordinateMapCard';
import { ArrowFormulaView } from './components/ArrowFormulaView';
import { QuizLab } from './components/QuizLab';
import { DictionaryModal } from './components/DictionaryModal';
import { TurkeyLocalizationGuide } from './components/TurkeyLocalizationGuide';
import { sapSound } from './utils/audioEffects';
import {
  Terminal,
  Layers,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  ListTree,
  Video,
  Monitor,
  Activity,
  Zap,
} from 'lucide-react';

export default function App() {
  const [currentModule, setCurrentModule] = useState<SAPModuleId>('SD');
  const [currentTCode, setCurrentTCode] = useState<string>('VA01');
  const [learningMode, setLearningMode] = useState<LearningMode>('fiori_launchpad');
  const [userRole, setUserRole] = useState<UserCorporateRole>('sales_manager');
  const [sapTheme, setSapTheme] = useState<'classic_gui' | 'modern_fiori'>('modern_fiori');
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [dictionaryOpen, setDictionaryOpen] = useState<boolean>(false);
  const [screenshotGuideOpen, setScreenshotGuideOpen] = useState<boolean>(false);
  const [firstDayGuideOpen, setFirstDayGuideOpen] = useState<boolean>(false);
  const [fastTrackOpen, setFastTrackOpen] = useState<boolean>(false);
  const [selectedScreenshotId, setSelectedScreenshotId] = useState<string | undefined>(undefined);
  const [quizScore, setQuizScore] = useState<{ answered: number; correct: number }>(() => {
    try {
      const saved = localStorage.getItem('sap_quiz_score');
      return saved ? JSON.parse(saved) : { answered: 0, correct: 0 };
    } catch {
      return { answered: 0, correct: 0 };
    }
  });

  const handleOpenScreenshotGuide = (screenshotId?: string) => {
    setSelectedScreenshotId(screenshotId);
    setScreenshotGuideOpen(true);
  };

  const handleSelectRole = (role: UserCorporateRole) => {
    setUserRole(role);
    switch (role) {
      case 'sales_manager':
        setCurrentModule('SD');
        setCurrentTCode('VA01');
        break;
      case 'logistics_operator':
        setCurrentModule('MM');
        setCurrentTCode('MIGO');
        break;
      case 'finance_controller':
        setCurrentModule('FI');
        setCurrentTCode('FB60');
        break;
      case 'production_planner':
        setCurrentModule('PP');
        setCurrentTCode('CO01');
        break;
      case 'quality_manager':
        setCurrentModule('QM');
        setCurrentTCode('QA32');
        break;
      case 'maintenance_lead':
        setCurrentModule('PM');
        setCurrentTCode('IW31');
        break;
      case 'warehouse_lead':
        setCurrentModule('WM');
        setCurrentTCode('LT01');
        break;
      case 'hr_specialist':
        setCurrentModule('HCM');
        setCurrentTCode('PA30');
        break;
      case 'basis_admin':
        setCurrentModule('BASIS');
        setCurrentTCode('SU01');
        break;
      default:
        setCurrentModule('SD');
        setCurrentTCode('VA01');
        break;
    }
  };

  const handleSelectModule = (mod: SAPModuleId) => {
    setCurrentModule(mod);
    if (SAP_MODULES[mod]) {
      setCurrentTCode(SAP_MODULES[mod].leadTCode);
    }
    if (mod === 'SD') setUserRole('sales_manager');
    else if (mod === 'MM') setUserRole('logistics_operator');
    else if (mod === 'FI' || mod === 'CO' || mod === 'FICO') setUserRole('finance_controller');
    else if (mod === 'PP') setUserRole('production_planner');
    else if (mod === 'QM') setUserRole('quality_manager');
    else if (mod === 'PM') setUserRole('maintenance_lead');
    else if (mod === 'WM') setUserRole('warehouse_lead');
    else if (mod === 'HCM') setUserRole('hr_specialist');
    else if (mod === 'BASIS') setUserRole('basis_admin');
  };

  const handleSelectTCode = (tCode: string) => {
    setCurrentTCode(tCode);
    const simScreen = SIMULATION_SCREENS[tCode];
    if (simScreen && simScreen.module) {
      setCurrentModule(simScreen.module === 'FICO' ? 'FI' : simScreen.module);
      return;
    }
    for (const [modKey, modInfo] of Object.entries(SAP_MODULES)) {
      if (modInfo.tCodes.includes(tCode)) {
        setCurrentModule(modKey as SAPModuleId);
        break;
      }
    }
  };

  const handleUpdateQuizScore = (answered: number, correct: number) => {
    const score = { answered, correct };
    setQuizScore(score);
    try {
      localStorage.setItem('sap_quiz_score', JSON.stringify(score));
    } catch {
      // ignore
    }
  };

  const activeModuleInfo = SAP_MODULES[currentModule];
  const activeCoordinateMap =
    COORDINATE_MAPS[currentTCode] || COORDINATE_MAPS[activeModuleInfo.leadTCode] || COORDINATE_MAPS.VA01;
  const activeArrowFormula =
    ARROW_FORMULAS[currentTCode] || ARROW_FORMULAS[activeModuleInfo.leadTCode] || ARROW_FORMULAS.VA01;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Global Header */}
      <Header
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        learningMode={learningMode}
        onSelectMode={setLearningMode}
        onOpenDictionary={() => setDictionaryOpen(true)}
        onOpenScreenshotGuide={handleOpenScreenshotGuide}
        onOpenFirstDayGuide={() => setFirstDayGuideOpen(true)}
        onOpenFastTrack={() => setFastTrackOpen(true)}
        quizScore={quizScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Module Sub-Header & Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-sky-950 border border-sky-500/30 flex items-center justify-center font-mono font-bold text-sky-400 text-sm">
              {currentModule}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  {activeModuleInfo.fullName}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  {activeModuleInfo.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {activeModuleInfo.description}
              </p>
            </div>
          </div>

          {/* Action Bar: Theme Switcher & Video Toggle */}
          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {/* Fast-Track Crash Course Button */}
            <button
              onClick={() => setFastTrackOpen(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 ring-2 ring-amber-300 animate-bounce"
              title="SAP'yi 3 dakikada hızla öğren: 4 kritik adım, kısayollar ve canlı simülatör"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>HIZLA ÖĞREN (3 Dk)</span>
            </button>

            {/* New SAP First Day Guide Button */}
            <button
              onClick={() => setFirstDayGuideOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/50 shadow-sm"
              title="Yeni SAP aldığımda karşıma bunlar mı çıkacak? Gerçek kurumsal giriş analizi ve rehberi"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Yeni SAP'de İlk Günüm?</span>
            </button>

            {/* Video Toggle Button */}
            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                showVideo
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{showVideo ? 'Videoyu Gizle' : 'Videoyu Göster'}</span>
            </button>

            {/* 13 Video Ekranı Rehberi Modal Button */}
            <button
              onClick={() => handleOpenScreenshotGuide()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 shadow-sm"
              title="YouTube videosundaki 13 orijinal ekran görüntüsünü incele"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>13 Video Ekranı</span>
            </button>

            {/* System Performance Dashboard Jump Button */}
            <button
              onClick={() => setLearningMode('system_performance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                learningMode === 'system_performance'
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-emerald-400 hover:bg-slate-700 border border-emerald-500/40'
              }`}
              title="Throughput, CPU Kullanımı ve BASIS İşlemleri Monitörü (SM50, ST02, ST03N)"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>Sistem Performansı</span>
            </button>

            {/* Fiori Launchpad Jump Button */}
            <button
              onClick={() => setLearningMode('fiori_launchpad')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                learningMode === 'fiori_launchpad'
                  ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-800 text-sky-300 hover:bg-slate-700 border border-sky-500/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Fiori Başlangıç</span>
            </button>

            {/* Easy Access Tree Jump Button */}
            <button
              onClick={() => setLearningMode('easy_access')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                learningMode === 'easy_access'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/40'
              }`}
            >
              <ListTree className="w-3.5 h-3.5 text-amber-400" />
              <span>Ağaç Menü (/n)</span>
            </button>

            {/* Authentic Theme Switcher: Classic SAP GUI vs Modern Fiori */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setSapTheme('classic_gui')}
                className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${
                  sapTheme === 'classic_gui'
                    ? 'bg-[#ECE9D8] text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Videodaki orijinal gri/bej Windows SAP GUI 7.70 görünümü"
              >
                <Monitor className="w-3 h-3 text-slate-800" />
                <span>Klasik GUI</span>
              </button>

              <button
                onClick={() => setSapTheme('modern_fiori')}
                className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${
                  sapTheme === 'modern_fiori'
                    ? 'bg-sky-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Modern S/4HANA WebGUI Belize/Quartz görünümü"
              >
                <Terminal className="w-3 h-3 text-sky-200" />
                <span>WebGUI Belize</span>
              </button>
            </div>

            {/* Module T-Codes */}
            <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-slate-800">
              {activeModuleInfo.tCodes.map((code) => {
                const isActive = currentTCode === code && learningMode === 'simulator';
                return (
                  <button
                    key={code}
                    onClick={() => {
                      handleSelectTCode(code);
                      setLearningMode('simulator');
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/80'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Video Player Panel (Embedded YouTube Course with Timestamp Synchronizer) */}
        {showVideo && (
          <VideoPlayerPanel
            currentModule={currentModule}
            onSyncSapScreen={(tCode) => {
              handleSelectTCode(tCode);
              setLearningMode('simulator');
            }}
          />
        )}

        {/* Dynamic Learning Stage Content: 0. Modern S/4HANA Fiori Launchpad (Default Opening Screen) */}
        {learningMode === 'fiori_launchpad' && (
          <SapFioriLaunchpad
            onSelectTCode={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
            onOpenClassicTree={() => setLearningMode('easy_access')}
            onOpenScreenshotGuide={handleOpenScreenshotGuide}
            onOpenFirstDayGuide={() => setFirstDayGuideOpen(true)}
            onOpenPerformanceDashboard={() => setLearningMode('system_performance')}
            onOpenTurkeyDocs={() => setLearningMode('turkey_localization')}
          />
        )}

        {/* Dynamic Learning Stage Content: 1. Authentic SAP Easy Access Desk */}
        {learningMode === 'easy_access' && (
          <SapEasyAccessMenu
            onSelectTCode={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
            activeTCode={currentTCode}
            userRole={userRole}
            onSelectRole={handleSelectRole}
            onOpenDocumentation={() => setLearningMode('turkey_localization')}
          />
        )}

        {learningMode === 'simulator' && (
          <div className="space-y-4">
            {/* Render Classic Windows SAP GUI or Modern Fiori based on Theme Selector */}
            {sapTheme === 'classic_gui' ? (
              <ClassicSapGuiWindow
                currentTCode={currentTCode}
                onSelectTCode={handleSelectTCode}
                onReturnToEasyAccess={() => setLearningMode('easy_access')}
              />
            ) : (
              <SapGuiSimulator
                currentTCode={currentTCode}
                onSelectTCode={handleSelectTCode}
                onOpenCoordinateMap={() => setLearningMode('coordinate_map')}
                onReturnToMainMenu={() => setLearningMode('fiori_launchpad')}
                onOpenScreenshotGuide={handleOpenScreenshotGuide}
              />
            )}

            {/* Quick Context & Memory Companion Strip below simulator */}
            <div className="space-y-3">
              {/* Expanded Command Line Shortcuts as Interactive Clickable T-Code Buttons */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-sky-950 text-sky-400 border border-sky-800">
                      <Terminal className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        Komut Satırı Kısayolları (Hızlı T-Code Fırlatıcı)
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        SAP komut kutusuna <span className="font-mono text-amber-300">/n[Kod]</span> yazarak veya aşağıdaki butonlara tıklayarak doğrudan ekrana geçiş yapın:
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        sapSound.playEnter();
                        setLearningMode('easy_access');
                      }}
                      className="px-2.5 py-1 text-[11px] font-mono font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 rounded transition-colors flex items-center gap-1.5"
                      title="Ana Easy Access Menüsüne Dön"
                    >
                      <span>/n</span>
                      <span className="font-sans font-normal text-slate-300">(Ana Menü)</span>
                    </button>
                  </div>
                </div>

                {/* Clickable T-Code Buttons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {[
                    { code: 'VA01', name: 'Satış Siparişi Yarat', mod: 'SD' },
                    { code: 'MIGO', name: 'Mal Kabulü (101)', mod: 'MM' },
                    { code: 'FB60', name: 'Satıcı Faturası Girişi', mod: 'FI' },
                    { code: 'CO01', name: 'Üretim Siparişi Yarat', mod: 'PP' },
                    { code: 'VL01N', name: 'Giden Teslimat (PGI)', mod: 'SD' },
                    { code: 'VF01', name: 'Fatura Kesimi (GİB)', mod: 'SD' },
                    { code: 'ME21N', name: 'Satın Alma Siparişi', mod: 'MM' },
                    { code: 'MIRO', name: 'Gelen Satıcı Faturası', mod: 'MM' },
                    { code: 'QA32', name: 'Kalite Muayene Listesi', mod: 'QM' },
                    { code: 'IW31', name: 'Bakım & İş Emri Yarat', mod: 'PM' },
                    { code: 'LT01', name: 'Transfer Siparişi (Raf)', mod: 'WM' },
                    { code: 'SU01', name: 'Kullanıcı & Yetkiler', mod: 'BASIS' },
                    { code: 'SE11', name: 'ABAP Veri Sözlüğü', mod: 'BASIS' },
                    { code: 'FB50', name: 'Mahsup Fişi (TDHP)', mod: 'FI' },
                  ].map((item) => {
                    const isActive = currentTCode === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          sapSound.playEnter();
                          handleSelectTCode(item.code);
                          setLearningMode('simulator');
                        }}
                        className={`p-2 rounded-lg text-left transition-all border flex flex-col justify-between group ${
                          isActive
                            ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400/50 shadow-sm'
                            : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-mono text-xs font-bold text-white group-hover:text-sky-300">
                            /n{item.code}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                              item.mod === 'SD'
                                ? 'bg-sky-950 text-sky-400 border border-sky-800'
                                : item.mod === 'MM'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : item.mod === 'FI'
                                ? 'bg-purple-950 text-purple-400 border border-purple-800'
                                : item.mod === 'PP'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : item.mod === 'QM'
                                ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                : item.mod === 'PM'
                                ? 'bg-orange-950 text-orange-400 border border-orange-800'
                                : item.mod === 'WM'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {item.mod}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 truncate mt-1">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2 Companion Information Strips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5 text-xs">
                  <span className="font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Türkiye Canlı Referans Verileri</span>
                  </span>
                  <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                    Şirket: TR01 | Satış Örgütü: 1000 | Dağıtım Kanalı: 10 <br />
                    Müşteri: 100021 (Koçak Lojistik A.Ş.) | Satıcı: 300045 (Borusan Tedarik) <br />
                    Sipariş Türü: ZOR | KDV: %20 | Tevkifat: 5/10 (601)
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-1.5 text-xs flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-purple-400 uppercase tracking-wide flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Görsel Koordinat Röntgeni & Süreç Adımları</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px] mt-0.5">
                      Ekranın neresinde ne olduğunu, hangi butona ne zaman basılacağını anatomik şemayla incelemek için:
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setLearningMode('coordinate_map')}
                      className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
                    >
                      <span>Koordinat Röntgenini İncele</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-slate-600">·</span>
                    <button
                      onClick={() => setLearningMode('arrow_formula')}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                    >
                      <span>Ok Formülü Rehberi</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {learningMode === 'coordinate_map' && (
          <CoordinateMapCard
            coordinateMap={activeCoordinateMap}
            onLaunchSimulator={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
          />
        )}

        {learningMode === 'arrow_formula' && (
          <ArrowFormulaView
            arrowStep={activeArrowFormula}
            onLaunchSimulator={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
          />
        )}

        {learningMode === 'quiz_lab' && (
          <QuizLab
            onLaunchSimulator={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
            onUpdateScore={handleUpdateQuizScore}
          />
        )}

        {learningMode === 'turkey_localization' && (
          <TurkeyLocalizationGuide
            onSelectTCode={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
          />
        )}

        {learningMode === 'system_performance' && (
          <SystemPerformanceDashboard
            onSelectTCode={(code) => {
              handleSelectTCode(code);
              setLearningMode('simulator');
            }}
            onReturnToMainMenu={() => setLearningMode('fiori_launchpad')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3.5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SAP Akademi Türkiye © 2026 — S/4HANA SD, MM, FICO Canlı Eğitim Sistemi</span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>TheSmartHands Kurs Senkronizasyonu</span>
            <span>·</span>
            <span>Orijinal Windows SAP GUI Arayüzü</span>
          </div>
        </div>
      </footer>

      {/* Bilingual Dictionary Modal */}
      <DictionaryModal
        isOpen={dictionaryOpen}
        onClose={() => setDictionaryOpen(false)}
        onSelectTCode={(code) => {
          handleSelectTCode(code);
          setLearningMode('simulator');
        }}
      />

      {/* Real SAP S/4HANA Video Screenshots Modal Guide */}
      <SapRealScreenshotGuide
        isOpen={screenshotGuideOpen}
        onClose={() => setScreenshotGuideOpen(false)}
        initialScreenshotId={selectedScreenshotId}
        onLaunchSimulator={(code) => {
          handleSelectTCode(code);
          setLearningMode('simulator');
        }}
      />

      {/* Modern SAP First Day & All-Role Guide Modal */}
      <SapFirstDayGuide
        isOpen={firstDayGuideOpen}
        onClose={() => setFirstDayGuideOpen(false)}
        onLaunchTCode={(code) => {
          handleSelectTCode(code);
          setLearningMode('simulator');
        }}
      />

      {/* 3-Minute Fast-Track Crash Course Modal */}
      <FastTrackMasterclassModal
        isOpen={fastTrackOpen}
        onClose={() => setFastTrackOpen(false)}
        onLaunchTCode={(code) => {
          handleSelectTCode(code);
          setLearningMode('simulator');
        }}
      />

    </div>
  );
}
