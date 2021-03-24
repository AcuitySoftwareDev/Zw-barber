import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBarberPageRoutingModule } from './add-barber-routing.module';

import { AddBarberPage } from './add-barber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBarberPageRoutingModule
  ],
  declarations: [AddBarberPage]
})
export class AddBarberPageModule {}
