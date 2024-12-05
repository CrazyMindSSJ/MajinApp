import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirePagoService } from 'src/app/services/fire-pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  pagoForm: FormGroup; // Formulario para registrar pagos
  mensaje: string = ''; // Mensaje de confirmación o error

  constructor(private pagoService: FirePagoService) {
    // Inicializar formulario
    this.pagoForm = new FormGroup({
      monto: new FormControl('', [Validators.required, Validators.min(1)]),
      fecha: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit() {}

  // Registrar pago en Firestore
  async registrarPago() {
    if (this.pagoForm.invalid) {
      this.mensaje = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    try {
      const nuevoPago = this.pagoForm.value;
      await this.pagoService.createPago(nuevoPago);
      this.mensaje = 'Pago registrado exitosamente.';
      this.pagoForm.reset(); // Reiniciar formulario
    } catch (error) {
      console.error('Error al registrar el pago:', error);
      this.mensaje = 'Ocurrió un error al registrar el pago. Intenta nuevamente.';
    }
  }
}
