import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRegionComunaPageRoutingModule } from './admin-region-comuna-routing.module';

import { AdminRegionComunaPage } from './admin-region-comuna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRegionComunaPageRoutingModule
  ],
  declarations: [AdminRegionComunaPage]
})
export class AdminRegionComunaPageModule {}
