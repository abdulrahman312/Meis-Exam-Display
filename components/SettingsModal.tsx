import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Layout } from 'lucide-react';
import { AppState, ClassInfo } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentState: AppState;
  onSave: (newState: AppState) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentState, onSave }) => {
  const [formData, setFormData] = useState<AppState>(currentState);

  if (!isOpen) return null;

  const handleClassChange = (index: number, field: keyof ClassInfo, value: any) => {
    const newClasses = [...formData.classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setFormData({ ...formData, classes: newClasses });
  };

  const addClass = () => {
    setFormData({
      ...formData,
      classes: [
        ...formData.classes,
        { id: Date.now().toString(), name: 'New Class', subject: 'Subject', durationMinutes: 60 }
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
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-scale-up border border-exam-border flex flex-col max-h-[85vh]">
        
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
                 <span className="text-sm font-medium text-exam-text mb-1 block">Timer Duration (Minutes)</span>
                 <input
                   type="number"
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
            
            <div className="space-y-3">
              {formData.classes.map((cls, idx) => (
                <div key={cls.id} className="flex gap-3 items-center bg-exam-bg p-1.5 rounded-xl border border-transparent hover:border-exam-border hover:bg-white hover:shadow-sm transition-all group">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-exam-textMuted bg-white rounded-lg border border-exam-border">
                    {idx + 1}
                  </div>
                  <input
                    type="text"
                    value={cls.name}
                    onChange={(e) => handleClassChange(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-transparent hover:bg-exam-surfaceAlt focus:bg-white border border-transparent focus:border-exam-primary/50 text-sm font-medium outline-none transition-all"
                    placeholder="Class Name"
                  />
                  <input
                    type="text"
                    value={cls.subject}
                    onChange={(e) => handleClassChange(idx, 'subject', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-transparent hover:bg-exam-surfaceAlt focus:bg-white border border-transparent focus:border-exam-primary/50 text-sm outline-none transition-all"
                    placeholder="Subject"
                  />
                   <input
                    type="number"
                    value={cls.durationMinutes}
                    onChange={(e) => handleClassChange(idx, 'durationMinutes', parseInt(e.target.value))}
                    className="w-20 px-3 py-2 rounded-lg bg-transparent hover:bg-exam-surfaceAlt focus:bg-white border border-transparent focus:border-exam-primary/50 text-sm text-center outline-none transition-all"
                    placeholder="Mins"
                  />
                  <button onClick={() => removeClass(idx)} className="p-2 text-exam-textMuted hover:text-exam-danger hover:bg-exam-danger/10 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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