/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SAPModuleId =
  | 'SD'
  | 'MM'
  | 'FI'
  | 'CO'
  | 'PP'
  | 'QM'
  | 'PM'
  | 'WM'
  | 'HCM'
  | 'PS'
  | 'BASIS'
  | 'FICO';

export type LearningMode =
  | 'fiori_launchpad'
  | 'easy_access'
  | 'simulator'
  | 'coordinate_map'
  | 'arrow_formula'
  | 'quiz_lab'
  | 'turkey_localization'
  | 'system_performance';

export interface CoordinateMap {
  title: string;
  tCode: string;
  turkishName: string;
  englishName: string;
  screenAnatomy: {
    commandBar: string; // e.g. "/nVA01 komut kutusu sol üstte beyaz zeminli"
    topRightButtons: Array<{
      label: string;
      color: string;
      shortcut?: string;
      actionDescription: string;
    }>;
    leftPanel: string; // Sol ağaç menü veya organizasyon seçim alanı
    centerForm: {
      mandatoryFields: Array<{
        name: string;
        technicalName: string;
        location: string;
        whyMandatory: string;
        sampleValue: string;
      }>;
      tabs: string[];
      tableColumns?: string[];
    };
    bottomStatusBar: string; // Alt sol durum çubuğu ve mesaj türleri
  };
  mentalVisualizationTip: string; // "Gözünde şöyle canlandır: ..."
}

export interface ArrowStep {
  tCode: string;
  processTitle: string;
  flowSteps: Array<{
    stepNumber: number;
    actionType: 'tcode' | 'tab' | 'field' | 'button' | 'verify';
    text: string;
    description: string;
    shortcut?: string;
    turkeyContext?: string;
  }>;
  quickFormula: string; // "VA01 ➡️ ZOR ➡️ 1000/10/00 ➡️ Enter ➡️ Müşteri ➡️ Kalemler ➡️ Ctrl+S"
}

export interface SimulationField {
  id: string;
  label: string;
  techName: string;
  type: 'text' | 'select' | 'number' | 'date';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string;
  required?: boolean;
  tooltip?: string;
  turkeyNote?: string;
}

export interface SimulationTableItem {
  kalemNo: string;
  malzeme: string;
  kisaMetin: string;
  miktar: number;
  birim: string;
  fiyat: number;
  paraBirimi: string;
  vergiKodu?: string;
  depoYeri?: string;
}

export interface TransactionSimulation {
  tCode: string;
  module: SAPModuleId;
  screenTitle: string;
  subTitle: string;
  programName: string;
  screenNumber: string;
  headerFields: SimulationField[];
  tabs: Array<{
    id: string;
    name: string;
    fields?: SimulationField[];
    tableType?: 'items' | 'accounting_lines' | 'delivery_items';
  }>;
  defaultTableItems?: SimulationTableItem[];
  statusBarOnLoad: {
    type: 'info' | 'warning' | 'success';
    code: string;
    message: string;
  };
  saveSuccessMessage: {
    code: string;
    messageTemplate: string; // e.g. "Standart sipariş {docNo} kaydedildi."
  };
}

export interface QuizQuestion {
  id: string;
  module: SAPModuleId;
  tCode: string;
  type: 'scenario' | 'button_location' | 'coordinate' | 'turkey_rule';
  scenarioText: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  visualCoordinateHint: string;
  mentalTrick: string;
}

export interface DictionaryItem {
  english: string;
  turkish: string;
  tCode?: string;
  module: SAPModuleId | 'COMMON';
  category: 'Organizasyon' | 'Ana Veri' | 'Süreç/Belge' | 'Mevzuat/Finans';
  description: string;
  turkeyLocalizationNote?: string;
}

export interface EasyAccessNode {
  id: string;
  label: string;
  tCode?: string;
  isFolder?: boolean;
  module?: SAPModuleId;
  children?: EasyAccessNode[];
  turkeyTag?: string;
  fioriTile?: {
    subtitle: string;
    kpi?: string;
  };
}

export interface GuidedMissionStep {
  stepIndex: number;
  targetId: string;
  title: string;
  instruction: string;
  expectedAction: string;
  turkeyContext?: string;
}
