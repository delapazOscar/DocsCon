import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosfacturaService } from 'src/app/services/datosfactura.service';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.page.html',
  styleUrls: ['./modal-pago.page.scss'],
})
export class ModalPagoPage implements OnInit {
  selectedPayment: any;
  bankName: any;
  moneda:any;

  constructor(private modalCtrl:ModalController, private datosFactura:DatosfacturaService) { }

  ngOnInit() {
    this.selectedPayment = this.datosFactura.selectedPayment;
    this.bankName = this.datosFactura.bankName;
    this.moneda = this.datosFactura.moneda;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const data={
      selectedPayment:this.selectedPayment,
      bankName: this.bankName,
      moneda: this.moneda
    }

    this.datosFactura.selectedPayment = data.selectedPayment;
    this.datosFactura.bankName = data.bankName;
    this.datosFactura.moneda = data.moneda;

    return this.modalCtrl.dismiss(this.selectedPayment, 'confirm');
  }

}
