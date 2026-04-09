import { PostureAlert, PostureSession, UserProfile } from '../types';

const STORAGE_KEYS = {
  ALERTS: 'posture_alerts',
  SESSIONS: 'posture_sessions',
  USER: 'posture_user',
};

export const postureService = {
  // Alerts
  getAlerts: (): PostureAlert[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
    return stored ? JSON.parse(stored) : [];
  },

  saveAlert: (alert: PostureAlert) => {
    const alerts = postureService.getAlerts();
    const updated = [alert, ...alerts].slice(0, 100); // Keep last 100
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(updated));
    return updated;
  },

  // Sessions
  getSessions: (): PostureSession[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveSession: (session: PostureSession) => {
    const sessions = postureService.getSessions();
    const updated = [session, ...sessions].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    return updated;
  },

  // User Profile
  getUser: (): UserProfile | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  },

  saveUser: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Mock Real-time Stream
  subscribeToPosture: (callback: (status: 'good' | 'bad') => void) => {
    const interval = setInterval(() => {
      // 5% chance of bad posture in simulation
      const status = Math.random() > 0.05 ? 'good' : 'bad';
      callback(status);
    }, 3000);
    return () => clearInterval(interval);
  }
};
