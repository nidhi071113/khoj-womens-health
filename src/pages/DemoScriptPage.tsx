import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RED_FLAG_TEST_CASE } from '../lib/mockData';
import { assessSafety } from '../lib/api';
import { 
  Play, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Activity, 
  FileText, 
  Compass, 
  Home, 
  UserCheck 
} from 'lucide-react';

export const DemoScriptPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadDemo, safetyOverlay } = useApp();

  const handleTriggerRedFlag = async () => {
    const safety = await assessSafety(
      RED_FLAG_TEST_CASE.symptoms as any,
      RED_FLAG_TEST_CASE.lifeStage,
      RED_FLAG_TEST_CASE.flow
    );
    safetyOverlay.open(safety);
  };

  const steps = [
    {
      num: 1,
      title: 'Step 1: Landing Page & Brand Journey',
      desc: 'Introduce Khoj ("Find what your body tells you"), the 5 stages (Suno, Suraksha, Jodo, Raah, Saath), trilingual live switch, and flowing scroll thread.',
      actionText: 'Go to Landing Page',
      action: () => navigate('/')
    },
    {
      num: 2,
      title: 'Step 2: 4-Step Onboarding Flow',
      desc: 'Show language selection (EN/HI/MR cards), life stage options (Menstrual, Postpartum, etc.), granular privacy toggles, and optional cycle details with thread progress.',
      actionText: 'Go to Onboarding',
      action: () => navigate('/onboarding')
    },
    {
      num: 3,
      title: 'Step 3: Home Dashboard (Priya Profile)',
      desc: 'Demonstrate calm greeting with NO streaks or guilt, quick feeling chips with low-energy mode, cycle range snapshot, and gentle care reminders.',
      actionText: 'Load Priya & Go Home',
      action: async () => {
        await loadDemo();
        navigate('/app');
      }
    },
    {
      num: 4,
      title: 'Step 4: Check-in (Suno सुनो) + Red Flag Safety',
      desc: 'Show interactive Body Map, natural language symptom matching ("chakkar aate hain"), severity words, and test the full-screen Safety Overlay.',
      actionText: 'Go to Check-in',
      action: () => navigate('/app/check-in'),
      extraBtn: {
        text: 'Test Red Flag Safety Overlay (Fainting + Heavy Bleeding)',
        action: handleTriggerRedFlag
      }
    },
    {
      num: 5,
      title: 'Step 5: Threads (Jodo जोड़ो) - Core Differentiator',
      desc: 'Show Recharts multi-symptom timeline over 90 days, knot clustering, pattern detection (iron-deficiency correlation), and the "Why am I seeing this?" evidence drawer.',
      actionText: 'Go to Threads',
      action: () => navigate('/app/threads')
    },
    {
      num: 6,
      title: 'Step 6: Find Care (Raah) & Doctor Passport (Saath)',
      desc: 'Show specialist routing (gynecologist recommendation), verified Pune clinics, Doctor Passport with live A4 preview and client-side PDF export, plus Practice My Appointment.',
      actionText: 'Go to Doctor Passport',
      action: () => navigate('/app/passport')
    }
  ];

  return (
    <div className="min-h-screen bg-cream p-6 sm:p-10 font-body text-ink max-w-4xl mx-auto space-y-8">
      <div className="bg-plum text-cream p-6 sm:p-8 rounded-4xl shadow-plum-md space-y-2">
        <div className="flex items-center gap-2 text-sindoor-light text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Judge & Hackathon Presentation Helper
        </div>
        <h1 className="font-heading text-3xl font-bold">
          Khoj (खोज) • 90-Second Demo Script
        </h1>
        <p className="text-cream/80 text-sm max-w-2xl leading-relaxed">
          Use these one-click buttons during your live pitch to jump straight to each key screen without losing tempo.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((st) => (
          <div 
            key={st.num}
            className="bg-white border border-clay rounded-3xl p-5 sm:p-6 shadow-plum-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <h2 className="font-heading text-lg text-plum font-bold">
                {st.title}
              </h2>
              <p className="text-xs text-ink-muted leading-relaxed max-w-xl">
                {st.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              {st.extraBtn && (
                <button
                  onClick={st.extraBtn.action}
                  className="px-3.5 py-2 rounded-xl bg-emergency-light border border-emergency text-emergency font-semibold text-xs hover:bg-emergency hover:text-white transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5 inline mr-1" />
                  {st.extraBtn.text}
                </button>
              )}

              <button
                onClick={st.action}
                className="px-4 py-2.5 rounded-xl bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-xs shadow-sindoor flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <span>{st.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
