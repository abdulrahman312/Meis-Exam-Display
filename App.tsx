import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Header from './components/Header';
import DuaBanner from './components/DuaBanner';
import Timer from './components/Timer';
import ClassTable from './components/ClassTable';
import Instructions from './components/Instructions';
import SettingsModal from './components/SettingsModal';
import { AppState } from './types';
import { DEFAULT_CLASSES } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    examTitle: 'First Semester Final Exam',
    classes: DEFAULT_CLASSES,
    timerDurationMinutes: 90,
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-exam-bg text-exam-text overflow-hidden relative selection:bg-exam-primary/20">
      
      {/* Top Section */}
      <Header examTitle={appState.examTitle} />
      
      {/* Dua Banner - Integrated below header */}
      <div className="w-full px-8 shrink-0 mb-4">
        <DuaBanner />
      </div>

      {/* Main Content: 2-Column Grid */}
      <main className="flex-1 w-full px-8 pb-8 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Column: Timer Card (5 cols) */}
        <section className="col-span-12 lg:col-span-5 h-full">
          <div className="h-full modern-card p-8 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-exam-surfaceAlt">
            <Timer durationMinutes={appState.timerDurationMinutes} />
          </div>
        </section>

        {/* Right Column: Info Stack (7 cols) */}
        <section className="col-span-12 lg:col-span-7 flex flex-col gap-6 h-full min-h-0">
          
          {/* Top: Class Table */}
          <div className="shrink-0">
            <ClassTable classes={appState.classes} />
          </div>

          {/* Bottom: Instructions (Fills remaining space) */}
          <div className="flex-1 min-h-0">
             <Instructions />
          </div>
        </section>
      </main>

      {/* Settings FAB */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white text-exam-textMuted hover:text-exam-primary rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-exam-border group"
        title="Settings"
      >
        <Settings size={24} className="group-hover:rotate-45 transition-transform duration-500" />
      </button>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentState={appState}
        onSave={setAppState}
      />
    </div>
  );
};

export default App;