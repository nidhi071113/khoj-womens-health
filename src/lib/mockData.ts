import { Checkin, Profile, Consents, Followup, PassportDraft } from './types';
import { SAMPLE_PUNE_PROVIDERS } from './mock/mockProviders';
import { analyzePatternsMock } from './mock/mockPatterns';

export const PRIYA_PROFILE: Profile = {
  language: 'en',
  name: 'Priya Sharma',
  lifeStage: 'menstrual',
  ageRange: '25 - 29',
  lastPeriod: '2026-04-12',
  cycleLength: '28-30 days',
  concerns: ['Heavy periods', 'Tired all the time', 'Skin or hair changes'],
  onboardingCompleted: true
};

export const PRIYA_CONSENTS: Consents = {
  saveData: true,
  aiExplain: true,
  sharePassport: true,
  discreetMode: false
};

export const PRIYA_FOLLOWUPS: Followup[] = [
  {
    id: 'f-1',
    text: 'Schedule consultation with Dr. Ananya Joshi (Gynecologist)',
    dueDate: '2026-05-02',
    done: false
  },
  {
    id: 'f-2',
    text: 'Ask for CBC & Serum Ferritin blood work during visit',
    dueDate: '2026-05-05',
    done: false
  },
  {
    id: 'f-3',
    text: 'Review dietary iron rich foods (spinach, jaggery, legumes)',
    dueDate: '2026-05-10',
    done: true
  }
];

export const PRIYA_PASSPORT_DRAFT: PassportDraft = {
  includeTimeline: true,
  includePatterns: true,
  includeMedications: true,
  includeQuestions: true,
  patientNotes: 'Symptoms appear to intensify on days 2 and 3 of heavy flow. Energy drops noticeably despite 8 hours of sleep.',
  customQuestions: [
    'Could my low energy and lightheadedness be linked to low ferritin from heavy periods?',
    'Would a routine CBC and pelvic ultrasound be helpful at this stage?',
    'What are safe options to lighten heavy menstrual flow?'
  ]
};

