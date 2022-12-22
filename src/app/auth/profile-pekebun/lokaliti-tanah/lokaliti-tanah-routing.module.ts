import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LokalitiTanahPage } from './lokaliti-tanah.page';

const routes: Routes = [
  {
    path: '',
    component: LokalitiTanahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LokalitiTanahPageRoutingModule {}
