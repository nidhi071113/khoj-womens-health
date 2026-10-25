import React from 'react';
import { useApp } from '../../context/AppContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showTagline = true, 
  className = '' 
}) => {
  const { consents } = useApp();

  // Discreet mode active: render neutral "Notes"
  if (consents.discreetMode) {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <div className="w-8 h-8 rounded-xl bg-clay-light border border-clay flex items-center justify-center text-ink-muted">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <span className="font-heading font-medium text-ink text-lg tracking-tight">Notes</span>
      </div>
    );
  }

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand Icon: Wooden Spool of Thread with flowing terracotta weave */}
      <div className={`${iconSizes[size]} relative flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cream to-blush border border-clay shadow-plum-sm p-1`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Spool top rim */}
          <ellipse cx="24" cy="10" rx="14" ry="4" fill="#5B2A4E" />
          <ellipse cx="24" cy="10" rx="10" ry="2.5" fill="#7A9E7E" opacity="0.4" />
          {/* Spool wooden core cylinder */}
          <path d="M13 10V38C13 40.5 18 42 24 42C30 42 35 40.5 35 38V10" fill="#EADCCB" stroke="#5B2A4E" strokeWidth="1.5" />
          {/* Terracotta/sindoor thread wraps */}
          <rect x="15" y="14" width="18" height="20" rx="3" fill="#C8553D" />
          <line x1="15" y1="18" x2="33" y2="18" stroke="#FBE6DE" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="15" y1="22" x2="33" y2="22" stroke="#FFF8F2" strokeWidth="1.2" />
          <line x1="15" y1="26" x2="33" y2="26" stroke="#FBE6DE" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="15" y1="30" x2="33" y2="30" stroke="#FFF8F2" strokeWidth="1.2" />
          {/* Spool bottom base */}
          <ellipse cx="24" cy="38" rx="14" ry="4" fill="#5B2A4E" />
          {/* Loose flowing thread looping out */}
          <path d="M33 26C39 26 43 32 40 37C37 42 28 44 24 46" stroke="#C8553D" strokeWidth="2" strokeLinecap="round" />
          {/* Needle tip dot */}
          <circle cx="24" cy="46" r="1.5" fill="#5B2A4E" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-heading font-bold text-plum tracking-tight ${titleSizes[size]}`}>
            KHOJ
          </span>
          <span className="text-sindoor font-devanagari font-semibold text-sm">
            · खोज
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-wider text-ink-muted font-medium mt-0.5">
            FIND WHAT YOUR BODY TELLS YOU
          </span>
        )}
      </div>
    </div>
  );
};
