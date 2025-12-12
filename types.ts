export interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  durationMinutes: number;
}

export interface AppState {
  examTitle: string;
  classes: ClassInfo[];
  timerDurationMinutes: number;
  theme: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    '--color-bg': string;
    '--color-surface': string;
    '--color-surface-alt': string;
    '--color-primary': string;
    '--color-primary-light': string;
    '--color-accent': string;
    '--color-danger': string;
    '--color-text': string;
    '--color-text-muted': string;
    '--color-border': string;
  };
}