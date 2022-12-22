import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarianUsahawanPage } from './carian-usahawan.page';

const routes: Routes = [
  {
    path: '',
    component: CarianUsahawanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarianUsahawanPageRoutingModule {}
