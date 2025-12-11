import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Layout, ChevronDown } from 'lucide-react';
import { AppState, ClassInfo } from '../types';
import { GRADE_OPTIONS, SECTION_OPTIONS, SUBJECT_OPTIONS, DURATION_OPTIONS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: AppState;
  onSave: (newState: AppState) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentState, onSave }) => {
  const [formData, setFormData] = useState<AppState>(currentState);

  if (!isOpen) return null;

  // Helper to parse current name into Grade/Section if possible
  const parseClassName = (name: string) => {
    const match = name.match(/Grade (\d+) - Section ([A-Z])/);
    if (match) {
      return { grade: match[1], section: match[2] };
    }
    return { grade: GRADE_OPTIONS[0], section: SECTION_OPTIONS[0] };
  };

  const updateClassField = (index: number, field: keyof ClassInfo, value: any) => {
    const newClasses = [...formData.classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setFormData({ ...formData, classes: newClasses });
  };

  const updateClassGroup = (index: number, type: 'grade' | 'section', value: string) => {
    const currentName = formData.classes[index].name;
    const { grade, section } = parseClassName(currentName);
    
    let newName = '';
    if (type === 'grade') {
      newName = `Grade ${value} - Section ${section}`;
    } else {
      newName = `Grade ${grade} - Section ${value}`;
    }
    
    updateClassField(index, 'name', newName);
  };

  const addClass = () => {
    setFormData({
      ...formData,
      classes: [
        ...formData.classes,
        { 
          id: Date.now().toString(), 
          name: `Grade ${GRADE_OPTIONS[0]} - Section ${SECTION_OPTIONS[0]}`, 
          subject: SUBJECT_OPTIONS[0], 
          durationMinutes: 90 
        }
      ]
    });
  };

  const removeClass = (index: number) => {
    const newClasses = formData.classes.filter((_, i) => i !== index);
    setFormData({ ...formData, classes: newClasses });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-exam-text/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl animate-scale-up border border-exam-border flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-exam-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-exam-primary/10 rounded-lg text-exam-primary">
              <Layout size={20} />
            </div>
            <h2 className="text-xl font-bold text-exam-text">Dashboard Configuration</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-exam-surfaceAlt rounded-full text-exam-textMuted transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar">
          {/* General Settings */}
          <section className="mb-8">
            <h3 className="text-xs font-bold text-exam-textMuted uppercase tracking-wider mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-exam-text mb-1 block">Exam Title</span>
                <input
                  type="text"
                  value={formData.examTitle}
                  onChange={(e) => setFormData({ ...formData, examTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-exam-border bg-exam-bg focus:bg-white focus:border-exam-primary focus:ring-2 focus:ring-exam-primary/10 outline-none transition-all font-medium"
                />
              </label>
              
              <label className="block">
                 <span className="text-sm font-medium text-exam-text mb-1 block">Global Timer Duration (Minutes)</span>
                 <input
                   type="number"
                   min="1"
                   value={formData.timerDurationMinutes}
                   onChange={(e) => setFormData({ ...formData, timerDurationMinutes: parseInt(e.target.value) || 0 })}
                   className="w-full px-4 py-3 rounded-xl border border-exam-border bg-exam-bg focus:bg-white focus:border-exam-primary focus:ring-2 focus:ring-exam-primary/10 outline-none transition-all font-medium"
                 />
              </label>
            </div>
          </section>

          {/* Class List */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-exam-textMuted uppercase tracking-wider">Active Classes</h3>
              <button
                onClick={addClass}
                className="flex items-center gap-1.5 text-xs font-bold text-exam-primary hover:bg-exam-primary/5 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-exam-primary/20"
              >
                <Plus size={14} /> Add Class
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.classes.map((cls, idx) => {
                const { grade, section } = parseClassName(cls.name);
                return (
                  <div key={cls.id} className="bg-exam-bg p-4 rounded-xl border border-transparent hover:border-exam-border hover:bg-white hover:shadow-sm transition-all group">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                      
                      {/* Index Badge */}
                      <div className="w-8 h-8 flex shrink-0 items-center justify-center text-xs font-bold text-exam-textMuted bg-white rounded-lg border border-exam-border">
                        {idx + 1}
                      </div>

                      {/* Grade Select */}
                      <div className="flex-1 w-full md:w-auto min-w-[140px]">
                        <label className="text-[10px] font-bold text-exam-textMuted uppercase tracking-wider mb-1 block">Grade</label>
                        <div className="relative">
                          <select
                            value={grade}
                            onChange={(e) => updateClassGroup(idx, 'grade', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-exam-border focus:border-exam-primary text-sm font-medium outline-none appearance-none"
                          >
                            {!GRADE_OPTIONS.includes(grade) && (
                              <option value={grade}>Grade {grade}</option>
                            )}
                            {GRADE_OPTIONS.map(g => (
                              <option key={g} value={g}>Grade {g}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-exam-textMuted pointer-events-none" size={14} />
                        </div>
                      </div>

                      {/* Section Select */}
                      <div className="flex-1 w-full md:w-auto min-w-[120px]">
                         <label className="text-[10px] font-bold text-exam-textMuted uppercase tracking-wider mb-1 block">Section</label>
                         <div className="relative">
                          <select
                            value={section}
                            onChange={(e) => updateClassGroup(idx, 'section', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-exam-border focus:border-exam-primary text-sm font-medium outline-none appearance-none"
                          >
                            {!SECTION_OPTIONS.includes(section) && (
                              <option value={section}>Section {section}</option>
                            )}
                            {SECTION_OPTIONS.map(s => (
                              <option key={s} value={s}>Section {s}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-exam-textMuted pointer-events-none" size={14} />
                        </div>
                      </div>

                      {/* Subject Select */}
                      <div className="flex-[2] w-full md:w-auto">
                        <label className="text-[10px] font-bold text-exam-textMuted uppercase tracking-wider mb-1 block">Subject</label>
                        <div className="relative">
                          <select
                            value={cls.subject}
                            onChange={(e) => updateClassField(idx, 'subject', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-exam-border focus:border-exam-primary text-sm font-medium outline-none appearance-none"
                          >
                            {!SUBJECT_OPTIONS.includes(cls.subject) && (
                              <option value={cls.subject}>{cls.subject}</option>
                            )}
                            {SUBJECT_OPTIONS.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-exam-textMuted pointer-events-none" size={14} />
                        </div>
                      </div>

                       {/* Duration Select */}
                       <div className="flex-1 w-full md:w-auto min-w-[160px]">
                        <label className="text-[10px] font-bold text-exam-textMuted uppercase tracking-wider mb-1 block">Duration</label>
                        <div className="relative">
                          <select
                            value={cls.durationMinutes}
                            onChange={(e) => updateClassField(idx, 'durationMinutes', parseInt(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-exam-border focus:border-exam-primary text-sm font-medium outline-none appearance-none"
                          >
                             {DURATION_OPTIONS.map(opt => (
                               <option key={opt.value} value={opt.value}>{opt.label}</option>
                             ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-exam-textMuted pointer-events-none" size={14} />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="flex items-end h-full pb-1">
                        <button onClick={() => removeClass(idx)} className="p-2 text-exam-textMuted hover:text-exam-danger hover:bg-exam-danger/10 rounded-lg transition-colors" title="Remove Class">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-exam-border bg-exam-bg/50 rounded-b-3xl flex justify-end gap-3">
          <button
             onClick={onClose}
             className="px-6 py-2.5 rounded-xl text-exam-text font-medium hover:bg-exam-surfaceAlt transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-2.5 bg-exam-text text-white rounded-xl hover:bg-black transition-all hover:translate-y-[-1px] shadow-lg shadow-gray-200 font-semibold"
          >
            <Save size={18} className="mr-2" />
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;