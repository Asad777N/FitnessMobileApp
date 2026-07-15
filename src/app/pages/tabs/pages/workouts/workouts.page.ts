import { Component, signal } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage {
  workouts$ = this.workoutService.getWorkouts();
  selectedCategory = signal<string | null>(null);
  categories = ['strength', 'cardio', 'yoga', 'hiit', 'stretching', 'recovery'];

  constructor(
    private workoutService: WorkoutService,
    private router: Router
  ) {}

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  startWorkout(workoutId: string): void {
    this.router.navigate(['/tabs/workouts', workoutId, 'start']);
  }
}
