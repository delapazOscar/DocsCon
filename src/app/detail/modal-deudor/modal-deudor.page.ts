import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPagareService } from 'src/app/services/datos-pagare.service';

@Component({
  selector: 'app-modal-deudor',
  templateUrl: './modal-deudor.page.html',
  styleUrls: ['./modal-deudor.page.scss'],
})
export class ModalDeudorPage implements OnInit {

  deudorName: any;
  deudorDomicile: any;
  deudorNumber: any;

  deudorFill: boolean = false;

  constructor(private modalCtrl:ModalController, private datosPagare: DatosPagareService) { }

  ngOnInit() {
    this.deudorName = this.datosPagare.deudorName;
    this.deudorDomicile = this.datosPagare.deudorDomicile;
    this.deudorNumber = this.datosPagare.deudorNumber;

    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      deudorName: this.deudorName,
      deudorDomicile: this.deudorDomicile,
      deudorNumber: this.deudorNumber,
      deudorFill: this.deudorFill
    };

    // Asignar los valores de las variables del servicio
    this.datosPagare.deudorName = data.deudorName;
    this.datosPagare.deudorDomicile = data.deudorDomicile;
    this.datosPagare.deudorNumber = data.deudorNumber;
    data.deudorFill = true;
    this.datosPagare.deudorFill = data.deudorFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.deudorName &&
      this.deudorDomicile &&
      this.deudorNumber
    ) {
      this.deudorFill = true;
    } else {
      this.deudorFill = false;
    }
  }

}
