import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CommonComponentsModule } from '../../../../components/common.module';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    CommonComponentsModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
  ],
})
export class HomeModule {}
