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
    <div className="modern-card h-full flex flex-col overflow-hidden">
      <div className="px-6 py-4 border-b border-exam-border bg-exam-surfaceAlt/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Info className="text-exam-primary" size={20} />
          <h3 className="font-semibold text-exam-text">Student Instructions</h3>
        </div>
        <span className="text-xs font-bold text-exam-textMuted uppercase tracking-wider bg-white px-2 py-1 rounded border border-exam-border">
          Read Carefully
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
        <ul className="space-y-4">
          {INSTRUCTIONS.map((inst, idx) => (
            <li key={idx} className="flex gap-4 group">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-exam-surfaceAlt border border-exam-border flex items-center justify-center text-exam-primary font-bold text-sm group-hover:bg-exam-primary group-hover:text-white transition-colors">
                {idx + 1}
              </span>
              <p className="text-lg text-exam-text/90 leading-relaxed pt-0.5">
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