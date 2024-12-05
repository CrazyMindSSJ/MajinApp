import { Component, OnInit } from '@angular/core';
import { FirePagoService } from 'src/app/services/fire-pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {
  pagos: any[] = []; // Lista de pagos

  constructor(private pagoService: FirePagoService) {}

  ngOnInit() {
    this.cargarPagos();
  }

  // Cargar todos los pagos desde Firestore
  cargarPagos() {
    this.pagoService.getPagos().subscribe((data) => {
      this.pagos = data;
    });
  }
}
