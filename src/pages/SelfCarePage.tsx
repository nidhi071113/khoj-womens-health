import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SELF_CARE_CONTENT } from '../content/selfCare';
import { 
  Sun, 
  BookOpen, 
  Lock, 
  Search, 
  Trash2, 
  AlertCircle, 
  PhoneCall, 
  Compass, 
  Check, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Heart,
  Droplet,
  Activity,
  UserCheck,
  Plus,
  Bed,
  Footprints,
  Coffee,
  HelpCircle
} from 'lucide-react';
import { DiaryMood } from '../lib/types';

export const SelfCarePage: React.FC = () => {
  const { 
    language, 
    t, 
    diaryEntries, 
    addDiaryEntry, 
    deleteDiaryEntry, 
    updatePassportDraft,
    passportDraft
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Active view: 'overview' (displays the full multi-section layout matching Image 2) or 'diary' (full journal view)
  const [activeCategory, setActiveCategory] = useState<'overview' | 'eating_well' | 'rest_movement' | 'comfort' | 'diary' | 'when_to_seek_care'>('overview');

  // Direct route detection
  useEffect(() => {
    if (location.pathname.includes('/diary')) {
      setActiveCategory('diary');
    }
  }, [location.pathname]);

  const content = SELF_CARE_CONTENT[language] || SELF_CARE_CONTENT.en;

  // "What feels right today?" interactive selection
  const [selectedFeeling, setSelectedFeeling] = useState<'rest' | 'stretch' | 'walk' | 'break'>('walk');

  // Expandable modal / full detail state for cards
  const [selectedDetailCard, setSelectedDetailCard] = useState<any | null>(null);

  // Passport question saved banner state
  const [savedToPassport, setSavedToPassport] = useState<boolean>(false);

  const handleSaveToPassport = async () => {
    const q = 'Are my fatigue symptoms connected to heavy flow or iron deficiency?';
    if (!passportDraft.customQuestions.includes(q)) {
      await updatePassportDraft({
        customQuestions: [...passportDraft.customQuestions, q]
      });
    }
    setSavedToPassport(true);
    setTimeout(() => setSavedToPassport(false), 4000);
  };

  // ==================== DIARY STATE ====================
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryBody, setDiaryBody] = useState('');
  const [diaryMood, setDiaryMood] = useState<DiaryMood>('hopeful');
  const [linkCheckin, setLinkCheckin] = useState(false);
  const [diarySearch, setDiarySearch] = useState('');
  const [diaryMoodFilter, setDiaryMoodFilter] = useState<string>('all');
  const [diarySavedMessage, setDiarySavedMessage] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);

  // Self-harm keyword detector (strictly client-side)
  const [sensitiveFlag, setSensitiveFlag] = useState(false);

  const checkSensitivity = (text: string) => {
    const sensitiveWords = ['suicide', 'kill myself', 'hurt myself', 'end my life', 'want to die', 'आत्महत्या', 'स्वतःला संपवणे'];
    const lower = text.toLowerCase();
    const matched = sensitiveWords.some(word => lower.includes(word));
    setSensitiveFlag(matched);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDiaryBody(val);
    checkSensitivity(val);
  };

  const handleSaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaryBody.trim()) return;

    await addDiaryEntry({
      date: '2026-04-18',
      title: diaryTitle.trim() || undefined,
      body: diaryBody.trim(),
      mood: diaryMood,
      linkedCheckinId: linkCheckin ? 'chk-today' : undefined,
      includeInPassport: false
    });

    setDiaryTitle('');
    setDiaryBody('');
    setDiarySavedMessage(true);
    setTimeout(() => setDiarySavedMessage(false), 3000);
  };

  const filteredDiary = diaryEntries.filter(entry => {
    const matchesSearch = !diarySearch.trim() || 
      entry.body.toLowerCase().includes(diarySearch.toLowerCase()) ||
      (entry.title && entry.title.toLowerCase().includes(diarySearch.toLowerCase()));
    const matchesMood = diaryMoodFilter === 'all' || entry.mood === diaryMoodFilter;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-body text-ink">
      {/* 1. HERO SECTION matching Image 2 with 01_hero_woman.png */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-blush text-sindoor rounded-full">
              {t.selfCare.heroTag}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-plum leading-tight">
              {t.selfCare.heroTitle}
            </h1>
            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
              {t.selfCare.heroSub}
            </p>
          </div>

          {/* Center Illustration: 01_hero_woman.png */}
          <div className="lg:col-span-4 flex items-center justify-center py-1">
            <img 
              src="/images/khoj/self-care/01_hero_woman.png" 
              alt="Woman resting peacefully with tea" 
              className="h-44 sm:h-52 w-auto object-contain filter drop-shadow-sm"
            />
          </div>

          {/* Right: Daily thought card */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <div className="p-4 sm:p-5 bg-[#FFF8F2] border border-clay rounded-2xl flex items-start gap-3 shadow-2xs">
              <Sun className="w-5 h-5 text-sindoor flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-plum">{t.selfCare.dailyThoughtTitle}</p>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">{t.selfCare.dailyThoughtSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS matching Image 2 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-clay/60">
        {[
          { id: 'overview', label: 'All ideas' },
          { id: 'eating_well', label: t.selfCare.tabEatingWell },
          { id: 'rest_movement', label: t.selfCare.tabRestMovement },
          { id: 'comfort', label: t.selfCare.tabComfort },
          { id: 'diary', label: t.selfCare.tabDiary },
          { id: 'when_to_seek_care', label: t.selfCare.tabWhenToSeekCare }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === tab.id
                ? 'bg-[#C8553D] text-white shadow-xs'
                : 'bg-white border border-clay text-ink-muted hover:text-plum hover:bg-blush/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. DEDICATED DIARY VIEW (When user clicks Diary tab) */}
      {activeCategory === 'diary' ? (
        <div className="space-y-6">
          {/* Header Banner matching Panel 4 with 05_diary_woman.png */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <h2 className="font-serif text-3xl font-bold text-plum">
                {t.diary.title}
              </h2>
              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
                {t.diary.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs text-sage-dark font-medium">
                <Lock className="w-4 h-4 text-sage" />
                <span>{t.diary.lockNote}</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center">
              <img 
                src="/images/khoj/self-care/05_diary_woman.png" 
                alt="Woman writing in private diary" 
                className="h-36 sm:h-40 w-auto object-contain"
              />
            </div>
          </div>

          {/* Sensitive Keyword Support Banner */}
          {sensitiveFlag && (
            <div className="p-4 bg-blush-soft border border-sindoor rounded-2xl space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-sindoor font-bold text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>{t.diary.sensitiveTitle}</span>
              </div>
              <p className="text-xs text-ink leading-relaxed">
                {t.diary.sensitiveDesc}
              </p>
              <p className="text-xs font-bold text-sindoor">
                {t.diary.helplineText}
              </p>
            </div>
          )}

          {/* Writing Area */}
          <form onSubmit={handleSaveEntry} className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-clay/60 pb-3">
              <h3 className="font-serif text-base sm:text-lg font-bold text-plum">
                {t.diary.promptTitle}
              </h3>
              <span className="text-xs text-ink-muted flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>Apr 18, 2026</span>
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-muted mb-2">
                {t.diary.howFeeling}
              </label>
              <div className="flex flex-wrap gap-2">
                {(['calm', 'okay', 'low', 'anxious', 'tired', 'hopeful'] as DiaryMood[]).map(mood => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setDiaryMood(mood)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      diaryMood === mood
                        ? 'bg-[#C8553D] text-white border-[#C8553D] shadow-xs'
                        : 'bg-[#FFF8F2] border-clay text-ink-muted hover:border-plum'
                    }`}
                  >
                    {t.diary.moods[mood]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-muted mb-1">
                {t.diary.titleLabel}
              </label>
              <input
                type="text"
                value={diaryTitle}
                onChange={(e) => setDiaryTitle(e.target.value)}
                placeholder={t.diary.titlePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-clay text-sm focus:outline-none focus:border-plum"
              />
            </div>

            <div>
              <textarea
                value={diaryBody}
                onChange={handleBodyChange}
                placeholder={t.diary.bodyPlaceholder}
                rows={4}
                className="w-full p-3.5 rounded-xl border border-clay text-sm focus:outline-none focus:border-plum leading-relaxed"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-ink-muted">
                <input
                  type="checkbox"
                  checked={linkCheckin}
                  onChange={(e) => setLinkCheckin(e.target.checked)}
                  className="w-4 h-4 accent-[#C8553D] rounded cursor-pointer"
                />
                <span>{t.diary.linkCheckinLabel}</span>
              </label>

              <div className="flex items-center gap-3">
                {diarySavedMessage && (
                  <span className="text-xs text-sage font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.diary.draftSaved}</span>
                  </span>
                )}
                <button
                  type="submit"
                  disabled={!diaryBody.trim()}
                  className="px-6 py-2.5 bg-[#C8553D] hover:bg-[#B3452E] text-white rounded-2xl text-xs font-bold shadow-xs transition-all disabled:opacity-40"
                >
                  {t.diary.saveEntryBtn}
                </button>
              </div>
            </div>
          </form>

          {/* Previous entries */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-clay/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-plum">
                {t.diary.tabMyEntries} ({filteredDiary.length})
              </h3>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={diarySearch}
                    onChange={(e) => setDiarySearch(e.target.value)}
                    placeholder={t.diary.searchPlaceholder}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-clay text-xs focus:outline-none focus:border-plum w-36 sm:w-48"
                  />
                </div>

                <select
                  value={diaryMoodFilter}
                  onChange={(e) => setDiaryMoodFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-clay text-xs font-medium text-ink bg-white focus:outline-none"
                >
                  <option value="all">{t.diary.allMoods}</option>
                  {(['calm', 'okay', 'low', 'anxious', 'tired', 'hopeful'] as DiaryMood[]).map(m => (
                    <option key={m} value={m}>{t.diary.moods[m]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredDiary.map(entry => (
                <div key={entry.id} className="p-4 rounded-2xl border border-clay/80 bg-[#FFF8F2]/40 hover:bg-[#FFF8F2] transition-colors space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-plum">{entry.date}</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blush text-plum border border-plum/10">
                        {t.diary.moods[entry.mood]}
                      </span>
                    </div>
                    <button
                      onClick={() => setEntryToDelete(entry.id)}
                      className="text-ink-muted hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {entry.title && (
                    <h4 className="font-serif text-sm font-bold text-plum">{entry.title}</h4>
                  )}
                  <p className="text-xs text-ink leading-relaxed whitespace-pre-wrap">{entry.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* 4. OVERVIEW / SECTION VIEWS matching Image 2 */
        <div className="space-y-8">
          {/* SECTION A: EATING WELL matching Image 2 row */}
          {(activeCategory === 'overview' || activeCategory === 'eating_well') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-clay/50 pb-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-plum">
                    {content.eatingWell.sectionTitle}
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">{content.eatingWell.sectionSubtitle}</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-ink-muted hidden md:inline italic">{content.generalDisclaimer}</span>
                  <button 
                    onClick={() => setActiveCategory('eating_well')}
                    className="font-bold text-sindoor hover:underline whitespace-nowrap"
                  >
                    {t.selfCare.exploreAllIdeas}
                  </button>
                </div>
              </div>

              {/* 4 Cards in Row matching Image 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Iron-friendly foods with 02_eating_well.png */}
                <div 
                  onClick={() => setSelectedDetailCard(content.eatingWell.items[0])}
                  className="cursor-pointer p-4 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-center h-28 w-full bg-white/70 rounded-xl p-2 border border-clay/40">
                    <img 
                      src="/images/khoj/self-care/02_eating_well.png" 
                      alt="Woman preparing healthy food" 
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-plum">{content.eatingWell.items[0].title}</h4>
                      <ChevronRight className="w-4 h-4 text-sindoor" />
                    </div>
                    <p className="text-xs text-ink-muted mt-1 leading-snug line-clamp-3">
                      {content.eatingWell.items[0].subtitle}
                    </p>
                  </div>
                </div>

                {/* Card 2: Pair it well */}
                <div 
                  onClick={() => setSelectedDetailCard(content.eatingWell.items[1])}
                  className="cursor-pointer p-4 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-center h-28 w-full bg-white/70 rounded-xl p-2 border border-clay/40 text-4xl">
                    🍊 🍋
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-plum">{content.eatingWell.items[1].title}</h4>
                      <ChevronRight className="w-4 h-4 text-sindoor" />
                    </div>
                    <p className="text-xs text-ink-muted mt-1 leading-snug line-clamp-3">
                      {content.eatingWell.items[1].subtitle}
                    </p>
                  </div>
                </div>

                {/* Card 3: Easy on low-energy days */}
                <div 
                  onClick={() => setSelectedDetailCard(content.eatingWell.items[2])}
                  className="cursor-pointer p-4 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-center h-28 w-full bg-white/70 rounded-xl p-2 border border-clay/40 text-4xl">
                    🍲 💧
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-plum">{content.eatingWell.items[2].title}</h4>
                      <ChevronRight className="w-4 h-4 text-sindoor" />
                    </div>
                    <p className="text-xs text-ink-muted mt-1 leading-snug line-clamp-3">
                      {content.eatingWell.items[2].subtitle}
                    </p>
                  </div>
                </div>

                {/* Card 4: Things to be mindful of */}
                <div 
                  onClick={() => setSelectedDetailCard(content.eatingWell.items[3])}
                  className="cursor-pointer p-4 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-center h-28 w-full bg-white/70 rounded-xl p-2 border border-clay/40 text-4xl">
                    ☕ 🫖
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-plum">{content.eatingWell.items[3].title}</h4>
                      <ChevronRight className="w-4 h-4 text-sindoor" />
                    </div>
                    <p className="text-xs text-ink-muted mt-1 leading-snug line-clamp-3">
                      {content.eatingWell.items[3].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION B: REST & MOVEMENT + COMFORT + RIGHT SIDEBAR matching Image 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 columns: Rest & movement + Comfort */}
            <div className="lg:col-span-8 space-y-6">
              {/* Rest & movement */}
              {(activeCategory === 'overview' || activeCategory === 'rest_movement') && (
                <div className="bg-white rounded-3xl p-6 border border-clay shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-clay/50 pb-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-plum">
                        {content.restMovement.sectionTitle}
                      </h3>
                      <p className="text-xs text-ink-muted mt-0.5">{content.restMovement.sectionSubtitle}</p>
                    </div>
                    <button 
                      onClick={() => setActiveCategory('rest_movement')}
                      className="text-xs font-bold text-sindoor hover:underline"
                    >
                      {t.selfCare.exploreAllIdeas}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Card 1 with 03_rest_movement.png */}
                    <div 
                      onClick={() => setSelectedDetailCard(content.restMovement.items[0])}
                      className="cursor-pointer p-3.5 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-all flex flex-col justify-between space-y-2"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white/70 rounded-xl p-1 border border-clay/40">
                        <img 
                          src="/images/khoj/self-care/03_rest_movement.png" 
                          alt="Woman resting peacefully" 
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-plum">{content.restMovement.items[0].title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-sindoor" />
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                          {content.restMovement.items[0].subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div 
                      onClick={() => setSelectedDetailCard(content.restMovement.items[1])}
                      className="cursor-pointer p-3.5 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-all flex flex-col justify-between space-y-2"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white/70 rounded-xl p-1 border border-clay/40 text-3xl">
                        🧘‍♀️ 🌿
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-plum">{content.restMovement.items[1].title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-sindoor" />
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                          {content.restMovement.items[1].subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div 
                      onClick={() => setSelectedDetailCard(content.restMovement.items[2])}
                      className="cursor-pointer p-3.5 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-all flex flex-col justify-between space-y-2"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white/70 rounded-xl p-1 border border-clay/40 text-3xl">
                        ☕ 🪟
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-plum">{content.restMovement.items[2].title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-sindoor" />
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                          {content.restMovement.items[2].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comfort */}
              {(activeCategory === 'overview' || activeCategory === 'comfort') && (
                <div className="bg-white rounded-3xl p-6 border border-clay shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-clay/50 pb-2">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-plum">
                        {content.comfort.sectionTitle}
                      </h3>
                      <p className="text-xs text-ink-muted mt-0.5">{content.comfort.sectionSubtitle}</p>
                    </div>
                    <button 
                      onClick={() => setActiveCategory('comfort')}
                      className="text-xs font-bold text-sindoor hover:underline"
                    >
                      {t.selfCare.exploreAllIdeas}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Card 1 with 04_comfort.png */}
                    <div 
                      onClick={() => setSelectedDetailCard(content.comfort.items[0])}
                      className="cursor-pointer p-3.5 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-all flex flex-col justify-between space-y-2"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white/70 rounded-xl p-1 border border-clay/40">
                        <img 
                          src="/images/khoj/self-care/04_comfort.png" 
                          alt="Woman holding heat pad for comfort" 
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-plum">{content.comfort.items[0].title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-sindoor" />
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                          {content.comfort.items[0].subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div 
                      onClick={() => setSelectedDetailCard(content.comfort.items[1])}
                      className="cursor-pointer p-3.5 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-all flex flex-col justify-between space-y-2"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white/70 rounded-xl p-1 border border-clay/40 text-3xl">
                        🌸 ♨️
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-plum">{content.comfort.items[1].title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-sindoor" />
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                          {content.comfort.items[1].subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div 
                      onClick={() => setSelectedDetailCard(content.comfort.items[2])}
                      className="cursor-pointer p-3.5 rounded-2xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-all flex flex-col justify-between space-y-2"
                    >
                      <div className="h-24 w-full flex items-center justify-center bg-white/70 rounded-xl p-1 border border-clay/40 text-3xl">
                        💬 🫂
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-xs font-bold text-plum">{content.comfort.items[2].title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-sindoor" />
                        </div>
                        <p className="text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                          {content.comfort.items[2].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 columns: "What feels right today?" & "Diary" matching Image 2 */}
            <div className="lg:col-span-4 space-y-6">
              {/* Widget: What feels right today? with 07_gentle_moment.png */}
              <div className="bg-white rounded-3xl p-5 border border-clay shadow-xs space-y-3">
                <div>
                  <h4 className="font-serif text-sm font-bold text-plum">{t.selfCare.whatFeelsRightToday}</h4>
                  <p className="text-[11px] text-ink-muted">{t.selfCare.whatFeelsRightSub}</p>
                </div>

                {/* 4 compact action icons */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setSelectedFeeling('rest')}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold border transition-all ${
                      selectedFeeling === 'rest' ? 'bg-plum text-white border-plum' : 'bg-cream-light border-clay text-ink-muted hover:border-plum'
                    }`}
                  >
                    <Bed className="w-4 h-4" />
                    <span>Rest</span>
                  </button>

                  <button
                    onClick={() => setSelectedFeeling('stretch')}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold border transition-all ${
                      selectedFeeling === 'stretch' ? 'bg-plum text-white border-plum' : 'bg-cream-light border-clay text-ink-muted hover:border-plum'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Stretch</span>
                  </button>

                  <button
                    onClick={() => setSelectedFeeling('walk')}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold border transition-all ${
                      selectedFeeling === 'walk' ? 'bg-plum text-white border-plum' : 'bg-cream-light border-clay text-ink-muted hover:border-plum'
                    }`}
                  >
                    <Footprints className="w-4 h-4" />
                    <span>Walk</span>
                  </button>

                  <button
                    onClick={() => setSelectedFeeling('break')}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 text-[11px] font-semibold border transition-all ${
                      selectedFeeling === 'break' ? 'bg-plum text-white border-plum' : 'bg-cream-light border-clay text-ink-muted hover:border-plum'
                    }`}
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Break</span>
                  </button>
                </div>

                {/* Suggestion Card with 07_gentle_moment.png */}
                <div className="p-3 bg-[#FFF8F2] border border-clay rounded-2xl flex items-center gap-3">
                  <img 
                    src="/images/khoj/self-care/07_gentle_moment.png" 
                    alt="Gentle moment woman" 
                    className="h-16 w-16 object-contain rounded-xl flex-shrink-0"
                  />
                  <p className="text-[11px] text-ink leading-snug">
                    {selectedFeeling === 'rest' && 'Allow yourself an extra 20-minute rest without checking your phone. Your nervous system recharges when you pause.'}
                    {selectedFeeling === 'stretch' && 'Try a comfortable Butterfly pose (Baddha Konasana). It gently opens the hips and eases pelvic tension.'}
                    {selectedFeeling === 'walk' && 'Try a short 10 minute walk at a comfortable pace. It can help refresh your mind.'}
                    {selectedFeeling === 'break' && 'Make a warm cup of herbal tea or warm water with lemon. Sit quietly for 5 uninterrupted minutes.'}
                  </p>
                </div>
              </div>

              {/* Diary Shortcut matching Image 2 */}
              <div className="bg-white rounded-3xl p-5 border border-clay shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-plum" />
                    <h4 className="font-serif text-sm font-bold text-plum">{t.selfCare.tabDiary}</h4>
                  </div>
                  <button 
                    onClick={() => setActiveCategory('diary')}
                    className="text-xs font-bold text-sindoor hover:underline"
                  >
                    See all &gt;
                  </button>
                </div>
                <p className="text-[11px] text-ink-muted">A private space for your thoughts.</p>

                {/* + Write today button */}
                <button
                  onClick={() => setActiveCategory('diary')}
                  className="w-full py-2.5 bg-[#C8553D] hover:bg-[#B3452E] text-white rounded-2xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write today</span>
                </button>

                {/* 2 Recent entries list */}
                <div className="space-y-2 pt-1">
                  {diaryEntries.slice(0, 2).map(entry => (
                    <div 
                      key={entry.id} 
                      onClick={() => setActiveCategory('diary')}
                      className="cursor-pointer p-2.5 rounded-xl border border-clay bg-[#FFF8F2]/60 hover:bg-[#FFF8F2] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-plum">{entry.date}</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blush text-plum">
                          {t.diary.moods[entry.mood]}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-ink mt-0.5 line-clamp-1">{entry.title || entry.body}</p>
                      <p className="text-[10px] text-ink-muted line-clamp-1 mt-0.5">{entry.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: WHEN TO SEEK CARE matching Image 2 row with 08_when_to_seek_care.png */}
          {(activeCategory === 'overview' || activeCategory === 'when_to_seek_care') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-clay/50 pb-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="/images/khoj/self-care/08_when_to_seek_care.png" 
                    alt="Doctor advice" 
                    className="h-12 w-12 object-contain rounded-full border border-clay flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-plum">
                      {content.whenToSeekCare.sectionTitle}
                    </h3>
                    <p className="text-xs text-ink-muted mt-0.5">{content.whenToSeekCare.sectionSubtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-ink-muted hidden md:inline italic">General information. Not a diagnosis. In an emergency call 112.</span>
                  <a href="tel:112" className="font-bold text-sindoor hover:underline whitespace-nowrap">
                    {t.selfCare.seeAllGuidance}
                  </a>
                </div>
              </div>

              {/* 6 horizontal cards in a row/grid matching Image 2 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {content.whenToSeekCare.items.map(item => (
                  <div key={item.id} className="p-3 rounded-2xl border border-sindoor/20 bg-blush-soft/40 flex flex-col justify-between space-y-1">
                    <p className="font-serif text-xs font-bold text-plum">{item.title}</p>
                    <p className="text-[10px] text-ink-muted leading-snug">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal for any card */}
      {selectedDetailCard && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-clay space-y-4 animate-in zoom-in-95 duration-150">
            <h4 className="font-serif text-lg font-bold text-plum">{selectedDetailCard.title}</h4>
            <p className="text-xs text-ink font-semibold">{selectedDetailCard.subtitle}</p>
            <p className="text-xs text-ink-muted leading-relaxed">{selectedDetailCard.description}</p>
            {selectedDetailCard.bullets && (
              <ul className="space-y-1.5 pt-1">
                {selectedDetailCard.bullets.map((b: string, i: number) => (
                  <li key={i} className="text-xs text-ink flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sindoor mt-1 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-[11px] text-ink-muted italic pt-2 border-t border-clay/60">
              {content.generalDisclaimer}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDetailCard(null)}
                className="px-5 py-2 bg-plum text-cream rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {entryToDelete && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-clay space-y-4">
            <h4 className="font-serif text-base font-bold text-plum">
              {t.diary.deleteConfirm}
            </h4>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEntryToDelete(null)}
                className="flex-1 py-2 border border-clay rounded-xl text-xs font-bold text-ink-muted hover:bg-clay-light"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteDiaryEntry(entryToDelete);
                  setEntryToDelete(null);
                }}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
