import React from 'react';
import { ARABIC_DUA } from '../constants';

const DuaBanner: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-shimmer {
          background-size: 200% auto;
          animation: shimmer 5s ease-in-out infinite alternate;
        }
      `}</style>
      <div className="w-full rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-indigo-100 py-5 px-6 text-center shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-exam-primary/20 to-transparent" />
        
        <p 
          className="font-arabic text-3xl lg:text-4xl font-bold drop-shadow-sm animate-text-shimmer bg-gradient-to-r from-exam-primary via-exam-accent to-exam-primary bg-clip-text text-transparent pb-2" 
          style={{ lineHeight: '1.6' }}
        >
          {ARABIC_DUA}
        </p>
      </div>
    </>
  );
};

export default DuaBanner;