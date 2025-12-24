import React, { useState, lazy, Suspense } from 'react';

import Hero from './components/Hero';
import Layout from './components/Layout';
import OfflineIndicator from './components/OfflineIndicator';
import { usePageTracking } from './hooks/useAnalytics';
import { UserAnswers } from './types';

// Lazy load components for code splitting
const AssessmentWizard = lazy(() => import('./components/AssessmentWizard'));
const ResultsView = lazy(() => import('./components/ResultsView'));
const Philosophy = lazy(() => import('./components/Philosophy'));
const Essentials = lazy(() => import('./components/Essentials'));

export enum View {
  HERO = 'HERO',
  ASSESSMENT = 'ASSESSMENT',
  RESULTS = 'RESULTS',
  PHILOSOPHY = 'PHILOSOPHY',
  ESSENTIALS = 'ESSENTIALS',
}

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.HERO);
  const [answers, setAnswers] = useState<UserAnswers | null>(null);

  // Track page views
  usePageTracking(`/${view.toLowerCase()}`);

  const startAssessment = () => {
    setView(View.ASSESSMENT);
  };

  const handleAssessmentComplete = (userAnswers: UserAnswers) => {
    setAnswers(userAnswers);
    setView(View.RESULTS);
  };

  const handleAssessmentCancel = () => setView(View.HERO);

  return (
    <Layout currentView={view} onViewChange={setView}>
      <OfflineIndicator />
      {view === View.HERO && <Hero onStartText={startAssessment} />}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin border-t-2 border-[#C5A059] rounded-full w-16 h-16"></div>
          </div>
        }
      >
        {view === View.PHILOSOPHY && <Philosophy onStartAssessment={startAssessment} />}
        {view === View.ESSENTIALS && <Essentials onStartAssessment={startAssessment} />}
        {view === View.ASSESSMENT && (
          <AssessmentWizard
            onComplete={handleAssessmentComplete}
            onCancel={handleAssessmentCancel}
          />
        )}
        {view === View.RESULTS && answers && (
          <ResultsView answers={answers} onRestart={() => setView(View.ASSESSMENT)} />
        )}
      </Suspense>
    </Layout>
  );
};

export default App;
