import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahBuletinPage } from './tambah-buletin.page';

const routes: Routes = [
  {
    path: '',
    component: TambahBuletinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahBuletinPageRoutingModule {}
