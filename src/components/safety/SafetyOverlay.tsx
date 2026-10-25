import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneCall, MapPin, ArrowLeft, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SafetyOverlay: React.FC = () => {
  const { safetyOverlay, t } = useApp();
  const { isOpen, result, close } = safetyOverlay;
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Trap focus
      overlayRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !result) return null;

  const isMentalHealth = result.matchedRuleId?.includes('SELF-HARM') || result.contactNumber === '14416';
  const targetNumber = result.contactNumber || '112';
  const serviceName = result.serviceName || (isMentalHealth ? 'Tele-MANAS' : 'Emergency Services');

  const handleShowHospitals = () => {
    close();
    navigate('/app/care');
  };

  return (
    <div 
      ref={overlayRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="safety-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-cream/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      <div className="w-full max-w-lg bg-white border-2 border-emergency/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-center">
        {/* Calm emergency alert badge */}
        <div className="w-16 h-16 rounded-full bg-emergency-light border border-emergency/40 flex items-center justify-center mx-auto mb-5 text-emergency">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 bg-emergency-light text-emergency font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
          {result.level === 'emergency' ? 'Immediate Support' : 'Urgent Clinical Review'}
        </span>

        <h2 
          id="safety-heading" 
          className="font-heading text-2xl sm:text-3xl text-ink font-semibold mb-3 leading-snug"
        >
          {t.safety.title}
        </h2>

        <p className="text-ink-muted text-base leading-relaxed mb-6">
          {result.message}
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary Call Button */}
          <a
            href={`tel:${targetNumber}`}
            className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emergency hover:bg-emergency-dark text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-98"
          >
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span>Call {serviceName} ({targetNumber})</span>
          </a>

          {/* Secondary Hospital Action */}
          <button
            onClick={handleShowHospitals}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-cream border border-clay hover:bg-clay-light text-plum font-medium text-base transition-all"
          >
            <MapPin className="w-4 h-4 text-sindoor" />
            <span>{t.safety.hospitalBtn}</span>
          </button>

          {/* Calm Deliberate Return Button */}
          <button
            onClick={close}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-sm text-ink-muted hover:text-ink transition-colors mt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.safety.imOkayBtn}</span>
          </button>
        </div>

        {/* Rule version and reassurance notice */}
        <div className="mt-6 pt-4 border-t border-clay/60 text-[11px] text-ink-muted flex flex-col items-center gap-1">
          <span>{result.serviceName} • {result.suggestedAction}</span>
          <span className="opacity-80">Rule Version {result.ruleVersion} • Demo prototype rules</span>
        </div>
      </div>
    </div>
  );
};
