import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSyarikatPageRoutingModule } from './profile-syarikat-routing.module';

import { ProfileSyarikatPage } from './profile-syarikat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileSyarikatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileSyarikatPage]
})
export class ProfileSyarikatPageModule {}
