import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pago } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FirePagoService {
  private collectionName = 'pagos'; // Nombre de la colección en Firestore
  private counterCollection = 'counters'; // Nombre de la colección para mantener el contador

  constructor(private fireStore: AngularFirestore) {}

  // Método para obtener el nuevo ID autoincrementable
  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection(this.counterCollection).doc('pagoCounter');
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

  // Crear un nuevo pago
  async createPago(pago: Pago): Promise<void> {
    const id_pago = await this.getNewId(); // Obtener el ID autoincrementable
    const newPago = { ...pago, id_pago }; // Asignar el nuevo ID al pago
    await this.fireStore.collection(this.collectionName).doc(String(id_pago)).set(newPago);
  }

  // Leer todos los pagos
  getPagos() {
    return this.fireStore.collection<Pago>(this.collectionName).valueChanges();
  }

  // Leer un pago por ID
  getPago(id_pago: number) {
    return this.fireStore.collection<Pago>(this.collectionName).doc(String(id_pago)).valueChanges();
  }

  // Actualizar un pago
  async updatePago(id_pago: number, data: Partial<Pago>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_pago)).update(data);
  }

  // Eliminar un pago
  async deletePago(id_pago: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_pago)).delete();
  }
}
