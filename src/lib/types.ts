export type Language = 'en' | 'hi' | 'mr';

export type LifeStage = 'menstrual' | 'pregnant' | 'postpartum' | 'perimenopause' | 'not_sure';

export interface Profile {
  language: Language;
  name?: string;
  lifeStage: LifeStage;
  ageRange?: string;
  lastPeriod?: string;
  cycleLength?: string;
  concerns?: string[];
  onboardingCompleted?: boolean;
}

export interface Consents {
  saveData: boolean;
  aiExplain: boolean;
  sharePassport: boolean;
  discreetMode: boolean;
}

export interface SymptomEntry {
  code: string;
  label: string;
  category: 'period' | 'body' | 'skin_hair' | 'mood' | 'postpartum' | 'other';
  severity: 0 | 1 | 2 | 3; // 0: barely noticeable, 1: noticeable, 2: affects my day, 3: can't do daily tasks
  duration: 'today' | 'few_days' | '1_2_weeks' | 'more_than_2_weeks' | 'on_and_off';
}

export interface Checkin {
  id: string;
  recordedAt: string; // ISO date
  lifeStage: LifeStage;
  symptoms: SymptomEntry[];
  notes?: string;
  medications?: string;
  flow?: 'spotting' | 'light' | 'moderate' | 'heavy' | 'very_heavy';
}

export interface SafetyResult {
  level: 'routine' | 'soon' | 'urgent' | 'emergency';
  redFlag: boolean;
  matchedRuleId?: string;
  ruleVersion: string;
  message: string;
  showSafetyScreen: boolean;
  aiCanOverride: false;
  suggestedAction?: string;
  contactNumber?: string;
  serviceName?: string;
}

export interface PatternEvidence {
  symptom: string;
  occurrences: number;
  period: string;
  entryIds: string[];
}

export interface Pattern {
  id: string;
  title: string;
  summary: string;
  evidenceStrength: 'limited' | 'moderate' | 'stronger';
  evidence: PatternEvidence[];
  missingInformation: string[];
  topicsToDiscuss: string[];
  routeTo: string;
  notADiagnosis: true;
  suggestedTests: string[];
  suggestedSpecialist: string;
  otherPossibilities?: string[];
}

export interface Provider {
  id: string;
  name: string;
  type: string;
  area: string;
  city: string;
  languages: string[];
  costBand: 'free' | 'low' | 'private';
  facility: 'public' | 'private';
  femaleDoctorAvailable: boolean;
  source: string;
  verifiedOn?: string;
  isSample: boolean;
  phone: string;
  address: string;
  testCostEstimate?: string;
}

export interface CareRecommendation {
  specialistType: string;
  urgency: string;
  reason: string;
  questionsToAsk: string[];
  providers: Provider[];
  directoryNotice: string;
}

export interface Followup {
  id: string;
  text: string;
  dueDate?: string;
  done: boolean;
}

export interface TimelineDataPoint {
  date: string;
  cycleDay?: number;
  isCycleStart?: boolean;
  symptoms: {
    [code: string]: number; // severity 0-3
  };
  isKnot?: boolean;
  notes?: string;
}

export interface PassportDraft {
  includeTimeline: boolean;
  includePatterns: boolean;
  includeMedications: boolean;
  includeQuestions: boolean;
  patientNotes: string;
  customQuestions: string[];
}

// Authentication types
export interface User {
  id: string;
  name: string;
  email: string;
  isDemo?: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
  isDemo: boolean;
}

// Cycle types
export interface CycleDayLog {
  date: string; // YYYY-MM-DD
  isPeriod: boolean;
  flow?: 'spotting' | 'light' | 'moderate' | 'heavy';
  painSeverity?: 0 | 1 | 2 | 3;
  mood?: string;
  notes?: string;
  isPeriodStart?: boolean;
  isPeriodEnd?: boolean;
}

export interface CycleEstimates {
  averageCycleLength: number;
  averagePeriodLength: number;
  longestCycle: number;
  shortestCycle: number;
  nextPeriodRange: {
    start: string;
    end: string;
    daysAwayMin: number;
    daysAwayMax: number;
  };
  isIrregular: boolean;
  irregularReason?: string;
  recentCycles: {
    month: string;
    length: number;
  }[];
}

// Private Diary types
export type DiaryMood = 'calm' | 'okay' | 'low' | 'anxious' | 'tired' | 'hopeful';

export interface DiaryEntry {
  id: string;
  userId?: string;
  date: string; // YYYY-MM-DD
  title?: string;
  body: string;
  mood: DiaryMood;
  linkedCheckinId?: string;
  isDemo?: boolean;
  includeInPassport?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Self-Care types
export interface SelfCareCard {
  id: string;
  category: 'eating_well' | 'rest_movement' | 'comfort' | 'when_to_seek_care';
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  image?: string;
  bullets: string[];
  passportQuestion?: string;
  isUrgent?: boolean;
}

