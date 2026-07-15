import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProgressRingComponent } from './progress-ring/progress-ring.component';
import { ExerciseCardComponent } from './exercise-card/exercise-card.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    ProgressRingComponent,
    ExerciseCardComponent,
    TimerComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    ProgressRingComponent,
    ExerciseCardComponent,
    TimerComponent,
  ],
})
export class CommonComponentsModule {}
