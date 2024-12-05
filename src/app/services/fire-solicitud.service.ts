import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Solicitud } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  private collectionName = 'solicitudes'; // Nombre de la colección en Firestore
  private counterCollection = 'counters'; // Nombre de la colección para mantener el contador

  constructor(private fireStore: AngularFirestore) {}

  // Método para obtener el nuevo ID autoincrementable
  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection(this.counterCollection).doc('solicitudCounter');
    const counterSnap = await counterRef.get().toPromise();

    if (counterSnap?.exists) {
      const data = counterSnap.data() as { value: number };
      const currentValue = data?.value || 0;
      // Incrementa el contador y lo actualiza en Firestore
      await counterRef.update({ value: currentValue + 1 });
      return currentValue + 1;
    } else {
      // Si no existe el contador, lo inicializa en 1
      await counterRef.set({ value: 1 });
      return 1;
    }
  }

  // Crear una nueva solicitud
  async createSolicitud(solicitud: Solicitud): Promise<void> {
    const id_solicitud = await this.getNewId(); // Obtener el ID autoincrementable
    const newSolicitud = { ...solicitud, id_solicitud }; // Asignar el nuevo ID a la solicitud
    await this.fireStore.collection(this.collectionName).doc(String(id_solicitud)).set(newSolicitud);
  }

  // Leer todas las solicitudes
  getSolicitudes() {
    return this.fireStore.collection<Solicitud>(this.collectionName).valueChanges();
  }

  // Leer una solicitud por ID
  getSolicitudById(id_solicitud: number) {
    return this.fireStore.collection<Solicitud>(this.collectionName).doc(String(id_solicitud)).valueChanges();
  }

  // Actualizar una solicitud
  async updateSolicitud(id_solicitud: number, data: Partial<Solicitud>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_solicitud)).update(data);
  }

  // Eliminar una solicitud
  async deleteSolicitud(id_solicitud: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_solicitud)).delete();
  }
}
