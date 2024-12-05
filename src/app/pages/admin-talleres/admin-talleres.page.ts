import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireTallerService } from 'src/app/services/fire-taller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-talleres',
  templateUrl: './admin-talleres.page.html',
  styleUrls: ['./admin-talleres.page.scss'],
})
export class AdminTalleresPage implements OnInit {

  taller = new FormGroup({
    instructor: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    rut_instructor: new FormControl('', [Validators.required, Validators.pattern("[0-9]{7,8}-[0-9k]{1}")]),
    capa_disp: new FormControl('', [Validators.required]),
    nombre_taller: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    fecha_inicio: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
    usuarios: new FormControl([]),
    usuariosNombres: new FormControl([]),
    materiales: new FormControl([]),
    estado: new FormControl()
  });

  talleres: any[] = [];

  constructor(
    private fireTallerService: FireTallerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarTalleres();
  }

  // Método para cargar todos los talleres
  cargarTalleres() {
    this.fireTallerService.getTalleres().subscribe((data: any[]) => {
      this.talleres = data;
    });
  }

  // Método para crear un nuevo taller
  async crearTaller() {
    if (this.taller.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const tallerData = this.taller.value;
    const creado = await this.fireTallerService.crearTaller(tallerData);

    if (creado) {
      alert('Taller creado con éxito!');
      this.limpiarFormulario(); // Limpiar el formulario después de crear el taller
      this.cargarTalleres(); // Recargar la lista de talleres
    } else {
      alert('Hubo un problema al crear el taller.');
    }
  }

  // Método para actualizar un taller
  async actualizarTaller() {
    if (this.taller.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const tallerData = this.taller.value;
    await this.fireTallerService.updateTaller(tallerData);
    alert('Taller actualizado con éxito!');
    this.limpiarFormulario();
    this.cargarTalleres();
  }

  // Método para eliminar un taller
  async eliminarTaller(id_taller: string) {
    const confirm = window.confirm('¿Está seguro de que desea eliminar este taller?');
    if (confirm) {
      await this.fireTallerService.deleteTaller(id_taller);
      alert('Taller eliminado con éxito!');
      this.cargarTalleres();
    }
  }

  // Método para limpiar el formulario
  limpiarFormulario() {
    this.taller.reset();
  }

  // Método para seleccionar un taller para editar
  editarTaller(taller: any) {
    this.taller.setValue({
      instructor: taller.instructor,
      rut_instructor: taller.rut_instructor,
      capa_disp: taller.capa_disp,
      nombre_taller: taller.nombre_taller,
      fecha_inicio: taller.fecha_inicio,
      fecha_fin: taller.fecha_fin,
      usuarios: taller.usuarios,
      usuariosNombres: taller.usuariosNombres,
      materiales: taller.materiales,
      estado: taller.estado
    });
  }

}
