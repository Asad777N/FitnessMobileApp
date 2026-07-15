export interface Workout {
  id: string;
  name: string;
  description: string;
  category: WorkoutCategory;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  caloriesBurned?: number;
  imageUrl?: string;
  videoUrl?: string;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkoutCategory = 'strength' | 'cardio' | 'yoga' | 'hiit' | 'stretching' | 'recovery';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number | string;
  restSeconds: number;
  duration?: number;
  demoVideoUrl?: string;
  demoGifUrl?: string;
  instructions: string[];
  muscleGroups: string[];
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  workouts: WorkoutPlanWeek[];
  isCustom: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutPlanWeek {
  week: number;
  days: WorkoutPlanDay[];
}

export interface WorkoutPlanDay {
  dayOfWeek: number;
  workoutId?: string;
  restDay: boolean;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  workoutId: string;
  planId?: string;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  exerciseSessions: ExerciseSession[];
  totalDuration: number;
  caloriesBurned: number;
  notes?: string;
}

export interface ExerciseSession {
  exerciseId: string;
  order: number;
  completed: boolean;
  actualSets?: number;
  actualReps?: number[];
  skipped: boolean;
  notes?: string;
}
