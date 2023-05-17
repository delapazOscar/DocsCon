import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPrestamoService } from 'src/app/services/datos-prestamo.service';

@Component({
  selector: 'app-modal-prestatario',
  templateUrl: './modal-prestatario.page.html',
  styleUrls: ['./modal-prestatario.page.scss'],
})
export class ModalPrestatarioPage implements OnInit {

  prestatarioName: any;
  prestatarioDirection: any;

  constructor(private modalCtrl: ModalController, private datosPrestamo: DatosPrestamoService) { }

  ngOnInit() {
    this.prestatarioName = this.datosPrestamo.prestatarioName;
    this.prestatarioDirection = this.datosPrestamo.prestatarioDirection;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      prestatarioName: this.prestatarioName,
      prestatarioDirection: this.prestatarioDirection,
    };

    // Asignar los valores de las variables del servicio
    this.datosPrestamo.prestatarioDirection = data.prestatarioDirection;
    this.datosPrestamo.prestatarioName = data.prestatarioName;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
