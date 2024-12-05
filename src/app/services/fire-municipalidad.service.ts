import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Municipalidad } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FireMunicipalidadService {
  private collectionName = 'municipalidades'; // Nombre de la colección en Firestore

  constructor(private fireStore: AngularFirestore) {}

  // Obtener un nuevo ID autoincremental
  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection('counters').doc('municipalidadCounter');
    const counterSnap = await counterRef.get().toPromise();

    if (counterSnap?.exists) {
      const data = counterSnap.data() as { value: number };
      const currentValue = data?.value || 0;

      await counterRef.update({ value: currentValue + 1 });
      return currentValue + 1;
    } else {
      await counterRef.set({ value: 1 });
      return 1;
    }
  }

  // Crear una nueva municipalidad
  async createMunicipalidad(municipalidad: Municipalidad): Promise<void> {
    const id_muni = await this.getNewId();
    const newMunicipalidad = { ...municipalidad, id_muni }; // Agregamos el ID generado al objeto
    await this.fireStore.collection(this.collectionName).doc(String(id_muni)).set(newMunicipalidad);
  }
  

  // Leer todas las municipalidades
  getMunicipalidades() {
    return this.fireStore.collection<Municipalidad>(this.collectionName).valueChanges();
  }

  // Leer una municipalidad por ID
  getMunicipalidad(id_muni: number) {
    return this.fireStore.collection<Municipalidad>(this.collectionName).doc(String(id_muni)).valueChanges();
  }

  // Actualizar una municipalidad
  async updateMunicipalidad(id_muni: number, data: Partial<Municipalidad>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_muni)).update(data);
  }

  // Eliminar una municipalidad
  async deleteMunicipalidad(id_muni: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_muni)).delete();
  }
}
