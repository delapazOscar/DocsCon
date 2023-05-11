import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPagareService } from 'src/app/services/datos-pagare.service';

@Component({
  selector: 'app-modal-acredor',
  templateUrl: './modal-acredor.page.html',
  styleUrls: ['./modal-acredor.page.scss'],
})
export class ModalAcredorPage implements OnInit {

  acredorName:any;

  constructor(private modalCtrl:ModalController, private datosPagare: DatosPagareService) { }

  ngOnInit() {
    this.acredorName = this.datosPagare.acredorName;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      acredorName: this.acredorName
    };

    //Asignar los valores de las variables del servicio
    this.datosPagare.acredorName = data.acredorName;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
