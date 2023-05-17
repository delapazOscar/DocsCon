import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPrestamoService } from 'src/app/services/datos-prestamo.service';

@Component({
  selector: 'app-modal-prestamo',
  templateUrl: './modal-prestamo.page.html',
  styleUrls: ['./modal-prestamo.page.scss'],
})
export class ModalPrestamoPage implements OnInit {

  prestamoPeriod: any;
  prestamoQuantity: any;
  prestamoPurpose: any;

  constructor(private modalCtrl: ModalController, private datosPrestamo:DatosPrestamoService) { }

  ngOnInit() {
    this.prestamoPeriod = this.datosPrestamo.prestamoPeriod;
    this.prestamoQuantity = this.datosPrestamo.prestamoQuantity;
    this.prestamoPurpose = this.datosPrestamo.prestamoPurpose;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      prestamoPeriod: this.prestamoPeriod,
      prestamoQuantity: this.prestamoQuantity,
      prestamoPurpose: this.prestamoPurpose
    };

    // Asignar los valores de las variables del servicio
    this.datosPrestamo.prestamoPeriod = data.prestamoPeriod;
    this.datosPrestamo.prestamoQuantity = data.prestamoQuantity;
    this.datosPrestamo.prestamoPurpose = data.prestamoPurpose;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
