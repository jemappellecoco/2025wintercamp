export interface ScheduleRow {
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
}

export interface CampSession {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  price: number;
  description: string;
  highlights: string[];
  image: string;
  schedule: ScheduleRow[];
  colorTheme: string; // Tailwind color class prefix (e.g., 'blue', 'orange')
}

export enum RegistrationStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface FormData {
  parentName: string;
  studentName: string;
  studentAge: string;
  phone: string;
  email: string;
  selectedSessions: string[];
  remarks: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}