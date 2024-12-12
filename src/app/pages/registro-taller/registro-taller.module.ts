import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroTallerPageRoutingModule } from './registro-taller-routing.module';
import { RegistroTallerPage } from './registro-taller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroTallerPageRoutingModule,
    ReactiveFormsModule // Añade ReactiveFormsModule aquí
  ],
  declarations: [RegistroTallerPage]
})
export class RegistroTallerPageModule {}