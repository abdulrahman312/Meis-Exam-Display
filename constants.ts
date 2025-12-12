import { ClassInfo, Theme } from './types';

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

export const THEMES: Theme[] = [
  {
    id: 'light',
    name: 'Classic Slate',
    colors: {
      '--color-bg': '248 250 252',         // Slate 50
      '--color-surface': '255 255 255',    // White
      '--color-surface-alt': '241 245 249',// Slate 100
      '--color-primary': '79 70 229',      // Indigo 600
      '--color-primary-light': '129 140 248', // Indigo 400
      '--color-accent': '14 165 233',      // Sky 500
      '--color-danger': '225 29 72',       // Rose 600
      '--color-text': '15 23 42',          // Slate 900
      '--color-text-muted': '71 85 105',   // Slate 600
      '--color-border': '226 232 240',     // Slate 200
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      '--color-bg': '240 249 255',         // Sky 50
      '--color-surface': '255 255 255',    // White
      '--color-surface-alt': '224 242 254',// Sky 100
      '--color-primary': '2 132 199',      // Sky 600
      '--color-primary-light': '56 189 248', // Sky 400
      '--color-accent': '99 102 241',      // Indigo 500
      '--color-danger': '225 29 72',       // Rose 600
      '--color-text': '12 74 110',         // Sky 900
      '--color-text-muted': '3 105 161',   // Sky 700
      '--color-border': '186 230 253',     // Sky 200
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    colors: {
      '--color-bg': '236 253 245',         // Emerald 50
      '--color-surface': '255 255 255',    // White
      '--color-surface-alt': '209 250 229',// Emerald 100
      '--color-primary': '5 150 105',      // Emerald 600
      '--color-primary-light': '52 211 153', // Emerald 400
      '--color-accent': '245 158 11',      // Amber 500
      '--color-danger': '220 38 38',       // Red 600
      '--color-text': '6 78 59',           // Emerald 900
      '--color-text-muted': '4 120 87',    // Emerald 700
      '--color-border': '167 243 208',     // Emerald 200
    }
  },
  {
    id: 'lavender',
    name: 'Royal Lavender',
    colors: {
      '--color-bg': '250 245 255',         // Purple 50
      '--color-surface': '255 255 255',    // White
      '--color-surface-alt': '243 232 255',// Purple 100
      '--color-primary': '147 51 234',     // Purple 600
      '--color-primary-light': '192 132 252', // Purple 400
      '--color-accent': '236 72 153',      // Pink 500
      '--color-danger': '225 29 72',       // Rose 600
      '--color-text': '88 28 135',         // Purple 900
      '--color-text-muted': '126 34 206',  // Purple 700
      '--color-border': '233 213 255',     // Purple 200
    }
  },
  {
    id: 'rose',
    name: 'Sunset Rose',
    colors: {
      '--color-bg': '255 241 242',         // Rose 50
      '--color-surface': '255 255 255',    // White
      '--color-surface-alt': '255 228 230',// Rose 100
      '--color-primary': '225 29 72',      // Rose 600
      '--color-primary-light': '251 113 133', // Rose 400
      '--color-accent': '249 115 22',      // Orange 500
      '--color-danger': '185 28 28',       // Red 700
      '--color-text': '136 19 55',         // Rose 900
      '--color-text-muted': '190 18 60',   // Rose 700
      '--color-border': '254 205 211',     // Rose 200
    }
  }
];