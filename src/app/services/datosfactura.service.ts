import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { getuid } from 'process';
import { FirestoreDataService } from './firestore-data.service';
import { Platform } from '@ionic/angular';
import { buffer } from 'rxjs';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Plugins } from '@capacitor/core';
import { FileSystem } from '@awesome-cordova-plugins/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatosfacturaService {

  companyName: any;
  domicileCompany: any;
  cpCompany: any;
  rfcCompany: any;
  companyNumber: any;

  rfcClient: any;
  selectedState: any;
  domicileClient: any;
  clientName: any;
  clientNumber: any;
  cfdiUse: any;

  productNames: Array<string> = [];
  productDescriptions: Array<string> = [];;
  productPrices: Array<any> = [];
  productQuantitys: Array<any> = [];

  selectedPayment: any;
  payState: any;
  factNo: any;
  bankName: any;
  moneda:any;

  fecha: any;
  total1:any;
  total2:any;
  total3:any;
  total4:any;
  total5:any;

  total: any;

  iva: any;

  //products: any[] = [];
  [key: string]: any;

  facturaName:any;

  pdfOjb:any;

  uid: any;

  empresafill: boolean = false;
  formaPagoFill: boolean = false;
  productosFill: boolean = false;
  clienteFill: boolean = false;

  constructor(public angularFirestore: AngularFirestore, private authService: AuthService,
    private firestoreData: FirestoreDataService, private fileOpener: FileOpener, private plt:Platform, private file: File) {
    this.fecha = new Date().toLocaleDateString('ES');
    this.getUid();
   }

  calculateTotal() {
      this.total1 = this.productQuantitys[0] * this.productPrices[0];
      this.total2 = this.productQuantitys[1] * this.productPrices[1];
      this.total3 = this.productQuantitys[2] * this.productPrices[2];
      this.total4 = this.productQuantitys[3] * this.productPrices[3];
      this.total5 = this.productQuantitys[4] * this.productPrices[4];

      this.total = 0;
      for (let i = 0; i < this.productQuantitys.length && i < this.productPrices.length; i++) {
        this.total += this.productQuantitys[i] * this.productPrices[i];
      }
  }

  async getUid(){
    let uid = await this.authService.getUser();
    return uid;
  }

  async firestoreFactura(){
    //debugger;
    //await this.getUid();
    const uid = await this.getUid();
    if(uid !== null){
      const subcoleccion = 'facturas';
      const documento = this.facturaName;
      const datos = { // Crea un objeto con los datos que deseas subir
        companyName: this.companyName,
        domicileCompany: this.domicileCompany,
        cpCompany: this.cpCompany,
        rfcCompany: this.rfcCompany,
        companyNumber: this.companyNumber,
        rfcClient: this.rfcClient,
        selectedState: this.selectedState,
        domicileClient: this.domicileClient,
        clientName: this.clientName,
        clientNumber: this.clientNumber,
        cfdiUse: this.cfdiUse,
        productNames: this.productNames,
        productDescriptions: this.productDescriptions,
        productPrices: this.productPrices,
        productQuantitys: this.productQuantitys,
        selectedPayment: this.selectedPayment,
        bankName: this.bankName,
        moneda: this.moneda,
        fecha: this.fecha,
        total: this.total,
        total1: this.total1,
        total2: this.total2,
        total3: this.total3,
        total4: this.total4,
        total5: this.total5,
        facturaName: this.facturaName,
        payState: this.payState,
        factNo: this.factNo,
        name: "Factura",
        icon: "./assets/img/factura.png",
        color: "linear-gradient(to bottom right, #81C9FA, #055084)",
        description: "Este documento se utiliza para registrar una operación comercial y detallar los bienes o servicios que se han vendido, así como el precio de venta y la información fiscal de las partes involucradas en la transacción."
      };
      console.log(datos)
      this.firestoreData.createDocument(datos, uid, subcoleccion, documento);
    }else{
      console.log('Error en UID');
    }
  }

  async pdfDownload(){
    const products = [];
    for (let i = 0; i < this.productNames.length; i++) {
      if (this.productNames[i]) {
        const product = [
          {
            text: `${this.productDescriptions[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: `${this.productQuantitys[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: `${this.productPrices[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: `${this.productQuantitys[i] * this.productPrices[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          // Resto de las propiedades del producto
        ];
        products.push(product);
      }
    }

    const usuario = this.uid;
    this.calculateTotal();
    const docDef = {
      content: [
        {
          columns: [
            {
              text: `${this.companyName}`,
              fontSize: 20,
              bold: true,
              width: 247,
            },
            [
              {
                text: 'Factura',
                color: '#333333',
                width: '*',
                fontSize: 20,
                bold: true,
                //alignment: 'right',
                margins: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Factura No.:',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        //alignment: 'right',
                      },
                      {
                        text: `#${this.factNo}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        //alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Fecha de emisión:',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        //alignment: 'right',
                      },
                      {
                        text: `${this.fecha}`,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        //alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Estatus',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        //alignment: 'right',
                        width: '*',
                      },
                      {
                        text: `${this.payState}`,
                        bold: true,
                        fontSize: 14,
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: '\nDe:',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              //alignment: 'left',
              margins: [0, 20, 0, 5],
            },
            {
              text: '\nPara:',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              //alignment: 'left',
              margins: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: `${this.rfcCompany} \n ${this.companyName} \n ${this.companyNumber}`,
              bold: true,
              color: '#333333',
              //alignment: 'left',
            },
            {
              text: `${this.rfcClient} \n ${this.clientName} \n ${this.cfdiUse} \n ${this.clientNumber}`,
              bold: true,
              color: '#333333',
              //alignment: 'left',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Domicilio',
              color: '#aaaaab',
              bold: true,
              margins: [0, 7, 0, 3],
            },
            {
              text: 'Domicilio',
              color: '#aaaaab',
              bold: true,
              margins: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: `${this.domicileCompany}, ${this.cpCompany}`,
              style: 'invoiceBillingAddress',
            },
            {
              text: `${this.domicileClient}, ${this.selectedState}`,
              style: 'invoiceBillingAddress',
            },
          ],
        },
        '\n\n',
        {
          width: '100%',
          //alignment: 'center',
          text: `Factura No.${this.factNo}`,
          bold: true,
          margins: [0, 10, 0, 10],
          fontSize: 15,
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 80, 80, 80], // Adjust the widths as needed
            body: [
              [
                {
                  text: 'DESCRIPCION DEL PRODUCTO',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'CANTIDAD',
                  border: [false, true, false, true],
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'PRECIO UNITARIO',
                  border: [false, true, false, true],
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'SUBTOTAL',
                  border: [false, true, false, true],
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              ...products,

            ],
          },
        },
        '\n',
        '\n\n',
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Subtotal',
                  border: [false, true, false, true],
                  alignment: 'right',
                  margins: [0, 5, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: `$${this.total}`,
                  alignment: 'right',
                  fillColor: '#f5f5f5',
                  margins: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Total',
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  margins: [0, 5, 0, 5],
                },
                {
                  text: `${this.moneda} $${this.total}`,
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  margins: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n\n',
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margins: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    }

    this.pdfOjb = pdfMake.createPdf(docDef);

    this.pdfOjb.download(this.facturaName + '.pdf');
    await this.firestoreFactura();
    this.openFile();
    this.resetValues();
  }

  openFile(){
    if(this.plt.is('capacitor')){
      this.pdfOjb.getBuffer((buffer: Uint8Array) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(this.file.dataDirectory, `${this.facturaName}.pdf`, blob, { replace: true }).then(fileEntry =>{
          this.fileOpener.open(this.file.dataDirectory + `${this.facturaName}.pdf`, 'application/pdf');
        });
      });
      return true;
    }else{
      return undefined;
    }
  }

  allValuesEntered(): boolean {
    return !!this.companyName && !!this.domicileCompany && !!this.cpCompany && !!this.rfcCompany && !!this.companyNumber &&
           !!this.rfcClient && !!this.selectedState && !!this.domicileClient && !!this.clientName && !!this.clientNumber &&
           !!this.cfdiUse && !!this.productNames && !!this.productDescriptions && !!this.productPrices && !!this.productQuantitys &&
           !!this.selectedPayment && !!this.bankName && !!this.moneda;
  }

  resetValues(){
    this.companyName = null;
    this.domicileCompany = null;
    this.cpCompany = null;
    this.rfcCompany = null;
    this.companyNumber = null;
    this.rfcClient = null;
    this.selectedState = null;
    this.domicileClient = null;
    this.clientName = null;
    this.clientNumber = null;
    this.cfdiUse = null;
    this.productNames = [];
    this.productDescriptions = []
    this.productPrices = [];
    this.productQuantitys = [];
    this.selectedPayment = null;
    this.bankName = null;
    this.moneda = null;
  }

}
