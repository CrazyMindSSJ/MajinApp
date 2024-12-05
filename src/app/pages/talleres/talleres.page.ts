import { Component, OnInit } from '@angular/core';
import { FireTallerService } from 'src/app/services/fire-taller.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
})
export class TalleresPage implements OnInit {
  talleres: any[] = []; // Lista de talleres

  constructor(private tallerService: FireTallerService) {}

  ngOnInit() {
    this.cargarTalleres();
  }

  // Método para cargar la lista de talleres desde Firestore
  cargarTalleres() {
    this.tallerService.getTalleres().subscribe((data) => {
      this.talleres = data;
    });
  }
}
