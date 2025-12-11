import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  durationMinutes: number;
}

const Timer: React.FC<TimerProps> = ({ durationMinutes }) => {
  const totalSeconds = durationMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft(totalSeconds);
    setIsActive(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }, [durationMinutes, totalSeconds]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
  };

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress Ring Calculation
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalSeconds;
  const dashOffset = circumference - progress * circumference;

  // State checks for styling
  const isLowTime = timeLeft <= 300; // 5 minutes
  
  // Design system colors (Slate 200 for track, Indigo 600 or Rose 600 for progress)
  const trackColor = '#e2e8f0';
  const progressColor = isLowTime ? '#e11d48' : '#4f46e5';

  return (
    <div className="flex flex-col items-center justify-center h-full relative group w-full">
      {/* Background Decor */}
      <div className={`absolute w-full h-full bg-gradient-to-b ${isLowTime ? 'from-exam-danger/5' : 'from-exam-primary/5'} to-transparent rounded-full blur-3xl opacity-50 pointer-events-none`} />

      <div className="relative">
        {/* SVG Ring */}
        <svg width="340" height="340" className="transform -rotate-90 drop-shadow-xl">
          {/* Background Circle */}
          <circle
            cx="170"
            cy="170"
            r={radius}
            stroke={trackColor}
            strokeWidth="12"
            fill="white"
            className="opacity-50"
          />
          {/* Progress Circle */}
          <circle
            cx="170"
            cy="170"
            r={radius}
            stroke={progressColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isLowTime ? 'bg-exam-danger/10 text-exam-danger' : 'bg-exam-primary/10 text-exam-primary'}`}>
            <TimerIcon size={14} />
            <span>Time Remaining</span>
          </div>
          
          <span className={`text-7xl lg:text-8xl font-sans font-bold tracking-tighter tabular-nums transition-colors duration-300 ${isLowTime ? 'text-exam-danger' : 'text-exam-text'}`}>
            {formattedTime}
          </span>
          
          <div className="h-6 mt-2">
            <span className={`text-sm font-medium transition-opacity duration-300 ${isActive ? 'text-emerald-500 opacity-100' : 'text-exam-textMuted opacity-50'}`}>
              {isActive ? '● Session Active' : 'Session Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls Overlay (appears on hover) */}
      <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex gap-3">
        <button
          onClick={toggleTimer}
          className="p-4 rounded-2xl bg-white shadow-lg border border-exam-border text-exam-primary hover:bg-exam-primary hover:text-white transition-all hover:scale-105"
        >
          {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-4 rounded-2xl bg-white shadow-lg border border-exam-border text-exam-danger hover:bg-exam-danger hover:text-white transition-all hover:scale-105"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default Timer;