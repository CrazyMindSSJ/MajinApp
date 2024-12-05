import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Region } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FireRegionService {
  private collectionName = 'regiones';

  constructor(private fireStore: AngularFirestore) {}

  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection('counters').doc('regionCounter');
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

  async createRegion(nombre: string): Promise<void> {
    const id_region = await this.getNewId();
    const newRegion: Region = { id_region, nombre };
    await this.fireStore.collection(this.collectionName).doc(String(id_region)).set(newRegion);
  }

  getRegions() {
    return this.fireStore.collection<Region>(this.collectionName).valueChanges();
  }

  getRegion(id_region: number) {
    return this.fireStore.collection<Region>(this.collectionName).doc(String(id_region)).valueChanges();
  }

  async updateRegion(id_region: number, data: Partial<Region>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_region)).update(data);
  }

  async deleteRegion(id_region: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_region)).delete();
  }
}
