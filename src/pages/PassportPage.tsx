import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Download, 
  Copy, 
  Share2, 
  Check, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  MessageSquare,
  Volume2,
  Calendar,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  generateAppointmentScript, 
  getAppointmentRehearsalCards, 
  generateFamilyExplanation 
} from '../lib/mock/mockExplainer';

export const PassportPage: React.FC = () => {
  const { 
    profile, 
    patterns, 
    checkins, 
    passportDraft, 
    updatePassportDraft, 
    followups, 
    addFollowupItem, 
    toggleFollowup,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'passport' | 'practice' | 'family'>('passport');
  const [consentChecked, setConsentChecked] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [familyCopied, setFamilyCopied] = useState<boolean>(false);
  const [shareLinkActive, setShareLinkActive] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newFollowupText, setNewFollowupText] = useState<string>('');
  const [newFollowupDate, setNewFollowupDate] = useState<string>('');
  const [questionsOpen, setQuestionsOpen] = useState<boolean>(true);

  const userName = profile?.name || 'Patient';
  const age = profile?.ageRange || '26';
  const rehearsalCards = getAppointmentRehearsalCards();
  const appointmentScript = generateAppointmentScript(userName, patterns[0]?.title);
  const familyMessage = generateFamilyExplanation(language);

  // Generate Doctor Passport PDF using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica');

    // Header Background
    doc.setFillColor(91, 42, 78); // Plum
    doc.rect(0, 0, 210, 28, 'F');
    doc.setFillColor(200, 85, 61); // Sindoor accent line
    doc.rect(0, 28, 210, 2, 'F');

    // Title
    doc.setTextColor(255, 248, 242);
    doc.setFontSize(16);
    doc.text('KHOJ (खोज) • CLINICAL CONSULTATION PASSPORT', 14, 18);
    doc.setFontSize(9);
    doc.text('Confidential Patient-Reported Health Summary for Healthcare Providers', 14, 24);

    // Patient Demographics Box
    doc.setFillColor(251, 246, 239);
    doc.roundedRect(14, 36, 182, 22, 3, 3, 'F');
    doc.setDrawColor(234, 220, 203);
    doc.roundedRect(14, 36, 182, 22, 3, 3, 'S');

    doc.setTextColor(43, 34, 48);
    doc.setFontSize(10);
    doc.text(`Patient: ${userName}`, 18, 44);
    doc.text(`Age: ${age} | Location: Pune, India`, 100, 44);
    doc.text(`Life Stage: ${profile?.lifeStage || 'Menstrual cycles'}`, 18, 52);
    doc.text(`Report Date: ${new Date().toLocaleDateString('en-GB')}`, 100, 52);

    let y = 66;

    // 1. Cycle & Symptom Analysis
    doc.setFontSize(11);
    doc.setTextColor(200, 85, 61); // Sindoor
    doc.text('1. FOUR-MONTH CYCLE & SYMPTOM OBSERVATIONS', 14, y);
    y += 6;
    doc.setFontSize(9.5);
    doc.setTextColor(43, 34, 48);
    doc.text(`• Total recorded logs: ${checkins.length} check-ins across 4 consecutive cycles`, 18, y);
    y += 5.5;
    doc.text('• Primary pattern: Heavy flow during days 1-3 with substantial pad changes', 18, y);
    y += 5.5;
    doc.text('• Correlated signs: Fatigue (severity 2/3), lightheadedness when climbing stairs', 18, y);
    y += 9;

    // 2. Discovered Clinical Patterns
    doc.setFontSize(11);
    doc.setTextColor(200, 85, 61);
    doc.text('2. DISCOVERED PATTERNS FOR CLINICAL EVALUATION', 14, y);
    y += 6;
    patterns.forEach((p) => {
      doc.setFontSize(9.5);
      doc.setTextColor(91, 42, 78);
      doc.text(`• ${p.title} (${p.evidenceStrength.toUpperCase()} confidence)`, 18, y);
      y += 5;
      doc.setFontSize(8.5);
      doc.setTextColor(110, 96, 114);
      doc.text(`  Summary: ${p.summary}`, 22, y);
      y += 5;
      doc.text(`  Recommended screening to discuss: ${p.suggestedTests.join(', ')}`, 22, y);
      y += 6;
    });
    y += 4;

    // 3. Recommended Tests to Discuss
    doc.setFontSize(11);
    doc.setTextColor(200, 85, 61);
    doc.text('3. LABORATORY INVESTIGATIONS TO DISCUSS', 14, y);
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(43, 34, 48);
    doc.text('• Complete Blood Count (CBC) with differential', 18, y);
    y += 5;
    doc.text('• Serum Ferritin & Iron Studies (rule out iron depletion/microcytic anemia)', 18, y);
    y += 5;
    doc.text('• Pelvic Ultrasound (USG) & Thyroid Stimulating Hormone (TSH) if indicated', 18, y);
    y += 9;

    // 4. Questions Prepared by Patient
    if (passportDraft.customQuestions.length > 0) {
      doc.setFontSize(11);
      doc.setTextColor(200, 85, 61);
      doc.text('4. QUESTIONS PREPARED BY PATIENT FOR THIS CONSULTATION', 14, y);
      y += 6;
      doc.setFontSize(9);
      doc.setTextColor(43, 34, 48);
      passportDraft.customQuestions.forEach((q) => {
        doc.text(`? ${q}`, 18, y);
        y += 5.5;
      });
      y += 4;
    }

    // 5. Clinician Consultation Notes Box
    doc.setFontSize(11);
    doc.setTextColor(200, 85, 61);
    doc.text("5. CLINICIAN'S CONSULTATION NOTES & PRESCRIPTION", 14, y);
    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.rect(14, y, 182, 35);
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text('Doctor notes, vitals (BP, Hb), clinical advice, and next review date...', 18, y + 6);

    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(110, 96, 114);
    doc.text('Disclaimer: Khoj shares health patterns and possibilities, not clinical diagnoses.', 14, 280);
    doc.text('Generated for medical collaboration. In an emergency, call 112 or visit nearest hospital.', 14, 285);

    doc.save(`Khoj_Doctor_Passport_${userName.replace(' ', '_')}.pdf`);
  };

  const handleCopySummary = () => {
    const text = `KHOJ DOCTOR PASSPORT SUMMARY
Patient: ${userName} (Age: ${age}, City: Pune)
Life Stage: ${profile?.lifeStage || 'Menstrual cycles'}
Key Symptoms: Heavy bleeding, fatigue (severity 2), lightheadedness
Flagged Patterns:
- Possible iron deficiency (Medium confidence)
- Hormonal / cycle considerations
Questions to Ask:
${passportDraft.customQuestions.map(q => `- ${q}`).join('\n')}
(Note: Patient-reported health log via Khoj. Not a medical diagnosis)`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    updatePassportDraft({
      customQuestions: [...passportDraft.customQuestions, newQuestion.trim()]
    });
    setNewQuestion('');
  };

  const removeQuestion = (idx: number) => {
    updatePassportDraft({
      customQuestions: passportDraft.customQuestions.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in font-body text-ink max-w-4xl mx-auto">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sage-dark text-cream text-[11px] font-bold tracking-wider">
              SAATH साथ • Carry Forward
            </span>
            <span className="text-xs text-ink-muted">Doctor Report & Appointment Preparation</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl text-plum font-bold">
            Passport
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            One-page clinical summary for your doctor and appointment rehearsal tools.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white rounded-2xl p-1 border border-clay shadow-xs text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'passport' ? 'bg-plum text-cream shadow-xs font-bold' : 'text-ink-muted hover:text-plum'
            }`}
          >
            Doctor Passport
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'practice' ? 'bg-plum text-cream shadow-xs font-bold' : 'text-ink-muted hover:text-plum'
            }`}
          >
            Practice Appointment
          </button>
          <button
            onClick={() => setActiveTab('family')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'family' ? 'bg-plum text-cream shadow-xs font-bold' : 'text-ink-muted hover:text-plum'
            }`}
          >
            Explain to Family
          </button>
        </div>
      </div>

      {/* TAB 1: DOCTOR PASSPORT PREVIEW & ACTIONS (Matching Panel 3 Passport in Image) */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          {/* A4 Report Card Container Matching Image */}
          <div className="bg-white border-2 border-clay rounded-4xl p-6 sm:p-8 shadow-plum-md space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-clay/70">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sindoor" />
                <h2 className="font-heading text-xl text-plum font-bold">
                  User Summary Report
                </h2>
              </div>
              <span className="text-xs text-ink-muted">
                One-Page Clinical Summary
              </span>
            </div>

            {/* Patient Header Block */}
            <div className="p-4 rounded-2xl bg-cream-light border border-clay text-xs text-ink grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-ink-muted uppercase tracking-wider block">Patient</span>
                <span className="font-semibold text-plum text-sm">{userName}</span>
              </div>
              <div>
                <span className="text-[10px] text-ink-muted uppercase tracking-wider block">Age & City</span>
                <span className="font-semibold text-plum">{age} • Pune</span>
              </div>
              <div>
                <span className="text-[10px] text-ink-muted uppercase tracking-wider block">Life Stage</span>
                <span className="font-semibold text-plum">Menstrual cycles</span>
              </div>
              <div>
                <span className="text-[10px] text-ink-muted uppercase tracking-wider block">Key Symptoms</span>
                <span className="font-semibold text-plum">Heavy bleeding, fatigue, dizziness</span>
              </div>
            </div>

            {/* Flagged Patterns */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-plum uppercase tracking-wider block">
                Flagged Patterns
              </span>
              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-blush-soft border border-clay text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sindoor" />
                    <span className="font-semibold text-plum">Possible iron deficiency</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sindoor/10 text-sindoor font-semibold text-[10px]">
                    Medium
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-light border border-clay text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                    <span className="font-semibold text-plum">Hormonal imbalance (PCOS)</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sage-light text-sage-dark font-semibold text-[10px]">
                    Low
                  </span>
                </div>
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-plum uppercase tracking-wider block">
                Medications
              </span>
              <div className="p-3 rounded-2xl bg-cream-light border border-clay text-xs text-ink">
                Iron supplements (as needed), Meftal-Spas during acute pain
              </div>
            </div>

            {/* Previous Episodes */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-plum uppercase tracking-wider block">
                Previous Episodes
              </span>
              <div className="p-3 rounded-2xl bg-cream-light border border-clay text-xs text-ink">
                1 episode of severe period pain and lightheadedness logged in February cycle
              </div>
            </div>

            {/* Questions to ask my doctor */}
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setQuestionsOpen(!questionsOpen)}
              >
                <span className="text-xs font-bold text-plum uppercase tracking-wider">
                  Questions to ask my doctor ({passportDraft.customQuestions.length})
                </span>
                {questionsOpen ? <ChevronUp className="w-4 h-4 text-plum" /> : <ChevronDown className="w-4 h-4 text-plum" />}
              </div>

              {questionsOpen && (
                <div className="space-y-2 pt-1">
                  {passportDraft.customQuestions.map((q, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 p-2.5 bg-cream-light rounded-xl text-xs text-ink">
                      <span>• {q}</span>
                      <button onClick={() => removeQuestion(idx)} className="text-ink-muted hover:text-emergency">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Add another question for your doctor..."
                      className="flex-1 px-3 py-2 rounded-xl border border-clay bg-white text-xs text-ink focus:outline-none focus:border-sindoor"
                    />
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="px-3.5 py-2 bg-plum text-cream rounded-xl text-xs font-semibold hover:bg-plum-dark"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Consent Checkbox matching image */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 text-xs text-ink font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-sindoor focus:ring-sindoor"
                />
                <span>I consent to share this report</span>
              </label>
            </div>

            {/* Action Buttons matching image */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleDownloadPDF}
                className="w-full py-3.5 px-6 rounded-2xl bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-sm shadow-sindoor flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCopySummary}
                  className="py-2.5 px-4 rounded-xl bg-cream border border-clay hover:bg-clay-light text-plum font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5 text-ink-muted" />}
                  <span>{isCopied ? 'Copied' : 'Copy summary'}</span>
                </button>

                <button
                  onClick={() => setShareLinkActive(!shareLinkActive)}
                  className="py-2.5 px-4 rounded-xl bg-cream border border-clay hover:bg-clay-light text-plum font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-sindoor" />
                  <span>Share link</span>
                </button>
              </div>

              {shareLinkActive && (
                <div className="p-3 rounded-xl bg-sage-light/60 border border-sage/40 text-xs text-sage-dark text-center">
                  ✓ Secure encrypted link copied to clipboard (valid for 24 hours).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRACTICE MY APPOINTMENT */}
      {activeTab === 'practice' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Spoken Script */}
          <div className="bg-white border-2 border-sindoor/20 rounded-3xl p-6 sm:p-8 shadow-plum-sm space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-sindoor" />
              <h2 className="font-heading text-xl text-plum font-bold">
                Your 30-Second Consultation Opening
              </h2>
            </div>
            <p className="text-xs text-ink-muted">
              You can read this aloud or say it naturally as you sit down with your doctor:
            </p>

            <div className="p-4 rounded-2xl bg-cream-light border border-clay text-sm text-ink italic leading-relaxed">
              {appointmentScript}
            </div>
          </div>

          {/* 3 Rehearsal Cards for Dismissive Situations */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-plum font-bold">
              Appointment Rehearsal: If You Feel Dismissed
            </h3>
            <p className="text-xs text-ink-muted">
              Indian women often hear "it's just stress" or "heavy periods are normal". Here are calm, evidence-based ways to advocate for yourself:
            </p>

            <div className="space-y-3.5">
              {rehearsalCards.map((card, idx) => (
                <div key={idx} className="bg-white border border-clay rounded-3xl p-5 shadow-plum-sm space-y-3">
                  <div className="p-3 rounded-2xl bg-blush-soft border border-clay text-xs text-plum font-semibold">
                    <span className="text-sindoor block text-[10px] uppercase tracking-wider mb-0.5">If the doctor says:</span>
                    "{card.dismissivePhrase}"
                  </div>

                  <div className="p-3 rounded-2xl bg-cream-light border border-clay text-xs text-ink leading-relaxed">
                    <span className="text-sage-dark block text-[10px] uppercase tracking-wider font-semibold mb-0.5">Calm response:</span>
                    "{card.calmResponse}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EXPLAIN TO MY FAMILY */}
      {activeTab === 'family' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white border border-clay rounded-3xl p-6 sm:p-8 shadow-plum-sm space-y-4 text-left">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sindoor" />
              <h2 className="font-heading text-xl text-plum font-bold">
                Explain to My Family
              </h2>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              Sharing cycle health with family or a partner can feel sensitive. Here is a thoughtful, non-clinical message in your selected language to share via WhatsApp or SMS:
            </p>

            <div className="p-5 rounded-2xl bg-cream-light border border-clay text-sm text-ink leading-relaxed font-body">
              {familyMessage}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-ink-muted">
                Language: {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'मराठी'}
              </span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(familyMessage);
                  setFamilyCopied(true);
                  setTimeout(() => setFamilyCopied(false), 2000);
                }}
                className="px-5 py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream text-xs font-semibold flex items-center gap-2 shadow-sindoor"
              >
                {familyCopied ? <Check className="w-3.5 h-3.5 text-sage-light" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{familyCopied ? 'Message Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
