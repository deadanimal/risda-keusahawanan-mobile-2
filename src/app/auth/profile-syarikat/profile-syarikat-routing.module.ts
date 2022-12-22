import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSyarikatPage } from './profile-syarikat.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileSyarikatPage
  },
  {
    path: 'pop-over',
    loadChildren: () => import('./pop-over/pop-over.module').then( m => m.PopOverPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSyarikatPageRoutingModule {}
