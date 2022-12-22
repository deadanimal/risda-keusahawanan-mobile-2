import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KemaskiniTunaiKeluarPage } from './kemaskini-tunai-keluar.page';

const routes: Routes = [
  {
    path: '',
    component: KemaskiniTunaiKeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemaskiniTunaiKeluarPageRoutingModule {}
