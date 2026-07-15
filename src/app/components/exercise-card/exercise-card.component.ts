import { Component, Input } from '@angular/core';
import { Exercise } from '../../models/workout.model';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
  @Input() index: number = 0;
}
