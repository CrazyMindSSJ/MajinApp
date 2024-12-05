import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireComunaService } from 'src/app/services/fire-comunas.service';
import { FireRegionService } from 'src/app/services/fire-region.service';



@Component({
  selector: 'app-admin-region-comuna',
  templateUrl: './admin-region-comuna.page.html',
  styleUrls: ['./admin-region-comuna.page.scss'],
})
export class AdminRegionComunaPage implements OnInit {
  regionForm: FormGroup;
  comunaForm: FormGroup;

  regiones: any[] = [];
  comunas: any[] = [];

  constructor(private regionService: FireRegionService, private comunaService: FireComunaService) {
    this.regionForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    });

    this.comunaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    });
  }

  ngOnInit() {
    this.cargarRegiones();
    this.cargarComunas();
  }

  // Métodos para regiones
  async crearRegion() {
    if (this.regionForm.invalid) {
      alert('Por favor, ingrese un nombre válido para la región.');
      return;
    }

    const { nombre } = this.regionForm.value;
    await this.regionService.createRegion(nombre);
    alert('Región creada con éxito!');
    this.regionForm.reset();
    this.cargarRegiones();
  }

  cargarRegiones() {
    this.regionService.getRegions().subscribe((data) => {
      this.regiones = data;
    });
  }

  async eliminarRegion(id_region: number) {
    const confirm = window.confirm('¿Está seguro de que desea eliminar esta región?');
    if (confirm) {
      await this.regionService.deleteRegion(id_region);
      alert('Región eliminada con éxito!');
      this.cargarRegiones();
    }
  }

  // Métodos para comunas
  async crearComuna() {
    if (this.comunaForm.invalid) {
      alert('Por favor, ingrese un nombre válido para la comuna.');
      return;
    }

    const { nombre } = this.comunaForm.value;
    await this.comunaService.createComuna(nombre);
    alert('Comuna creada con éxito!');
    this.comunaForm.reset();
    this.cargarComunas();
  }

  cargarComunas() {
    this.comunaService.getComunas().subscribe((data) => {
      this.comunas = data;
    });
  }

  async eliminarComuna(id_comuna: number) {
    const confirm = window.confirm('¿Está seguro de que desea eliminar esta comuna?');
    if (confirm) {
      await this.comunaService.deleteComuna(id_comuna);
      alert('Comuna eliminada con éxito!');
      this.cargarComunas();
    }
  }
}
