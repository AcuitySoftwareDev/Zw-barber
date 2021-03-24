import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { barberListPage } from './barber-list';
import { barberListPageRoutingModule } from './barber-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    barberListPageRoutingModule
  ],
  declarations: [barberListPage],
})
export class barberListModule {}
