import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from "../types"
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FireUsuarioService {

  constructor(private fireStore: AngularFirestore, private fireAuth: AngularFireAuth, private alertController: AlertController) { }

  async crearUsuario(usuario:any){
  const docRef = this.fireStore.collection('usuarios').doc(usuario.rut);
  const docActual = await docRef.get().toPromise();
  if(docActual?.exists){
  return false;
  }

  const credencialesUsuario = await this.fireAuth.createUserWithEmailAndPassword(usuario.email,usuario.contra);
  const uid = credencialesUsuario.user?.uid;
  await docRef.set({...usuario});
  return true;
  }

  getUsuarios(){
  return this.fireStore.collection('usuarios').valueChanges();
  }

  getUsuario(rut: string){
  return this.fireStore.collection('usuarios').doc<Usuario>(rut).valueChanges();
  }

  updateUsuario(usuario: any){
  return this.fireStore.collection('usuarios').doc(usuario.rut).update(usuario);
  }

  deleteUsuario(rut: string){
  return this.fireStore.collection('usuarios').doc(rut).delete();
  }

  public async login(correo: string, contrasena: string): Promise<boolean> {
    await this.fireAuth.signInWithEmailAndPassword(correo, contrasena);
      
      const usuariosSnapshot = await this.fireStore.collection('usuarios', ref => ref.where('correo', '==', correo)).get().toPromise();
      
      if (usuariosSnapshot && !usuariosSnapshot.empty) {
        const usuario = usuariosSnapshot.docs[0].data() as { rut: string; nombre: string };
        const rut = usuario.rut || '';
        const nombre = usuario.nombre || '';
    
        localStorage.setItem('userRut', rut);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('nombreConductor', nombre);
        
        return true;
      }
      
      return false;
  }


  async recuperarContrasena(email: string): Promise<void> {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha enviado el restablecimiento de la Contraseña a su Correo',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: this.obtenerMensajeError(error.code),
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  private obtenerMensajeError(codigo: string): string {
    switch (codigo) {
      case 'auth/user-not-found':
        return 'No existe este correo';
      case 'auth/invalid-email':
        return 'El correo ingresado no es válido.';
      default:
        return 'Ocurrió un error. Intente nuevamente.';
    }
  }
}
