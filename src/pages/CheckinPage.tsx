import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreadProgress } from '../components/brand/ThreadMotifs';
import { BodyMap } from '../components/checkin/BodyMap';
import { SymptomEntry, LifeStage, SafetyResult } from '../lib/types';
import { createCheckin } from '../lib/api';
import { parseNaturalLanguageSymptoms } from '../lib/mock/mockExplainer';
import { 
  Search, 
  Mic, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  Activity,
  Heart
} from 'lucide-react';

interface AvailableSymptom {
  code: string;
  label: string;
  category: 'period' | 'body' | 'skin_hair' | 'mood' | 'postpartum' | 'other';
  area?: 'head' | 'chest' | 'pelvis' | 'limbs';
}

const ALL_SYMPTOMS: AvailableSymptom[] = [
  // Period
  { code: 'heavy_bleeding', label: 'Heavy Bleeding', category: 'period', area: 'pelvis' },
  { code: 'cramps', label: 'Severe Cramps / Pelvic Pain', category: 'period', area: 'pelvis' },
  { code: 'irregular_cycle', label: 'Irregular Cycle Timing', category: 'period', area: 'pelvis' },
  { code: 'spotting', label: 'Spotting Between Periods', category: 'period', area: 'pelvis' },
  { code: 'clots', label: 'Large Blood Clots', category: 'period', area: 'pelvis' },

  // Energy & Body
  { code: 'fatigue', label: 'Tiredness / Low Energy', category: 'body', area: 'limbs' },
  { code: 'dizziness', label: 'Dizziness / Chakkar', category: 'body', area: 'head' },
  { code: 'headache', label: 'Headache / Migraine', category: 'body', area: 'head' },
  { code: 'bloating', label: 'Bloating & Gas', category: 'body', area: 'pelvis' },
  { code: 'backache', label: 'Lower Back Ache', category: 'body', area: 'pelvis' },
  { code: 'fainting', label: 'Fainting / Blackout episode', category: 'body', area: 'head' },

  // Skin & Hair
  { code: 'hair_fall', label: 'Noticeable Hair Fall', category: 'skin_hair', area: 'head' },
  { code: 'acne', label: 'Facial / Jawline Acne', category: 'skin_hair', area: 'head' },
  { code: 'dry_skin', label: 'Dry Skin / Flaking', category: 'skin_hair', area: 'limbs' },
  { code: 'facial_hair', label: 'Excess Facial / Chin Hair', category: 'skin_hair', area: 'head' },

  // Mood
  { code: 'mood_swings', label: 'Mood Swings', category: 'mood', area: 'head' },
  { code: 'anxiety', label: 'Anxiety / Restlessness', category: 'mood', area: 'head' },
  { code: 'brain_fog', label: 'Brain Fog / Poor Focus', category: 'mood', area: 'head' },
  { code: 'hopelessness', label: 'Feeling Overwhelmed', category: 'mood', area: 'head' },
  { code: 'self_harm', label: 'Thoughts of Self-Harm', category: 'mood', area: 'head' },

  // Postpartum
  { code: 'postpartum_bleeding', label: 'Postpartum Bleeding (Lochia)', category: 'postpartum', area: 'pelvis' },
  { code: 'wound_pain', label: 'Perineal or C-Section Wound Pain', category: 'postpartum', area: 'pelvis' },
  { code: 'feeding_difficulty', label: 'Feeding / Latch Challenges', category: 'postpartum', area: 'chest' },
  { code: 'sleep_deprivation', label: 'Severe Sleep Exhaustion', category: 'postpartum', area: 'head' },
  { code: 'postpartum_fever', label: 'Fever or Chills Post-Delivery', category: 'postpartum', area: 'head' }
];

