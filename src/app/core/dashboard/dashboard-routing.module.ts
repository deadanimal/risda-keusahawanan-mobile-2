import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'senarai-katalog',
    loadChildren: () => import('./senarai-katalog/senarai-katalog.module').then( m => m.SenaraiKatalogPageModule)
  },
  {
    path: 'show-katalog',
    loadChildren: () => import('./show-katalog/show-katalog.module').then( m => m.ShowKatalogPageModule)
  },
  {
    path: 'senarai-buletin',
    loadChildren: () => import('./senarai-buletin/senarai-buletin.module').then( m => m.SenaraiBuletinPageModule)
  },
  {
    path: 'show-buletin',
    loadChildren: () => import('./show-buletin/show-buletin.module').then( m => m.ShowBuletinPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
