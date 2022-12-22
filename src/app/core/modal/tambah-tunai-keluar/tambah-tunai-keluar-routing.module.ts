import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahTunaiKeluarPage } from './tambah-tunai-keluar.page';

const routes: Routes = [
  {
    path: '',
    component: TambahTunaiKeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahTunaiKeluarPageRoutingModule {}
