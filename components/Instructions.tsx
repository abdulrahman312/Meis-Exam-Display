import React from 'react';
import { INSTRUCTIONS } from '../constants';
import { Info } from 'lucide-react';

const Instructions: React.FC = () => {
  // Helper to highlight keywords
  const processText = (text: string) => {
    const parts = text.split(/(\{.*?\})/g);
    return parts.map((part, index) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        return (
          <span key={index} className="inline-block px-1.5 py-0.5 rounded bg-exam-danger/10 text-exam-danger font-bold text-sm mx-1 align-baseline border border-exam-danger/20">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="modern-card h-full flex flex-col overflow-hidden !border-exam-primary/20 shadow-sm">
      <div className="px-6 py-4 border-b border-exam-primary/10 bg-exam-primary/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Info className="text-exam-primary" size={20} />
          <h3 className="font-semibold text-exam-text">Student Instructions</h3>
        </div>
        <span className="text-xs font-bold text-exam-primary/80 uppercase tracking-wider bg-white/50 px-2 py-1 rounded border border-exam-primary/20">
          Read Carefully
        </span>
      </div>
      
      {/* 
          Changed from overflow-y-auto to overflow-hidden.
          Using flex-col and justify-between to distribute items evenly in the available space.
      */}
      <div className="flex-1 p-6 bg-white overflow-hidden min-h-0">
        <ul className="flex flex-col justify-between h-full">
          {INSTRUCTIONS.map((inst, idx) => (
            <li key={idx} className="flex gap-4 group items-center">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-exam-primary/5 border border-exam-primary/20 flex items-center justify-center text-exam-primary font-bold text-sm group-hover:bg-exam-primary group-hover:text-white transition-colors shadow-sm">
                {idx + 1}
              </span>
              <p className="text-base xl:text-lg text-exam-text/90 leading-tight">
                {processText(inst)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Instructions;