// 4 months of rich, realistic check-ins for Priya (January 2026 to April 2026)
export const PRIYA_CHECKINS: Checkin[] = [
  // Cycle 1: January 2026
  {
    id: 'chk-jan-14',
    recordedAt: '2026-01-14T09:30:00Z',
    lifeStage: 'menstrual',
    flow: 'heavy',
    symptoms: [
      { code: 'heavy_bleeding', label: 'Heavy Bleeding', category: 'period', severity: 2, duration: 'today' },
      { code: 'cramps', label: 'Pelvic Cramping', category: 'period', severity: 2, duration: 'today' },
      { code: 'fatigue', label: 'Tiredness / Low Energy', category: 'body', severity: 2, duration: 'few_days' }
    ],
    notes: 'Day 2 of period. Had to change 4 pads by afternoon.',
    medications: 'Meftal-Spas (1 tablet)'
  },
  {
    id: 'chk-jan-16',
    recordedAt: '2026-01-16T18:00:00Z',
    lifeStage: 'menstrual',
    flow: 'moderate',
    symptoms: [
      { code: 'fatigue', label: 'Tiredness / Low Energy', category: 'body', severity: 2, duration: 'few_days' },
      { code: 'dizziness', label: 'Mild Dizziness', category: 'body', severity: 1, duration: 'today' }
    ],
    notes: 'Flow lessening, but felt dizzy when standing up from desk.'
  },

  // Cycle 2: February 2026
  {
    id: 'chk-feb-11',
    recordedAt: '2026-02-11T10:15:00Z',
    lifeStage: 'menstrual',
    flow: 'heavy',
    symptoms: [
      { code: 'heavy_bleeding', label: 'Heavy Bleeding', category: 'period', severity: 3, duration: 'today' },
      { code: 'fatigue', label: 'Exhaustion', category: 'body', severity: 2, duration: 'few_days' },
      { code: 'dizziness', label: 'Lightheadedness', category: 'body', severity: 2, duration: 'today' }
    ],
    notes: 'Very heavy flow with clots. Felt weak climbing metro stairs.'
  },
  {
    id: 'chk-feb-13',
    recordedAt: '2026-02-13T20:00:00Z',
    lifeStage: 'menstrual',
    flow: 'moderate',
    symptoms: [
      { code: 'fatigue', label: 'Tiredness / Low Energy', category: 'body', severity: 2, duration: '1_2_weeks' },
      { code: 'hair_fall', label: 'Hair Fall in Shower', category: 'skin_hair', severity: 1, duration: 'more_than_2_weeks' }
    ],
    notes: 'More hair shedding than usual over the last 3 weeks.'
  },

  // Cycle 3: March 2026 (Moderate flow, still fatigued)
  {
    id: 'chk-mar-12',
    recordedAt: '2026-03-12T08:45:00Z',
    lifeStage: 'menstrual',
    flow: 'moderate',
    symptoms: [
      { code: 'cramps', label: 'Mild Cramping', category: 'period', severity: 1, duration: 'today' },
      { code: 'fatigue', label: 'Low Energy', category: 'body', severity: 1, duration: 'few_days' }
    ],
    notes: 'Normal flow this month, mild fatigue.'
  },
  {
    id: 'chk-mar-20',
    recordedAt: '2026-03-20T17:30:00Z',
    lifeStage: 'menstrual',
    symptoms: [
      { code: 'hair_fall', label: 'Hair Fall', category: 'skin_hair', severity: 1, duration: 'more_than_2_weeks' }
    ],
    notes: 'Hair brush accumulating noticeably more strands.'
  },

  // Cycle 4: April 2026 (Heavy again + dizziness)
  {
    id: 'chk-apr-12',
    recordedAt: '2026-04-12T11:00:00Z',
    lifeStage: 'menstrual',
    flow: 'heavy',
    symptoms: [
      { code: 'heavy_bleeding', label: 'Heavy Bleeding', category: 'period', severity: 3, duration: 'today' },
      { code: 'fatigue', label: 'Extreme Fatigue', category: 'body', severity: 2, duration: 'few_days' },
      { code: 'cramps', label: 'Pelvic Aches', category: 'period', severity: 2, duration: 'today' }
    ],
    notes: 'Heavy bleeding returned. Needing dark clothing and frequent bathroom visits.'
  },
  {
    id: 'chk-apr-14',
    recordedAt: '2026-04-14T15:20:00Z',
    lifeStage: 'menstrual',
    flow: 'heavy',
    symptoms: [
      { code: 'heavy_bleeding', label: 'Heavy Bleeding', category: 'period', severity: 2, duration: 'today' },
      { code: 'dizziness', label: 'Lightheadedness', category: 'body', severity: 2, duration: 'today' },
      { code: 'fatigue', label: 'Fatigue', category: 'body', severity: 2, duration: '1_2_weeks' }
    ],
    notes: 'Day 3 of heavy period. Decided to organize my health summary for a doctor visit.'
  }
];

// Pre-computed mock patterns for Priya
export const PRIYA_PATTERNS = analyzePatternsMock(PRIYA_CHECKINS);

// Red flag demonstration test case (fainting + heavy bleeding)
export const RED_FLAG_TEST_CASE = {
  symptoms: [
    { code: 'fainting', label: 'Fainting / Blackout episode', category: 'body' as const, severity: 3 as const, duration: 'today' as const },
    { code: 'heavy_bleeding', label: 'Heavy Bleeding with large clots', category: 'period' as const, severity: 3 as const, duration: 'today' as const }
  ],
  flow: 'very_heavy' as const,
  lifeStage: 'menstrual' as const
};

export const PRIYA_USER = {
  id: 'demo_priya',
  name: 'Priya Sharma',
  email: 'priya.demo@khoj.health',
  isDemo: true,
  createdAt: '2026-01-01T00:00:00Z'
};

