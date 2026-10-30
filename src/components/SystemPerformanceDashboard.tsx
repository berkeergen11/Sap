/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { sapSound } from '../utils/audioEffects';
import {
  Activity,
  Cpu,
  Database,
  Server,
  Zap,
  RefreshCw,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  ExternalLink,
  BookOpen,
  Search,
  Filter,
  BarChart3,
  HardDrive,
  Sliders,
  HelpCircle,
  Wifi,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Info,
} from 'lucide-react';

interface SystemPerformanceDashboardProps {
  onSelectTCode: (tCode: string) => void;
  onReturnToMainMenu?: () => void;
}

interface WorkProcessItem {
  id: number;
  type: 'DIA' | 'BGD' | 'UPD' | 'SPO' | 'ENQ';
  pid: number;
  status: 'Running' | 'Waiting' | 'On Hold';
  user: string;
  tCode: string;
  program: string;
  cpuTime: number; // in seconds
  dbTable: string;
  action: string;
}

interface EnglishVocabularyTerm {
  term: string;
  pronunciation?: string;
  turkishMeaning: string;
  tCodeContext: string;
  category: 'Work Processes' | 'Metrics & Response Time' | 'Memory & Buffers' | 'Hardware & OS' | 'Troubleshooting';
  definition: string;
  consultantBestPractice: string;
}

