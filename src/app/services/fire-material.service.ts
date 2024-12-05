import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Material } from '../types';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private collectionName = 'materiales'; // Nombre de la colección en Firestore

  constructor(private fireStore: AngularFirestore) {}

  // Obtener un nuevo ID autoincremental
  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection('counters').doc('materialCounter');
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

  // Crear un nuevo material
  async createMaterial(material: Material): Promise<void> {
    const id_material = await this.getNewId();
    const newMaterial = { ...material, id_material }; // Agregamos el ID generado al objeto
    await this.fireStore.collection(this.collectionName).doc(String(id_material)).set(newMaterial);
  }

  // Leer todos los materiales
  getMateriales() {
    return this.fireStore.collection<Material>(this.collectionName).valueChanges();
  }

  // Leer un material por ID
  getMaterial(id_material: number) {
    return this.fireStore.collection<Material>(this.collectionName).doc(String(id_material)).valueChanges();
  }

  // Actualizar un material
  async updateMaterial(id_material: number, data: Partial<Material>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_material)).update(data);
  }

  // Eliminar un material
  async deleteMaterial(id_material: number): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(String(id_material)).delete();
  }
}
