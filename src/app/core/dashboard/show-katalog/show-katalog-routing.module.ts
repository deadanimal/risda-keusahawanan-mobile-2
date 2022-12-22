import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowKatalogPage } from './show-katalog.page';

const routes: Routes = [
  {
    path: '',
    component: ShowKatalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowKatalogPageRoutingModule {}
