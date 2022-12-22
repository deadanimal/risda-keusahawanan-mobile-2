import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KemaskiniBuletinPage } from './kemaskini-buletin.page';

const routes: Routes = [
  {
    path: '',
    component: KemaskiniBuletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemaskiniBuletinPageRoutingModule {}
