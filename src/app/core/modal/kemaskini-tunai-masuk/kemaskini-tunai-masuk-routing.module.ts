import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KemaskiniTunaiMasukPage } from './kemaskini-tunai-masuk.page';

const routes: Routes = [
  {
    path: '',
    component: KemaskiniTunaiMasukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemaskiniTunaiMasukPageRoutingModule {}
