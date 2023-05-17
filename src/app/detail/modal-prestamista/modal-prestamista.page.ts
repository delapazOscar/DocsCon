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

  constructor(private modalCtrl: ModalController, private datosPrestamo:DatosPrestamoService) { }

  ngOnInit() {
    this.prestamistaName = this.datosPrestamo.prestamistaName;
    this.prestamistaDirection = this.datosPrestamo.prestamistaDirection;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      prestamistaName: this.prestamistaName,
      prestamistaDirection: this.prestamistaDirection,
    };

    // Asignar los valores de las variables del servicio
    this.datosPrestamo.prestamistaName = data.prestamistaName;
    this.datosPrestamo.prestamistaDirection = data.prestamistaDirection;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
