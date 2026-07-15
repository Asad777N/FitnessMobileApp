import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workout, WorkoutPlan, WorkoutSession } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<Workout[]>([]);
  public workouts$ = this.workoutsSubject.asObservable();

  private preBuiltWorkouts: Workout[] = [
    {
      id: '1',
      name: 'Upper Body Strength',
      description: 'Complete upper body workout focusing on chest, back, and shoulders',
      category: 'strength',
      duration: 45,
      difficulty: 'intermediate',
      isCustom: false,
      exercises: [
        {
          id: 'e1',
          name: 'Bench Press',
          description: 'Push weight away from chest',
          sets: 4,
          reps: 8,
          restSeconds: 90,
          instructions: ['Lie flat on bench', 'Grip bar at shoulder width', 'Push bar up', 'Lower controlled'],
          muscleGroups: ['chest', 'triceps'],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Full Body Cardio',
      description: 'High-intensity cardio workout for maximum calorie burn',
      category: 'cardio',
      duration: 30,
      difficulty: 'advanced',
      isCustom: false,
      exercises: [
        {
          id: 'e2',
          name: 'Jump Rope',
          description: 'Jump rope for cardio endurance',
          sets: 3,
          reps: 100,
          restSeconds: 60,
          instructions: ['Hold rope handles', 'Jump with both feet', 'Maintain rhythm'],
          muscleGroups: ['full body'],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor() {
    this.loadPreBuiltWorkouts();
  }

  private loadPreBuiltWorkouts(): void {
    this.workoutsSubject.next(this.preBuiltWorkouts);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workouts$.pipe(
      map(workouts => [...this.preBuiltWorkouts, ...workouts])
    );
  }

  getWorkoutsByCategory(category: string): Observable<Workout[]> {
    return this.workouts$.pipe(
      map(workouts => {
        const custom = workouts.filter(w => w.category === category);
        const preBuilt = this.preBuiltWorkouts.filter(w => w.category === category);
        return [...preBuilt, ...custom];
      })
    );
  }

  getWorkoutById(id: string): Observable<Workout | null> {
    return this.workouts$.pipe(
      map(() => {
        const preBuilt = this.preBuiltWorkouts.find(w => w.id === id);
        return preBuilt || null;
      })
    );
  }

  createCustomWorkout(userId: string, workout: Omit<Workout, 'id'>): Observable<string> {
    const workoutId = `workout_${Date.now()}`;
    const newWorkout = { ...workout, id: workoutId };
    const current = this.workoutsSubject.value;
    this.workoutsSubject.next([...current, newWorkout]);
    return from(Promise.resolve(workoutId));
  }

  updateWorkout(workoutId: string, updates: Partial<Workout>): Observable<void> {
    const workouts = this.workoutsSubject.value;
    const index = workouts.findIndex(w => w.id === workoutId);
    if (index >= 0) {
      const updated = { ...workouts[index], ...updates, updatedAt: new Date() };
      workouts[index] = updated;
      this.workoutsSubject.next([...workouts]);
    }
    return from(Promise.resolve(void 0));
  }

  deleteWorkout(workoutId: string): Observable<void> {
    const workouts = this.workoutsSubject.value.filter(w => w.id !== workoutId);
    this.workoutsSubject.next(workouts);
    return from(Promise.resolve(void 0));
  }

  createWorkoutPlan(userId: string, plan: Omit<WorkoutPlan, 'id'>): Observable<string> {
    const planId = `plan_${Date.now()}`;
    return from(Promise.resolve(planId));
  }

  startWorkoutSession(session: Omit<WorkoutSession, 'id'>): Observable<string> {
    const sessionId = `session_${Date.now()}`;
    return from(Promise.resolve(sessionId));
  }

  completeWorkoutSession(sessionId: string, updates: Partial<WorkoutSession>): Observable<void> {
    return from(Promise.resolve(void 0));
  }
}
