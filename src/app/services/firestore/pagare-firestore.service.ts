import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PagareFirestoreService {

  pdfOjb:any;

  constructor(private firestore:AngularFirestore) { }

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

  async pdfDownload(userData: any, documentData: any){
    const quantityLetterdos = this.convertirNumeroALetras(documentData.acuerdoQuantity);
    const docDef = {
      pageSize: {
        width: 800,
        height: 520 // intercambio de alto y ancho, A4 es 595 x 842
    },

      content: [
        {
          //alignments: 'justify',
          columnGap: 30,
          style: 'title',
          columns: [
            {
              text: 'Pagaré'
            },
            {
              text: `Lugar:   ${documentData.selectedState}, ${documentData.acuerdoMunicipio} \n Fecha:   ${documentData.dateAcuerdo}`,
              fontSize: 15,
              //alignment: 'left',
              lineHeight: 1.5,
              margins: [40, 0, 0, 0]
            },

          ]
        },
        {
            text: ` \n Debo y pagaré incondicionalmente este pagaré a la orden de ${documentData.acredorName} en ${documentData.selectedState}, ${documentData.acuerdoMunicipio} en la fecha: ${documentData.dateAcuerdo} la cantidad de $${documentData.acuerdoQuantity} en moneda: ${documentData.moneda} en letra:  \n `,
            margins: [0, 0, 0, 0],
            fontSize: 15
        },
        {
          table: {
              widths: ['*'],
              heights: 30,
            body: [
              [{text: `${quantityLetterdos}`, alignments: 'center', fontSize: 16, bold: true}],
            ],
            style: 'tableStyle'
          },
        },
        {
            text: ` \n Este pagaré forma parte de una serie numerada y todos están sujetos a la condición de que al, no pagarse cualquiera de ellos a su fecha de vencimiento serán exigibles todos los que le sigan en número además de los ya vencidos, desde la fecha de vencimiento de este documento hasta el día de su liquidación, causará intereses moratorios al tipo de ${documentData.acuerdoInteres}% mensual.\n `,
            margins: [0, 0, 0, 0],
            //alignment: 'justify',
            fontSize: 15
        },
        {
            columns: [
            {
                  table: {
                      widths: ['*'],
                      heights: 30,
                    body: [
                      [{text: 'Datos del deudor', fontSize: 16, bold: true }],
                      [{text: `Nombre: ${documentData.deudorName}`, fontSize: 16}],
                      [{text: `Domicilio: ${documentData.deudorDomicile}`, fontSize: 16}],
                      [{text: `Teléfono: ${documentData.deudorNumber}`, fontSize: 16}]
                    ],
                    style: 'tableStyle'
                  },
            },
            {
              widths: [20],
              text:''
            },
            {
              text: 'Acepto y pagaré a su vencimiento\n \n \n \n____________________________________',
              fontSize: 15,
              bold: true,
              alignments: 'center',
              lineHeight: 1.5,
              margins: [40, 0, 0, 0],
            },

          ]
        }

      ],

      styles: {
          title: {
              fontSize: 30,
              bold: true
          },
          tableStyle: {
            //margins: [0, 0, 0, 0] // ajusta el margen superior para separar del texto anterior
          }
      },
      defaultStyle: {
      }
    }

    this.pdfOjb = pdfMake.createPdf(docDef);

    this.pdfOjb.download(documentData.pagareName + '.pdf');

  }

  convertirNumeroALetras(numero: number): string {
    const unidades: string[] = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas: string[] = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas: string[] = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (numero === 0) {
      return unidades[numero];
    } else if (numero < 0) {
      return 'menos ' + this.convertirNumeroALetras(Math.abs(numero));
    } else if (numero < 10) {
      return unidades[numero];
    } else if (numero < 20) {
      return especiales[numero - 10];
    } else if (numero < 100) {
      return decenas[Math.floor(numero / 10)] + ' y ' + this.convertirNumeroALetras(numero % 10);
    } else if (numero < 1000) {
      return centenas[Math.floor(numero / 100)] + ' ' + this.convertirNumeroALetras(numero % 100);
    } else if (numero < 1000000) {
      return this.convertirNumeroALetras(Math.floor(numero / 1000)) + ' mil ' + this.convertirNumeroALetras(numero % 1000);
    } else if (numero < 1000000000) {
      return this.convertirNumeroALetras(Math.floor(numero / 1000000)) + ' millones ' + this.convertirNumeroALetras(numero % 1000000);
    } else {
      return 'Número fuera de rango';
    }
  }


}
