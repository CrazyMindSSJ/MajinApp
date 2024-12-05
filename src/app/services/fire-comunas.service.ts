import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Comuna } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ComunaService {
  private collectionName = 'comunas'; 

  constructor(private fireStore: AngularFirestore) {}

  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection('counters').doc('comunaCounter');
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

  async createComuna(nombre: string): Promise<void> {
    const id_comuna = await this.getNewId();
    const newComuna: Comuna = { id_comuna, nombre };
    await this.fireStore.collection(this.collectionName).doc(String(id_comuna)).set(newComuna);
  }

  getComunas() {
    return this.fireStore.collection<Comuna>(this.collectionName).valueChanges();
  }

  getComuna(id_comuna: number) {
    return this.fireStore.collection<Comuna>(this.collectionName).doc(String(id_comuna)).valueChanges();
  }

  async updateComuna(id_comuna: number, data: Partial<Comuna>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_comuna)).update(data);
  }

  async deleteComuna(id_comuna: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_comuna)).delete();
  }
}
