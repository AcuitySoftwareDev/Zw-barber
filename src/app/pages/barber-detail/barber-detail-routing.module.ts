import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { barberDetailPage } from './barber-detail';

const routes: Routes = [
  {
    path: '',
    component: barberDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class barberDetailPageRoutingModule { }
