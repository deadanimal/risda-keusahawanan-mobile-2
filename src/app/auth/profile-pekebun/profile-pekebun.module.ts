import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePekebunPageRoutingModule } from './profile-pekebun-routing.module';

import { ProfilePekebunPage } from './profile-pekebun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePekebunPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilePekebunPage]
})
export class ProfilePekebunPageModule {}
