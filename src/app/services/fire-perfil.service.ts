import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importamos AngularFireAuth
import { Perfil } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private collectionName = 'perfiles'; // Nombre de la colección en Firestore

  constructor(
    private fireStore: AngularFirestore,
    private afAuth: AngularFireAuth // Inyectamos AngularFireAuth para manejar la autenticación
  ) {}

  // Crear un nuevo perfil
  async createPerfil(perfil: Perfil): Promise<void> {
    const user = await this.afAuth.currentUser; // Obtiene el usuario actualmente logeado usando AngularFireAuth
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const rut_usuario = user.uid; // Usamos el UID de Firebase como el id_perfil
    const newPerfil = { ...perfil, id_perfil: rut_usuario }; // Asociamos el rut_usuario (UID) al perfil
    await this.fireStore.collection(this.collectionName).doc(rut_usuario).set(newPerfil);
  }

  // Leer todos los perfiles
  getPerfiles() {
    return this.fireStore.collection<Perfil>(this.collectionName).valueChanges();
  }

  // Leer un perfil por ID (rut_usuario)
  getPerfil(rut_usuario: string) {
    return this.fireStore.collection<Perfil>(this.collectionName).doc(rut_usuario).valueChanges();
  }

  // Actualizar un perfil
  async updatePerfil(rut_usuario: string, data: Partial<Perfil>): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(rut_usuario).update(data);
  }

  // Eliminar un perfil
  async deletePerfil(rut_usuario: string): Promise<void> {
    await this.fireStore.collection(this.collectionName).doc(rut_usuario).delete();
  }
}
