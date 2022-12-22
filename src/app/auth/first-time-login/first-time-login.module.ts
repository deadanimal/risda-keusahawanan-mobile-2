import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstTimeLoginPageRoutingModule } from './first-time-login-routing.module';

import { FirstTimeLoginPage } from './first-time-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstTimeLoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FirstTimeLoginPage]
})
export class FirstTimeLoginPageModule {}
