import { 
  Profile, 
  Consents, 
  Checkin, 
  SafetyResult, 
  Pattern, 
  CareRecommendation, 
  Provider, 
  Followup, 
  PassportDraft, 
  TimelineDataPoint,
  LifeStage,
  SymptomEntry,
  User,
  AuthSession,
  CycleDayLog,
  CycleEstimates,
  DiaryEntry
} from './types';
import { 
  STORAGE_KEYS, 
  loadDemoData as seedDemoData, 
  clearAllData as wipeAllData,
  getUserScopedKey,
  PRIYA_PROFILE,
  PRIYA_CONSENTS,
  PRIYA_CHECKINS,
  PRIYA_FOLLOWUPS,
  PRIYA_PASSPORT_DRAFT,
  PRIYA_USER,
  PRIYA_CYCLE_LOGS,
  PRIYA_CYCLE_ESTIMATES,
  PRIYA_DIARY_ENTRIES
} from './mockData';
import { assessSafetyMock } from './mock/mockSafety';
import { analyzePatternsMock } from './mock/mockPatterns';
import { getCareRecommendationMock } from './mock/mockCare';
import { SAMPLE_PUNE_PROVIDERS } from './mock/mockProviders';

// API Environment configuration
export const USE_MOCK: boolean = import.meta.env.VITE_USE_MOCK !== 'false';
export const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Helper for local storage retrieval with defaults
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

// ==================== AUTHENTICATION ====================
export async function getSession(): Promise<AuthSession> {
  const session = getStored<AuthSession>(STORAGE_KEYS.SESSION, {
    user: null,
    isAuthenticated: false,
    isDemo: false
  });
  return session;
}

export async function login(email: string, _password: string): Promise<AuthSession> {
  const users = getStored<User[]>(STORAGE_KEYS.USERS, []);
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (found) {
    const session: AuthSession = {
      user: found,
      isAuthenticated: true,
      isDemo: false
    };
    setStored(STORAGE_KEYS.SESSION, session);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, found.id);
    return session;
  }

  // If email is Priya demo email
  if (email.toLowerCase().includes('priya') || email.toLowerCase().includes('demo')) {
    return loginDemo();
  }

  // Allow signing in as a guest user if not registered
  const newUser: User = {
    id: `user_${Date.now()}`,
    name: email.split('@')[0],
    email: email,
    isDemo: false,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  setStored(STORAGE_KEYS.USERS, users);
  
  const session: AuthSession = {
    user: newUser,
    isAuthenticated: true,
    isDemo: false
  };
  setStored(STORAGE_KEYS.SESSION, session);
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, newUser.id);
  return session;
}

export async function register(name: string, email: string, _password: string): Promise<AuthSession> {
  const users = getStored<User[]>(STORAGE_KEYS.USERS, []);
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  const user: User = existing || {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    isDemo: false,
    createdAt: new Date().toISOString()
  };

  if (!existing) {
    users.push(user);
    setStored(STORAGE_KEYS.USERS, users);
  }

  const session: AuthSession = {
    user,
    isAuthenticated: true,
    isDemo: false
  };
  setStored(STORAGE_KEYS.SESSION, session);
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, user.id);

  // Initialize new user's profile with their name
  const scopedProfileKey = getUserScopedKey(STORAGE_KEYS.PROFILE, user.id);
  const userProfile: Profile = {
    name: user.name,
    language: 'en',
    lifeStage: 'menstrual',
    ageRange: '25-34',
    cycleLength: '28 days',
    onboardingCompleted: false
  };
  setStored(scopedProfileKey, userProfile);
  setStored(STORAGE_KEYS.PROFILE, userProfile);

  return session;
}

export async function loginDemo(): Promise<AuthSession> {
  seedDemoData();
  const session: AuthSession = {
    user: PRIYA_USER,
    isAuthenticated: true,
    isDemo: true
  };
  setStored(STORAGE_KEYS.SESSION, session);
  localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, PRIYA_USER.id);
  return session;
}

export async function logout(): Promise<void> {
  const session: AuthSession = {
    user: null,
    isAuthenticated: false,
    isDemo: false
  };
  setStored(STORAGE_KEYS.SESSION, session);
  localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
}

