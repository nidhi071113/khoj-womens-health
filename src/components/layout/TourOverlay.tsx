import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, ArrowRight, ArrowLeft, Check, Compass } from 'lucide-react';

export const TourOverlay: React.FC = () => {
  const { t, isTourOpen, dismissTour } = useApp();
  const navigate = useNavigate();

  // Mode: 'prompt' (choice between quick tour vs explore on my own) or 'steps'
  const [tourMode, setTourMode] = useState<'prompt' | 'steps'>('prompt');
  const [stepIndex, setStepIndex] = useState<number>(0);

  if (!isTourOpen) return null;

  const tourSteps = [
    {
      title: t.tour.steps.step1Title,
      description: t.tour.steps.step1Desc,
      route: '/app'
    },
    {
      title: t.tour.steps.step2Title,
      description: t.tour.steps.step2Desc,
      route: '/app/threads'
    },
    {
      title: t.tour.steps.step3Title,
      description: t.tour.steps.step3Desc,
      route: '/app/cycle'
    },
    {
      title: t.tour.steps.step4Title,
      description: t.tour.steps.step4Desc,
      route: '/app/self-care'
    }
  ];

  const handleStartTour = () => {
    setTourMode('steps');
    setStepIndex(0);
    navigate(tourSteps[0].route);
  };

  const handleNextStep = () => {
    if (stepIndex < tourSteps.length - 1) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      navigate(tourSteps[nextIndex].route);
    } else {
      dismissTour();
    }
  };

  const handlePrevStep = () => {
    if (stepIndex > 0) {
      const prevIndex = stepIndex - 1;
      setStepIndex(prevIndex);
      navigate(tourSteps[prevIndex].route);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-white rounded-3xl p-5 border-2 border-[#C8553D]/40 shadow-xl space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xl bg-blush text-sindoor">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-plum uppercase tracking-wider">
              {tourMode === 'prompt' ? 'Guided Tour' : `Step ${stepIndex + 1} of 4`}
            </span>
          </div>

          <button
            onClick={dismissTour}
            className="text-ink-muted hover:text-ink p-1 rounded-lg hover:bg-clay-light transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {tourMode === 'prompt' ? (
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-plum">
              {t.tour.welcomeTitle}
            </h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t.tour.welcomeDesc}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleStartTour}
                className="flex-1 py-2.5 px-3 bg-[#C8553D] hover:bg-[#B3452E] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.tour.quickTourBtn}</span>
              </button>
              <button
                onClick={dismissTour}
                className="py-2.5 px-3 bg-white border border-clay text-ink-muted hover:bg-clay-light rounded-xl text-xs font-medium transition-all"
              >
                {t.tour.exploreOwnBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Step progress dots */}
            <div className="flex items-center gap-1.5">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === stepIndex ? 'w-6 bg-[#C8553D]' : 'w-2 bg-clay'
                  }`}
                />
              ))}
            </div>

            <h4 className="font-serif text-sm font-bold text-plum">
              {tourSteps[stepIndex].title}
            </h4>
            <p className="text-xs text-ink leading-relaxed">
              {tourSteps[stepIndex].description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={dismissTour}
                className="text-[11px] text-ink-muted hover:underline"
              >
                {t.tour.skip}
              </button>

              <div className="flex items-center gap-2">
                {stepIndex > 0 && (
                  <button
                    onClick={handlePrevStep}
                    className="p-2 border border-clay rounded-xl text-ink-muted hover:bg-clay-light"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="py-2 px-3.5 bg-[#C8553D] hover:bg-[#B3452E] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 transition-all"
                >
                  <span>{stepIndex === tourSteps.length - 1 ? t.tour.finish : t.tour.next}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
