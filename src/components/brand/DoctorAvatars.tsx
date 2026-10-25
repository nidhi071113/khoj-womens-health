import React from 'react';

export const DoctorAvatar1: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-clay shadow-xs bg-blush flex items-center justify-center flex-shrink-0 ${className}`}>
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <circle cx="40" cy="40" r="38" fill="#FDF0EB" />
      <path d="M 18 36 C 15 16, 65 16, 62 36 C 68 60, 60 76, 60 80 L 20 80 C 20 76, 12 60, 18 36 Z" fill="#241B26" />
      <rect x="34" y="48" width="12" height="18" rx="3" fill="#E2A280" />
      {/* White Doctor Coat */}
      <path d="M 16 80 C 16 62, 30 58, 40 58 C 50 58, 64 62, 64 80 Z" fill="#FFFFFF" stroke="#EADCCB" strokeWidth="1.5" />
      {/* Stethoscope */}
      <path d="M 33 58 C 36 68, 44 68, 47 58" stroke="#5B2A4E" strokeWidth="1.5" fill="none" />
      <ellipse cx="40" cy="38" rx="16" ry="19" fill="#E2A280" />
      <path d="M 24 32 C 28 20, 52 20, 56 32 Z" fill="#241B26" />
      <path d="M 31 37 Q 35 34, 38 37" stroke="#241B26" strokeWidth="1.5" fill="none" />
      <path d="M 42 37 Q 45 34, 49 37" stroke="#241B26" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="30" r="1.2" fill="#C8553D" />
      <path d="M 35 46 Q 40 50, 45 46" stroke="#8C2D1E" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

export const DoctorAvatar2: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-clay shadow-xs bg-cream-dark flex items-center justify-center flex-shrink-0 ${className}`}>
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <circle cx="40" cy="40" r="38" fill="#FDF3EC" />
      <circle cx="40" cy="18" r="10" fill="#241B26" />
      <path d="M 20 38 C 16 20, 64 20, 60 38 C 64 60, 56 76, 56 80 L 24 80 C 24 76, 16 60, 20 38 Z" fill="#241B26" />
      <rect x="34" y="48" width="12" height="18" rx="3" fill="#D38C69" />
      <path d="M 16 80 C 16 62, 30 58, 40 58 C 50 58, 64 62, 64 80 Z" fill="#FFFFFF" stroke="#EADCCB" strokeWidth="1.5" />
      <path d="M 33 58 C 36 68, 44 68, 47 58" stroke="#5B2A4E" strokeWidth="1.5" fill="none" />
      <ellipse cx="40" cy="38" rx="15" ry="18" fill="#D38C69" />
      <rect x="29" y="34" width="9" height="6" rx="2" stroke="#241B26" strokeWidth="1.2" fill="none" />
      <rect x="42" y="34" width="9" height="6" rx="2" stroke="#241B26" strokeWidth="1.2" fill="none" />
      <line x1="38" y1="37" x2="42" y2="37" stroke="#241B26" strokeWidth="1.2" />
      <path d="M 35 46 Q 40 50, 45 46" stroke="#8C2D1E" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

export const DoctorAvatar3: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 border-clay shadow-xs bg-sage-light/50 flex items-center justify-center flex-shrink-0 ${className}`}>
    <svg viewBox="0 0 80 80" className="w-full h-full">
      <circle cx="40" cy="40" r="38" fill="#EEF4EF" />
      <path d="M 16 38 C 12 16, 68 16, 64 38 C 70 60, 58 76, 58 80 L 22 80 C 22 76, 10 60, 16 38 Z" fill="#241B26" />
      <rect x="34" y="48" width="12" height="18" rx="3" fill="#DF9B7A" />
      <path d="M 16 80 C 16 62, 30 58, 40 58 C 50 58, 64 62, 64 80 Z" fill="#FFFFFF" stroke="#EADCCB" strokeWidth="1.5" />
      <path d="M 33 58 C 36 68, 44 68, 47 58" stroke="#5B2A4E" strokeWidth="1.5" fill="none" />
      <ellipse cx="40" cy="38" rx="16" ry="19" fill="#DF9B7A" />
      <path d="M 22 32 C 24 20, 56 20, 58 32 C 50 24, 30 24, 22 32 Z" fill="#241B26" />
      <path d="M 31 37 Q 35 34, 38 37" stroke="#241B26" strokeWidth="1.5" fill="none" />
      <path d="M 42 37 Q 45 34, 49 37" stroke="#241B26" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="30" r="1.2" fill="#C8553D" />
      <path d="M 35 46 Q 40 50, 45 46" stroke="#8C2D1E" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);
