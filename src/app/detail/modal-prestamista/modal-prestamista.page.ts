import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPrestamoService } from 'src/app/services/datos-prestamo.service';

@Component({
  selector: 'app-modal-prestamista',
  templateUrl: './modal-prestamista.page.html',
  styleUrls: ['./modal-prestamista.page.scss'],
})
export class ModalPrestamistaPage implements OnInit {

  prestamistaName: any;
  prestamistaDirection: any;

  prestamistaFill: boolean = false;

  constructor(private modalCtrl: ModalController, private datosPrestamo:DatosPrestamoService) { }

  ngOnInit() {
    this.prestamistaName = this.datosPrestamo.prestamistaName;
    this.prestamistaDirection = this.datosPrestamo.prestamistaDirection;
    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      prestamistaName: this.prestamistaName,
      prestamistaDirection: this.prestamistaDirection,
      prestamistaFill: this.prestamistaFill
    };

    // Asignar los valores de las variables del servicio
    this.datosPrestamo.prestamistaName = data.prestamistaName;
    this.datosPrestamo.prestamistaDirection = data.prestamistaDirection;
    data.prestamistaFill = true;
    this.datosPrestamo.prestamistaFill = data.prestamistaFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.prestamistaName &&
      this.prestamistaDirection
    ) {
      this.prestamistaFill = true;
    } else {
      this.prestamistaFill = false;
    }
  }

}
