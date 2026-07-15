import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { ProgressService } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  user = this.authService.currentUser;
  workouts$ = this.workoutService.getWorkouts();
  caloriesBurned = signal(380);
  steps = signal(7245);
  waterIntake = signal(1800);
  streak = signal(12);
  todayComplete = signal(65);

  constructor(
    private workoutService: WorkoutService,
    private progressService: ProgressService,
    private authService: AuthService,
    private router: Router
  ) {}

  startQuickWorkout(): void {
    this.router.navigate(['/tabs/workouts']);
  }

  addWater(): void {
    this.waterIntake.update(val => val + 250);
  }

  logoutUser(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
