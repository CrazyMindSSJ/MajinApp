import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroTallerPageRoutingModule } from './registro-taller-routing.module';

import { RegistroTallerPage } from './registro-taller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroTallerPageRoutingModule
  ],
  declarations: [RegistroTallerPage]
})
export class RegistroTallerPageModule {}
