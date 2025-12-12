import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface HeaderProps {
  examTitle: string;
}

const Header: React.FC<HeaderProps> = ({ examTitle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

  return (
    <header className="flex items-center justify-between w-full px-8 py-6 shrink-0 z-10">
      <style>{`
        @keyframes border-slide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-border-slide {
          animation: border-slide 6s linear infinite;
          background-size: 200% 100%;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      {/* Left: School Brand */}
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Animated Glowing Background */}
          <div 
            className="absolute -inset-1 rounded-full blur-md opacity-75 animate-spin-slow"
            style={{
              background: `conic-gradient(from 0deg, rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-danger)), rgb(var(--color-primary)))`
            }}
          />
          
          {/* Logo Container */}
          <div className="relative w-full h-full rounded-full bg-exam-surface flex items-center justify-center z-10 overflow-hidden">
            <img src={LOGO_URL} alt="MEIS Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-exam-text">
            MEIS – Al Muruj
          </h1>
          <span className="text-sm font-semibold uppercase tracking-wider text-exam-textMuted mt-1">
            Exam Control Center
          </span>
        </div>
      </div>

      {/* Center: Exam Title with Animated Border */}
      <div className="flex flex-col items-center justify-center flex-1 mx-4 lg:mx-8 text-center min-w-0">
        <div className="relative group rounded-3xl overflow-hidden shadow-sm transform hover:scale-[1.02] transition-transform duration-300 inline-block max-w-full">
          {/* Animated Linear Gradient Border Background */}
          {/* Using a sliding linear gradient ensures the border is always complete and uniform */}
          <div 
            className="absolute inset-0 animate-border-slide" 
            style={{
              background: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-primary)))`
            }}
          />
          
          {/* Inner Content */}
          <div className="relative m-[3px] bg-exam-surface rounded-[21px] px-8 py-4 lg:px-12 lg:py-5">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text animate-border-slide tracking-tight leading-none pb-1 whitespace-nowrap"
              style={{
                backgroundImage: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-primary)))`
              }}
            >
              {examTitle}
            </h2>
          </div>
        </div>
      </div>

      {/* Right: Date/Time */}
      <div className="flex items-center gap-8">
        <div className="hidden lg:flex flex-col items-end text-right">
          <div className="flex items-center gap-2 text-exam-textMuted text-lg font-semibold mb-1">
            <Calendar size={20} className="text-exam-primary" />
            {currentTime.toLocaleDateString('en-US', dateOptions)}
          </div>
          <div className="flex items-center gap-2 text-exam-text text-6xl font-black tracking-tighter tabular-nums leading-none">
            {currentTime.toLocaleTimeString('en-US', timeOptions)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;