import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiKatalogPage } from './senarai-katalog.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiKatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiKatalogPageRoutingModule {}
