import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawatanUsahawanPage } from './lawatan-usahawan.page';

const routes: Routes = [
  {
    path: '',
    component: LawatanUsahawanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawatanUsahawanPageRoutingModule {}
