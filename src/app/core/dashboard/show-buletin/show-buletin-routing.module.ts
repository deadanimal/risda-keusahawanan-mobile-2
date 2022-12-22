import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowBuletinPage } from './show-buletin.page';

const routes: Routes = [
  {
    path: '',
    component: ShowBuletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowBuletinPageRoutingModule {}
