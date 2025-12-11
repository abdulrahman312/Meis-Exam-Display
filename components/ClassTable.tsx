import React from 'react';
import { ClassInfo } from '../types';
import { Users, BookOpen, Clock } from 'lucide-react';

interface ClassTableProps {
  classes: ClassInfo[];
}

const ClassTable: React.FC<ClassTableProps> = ({ classes }) => {
  return (
    <div className="modern-card overflow-hidden">
      <div className="px-6 py-4 border-b border-exam-border bg-exam-surfaceAlt/50 flex items-center gap-2">
         <Users className="text-exam-primary" size={20} />
         <h3 className="font-semibold text-exam-text">Class Details</h3>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-exam-border">
            <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-exam-textMuted">Class Group</th>
            <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-exam-textMuted">Subject</th>
            <th className="py-4 px-6 font-semibold text-xs uppercase tracking-wider text-exam-textMuted text-right">Duration</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {classes.map((cls, index) => (
            <tr
              key={cls.id}
              className="border-b border-exam-border last:border-0 hover:bg-exam-surfaceAlt/50 transition-colors"
            >
              <td className="py-4 px-6">
                <span className="font-semibold text-exam-text block">{cls.name}</span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-exam-primary font-medium">
                  <BookOpen size={16} className="opacity-70" />
                  {cls.subject}
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-exam-surfaceAlt text-exam-textMuted text-sm font-medium">
                  <Clock size={14} />
                  {cls.durationMinutes}m
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