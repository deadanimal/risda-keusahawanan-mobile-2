import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KemaskiniKatalogPage } from './kemaskini-katalog.page';

const routes: Routes = [
  {
    path: '',
    component: KemaskiniKatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemaskiniKatalogPageRoutingModule {}
