import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosChequeService } from 'src/app/services/datos-cheque.service';

@Component({
  selector: 'app-modal-beneficiario',
  templateUrl: './modal-beneficiario.page.html',
  styleUrls: ['./modal-beneficiario.page.scss'],
})
export class ModalBeneficiarioPage implements OnInit {

  beneficiarioName: any;
  beneficiarioDirection: any;
  beneficiarioNumber: any;

  constructor(private modalCtrl:ModalController, private datosCheque: DatosChequeService) { }

  ngOnInit() {
    this.beneficiarioName = this.datosCheque.beneficiarioName;
    this.beneficiarioDirection = this.datosCheque.beneficiarioDirection;
    this.beneficiarioNumber = this.datosCheque.beneficiarioNumber;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      beneficiarioName: this.beneficiarioName,
      beneficiarioDirection: this.beneficiarioDirection,
      beneficiarioNumber: this.beneficiarioNumber
    };

    // Asignar los valores de las variables del servicio
    this.datosCheque.beneficiarioName = data.beneficiarioName;
    this.datosCheque.beneficiarioDirection = data.beneficiarioDirection;
    this.datosCheque.beneficiarioNumber = data.beneficiarioNumber;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
