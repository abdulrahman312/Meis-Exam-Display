import React, { useState, useEffect } from 'react';
import { ARABIC_DUAS } from '../constants';

const DuaBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 3 minutes = 180,000 ms
    const duration = 180000;
    
    const interval = setInterval(() => {
      // Start exit transition
      setIsVisible(false);

      // Wait for transition to finish (500ms) before changing text and entering
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ARABIC_DUAS.length);
        setIsVisible(true);
      }, 500);

    }, duration);

    return () => clearInterval(interval);
  }, []);

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
        <div className="relative m-[3px] bg-exam-surface rounded-[13px] py-5 px-6 text-center min-h-[90px] flex items-center justify-center">
          <p 
            className={`font-arabic text-3xl lg:text-4xl font-bold drop-shadow-sm bg-clip-text text-transparent pb-2 transition-all duration-500 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ 
              lineHeight: '1.6',
              backgroundImage: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-accent)), rgb(var(--color-primary)))`
            }}
          >
            {ARABIC_DUAS[currentIndex]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DuaBanner;