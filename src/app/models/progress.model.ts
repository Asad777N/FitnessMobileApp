export interface BodyMeasurement {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thighs?: number;
  notes?: string;
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  date: Date;
  photoUrl: string;
  type: 'front' | 'side' | 'back';
  notes?: string;
}

export interface DailyStats {
  date: Date;
  caloriesBurned: number;
  steps: number;
  waterIntake: number;
  workoutCompleted: boolean;
  workoutDuration: number;
  streakDays: number;
}

export interface WeightChartData {
  date: Date;
  weight: number;
}
