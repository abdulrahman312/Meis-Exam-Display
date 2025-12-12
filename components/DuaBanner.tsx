import React from 'react';
import { ARABIC_DUA } from '../constants';

const DuaBanner: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes border-slide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-border-slide {
          animation: border-slide 6s linear infinite;
          background-size: 200% 100%;
        }
      `}</style>
      
      {/* Container with Animated Border */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-sm">
        {/* Animated Linear Gradient Background for Border */}
        {/* Using a sliding linear gradient ensures the border is always complete and uniform */}
        <div 
          className="absolute inset-0 animate-border-slide"
          style={{
            background: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-primary)))`
          }}
        />
        
        {/* Inner White Box */}
        <div className="relative m-[3px] bg-exam-surface rounded-[13px] py-5 px-6 text-center">
          <p 
            className="font-arabic text-3xl lg:text-4xl font-bold drop-shadow-sm animate-border-slide bg-clip-text text-transparent pb-2" 
            style={{ 
              lineHeight: '1.6',
              backgroundImage: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-primary)))`
            }}
          >
            {ARABIC_DUA}
          </p>
        </div>
      </div>
    </>
  );
};

export default DuaBanner;