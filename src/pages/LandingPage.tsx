import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/brand/Logo';
import { 
  HeroWomanIllustration, 
  DoctorConsultIllustration, 
  FamilyIllustration,
  WomanPortraitOne,
  WomanPortraitTwo,
  WomanPortraitThree
} from '../components/brand/Illustrations';
import { ThreadDivider } from '../components/brand/ThreadMotifs';
import { 
  Lock, 
  ArrowRight, 
  Compass, 
  FileCheck, 
  CheckCircle2, 
  EyeOff, 
  Trash2, 
  Play,
  HeartHandshake
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useApp();
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('guidance-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStart = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-cream text-ink relative overflow-hidden font-body selection:bg-blush selection:text-plum">
      {/* Dynamic Background Scroll Thread SVG */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-35 hidden md:block">
        <svg 
          viewBox="0 0 1200 3200" 
          fill="none" 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path 
            d="M 600 100 Q 150 400, 300 800 T 900 1400 T 250 2000 T 800 2600 T 600 3100" 
            stroke="#EADCCB" 
            strokeWidth="2" 
            strokeDasharray="8 8"
          />
          <path 
            d="M 600 100 Q 150 400, 300 800 T 900 1400 T 250 2000 T 800 2600 T 600 3100" 
            stroke="#C8553D" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            strokeDasharray="4000"
            strokeDashoffset={4000 - scrollProgress * 3900}
          />
        </svg>
      </div>

      {/* Clean Sticky Header matching reference image (Only Logo on left, Language + Start on right) */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-clay/60 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size="md" />
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher: EN | हिंदी | मराठी */}
            <div className="flex bg-white/80 rounded-xl p-0.5 border border-clay text-xs font-semibold shadow-xs">
              {(['en', 'hi', 'mr'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === lang 
                      ? 'bg-plum text-cream shadow-xs font-bold' 
                      : 'text-ink-muted hover:text-plum'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                </button>
              ))}
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-xs sm:text-sm shadow-sindoor transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <span>Start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION EXACTLY MATCHING IMAGE */}
      <section className="relative z-10 pt-8 sm:pt-14 pb-16 px-4 sm:px-8 bg-gradient-to-b from-cream via-cream to-blush/60 rounded-b-[2.5rem] border-b border-clay/70">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-light text-sage-dark text-xs sm:text-sm font-semibold tracking-wide">
              {t.landing.eyebrow}
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5.5xl text-plum font-bold leading-[1.15] tracking-tight">
              {t.landing.heroTitle}
            </h1>

            <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-xl">
              {t.landing.heroSub}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={handleStart}
                className="px-8 py-3.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-base shadow-sindoor flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <span>Start in 60 seconds</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToFeatures}
                className="px-6 py-3.5 rounded-full bg-cream border border-clay hover:bg-clay-light text-plum font-medium text-base flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4 text-sindoor fill-sindoor" />
                <span>See how it works</span>
              </button>
            </div>

            <div className="pt-1 flex items-center gap-2 text-xs text-ink-muted">
              <Lock className="w-3.5 h-3.5 text-sage" />
              <span>Private by default. No signup needed.</span>
            </div>
          </div>

          {/* Right Column: Hero Woman Portrait inside Cycle Arcs with Floating Card */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroWomanIllustration className="w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* SECTION 1: "Not just tracking. Guidance." (3 Portrait Circular Cards) */}
      <section id="guidance-section" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto relative z-10 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-plum font-bold mb-12">
          Not just tracking. Guidance.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Say it your way */}
          <div className="bg-white/80 border border-clay rounded-3xl p-6 sm:p-7 text-center shadow-plum-sm flex flex-col items-center">
            <WomanPortraitOne className="mb-4" />
            <h3 className="font-heading text-xl text-plum font-bold mb-2">
              Say it your way
            </h3>
            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed max-w-xs">
              Tap a body map, type or speak in your own words, even "chakkar aate hain".
            </p>
          </div>

          {/* Card 2: See your thread */}
          <div className="bg-white/80 border border-clay rounded-3xl p-6 sm:p-7 text-center shadow-plum-sm flex flex-col items-center">
            <WomanPortraitTwo className="mb-4" />
            <h3 className="font-heading text-xl text-plum font-bold mb-2">
              See your thread
            </h3>
            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed max-w-xs">
              Months of small signs connected into one clear picture with the reason shown.
            </p>
          </div>

          {/* Card 3: Know your next step */}
          <div className="bg-white/80 border border-clay rounded-3xl p-6 sm:p-7 text-center shadow-plum-sm flex flex-col items-center">
            <WomanPortraitThree className="mb-4" />
            <h3 className="font-heading text-xl text-plum font-bold mb-2">
              Know your next step
            </h3>
            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed max-w-xs">
              Which doctor, how soon, which tests, in which language, at what cost.
            </p>
          </div>
        </div>

        <ThreadDivider className="mt-14" />
      </section>

      {/* SECTION 2 & 3: Two Column Cards matching Image ("Walk in prepared. Be heard." and "Your language. Your pace. Your privacy.") */}
      <section className="py-6 px-4 sm:px-8 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card Left: "Walk in prepared. Be heard." */}
          <div className="bg-white/90 border border-clay rounded-4xl p-6 sm:p-8 shadow-plum-sm flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-4">
                Walk in prepared. Be heard.
              </h2>
              <DoctorConsultIllustration className="w-full mb-6" />

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-plum block">Doctor Passport</span>
                    <span className="text-xs text-ink-muted">One-page summary</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-plum block">Practice My Appointment</span>
                    <span className="text-xs text-ink-muted">Get calm, confident replies</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-plum block">Find Care</span>
                    <span className="text-xs text-ink-muted">By language, cost and female doctor</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3 rounded-2xl bg-cream border border-clay hover:bg-clay-light text-plum text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Get Started Now →</span>
            </button>
          </div>

          {/* Card Right: "Your language. Your pace. Your privacy." */}
          <div className="bg-white/90 border border-clay rounded-4xl p-6 sm:p-8 shadow-plum-sm flex flex-col justify-between space-y-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-4">
                Your language. Your pace. Your privacy.
              </h2>
              <FamilyIllustration className="w-full mb-6" />

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-ink">
                  <div className="w-7 h-7 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark flex-shrink-0">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Discreet mode</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-ink">
                  <div className="w-7 h-7 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">No streaks or guilt</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-ink">
                  <div className="w-7 h-7 rounded-xl bg-sage-light flex items-center justify-center text-sage-dark flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Delete everything in one tap</span>
                </div>
              </div>

              {/* Language Cards */}
              <div className="pt-6">
                <span className="text-xs text-ink-muted font-medium block mb-2">Languages</span>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'en' as const, label: 'English' },
                    { id: 'hi' as const, label: 'हिंदी' },
                    { id: 'mr' as const, label: 'मराठी' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setLanguage(item.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                        language === item.id 
                          ? 'bg-plum text-cream border-plum shadow-xs' 
                          : 'bg-cream-light border-clay text-ink hover:bg-blush/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3 rounded-2xl bg-cream border border-clay hover:bg-clay-light text-plum text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Start in 60 Seconds →</span>
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION ON BLUSH CARD MATCHING IMAGE */}
      <section className="py-16 px-4 sm:px-8 max-w-4xl mx-auto relative z-10 text-center">
        <div className="bg-gradient-to-br from-blush via-blush to-blush-deep rounded-4xl p-8 sm:p-12 border border-clay shadow-plum-md space-y-5">
          <h2 className="font-heading text-3xl sm:text-4xl text-plum font-bold">
            Start your first thread.
          </h2>

          <p className="text-ink-muted text-sm max-w-md mx-auto">
            Find what your body is trying to tell you. Connect your symptoms. Know your next step.
          </p>

          <button
            onClick={handleStart}
            className="px-9 py-4 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-base sm:text-lg shadow-sindoor transition-all transform active:scale-98 inline-flex items-center gap-2"
          >
            <span>Start in 60 seconds</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FOOTER MATCHING IMAGE */}
      <footer className="border-t border-clay/80 py-8 px-4 sm:px-8 max-w-6xl mx-auto text-center text-xs text-ink-muted space-y-2">
        <p className="flex items-center justify-center gap-1.5 leading-relaxed">
          <Lock className="w-3.5 h-3.5 text-sage flex-shrink-0" />
          <span>Khoj shares patterns and possibilities, not diagnoses. In an emergency, call your local emergency number.</span>
        </p>
        <p className="text-[11px] opacity-75">
          Khoj (खोज) • Mobile-First Responsive Platform • Built for India
        </p>
      </footer>
    </div>
  );
};
