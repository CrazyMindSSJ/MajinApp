// talleres.page.ts
import { Component, OnInit } from '@angular/core';
import { FireTallerService } from 'src/app/services/fire-taller.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
})
export class TalleresPage implements OnInit {
  talleres: any[] = []; // Lista de talleres

  constructor(private tallerService: FireTallerService, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.cargarTalleres();
  }

  // Método para cargar la lista de talleres desde Firestore
  cargarTalleres() {
    this.tallerService.getTalleres().subscribe((data) => {
      this.talleres = data;
    });
  }

  async crearTaller(taller: any): Promise<boolean> {
    try {
      await this.firestore.collection('talleres').add(taller);
      return true;
    } catch (error) {
      console.error('Error al crear el taller:', error);
      return false;
    }
  }

   // Método para obtener la lista de talleres
   getTalleres(): Observable<any[]> {
    return this.firestore.collection('talleres').valueChanges();
  }
}
