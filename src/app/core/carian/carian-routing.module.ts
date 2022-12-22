import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarianPage } from './carian.page';

const routes: Routes = [
  {
    path: '',
    component: CarianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarianPageRoutingModule {}
