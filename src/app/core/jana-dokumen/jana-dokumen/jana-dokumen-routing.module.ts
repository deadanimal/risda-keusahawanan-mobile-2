import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JanaDokumenPage } from './jana-dokumen.page';

const routes: Routes = [
  {
    path: '',
    component: JanaDokumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JanaDokumenPageRoutingModule {}
