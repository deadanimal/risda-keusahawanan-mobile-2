import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AliranTunaiPage } from './aliran-tunai.page';

const routes: Routes = [
  {
    path: '',
    component: AliranTunaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AliranTunaiPageRoutingModule {}
