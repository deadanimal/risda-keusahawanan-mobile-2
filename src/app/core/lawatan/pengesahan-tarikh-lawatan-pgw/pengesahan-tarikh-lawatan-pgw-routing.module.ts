import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengesahanTarikhLawatanPgwPage } from './pengesahan-tarikh-lawatan-pgw.page';

const routes: Routes = [
  {
    path: '',
    component: PengesahanTarikhLawatanPgwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengesahanTarikhLawatanPgwPageRoutingModule {}
