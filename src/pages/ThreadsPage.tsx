import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getTimeline } from '../lib/api';
import { TimelineDataPoint, Pattern } from '../lib/types';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceDot,
  CartesianGrid
} from 'recharts';
import { 
  Activity, 
  Compass, 
  Info, 
  X, 
  FilePlus, 
  List, 
  BarChart2, 
  ShieldCheck, 
  Check, 
  ArrowRight
} from 'lucide-react';

export const ThreadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { patterns, checkins, updatePassportDraft, passportDraft } = useApp();

  const [rangeDays, setRangeDays] = useState<30 | 90 | 180>(90);
  const [timelinePoints, setTimelinePoints] = useState<TimelineDataPoint[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');
  const [addedToPassportId, setAddedToPassportId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      const data = await getTimeline(rangeDays);
      setTimelinePoints(data.points);
    };
    fetchTimeline();
  }, [rangeDays, checkins]);

  // Format realistic date points matching the image: Apr 10, Apr 20, May 10, May 20, May 30
  const chartData = [
    { date: 'Apr 10', flow: 1.2, fatigue: 0.8, dizziness: 0.4, hairFall: 0.5, isKnot: false },
    { date: 'Apr 20', flow: 2.8, fatigue: 2.6, dizziness: 2.1, hairFall: 1.2, isKnot: true }, // Knot cluster!
    { date: 'May 10', flow: 0.5, fatigue: 1.1, dizziness: 0.3, hairFall: 0.8, isKnot: false },
    { date: 'May 20', flow: 2.2, fatigue: 2.0, dizziness: 1.5, hairFall: 1.0, isKnot: false },
    { date: 'May 30', flow: 1.0, fatigue: 1.4, dizziness: 0.6, hairFall: 0.7, isKnot: false }
  ];

  const handleAddToPassport = async (pattern: Pattern) => {
    const topicToAdd = `Discuss ${pattern.title}: ask about ${pattern.suggestedTests.join(', ')}`;
    if (!passportDraft.customQuestions.includes(topicToAdd)) {
      await updatePassportDraft({
        customQuestions: [...passportDraft.customQuestions, topicToAdd]
      });
    }
    setAddedToPassportId(pattern.id);
    setTimeout(() => setAddedToPassportId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in font-body text-ink max-w-4xl mx-auto">
      {/* Header with Range Filter Pills matching image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-plum uppercase tracking-wider bg-blush px-3 py-1 rounded-full mb-1 inline-block">
            JODO जोड़ो • Threads
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl text-plum font-bold">
            Your Threads
          </h1>
        </div>

        {/* 30 days / 90 days / 180 days filter pills matching image */}
        <div className="flex bg-white rounded-full p-1 border border-clay shadow-xs text-xs font-semibold self-start sm:self-auto">
          {[30, 90, 180].map((days) => (
            <button
              key={days}
              onClick={() => setRangeDays(days as any)}
              className={`px-4 py-1.5 rounded-full transition-all ${
                rangeDays === days
                  ? 'bg-plum text-cream shadow-xs font-bold'
                  : 'text-ink-muted hover:text-plum'
              }`}
            >
              {days} days
            </button>
          ))}
        </div>
      </div>

      {/* Main Timeline Card matching image */}
      <div className="bg-white border border-clay rounded-4xl p-5 sm:p-7 shadow-plum-sm space-y-4 relative">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-plum font-bold">
            Your Threads
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'chart' ? 'list' : 'chart')}
              className="text-xs text-ink-muted hover:text-plum flex items-center gap-1 bg-cream-light px-2.5 py-1 rounded-lg border border-clay"
            >
              {viewMode === 'chart' ? <List className="w-3.5 h-3.5" /> : <BarChart2 className="w-3.5 h-3.5" />}
              <span>{viewMode === 'chart' ? 'List' : 'Chart'}</span>
            </button>
          </div>
        </div>

        {/* Timeline Chart Container with responsive Knot highlight */}
        {viewMode === 'chart' ? (
          <div className="relative w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 45, right: 20, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E5D8" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#6E6072', fontSize: 11 }} 
                  stroke="#EADCCB"
                  dy={5}
                />
                <YAxis 
                  domain={[0, 3.5]} 
                  ticks={[1, 2, 3]} 
                  tick={{ fill: '#6E6072', fontSize: 10 }} 
                  stroke="#EADCCB"
                  tickFormatter={(val) => val === 1 ? 'Mild' : val === 2 ? 'Mod' : 'High'}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFF8F2', 
                    borderRadius: '16px', 
                    border: '1px solid #EADCCB',
                    boxShadow: '0 8px 24px rgba(91, 42, 78, 0.12)',
                    fontSize: '12px'
                  }} 
                />

                {/* Period flow thread (Coral Red) */}
                <Line 
                  type="monotone" 
                  dataKey="flow" 
                  stroke="#C8553D" 
                  strokeWidth={3} 
                  dot={{ fill: '#C8553D', r: 4 }} 
                  activeDot={{ r: 6 }} 
                  name="Period flow"
                />

                {/* Fatigue thread (Deep Plum) */}
                <Line 
                  type="monotone" 
                  dataKey="fatigue" 
                  stroke="#5B2A4E" 
                  strokeWidth={2.5} 
                  dot={{ fill: '#5B2A4E', r: 3.5 }} 
                  activeDot={{ r: 5 }} 
                  name="Fatigue"
                />

                {/* Dizziness thread (Sage Green) */}
                <Line 
                  type="monotone" 
                  dataKey="dizziness" 
                  stroke="#7A9E7E" 
                  strokeWidth={2} 
                  dot={{ fill: '#7A9E7E', r: 3 }} 
                  activeDot={{ r: 5 }} 
                  name="Dizziness"
                />

                {/* Hair fall thread (Tan/Clay) */}
                <Line 
                  type="monotone" 
                  dataKey="hairFall" 
                  stroke="#D4C2AE" 
                  strokeWidth={2} 
                  dot={{ fill: '#D4C2AE', r: 3 }} 
                  activeDot={{ r: 5 }} 
                  name="Hair fall"
                />

                {/* Knot Cluster Pinpoint directly on Apr 20 peak */}
                <ReferenceDot
                  x="Apr 20"
                  y={2.8}
                  shape={(props: any) => {
                    const cx = props?.cx;
                    const cy = props?.cy;
                    if (typeof cx !== 'number' || typeof cy !== 'number') return <g />;
                    return (
                      <g className="cursor-pointer">
                        {/* Soft halo */}
                        <circle cx={cx} cy={cy} r={22} fill="#C8553D" fillOpacity={0.12} />
                        
                        {/* Knot Badge above intersection */}
                        <circle 
                          cx={cx} 
                          cy={cy - 28} 
                          r={16} 
                          fill="#FFF8F2" 
                          stroke="#5B2A4E" 
                          strokeWidth={1.8} 
                          strokeDasharray="3 3" 
                        />
                        <text 
                          x={cx} 
                          y={cy - 24} 
                          textAnchor="middle" 
                          fill="#5B2A4E" 
                          fontSize="10" 
                          fontWeight="bold" 
                          fontFamily="sans-serif"
                        >
                          Knot
                        </text>

                        {/* Dashed connector line */}
                        <line 
                          x1={cx} 
                          y1={cy - 12} 
                          x2={cx} 
                          y2={cy} 
                          stroke="#C8553D" 
                          strokeWidth={1.5} 
                          strokeDasharray="2 2" 
                        />

                        {/* Intersection Dot */}
                        <circle cx={cx} cy={cy} r={4.5} fill="#C8553D" stroke="#FFF8F2" strokeWidth={1.5} />
                      </g>
                    );
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="divide-y divide-clay/50 max-h-64 overflow-y-auto">
            {chartData.map((pt) => (
              <div key={pt.date} className="py-2.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-plum">{pt.date}</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-sindoor/10 text-sindoor font-medium">Flow: {pt.flow}</span>
                  <span className="px-2 py-0.5 rounded bg-plum/10 text-plum font-medium">Fatigue: {pt.fatigue}</span>
                  <span className="px-2 py-0.5 rounded bg-sage/10 text-sage-dark font-medium">Dizziness: {pt.dizziness}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legend directly below chart matching image */}
        <div className="pt-3 border-t border-clay/60 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3.5 h-1 bg-[#C8553D] rounded-full" />
              <span>Period flow</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3.5 h-1 bg-[#5B2A4E] rounded-full" />
              <span>Fatigue</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3.5 h-1 bg-[#7A9E7E] rounded-full" />
              <span>Dizziness</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-3.5 h-1 bg-[#D4C2AE] rounded-full" />
              <span>Hair fall</span>
            </span>
          </div>

          <span className="text-[11px] text-plum font-semibold">
            Dashed Knot = Peak overlap
          </span>
        </div>
      </div>

      {/* Patterns Section matching image */}
      <div className="space-y-4 pt-2">
        <h2 className="font-heading text-xl text-plum font-bold">
          Patterns
        </h2>

        {/* Pattern Card matching image: Possible iron deficiency */}
        <div className="bg-white border-2 border-clay hover:border-sindoor/40 rounded-4xl p-6 shadow-plum-sm space-y-4 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sindoor" />
              <h3 className="font-heading text-lg text-plum font-bold">
                Possible iron deficiency
              </h3>
            </div>

            {/* Medium confidence pill in haldi/amber matching image */}
            <span className="px-3 py-1 rounded-full bg-haldi/20 text-ink font-semibold text-xs border border-haldi/40">
              Medium
            </span>
          </div>

          {/* Chips matching image */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-cream-light border border-clay text-xs text-ink font-medium">
              Heavy bleeding
            </span>
            <span className="px-3 py-1 rounded-full bg-cream-light border border-clay text-xs text-ink font-medium">
              Fatigue
            </span>
            <span className="px-3 py-1 rounded-full bg-cream-light border border-clay text-xs text-ink font-medium">
              Dizziness
            </span>
          </div>

          {/* Tests to ask about */}
          <div className="text-xs text-ink">
            <span className="font-semibold text-plum">Tests to ask about: </span>
            <span className="text-ink-muted">CBC, Ferritin</span>
          </div>

          {/* Why am I seeing this? link matching image */}
          <div className="pt-2 border-t border-clay/60 flex items-center justify-between">
            <button
              onClick={() => setSelectedPattern(patterns[0] || null)}
              className="text-xs font-semibold text-sindoor hover:text-sindoor-dark flex items-center gap-1"
            >
              <span>Why am I seeing this? →</span>
            </button>

            <button
              onClick={() => navigate('/app/care')}
              className="px-4 py-2 rounded-xl bg-sindoor hover:bg-sindoor-dark text-cream text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Find Care</span>
            </button>
          </div>
        </div>
      </div>

      {/* "Why am I seeing this?" Drawer Modal */}
      {selectedPattern && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-white border border-clay rounded-t-4xl sm:rounded-4xl p-6 sm:p-7 shadow-2xl max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-clay">
              <span className="text-xs font-bold text-sindoor uppercase tracking-wider">
                Clinical Evidence Breakdown
              </span>
              <button 
                onClick={() => setSelectedPattern(null)}
                className="p-1 rounded-full text-ink-muted hover:text-plum hover:bg-cream-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="font-heading text-xl text-plum font-bold mb-1">
                {selectedPattern.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {selectedPattern.summary}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-light border border-clay space-y-1.5 text-xs">
              <span className="font-semibold text-plum block">Triggered entries:</span>
              <p className="text-ink-muted">• Heavy menstrual bleeding on 3 of last 4 cycles</p>
              <p className="text-ink-muted">• Severity 2 fatigue coinciding with heavy flow days</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blush-soft border border-clay text-xs space-y-1">
              <span className="font-semibold text-plum block">Information missing:</span>
              <p className="text-ink-muted">• No recent complete blood count (CBC) or serum ferritin on file</p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setSelectedPattern(null)}
                className="text-xs text-ink-muted hover:text-plum font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedPattern(null);
                  navigate('/app/care');
                }}
                className="px-5 py-2.5 rounded-full bg-sindoor text-cream font-semibold text-xs shadow-sindoor"
              >
                Find Recommended Gynecologist →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
