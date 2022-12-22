import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenaraiBuletinPage } from './senarai-buletin.page';

const routes: Routes = [
  {
    path: '',
    component: SenaraiBuletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenaraiBuletinPageRoutingModule {}
