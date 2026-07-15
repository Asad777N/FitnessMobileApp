import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { WorkoutsPage } from './workouts.page';

@NgModule({
  declarations: [WorkoutsPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: WorkoutsPage }]),
  ],
})
export class WorkoutsModule {}
