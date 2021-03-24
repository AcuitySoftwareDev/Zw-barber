import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { barberListPage } from './barber-list';
const routes: Routes = [
  {
    path: '',
    component: barberListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class barberListPageRoutingModule {}
