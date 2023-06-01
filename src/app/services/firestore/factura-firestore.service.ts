import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FacturaFirestoreService {

  fecha: any;
  uid:any;

  pdfOjb:any;

  facturaName:any;

  constructor(private firestore: AngularFirestore, private authService: AuthService,
    private fileOpener: FileOpener, private plt:Platform, private file:File) {
    this.fecha = new Date().toLocaleDateString('ES');
    this.getUid().then((uid) => {
      this.uid = uid;
    });
   }

   async getUid(){
    let uid = await this.authService.getUser();
    return uid;
  }

  async getDocumentData(uid: string, subcoleccion: string, documento: string): Promise<any> {
    try {
      const userRef = this.firestore.collection('users').doc(uid);
      const subcollectionRef = userRef.collection(subcoleccion);
      const documentRef = subcollectionRef.doc(documento);

      const snapshot = await documentRef.get().toPromise();
      if (snapshot && snapshot.exists) {
        const documentData = snapshot.data();
        console.log('Datos del documento:', documentData);
        return documentData;
      } else {
        console.log('El documento no existe.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del documento:', error);
      return null;
    }
  }


  async pdfDownload(userData:any, documentData:any){
    const products = [];
    for (let i = 0; i < documentData.productNames.length; i++) {
      if (documentData.productNames[i]) {
        const product = [
          {
            text: `${documentData.productDescriptions[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: `${documentData.productQuantitys[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: `${documentData.productPrices[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          {
            text: `${documentData.productQuantitys[i] * documentData.productPrices[i]}`,
            border: [false, false, false, true],
            margin: [0, 5, 0, 5],
          },
          // Resto de las propiedades del producto
        ];
        products.push(product);
      }
    }

    const usuario = this.uid;
    const docDef = {
      content: [
        {
          columns: [
            {
              text: `${documentData.companyName}`,
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
                        text: `#${documentData.factNo}`,
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
                        text: `${documentData.fecha}`,
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
                        text: `${documentData.payState}`,
                        bold: true,
                        fontSize: 14,
                        //alignment: 'right',
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
              text: `${documentData.rfcCompany} \n ${documentData.companyName} \n ${documentData.companyNumber}`,
              bold: true,
              color: '#333333',
              //alignment: 'left',
            },
            {
              text: `${documentData.rfcClient} \n ${documentData.clientName} \n ${documentData.cfdiUse} \n ${documentData.clientNumber}`,
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
              text: `${documentData.domicileCompany}, ${documentData.cpCompany}`,
              style: 'invoiceBillingAddress',
            },
            {
              text: `${documentData.domicileClient}, ${documentData.selectedState}`,
              style: 'invoiceBillingAddress',
            },
          ],
        },
        '\n\n',
        {
          width: '100%',
          //alignment: 'center',
          text: `Factura No.${documentData.factNo}`,
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
                  text: `$${documentData.total}`,
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
                  text: `${documentData.moneda} $${documentData.total}`,
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
        {
          text: 'Notas',
          style: 'notesTitle',
        },
        {
          text: 'Algunas notas van aquí',
          style: 'notesText',
        },
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

    this.pdfOjb.download(documentData.facturaName + '.pdf');
    if(this.plt.is('capacitor')){
      this.pdfOjb.getBuffer((buffer: Uint8Array) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(this.file.dataDirectory, `${documentData.facturaName}.pdf`, blob, { replace: true }).then(fileEntry =>{
          this.fileOpener.open(this.file.dataDirectory + `${documentData.facturaName}.pdf`, 'application/pdf');
        });
      });
      return true;
    }else{
      return undefined;
    }
  }

  // openFile(documentData: string){
  //   if(this.plt.is('capacitor')){
  //     this.pdfOjb.getBuffer((buffer: Uint8Array) => {
  //       var blob = new Blob([buffer], { type: 'application/pdf' });

  //       this.file.writeFile(this.file.dataDirectory, `${documentData.facturaName}.pdf`, blob, { replace: true }).then(fileEntry =>{
  //         this.fileOpener.open(this.file.dataDirectory + `${documentData.facturaName}.pdf`, 'application/pdf');
  //       });
  //     });
  //     return true;
  //   }else{
  //     return undefined;
  //   }
  // }

}
