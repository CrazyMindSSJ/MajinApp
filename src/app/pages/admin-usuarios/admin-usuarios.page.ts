import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireUsuarioService } from 'src/app/services/fire-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.page.html',
  styleUrls: ['./admin-usuarios.page.scss'],
})
export class AdminUsuariosPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern("[0-9]{7,8}-[0-9k]{1}")]),
    nombre: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    apellido: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    direccion: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.pattern("(9)[0-9]{9}")]),
    correo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@gmail.com)")]),
    contra: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    contraVali: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    tipo_usuario: new FormControl('', [Validators.required]),
    comuna: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required])
  });

  usuarios: any[] = [];

  constructor(
    private fireUsuarioService: FireUsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  // Método para cargar todos los usuarios
  cargarUsuarios() {
    this.fireUsuarioService.getUsuarios().subscribe((data: any[]) => {
      this.usuarios = data;
    });
  }

  // Método para crear un nuevo usuario
  async crearUsuario() {
    if (this.usuario.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    if (this.usuario.controls.contra.value !== this.usuario.controls.contraVali.value) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const usuarioData = this.usuario.value;
    const creado = await this.fireUsuarioService.crearUsuario(usuarioData);

    if (creado) {
      alert('Usuario creado con éxito!');
      this.limpiarFormulario(); // Limpiar el formulario después de crear el usuario
      this.cargarUsuarios(); // Recargar la lista de usuarios
    } else {
      alert('El usuario ya existe.');
    }
  }

  // Método para actualizar un usuario
  async actualizarUsuario() {
    if (this.usuario.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const usuarioData = this.usuario.value;
    await this.fireUsuarioService.updateUsuario(usuarioData);
    alert('Usuario actualizado con éxito!');
    this.limpiarFormulario();
    this.cargarUsuarios();
  }

  // Método para eliminar un usuario
  async eliminarUsuario(rut: string) {
    const confirm = window.confirm('¿Está seguro de que desea eliminar este usuario?');
    if (confirm) {
      await this.fireUsuarioService.deleteUsuario(rut);
      alert('Usuario eliminado con éxito!');
      this.cargarUsuarios();
    }
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.usuario.reset();
  }

  // Método para seleccionar un usuario para editar
  editarUsuario(usuario: any) {
    this.usuario.setValue({
      rut: usuario.rut,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      direccion: usuario.direccion,
      fecha_nacimiento: usuario.fecha_nacimiento,
      genero: usuario.genero,
      telefono: usuario.telefono,
      correo: usuario.correo,
      contra: usuario.contra,
      contraVali: usuario.contraVali,
      tipo_usuario: usuario.tipo_usuario,
      comuna: usuario.comuna,
      region: usuario.region,
    });
  }
}
