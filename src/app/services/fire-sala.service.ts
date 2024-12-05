import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sala } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private collectionName = 'salas'; 

  constructor(private fireStore: AngularFirestore) {}

  // Obtener un nuevo ID autoincremental
  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection('counters').doc('salaCounter');
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

  async createSala(nom_sala: string, id_taller: number): Promise<void> {
    const id_sala = await this.getNewId();
    const newSala: Sala = { id_sala, nom_sala, id_taller };
    await this.fireStore.collection(this.collectionName).doc(String(id_sala)).set(newSala);
  }

  getSalas() {
    return this.fireStore.collection<Sala>(this.collectionName).valueChanges();
  }

  getSala(id_sala: number) {
    return this.fireStore.collection<Sala>(this.collectionName).doc(String(id_sala)).valueChanges();
  }

  async updateSala(id_sala: number, data: Partial<Sala>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_sala)).update(data);
  }

  async deleteSala(id_sala: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_sala)).delete();
  }
}
