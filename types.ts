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
}