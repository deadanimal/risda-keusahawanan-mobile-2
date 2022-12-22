import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawatanPegawaiPage } from './lawatan-pegawai.page';

const routes: Routes = [
  {
    path: '',
    component: LawatanPegawaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawatanPegawaiPageRoutingModule {}
