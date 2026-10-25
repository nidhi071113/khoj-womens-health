import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Droplet, 
  Info, 
  CheckCircle2, 
  X, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { CycleDayLog } from '../lib/types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

export const CyclePage: React.FC = () => {
  const { t, cycleLogs, cycleEstimates, addCycleDay, checkins, session } = useApp();

  // Active viewing month (April 2026 as per design baseline)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(3); // 0-indexed: 3 = April

  // Selected day for modal editor
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editorFlow, setEditorFlow] = useState<'spotting' | 'light' | 'moderate' | 'heavy'>('heavy');
  const [editorPain, setEditorPain] = useState<0 | 1 | 2 | 3>(1);
  const [editorMood, setEditorMood] = useState<string>('Calm');
  const [editorNotes, setEditorNotes] = useState<string>('');
  const [editorIsPeriod, setEditorIsPeriod] = useState<boolean>(true);

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleGoToToday = () => {
    setCurrentYear(2026);
    setCurrentMonth(3); // April 2026
  };

  // Quick action: Period started today
  const handlePeriodStartedToday = async () => {
    const todayStr = '2026-04-15';
    await addCycleDay({
      date: todayStr,
      isPeriod: true,
      flow: 'heavy',
      painSeverity: 2,
      isPeriodStart: true,
      mood: 'Tired'
    });
  };

  // Quick action: Period ended today
  const handlePeriodEndedToday = async () => {
    const todayStr = '2026-04-15';
    await addCycleDay({
      date: todayStr,
      isPeriod: true,
      flow: 'light',
      painSeverity: 0,
      isPeriodEnd: true,
      mood: 'Relieved'
    });
  };

  // Open day editor
  const openDayEditor = (dateStr: string) => {
    const existing = cycleLogs.find(l => l.date === dateStr);
    setSelectedDay(dateStr);
    if (existing) {
      setEditorIsPeriod(existing.isPeriod);
      setEditorFlow(existing.flow || 'moderate');
      setEditorPain(existing.painSeverity || 0);
      setEditorMood(existing.mood || 'Calm');
      setEditorNotes(existing.notes || '');
    } else {
      setEditorIsPeriod(true);
      setEditorFlow('moderate');
      setEditorPain(1);
      setEditorMood('Calm');
      setEditorNotes('');
    }
    setIsEditorOpen(true);
  };

  const handleSaveDayLog = async () => {
    if (!selectedDay) return;
    await addCycleDay({
      date: selectedDay,
      isPeriod: editorIsPeriod,
      flow: editorFlow,
      painSeverity: editorPain,
      mood: editorMood,
      notes: editorNotes
    });
    setIsEditorOpen(false);
  };

  // Calculate calendar days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const daysArray: { day: number; dateStr: string; isCurrentMonth: boolean }[] = [];
  
  // Previous month trailing days
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = currentMonth === 0 ? 12 : currentMonth;
    const y = currentMonth === 0 ? currentYear - 1 : currentYear;
    daysArray.push({
      day: d,
      dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const m = currentMonth + 1;
    daysArray.push({
      day: d,
      dateStr: `${currentYear}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      isCurrentMonth: true
    });
  }

  // Next month leading days to complete full 35 or 42 grid
  const remaining = (7 - (daysArray.length % 7)) % 7;
  for (let d = 1; d <= remaining; d++) {
    const m = currentMonth === 11 ? 1 : currentMonth + 2;
    const y = currentMonth === 11 ? currentYear + 1 : currentYear;
    daysArray.push({
      day: d,
      dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      isCurrentMonth: false
    });
  }

  // Check if a date has recorded period
  const isPeriodDay = (dateStr: string) => {
    const log = cycleLogs.find(l => l.date === dateStr);
    return !!(log && log.isPeriod);
  };

  // Predicted days: Apr 11 and Apr 12 only shown in demo mode
  const isPredictedDay = (dateStr: string) => {
    if (!session?.isDemo) return false;
    return dateStr === '2026-04-11' || dateStr === '2026-04-12';
  };

  // Today is April 15, 2026
  const isToday = (dateStr: string) => {
    return dateStr === '2026-04-15';
  };

  // Symptom check
  const hasSymptoms = (dateStr: string) => {
    const checkin = checkins.find(c => c.recordedAt.startsWith(dateStr));
    const log = cycleLogs.find(l => l.date === dateStr);
    return !!(checkin || (log && log.painSeverity && log.painSeverity > 0));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Banner matching Panel 2 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-md z-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-plum">
            {t.cycle.title}
          </h1>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            {t.cycle.subtitle}
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePeriodStartedToday}
              className="px-4 py-2.5 bg-[#C8553D] hover:bg-[#B3452E] text-cream rounded-2xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
            >
              <Droplet className="w-3.5 h-3.5 fill-cream" />
              <span>{t.cycle.periodStartedToday}</span>
            </button>

            <button
              onClick={handlePeriodEndedToday}
              className="px-4 py-2.5 bg-white hover:bg-blush/60 text-[#C8553D] border border-[#C8553D] rounded-2xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Droplet className="w-3.5 h-3.5" />
              <span>{t.cycle.periodEndedToday}</span>
            </button>
          </div>
        </div>

        {/* Right illustration: woman leaning back */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <img 
            src="/illustrations/cycle_hero.png" 
            alt="Woman tracking cycle" 
            className="h-36 sm:h-44 w-auto object-contain"
          />
        </div>
      </div>

      {/* Monthly Calendar Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs space-y-6">
        {/* Calendar Nav Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl border border-clay hover:bg-clay-light text-ink transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="font-serif text-lg font-bold text-plum px-2">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl border border-clay hover:bg-clay-light text-ink transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleGoToToday}
            className="px-3.5 py-1.5 rounded-xl border border-clay hover:bg-clay-light text-xs font-bold text-plum transition-colors"
          >
            {t.cycle.today}
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-ink-muted">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {daysArray.map(({ day, dateStr, isCurrentMonth }) => {
            const isPeriod = isPeriodDay(dateStr);
            const isPredicted = isPredictedDay(dateStr);
            const isTodayDate = isToday(dateStr);
            const hasSymp = hasSymptoms(dateStr);

            return (
              <button
                key={dateStr}
                onClick={() => openDayEditor(dateStr)}
                className={`relative flex flex-col items-center justify-center h-10 sm:h-12 w-full rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  !isCurrentMonth ? 'text-ink-muted/30' : 'text-ink'
                } ${
                  isPeriod
                    ? 'bg-[#C8553D] text-white shadow-xs font-bold'
                    : isPredicted
                    ? 'border-2 border-dashed border-[#C8553D] text-[#C8553D]'
                    : isTodayDate
                    ? 'ring-2 ring-plum ring-offset-2 font-bold'
                    : 'hover:bg-blush/60'
                }`}
              >
                <span>{day}</span>
                {hasSymp && !isPeriod && (
                  <span className="w-1.5 h-1.5 rounded-full bg-plum absolute bottom-1.5" />
                )}
                {hasSymp && isPeriod && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white absolute bottom-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="pt-4 border-t border-clay/60 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#C8553D]" />
            <span>{t.cycle.legendPeriod}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-dashed border-[#C8553D]" />
            <span>{t.cycle.legendPredicted}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-plum" />
            <span>{t.cycle.legendToday}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-plum" />
            <span>{t.cycle.legendSymptoms}</span>
          </div>
        </div>
      </div>

      {/* Next Period Expected Card */}
      <div className="bg-[#FFF8F2] border border-clay rounded-3xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-clay flex items-center justify-center text-sindoor shadow-xs flex-shrink-0">
          <CalendarIcon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-ink-muted font-medium">{t.cycle.nextExpected}</p>
          <p className="font-serif text-xl sm:text-2xl font-bold text-plum">
            {t.cycle.nextExpectedRange}
          </p>
          <p className="text-[11px] text-ink-muted flex items-center gap-1 mt-0.5">
            <span>{t.cycle.estimateNote}</span>
            <Info className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-clay text-center shadow-xs">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-plum">
            {cycleEstimates.averageCycleLength}
          </p>
          <p className="text-[11px] text-ink-muted mt-0.5">{t.cycle.days}</p>
          <p className="text-xs font-semibold text-ink mt-1">{t.cycle.avgCycleLength}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-clay text-center shadow-xs">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-plum">
            {cycleEstimates.averagePeriodLength}
          </p>
          <p className="text-[11px] text-ink-muted mt-0.5">{t.cycle.days}</p>
          <p className="text-xs font-semibold text-ink mt-1">{t.cycle.avgPeriodLength}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-clay text-center shadow-xs">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-plum">
            {cycleEstimates.longestCycle}
          </p>
          <p className="text-[11px] text-ink-muted mt-0.5">{t.cycle.days}</p>
          <p className="text-xs font-semibold text-ink mt-1">{t.cycle.longestCycle}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-clay text-center shadow-xs">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-plum">
            {cycleEstimates.shortestCycle}
          </p>
          <p className="text-[11px] text-ink-muted mt-0.5">{t.cycle.days}</p>
          <p className="text-xs font-semibold text-ink mt-1">{t.cycle.shortestCycle}</p>
        </div>
      </div>

      {/* Bar Chart of Recent Cycles */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base sm:text-lg font-bold text-plum">
            {t.cycle.cycleLengthChart}
          </h3>
          <span className="text-xs text-sindoor font-semibold hover:underline cursor-pointer">
            {t.cycle.allCycles} &gt;
          </span>
        </div>

        <div className="h-56 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cycleEstimates.recentCycles} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B5E68' }} axisLine={false} tickLine={false} />
              <YAxis domain={[20, 36]} tick={{ fontSize: 11, fill: '#6B5E68' }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(251, 230, 222, 0.4)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-plum text-cream text-xs px-3 py-1.5 rounded-xl shadow-md">
                        <span className="font-bold">{payload[0].value} days</span> ({payload[0].payload.month})
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="length" radius={[8, 8, 0, 0]} fill="#F0A89B">
                {cycleEstimates.recentCycles.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.length > 30 ? '#C8553D' : '#F0A89B'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Irregularity Clinical Insight Card */}
      {cycleEstimates.isIrregular && (
        <div className="bg-[#FFF8F2] border border-sindoor/30 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-sindoor" />
              <h4 className="font-serif text-base font-bold text-plum">
                {t.cycle.irregularTitle}
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sindoor/10 text-sindoor">
                {t.cycle.irregularBadge}
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t.cycle.irregularDesc} <span className="font-bold">{t.cycle.notADiagnosis}</span>
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/app/threads'}
            className="text-xs font-bold text-sindoor hover:underline flex items-center gap-1 flex-shrink-0"
          >
            <span>{t.cycle.seeDetails}</span>
          </button>
        </div>
      )}

      {/* Day Log Editor Modal */}
      {isEditorOpen && selectedDay && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-clay space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-clay/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-plum">
                {t.cycle.logPeriodModalTitle} · {selectedDay}
              </h3>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="p-1 rounded-full text-ink-muted hover:text-ink hover:bg-clay-light"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Period Day Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FBE6DE]/40 border border-clay/50">
              <span className="text-sm font-semibold text-plum">Bleeding / Period</span>
              <input
                type="checkbox"
                checked={editorIsPeriod}
                onChange={(e) => setEditorIsPeriod(e.target.checked)}
                className="w-5 h-5 accent-[#C8553D] rounded-lg cursor-pointer"
              />
            </div>

            {editorIsPeriod && (
              <>
                {/* Flow selection */}
                <div>
                  <label className="block text-xs font-semibold text-ink-muted mb-2">
                    {t.cycle.flowLabel}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['spotting', 'light', 'moderate', 'heavy'] as const).map(flow => (
                      <button
                        key={flow}
                        type="button"
                        onClick={() => setEditorFlow(flow)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          editorFlow === flow
                            ? 'bg-[#C8553D] text-white border-[#C8553D] shadow-xs'
                            : 'bg-white border-clay text-ink-muted hover:border-plum'
                        }`}
                      >
                        {t.cycle.flows[flow]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pain severity */}
                <div>
                  <label className="block text-xs font-semibold text-ink-muted mb-2">
                    {t.cycle.painLabel}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setEditorPain(level as 0 | 1 | 2 | 3)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          editorPain === level
                            ? 'bg-plum text-white border-plum shadow-xs'
                            : 'bg-white border-clay text-ink-muted hover:border-plum'
                        }`}
                      >
                        {level === 0 ? '0 · None' : level === 1 ? '1 · Mild' : level === 2 ? '2 · Mod' : '3 · Severe'}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-ink-muted mb-1">
                {t.cycle.notesLabel}
              </label>
              <textarea
                value={editorNotes}
                onChange={(e) => setEditorNotes(e.target.value)}
                placeholder="Any observations, cramps, or mood..."
                rows={2}
                className="w-full p-3 rounded-xl border border-clay text-sm focus:outline-none focus:border-plum"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-clay text-xs font-bold text-ink-muted hover:bg-clay-light"
              >
                {t.cycle.cancel}
              </button>
              <button
                type="button"
                onClick={handleSaveDayLog}
                className="flex-1 py-2.5 bg-[#C8553D] hover:bg-[#B3452E] text-white rounded-xl text-xs font-bold shadow-xs"
              >
                {t.cycle.saveLog}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
