import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'add-barber',
    loadChildren: () => import('./pages/add-barber/add-barber.module').then( m => m.AddBarberPageModule)
  },
  {
    path: 'developer',
    loadChildren: () => import('./pages/developer/developer.module').then( m => m.DeveloperPageModule)
  },
  {
    path: 'add-appointment',
    loadChildren: () => import('./pages/add-appointment/add-appointment.module').then( m => m.AddAppointmentPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'home',
    loadChildren:  () => import ('./pages/home/home.module').then(m =>m.HomePageModule)
  },
  {
    path: 'see-all',
    loadChildren:  () => import ('./pages/see-all/see-all.module').then(m =>m.SeeAllPageModule)
  },
  {
    path: 'item-detail',
    loadChildren: () => import('./pages/item-detail/item-detail.module').then( m => m.ItemDetailPageModule)
  },
  {
    path: 'barber',
    loadChildren: () => import ('./pages/barber-list/barber-list.module').then( m => m.barberListModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import ('./pages/schedule/schedule.module').then( m => m.ScheduleModule)
  } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
