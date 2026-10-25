import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { USE_MOCK, API_BASE_URL } from '../lib/api';
import { Language, LifeStage } from '../lib/types';
import { 
  Settings, 
  EyeOff, 
  Eye, 
  Globe, 
  Shield, 
  Download, 
  Trash2, 
  Sparkles, 
  Info, 
  Check, 
  AlertTriangle,
  Server
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    consents, 
    updateConsents, 
    profile, 
    updateProfile, 
    loadDemo, 
    clearData, 
    session,
    logout,
    exportMyDataJson
  } = useApp();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [demoLoadedMsg, setDemoLoadedMsg] = useState<boolean>(false);

  // Export data as JSON download
  const handleExportJSON = () => {
    const jsonStr = exportMyDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Khoj_Health_Export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadDemo = async () => {
    await loadDemo();
    setDemoLoadedMsg(true);
    setTimeout(() => setDemoLoadedMsg(false), 3000);
  };

  const handleDeleteAll = async () => {
    await clearData();
    setConfirmDelete(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 animate-fade-in font-body">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-plum font-bold mb-1">
          Settings & Privacy
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted">
          Manage your personal choices, data ownership, and demonstration modes.
        </p>
      </div>

      {/* Demo Mode Action Banner */}
      <div className="bg-gradient-to-r from-cream-light via-blush to-cream-light border-2 border-sindoor/30 rounded-3xl p-5 shadow-plum-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-sindoor font-bold text-xs uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            Hackathon 90-Second Demo
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Loads fictional patient "Priya" (26y) with 4 months of heavy cycles, fatigue, and correlated patterns.
          </p>
        </div>

        <button
          onClick={handleLoadDemo}
          className="px-4 py-2.5 rounded-2xl bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-xs shadow-sindoor whitespace-nowrap transition-transform active:scale-95 flex items-center justify-center gap-1.5"
        >
          {demoLoadedMsg ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Loaded Priya's Data!</span>
            </>
          ) : (
            <span>Load Demo Data</span>
          )}
        </button>
      </div>

      {/* Language Preference */}
      <div className="bg-white border border-clay rounded-3xl p-5 sm:p-6 shadow-plum-sm space-y-3">
        <div className="flex items-center gap-2 text-plum font-semibold text-sm">
          <Globe className="w-4 h-4 text-sindoor" />
          <span>App Language</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: 'en' as Language, label: 'English', sub: 'English' },
            { id: 'hi' as Language, label: 'हिन्दी', sub: 'Hindi' },
            { id: 'mr' as Language, label: 'मराठी', sub: 'Marathi' }
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setLanguage(l.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                language === l.id
                  ? 'bg-plum text-cream border-plum font-bold shadow-xs'
                  : 'bg-cream-light border-clay text-ink hover:bg-blush/40'
              }`}
            >
              <span className="text-sm block">{l.label}</span>
              <span className={`text-[10px] block mt-0.5 ${language === l.id ? 'text-cream/80' : 'text-ink-muted'}`}>
                {l.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Discreet Mode */}
      <div className="bg-white border border-clay rounded-3xl p-5 sm:p-6 shadow-plum-sm flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-plum font-semibold text-sm">
            {consents.discreetMode ? <EyeOff className="w-4 h-4 text-sindoor" /> : <Eye className="w-4 h-4 text-sindoor" />}
            <span>Discreet Mode</span>
          </div>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed max-w-md">
            Masks the browser tab title as "Notes" and removes reproductive health words from top notifications.
          </p>
        </div>

        <button
          onClick={() => updateConsents({ discreetMode: !consents.discreetMode })}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors flex-shrink-0 ${
            consents.discreetMode ? 'bg-plum' : 'bg-clay-dark'
          }`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            consents.discreetMode ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Life Stage */}
      <div className="bg-white border border-clay rounded-3xl p-5 sm:p-6 shadow-plum-sm space-y-3">
        <span className="text-xs font-semibold text-plum uppercase tracking-wider block">
          Current Life Stage
        </span>
        <select
          value={profile?.lifeStage || 'menstrual'}
          onChange={(e) => updateProfile({ lifeStage: e.target.value as LifeStage })}
          className="w-full px-3.5 py-2.5 rounded-xl border border-clay bg-cream-light text-xs sm:text-sm text-ink"
        >
          <option value="menstrual">Menstrual cycles</option>
          <option value="pregnant">Pregnant</option>
          <option value="postpartum">Postpartum (activates mood and lochia pathways)</option>
          <option value="perimenopause">Perimenopause</option>
          <option value="not_sure">Not sure</option>
        </select>
        {profile?.lifeStage === 'postpartum' && (
          <p className="text-xs text-sindoor">
            ✓ Postpartum pathway active: Check-in now includes recovery, feeding, and Edinburgh-inspired mood screening.
          </p>
        )}
      </div>

      {/* Privacy and Consents */}
      <div className="bg-white border border-clay rounded-3xl p-5 sm:p-6 shadow-plum-sm space-y-4">
        <div className="flex items-center gap-2 text-plum font-semibold text-sm">
          <Shield className="w-4 h-4 text-sage" />
          <span>Revocable Privacy Consents</span>
        </div>

        <div className="space-y-3">
          {[
            {
              key: 'saveData' as const,
              label: 'Save my data locally',
              desc: 'Enables your multi-month timeline and pattern discovery.',
              val: consents.saveData
            },
            {
              key: 'aiExplain' as const,
              label: 'Use AI plain-language explanations',
              desc: 'Translates clinical correlations into calm insights.',
              val: consents.aiExplain
            },
            {
              key: 'sharePassport' as const,
              label: 'Allow Doctor Passport export',
              desc: 'Enables generating PDF summaries for medical consultations.',
              val: consents.sharePassport
            }
          ].map(c => (
            <div key={c.key} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-cream-light border border-clay">
              <div className="pr-2">
                <span className="font-semibold text-ink block">{c.label}</span>
                <span className="text-ink-muted text-[11px]">{c.desc}</span>
              </div>
              <input
                type="checkbox"
                checked={c.val}
                onChange={(e) => updateConsents({ [c.key]: e.target.checked })}
                className="w-4 h-4 rounded text-sindoor focus:ring-sindoor"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Data Management Actions */}
      <div className="bg-white border border-clay rounded-3xl p-5 sm:p-6 shadow-plum-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-plum uppercase tracking-wider block">
            Account & Data Ownership
          </span>
          <span className="text-[11px] font-bold text-ink-muted">
            {session.isDemo ? 'Demo Mode (Priya Sharma)' : session.user?.name ? `${session.user.name} (Personal)` : 'Personal Account'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExportJSON}
            className="flex-1 py-2.5 px-4 rounded-xl bg-cream border border-clay hover:bg-clay-light text-plum text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-sindoor" />
            <span>Export My Data (JSON)</span>
          </button>

          <button
            onClick={async () => {
              await logout();
              window.location.href = '/auth';
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-clay hover:bg-clay-light text-ink text-xs font-semibold flex items-center justify-center gap-2"
          >
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setConfirmDelete(true)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-emergency-light border border-emergency/30 hover:bg-emergency-light/80 text-emergency text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4 text-emergency" />
            <span>Delete Everything</span>
          </button>
        </div>

        {confirmDelete && (
          <div className="p-4 rounded-2xl bg-emergency-light border border-emergency/40 space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-emergency flex-shrink-0 mt-0.5" />
              <p className="text-xs text-emergency font-medium">
                Are you sure? This immediately erases all your logged check-ins, custom notes, and profile settings from this browser.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-3 py-1.5 rounded-lg bg-white text-xs text-ink"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-4 py-1.5 rounded-lg bg-emergency text-white text-xs font-bold"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backend & Environment Status */}
      <div className="p-4 rounded-2xl bg-cream-light border border-clay text-xs space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-plum flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-sage" />
            System Status
          </span>
          <span className="px-2 py-0.5 rounded-full bg-sage-light text-sage-dark text-[10px] font-bold">
            {USE_MOCK ? 'Mock Engine Active' : 'Live Backend Mode'}
          </span>
        </div>
        <p className="text-ink-muted text-[11px]">
          Target API URL: <code className="bg-white px-1.5 py-0.5 rounded border border-clay">{API_BASE_URL}</code>
        </p>
      </div>

      {/* About & Clinical Sources */}
      <div className="text-xs text-ink-muted space-y-2 pt-2 border-t border-clay/60">
        <h4 className="font-semibold text-plum flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-sindoor" />
          About Khoj & Clinical Rules
        </h4>
        <p className="leading-relaxed">
          Khoj (खोज) is built in alignment with WHO reproductive guidelines and FOGSI clinical recommendations for heavy menstrual bleeding and adolescent anemia.
        </p>
        <p className="text-[11px] opacity-80">
          Disclaimer: Patterns and possibilities are educational guides designed to empower you during doctor visits. They never replace licensed medical diagnosis or emergency care.
        </p>
      </div>
    </div>
  );
};
