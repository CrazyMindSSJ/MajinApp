import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Taller } from "../types"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireTallerService {

  constructor(private fireStore: AngularFirestore) { }

  private async getNewId(): Promise<number> {
    const counterRef = this.fireStore.collection('counters').doc('tripCounter');
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

  async crearTaller(taller: any) {
    try {
      const newId = await this.getNewId();
      taller.id = newId;

      const docRef = this.fireStore.collection('talleres').doc(newId.toString());
      const docActual = await docRef.get().toPromise();

      if (docActual?.exists) {
        throw new Error('El item ya existe.');
      }

      await docRef.set(taller);
      return true;
    } catch (error) {
      console.error('Error al crear taller:', error);
      return false;
    }
  }

  getTalleres(){
    return this.fireStore.collection('talleres').valueChanges();
  }

  getTaller(id: string): Observable<any> {
    return this.fireStore
      .collection('talleres')
      .doc(id)
      .valueChanges(); // Asegúrate de que esta ruta es correcta.
  }

  updateTaller(taller: any){
    return this.fireStore.collection('talleres').doc(taller.id_taller).update(taller);
  }

  deleteTaller(id_taller: string){
    return this.fireStore.collection('talleres').doc(id_taller).delete();
  }

  public async tomarTaller(id_taller: string, rut: string): Promise<boolean> {
    try {
      const tallerDoc = this.fireStore.collection('talleres').doc(id_taller);
      const tallerSnap = await tallerDoc.get().toPromise();
  
      if (!tallerSnap?.exists) return false;
  
      const taller = tallerSnap.data() as any;
  
      if (taller.capa_disp <= 0 || (taller.usuarios && taller.usuarios.includes(rut))) return false;
  
      const nuevosUsuarios = [...(taller.usuarios || []), rut];
      const nuevaCapacidad = taller.capa_disp - 1;
  
      await tallerDoc.update({
        usuarios: nuevosUsuarios,
        capa_disp: nuevaCapacidad
      });
  
      return true;
    } catch (error) {
      console.error("Error al inscribirse en taller:", error);
      return false;
    }
  }

  public async salirTaller(id_taller: string, rut: string): Promise<boolean> {
    try {
      const tallerDoc = this.fireStore.collection('talleres').doc(id_taller);
      const tallerSnap = await tallerDoc.get().toPromise();
  
      if (!tallerSnap?.exists) return false;
  
      const taller = tallerSnap.data() as any;
        if (!taller.pasajeros || !taller.pasajeros.includes(rut)) return false;
  
      const nuevosPasajeros = taller.pasajeros.filter((pasajero: string) => pasajero !== rut);
      const nuevaCapacidad = taller.capa_disp + 1;
  
      await tallerDoc.update({
        pasajeros: nuevosPasajeros,
        capa_disp: nuevaCapacidad
      });
  
      return true;
    } catch (error) {
      console.error("Error al salir del viaje:", error);
      return false;
    }
  }

}


