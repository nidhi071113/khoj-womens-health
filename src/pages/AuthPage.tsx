import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/brand/Logo';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Play, 
  ArrowRight, 
  Mic, 
  Activity, 
  Compass, 
  Users, 
  ShieldCheck, 
  AlertCircle,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../lib/types';

export const AuthPage: React.FC = () => {
  const { language, setLanguage, t, login, register, loginDemo } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (activeTab === 'signup' && !name.trim()) {
      newErrors.name = t.auth.errors.nameRequired;
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = t.auth.errors.emailInvalid;
    }

    if (!password || password.length < 8) {
      newErrors.password = t.auth.errors.passwordMin;
    }

    if (activeTab === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = t.auth.errors.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await login(email, password);
      // Navigate to the 4-step onboarding flow before reaching main app
      navigate('/onboarding');
    } catch (err) {
      setErrors({ form: 'Unable to sign in. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      // New user goes through the 4 onboarding steps
      navigate('/onboarding');
    } catch (err) {
      setErrors({ form: 'Unable to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoClick = async () => {
    setIsSubmitting(true);
    try {
      await loginDemo();
      // Demo loads Priya dataset and navigates directly to Home
      navigate('/app');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setInfoMessage('In this demo mode, accounts are stored safely on your device. You can sign in directly or explore via the Priya Demo.');
    setTimeout(() => setInfoMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex flex-col justify-between text-ink">
      {/* Top Bar with Logo & Language Toggle */}
      <header className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <Logo size="md" showTagline={true} />
        </div>

        {/* Trilingual Toggle */}
        <div className="flex bg-white rounded-full p-1 border border-clay shadow-xs">
          {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                language === lang
                  ? 'bg-plum text-cream shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Dual-Column Content */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Brand Story & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/15 text-sage-dark rounded-full text-xs font-bold uppercase tracking-wider w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            {t.auth.eyebrow}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-plum leading-tight">
            {t.auth.heroTitle}
          </h1>

          <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-xl">
            {t.auth.heroSub}
          </p>

          {/* Peaceful woman artwork */}
          <div className="relative flex items-center justify-center py-2 max-w-md">
            <img 
              src="/illustrations/peaceful_relief.png" 
              alt="Woman in calm reflection" 
              className="h-44 sm:h-52 w-auto object-contain filter drop-shadow-sm"
              onError={(e) => {
                // fallback to hero woman if needed
                (e.currentTarget as HTMLImageElement).src = '/illustrations/hero_woman.png';
              }}
            />
          </div>

          {/* 4 Feature Badges (SUNO, JODO, RAAH, SAATH) */}
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-2xl border border-clay/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                <Mic className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-plum">{t.auth.sunoBadge}</p>
                <p className="text-[11px] text-ink-muted">{t.auth.sunoDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-2xl border border-clay/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-plum">{t.auth.jodoBadge}</p>
                <p className="text-[11px] text-ink-muted">{t.auth.jodoDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-2xl border border-clay/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-plum">{t.auth.raahBadge}</p>
                <p className="text-[11px] text-ink-muted">{t.auth.raahDesc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-2xl border border-clay/60 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blush flex items-center justify-center text-sindoor flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-plum">{t.auth.saathBadge}</p>
                <p className="text-[11px] text-ink-muted">{t.auth.saathDesc}</p>
              </div>
            </div>
          </div>

          {/* Three Indian Women illustration & Quote card */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 max-w-lg">
            <img 
              src="/illustrations/auth_three_women.png" 
              alt="Diverse Indian women" 
              className="h-28 sm:h-32 w-auto object-contain"
            />
            <div className="p-4 bg-plum text-cream rounded-2xl shadow-plum-sm flex-1">
              <p className="font-serif italic text-sm text-cream/95 leading-relaxed">
                {t.auth.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card matching Panel 1 */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-clay shadow-md relative overflow-hidden">
            {/* Top Tabs */}
            <div className="flex bg-[#FBE6DE]/40 p-1 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setErrors({}); }}
                className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-xl transition-all ${
                  activeTab === 'signin'
                    ? 'bg-white text-plum shadow-xs font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t.auth.signInTab}
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setErrors({}); }}
                className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-xl transition-all ${
                  activeTab === 'signup'
                    ? 'bg-white text-plum shadow-xs font-bold'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t.auth.createAccountTab}
              </button>
            </div>

            {/* Header Titles */}
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-plum">
                {activeTab === 'signin' ? t.auth.welcomeBack : t.auth.createAccountTab}
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                {activeTab === 'signin' ? t.auth.continueJourney : t.auth.startJourney}
              </p>
            </div>

            {/* Info Message Banner if active */}
            {infoMessage && (
              <div className="mb-4 p-3 bg-blush-soft border border-sindoor/30 rounded-xl text-xs text-sindoor flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{infoMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={activeTab === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1">
                    {t.auth.fullName}
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.auth.namePlaceholder}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.name ? 'border-red-400 bg-red-50/50' : 'border-clay focus:border-plum'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1">
                  {t.auth.email}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.auth.emailPlaceholder}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                      errors.email ? 'border-red-400 bg-red-50/50' : 'border-clay focus:border-plum'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-ink-muted">
                    {t.auth.password}
                  </label>
                  {activeTab === 'signin' && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[11px] text-sindoor hover:underline"
                    >
                      {t.auth.forgotPassword}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.auth.passwordPlaceholder}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                      errors.password ? 'border-red-400 bg-red-50/50' : 'border-clay focus:border-plum'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password (Sign up only) */}
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1">
                    {t.auth.confirmPassword}
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t.auth.confirmPassword}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.confirmPassword ? 'border-red-400 bg-red-50/50' : 'border-clay focus:border-plum'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-[11px] text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 bg-[#C8553D] hover:bg-[#B3452E] text-cream rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <span>{activeTab === 'signin' ? t.auth.signInBtn : t.auth.createAccountBtn}</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-clay/80" />
              </div>
              <span className="relative bg-white px-3 text-xs text-ink-muted uppercase">
                {t.auth.or}
              </span>
            </div>

            {/* Try Demo Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleDemoClick}
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#FBE6DE] hover:bg-[#FBE6DE]/80 text-plum rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all border border-plum/10"
              >
                <Play className="w-3.5 h-3.5 fill-plum" />
                <span>{t.auth.tryDemoBtn}</span>
              </button>
              <p className="text-[11px] text-ink-muted mt-2">
                {t.auth.demoSubtext}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Notes */}
      <footer className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 border-t border-clay/60 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sage" />
          <span>{t.auth.privateNote}</span>
        </div>
        <div className="flex items-center gap-1.5 text-right">
          <AlertCircle className="w-4 h-4 text-sindoor" />
          <span>{t.auth.prototypeNote}</span>
        </div>
      </footer>
    </div>
  );
};
