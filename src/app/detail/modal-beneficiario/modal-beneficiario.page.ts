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

  beneficiarioFill: boolean = false;

  constructor(private modalCtrl:ModalController, private datosCheque: DatosChequeService) { }

  ngOnInit() {
    this.beneficiarioName = this.datosCheque.beneficiarioName;
    this.beneficiarioDirection = this.datosCheque.beneficiarioDirection;
    this.beneficiarioNumber = this.datosCheque.beneficiarioNumber;
    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      beneficiarioName: this.beneficiarioName,
      beneficiarioDirection: this.beneficiarioDirection,
      beneficiarioNumber: this.beneficiarioNumber,
      beneficiarioFill: this.beneficiarioFill
    };

    // Asignar los valores de las variables del servicio
    this.datosCheque.beneficiarioName = data.beneficiarioName;
    this.datosCheque.beneficiarioDirection = data.beneficiarioDirection;
    this.datosCheque.beneficiarioNumber = data.beneficiarioNumber;
    data.beneficiarioFill = true;
    this.datosCheque.beneficiarioFill = data.beneficiarioFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.beneficiarioName &&
      this.beneficiarioDirection &&
      this.beneficiarioNumber
    ) {
      this.beneficiarioFill = true;
    } else {
      this.beneficiarioFill = false;
    }
  }

}
