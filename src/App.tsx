import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { SafetyOverlay } from './components/safety/SafetyOverlay';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { CheckinPage } from './pages/CheckinPage';
import { ThreadsPage } from './pages/ThreadsPage';
import { CarePage } from './pages/CarePage';
import { PassportPage } from './pages/PassportPage';
import { SettingsPage } from './pages/SettingsPage';
import { CyclePage } from './pages/CyclePage';
import { SelfCarePage } from './pages/SelfCarePage';
import { DemoScriptPage } from './pages/DemoScriptPage';

// Seamless route loader: if no profile exists, automatically seed demo data so the app opens instantly with zero blocking!
const SeamlessAppRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, loadDemo, isLoading } = useApp();

  useEffect(() => {
    if (!profile && !localStorage.getItem('khoj_profile')) {
      loadDemo();
    }
  }, [profile, loadDemo]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-sindoor border-t-transparent animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        {/* Global Safety Overlay (never auto-dismisses, renders over any route) */}
        <SafetyOverlay />

        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<LandingPage />} />

          {/* Authentication Page (Sign In / Create Account / Try Demo) */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Onboarding Flow (4 Steps) */}
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* App Core Layout */}
          <Route
            path="/app"
            element={
              <SeamlessAppRoute>
                <AppShell />
              </SeamlessAppRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="check-in" element={<CheckinPage />} />
            <Route path="threads" element={<ThreadsPage />} />
            <Route path="care" element={<CarePage />} />
            <Route path="passport" element={<PassportPage />} />
            <Route path="cycle" element={<CyclePage />} />
            <Route path="self-care" element={<SelfCarePage />} />
            <Route path="self-care/diary" element={<SelfCarePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Judge Demo Script Helper */}
          <Route path="/demo-script" element={<DemoScriptPage />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
