import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/Logo';
import { 
  Home, 
  PlusCircle, 
  Activity, 
  Compass, 
  FileText, 
  Settings, 
  EyeOff, 
  Eye, 
  Sparkles,
  Calendar,
  Heart,
  MoreHorizontal,
  X,
  LogOut,
  Bell
} from 'lucide-react';
import { TourOverlay } from './TourOverlay';

export const AppShell: React.FC = () => {
  const { language, setLanguage, consents, updateConsents, t, profile, session, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  const toggleDiscreet = () => {
    updateConsents({ discreetMode: !consents.discreetMode });
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/auth');
  };

  // 5 Primary Navigation Items (Must be preserved in mobile bottom bar!)
  const primaryNavItems = [
    { 
      to: '/app', 
      label: t.nav.home, 
      icon: Home, 
      stage: 'HOME',
      exact: true 
    },
    { 
      to: '/app/check-in', 
      label: t.nav.checkin, 
      icon: PlusCircle, 
      stage: 'SUNO सुनो' 
    },
    { 
      to: '/app/threads', 
      label: t.nav.threads, 
      icon: Activity, 
      stage: 'JODO जोड़ो' 
    },
    { 
      to: '/app/care', 
      label: t.nav.care, 
      icon: Compass, 
      stage: 'RAAH राह' 
    },
    { 
      to: '/app/passport', 
      label: t.nav.passport, 
      icon: FileText, 
      stage: 'SAATH साथ' 
    },
  ];

  // Secondary More Group (Cycle and Self-care)
  const secondaryNavItems = [
    {
      to: '/app/cycle',
      label: t.nav.cycle,
      icon: Calendar,
      stage: 'CYCLE'
    },
    {
      to: '/app/self-care',
      label: t.nav.selfCare,
      icon: Heart,
      stage: 'CARE'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex flex-col md:flex-row text-ink">
      {/* Guided Demo Tour Overlay */}
      <TourOverlay />

      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-cream-light border-r border-clay flex-shrink-0 sticky top-0 h-screen p-6 justify-between z-30 overflow-y-auto">
        <div>
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => navigate('/app')}>
            <Logo size="md" showTagline={!consents.discreetMode} />
          </div>

          {/* Discreet mode indicator banner */}
          {consents.discreetMode && (
            <div className="mt-4 px-3 py-1.5 bg-clay-light border border-clay rounded-xl text-xs text-ink-muted flex items-center gap-2">
              <EyeOff className="w-3.5 h-3.5 text-plum" />
              <span>Discreet Mode Active</span>
            </div>
          )}

          {/* Primary Navigation Links */}
          <nav className="mt-8 space-y-1.5" aria-label="Main Navigation">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.to 
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-2xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-plum text-cream shadow-plum-sm font-semibold'
                      : 'text-ink-muted hover:text-plum hover:bg-blush/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cream' : 'text-sindoor'}`} />
                    <span>{item.label}</span>
                  </div>
                  {!consents.discreetMode && (
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-cream/20 text-cream' : 'bg-clay/50 text-ink-muted'
                    }`}>
                      {item.stage}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* More Group (Cycle and Self-care) */}
          <div className="mt-6 pt-5 border-t border-clay/60">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-2">
              {t.nav.more}
            </p>
            <nav className="space-y-1.5" aria-label="More Navigation">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.to);

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FBE6DE] text-plum font-bold shadow-xs border border-plum/10'
                        : 'text-ink-muted hover:text-plum hover:bg-blush/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-sindoor' : 'text-sindoor/70'}`} />
                      <span>{item.label}</span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Sidebar info & Settings */}
        <div className="pt-4 border-t border-clay space-y-3">
          {/* Demo Mode badge */}
          {session.isDemo && (
            <div className="px-3 py-2 bg-blush-soft border border-sindoor/20 rounded-xl text-xs text-sindoor flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="leading-tight text-[11px] font-semibold">Demo · Priya</span>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="text-[10px] font-bold text-sindoor hover:underline"
              >
                Exit
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/app/settings')}
              className={`flex-1 flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-medium transition-colors ${
                location.pathname === '/app/settings' 
                  ? 'bg-plum text-cream shadow-xs font-semibold' 
                  : 'text-ink-muted hover:text-plum hover:bg-clay-light'
              }`}
            >
              <Settings className="w-4 h-4 text-sindoor" />
              <span>{t.nav.settings}</span>
            </button>

            <button
              onClick={handleSignOut}
              title="Sign Out"
              className="p-2 rounded-2xl text-ink-muted hover:text-red-600 hover:bg-clay-light transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header Bar matching Panel 2, Panel 3 */}
        <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-clay/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:hidden">
            <div className="cursor-pointer" onClick={() => navigate('/app')}>
              <Logo size="sm" showTagline={false} />
            </div>
          </div>

          {/* Search bar simulation / User welcome */}
          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search symptoms, articles, or doctors..."
                disabled
                className="w-full pl-9 pr-4 py-1.5 rounded-full bg-white border border-clay text-xs text-ink-muted cursor-default placeholder:text-ink-muted/70"
              />
              <Compass className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile More Button (Opens accessible bottom sheet) */}
            <button
              onClick={() => setIsMobileMoreOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white border border-clay text-plum hover:bg-blush transition-colors flex items-center gap-1 text-xs font-semibold"
              title="More options"
            >
              <MoreHorizontal className="w-4 h-4 text-sindoor" />
              <span className="text-[11px]">{t.nav.more}</span>
            </button>

            {/* Discreet Mode Toggle */}
            <button
              onClick={toggleDiscreet}
              title={consents.discreetMode ? 'Discreet Mode On' : 'Toggle Discreet Mode'}
              className={`p-1.5 sm:p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                consents.discreetMode 
                  ? 'bg-plum text-cream border-plum' 
                  : 'bg-white border-clay text-ink-muted hover:text-plum'
              }`}
            >
              {consents.discreetMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline font-medium">
                {consents.discreetMode ? 'Discreet' : 'Discreet'}
              </span>
            </button>

            {/* Language Toggle in Top Bar */}
            <div className="flex bg-white rounded-xl p-0.5 border border-clay text-xs font-semibold shadow-xs">
              {(['en', 'hi', 'mr'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 rounded-lg transition-all text-[11px] sm:text-xs ${
                    language === lang 
                      ? 'bg-[#C8553D] text-cream shadow-xs font-bold' 
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                </button>
              ))}
            </div>

            {/* User Profile Avatar Pill matching reference */}
            <div 
              onClick={() => navigate('/app/settings')}
              className="cursor-pointer flex items-center gap-2 pl-2 pr-3 py-1 bg-white border border-clay rounded-full shadow-2xs hover:border-plum transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-blush flex items-center justify-center text-plum font-serif font-bold text-xs">
                {profile?.name ? profile.name.charAt(0) : 'P'}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <p className="text-xs font-bold text-plum">{profile?.name || 'Priya'}</p>
                <p className="text-[10px] text-ink-muted">{session.isDemo ? 'Demo account' : 'Personal'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 pb-24 md:pb-12 max-w-5xl w-full mx-auto p-3.5 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>

        {/* Mobile Bottom Tab Bar (Strictly 5 items preserved!) */}
        <nav 
          className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-clay z-30 px-2 py-1.5 pb-safe flex items-center justify-around shadow-lg"
          aria-label="Mobile Navigation"
        >
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.to 
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1 rounded-xl transition-all ${
                  isActive 
                    ? 'text-sindoor font-bold' 
                    : 'text-ink-muted hover:text-plum'
                }`}
              >
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-blush text-sindoor' : ''
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] tracking-tight mt-0.5 leading-none">
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Mobile More Bottom Sheet (Contains Cycle, Self-care & Settings) */}
      {isMobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs flex items-end justify-center">
          <div className="bg-white rounded-t-3xl max-w-md w-full p-6 shadow-2xl border-t border-clay space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-clay/60 pb-3">
              <h3 className="font-serif text-lg font-bold text-plum">
                {t.nav.more} Options
              </h3>
              <button 
                onClick={() => setIsMobileMoreOpen(false)}
                className="p-1 rounded-full text-ink-muted hover:text-ink hover:bg-clay-light"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => { setIsMobileMoreOpen(false); navigate('/app/cycle'); }}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8F2] border border-clay text-left hover:bg-blush/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blush flex items-center justify-center text-sindoor">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-plum">{t.nav.cycle}</p>
                  <p className="text-xs text-ink-muted">Menstrual calendar & estimates</p>
                </div>
              </button>

              <button
                onClick={() => { setIsMobileMoreOpen(false); navigate('/app/self-care'); }}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF8F2] border border-clay text-left hover:bg-blush/50 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blush flex items-center justify-center text-sindoor">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-plum">{t.nav.selfCare}</p>
                  <p className="text-xs text-ink-muted">Indian nourishment, comfort & private diary</p>
                </div>
              </button>

              <button
                onClick={() => { setIsMobileMoreOpen(false); navigate('/app/settings'); }}
                className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-clay text-left hover:bg-clay-light transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-clay-light flex items-center justify-center text-ink-muted">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-plum">{t.nav.settings}</p>
                  <p className="text-xs text-ink-muted">Consent, export data & preferences</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