export const CheckinPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { profile, safetyOverlay, refreshAll } = useApp();

  const [step, setStep] = useState<'symptoms' | 'severity' | 'duration' | 'context' | 'result'>('symptoms');
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('period');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [naturalLangInput, setNaturalLangInput] = useState<string>('');
  const [selectedBodyArea, setSelectedBodyArea] = useState<string | undefined>(undefined);
  const [isListening, setIsListening] = useState<boolean>(false);

  // Context fields
  const [flow, setFlow] = useState<'spotting' | 'light' | 'moderate' | 'heavy' | 'very_heavy'>('moderate');
  const [medications, setMedications] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Result state
  const [resultSafety, setResultSafety] = useState<SafetyResult | null>(null);

  // Postpartum mood screening state (5 EPDS-inspired questions)
  const isPostpartum = profile?.lifeStage === 'postpartum';
  const [postpartumScore, setPostpartumScore] = useState<number>(0);

  // Handle URL prefill from Home chips
  useEffect(() => {
    const prefill = searchParams.get('prefill');
    if (prefill === 'tired') {
      addSymptom({ code: 'fatigue', label: 'Tiredness / Low Energy', category: 'body', severity: 2, duration: 'few_days' });
    } else if (prefill === 'pain') {
      addSymptom({ code: 'cramps', label: 'Severe Cramps / Pelvic Pain', category: 'period', severity: 2, duration: 'today' });
    } else if (prefill === 'mood') {
      addSymptom({ code: 'mood_swings', label: 'Mood Swings', category: 'mood', severity: 1, duration: 'few_days' });
    }
  }, [searchParams]);

  const addSymptom = (entry: SymptomEntry) => {
    if (!selectedSymptoms.some(s => s.code === entry.code)) {
      setSelectedSymptoms(prev => [...prev, entry]);
    }
  };

  const toggleSymptomCode = (symptom: AvailableSymptom) => {
    if (selectedSymptoms.some(s => s.code === symptom.code)) {
      setSelectedSymptoms(prev => prev.filter(s => s.code !== symptom.code));
    } else {
      setSelectedSymptoms(prev => [
        ...prev,
        {
          code: symptom.code,
          label: symptom.label,
          category: symptom.category,
          severity: 1,
          duration: 'today'
        }
      ]);
    }
  };

  const handleBodyAreaSelect = (area: 'head' | 'chest' | 'pelvis' | 'limbs') => {
    setSelectedBodyArea(area);
  };

  const handleNaturalLanguageSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!naturalLangInput.trim()) return;

    const matches = parseNaturalLanguageSymptoms(naturalLangInput);
    if (matches.length > 0) {
      matches.forEach(m => {
        addSymptom({
          code: m.code,
          label: m.label,
          category: m.category,
          severity: 2,
          duration: 'few_days'
        });
      });
      setNaturalLangInput('');
    }
  };

  // Voice note speech recognition (falls back gracefully)
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setNaturalLangInput('chakkar aate hain aur pet mein dard hai');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = profile?.language === 'hi' ? 'hi-IN' : profile?.language === 'mr' ? 'mr-IN' : 'en-IN';
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNaturalLangInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const updateSeverity = (code: string, severity: 0 | 1 | 2 | 3) => {
    setSelectedSymptoms(prev => prev.map(s => s.code === code ? { ...s, severity } : s));
  };

  const updateDuration = (code: string, duration: SymptomEntry['duration']) => {
    setSelectedSymptoms(prev => prev.map(s => s.code === code ? { ...s, duration } : s));
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      addSymptom({
        code: 'routine_log',
        label: 'General Wellness Routine',
        category: 'other',
        severity: 0,
        duration: 'today'
      });
    }

    setIsSubmitting(true);
    try {
      const response = await createCheckin({
        lifeStage: profile?.lifeStage || 'menstrual',
        symptoms: selectedSymptoms,
        flow: flow,
        notes: notes.trim() || undefined,
        medications: medications.trim() || undefined
      });

      if (response.safety.showSafetyScreen) {
        safetyOverlay.open(response.safety);
        setIsSubmitting(false);
        return;
      }

      setResultSafety(response.safety);
      setStep('result');
      await refreshAll();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter symptoms based on Category chips, Search query, or Body map
  const filteredSymptoms = ALL_SYMPTOMS.filter(s => {
    if (isPostpartum && s.category === 'period') return false;
    if (!isPostpartum && s.category === 'postpartum') return false;

    if (searchQuery.trim()) {
      return s.label.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (selectedBodyArea) {
      return s.area === selectedBodyArea;
    }
    if (selectedCategory !== 'all') {
      return s.category === selectedCategory;
    }
    return true;
  });

  const getStepNumber = () => {
    switch (step) {
      case 'symptoms': return 1;
      case 'severity': return 2;
      case 'duration': return 3;
      case 'context': return 4;
      default: return 4;
    }
  };

  const categoryOptions = [
    { id: 'period', label: 'Period' },
    { id: 'body', label: 'Energy & body' },
    { id: 'skin_hair', label: 'Skin & hair' },
    { id: 'mood', label: 'Mood' },
    { id: 'postpartum', label: 'Pregnancy / postpartum' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8 animate-fade-in font-body text-ink">
      {/* Header and Step Progress */}
      {step !== 'result' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                if (step === 'context') setStep('duration');
                else if (step === 'duration') setStep('severity');
                else if (step === 'severity') setStep('symptoms');
                else navigate('/app');
              }}
              className="text-xs font-semibold text-ink-muted hover:text-plum flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <span className="text-xs text-sindoor font-semibold uppercase tracking-wider">
              SUNO सुनो • Step {getStepNumber()} of 4
            </span>
            <button
              onClick={() => {
                if (step === 'symptoms') setStep('severity');
                else if (step === 'severity') setStep('duration');
                else if (step === 'duration') setStep('context');
                else handleSubmit();
              }}
              className="text-xs text-ink-muted hover:text-plum"
            >
              Skip
            </button>
          </div>

          <ThreadProgress currentStep={getStepNumber()} totalSteps={4} />
        </div>
      )}

      {/* STEP A: What's happening? Matching Panel 3 Check-in in image */}
      {step === 'symptoms' && (
        <div className="bg-white border border-clay rounded-4xl p-6 shadow-plum-sm space-y-5">
          <div>
            <h2 className="font-heading text-2xl text-plum font-bold mb-1">
              What's happening?
            </h2>
            <p className="text-ink-muted text-xs sm:text-sm">
              Search a symptom, tap the body map, or speak in your own words.
            </p>
          </div>

          {/* Search Bar matching image */}
          <div className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Khoj a symptom..."
              className="w-full pl-10 pr-4 py-3 bg-cream-light border border-clay rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-sindoor focus:bg-white"
            />
          </div>

          {/* Category Chips matching Panel 3 in image */}
          <div>
            <span className="text-[11px] font-semibold text-plum uppercase tracking-wider block mb-2">
              Categories
            </span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedBodyArea(undefined);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id && !selectedBodyArea
                      ? 'bg-plum text-cream shadow-xs'
                      : 'bg-cream-light border border-clay text-ink hover:bg-blush/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body Map + Symptom Chips Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start pt-2">
            <div className="sm:col-span-5">
              <BodyMap onSelectArea={handleBodyAreaSelect} selectedArea={selectedBodyArea} />
            </div>

            <div className="sm:col-span-7 space-y-3">
              {selectedBodyArea && (
                <div className="flex items-center justify-between text-xs text-sindoor font-semibold bg-blush/60 px-3 py-1.5 rounded-xl">
                  <span>Filtered for: {selectedBodyArea}</span>
                  <button onClick={() => setSelectedBodyArea(undefined)} className="underline">Clear</button>
                </div>
              )}

              {/* Symptom Chips list */}
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
                {filteredSymptoms.map(item => {
                  const isSelected = selectedSymptoms.some(s => s.code === item.code);
                  return (
                    <button
                      key={item.code}
                      onClick={() => toggleSymptomCode(item)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                        isSelected
                          ? 'bg-sindoor text-cream border-sindoor shadow-xs font-semibold'
                          : 'bg-white border-clay text-ink hover:bg-blush/50'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Natural Language Box matching image: "Or type what you're feeling... e.g. पेट में खिंचाव, चक्कर आते हैं" with voice button */}
          <div className="pt-2">
            <form onSubmit={handleNaturalLanguageSubmit} className="relative">
              <div className="flex items-center gap-2 p-2 bg-cream-light border border-clay rounded-2xl">
                <input
                  type="text"
                  value={naturalLangInput}
                  onChange={(e) => setNaturalLangInput(e.target.value)}
                  placeholder="Or type what you're feeling... e.g. पेट में खिंचाव, चक्कर आते हैं"
                  className="w-full bg-transparent px-3 py-1.5 text-xs sm:text-sm text-ink placeholder:text-ink-muted/70 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  title="Speak in your language"
                  className={`p-2 rounded-xl border transition-all ${
                    isListening 
                      ? 'bg-emergency text-cream animate-pulse' 
                      : 'bg-white border-clay text-sindoor hover:bg-blush'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
                {naturalLangInput.trim() && (
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-sindoor text-cream text-xs font-semibold rounded-xl"
                  >
                    Match
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Postpartum Special Mood Screening (if life stage is postpartum) */}
          {isPostpartum && (
            <div className="p-4 bg-blush-soft border border-sindoor/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-sindoor" />
                <h4 className="font-semibold text-xs text-plum uppercase tracking-wider">
                  Postpartum Mood Screening (Self-Reflection)
                </h4>
              </div>
              <p className="text-xs text-ink-muted">
                Have you felt anxious, panicked, or unusually tearful in the past week? (This is a screening, not a diagnosis.)
              </p>
              <div className="flex gap-2">
                {['Not at all', 'Hardly ever', 'Sometimes', 'Yes, very often'].map((ans, idx) => (
                  <button
                    key={ans}
                    onClick={() => {
                      setPostpartumScore(idx);
                      if (idx === 3) {
                        addSymptom({
                          code: 'postpartum_mood_strain',
                          label: 'Postpartum Emotional Strain',
                          category: 'postpartum',
                          severity: 3,
                          duration: '1_2_weeks'
                        });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs border ${
                      postpartumScore === idx ? 'bg-plum text-cream' : 'bg-white border-clay text-ink'
                    }`}
                  >
                    {ans}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Symptoms Summary */}
          {selectedSymptoms.length > 0 && (
            <div className="pt-2 border-t border-clay/60">
              <span className="text-xs text-plum font-semibold block mb-2">
                Selected for this check-in ({selectedSymptoms.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(s => (
                  <span
                    key={s.code}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-dark border border-clay text-xs text-ink font-medium"
                  >
                    {s.label}
                    <button
                      onClick={() => setSelectedSymptoms(prev => prev.filter(x => x.code !== s.code))}
                      className="text-ink-muted hover:text-emergency font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Bar: Skip and Next */}
          <div className="pt-4 flex items-center justify-between border-t border-clay/60">
            <button
              onClick={() => setStep('severity')}
              className="text-xs text-ink-muted hover:text-plum font-medium"
            >
              Skip
            </button>

            <button
              onClick={() => setStep('severity')}
              disabled={selectedSymptoms.length === 0}
              className="px-6 py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark disabled:opacity-50 text-cream font-semibold text-xs sm:text-sm shadow-sindoor flex items-center gap-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP B: How much? (0-3 Severity) */}
      {step === 'severity' && (
        <div className="bg-white border border-clay rounded-4xl p-6 shadow-plum-sm space-y-6">
          <div>
            <h2 className="font-heading text-2xl text-plum font-bold mb-1">
              How much?
            </h2>
            <p className="text-ink-muted text-xs sm:text-sm">
              Rate each symptom from barely noticeable to disrupting daily tasks.
            </p>
          </div>

          <div className="space-y-4">
            {selectedSymptoms.map(symptom => (
              <div key={symptom.code} className="p-4 rounded-2xl bg-cream-light border border-clay">
                <span className="font-semibold text-sm text-plum block mb-2">
                  {symptom.label}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 0 as const, label: 'Barely noticeable', sub: 'Mild background sign' },
                    { val: 1 as const, label: 'Noticeable', sub: 'Present, but manageable' },
                    { val: 2 as const, label: 'Affects my day', sub: 'Interrupts daily tasks' },
                    { val: 3 as const, label: 'Can’t do tasks', sub: 'Severe discomfort' }
                  ].map(option => (
                    <button
                      key={option.val}
                      onClick={() => updateSeverity(symptom.code, option.val)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        symptom.severity === option.val
                          ? 'bg-plum text-cream border-plum shadow-xs font-semibold'
                          : 'bg-white border-clay text-ink hover:bg-blush/40'
                      }`}
                    >
                      <span className="text-xs font-bold block">{option.val} • {option.label}</span>
                      <span className={`text-[10px] block mt-0.5 ${symptom.severity === option.val ? 'text-cream/80' : 'text-ink-muted'}`}>
                        {option.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setStep('symptoms')}
              className="text-xs text-ink-muted hover:text-plum font-medium"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep('duration')}
              className="px-6 py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-sm shadow-sindoor flex items-center gap-2"
            >
              <span>Next: How Long?</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP C: How long? */}
      {step === 'duration' && (
        <div className="bg-white border border-clay rounded-4xl p-6 shadow-plum-sm space-y-6">
          <div>
            <h2 className="font-heading text-2xl text-plum font-bold mb-1">
              How long?
            </h2>
            <p className="text-ink-muted text-xs sm:text-sm">
              Duration helps identify whether a sign is acute or a recurring pattern.
            </p>
          </div>

          <div className="space-y-4">
            {selectedSymptoms.map(symptom => (
              <div key={symptom.code} className="p-4 rounded-2xl bg-cream-light border border-clay">
                <span className="font-semibold text-sm text-plum block mb-2">
                  {symptom.label}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'today' as const, label: 'Today' },
                    { id: 'few_days' as const, label: 'Few days' },
                    { id: '1_2_weeks' as const, label: '1–2 weeks' },
                    { id: 'more_than_2_weeks' as const, label: '> 2 weeks' },
                    { id: 'on_and_off' as const, label: 'On and off' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => updateDuration(symptom.code, option.id)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        symptom.duration === option.id
                          ? 'bg-sindoor text-cream border-sindoor shadow-xs font-semibold'
                          : 'bg-white border-clay text-ink hover:bg-blush/40'
                      }`}
                    >
                      <span className="text-xs">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between">
            <button
              onClick={() => setStep('severity')}
              className="text-xs text-ink-muted hover:text-plum font-medium"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep('context')}
              className="px-6 py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-sm shadow-sindoor flex items-center gap-2"
            >
              <span>Next: Context</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP D: Context */}
      {step === 'context' && (
        <div className="bg-white border border-clay rounded-4xl p-6 shadow-plum-sm space-y-6">
          <div>
            <h2 className="font-heading text-2xl text-plum font-bold mb-1">
              Context
            </h2>
            <p className="text-ink-muted text-xs sm:text-sm">
              Flow and medications provide vital clues for clinical correlations.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-2">
              Period Flow Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'spotting' as const, label: 'Spotting' },
                { id: 'light' as const, label: 'Light' },
                { id: 'moderate' as const, label: 'Moderate' },
                { id: 'heavy' as const, label: 'Heavy' },
                { id: 'very_heavy' as const, label: 'Very Heavy' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFlow(f.id)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                    flow === f.id
                      ? 'bg-plum text-cream border-plum shadow-xs font-bold'
                      : 'bg-cream-light border-clay text-ink hover:bg-blush/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-1.5">
              Medications or Supplements taken today
            </label>
            <input
              type="text"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              placeholder="e.g. Paracetamol, Meftal, Iron supplements"
              className="w-full px-3.5 py-2.5 rounded-xl border border-clay bg-cream-light text-xs sm:text-sm text-ink focus:outline-none focus:border-sindoor"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-plum uppercase tracking-wider mb-1.5">
              Personal Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything else? (e.g. felt exhausted climbing stairs, missed breakfast)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-clay bg-cream-light text-xs sm:text-sm text-ink focus:outline-none focus:border-sindoor resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep('duration')}
              className="text-xs text-ink-muted hover:text-plum font-medium"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-sm shadow-sindoor flex items-center gap-2 transform active:scale-95"
            >
              {isSubmitting ? (
                <span>Checking safety & patterns...</span>
              ) : (
                <>
                  <span>Save Check-in</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* RESULT SCREEN */}
      {step === 'result' && resultSafety && (
        <div className="bg-white border border-clay rounded-4xl p-6 sm:p-8 shadow-plum-md space-y-6 animate-scale-up">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              resultSafety.level === 'soon' 
                ? 'bg-blush text-sindoor-dark border border-sindoor/30' 
                : 'bg-sage-light text-sage-dark border border-sage/30'
            }`}>
              Triage Level: {resultSafety.level.toUpperCase()}
            </span>

            <span className="text-[11px] text-ink-muted">
              Logged Just Now
            </span>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-plum font-bold mb-2">
              Check-in Logged Successfully
            </h2>
            <p className="text-ink text-sm sm:text-base leading-relaxed">
              {resultSafety.message}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-light border border-clay space-y-2">
            <span className="text-xs font-semibold text-plum uppercase tracking-wider block">
              What you can do now
            </span>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {resultSafety.suggestedAction}
            </p>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/app/threads')}
              className="w-full py-3 px-4 rounded-2xl bg-plum hover:bg-plum-dark text-cream font-semibold text-sm flex items-center justify-center gap-2 shadow-plum-sm"
            >
              <Activity className="w-4 h-4 text-sindoor-light" />
              <span>See My Threads</span>
            </button>

            <button
              onClick={() => navigate('/app/care')}
              className="w-full py-3 px-4 rounded-2xl bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-sm flex items-center justify-center gap-2 shadow-sindoor"
            >
              <Compass className="w-4 h-4" />
              <span>Find Care</span>
            </button>
          </div>

          <div className="text-center pt-2 text-[11px] text-ink-muted flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sage" />
            <span>Not a diagnosis. In any severe discomfort, seek local emergency medical help.</span>
          </div>
        </div>
      )}
    </div>
  );
};