// 1. Health check
export async function getHealth(): Promise<{ status: string; mock: boolean; timestamp: string }> {
  if (USE_MOCK) {
    return { status: 'healthy', mock: true, timestamp: new Date().toISOString() };
  }
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

// 2. Profile
export async function getProfile(): Promise<Profile | null> {
  if (USE_MOCK) {
    return getStored<Profile | null>(STORAGE_KEYS.PROFILE, null);
  }
  const res = await fetch(`${API_BASE_URL}/profile`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Can’t reach Khoj server to load profile.');
  }
  return res.json();
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  if (USE_MOCK) {
    setStored(STORAGE_KEYS.PROFILE, profile);
    return profile;
  }
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server to save profile.');
  return res.json();
}

// 3. Consents
export async function getConsents(): Promise<Consents> {
  if (USE_MOCK) {
    return getStored<Consents>(STORAGE_KEYS.CONSENTS, {
      saveData: true,
      aiExplain: true,
      sharePassport: true,
      discreetMode: false
    });
  }
  const res = await fetch(`${API_BASE_URL}/consents`);
  if (!res.ok) throw new Error('Can’t reach Khoj server for consents.');
  return res.json();
}

export async function saveConsents(consents: Consents): Promise<Consents> {
  if (USE_MOCK) {
    setStored(STORAGE_KEYS.CONSENTS, consents);
    return consents;
  }
  const res = await fetch(`${API_BASE_URL}/consents`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consents)
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server to update consents.');
  return res.json();
}

// 4. Safety evaluation
export async function assessSafety(
  symptoms: SymptomEntry[], 
  lifeStage: LifeStage, 
  flow?: string
): Promise<SafetyResult> {
  if (USE_MOCK) {
    return assessSafetyMock(symptoms, lifeStage, flow);
  }
  const res = await fetch(`${API_BASE_URL}/safety/assess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms, lifeStage, flow })
  });
  if (!res.ok) throw new Error('Safety assessment service unavailable.');
  return res.json();
}

// 5. Check-ins
export async function createCheckin(
  data: Omit<Checkin, 'id' | 'recordedAt'>
): Promise<{ checkin: Checkin; safety: SafetyResult; patternCount: number }> {
  // Step 1: Safety runs FIRST
  const safety = await assessSafety(data.symptoms, data.lifeStage, data.flow);

  // If mock mode
  if (USE_MOCK) {
    const newCheckin: Checkin = {
      id: `chk-${Date.now()}`,
      recordedAt: new Date().toISOString(),
      ...data
    };

    const consents = await getConsents();
    if (consents.saveData) {
      const existing = getStored<Checkin[]>(STORAGE_KEYS.CHECKINS, []);
      existing.unshift(newCheckin);
      setStored(STORAGE_KEYS.CHECKINS, existing);
    }

    const currentCheckins = getStored<Checkin[]>(STORAGE_KEYS.CHECKINS, [newCheckin]);
    const patterns = analyzePatternsMock(currentCheckins);

    return {
      checkin: newCheckin,
      safety,
      patternCount: patterns.length
    };
  }

  // Real backend mode
  const res = await fetch(`${API_BASE_URL}/checkins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server to submit check-in.');
  return res.json();
}

export async function listCheckins(): Promise<Checkin[]> {
  if (USE_MOCK) {
    return getStored<Checkin[]>(STORAGE_KEYS.CHECKINS, []);
  }
  const res = await fetch(`${API_BASE_URL}/checkins`);
  if (!res.ok) throw new Error('Can’t reach Khoj server to list check-ins.');
  return res.json();
}

// 6. Timeline
export async function getTimeline(rangeDays: number = 90): Promise<{
  points: TimelineDataPoint[];
  cycles: { start: string; end?: string; cycleNumber: number }[];
}> {
  if (USE_MOCK) {
    const checkins = getStored<Checkin[]>(STORAGE_KEYS.CHECKINS, []);
    
    // Convert checkins to timeline data points
    const pointsMap: { [date: string]: TimelineDataPoint } = {};
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);

    checkins.forEach(chk => {
      const d = chk.recordedAt.split('T')[0];
      const chkDate = new Date(chk.recordedAt);
      if (chkDate < cutoff) return;

      if (!pointsMap[d]) {
        pointsMap[d] = {
          date: d,
          symptoms: {},
          isCycleStart: chk.flow === 'heavy' || chk.flow === 'moderate',
          notes: chk.notes
        };
      }

      chk.symptoms.forEach(s => {
        pointsMap[d].symptoms[s.code] = Math.max(pointsMap[d].symptoms[s.code] || 0, s.severity + 1);
      });

      if (chk.flow === 'heavy') {
        pointsMap[d].symptoms['heavy_bleeding'] = 3;
      } else if (chk.flow === 'moderate') {
        pointsMap[d].symptoms['heavy_bleeding'] = 2;
      }
    });

    const sortedPoints = Object.values(pointsMap).sort((a, b) => a.date.localeCompare(b.date));

    // Mark cluster knot points where >= 3 symptoms overlap
    sortedPoints.forEach(p => {
      const activeCount = Object.keys(p.symptoms).length;
      if (activeCount >= 3) {
        p.isKnot = true;
      }
    });

    return {
      points: sortedPoints,
      cycles: [
        { start: '2026-01-14', end: '2026-01-18', cycleNumber: 1 },
        { start: '2026-02-11', end: '2026-02-15', cycleNumber: 2 },
        { start: '2026-03-12', end: '2026-03-16', cycleNumber: 3 },
        { start: '2026-04-12', end: '2026-04-16', cycleNumber: 4 }
      ]
    };
  }

  const res = await fetch(`${API_BASE_URL}/timeline?range=${rangeDays}`);
  if (!res.ok) throw new Error('Can’t reach Khoj server to retrieve timeline.');
  return res.json();
}

// 7. Insights & Patterns
export async function getInsights(): Promise<Pattern[]> {
  if (USE_MOCK) {
    const checkins = getStored<Checkin[]>(STORAGE_KEYS.CHECKINS, []);
    return analyzePatternsMock(checkins);
  }
  const res = await fetch(`${API_BASE_URL}/insights`);
  if (!res.ok) throw new Error('Can’t reach Khoj server to fetch insights.');
  return res.json();
}

export async function getInsight(id: string): Promise<Pattern | null> {
  if (USE_MOCK) {
    const patterns = await getInsights();
    return patterns.find(p => p.id === id) || null;
  }
  const res = await fetch(`${API_BASE_URL}/insights/${id}`);
  if (!res.ok) throw new Error('Can’t reach Khoj server for insight details.');
  return res.json();
}

// 8. Care Recommendations & Providers
export async function getCareRecommendation(filters?: any): Promise<CareRecommendation> {
  if (USE_MOCK) {
    const patterns = await getInsights();
    return getCareRecommendationMock(patterns, filters);
  }
  const res = await fetch(`${API_BASE_URL}/care/recommendation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters || {})
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server for care recommendations.');
  return res.json();
}

export async function getProviders(filters?: any): Promise<Provider[]> {
  if (USE_MOCK) {
    const rec = await getCareRecommendation(filters);
    return rec.providers;
  }
  const res = await fetch(`${API_BASE_URL}/providers`);
  if (!res.ok) throw new Error('Can’t reach Khoj server for healthcare providers.');
  return res.json();
}

// 9. Passport & Follow-ups
export async function getPassportDraft(): Promise<PassportDraft> {
  return getStored<PassportDraft>(STORAGE_KEYS.PASSPORT, {
    includeTimeline: true,
    includePatterns: true,
    includeMedications: true,
    includeQuestions: true,
    patientNotes: '',
    customQuestions: [
      'Are my fatigue symptoms connected to heavy flow or iron deficiency?',
      'Do you recommend checking a CBC and ferritin panel?'
    ]
  });
}

export async function savePassportDraft(draft: PassportDraft): Promise<PassportDraft> {
  setStored(STORAGE_KEYS.PASSPORT, draft);
  return draft;
}

export async function exportPassport(draft: PassportDraft): Promise<{ success: boolean; message: string }> {
  if (USE_MOCK) {
    return { success: true, message: 'Doctor Passport generated successfully.' };
  }
  const res = await fetch(`${API_BASE_URL}/passport/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(draft)
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server to export passport.');
  return res.json();
}

export async function listFollowups(): Promise<Followup[]> {
  if (USE_MOCK) {
    return getStored<Followup[]>(STORAGE_KEYS.FOLLOWUPS, []);
  }
  const res = await fetch(`${API_BASE_URL}/followups`);
  if (!res.ok) throw new Error('Can’t reach Khoj server for follow-ups.');
  return res.json();
}

export async function addFollowup(text: string, dueDate?: string): Promise<Followup> {
  const newFollowup: Followup = {
    id: `f-${Date.now()}`,
    text,
    dueDate,
    done: false
  };
  if (USE_MOCK) {
    const list = getStored<Followup[]>(STORAGE_KEYS.FOLLOWUPS, []);
    list.unshift(newFollowup);
    setStored(STORAGE_KEYS.FOLLOWUPS, list);
    return newFollowup;
  }
  const res = await fetch(`${API_BASE_URL}/followups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, dueDate })
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server to add follow-up.');
  return res.json();
}

export async function updateFollowup(id: string, updates: Partial<Followup>): Promise<Followup> {
  if (USE_MOCK) {
    const list = getStored<Followup[]>(STORAGE_KEYS.FOLLOWUPS, []);
    const idx = list.findIndex(f => f.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      setStored(STORAGE_KEYS.FOLLOWUPS, list);
      return list[idx];
    }
    throw new Error('Followup not found');
  }
  const res = await fetch(`${API_BASE_URL}/followups/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Can’t reach Khoj server to update follow-up.');
  return res.json();
}

export async function deleteMyData(): Promise<void> {
  if (USE_MOCK) {
    wipeAllData();
    return;
  }
  const res = await fetch(`${API_BASE_URL}/me`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Can’t reach Khoj server to erase data.');
}

export async function loadDemoData(): Promise<void> {
  seedDemoData();
}

// ==================== CYCLE TRACKING ====================
export async function listCycleLogs(): Promise<CycleDayLog[]> {
  const session = await getSession();
  const activeUserId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || (session.isDemo ? 'demo_priya' : 'user');
  const key = getUserScopedKey(STORAGE_KEYS.CYCLES, activeUserId);
  const defaultLogs = session.isDemo ? PRIYA_CYCLE_LOGS : [];
  const logs = getStored<CycleDayLog[]>(key, defaultLogs);
  return logs;
}

export async function saveCycleDayLog(dayLog: CycleDayLog): Promise<CycleDayLog[]> {
  const session = await getSession();
  const activeUserId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || (session.isDemo ? 'demo_priya' : 'user');
  const key = getUserScopedKey(STORAGE_KEYS.CYCLES, activeUserId);
  const logs = await listCycleLogs();
  
  const existingIdx = logs.findIndex(l => l.date === dayLog.date);
  if (existingIdx !== -1) {
    logs[existingIdx] = { ...logs[existingIdx], ...dayLog };
  } else {
    logs.push(dayLog);
  }
  
  // Sort descending by date
  logs.sort((a, b) => b.date.localeCompare(a.date));
  
  setStored(key, logs);
  setStored(STORAGE_KEYS.CYCLES, logs);
  return logs;
}

export async function getCycleEstimates(): Promise<CycleEstimates> {
  const session = await getSession();
  if (session.isDemo) {
    return PRIYA_CYCLE_ESTIMATES;
  }

  const logs = await listCycleLogs();
  const periodDays = logs.filter(l => l.isPeriod);
  
  if (periodDays.length < 2) {
    return {
      averageCycleLength: 28,
      averagePeriodLength: periodDays.length > 0 ? periodDays.length : 5,
      longestCycle: 28,
      shortestCycle: 28,
      nextPeriodRange: {
        start: '2026-05-04',
        end: '2026-05-08',
        daysAwayMin: 8,
        daysAwayMax: 12
      },
      isIrregular: false,
      recentCycles: []
    };
  }
  return PRIYA_CYCLE_ESTIMATES;
}

// ==================== PRIVATE DIARY ====================
// Diary entries are strictly client-side and NEVER sent to AI or external server
export async function listDiaryEntries(): Promise<DiaryEntry[]> {
  const activeUserId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'demo_priya';
  const key = getUserScopedKey(STORAGE_KEYS.DIARY, activeUserId);
  const entries = getStored<DiaryEntry[]>(key, getStored<DiaryEntry[]>(STORAGE_KEYS.DIARY, PRIYA_DIARY_ENTRIES));
  // Sort newest first
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveDiaryEntry(
  entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<DiaryEntry> {
  const activeUserId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'demo_priya';
  const key = getUserScopedKey(STORAGE_KEYS.DIARY, activeUserId);
  const entries = await listDiaryEntries();
  const now = new Date().toISOString();

  let savedEntry: DiaryEntry;

  if (entry.id) {
    const idx = entries.findIndex(e => e.id === entry.id);
    if (idx !== -1) {
      savedEntry = {
        ...entries[idx],
        ...entry,
        updatedAt: now
      };
      entries[idx] = savedEntry;
    } else {
      savedEntry = {
        id: entry.id,
        userId: activeUserId,
        createdAt: now,
        updatedAt: now,
        ...entry
      };
      entries.unshift(savedEntry);
    }
  } else {
    savedEntry = {
      id: `diary_${Date.now()}`,
      userId: activeUserId,
      createdAt: now,
      updatedAt: now,
      ...entry
    };
    entries.unshift(savedEntry);
  }

  setStored(key, entries);
  setStored(STORAGE_KEYS.DIARY, entries);
  return savedEntry;
}

export async function deleteDiaryEntry(id: string): Promise<void> {
  const activeUserId = localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || 'demo_priya';
  const key = getUserScopedKey(STORAGE_KEYS.DIARY, activeUserId);
  const entries = await listDiaryEntries();
  const filtered = entries.filter(e => e.id !== id);
  setStored(key, filtered);
  setStored(STORAGE_KEYS.DIARY, filtered);
}

// ==================== GUIDED DEMO TOUR ====================
export function isTourDismissed(): boolean {
  return localStorage.getItem(STORAGE_KEYS.TOUR_DISMISSED) === 'true';
}

export function setTourDismissed(dismissed: boolean): void {
  localStorage.setItem(STORAGE_KEYS.TOUR_DISMISSED, dismissed ? 'true' : 'false');
}

