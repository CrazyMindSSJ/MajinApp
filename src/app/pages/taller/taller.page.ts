import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FireTallerService } from 'src/app/services/fire-taller.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.page.html',
  styleUrls: ['./taller.page.scss'],
})
export class TallerPage implements OnInit {
  id: string = ''; // ID del taller obtenido de la ruta
  taller: any = {}; // Objeto para almacenar los datos del taller
  usuario: any; // Datos del usuario autenticado desde Firebase Auth
  puedeTomarTaller: boolean = false; // Controla si el usuario puede inscribirse en el taller


  constructor(
    private activatedRoute: ActivatedRoute,
    private fireTallerService: FireTallerService,
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    await this.obtenerUsuario();
    await this.obtenerTaller();

  }

  // Método para obtener los detalles del usuario autenticado
  private async obtenerUsuario() {
    this.usuario = await firstValueFrom(this.fireAuth.authState);
    if (!this.usuario) {
      console.error('Usuario no autenticado');
      return;
    }
    console.log('Usuario autenticado:', this.usuario);
  }

  // Método para obtener los detalles del taller
  async obtenerTaller() {
    const taller = await firstValueFrom(this.fireTallerService.getTaller(this.id));
    if (taller) {
      this.taller = taller;
      this.puedeTomarTaller =
        this.taller.capa_disp > 0 &&
        !(this.taller.usuarios || []).includes(this.usuario?.uid);
    } else {
      console.error('Taller no encontrado');
    }
  }

  // Método para inscribirse en el taller
  async tomarTaller() {
    if (!this.usuario) {
      console.error('Usuario no autenticado');
      return;
    }

    const exito = await this.fireTallerService.tomarTaller(this.id, this.usuario.uid);
    if (exito) {
      console.log('Te has inscrito en el taller');
      await this.obtenerTaller();
    } else {
      console.error('No se pudo inscribir en el taller');
    }

  }

  // Método para salir del taller
  async salirTaller() {
    if (!this.usuario) {
      console.error('Usuario no autenticado');
      return;
    }
    
    const exito = await this.fireTallerService.salirTaller(this.id, this.usuario.uid);
    if (exito) {
      console.log('Has salido del taller');
      await this.obtenerTaller();
    } else {
      console.error('No se pudo salir del taller');
    }
    
  }
  // Método para obtener la lista de talleres
  getTalleres(): Observable<any[]> {
    return this.firestore.collection('talleres').valueChanges();
}
}