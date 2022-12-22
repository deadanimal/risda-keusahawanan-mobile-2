import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstTimeLoginPage } from './first-time-login.page';

const routes: Routes = [
  {
    path: '',
    component: FirstTimeLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstTimeLoginPageRoutingModule {}
