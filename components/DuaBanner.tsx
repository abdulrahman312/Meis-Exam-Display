import React from 'react';
import { ARABIC_DUA } from '../constants';

const DuaBanner: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-exam-primary/5 via-exam-primary/10 to-exam-primary/5 border border-exam-primary/10 py-3 px-6 text-center">
      <p className="font-arabic text-2xl lg:text-3xl font-bold text-exam-text/80 drop-shadow-sm" style={{ lineHeight: '1.6' }}>
        {ARABIC_DUA}
      </p>
    </div>
  );
};

export default DuaBanner;