import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiLaporanPegawaiPage } from './senarai-laporan-pegawai.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiLaporanPegawaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiLaporanPegawaiPageRoutingModule {}
