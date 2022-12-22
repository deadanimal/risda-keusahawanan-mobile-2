import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TambahJanaDokumenPage } from './tambah-jana-dokumen.page';

const routes: Routes = [
  {
    path: '',
    component: TambahJanaDokumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahJanaDokumenPageRoutingModule {}
