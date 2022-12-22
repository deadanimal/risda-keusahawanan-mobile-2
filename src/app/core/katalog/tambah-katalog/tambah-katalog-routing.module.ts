import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahKatalogPage } from './tambah-katalog.page';

const routes: Routes = [
  {
    path: '',
    component: TambahKatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahKatalogPageRoutingModule {}
