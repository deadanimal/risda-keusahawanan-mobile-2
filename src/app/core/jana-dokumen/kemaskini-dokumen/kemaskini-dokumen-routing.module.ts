import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KemaskiniDokumenPage } from './kemaskini-dokumen.page';

const routes: Routes = [
  {
    path: '',
    component: KemaskiniDokumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KemaskiniDokumenPageRoutingModule {}
