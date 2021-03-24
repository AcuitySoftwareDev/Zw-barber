import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { barberDetailPage } from './barber-detail';
import { barberDetailPageRoutingModule } from './barber-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    barberDetailPageRoutingModule
  ],
  declarations: [
    barberDetailPage,
  ]
})
export class barberDetailModule { }
