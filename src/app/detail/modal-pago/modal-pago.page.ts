import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.page.html',
  styleUrls: ['./modal-pago.page.scss'],
})
export class ModalPagoPage implements OnInit {
companyName: any;
selectedPayment: any;

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.companyName, 'confirm');
  }

}