// Realistic cycle logs matching Panel 2
export const PRIYA_CYCLE_LOGS = [
  { date: '2026-04-06', isPeriod: true, flow: 'heavy' as const, painSeverity: 2 as const, mood: 'Tired', isPeriodStart: true },
  { date: '2026-04-07', isPeriod: true, flow: 'heavy' as const, painSeverity: 2 as const, mood: 'Low energy' },
  { date: '2026-04-08', isPeriod: true, flow: 'moderate' as const, painSeverity: 1 as const, mood: 'Calm', isPeriodEnd: true },
  { date: '2026-04-09', isPeriod: false, flow: 'spotting' as const, painSeverity: 0 as const, mood: 'Better', notes: 'Residual spotting' },
  { date: '2026-03-08', isPeriod: true, flow: 'heavy' as const, painSeverity: 2 as const, isPeriodStart: true },
  { date: '2026-03-09', isPeriod: true, flow: 'heavy' as const, painSeverity: 2 as const },
  { date: '2026-03-10', isPeriod: true, flow: 'moderate' as const, painSeverity: 1 as const },
  { date: '2026-03-11', isPeriod: true, flow: 'light' as const, painSeverity: 0 as const, isPeriodEnd: true },
  { date: '2026-02-09', isPeriod: true, flow: 'heavy' as const, painSeverity: 3 as const, isPeriodStart: true },
  { date: '2026-02-10', isPeriod: true, flow: 'heavy' as const, painSeverity: 2 as const },
  { date: '2026-02-11', isPeriod: true, flow: 'moderate' as const, painSeverity: 1 as const },
  { date: '2026-02-12', isPeriod: true, flow: 'light' as const, isPeriodEnd: true }
];

export const PRIYA_CYCLE_ESTIMATES = {
  averageCycleLength: 28,
  averagePeriodLength: 5,
  longestCycle: 32,
  shortestCycle: 25,
  nextPeriodRange: {
    start: '2026-05-04',
    end: '2026-05-08',
    daysAwayMin: 8,
    daysAwayMax: 12
  },
  isIrregular: true,
  irregularReason: 'Your last 3 cycle lengths vary by more than 7 days. This is worth mentioning to a doctor. Not a diagnosis.',
  recentCycles: [
    { month: 'Nov', length: 26 },
    { month: 'Dec', length: 28 },
    { month: 'Jan', length: 30 },
    { month: 'Feb', length: 27 },
    { month: 'Mar', length: 29 },
    { month: 'Apr', length: 31 }
  ]
};

// 3 Realistic private diary entries matching Panel 4
export const PRIYA_DIARY_ENTRIES = [
  {
    id: 'diary-1',
    userId: 'demo_priya',
    date: '2026-04-16',
    title: 'A step towards feeling better',
    body: 'Today I felt more energetic. I went for a short walk and it really helped clear my mind. Drank jeera water in the afternoon. Feeling grateful for quiet progress.',
    mood: 'hopeful' as const,
    linkedCheckinId: 'chk-apr-20',
    isDemo: true,
    includeInPassport: false,
    createdAt: '2026-04-16T17:30:00Z',
    updatedAt: '2026-04-16T17:30:00Z'
  },
  {
    id: 'diary-2',
    userId: 'demo_priya',
    date: '2026-04-12',
    title: 'Tough day but I’m proud',
    body: 'Cramps were strong today but I rested, had a warm drink, and used the heat pad. Gave myself permission to slow down and cancel extra evening plans.',
    mood: 'tired' as const,
    linkedCheckinId: 'chk-apr-18',
    isDemo: true,
    includeInPassport: false,
    createdAt: '2026-04-12T20:15:00Z',
    updatedAt: '2026-04-12T20:15:00Z'
  },
  {
    id: 'diary-3',
    userId: 'demo_priya',
    date: '2026-04-08',
    title: 'Noticed a pattern',
    body: 'I feel more tired before my period starts. Writing this down helps me see that my body isn’t failing me; it’s just communicating. I will ask the doctor about ferritin.',
    mood: 'calm' as const,
    linkedCheckinId: 'chk-mar-10',
    isDemo: true,
    includeInPassport: false,
    createdAt: '2026-04-08T11:00:00Z',
    updatedAt: '2026-04-08T11:00:00Z'
  }
];

