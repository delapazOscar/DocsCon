import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPrestamoService } from 'src/app/services/datos-prestamo.service';

@Component({
  selector: 'app-modal-garante',
  templateUrl: './modal-garante.page.html',
  styleUrls: ['./modal-garante.page.scss'],
})
export class ModalGarantePage implements OnInit {

  garanteName: any;
  garanteDirection: any;

  constructor(private modalCtrl: ModalController, private datosPrestamo:DatosPrestamoService) { }

  ngOnInit() {
    this.garanteName = this.datosPrestamo.garanteName;
    this.garanteDirection = this.datosPrestamo.garanteDirection;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      garanteName: this.garanteName,
      garanteDirection: this.garanteDirection,
    };

    // Asignar los valores de las variables del servicio
    this.datosPrestamo.garanteName = data.garanteName;
    this.datosPrestamo.garanteDirection = data.garanteDirection;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
