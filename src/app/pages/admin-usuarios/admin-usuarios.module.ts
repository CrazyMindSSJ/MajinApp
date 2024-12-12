import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { AdminUsuariosPageRoutingModule } from './admin-usuarios-routing.module';

import { AdminUsuariosPage } from './admin-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de que esto esté aquí
    IonicModule,
    AdminUsuariosPageRoutingModule
  ],
  declarations: [AdminUsuariosPage]
})
export class AdminUsuariosPageModule {}