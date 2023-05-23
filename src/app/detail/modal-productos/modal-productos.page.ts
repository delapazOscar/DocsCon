import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatosfacturaService } from 'src/app/services/datosfactura.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.page.html',
  styleUrls: ['./modal-productos.page.scss'],
})
export class ModalProductosPage implements OnInit {

  productNames: Array<string> = [];
  productDescriptions: Array<string> = [];;
  productPrices: Array<any> = [];
  productQuantitys: Array<any> = [];

  docState: any;

  constructor(private modalCtrl: ModalController, private datosFactura:DatosfacturaService, private alertController: AlertController) {
    this.docState = [
      {
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: ''
      }
    ];
  }

  ngOnInit() {
    this.productNames = this.datosFactura.productNames;
    this.productDescriptions = this.datosFactura.productDescriptions;
    this.productPrices = this.datosFactura.productPrices;
    this.productQuantitys = this.datosFactura.productQuantitys;
    const storedProductsCount = this.productNames.length;
    for (let i = 1; i < storedProductsCount; i++) {
      this.addProduct();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    //debugger;
    const data = {
      //productName: this.productName,
      productNames:this.productNames,
      productDescriptions: this.productDescriptions,
      productPrices: this.productPrices,
      productQuantitys: this.productQuantitys,
    };

    this.datosFactura.productNames = data.productNames;
    this.datosFactura.productDescriptions = data.productDescriptions;
    this.datosFactura.productPrices = data.productPrices;
    this.datosFactura.productQuantitys = data.productQuantitys;

    console.log(this.datosFactura.productNames);
    console.log(this.datosFactura.productDescriptions);
    console.log(this.datosFactura.productPrices);
    console.log(this.datosFactura.productQuantitys);

    return this.modalCtrl.dismiss(this.productNames, 'confirm');
  }

  async addProduct() {
    if (this.docState.length < 5) {
      const newProduct = {
        productNames: '',
        productDescriptions: '',
        productPrices: '',
        productQuantitys: ''
      };
      this.docState.push(newProduct);
    }else{
      const alert = await this.alertController.create({
        header: 'Advertencia',
        subHeader: 'Solo se pueden agregar 5 productos por factura.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }


}
