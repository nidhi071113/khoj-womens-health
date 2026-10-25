import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getCareRecommendation } from '../lib/api';
import { CareRecommendation, Provider } from '../lib/types';
import { EMERGENCY_HELPLINES } from '../lib/mock/mockProviders';
import { LeafletMap } from '../components/care/LeafletMap';
import { DoctorAvatar1, DoctorAvatar2, DoctorAvatar3 } from '../components/brand/DoctorAvatars';
import { 
  ArrowLeft,
  PhoneCall, 
  MapPin, 
  Clock, 
  Sparkles, 
  Check, 
  ChevronRight,
  Filter,
  FileText
} from 'lucide-react';

export const CarePage: React.FC = () => {
  const navigate = useNavigate();
  const { patterns } = useApp();
  const [recommendation, setRecommendation] = useState<CareRecommendation | null>(null);

  // Filters matching image
  const [selectedCost, setSelectedCost] = useState<'all' | 'free' | 'low' | 'private'>('all');
  const [selectedFacility, setSelectedFacility] = useState<'all' | 'public' | 'private'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [femaleDoctorOnly, setFemaleDoctorOnly] = useState<boolean>(true);

  useEffect(() => {
    const fetchCare = async () => {
      const rec = await getCareRecommendation({
        costBand: selectedCost,
        facility: selectedFacility,
        language: selectedLanguage,
        femaleDoctorOnly
      });
      setRecommendation(rec);
    };
    fetchCare();
  }, [selectedCost, selectedFacility, selectedLanguage, femaleDoctorOnly, patterns]);

  const getDoctorAvatar = (index: number) => {
    if (index % 3 === 0) return <DoctorAvatar1 />;
    if (index % 3 === 1) return <DoctorAvatar2 />;
    return <DoctorAvatar3 />;
  };

  return (
    <div className="space-y-6 animate-fade-in font-body text-ink max-w-4xl mx-auto">
      {/* Header matching image: ← Find Care */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => navigate('/app')}
          className="flex items-center gap-2 text-sm font-semibold text-plum hover:text-sindoor transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Find Care</span>
        </button>

        <span className="text-[11px] font-bold text-sindoor uppercase tracking-wider bg-blush px-3 py-1 rounded-full">
          RAAH राह • Specialist Guidance
        </span>
      </div>

      {/* Recommended Specialist Card matching image */}
      <div className="bg-gradient-to-br from-cream via-cream to-blush/40 border-2 border-sindoor/30 rounded-4xl p-6 sm:p-7 shadow-plum-sm space-y-4">
        <div className="flex items-start gap-3.5">
          {/* Stethoscope/Doctor icon */}
          <div className="w-12 h-12 rounded-2xl bg-white border border-clay flex items-center justify-center text-sindoor shadow-xs flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
              <circle cx="20" cy="10" r="2" />
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-sindoor text-white text-[11px] font-bold uppercase tracking-wider">
                Urgent
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cream-dark text-plum font-semibold text-[11px]">
                Within 1 week
              </span>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl text-plum font-bold mb-1">
              A gynecologist is the right first stop
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              For your symptoms and overall woman's health. Heavy bleeding and recurring tiredness should be evaluated together to check iron stores.
            </p>
          </div>
        </div>

        {/* What to ask box */}
        <div className="p-3.5 rounded-2xl bg-white/90 border border-clay text-xs text-ink space-y-1">
          <span className="font-semibold text-plum text-[11px] uppercase tracking-wider block">
            Suggested tests to request:
          </span>
          <p className="text-ink-muted">
            Complete Blood Count (CBC), Serum Ferritin & Iron Studies, Pelvic Ultrasound if pelvic pain persists.
          </p>
        </div>
      </div>

      {/* Filter Chips Bar matching image: Language | Cost | Public/Private | Female doctor -> */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
        {/* Language Filter */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="px-3.5 py-2 rounded-full border border-clay bg-white text-ink text-xs focus:outline-none focus:border-sindoor cursor-pointer shadow-xs"
        >
          <option value="all">Language: All (Marathi, Hindi, English)</option>
          <option value="marathi">Language: Marathi</option>
          <option value="hindi">Language: Hindi</option>
          <option value="english">Language: English</option>
        </select>

        {/* Cost Filter */}
        <select
          value={selectedCost}
          onChange={(e) => setSelectedCost(e.target.value as any)}
          className="px-3.5 py-2 rounded-full border border-clay bg-white text-ink text-xs focus:outline-none focus:border-sindoor cursor-pointer shadow-xs"
        >
          <option value="all">Cost: All</option>
          <option value="free">Cost: Free (Govt)</option>
          <option value="low">Cost: Subsidized</option>
          <option value="private">Cost: Private</option>
        </select>

        {/* Facility Filter */}
        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value as any)}
          className="px-3.5 py-2 rounded-full border border-clay bg-white text-ink text-xs focus:outline-none focus:border-sindoor cursor-pointer shadow-xs"
        >
          <option value="all">Facility: Public & Private</option>
          <option value="public">Facility: Public only</option>
          <option value="private">Facility: Private only</option>
        </select>

        {/* Female Doctor Preference Chip */}
        <button
          onClick={() => setFemaleDoctorOnly(!femaleDoctorOnly)}
          className={`px-3.5 py-2 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
            femaleDoctorOnly 
              ? 'bg-plum text-cream border-plum' 
              : 'bg-white border-clay text-ink-muted hover:text-plum'
          }`}
        >
          <span>Female doctor</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Leaflet Map Integration showing Pune Clinics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="font-semibold text-plum flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sindoor" />
            Interactive Pune Healthcare Facilities Map
          </span>
          <span>Tap pins to view clinic</span>
        </div>

        <LeafletMap />
      </div>

      {/* Provider List matching image */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-plum uppercase tracking-wider">
            {recommendation?.providers.length || 6} providers found (Pune)
          </span>
          <span className="text-[11px] text-ink-muted">
            Verified sample directory
          </span>
        </div>

        <div className="space-y-3">
          {recommendation?.providers.map((provider, idx) => (
            <div 
              key={provider.id}
              className="bg-white border border-clay hover:border-sindoor/40 rounded-3xl p-4 sm:p-5 shadow-plum-sm flex items-center justify-between gap-4 transition-all"
            >
              {/* Left: Woman Doctor Avatar & Details matching image */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {getDoctorAvatar(idx)}

                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-base text-plum truncate">
                    {provider.name}
                  </h3>
                  <div className="text-xs text-ink-muted flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span>{provider.type}</span>
                    <span>•</span>
                    <span className="capitalize">{provider.costBand === 'free' ? 'Public' : 'Private'}</span>
                  </div>
                  <div className="text-[11px] text-ink-muted flex items-center gap-2 mt-1">
                    <span className="text-plum font-medium">{provider.area}</span>
                    <span>•</span>
                    <span className="text-sage-dark font-medium">Verified 12 Apr 2026</span>
                  </div>
                </div>
              </div>

              {/* Right: Prominent Call Button matching image */}
              <a
                href={`tel:${provider.phone}`}
                className="px-5 py-2.5 rounded-full bg-sindoor hover:bg-sindoor-dark text-cream font-semibold text-xs sm:text-sm shadow-sindoor flex items-center justify-center gap-1.5 flex-shrink-0 transition-transform active:scale-95"
              >
                <span>Call</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Helplines Strip */}
      <div className="bg-white border border-clay rounded-3xl p-5 shadow-plum-sm">
        <span className="text-xs font-bold text-plum uppercase tracking-wider block mb-3">
          Verified 24/7 Helplines
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {EMERGENCY_HELPLINES.map((hl) => (
            <a
              key={hl.number}
              href={`tel:${hl.number}`}
              className="p-3 rounded-2xl bg-cream-light hover:bg-blush border border-clay text-center transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-bold text-xs text-plum block">{hl.name}</span>
                <span className="text-[10px] text-ink-muted block mt-0.5">{hl.number}</span>
              </div>
              <span className="text-sindoor font-bold text-xs mt-2">Dial</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