const VOCABULARY_LIST: EnglishVocabularyTerm[] = [
  {
    term: 'Work Process (WP)',
    turkishMeaning: 'İş Süreci (Arka Plan veya Diyalog Görevi)',
    tCodeContext: 'SM50 / SM66',
    category: 'Work Processes',
    definition: 'An independent operating system process managed by the SAP Dispatcher to execute user requests, reports, updates, or spool printing.',
    consultantBestPractice: 'Keep at least 2 DIA processes free at all times; otherwise end-users experience system freezing during peak hours.',
  },
  {
    term: 'Throughput',
    turkishMeaning: 'İşlem Hacmi (Birim Zamanda İşlenen İşlem Sayısı)',
    tCodeContext: 'ST03N / ST06',
    category: 'Metrics & Response Time',
    definition: 'The rate at which the SAP system successfully completes dialog steps, background jobs, or transactions, usually measured in Transactions/Minute (TPM) or Transactions/Second (TPS).',
    consultantBestPractice: 'High throughput with low response time (< 800 ms) indicates optimal system health.',
  },
  {
    term: 'CPU Utilization',
    turkishMeaning: 'İşlemci Kullanım Oranı',
    tCodeContext: 'ST06 / OS06',
    category: 'Hardware & OS',
    definition: 'The percentage of time the host CPUs spend executing user tasks (User %), kernel operations (System %), or waiting for I/O vs being idle (Idle %).',
    consultantBestPractice: 'Total CPU above 85% persistently indicates runaway batch jobs or missing database secondary indexes.',
  },
  {
    term: 'Response Time',
    turkishMeaning: 'Toplam Yanıt Süresi',
    tCodeContext: 'ST03N',
    category: 'Metrics & Response Time',
    definition: 'The total wall-clock time elapsed from when an end-user presses Enter until the updated SAP screen is rendered back on their client.',
    consultantBestPractice: 'Rule of thumb: Response Time = CPU Time + Database Time + Wait Time + Load Time. Ideal average dialog response is < 800 ms.',
  },
  {
    term: 'Wait Time',
    turkishMeaning: 'Kuyrukta Bekleme Süresi',
    tCodeContext: 'ST03N / SM50',
    category: 'Metrics & Response Time',
    definition: 'The time a user request spends queued in the SAP Dispatcher waiting for an idle Dialog Work Process (DIA) to pick it up.',
    consultantBestPractice: 'If Wait Time exceeds 50 ms, it proves the system has insufficient DIA processes configured in profile parameters.',
  },
  {
    term: 'Database Request Time (DB Time)',
    turkishMeaning: 'Veritabanı Okuma/Yazma Süresi',
    tCodeContext: 'ST03N / ST04',
    category: 'Metrics & Response Time',
    definition: 'The duration spent by the SAP database interface executing SQL statements (SELECT, INSERT, UPDATE) inside the SAP HANA / DB engine.',
    consultantBestPractice: 'In HANA, DB Time should normally be under 40% of total response time. Higher ratios point to unindexed full table scans.',
  },
  {
    term: 'Buffer Hit Ratio',
    turkishMeaning: 'Tampon Bellek İsabet Oranı',
    tCodeContext: 'ST02',
    category: 'Memory & Buffers',
    definition: 'The percentage of data reads retrieved directly from shared application memory cache without having to query physical disk or database.',
    consultantBestPractice: 'Target is > 95% for Program Buffer and > 98% for Table Buffers. Low hit ratios mean buffer memory is too small.',
  },
  {
    term: 'Buffer Swaps',
    turkishMeaning: 'Tampon Bellek Takasları (Bellek Aşımı)',
    tCodeContext: 'ST02',
    category: 'Memory & Buffers',
    definition: 'Occurs when the SAP buffer becomes 100% full and must discard existing cached programs/tables to make room for new ones.',
    consultantBestPractice: 'Frequent swaps in the program buffer (PXA) severely degrade performance; increase parameter `abap/buffersize` via RZ10.',
  },
  {
    term: 'Extended Memory (EM)',
    turkishMeaning: 'Genişletilmiş Bellek (SAP Ortak Belleği)',
    tCodeContext: 'ST02 / SM50',
    category: 'Memory & Buffers',
    definition: 'The primary memory pool allocated to user sessions. Allows rapid context switching without paging out to operating system disk.',
    consultantBestPractice: 'When Extended Memory is exhausted, the work process goes into PRIV mode (dedicated heap) and blocks other users.',
  },
  {
    term: 'PRIV Mode (Dedicated Heap Memory)',
    turkishMeaning: 'Özel Bellek Kilit Modu',
    tCodeContext: 'SM50 / ST02',
    category: 'Memory & Buffers',
    definition: 'A state where a DIA work process consumes all its EM and switches to local OS heap memory, locking that process to a single user until the transaction ends.',
    consultantBestPractice: 'If multiple DIA processes are in PRIV mode simultaneously, the system will freeze. Check memory parameters `em/initial_size_MB`.',
  },
  {
    term: 'Enqueue & Lock Entry',
    turkishMeaning: 'Kilit Tablosu Girişi',
    tCodeContext: 'SM12',
    category: 'Troubleshooting',
    definition: 'A logical lock created by the SAP Enqueue service on a business document (e.g., Sales Order VBAK or Material MARA) to prevent concurrent data conflicts.',
    consultantBestPractice: 'Old lock entries (> 24 hours) usually indicate crashed user sessions holding business documents hostage; delete cautiously via SM12.',
  },
  {
    term: 'Asynchronous Update (V1 / V2)',
    turkishMeaning: 'Eşzamansız Veritabanı Güncellemesi',
    tCodeContext: 'SM13',
    category: 'Work Processes',
    definition: 'A mechanism that decouples interactive user screens from heavy database commits. V1 executes primary tables immediately; V2 runs secondary statistics.',
    consultantBestPractice: 'Red status in SM13 indicates failed update records and data inconsistency (e.g., invoice generated but accounting doc missing).',
  },
  {
    term: 'Runtime Dump (Short Dump)',
    turkishMeaning: 'Çalışma Zamanı Program Çökmesi',
    tCodeContext: 'ST22',
    category: 'Troubleshooting',
    definition: 'A crash report generated by the ABAP kernel when an unhandled exception or system error occurs (e.g., TIME_OUT, COMPUTE_INT_ZERODIVIDE).',
    consultantBestPractice: 'Always check the "Error analysis" and "Line number in source code" sections in ST22 before contacting ABAP developers.',
  },
  {
    term: 'System Log (Syslog)',
    turkishMeaning: 'Merkezi Sistem Günlüğü',
    tCodeContext: 'SM21',
    category: 'Troubleshooting',
    definition: 'A chronological audit log recording database disconnects, communication RFC failures, roll memory warnings, and lock overflow events.',
    consultantBestPractice: 'Run SM21 daily for priority "Very High" and "High" messages to catch hardware or network degradations early.',
  },
  {
    term: 'Delta Merge',
    turkishMeaning: 'HANA Bellek İçi Delta Birleştirme',
    tCodeContext: 'ST04 / DBACOCKPIT',
    category: 'Hardware & OS',
    definition: 'The periodic background operation in SAP HANA that transfers new insert/update records from the write-optimized Delta Store into the read-optimized Main Store.',
    consultantBestPractice: 'If Delta Merge takes excessive CPU during business hours, check table partitioning and auto-merge thresholds.',
  },
];

