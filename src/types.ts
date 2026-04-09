export type PostureStatus = 'good' | 'bad' | 'unknown';

export interface PostureAlert {
  id: string;
  timestamp: number;
  type: 'slouching' | 'leaning_forward' | 'leaning_back' | 'neck_tilt';
  duration: number; // in seconds
  severity: 'low' | 'medium' | 'high';
}

export interface PostureSession {
  id: string;
  startTime: number;
  endTime?: number;
  totalDuration: number;
  goodPostureDuration: number;
  badPostureDuration: number;
  alertsCount: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  settings: {
    alertThreshold: number; // seconds before alert
    notificationsEnabled: boolean;
    dailyGoal: number; // minutes of good posture
  };
}
