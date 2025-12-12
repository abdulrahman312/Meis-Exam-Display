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
  const radius = 145;
  const strokeWidth = 12; 
  const center = radius + strokeWidth; // 145 + 12 = 157
  const size = center * 2; // 314
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalSeconds;
  const dashOffset = circumference - progress * circumference;

  // State checks for styling
  const isLowTime = timeLeft <= 300; // 5 minutes
  
  // Track color
  const trackColor = 'rgb(var(--color-border))';

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative">
      
      {/* Controls - Moved to Top */}
      <div className="flex gap-4 mb-6 z-20 shrink-0">
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-exam-surface shadow-md border border-exam-border text-exam-primary hover:bg-exam-primary hover:text-white transition-all hover:scale-105 active:scale-95 font-semibold"
        >
          {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="p-2.5 rounded-xl bg-exam-surface shadow-md border border-exam-border text-exam-danger hover:bg-exam-danger hover:text-white transition-all hover:scale-105 active:scale-95"
          title="Reset Timer"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
        {/* Background Decor */}
        <div className={`absolute w-[80%] h-[80%] bg-gradient-to-b ${isLowTime ? 'from-exam-danger/5' : 'from-exam-primary/5'} to-transparent rounded-full blur-3xl opacity-50 pointer-events-none`} />

        {/* SVG Ring */}
        <svg 
          viewBox={`0 0 ${size} ${size}`} 
          className="w-auto h-full max-h-[55vh] transform -rotate-90 drop-shadow-xl"
        >
          <defs>
            {/* Animated Rotating Gradient for the Progress Ring */}
            <linearGradient id="timerGradient" gradientUnits="userSpaceOnUse" x1="0" y1={center} x2={size} y2={center}>
              <stop offset="0%" stopColor="rgb(var(--color-danger))" />
              <stop offset="50%" stopColor="rgb(var(--color-primary))" />
              <stop offset="100%" stopColor="rgb(var(--color-accent))" />
              {/* Rotate the gradient around the center of the circle continuously */}
              <animateTransform 
                attributeName="gradientTransform" 
                type="rotate" 
                from={`0 ${center} ${center}`} 
                to={`360 ${center} ${center}`} 
                dur="12s" 
                repeatCount="indefinite" 
              />
            </linearGradient>
            
            {/* Warning Gradient for Low Time */}
            <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="rgb(var(--color-surface))"
            className="opacity-50"
          />
          {/* Progress Circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={isLowTime ? "url(#warningGradient)" : "url(#timerGradient)"}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className={`flex items-center gap-2 mb-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isLowTime ? 'bg-exam-danger/10 text-exam-danger' : 'bg-exam-primary/10 text-exam-primary'}`}>
            <TimerIcon size={14} />
            <span>Time Remaining</span>
          </div>
          
          <span className={`text-7xl lg:text-8xl font-sans font-bold tracking-tighter tabular-nums transition-colors duration-300 ${isLowTime ? 'text-exam-danger' : 'text-exam-text'}`}>
            {formattedTime}
          </span>
          
          <div className="h-6 mt-2">
            <span className={`text-base font-medium transition-opacity duration-300 ${isActive ? 'text-emerald-500 opacity-100' : 'text-exam-textMuted opacity-50'}`}>
              {isActive ? '● Session Active' : 'Session Paused'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;