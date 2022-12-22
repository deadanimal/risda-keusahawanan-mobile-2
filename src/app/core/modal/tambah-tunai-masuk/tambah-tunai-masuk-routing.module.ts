import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahTunaiMasukPage } from './tambah-tunai-masuk.page';

const routes: Routes = [
  {
    path: '',
    component: TambahTunaiMasukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahTunaiMasukPageRoutingModule {}
