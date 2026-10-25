import React from 'react';

interface BodyMapProps {
  onSelectArea: (area: 'head' | 'chest' | 'pelvis' | 'limbs') => void;
  selectedArea?: string;
}

export const BodyMap: React.FC<BodyMapProps> = ({ onSelectArea, selectedArea }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-cream-light border border-clay rounded-3xl">
      <span className="text-xs font-semibold text-plum uppercase tracking-wider mb-2">
        Tap on body map to select area
      </span>

      <svg 
        viewBox="0 0 200 320" 
        className="w-36 h-60 max-w-full drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DF9B7A" />
            <stop offset="100%" stopColor="#C88262" />
          </linearGradient>
        </defs>

        {/* Head Area */}
        <g 
          className="cursor-pointer group" 
          onClick={() => onSelectArea('head')}
        >
          <ellipse 
            cx="100" 
            cy="45" 
            rx="24" 
            ry="28" 
            className={`transition-all duration-200 ${
              selectedArea === 'head' 
                ? 'fill-sindoor stroke-white stroke-2' 
                : 'fill-[url(#bodyGrad)] hover:opacity-85 stroke-clay'
            }`} 
          />
          <text x="100" y="48" textAnchor="middle" fill="#FFF8F2" fontSize="10" fontWeight="bold">Head</text>
        </g>

        {/* Chest & Breast Area */}
        <g 
          className="cursor-pointer group" 
          onClick={() => onSelectArea('chest')}
        >
          <path 
            d="M 68 85 C 68 75, 132 75, 132 85 L 126 135 C 126 142, 74 142, 74 135 Z" 
            className={`transition-all duration-200 ${
              selectedArea === 'chest' 
                ? 'fill-sindoor stroke-white stroke-2' 
                : 'fill-[url(#bodyGrad)] hover:opacity-85 stroke-clay'
            }`} 
          />
          <text x="100" y="112" textAnchor="middle" fill="#FFF8F2" fontSize="9" fontWeight="bold">Chest</text>
        </g>

        {/* Pelvic & Abdominal Area */}
        <g 
          className="cursor-pointer group" 
          onClick={() => onSelectArea('pelvis')}
        >
          <path 
            d="M 74 140 C 74 138, 126 138, 126 140 L 134 185 C 134 195, 66 195, 66 185 Z" 
            className={`transition-all duration-200 ${
              selectedArea === 'pelvis' 
                ? 'fill-sindoor stroke-white stroke-2' 
                : 'fill-[url(#bodyGrad)] hover:opacity-85 stroke-clay'
            }`} 
          />
          <text x="100" y="168" textAnchor="middle" fill="#FFF8F2" fontSize="9" fontWeight="bold">Pelvis</text>
        </g>

        {/* Arms & Legs (Limbs) */}
        <g 
          className="cursor-pointer group" 
          onClick={() => onSelectArea('limbs')}
        >
          {/* Left & Right Legs */}
          <path 
            d="M 70 195 L 75 290 C 75 295, 90 295, 90 290 L 96 195 Z" 
            className={`transition-all duration-200 ${
              selectedArea === 'limbs' 
                ? 'fill-sindoor stroke-white stroke-2' 
                : 'fill-[url(#bodyGrad)] hover:opacity-85 stroke-clay'
            }`} 
          />
          <path 
            d="M 104 195 L 110 290 C 110 295, 125 295, 125 290 L 130 195 Z" 
            className={`transition-all duration-200 ${
              selectedArea === 'limbs' 
                ? 'fill-sindoor stroke-white stroke-2' 
                : 'fill-[url(#bodyGrad)] hover:opacity-85 stroke-clay'
            }`} 
          />
          <text x="100" y="245" textAnchor="middle" fill="#FFF8F2" fontSize="9" fontWeight="bold">Legs</text>
        </g>
      </svg>
      <span className="text-[11px] text-ink-muted mt-1">Tap Head, Chest, Pelvis, or Legs</span>
    </div>
  );
};
