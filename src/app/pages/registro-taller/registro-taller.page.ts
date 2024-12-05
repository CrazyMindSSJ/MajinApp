import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireTallerService } from 'src/app/services/fire-taller.service';

@Component({
  selector: 'app-registro-taller',
  templateUrl: './registro-taller.page.html',
  styleUrls: ['./registro-taller.page.scss'],
})
export class RegistroTallerPage implements OnInit {

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

  constructor(private router: Router, private fireTaller: FireTallerService) { }

  ngOnInit() {}

  // Método de validación personalizada para las fechas
  private validarFechas(): boolean {
    const fechaInicioValue = this.taller.controls.fecha_inicio.value;
    const fechaFinValue = this.taller.controls.fecha_fin.value;

    // Verificamos que no sean null o undefined antes de convertirlas en fechas
    if (!fechaInicioValue || !fechaFinValue) {
      alert("Las fechas no pueden estar vacías.");
      return false;
    }

    const fechaInicio = new Date(fechaInicioValue);
    const fechaFin = new Date(fechaFinValue);
    const fechaActual = new Date();

    // Verificamos que la fecha de inicio no sea anterior a la fecha actual
    if (fechaInicio < fechaActual) {
      alert("La fecha de inicio no puede ser anterior a la fecha actual.");
      return false;
    }

    // Verificamos que la fecha de fin no sea anterior a la fecha actual
    if (fechaFin < fechaActual) {
      alert("La fecha de fin no puede ser anterior a la fecha actual.");
      return false;
    }

    // Verificamos que la fecha de fin no sea anterior a la fecha de inicio
    if (fechaFin < fechaInicio) {
      alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return false;
    }

    return true;
  }

  // Método para registrar el taller
  public async registrar() {
    if (!this.validarFechas()) {
      return; // Si las fechas no son válidas, no continuar con el registro
    }

    // Aquí puedes añadir la lógica adicional para crear el taller
    if (await this.fireTaller.crearTaller(this.taller.value)) {
      this.router.navigate(['/talleres']);  // Redirige después de registrar el taller
      this.taller.reset();  // Resetea el formulario
      alert("Taller creado con éxito!");
    }
  }
}
