import { ClassInfo } from './types';

export const DEFAULT_CLASSES: ClassInfo[] = [
  { id: '1', name: 'Grade 9 - Section C', subject: 'Mathematics', durationMinutes: 90 },
  { id: '2', name: 'Grade 9 - Section C', subject: 'Mathematics', durationMinutes: 90 },
];

export const INSTRUCTIONS = [
  "All students should be in the classroom at 7:45 a.m.",
  "Students should leave all things related to the exam subject out of the exam class.",
  "Students are {not allowed} to use correction pen on the answer sheet.",
  "Students should write name, date, subject, and grade on the answer sheet.",
  "If a student does not know the answer to a question, he/she should write \"I don't know\" or cross out the space for the answer.",
  "Students {should not} have mobiles in the exam room."
];

export const LOGO_URL = "https://i.ibb.co/bgFrgXkW/meis.png";
export const ARABIC_DUA = "اللهم لا سهل إلا ما جعلته سهلا، وأنت تجعل الصعب إن شئت سهلا";

// Dropdown Options
export const GRADE_OPTIONS = Array.from({ length: 9 }, (_, i) => (i + 4).toString()); // 4 to 12
export const SECTION_OPTIONS = ['C', 'D', 'E', 'F', 'H', 'J', 'L', 'N'];
export const SUBJECT_OPTIONS = [
  'Mathematics',
  'Biology',
  'English',
  'Chemistry',
  'Physics',
  'Arabic',
  'Science',
  'Vocabulary',
  'Spelling',
  'RCV',
  'Literature'
];

export const DURATION_OPTIONS = [
  { label: '1 Hour', value: 60 },
  { label: '1 Hour 30 Minutes', value: 90 },
  { label: '2 Hours', value: 120 },
  { label: '2 Hours 30 Minutes', value: 150 },
  { label: '3 Hours', value: 180 },
];
