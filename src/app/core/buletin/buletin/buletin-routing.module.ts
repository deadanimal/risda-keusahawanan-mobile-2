import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuletinPage } from './buletin.page';

const routes: Routes = [
  {
    path: '',
    component: BuletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuletinPageRoutingModule {}
