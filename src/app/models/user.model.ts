export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: UserProfile;
  settings?: UserSettings;
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: FitnessGoal[];
  bio?: string;
}

export interface UserSettings {
  theme: 'dark' | 'light';
  units: 'metric' | 'imperial';
  notificationsEnabled: boolean;
}

export interface FitnessGoal {
  id: string;
  type: 'weight-loss' | 'muscle-gain' | 'endurance' | 'flexibility' | 'general-fitness';
  targetValue?: number;
  targetDate?: Date;
  isActive: boolean;
}
