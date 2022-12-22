import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KatalogPegawaiPage } from './katalog-pegawai.page';

const routes: Routes = [
  {
    path: '',
    component: KatalogPegawaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KatalogPegawaiPageRoutingModule {}
