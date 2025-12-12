import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Layout, ChevronDown, Palette, Check } from 'lucide-react';
import { AppState, ClassInfo } from '../types';
import { GRADE_OPTIONS, SECTION_OPTIONS, SUBJECT_OPTIONS, DURATION_OPTIONS, THEMES } from '../constants';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 text-slate-900">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl animate-scale-up border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Layout size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Dashboard Configuration</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar">
          {/* General Settings */}
          <section className="mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-900 mb-1 block">Exam Title</span>
                <input
                  type="text"
                  value={formData.examTitle}
                  onChange={(e) => setFormData({ ...formData, examTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none transition-all font-medium text-slate-900"
                />
              </label>
              
              <label className="block">
                 <span className="text-sm font-medium text-slate-900 mb-1 block">Global Timer Duration (Minutes)</span>
                 <input
                   type="number"
                   min="1"
                   value={formData.timerDurationMinutes}
                   onChange={(e) => setFormData({ ...formData, timerDurationMinutes: parseInt(e.target.value) || 0 })}
                   className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none transition-all font-medium text-slate-900"
                 />
              </label>
            </div>
          </section>

          {/* Class List */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Classes</h3>
              <button
                onClick={addClass}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-indigo-100"
              >
                <Plus size={14} /> Add Class
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.classes.map((cls, idx) => {
                const { grade, section } = parseClassName(cls.name);
                return (
                  <div key={cls.id} className="bg-slate-50 p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all group">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                      
                      {/* Index Badge */}
                      <div className="w-8 h-8 flex shrink-0 items-center justify-center text-xs font-bold text-slate-500 bg-white rounded-lg border border-slate-200">
                        {idx + 1}
                      </div>

                      {/* Grade Select */}
                      <div className="flex-1 w-full md:w-auto min-w-[140px]">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Grade</label>
                        <div className="relative">
                          <select
                            value={grade}
                            onChange={(e) => updateClassGroup(idx, 'grade', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-indigo-600 text-sm font-medium outline-none appearance-none text-slate-900"
                          >
                            {!GRADE_OPTIONS.includes(grade) && (
                              <option value={grade}>Grade {grade}</option>
                            )}
                            {GRADE_OPTIONS.map(g => (
                              <option key={g} value={g}>Grade {g}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                      </div>

                      {/* Section Select */}
                      <div className="flex-1 w-full md:w-auto min-w-[120px]">
                         <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Section</label>
                         <div className="relative">
                          <select
                            value={section}
                            onChange={(e) => updateClassGroup(idx, 'section', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-indigo-600 text-sm font-medium outline-none appearance-none text-slate-900"
                          >
                            {!SECTION_OPTIONS.includes(section) && (
                              <option value={section}>Section {section}</option>
                            )}
                            {SECTION_OPTIONS.map(s => (
                              <option key={s} value={s}>Section {s}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                      </div>

                      {/* Subject Select */}
                      <div className="flex-[2] w-full md:w-auto">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Subject</label>
                        <div className="relative">
                          <select
                            value={cls.subject}
                            onChange={(e) => updateClassField(idx, 'subject', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-indigo-600 text-sm font-medium outline-none appearance-none text-slate-900"
                          >
                            {!SUBJECT_OPTIONS.includes(cls.subject) && (
                              <option value={cls.subject}>{cls.subject}</option>
                            )}
                            {SUBJECT_OPTIONS.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                      </div>

                       {/* Duration Select */}
                       <div className="flex-1 w-full md:w-auto min-w-[160px]">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Duration</label>
                        <div className="relative">
                          <select
                            value={cls.durationMinutes}
                            onChange={(e) => updateClassField(idx, 'durationMinutes', parseInt(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-200 focus:border-indigo-600 text-sm font-medium outline-none appearance-none text-slate-900"
                          >
                             {DURATION_OPTIONS.map(opt => (
                               <option key={opt.value} value={opt.value}>{opt.label}</option>
                             ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="flex items-end h-full pb-1">
                        <button onClick={() => removeClass(idx)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Class">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Theme Selection */}
          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Color Theme</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {THEMES.map((theme) => {
                const isSelected = formData.theme === theme.id || (!formData.theme && theme.id === 'ocean');
                
                // Helper to get color style for preview
                const bgStyle = { backgroundColor: `rgb(${theme.colors['--color-bg']})` };
                const primaryStyle = { backgroundColor: `rgb(${theme.colors['--color-primary']})` };
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => setFormData({ ...formData, theme: theme.id })}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {/* Theme Preview Circle */}
                    <div className="w-10 h-10 rounded-full border border-slate-200 shrink-0 overflow-hidden relative shadow-sm" style={bgStyle}>
                      <div className="absolute inset-0 opacity-20" style={primaryStyle}></div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-tl-full" style={primaryStyle}></div>
                    </div>
                    
                    <span className={`font-medium text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {theme.name}
                    </span>
                    
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-indigo-600">
                        <Check size={16} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-200 bg-slate-50 rounded-b-3xl flex justify-end gap-3">
          <button
             onClick={onClose}
             className="px-6 py-2.5 rounded-xl text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-black transition-all hover:translate-y-[-1px] shadow-lg shadow-gray-200 font-semibold"
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