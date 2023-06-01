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

  prestamoFill: boolean = false;

  constructor(private modalCtrl: ModalController, private datosPrestamo:DatosPrestamoService) { }

  ngOnInit() {
    this.prestamoPeriod = this.datosPrestamo.prestamoPeriod;
    this.prestamoQuantity = this.datosPrestamo.prestamoQuantity;
    this.prestamoPurpose = this.datosPrestamo.prestamoPurpose;
    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      prestamoPeriod: this.prestamoPeriod,
      prestamoQuantity: this.prestamoQuantity,
      prestamoPurpose: this.prestamoPurpose,
      prestamoFill: this.prestamoFill
    };

    // Asignar los valores de las variables del servicio
    this.datosPrestamo.prestamoPeriod = data.prestamoPeriod;
    this.datosPrestamo.prestamoQuantity = data.prestamoQuantity;
    this.datosPrestamo.prestamoPurpose = data.prestamoPurpose;
    data.prestamoFill = true;
    this.datosPrestamo.prestamoFill = data.prestamoFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.prestamoPeriod &&
      this.prestamoQuantity &&
      this.prestamoPurpose
    ) {
      this.prestamoFill = true;
    } else {
      this.prestamoFill = false;
    }
  }

}