export const SystemPerformanceDashboard: React.FC<SystemPerformanceDashboardProps> = ({
  onSelectTCode,
  onReturnToMainMenu,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'work_processes' | 'buffers_memory' | 'vocabulary'>('overview');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const [vocabCategory, setVocabCategory] = useState<string>('all');
  const [processFilter, setProcessFilter] = useState<'ALL' | 'DIA' | 'BGD' | 'UPD'>('ALL');
  
  // Dynamic simulated metrics with realistic jitter
  const [cpuUtilization, setCpuUtilization] = useState<number>(36.4);
  const [userCpu, setUserCpu] = useState<number>(24.2);
  const [systemCpu, setSystemCpu] = useState<number>(8.4);
  const [throughput, setThroughput] = useState<number>(1284);
  const [avgResponseTime, setAvgResponseTime] = useState<number>(418);
  const [activeDialogs, setActiveDialogs] = useState<number>(14);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  // Dynamic processes
  const [processes, setProcesses] = useState<WorkProcessItem[]>([
    { id: 1, type: 'DIA', pid: 14820, status: 'Running', user: 'BERKE.ERGEN', tCode: 'VA01', program: 'SAPMV45A', cpuTime: 1.4, dbTable: 'VBAK', action: 'Sipariş Kaydı (SD)' },
    { id: 2, type: 'DIA', pid: 14821, status: 'Running', user: 'AHMET.YILMAZ', tCode: 'VL01N', program: 'SAPMV50A', cpuTime: 0.8, dbTable: 'LIKP', action: 'Giden Teslimat (PGI)' },
    { id: 3, type: 'DIA', pid: 14822, status: 'Running', user: 'MEHMET.KAYA', tCode: 'VF01', program: 'SAPMV60A', cpuTime: 2.1, dbTable: 'VBRK', action: 'e-Fatura Kesimi' },
    { id: 4, type: 'DIA', pid: 14823, status: 'Waiting', user: 'FATMA.DEMIR', tCode: 'FB60', program: 'SAPMF05A', cpuTime: 0.6, dbTable: 'BKPF', action: 'Satıcı Fatura Girişi' },
    { id: 5, type: 'DIA', pid: 14824, status: 'Running', user: 'CANAN.OZ', tCode: 'MIGO', program: 'SAPLMIGO', cpuTime: 1.1, dbTable: 'MSEG', action: 'Mal Kabulü (101)' },
    { id: 6, type: 'DIA', pid: 14825, status: 'Waiting', user: 'SELIN.AK', tCode: 'MM02', program: 'SAPLMGMM', cpuTime: 0.3, dbTable: 'MARA', action: 'Malzeme Güncelleme' },
    { id: 7, type: 'DIA', pid: 14826, status: 'Running', user: 'BURAK.CELIK', tCode: 'CO01', program: 'SAPLCOKO', cpuTime: 3.4, dbTable: 'AFKO', action: 'Üretim Emri BOM Açılımı' },
    { id: 8, type: 'BGD', pid: 14827, status: 'Running', user: 'BATCH_ADMIN', tCode: 'VF04', program: 'RVV21LOG', cpuTime: 42.6, dbTable: 'VKDFS', action: 'Toplu Faturalama İşi' },
    { id: 9, type: 'BGD', pid: 14828, status: 'Waiting', user: 'MRP_JOB', tCode: 'MD01', program: 'RMMRP000', cpuTime: 0.0, dbTable: 'RESB', action: 'MRP Planlama Kuyruğu' },
    { id: 10, type: 'UPD', pid: 14829, status: 'Waiting', user: 'SYSTEM', tCode: 'SM13', program: 'SAPMMS13', cpuTime: 0.2, dbTable: 'VBHDR', action: 'V1 Asenkron Güncelleme' },
    { id: 11, type: 'SPO', pid: 14830, status: 'Waiting', user: 'SPOOL_SVC', tCode: 'SP01', program: 'RSPO0041', cpuTime: 0.1, dbTable: 'TSP01', action: 'LOCL Yazıcı Kuyruğu' },
    { id: 12, type: 'ENQ', pid: 14831, status: 'Running', user: 'ENQ_DAEMON', tCode: 'SM12', program: 'SAPLENQ', cpuTime: 0.4, dbTable: 'LOCKS', action: 'Tablo Kilit Yöneticisi' },
  ]);

  // Periodic heartbeat tick
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      // Small realistic fluctuations
      const cpuJitter = (Math.random() - 0.5) * 4;
      const tpmJitter = Math.floor((Math.random() - 0.5) * 40);
      const respJitter = Math.floor((Math.random() - 0.5) * 25);

      setCpuUtilization((prev) => Math.min(88, Math.max(18, +(prev + cpuJitter).toFixed(1))));
      setUserCpu((prev) => Math.min(65, Math.max(12, +(prev + cpuJitter * 0.7).toFixed(1))));
      setThroughput((prev) => Math.min(2200, Math.max(900, prev + tpmJitter)));
      setAvgResponseTime((prev) => Math.min(780, Math.max(280, prev + respJitter)));
      setLastRefreshed(new Date());

      // Update random process CPU time
      setProcesses((prev) =>
        prev.map((p) => {
          if (p.status === 'Running') {
            return { ...p, cpuTime: +(p.cpuTime + 0.3).toFixed(1) };
          }
          return p;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleManualRefresh = () => {
    sapSound.playClick();
    setLastRefreshed(new Date());
    setCpuUtilization(+(30 + Math.random() * 15).toFixed(1));
    setThroughput(Math.floor(1200 + Math.random() * 200));
  };

  const filteredProcesses = processes.filter((p) => {
    if (processFilter === 'ALL') return true;
    return p.type === processFilter;
  });

  const filteredVocab = VOCABULARY_LIST.filter((item) => {
    const matchesCat = vocabCategory === 'all' || item.category === vocabCategory;
    const q = vocabSearch.toLowerCase().trim();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (item.term.toLowerCase().includes(q) ||
        item.turkishMeaning.toLowerCase().includes(q) ||
        item.tCodeContext.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-700/90 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-sans select-none text-slate-100 min-h-[780px]">
      
      {/* 1. Header Bar: System ID, Live Status & Mode Switcher */}
      <div className="bg-gradient-to-r from-slate-950 via-[#132235] to-slate-950 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                SAP S/4HANA Sistem Performans Kokpiti
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                CANLI İZLEME
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>Sunucu: <strong className="text-slate-200">s4h-app-01</strong> (PRD-100)</span>
              <span>·</span>
              <span>Veritabanı: <strong className="text-sky-400">SAP HANA 2.0 In-Memory</strong></span>
            </p>
          </div>
        </div>

        {/* Live Controls: Auto-refresh Toggle, Manual Refresh, Back to Main Menu */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sapSound.playClick();
              setAutoRefresh(!autoRefresh);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              autoRefresh
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Otomatik Yenilemeyi Aç / Duraklat (Her 3 sn)"
          >
            {autoRefresh ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoRefresh ? 'Canlı Akış Aktif' : 'Duraklatıldı'}</span>
          </button>

          <button
            onClick={handleManualRefresh}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Manuel Yenile"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {onReturnToMainMenu && (
            <button
              onClick={onReturnToMainMenu}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              Fiori Başlangıç
            </button>
          )}
        </div>
      </div>

      {/* 2. Top-level Tab Navigation: Overview, Work Processes (SM50), Buffers (ST02), Technical English Glossary */}
      <div className="bg-slate-950/80 px-4 sm:px-6 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 py-2">
          <button
            onClick={() => {
              setActiveTab('overview');
              sapSound.playTab();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'overview'
                ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-sky-300" />
            <span>Genel Bakış (ST03N / ST06)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('work_processes');
              sapSound.playTab();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'work_processes'
                ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>İş Süreçleri Monitörü (SM50 / SM66)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {activeDialogs}/20
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('buffers_memory');
              sapSound.playTab();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'buffers_memory'
                ? 'bg-sky-600 text-white shadow-sm ring-1 ring-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-purple-400" />
            <span>Tampon & Bellek Akordu (ST02)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('vocabulary');
              sapSound.playTab();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'vocabulary'
                ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                : 'text-amber-300/80 hover:text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>İngilizce Performans Sözlüğü (All Terms)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">
              15 Terim
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Son Ölçüm: {lastRefreshed.toLocaleTimeString('tr-TR')}</span>
        </div>
      </div>

      {/* 3. Main Dashboard Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-gradient-to-b from-slate-900 to-slate-950">
        
        {/* TAB 1: OVERVIEW & LIVE METRICS (ST03N / ST06) */}
        {activeTab === 'overview' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            
            {/* Top Metric Cards Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              {/* Card 1: CPU Utilization */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-sky-400" />
                    <span>CPU Utilization (İşlemci)</span>
                  </span>
                  <span className="font-mono text-[11px] text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                    /nST06
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    %{cpuUtilization}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Normal (&lt; %60)</span>
                  </span>
                </div>
                {/* Meter Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      cpuUtilization > 85
                        ? 'bg-rose-500'
                        : cpuUtilization > 60
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${cpuUtilization}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>User: %{userCpu}</span>
                  <span>System: %{systemCpu}</span>
                  <span>Idle: %{(100 - cpuUtilization).toFixed(1)}</span>
                </div>
              </div>

              {/* Card 2: Transaction Throughput */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Throughput (İşlem Hacmi)</span>
                  </span>
                  <span className="font-mono text-[11px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    /nST03N
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {throughput.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    işlem / dk ({(throughput / 60).toFixed(1)} TPS)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (throughput / 2000) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Pik Kapasite: 2.000 TPM</span>
                  <span className="text-emerald-400">Akış Stabil</span>
                </div>
              </div>

              {/* Card 3: Average Dialog Response Time */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Avg Response Time (Yanıt)</span>
                  </span>
                  <span className="font-mono text-[11px] text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                    /nST03N
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {avgResponseTime} ms
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    Mükemmel (&lt; 800 ms)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (avgResponseTime / 1000) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>HANA DB: %58</span>
                  <span>CPU: %22</span>
                  <span>Wait: %12</span>
                </div>
              </div>

              {/* Card 4: Buffer Hit Ratio */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Buffer Hit Ratio (Tampon)</span>
                  </span>
                  <span className="font-mono text-[11px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    /nST02
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    %98.7
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    Swaps: 3 (Düşük)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-500"
                    style={{ width: `98.7%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Program: %99.4</span>
                  <span>Tablo: %98.1</span>
                  <span>GUI: %99.8</span>
                </div>
              </div>

            </div>

            {/* ST03N Workload Analysis: Response Time Breakdown & Diagnosis */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white">
                    ST03N Yanıt Süresi Bileşen Analizi (Response Time Breakdown)
                  </h3>
                </div>
                <button
                  onClick={() => {
                    sapSound.playEnter();
                    onSelectTCode('ST03N');
                  }}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>ST03N Ekranını Aç</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Horizontal Multi-segment Bar */}
              <div className="space-y-2">
                <div className="w-full h-7 rounded-lg overflow-hidden flex font-mono text-[11px] font-bold text-slate-950 shadow-inner">
                  <div style={{ width: '20.4%' }} className="bg-sky-400 flex items-center justify-center" title="CPU Time: 84 ms (%20.4)">
                    CPU 20.4%
                  </div>
                  <div style={{ width: '60.2%' }} className="bg-indigo-400 flex items-center justify-center text-white" title="HANA DB Time: 248 ms (%60.2)">
                    HANA DB 60.2%
                  </div>
                  <div style={{ width: '12.6%' }} className="bg-amber-400 flex items-center justify-center" title="Wait Time: 52 ms (%12.6)">
                    Wait 12.6%
                  </div>
                  <div style={{ width: '6.8%' }} className="bg-emerald-400 flex items-center justify-center" title="GUI/Load: 28 ms (%6.8)">
                    GUI
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-sky-400 font-bold uppercase">1. CPU Time (İşlemci)</span>
                    <div className="font-mono font-bold text-white text-sm mt-0.5">84 ms (%20.4)</div>
                    <p className="text-[10.5px] text-slate-400 mt-1">
                      ABAP kodunun yorumlanması ve algoritmik hesaplama süresi.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase">2. DB Time (HANA Veritabanı)</span>
                    <div className="font-mono font-bold text-white text-sm mt-0.5">248 ms (%60.2)</div>
                    <p className="text-[10.5px] text-slate-400 mt-1">
                      HANA In-Memory SQL sorgu okuma ve satır/sütun eşleştirme.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">3. Wait Time (Kuyruk Bekleme)</span>
                    <div className="font-mono font-bold text-white text-sm mt-0.5">52 ms (%12.6)</div>
                    <p className="text-[10.5px] text-slate-400 mt-1">
                      Dispatcher kuyruğunda boş DIA süreci bekleme süresi.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">4. GUI / Load Time (İstemci)</span>
                    <div className="font-mono font-bold text-white text-sm mt-0.5">28 ms (%6.8)</div>
                    <p className="text-[10.5px] text-slate-400 mt-1">
                      WebGUI Belize arayüzüne verinin aktarılma ve çizilme süresi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Strip for All BASIS Performance T-Codes */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Kritik BASIS Performans İşlem Kodları (Tek Tıkla Simülatörde Başlat)
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { code: 'SM50', name: 'Work Processes (İş Süreçleri)', badge: 'Canlı Süreç' },
                  { code: 'ST02', name: 'Tune Summary (Tampon / Bellek)', badge: 'Hit Ratio' },
                  { code: 'ST03N', name: 'Workload Monitor (İş Yükü)', badge: 'Yanıt Süresi' },
                  { code: 'ST06', name: 'OS Monitor (CPU / RAM)', badge: 'Donanım' },
                  { code: 'ST22', name: 'ABAP Dump Analysis (Hata)', badge: 'Çökme' },
                  { code: 'SM12', name: 'Lock Entries (Kilitler)', badge: 'Enqueue' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      sapSound.playEnter();
                      onSelectTCode(item.code);
                    }}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-sky-500/60 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white group-hover:text-sky-300 text-xs">
                        /n{item.code}
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 line-clamp-1 mt-1">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE WORK PROCESSES MONITOR (SM50 / SM66) */}
        {activeTab === 'work_processes' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Filter and Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Süreç Türü:
                </span>
                {(['ALL', 'DIA', 'BGD', 'UPD'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setProcessFilter(f);
                      sapSound.playClick();
                    }}
                    className={`px-3 py-1 rounded-md text-xs font-semibold font-mono transition-colors ${
                      processFilter === f
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f === 'ALL' ? 'Tümü (12)' : f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Boşta DIA: {20 - activeDialogs} Adet
                </span>
                <button
                  onClick={() => {
                    sapSound.playEnter();
                    onSelectTCode('SM50');
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-md font-mono border border-slate-700 transition-colors flex items-center gap-1"
                >
                  <span>/nSM50 Ekranı</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Work Process Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/80 shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Tür (Type)</th>
                      <th className="py-2.5 px-3">PID</th>
                      <th className="py-2.5 px-3">Durum (Status)</th>
                      <th className="py-2.5 px-3">Kullanıcı (User)</th>
                      <th className="py-2.5 px-3">T-Code</th>
                      <th className="py-2.5 px-3">Program / Rapor</th>
                      <th className="py-2.5 px-3">CPU (s)</th>
                      <th className="py-2.5 px-3">Tablo</th>
                      <th className="py-2.5 px-3">İşlem Tanımı</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredProcesses.map((proc) => {
                      const isRunning = proc.status === 'Running';
                      return (
                        <tr
                          key={proc.id}
                          className="hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-2.5 px-3 font-bold text-slate-400">{proc.id}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                proc.type === 'DIA'
                                  ? 'bg-sky-950 text-sky-300 border border-sky-800'
                                  : proc.type === 'BGD'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : proc.type === 'UPD'
                                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {proc.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-400">{proc.pid}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans ${
                                isRunning
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                              <span>{proc.status}</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-white">{proc.user}</td>
                          <td className="py-2.5 px-3 text-sky-300 font-bold">{proc.tCode}</td>
                          <td className="py-2.5 px-3 text-slate-300 truncate max-w-[140px]">{proc.program}</td>
                          <td className="py-2.5 px-3 text-amber-300">{proc.cpuTime.toFixed(1)}s</td>
                          <td className="py-2.5 px-3 text-emerald-400 font-semibold">{proc.dbTable}</td>
                          <td className="py-2.5 px-3 text-slate-400 font-sans truncate max-w-[180px]">{proc.action}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>💡 <strong>Danışman İpucu:</strong> SM50 ekranında bir DIA sürecinin CPU süresi 60 saniyeyi aşıyorsa `TIME_OUT` riski taşır. T-Code üzerine tıklayıp süreci inceleyebilirsiniz.</span>
              <span className="font-mono text-sky-400">Total: 20 Process Configured</span>
            </div>
          </div>
        )}

        {/* TAB 3: BUFFERS & MEMORY TUNING (ST02) */}
        {activeTab === 'buffers_memory' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            {/* Header explanation */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950/70 rounded-xl border border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  <span>ST02 Tampon ve Bellek Dağılımı (SAP Memory & Buffers)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Tampon isabet oranı (Hit Ratio) %95'in altına düşerse veya takaslar (Swaps) artarsa sistem performansı ciddi şekilde yavaşlar.
                </p>
              </div>
              <button
                onClick={() => {
                  sapSound.playEnter();
                  onSelectTCode('ST02');
                }}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>/nST02 Tam Ekranını Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Buffer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Program Tamponu (PXA)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Swaps: 0
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">%99.4</div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: '99.4%' }} />
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between"><span>Tahsis:</span><span className="font-mono text-white">4.200 MB</span></div>
                  <div className="flex justify-between"><span>Kullanım:</span><span className="font-mono text-white">3.180 MB (%75.7)</span></div>
                  <div className="flex justify-between"><span>Dizin Girişleri:</span><span className="font-mono text-white">48.200 Adet</span></div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Tablo Tamponu (Table Buffer)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Swaps: 3
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-sky-400">%98.1</div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-400 h-full" style={{ width: '98.1%' }} />
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between"><span>Tahsis:</span><span className="font-mono text-white">2.100 MB</span></div>
                  <div className="flex justify-between"><span>Kullanım:</span><span className="font-mono text-white">1.840 MB (%87.6)</span></div>
                  <div className="flex justify-between"><span>Münferit Kayıtlar:</span><span className="font-mono text-white">142.000 Kayıt</span></div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Genişletilmiş Bellek (EM Pool)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    PRIV: 0
                  </span>
                </div>
                <div className="text-2xl font-bold font-mono text-purple-400">%51.2</div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-400 h-full" style={{ width: '51.2%' }} />
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between"><span>Havuz Boyutu:</span><span className="font-mono text-white">32.0 GB</span></div>
                  <div className="flex justify-between"><span>Aktif Kullanım:</span><span className="font-mono text-white">16.4 GB</span></div>
                  <div className="flex justify-between"><span>Heap Memory (Özel):</span><span className="font-mono text-white">2.1 GB / 8.0 GB</span></div>
                </div>
              </div>

            </div>

            {/* ST02 Consultant Checklist */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>ST02 İnceleme Kuralı: Ne Zaman Aksiyon Alınmalı?</span>
              </h4>
              <p className="text-slate-300 leading-relaxed text-[11.5px]">
                1. <strong>Program Buffer Swaps &gt; 10.000/gün</strong> ise profil parametresi <code className="text-sky-300 font-mono">abap/buffersize</code> RZ10 ile artırılmalıdır.
                <br />
                2. <strong>Roll veya Paging Swaps</strong> varsa, sistem diske sayfalama yapıyor demektir; sunucu RAM'i yetersiz kalabilir.
                <br />
                3. <strong>Extended Memory dolarsa</strong> kullanıcı oturumları PRIV moduna geçer ve diyalog süreçlerini kilitleyerek diğer kullanıcıları bekletir.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: COMPREHENSIVE TECHNICAL ENGLISH VOCABULARY */}
        {activeTab === 'vocabulary' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            
            {/* Top Search & Category Filter */}
            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  placeholder="İngilizce veya Türkçe terim ara (Örn: Work Process, CPU, Buffer)..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'Tümü (15)' },
                  { id: 'Work Processes', label: 'Work Processes' },
                  { id: 'Metrics & Response Time', label: 'Metrics & Times' },
                  { id: 'Memory & Buffers', label: 'Memory & Buffers' },
                  { id: 'Hardware & OS', label: 'Hardware & OS' },
                  { id: 'Troubleshooting', label: 'Troubleshooting' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setVocabCategory(cat.id);
                      sapSound.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                      vocabCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vocabulary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredVocab.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-amber-300 font-mono tracking-tight">
                        {item.term}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                        {item.tCodeContext}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200">
                      🇹🇷 {item.turkishMeaning}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px]">
                    <div className="font-bold text-emerald-400 mb-0.5 flex items-center gap-1">
                      <span>💡 Consultant Best Practice (Danışman Püf Noktası):</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      {item.consultantBestPractice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredVocab.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                Aramanızla eşleşen teknik terim bulunamadı.
              </div>
            )}
          </div>
        )}

      </div>

      {/* 4. Footer Bar */}
      <div className="bg-slate-950 px-5 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>SAP Enterprise S/4HANA 2026 Telemetri & BASIS Performans Monitörü</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="text-sky-400">ST03N Workload Analizi</span>
          <span>·</span>
          <span className="text-amber-400">SM50 Süreç Gözlemi</span>
          <span>·</span>
          <span className="text-purple-400">ST02 Bellek Akordu</span>
        </div>
      </div>

    </div>
  );
};
