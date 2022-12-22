import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RingkasanLejarPage } from './ringkasan-lejar.page';

const routes: Routes = [
  {
    path: '',
    component: RingkasanLejarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RingkasanLejarPageRoutingModule {}
