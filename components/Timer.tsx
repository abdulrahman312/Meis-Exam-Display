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
  // Increased radius to fill space (was 130)
  const radius = 180;
  const strokeWidth = 16;
  // Calculate SVG dimensions based on radius and stroke
  const center = radius + strokeWidth;
  const size = center * 2;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalSeconds;
  const dashOffset = circumference - progress * circumference;

  // State checks for styling
  const isLowTime = timeLeft <= 300; // 5 minutes
  
  // Design system colors
  const trackColor = '#e2e8f0';
  const progressColor = isLowTime ? '#e11d48' : '#4f46e5';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      {/* Background Decor */}
      <div className={`absolute w-full h-full bg-gradient-to-b ${isLowTime ? 'from-exam-danger/5' : 'from-exam-primary/5'} to-transparent rounded-full blur-3xl opacity-50 pointer-events-none`} />

      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* SVG Ring - Responsive viewBox to scale within container */}
        <svg 
          viewBox={`0 0 ${size} ${size}`} 
          className="w-full h-full max-h-[70vh] transform -rotate-90 drop-shadow-xl"
        >
          {/* Background Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="white"
            className="opacity-50"
          />
          {/* Progress Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Inner Content - Centered absolutely */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className={`flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest ${isLowTime ? 'bg-exam-danger/10 text-exam-danger' : 'bg-exam-primary/10 text-exam-primary'}`}>
            <TimerIcon size={16} />
            <span>Time Remaining</span>
          </div>
          
          {/* Increased font size */}
          <span className={`text-8xl lg:text-9xl font-sans font-bold tracking-tighter tabular-nums transition-colors duration-300 ${isLowTime ? 'text-exam-danger' : 'text-exam-text'}`}>
            {formattedTime}
          </span>
          
          <div className="h-8 mt-4">
            <span className={`text-lg font-medium transition-opacity duration-300 ${isActive ? 'text-emerald-500 opacity-100' : 'text-exam-textMuted opacity-50'}`}>
              {isActive ? '● Session Active' : 'Session Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls Overlay - Permanently visible at bottom */}
      <div className="absolute bottom-6 flex gap-4 z-20">
        <button
          onClick={toggleTimer}
          className="p-5 rounded-2xl bg-white shadow-lg border border-exam-border text-exam-primary hover:bg-exam-primary hover:text-white transition-all hover:scale-105 active:scale-95"
        >
          {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-5 rounded-2xl bg-white shadow-lg border border-exam-border text-exam-danger hover:bg-exam-danger hover:text-white transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw size={28} />
        </button>
      </div>
    </div>
  );
};

export default Timer;