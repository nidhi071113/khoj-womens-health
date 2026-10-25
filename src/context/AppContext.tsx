import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Profile, 
  Consents, 
  Checkin, 
  Pattern, 
  Followup, 
  PassportDraft, 
  SafetyResult, 
  Language,
  AuthSession,
  CycleDayLog,
  CycleEstimates,
  DiaryEntry
} from '../lib/types';
import { 
  getProfile, 
  saveProfile as apiSaveProfile, 
  getConsents, 
  saveConsents as apiSaveConsents, 
  listCheckins, 
  getInsights, 
  listFollowups, 
  addFollowup as apiAddFollowup, 
  updateFollowup as apiUpdateFollowup, 
  getPassportDraft, 
  savePassportDraft as apiSavePassportDraft,
  loadDemoData as apiLoadDemoData,
  deleteMyData as apiDeleteMyData,
  getSession as apiGetSession,
  login as apiLogin,
  register as apiRegister,
  loginDemo as apiLoginDemo,
  logout as apiLogout,
  listCycleLogs,
  saveCycleDayLog,
  getCycleEstimates,
  listDiaryEntries,
  saveDiaryEntry,
  deleteDiaryEntry as apiDeleteDiaryEntry,
  isTourDismissed,
  setTourDismissed
} from '../lib/api';
import { translations, Translations } from '../lib/i18n';
import { STORAGE_KEYS, PRIYA_CYCLE_ESTIMATES } from '../lib/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  profile: Profile | null;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  consents: Consents;
  updateConsents: (updates: Partial<Consents>) => Promise<Consents>;
  checkins: Checkin[];
  patterns: Pattern[];
  followups: Followup[];
  passportDraft: PassportDraft;
  updatePassportDraft: (updates: Partial<PassportDraft>) => Promise<PassportDraft>;
  toggleFollowup: (id: string) => Promise<void>;
  addFollowupItem: (text: string, dueDate?: string) => Promise<void>;
  
  // Auth state & actions
  session: AuthSession;
  login: (email: string, password: string) => Promise<AuthSession>;
  register: (name: string, email: string, password: string) => Promise<AuthSession>;
  loginDemo: () => Promise<AuthSession>;
  logout: () => Promise<void>;

  // Cycle state & actions
  cycleLogs: CycleDayLog[];
  cycleEstimates: CycleEstimates;
  addCycleDay: (log: CycleDayLog) => Promise<CycleDayLog[]>;

  // Diary state & actions
  diaryEntries: DiaryEntry[];
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<DiaryEntry>;
  updateDiaryEntry: (id: string, updates: Partial<DiaryEntry>) => Promise<DiaryEntry>;
  deleteDiaryEntry: (id: string) => Promise<void>;

  // Guided demo tour
  isTourOpen: boolean;
  startTour: () => void;
  dismissTour: () => void;

  // Data export
  exportMyDataJson: () => string;

  refreshAll: () => Promise<void>;
  loadDemo: () => Promise<void>;
  clearData: () => Promise<void>;
  safetyOverlay: {
    isOpen: boolean;
    result: SafetyResult | null;
    open: (res: SafetyResult) => void;
    close: () => void;
  };
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      return saved && ['en', 'hi', 'mr'].includes(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const [session, setSession] = useState<AuthSession>({
    user: null,
    isAuthenticated: false,
    isDemo: false
  });

  const [profile, setProfile] = useState<Profile | null>(null);
  const [consents, setConsents] = useState<Consents>({
    saveData: true,
    aiExplain: true,
    sharePassport: true,
    discreetMode: false
  });
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [followups, setFollowups] = useState<Followup[]>([]);
  const [passportDraft, setPassportDraft] = useState<PassportDraft>({
    includeTimeline: true,
    includePatterns: true,
    includeMedications: true,
    includeQuestions: true,
    patientNotes: '',
    customQuestions: []
  });
  const [cycleLogs, setCycleLogs] = useState<CycleDayLog[]>([]);
  const [cycleEstimates, setCycleEstimates] = useState<CycleEstimates>(PRIYA_CYCLE_ESTIMATES);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Safety overlay state
  const [safetyOverlay, setSafetyOverlay] = useState<{
    isOpen: boolean;
    result: SafetyResult | null;
  }>({
    isOpen: false,
    result: null
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn(e);
    }
  };

  const refreshAll = async () => {
    setIsLoading(true);
    try {
      const [sess, prof, cons, chks, patts, fols, pass, cycs, ests, diaries] = await Promise.all([
        apiGetSession(),
        getProfile(),
        getConsents(),
        listCheckins(),
        getInsights(),
        listFollowups(),
        getPassportDraft(),
        listCycleLogs(),
        getCycleEstimates(),
        listDiaryEntries()
      ]);
      setSession(sess);
      setProfile(prof);
      setConsents(cons);
      setCheckins(chks);
      setPatterns(patts);
      setFollowups(fols);
      setPassportDraft(pass);
      setCycleLogs(cycs);
      setCycleEstimates(ests);
      setDiaryEntries(diaries);

      // Check if tour should be shown for demo user
      if (sess.isDemo && !isTourDismissed()) {
        setIsTourOpen(true);
      }
    } catch (err) {
      console.error('Error refreshing app state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // Update browser document title based on discreet mode
  useEffect(() => {
    if (consents.discreetMode) {
      document.title = 'Notes';
    } else {
      document.title = 'KHOJ · खोज | Find what your body is trying to tell you';
    }
  }, [consents.discreetMode]);

  // Auth actions
  const login = async (email: string, password: string): Promise<AuthSession> => {
    const newSession = await apiLogin(email, password);
    setSession(newSession);
    await refreshAll();
    return newSession;
  };

  const register = async (name: string, email: string, password: string): Promise<AuthSession> => {
    const newSession = await apiRegister(name, email, password);
    setSession(newSession);
    await refreshAll();
    return newSession;
  };

  const loginDemo = async (): Promise<AuthSession> => {
    const newSession = await apiLoginDemo();
    setSession(newSession);
    await refreshAll();
    return newSession;
  };

  const logout = async (): Promise<void> => {
    await apiLogout();
    setSession({ user: null, isAuthenticated: false, isDemo: false });
    await refreshAll();
  };

  const updateProfile = async (updates: Partial<Profile>): Promise<Profile> => {
    const updated: Profile = {
      language: language,
      lifeStage: 'menstrual',
      ...(profile || {}),
      ...updates
    };
    const saved = await apiSaveProfile(updated);
    setProfile(saved);
    return saved;
  };

  const updateConsents = async (updates: Partial<Consents>): Promise<Consents> => {
    const updated: Consents = {
      ...consents,
      ...updates
    };
    const saved = await apiSaveConsents(updated);
    setConsents(saved);
    return saved;
  };

  const updatePassportDraft = async (updates: Partial<PassportDraft>): Promise<PassportDraft> => {
    const updated: PassportDraft = {
      ...passportDraft,
      ...updates
    };
    const saved = await apiSavePassportDraft(updated);
    setPassportDraft(saved);
    return saved;
  };

  const toggleFollowup = async (id: string) => {
    const item = followups.find(f => f.id === id);
    if (!item) return;
    const updated = await apiUpdateFollowup(id, { done: !item.done });
    setFollowups(prev => prev.map(f => f.id === id ? updated : f));
  };

  const addFollowupItem = async (text: string, dueDate?: string) => {
    const item = await apiAddFollowup(text, dueDate);
    setFollowups(prev => [item, ...prev]);
  };

  // Cycle actions
  const addCycleDay = async (log: CycleDayLog): Promise<CycleDayLog[]> => {
    const updatedLogs = await saveCycleDayLog(log);
    setCycleLogs(updatedLogs);
    return updatedLogs;
  };

  // Diary actions
  const addDiaryEntry = async (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiaryEntry> => {
    const saved = await saveDiaryEntry(entry);
    setDiaryEntries(prev => [saved, ...prev.filter(e => e.id !== saved.id)]);
    return saved;
  };

  const updateDiaryEntry = async (id: string, updates: Partial<DiaryEntry>): Promise<DiaryEntry> => {
    const existing = diaryEntries.find(e => e.id === id);
    if (!existing) throw new Error('Diary entry not found');
    const saved = await saveDiaryEntry({ ...existing, ...updates, id });
    setDiaryEntries(prev => prev.map(e => e.id === id ? saved : e));
    return saved;
  };

  const deleteDiaryEntry = async (id: string): Promise<void> => {
    await apiDeleteDiaryEntry(id);
    setDiaryEntries(prev => prev.filter(e => e.id !== id));
  };

  // Guided demo tour
  const startTour = () => {
    setIsTourOpen(true);
  };

  const dismissTour = () => {
    setIsTourOpen(false);
    setTourDismissed(true);
  };

  // Export JSON
  const exportMyDataJson = (): string => {
    const payload = {
      exportDate: new Date().toISOString(),
      user: session.user,
      profile,
      consents,
      checkins,
      cycleLogs,
      followups,
      passportDraft,
      diaryEntries: diaryEntries.filter(e => e.includeInPassport) // exclude private diary unless marked
    };
    return JSON.stringify(payload, null, 2);
  };

  const loadDemo = async () => {
    await apiLoadDemoData();
    await refreshAll();
  };

  const clearData = async () => {
    await apiDeleteMyData();
    setProfile(null);
    setCheckins([]);
    setPatterns([]);
    setFollowups([]);
    setCycleLogs([]);
    setDiaryEntries([]);
    setPassportDraft({
      includeTimeline: true,
      includePatterns: true,
      includeMedications: true,
      includeQuestions: true,
      patientNotes: '',
      customQuestions: []
    });
  };

  const openSafety = (result: SafetyResult) => {
    setSafetyOverlay({ isOpen: true, result });
  };

  const closeSafety = () => {
    setSafetyOverlay({ isOpen: false, result: null });
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        profile,
        updateProfile,
        consents,
        updateConsents,
        checkins,
        patterns,
        followups,
        passportDraft,
        updatePassportDraft,
        toggleFollowup,
        addFollowupItem,
        session,
        login,
        register,
        loginDemo,
        logout,
        cycleLogs,
        cycleEstimates,
        addCycleDay,
        diaryEntries,
        addDiaryEntry,
        updateDiaryEntry,
        deleteDiaryEntry,
        isTourOpen,
        startTour,
        dismissTour,
        exportMyDataJson,
        refreshAll,
        loadDemo,
        clearData,
        safetyOverlay: {
          isOpen: safetyOverlay.isOpen,
          result: safetyOverlay.result,
          open: openSafety,
          close: closeSafety
        },
        isLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
