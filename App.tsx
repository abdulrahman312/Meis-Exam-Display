import React, { useState, useEffect } from 'react';
import { Settings, Maximize2, Minimize2 } from 'lucide-react';
import Header from './components/Header';
import DuaBanner from './components/DuaBanner';
import Timer from './components/Timer';
import ClassTable from './components/ClassTable';
import Instructions from './components/Instructions';
import SettingsModal from './components/SettingsModal';
import { AppState } from './types';
import { DEFAULT_CLASSES, THEMES } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    examTitle: 'First Semester Final Exam',
    classes: DEFAULT_CLASSES,
    timerDurationMinutes: 120,
    theme: 'ocean',
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Apply Theme Colors
  useEffect(() => {
    const selectedTheme = THEMES.find(t => t.id === appState.theme) || THEMES[0];
    const root = document.documentElement;
    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [appState.theme]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Error toggling fullscreen:", err);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-exam-bg text-exam-text overflow-hidden relative selection:bg-exam-primary/20">
      <style>{`
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-border 12s linear infinite;
        }
      `}</style>
      
      {/* Top Section */}
      <Header examTitle={appState.examTitle} />
      
      {/* Dua Banner - Integrated below header */}
      <div className="w-full px-8 shrink-0 mb-4">
        <DuaBanner />
      </div>

      {/* Main Content: 2-Column Grid */}
      <main className="flex-1 w-full px-8 min-h-0 grid grid-cols-12 gap-6 mb-6">
        
        {/* Left Column: Timer Card (5 cols) */}
        <section className="col-span-12 lg:col-span-5 h-full">
          <div className="h-full modern-card p-6 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-exam-surface to-exam-surfaceAlt">
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

      {/* Action Buttons Container - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
        
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="relative group w-14 h-14 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {/* Animated Gradient Background */}
          <div 
            className="absolute inset-[-50%] animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity" 
            style={{
              background: `conic-gradient(from 0deg, rgb(var(--color-danger)), rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-danger)))`
            }}
          />
          
          {/* Inner Box */}
          <div className="absolute inset-[3px] bg-exam-surface rounded-xl flex items-center justify-center z-10">
            {isFullscreen ? (
               <Minimize2 className="text-exam-text group-hover:text-exam-primary transition-colors" size={24} />
            ) : (
               <Maximize2 className="text-exam-text group-hover:text-exam-primary transition-colors" size={24} />
            )}
          </div>
        </button>

        {/* Settings Button */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="relative group w-14 h-14 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          title="Settings"
        >
          {/* Animated Gradient Background */}
          <div 
            className="absolute inset-[-50%] animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity" 
            style={{
              background: `conic-gradient(from 0deg, rgb(var(--color-danger)), rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-danger)))`
            }}
          />
          
          {/* Inner Box */}
          <div className="absolute inset-[3px] bg-exam-surface rounded-xl flex items-center justify-center z-10">
            <Settings size={24} className="text-exam-text group-hover:text-exam-primary transition-colors duration-500 group-hover:rotate-45" />
          </div>
        </button>
      </div>

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