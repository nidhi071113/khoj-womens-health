import React from 'react';

// 1. Hero Illustration: Indian woman smiling looking at phone inside cycle arcs
export const HeroWomanIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[400px] mx-auto ${className}`}>
      {/* Multi-toned cycle arcs around the portrait */}
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        <circle cx="200" cy="200" r="175" stroke="#EADCCB" strokeWidth="2.5" fill="none" strokeDasharray="6 6" />
        {/* Plum arc */}
        <path d="M 70 275 A 175 175 0 0 1 120 70" stroke="#5B2A4E" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Sindoor arc */}
        <path d="M 140 55 A 175 175 0 0 1 330 120" stroke="#C8553D" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Sage arc */}
        <path d="M 345 150 A 175 175 0 0 1 330 280" stroke="#7A9E7E" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Small phase markers */}
        <circle cx="200" cy="25" r="5" fill="#C8553D" />
        <circle cx="375" cy="200" r="5" fill="#7A9E7E" />
        <circle cx="200" cy="375" r="5" fill="#5B2A4E" />
      </svg>

      {/* Portrait of Indian woman looking at phone from user image */}
      <div className="absolute inset-5 sm:inset-6 rounded-full overflow-hidden bg-gradient-to-b from-[#FDE8DF] via-[#FFF3EC] to-[#FBE6DE] border-4 border-white shadow-plum-md flex items-end justify-center">
        <img 
          src="/illustrations/hero_woman.png" 
          alt="Woman checking symptoms on Khoj"
          className="w-[94%] h-[94%] object-contain object-bottom transform translate-y-1 transition-transform hover:scale-105 duration-300"
        />
      </div>

      {/* Floating Insight Card from image - responsive on mobile */}
      <div className="absolute -bottom-3 left-2 right-2 sm:left-auto sm:-right-4 bg-white/95 backdrop-blur-md border border-clay p-3 sm:p-4 rounded-2xl shadow-plum-md sm:max-w-[240px] text-left z-20 animate-fade-in">
        <div className="flex items-center gap-1.5 text-xs text-sindoor font-bold tracking-tight mb-1">
          <span className="w-2 h-2 rounded-full bg-sindoor inline-block animate-ping" />
          Pattern worth discussing.
        </div>
        <p className="text-xs text-ink-muted font-normal leading-relaxed">
          Heavy periods and tiredness often show up together.
        </p>
      </div>
    </div>
  );
};

// 2. Portrait 1 for "Say it your way"
export const WomanPortraitOne: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-clay shadow-sm bg-blush flex items-end justify-center flex-shrink-0 ${className}`}>
      <img 
        src="/illustrations/peaceful_relief.png" 
        alt="Say it your way" 
        className="w-[95%] h-[95%] object-contain object-bottom"
      />
    </div>
  );
};

// 3. Portrait 2 for "See your thread" (with glasses)
export const WomanPortraitTwo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-clay shadow-sm bg-cream-dark flex items-end justify-center flex-shrink-0 ${className}`}>
      <img 
        src="/illustrations/guidance_glasses.png" 
        alt="See your thread" 
        className="w-[95%] h-[95%] object-contain object-bottom"
      />
    </div>
  );
};

// 4. Portrait 3 for "Know your next step"
export const WomanPortraitThree: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-clay shadow-sm bg-sage-light/50 flex items-end justify-center flex-shrink-0 ${className}`}>
      <img 
        src="/illustrations/guidance_hoops.png" 
        alt="Know your next step" 
        className="w-[95%] h-[95%] object-contain object-bottom"
      />
    </div>
  );
};

// 5. Doctor Consultation Illustration ("Walk in prepared. Be heard.")
export const DoctorConsultIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Speech bubbles matching the image */}
      <div className="w-full flex flex-col gap-2 mb-3">
        <div className="self-start bg-white border border-clay p-2.5 rounded-2xl rounded-bl-sm text-xs text-ink max-w-[85%] shadow-xs">
          "I've felt tired for months, here is my summary."
        </div>
        <div className="self-end bg-blush-soft border border-clay p-2.5 rounded-2xl rounded-br-sm text-xs text-ink max-w-[85%] shadow-xs">
          "Thank you, this really helps."
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-cream to-blush/40 rounded-3xl p-3 sm:p-4 border border-clay flex justify-center items-center overflow-hidden">
        <img 
          src="/illustrations/doctor_consultation.png" 
          alt="Walk in prepared. Be heard." 
          className="max-h-52 sm:max-h-60 w-auto object-contain drop-shadow-sm transition-transform hover:scale-102 duration-300"
        />
      </div>
    </div>
  );
};

// 6. Mother and Daughter illustration ("Your language. Your pace. Your privacy.")
export const FamilyIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* "Explain to my family" callout card */}
      <div className="w-full bg-white border border-clay p-3 rounded-2xl text-xs text-ink-muted shadow-xs mb-3 text-left">
        <span className="text-plum font-bold block mb-0.5">Explain to my family</span>
        A short, simple message in your language.
      </div>

      <div className="w-full bg-gradient-to-br from-cream to-blush/40 rounded-3xl p-3 sm:p-4 border border-clay flex justify-center items-center overflow-hidden">
        <img 
          src="/illustrations/family_communication.png" 
          alt="Your language. Your pace. Your privacy." 
          className="max-h-52 sm:max-h-60 w-auto object-contain drop-shadow-sm transition-transform hover:scale-102 duration-300"
        />
      </div>
    </div>
  );
};
