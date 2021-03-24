import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBarberPage } from './add-barber.page';

const routes: Routes = [
  {
    path: '',
    component: AddBarberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBarberPageRoutingModule {}
