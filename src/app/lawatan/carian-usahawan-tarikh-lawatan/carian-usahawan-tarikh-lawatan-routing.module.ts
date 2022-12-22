import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarianUsahawanTarikhLawatanPage } from './carian-usahawan-tarikh-lawatan.page';

const routes: Routes = [
  {
    path: '',
    component: CarianUsahawanTarikhLawatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarianUsahawanTarikhLawatanPageRoutingModule {}
