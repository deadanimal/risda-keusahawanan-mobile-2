import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaklumatProdukPage } from './maklumat-produk.page';

const routes: Routes = [
  {
    path: '',
    component: MaklumatProdukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaklumatProdukPageRoutingModule {}
