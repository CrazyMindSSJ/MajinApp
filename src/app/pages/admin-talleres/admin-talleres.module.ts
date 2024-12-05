import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTalleresPageRoutingModule } from './admin-talleres-routing.module';

import { AdminTalleresPage } from './admin-talleres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTalleresPageRoutingModule
  ],
  declarations: [AdminTalleresPage]
})
export class AdminTalleresPageModule {}
