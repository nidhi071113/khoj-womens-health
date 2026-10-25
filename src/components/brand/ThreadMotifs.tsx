import React from 'react';

interface ThreadProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ThreadProgress: React.FC<ThreadProgressProps> = ({
  currentStep,
  totalSteps,
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100));

  return (
    <div className={`w-full max-w-md mx-auto my-4 ${className}`} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <div className="relative h-6 flex items-center">
        {/* Background dotted stitch guide */}
        <div className="absolute inset-x-0 h-0.5 border-b-2 border-dashed border-clay-dark" />

        {/* Dynamic active terracotta thread line */}
        <div 
          className="absolute left-0 h-1 bg-gradient-to-r from-plum via-sindoor to-sindoor-light rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />

        {/* Step indicator knots */}
        <div className="relative w-full flex justify-between items-center z-10 px-0.5">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div 
                key={stepNum} 
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                  isCurrent 
                    ? 'w-6 h-6 bg-sindoor text-cream shadow-sindoor ring-4 ring-blush scale-110' 
                    : isCompleted
                    ? 'w-4 h-4 bg-plum text-cream'
                    : 'w-3.5 h-3.5 bg-clay border-2 border-cream'
                }`}
              >
                {isCurrent && (
                  <div className="w-2 h-2 rounded-full bg-cream animate-ping" />
                )}
                {isCompleted && (
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Small needle point symbol hovering right above current knot */}
        <div 
          className="absolute -top-3 transition-all duration-500 pointer-events-none transform -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${percentage}%` }}
        >
          <div className="w-1.5 h-3 bg-gradient-to-b from-plum to-sindoor rounded-full shadow-sm" />
          <div className="w-1 h-1 rounded-full bg-sindoor mt-0.5" />
        </div>
      </div>
    </div>
  );
};

export const ThreadDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden py-3 flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 600 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl h-5 text-sindoor opacity-85"
      >
        <path 
          d="M0 12 Q 75 2, 150 12 T 300 12 T 450 12 T 600 12" 
          stroke="currentColor" 
          strokeWidth="1.8" 
          strokeLinecap="round"
        />
        <path 
          d="M0 12 Q 75 22, 150 12 T 300 12 T 450 12 T 600 12" 
          stroke="#5B2A4E" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          strokeOpacity="0.5" 
        />
        {/* Decorative center knot */}
        <circle cx="300" cy="12" r="3.5" fill="#C8553D" />
        <circle cx="300" cy="12" r="1.5" fill="#FFF8F2" />
      </svg>
    </div>
  );
};

export const ThreadLoader: React.FC<{ label?: string }> = ({ 
  label = 'Weaving your health thread...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Animated rotating spool weave */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-plum/30 animate-spin" style={{ animationDuration: '6s' }} />
        <div className="w-12 h-12 rounded-2xl bg-blush border border-clay flex items-center justify-center shadow-plum-sm">
          <svg className="w-7 h-7 text-sindoor animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M2 12h20" strokeLinecap="round" />
            <circle cx="12" cy="12" r="7" stroke="#5B2A4E" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <p className="font-heading text-lg text-plum animate-pulse-subtle font-medium">{label}</p>
      <span className="text-xs text-ink-muted">Connecting your symptoms calmly and privately</span>
    </div>
  );
};
