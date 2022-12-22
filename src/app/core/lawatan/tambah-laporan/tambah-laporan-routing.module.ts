import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahLaporanPage } from './tambah-laporan.page';

const routes: Routes = [
  {
    path: '',
    component: TambahLaporanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahLaporanPageRoutingModule {}
