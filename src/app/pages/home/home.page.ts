import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: any = null; // Almacenará los datos del usuario autenticado

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.validarUsuario();
  }

  // Método para validar si el usuario está autenticado
  private async validarUsuario() {
    this.usuario = await this.fireAuth.authState.toPromise();

    if (!this.usuario) {
      console.error('Usuario no autenticado. Redirigiendo a la página de inicio de sesión...');
      this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
    } else {
      console.log('Usuario autenticado:', this.usuario);
    }
  }

  // Método para cerrar sesión
  async cerrarSesion() {
    try {
      await this.fireAuth.signOut();
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']); // Redirige al login tras cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
