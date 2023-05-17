import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosChequeService } from 'src/app/services/datos-cheque.service';

@Component({
  selector: 'app-modal-detallescheque',
  templateUrl: './modal-detallescheque.page.html',
  styleUrls: ['./modal-detallescheque.page.scss'],
})
export class ModalDetalleschequePage implements OnInit {

  montoCheque:any;
  accountNumber: any;
  bankName: any;

  constructor(private modalCtrl:ModalController, private datosCheque:DatosChequeService) { }

  ngOnInit() {
    this.bankName = this.datosCheque.bankName;
    this.accountNumber = this.datosCheque.accountNumber;
    this.montoCheque = this.datosCheque.montoCheque;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      montoCheque: this.montoCheque,
      accountNumber: this.accountNumber,
      bankName: this.bankName
    };

    // Asignar los valores de las variables del servicio
    this.datosCheque.montoCheque = data.montoCheque;
    this.datosCheque.accountNumber = data.accountNumber;
    this.datosCheque.bankName = data.bankName;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
