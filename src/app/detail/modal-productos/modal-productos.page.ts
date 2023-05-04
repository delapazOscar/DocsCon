import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosfacturaService } from 'src/app/services/datosfactura.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.page.html',
  styleUrls: ['./modal-productos.page.scss'],
})
export class ModalProductosPage implements OnInit {

  productName:string| undefined;
  productDescription: any;
  productPrice: any;
  productQuantity: any;

  constructor(private modalCtrl: ModalController, private datosFactura:DatosfacturaService) { }

  ngOnInit() {
    this.productName = this.datosFactura.productName;
    this.productDescription = this.datosFactura.productDescription;
    this.productPrice = this.datosFactura.productPrice;
    this.productQuantity = this.datosFactura.productQuantity;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const data = {
      productName: this.productName,
      productDescription: this.productDescription,
      productPrice: this.productPrice,
      productQuantity: this.productQuantity
    }

    this.datosFactura.productName = data.productName;
    this.datosFactura.productDescription = data.productDescription;
    this.datosFactura.productPrice = data.productPrice;
    this.datosFactura.productQuantity = data.productQuantity;

    return this.modalCtrl.dismiss(this.productName, 'confirm');
  }

}
