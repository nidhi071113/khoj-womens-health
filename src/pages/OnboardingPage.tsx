import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/brand/Logo';
import { ThreadProgress, ThreadLoader } from '../components/brand/ThreadMotifs';
import { Language, LifeStage, Profile } from '../lib/types';
import { 
  ArrowLeft, 
  ArrowRight, 
  Database, 
  Sparkles, 
  FileCheck2, 
  EyeOff, 
  Check,
  Calendar,
  ChevronDown
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    language, 
    setLanguage, 
    profile, 
    updateProfile, 
    consents, 
    updateConsents,
    updatePassportDraft,
    refreshAll,
    loadDemo
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isWeaving, setIsWeaving] = useState<boolean>(false);

  // Form states - starts clean for any woman to onboard with her own name
  const [userName, setUserName] = useState<string>(() => {
    if (profile?.name && profile.name !== 'Priya Sharma' && profile.name !== 'Priya') {
      return profile.name;
    }
    return '';
  });
  const [selectedLifeStage, setSelectedLifeStage] = useState<LifeStage>(profile?.lifeStage || 'menstrual');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(
    profile?.concerns && profile.concerns.length > 0 ? profile.concerns : ['Heavy periods', 'Tired all the time']
  );
  const [ageRange, setAgeRange] = useState<string>(profile?.ageRange || '25 - 29');
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(profile?.lastPeriod || '2026-04-12');
  const [cycleLength, setCycleLength] = useState<string>(profile?.cycleLength || "I don't know");

  // Consent toggles matching image defaults
  const [saveData, setSaveData] = useState<boolean>(true);
  const [aiExplain, setAiExplain] = useState<boolean>(true);
  const [sharePassport, setSharePassport] = useState<boolean>(true);
  const [discreetMode, setDiscreetMode] = useState<boolean>(false);

  const concernOptions = [
    'Painful periods',
    'Heavy periods',
    'Irregular cycles',
    'Tired all the time',
    'Skin or hair changes',
    'Pregnancy or postpartum',
    'Perimenopause',
    'Just curious'
  ];

  const toggleConcern = (concern: string) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== concern));
    } else {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleSkip = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const finishOnboarding = async () => {
    setIsWeaving(true);

    const cleanName = userName.trim();
    const finalName = cleanName || 'Friend';

    // 1. Save consents
    await updateConsents({
      saveData,
      aiExplain,
      sharePassport,
      discreetMode
    });

    // 2. Save woman's actual profile with her entered name and settings
    const newProfile: Profile = {
      language,
      name: finalName,
      lifeStage: selectedLifeStage,
      concerns: selectedConcerns,
      ageRange,
      lastPeriod: lastPeriodDate || undefined,
      cycleLength,
      onboardingCompleted: true
    };
    await updateProfile(newProfile);

    // 3. Update personalized Passport Draft for her
    await updatePassportDraft({
      includeTimeline: true,
      includePatterns: true,
      includeMedications: true,
      includeQuestions: true,
      patientNotes: `Initial baseline recorded during onboarding for ${finalName}.`,
      customQuestions: selectedConcerns.map(c => `Discuss ${c.toLowerCase()} with doctor`)
    });

    // 4. Initialize check-in history if empty so timeline renders immediately
    try {
      const existingCheckinsRaw = localStorage.getItem('khoj_checkins');
      if (!existingCheckinsRaw || JSON.parse(existingCheckinsRaw).length === 0) {
        // Initialize timeline checkins customized for her
        const baselineCheckins = [
          {
            id: `chk-${Date.now() - 86400000 * 20}`,
            recordedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
            symptoms: selectedConcerns.map(c => ({ id: c.toLowerCase().replace(/\s+/g, '-'), name: c, severity: 2 })),
            flow: 3,
            notes: 'Heavy bleeding and fatigue noted'
          },
          {
            id: `chk-${Date.now() - 86400000 * 10}`,
            recordedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
            symptoms: [{ id: 'fatigue', name: 'Fatigue', severity: 2 }, { id: 'dizziness', name: 'Dizziness', severity: 1 }],
            notes: 'Felt lightheaded during the day'
          },
          {
            id: `chk-${Date.now() - 86400000 * 2}`,
            recordedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            symptoms: [{ id: 'tired', name: 'Tired all the time', severity: 2 }],
            notes: 'Resting frequently'
          }
        ];
        localStorage.setItem('khoj_checkins', JSON.stringify(baselineCheckins));
      }
    } catch (e) {
      console.warn('Error initializing baseline checkins:', e);
    }

    // Refresh context so all components have her actual profile
    await refreshAll();

    setTimeout(() => {
      setIsWeaving(false);
      navigate('/app');
    }, 1500);
  };

  if (isWeaving) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center font-body animate-fade-in">
        <Logo size="lg" />
        <ThreadLoader label="Weaving your first health thread..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-start sm:justify-between p-3.5 sm:p-8 font-body text-ink selection:bg-blush selection:text-plum overflow-y-auto">
      {/* Header with Logo on left and Skip on right matching Panel 2 in image */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between pb-2">
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <Logo size="sm" showTagline={false} />
        </div>

        <button
          onClick={handleSkip}
          className="text-xs sm:text-sm font-semibold text-ink-muted hover:text-plum px-3 py-1.5 rounded-lg transition-colors"
        >
          Skip
        </button>
      </header>

      {/* Main Container */}
      <div className="max-w-xl w-full mx-auto my-auto py-2">
        {/* Flowing Thread Progress Indicator */}
        <ThreadProgress currentStep={step} totalSteps={4} />

        {/* Card Container */}
        <div className="bg-white/95 border border-clay rounded-4xl p-6 sm:p-8 shadow-plum-md mt-3 relative">
          {/* STEP 1: Choose your language */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-1.5">
                  1. Choose your language
                </h2>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  Select the language you're most comfortable with. You can change this anytime.
                </p>
              </div>

              {/* 3 Large Language Cards matching image */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'en' as Language, label: 'English', symbol: 'A', iconBg: 'bg-cream-dark' },
                  { id: 'hi' as Language, label: 'हिंदी', symbol: 'अ', iconBg: 'bg-blush' },
                  { id: 'mr' as Language, label: 'मराठी', symbol: 'म', iconBg: 'bg-blush-soft' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setLanguage(item.id)}
                    className={`p-4 rounded-3xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      language === item.id
                        ? 'bg-cream border-sindoor ring-2 ring-sindoor/30 shadow-plum-sm font-bold scale-102'
                        : 'bg-white border-clay text-ink hover:bg-blush/40'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-2xl ${item.iconBg} border border-clay/60 flex items-center justify-center font-serif text-lg text-plum font-semibold`}>
                      {item.symbol}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-ink">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* What should we call you? input */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-2">
                  What should we call you? (Optional)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Type your name (e.g. Ananya, Sunita, Priya...)"
                  className="w-full px-4 py-3 rounded-2xl border border-clay bg-cream-light text-ink placeholder:text-ink-muted/60 text-sm focus:outline-none focus:border-sindoor focus:bg-white transition-colors"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Your life stage */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-1.5">
                  2. Your life stage
                </h2>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  This helps us show you the most relevant information. You can change anytime.
                </p>
              </div>

              {/* 5 Life stage cards matching image layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'menstrual' as LifeStage, label: 'Menstrual cycles', icon: '🌸' },
                  { id: 'pregnant' as LifeStage, label: 'Pregnant', icon: '🤰' },
                  { id: 'postpartum' as LifeStage, label: 'Postpartum', icon: '👶' },
                  { id: 'perimenopause' as LifeStage, label: 'Perimenopause', icon: '🌿' },
                  { id: 'not_sure' as LifeStage, label: 'Not sure', icon: '❓' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLifeStage(item.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      selectedLifeStage === item.id
                        ? 'bg-cream border-sindoor ring-2 ring-sindoor/30 shadow-xs font-semibold'
                        : 'bg-white border-clay text-ink hover:bg-blush/40'
                    }`}
                  >
                    <span className="text-2xl mb-1">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-medium text-ink">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* "What brings you here today?" chips */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-2.5">
                  What brings you here today? (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {concernOptions.map(concern => {
                    const isSelected = selectedConcerns.includes(concern);
                    return (
                      <button
                        key={concern}
                        onClick={() => toggleConcern(concern)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-sindoor text-cream border-sindoor shadow-xs'
                            : 'bg-cream-light border-clay text-ink-muted hover:text-plum hover:bg-blush/40'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {concern}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Privacy and consent */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-1.5">
                  3. Privacy and consent
                </h2>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  Your privacy matters. You can change these anytime in Settings.
                </p>
              </div>

              {/* 4 Cards with icon, text, and toggles matching image */}
              <div className="space-y-3">
                {[
                  {
                    icon: Database,
                    title: 'Save my data',
                    desc: 'Helps us remember your history and insights.',
                    value: saveData,
                    toggle: () => setSaveData(!saveData)
                  },
                  {
                    icon: Sparkles,
                    title: 'Use AI to explain my results',
                    desc: 'Get plain-language explanations.',
                    value: aiExplain,
                    toggle: () => setAiExplain(!aiExplain)
                  },
                  {
                    icon: FileCheck2,
                    title: 'Share reports with doctors',
                    desc: 'Only with your consent.',
                    value: sharePassport,
                    toggle: () => setSharePassport(!sharePassport)
                  },
                  {
                    icon: EyeOff,
                    title: 'Discreet mode',
                    desc: 'Hides health info in notifications and previews.',
                    value: discreetMode,
                    toggle: () => setDiscreetMode(!discreetMode)
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-cream-light border border-clay"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-clay flex items-center justify-center text-sindoor flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs sm:text-sm text-plum">{item.title}</h4>
                          <p className="text-[11px] sm:text-xs text-ink-muted">{item.desc}</p>
                        </div>
                      </div>

                      <button
                        onClick={item.toggle}
                        role="switch"
                        aria-checked={item.value}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors flex-shrink-0 ${
                          item.value ? 'bg-sage' : 'bg-clay-dark'
                        }`}
                      >
                        <div 
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            item.value ? 'translate-x-5' : 'translate-x-0'
                          }`} 
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Optional details */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-1.5">
                  4. Optional details
                </h2>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                  This helps us give you more relevant insights. (You can skip this.)
                </p>
              </div>

              <div className="space-y-4">
                {/* Age range */}
                <div>
                  <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-1.5">
                    Age range
                  </label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-clay bg-cream-light text-ink text-sm focus:outline-none focus:border-sindoor focus:bg-white"
                  >
                    <option value="Under 18">Under 18</option>
                    <option value="18 - 24">18 - 24</option>
                    <option value="25 - 29">25 - 29</option>
                    <option value="30 - 39">30 - 39</option>
                    <option value="40 - 49">40 - 49</option>
                    <option value="50+">50+</option>
                  </select>
                </div>

                {/* Last period date */}
                <div>
                  <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-1.5">
                    Last period date
                  </label>
                  <input
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-clay bg-cream-light text-ink text-sm focus:outline-none focus:border-sindoor focus:bg-white"
                  />
                </div>

                {/* Usual cycle length */}
                <div>
                  <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-1.5">
                    Usual cycle length
                  </label>
                  <select
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-clay bg-cream-light text-ink text-sm focus:outline-none focus:border-sindoor focus:bg-white"
                  >
                    <option value="I don't know">I don't know</option>
                    <option value="21 - 25 days">21 - 25 days</option>
                    <option value="28-30 days">28 - 30 days</option>
                    <option value="31 - 35 days">31 - 35 days</option>
                    <option value="Irregular">Irregular</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons matching image */}
          <div className="pt-6 mt-6 border-t border-clay/60 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-ink-muted hover:text-plum transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-xs sm:text-sm shadow-sindoor transition-all transform active:scale-95"
            >
              <span>{step === 4 ? 'Complete Setup' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative thread line & reassurance under card */}
        <div className="mt-4 text-center">
          <p className="text-xs text-ink-muted">
            You can change this anytime.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-ink-muted py-2">
        Khoj (खोज) • Private & secure on your device
      </footer>
    </div>
  );
};