export const STORAGE_KEYS = {
  SESSION: 'khoj_auth_session',
  USERS: 'khoj_local_users',
  ACTIVE_USER_ID: 'khoj_active_user_id',
  PROFILE: 'khoj_profile',
  CONSENTS: 'khoj_consents',
  CHECKINS: 'khoj_checkins',
  FOLLOWUPS: 'khoj_followups',
  PASSPORT: 'khoj_passport_draft',
  CYCLES: 'khoj_cycles',
  DIARY: 'khoj_diary_entries',
  LANGUAGE: 'khoj_language',
  USE_MOCK: 'khoj_use_mock',
  TOUR_DISMISSED: 'khoj_tour_dismissed'
};

export function getUserScopedKey(baseKey: string, userId?: string): string {
  const effectiveUserId = userId || localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'demo_priya';
  return `${baseKey}_${effectiveUserId}`;
}

export function loadDemoData(): void {
  try {
    const demoId = 'demo_priya';
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, demoId);
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({
      user: PRIYA_USER,
      isAuthenticated: true,
      isDemo: true
    }));

    // Save into Priya's scoped keys
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.PROFILE, demoId), JSON.stringify(PRIYA_PROFILE));
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.CONSENTS, demoId), JSON.stringify(PRIYA_CONSENTS));
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.CHECKINS, demoId), JSON.stringify(PRIYA_CHECKINS));
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.FOLLOWUPS, demoId), JSON.stringify(PRIYA_FOLLOWUPS));
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.PASSPORT, demoId), JSON.stringify(PRIYA_PASSPORT_DRAFT));
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.CYCLES, demoId), JSON.stringify(PRIYA_CYCLE_LOGS));
    localStorage.setItem(getUserScopedKey(STORAGE_KEYS.DIARY, demoId), JSON.stringify(PRIYA_DIARY_ENTRIES));

    // Also write to base keys for backward-compatibility
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(PRIYA_PROFILE));
    localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(PRIYA_CONSENTS));
    localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(PRIYA_CHECKINS));
    localStorage.setItem(STORAGE_KEYS.FOLLOWUPS, JSON.stringify(PRIYA_FOLLOWUPS));
    localStorage.setItem(STORAGE_KEYS.PASSPORT, JSON.stringify(PRIYA_PASSPORT_DRAFT));
    localStorage.setItem(STORAGE_KEYS.CYCLES, JSON.stringify(PRIYA_CYCLE_LOGS));
    localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(PRIYA_DIARY_ENTRIES));
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, 'en');
  } catch (err) {
    console.warn('Failed to save demo data to localStorage', err);
  }
}

export function clearAllData(): void {
  try {
    const activeUserId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'demo_priya';
    
    // Clear user scoped data
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.PROFILE, activeUserId));
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.CONSENTS, activeUserId));
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.CHECKINS, activeUserId));
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.FOLLOWUPS, activeUserId));
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.PASSPORT, activeUserId));
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.CYCLES, activeUserId));
    localStorage.removeItem(getUserScopedKey(STORAGE_KEYS.DIARY, activeUserId));

    // Clear base keys
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CONSENTS);
    localStorage.removeItem(STORAGE_KEYS.CHECKINS);
    localStorage.removeItem(STORAGE_KEYS.FOLLOWUPS);
    localStorage.removeItem(STORAGE_KEYS.PASSPORT);
    localStorage.removeItem(STORAGE_KEYS.CYCLES);
    localStorage.removeItem(STORAGE_KEYS.DIARY);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  } catch (err) {
    console.warn('Failed to clear data from localStorage', err);
  }
}

