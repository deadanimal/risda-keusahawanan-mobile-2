import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KemaskiniLaporanPage } from './kemaskini-laporan.page';

const routes: Routes = [
  {
    path: '',
    component: KemaskiniLaporanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemaskiniLaporanPageRoutingModule {}
