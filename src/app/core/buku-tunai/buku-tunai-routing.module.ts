import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BukuTunaiPage } from './buku-tunai.page';

const routes: Routes = [
  {
    path: '',
    component: BukuTunaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BukuTunaiPageRoutingModule {}
