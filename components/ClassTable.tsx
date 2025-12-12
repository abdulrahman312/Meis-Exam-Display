import React from 'react';
import { ClassInfo } from '../types';
import { Users, BookOpen, Clock } from 'lucide-react';
import { DURATION_OPTIONS } from '../constants';

interface ClassTableProps {
  classes: ClassInfo[];
}

const ClassTable: React.FC<ClassTableProps> = ({ classes }) => {
  const getDurationLabel = (minutes: number) => {
    const option = DURATION_OPTIONS.find(opt => opt.value === minutes);
    return option ? option.label : `${minutes} Minutes`;
  };

  return (
    <div className="modern-card overflow-hidden !border-exam-primary/20 shadow-sm">
      <div className="px-6 py-4 border-b border-exam-primary/10 bg-exam-primary/5 flex items-center gap-3">
         <Users className="text-exam-primary" size={28} />
         <h3 className="text-2xl font-bold text-exam-text">Class Details</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-exam-primary/10">
            <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider text-exam-textMuted">Class Group</th>
            <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider text-exam-textMuted">Subject</th>
            <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider text-exam-textMuted text-right">Duration</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {classes.map((cls, index) => (
            <tr
              key={cls.id}
              className="border-b border-exam-primary/5 last:border-0 hover:bg-exam-primary/5 transition-colors"
            >
              <td className="py-5 px-6">
                <span className="text-2xl font-bold text-exam-text block">{cls.name}</span>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center gap-3 text-exam-primary font-semibold text-2xl">
                  <BookOpen size={24} className="opacity-70 shrink-0" />
                  {cls.subject}
                </div>
              </td>
              <td className="py-5 px-6 text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-exam-surfaceAlt text-exam-textMuted text-lg font-semibold border border-exam-border">
                  <Clock size={20} />
                  {getDurationLabel(cls.durationMinutes)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;