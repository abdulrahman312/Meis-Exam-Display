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
      {/* Left: School Brand */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-white p-2 shadow-sm border border-exam-border flex items-center justify-center">
          <img src={LOGO_URL} alt="MEIS Logo" className="w-full h-full object-contain" />
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

      {/* Center: Exam Title */}
      <div className="flex flex-col items-center justify-center flex-1 mx-8 text-center">
        <div className="px-12 py-5 bg-white rounded-3xl border border-exam-border shadow-sm transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-exam-primary to-exam-accent tracking-tight leading-none pb-1">
            {examTitle}
          </h2>
        </div>
      </div>

      {/* Right: Date/Time Widget */}
      <div className="flex items-center gap-6">
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