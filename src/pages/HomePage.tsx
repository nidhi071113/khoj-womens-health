import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  CheckCircle, 
  Circle, 
  Calendar, 
  Plus, 
  ChevronRight,
  Eye,
  EyeOff,
  Clock,
  Compass
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, patterns, followups, toggleFollowup, t } = useApp();
  const [showCycleDay, setShowCycleDay] = useState<boolean>(true);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const name = profile?.name ? profile.name.split(' ')[0] : 'there';
  const featuredPattern = patterns.length > 0 ? patterns[0] : null;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in font-body">
      {/* Gentle Greeting & Header (No streaks, no guilt) */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="font-heading text-2xl sm:text-3xl text-plum font-bold">
            {getGreeting()}, {name}
          </h1>
          <Sparkles className="w-5 h-5 text-sindoor" />
        </div>
        <p className="text-ink-muted text-sm sm:text-base">
          {t.home.greetingSub}
        </p>
      </div>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: How are you feeling today? + Cycle Snapshot */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: How are you feeling today? */}
          <div className="bg-white border border-clay rounded-3xl p-6 shadow-plum-sm">
            <h2 className="font-heading text-xl text-plum font-semibold mb-2">
              {t.home.howFeeling}
            </h2>
            <p className="text-ink-muted text-xs sm:text-sm mb-5">
              Pick a quick sign or tap below to start your step-by-step check-in.
            </p>

            {/* Quick Chips that deep link to check-in */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: t.home.chipFine, prefill: 'fine', color: 'bg-sage-subtle text-sage-dark border-sage/40' },
                { label: t.home.chipTired, prefill: 'tired', color: 'bg-blush text-sindoor-dark border-sindoor/30' },
                { label: t.home.chipPain, prefill: 'pain', color: 'bg-blush text-sindoor-dark border-sindoor/30' },
                { label: t.home.chipMood, prefill: 'mood', color: 'bg-plum-subtle text-plum border-plum/30' },
                { label: t.home.chipOther, prefill: 'other', color: 'bg-cream-dark text-ink border-clay' }
              ].map(chip => (
                <button
                  key={chip.prefill}
                  onClick={() => navigate(`/app/check-in?prefill=${chip.prefill}`)}
                  className={`px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all transform active:scale-95 hover:shadow-xs ${chip.color}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-clay/60 flex items-center justify-between">
              <span className="text-xs text-ink-muted">
                Low on energy? Tapping Tired or Pain gives you a quick 1-tap save.
              </span>
              <button
                onClick={() => navigate('/app/check-in')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sindoor hover:text-sindoor-dark"
              >
                Full Check-in <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cycle Snapshot Card (Range and uncertainty, never strict date) */}
          <div className="bg-gradient-to-br from-cream to-blush/30 border border-clay rounded-3xl p-6 shadow-plum-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-plum" />
                <h3 className="font-heading text-lg text-plum font-semibold">
                  {t.home.cycleSnapshot}
                </h3>
              </div>
              <button
                onClick={() => setShowCycleDay(!showCycleDay)}
                title={showCycleDay ? 'Hide cycle day' : 'Show cycle day'}
                className="text-xs text-ink-muted hover:text-plum flex items-center gap-1"
              >
                {showCycleDay ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showCycleDay ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            {showCycleDay && (
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-bold font-heading text-plum">Day 13</span>
                <span className="text-xs text-ink-muted">of current cycle</span>
              </div>
            )}

            <div className="bg-white/80 border border-clay p-3.5 rounded-2xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-sindoor flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-ink">
                  {t.home.cycleRange}
                </p>
                <span className="text-xs text-ink-muted">
                  Bodies naturally vary. We provide a window rather than a rigid countdown.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Thread Insight & Reminders */}
        <div className="lg:col-span-5 space-y-6">
          {/* Today's Thread Insight Card */}
          {featuredPattern ? (
            <div className="bg-white border-2 border-sindoor/20 rounded-3xl p-6 shadow-plum-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-sindoor/10 text-sindoor font-semibold text-[11px] uppercase tracking-wider">
                  {t.home.todayInsight}
                </span>
                <span className="text-[11px] text-ink-muted capitalize">
                  {featuredPattern.evidenceStrength} confidence
                </span>
              </div>

              <h3 className="font-heading text-lg text-plum font-bold mb-2">
                {featuredPattern.title}
              </h3>

              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                {featuredPattern.summary}
              </p>

              <div className="pt-3 border-t border-clay/60 flex items-center justify-between">
                <button
                  onClick={() => navigate('/app/threads')}
                  className="text-xs font-semibold text-sindoor hover:text-sindoor-dark flex items-center gap-1"
                >
                  {t.home.whySeeingThis}
                </button>

                <button
                  onClick={() => navigate('/app/care')}
                  className="px-3 py-1.5 rounded-xl bg-plum text-cream text-xs font-medium hover:bg-plum-dark transition-colors flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Find Care
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-clay rounded-3xl p-6 shadow-plum-sm text-center">
              <p className="text-sm text-ink-muted mb-3">
                Log a few check-ins and your personalized health threads will start to appear here.
              </p>
              <button
                onClick={() => navigate('/app/check-in')}
                className="px-4 py-2 rounded-xl bg-sindoor text-cream text-xs font-semibold"
              >
                Log First Check-in
              </button>
            </div>
          )}

          {/* Gentle Care Reminders with tick-off */}
          <div className="bg-white border border-clay rounded-3xl p-6 shadow-plum-sm">
            <h3 className="font-heading text-lg text-plum font-semibold mb-3">
              {t.home.remindersTitle}
            </h3>

            <div className="space-y-2.5">
              {followups.length > 0 ? (
                followups.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleFollowup(item.id)}
                    className="flex items-start gap-3 p-2.5 rounded-2xl bg-cream-light border border-clay/60 cursor-pointer hover:bg-blush/40 transition-colors"
                  >
                    <button className="mt-0.5 text-sindoor">
                      {item.done ? (
                        <CheckCircle className="w-4 h-4 text-sage" />
                      ) : (
                        <Circle className="w-4 h-4 text-clay-dark" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`text-xs font-medium leading-snug ${item.done ? 'line-through text-ink-muted' : 'text-ink'}`}>
                        {item.text}
                      </p>
                      {item.dueDate && (
                        <span className="text-[10px] text-ink-muted mt-0.5 block">
                          Suggested by {item.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-ink-muted">No pending reminders right now.</p>
              )}
            </div>
          </div>

          {/* Privacy reassurance line */}
          <div className="flex items-center justify-center gap-2 text-xs text-ink-muted pt-2">
            <Lock className="w-3.5 h-3.5 text-sage" />
            <span>{t.home.dataPrivate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
