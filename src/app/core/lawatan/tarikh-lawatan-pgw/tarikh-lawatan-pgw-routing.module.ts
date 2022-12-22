import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarikhLawatanPgwPage } from './tarikh-lawatan-pgw.page';

const routes: Routes = [
  {
    path: '',
    component: TarikhLawatanPgwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarikhLawatanPgwPageRoutingModule {}
