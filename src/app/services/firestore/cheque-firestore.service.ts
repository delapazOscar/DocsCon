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
export class ChequeFirestoreService {

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
    const montoEnLetras = this.convertirNumeroALetras(documentData.montoCheque);
    const docDef = {
      pageSize: {
        width: 7 * 72,       // 6 pulgadas convertidas a puntos (1 pulgada = 72 puntos)
        height: 3.50 * 75   // 2.75 pulgadas convertidas a puntos
      },
      pageMargin: [ 20 , 15 , 20 , 20 ],
      content: [
        {
          //alignment: 'justify',
          columns: [
            {
              fontSize: 12,
              bold: true,
              text: `${documentData.bankName}`
            },
            {
              fontSize: 12,
              bold: true,
              text: `No° de Cuenta: ${documentData.accountNumber}`
            }
          ]
        },
        {
          //alignment: 'justify',
          columns: [
            {
              fontSize: 10,
              text: `\n${documentData.beneficiarioName}`
            },
            {
              fontSize: 10,
              bold: true,
              text: `\nFecha: ${documentData.chequeDate} `
            }
          ]
        },
        {
          fontSize: 10,
          text: `${documentData.beneficiarioDirection} \n${documentData.beneficiarioNumber}`
        },
        {
          //alignment: 'justify',
          columns: [
            {
              width: 200,
              fontSize: 10,
              text: `\nCobrar el monto de: ${montoEnLetras} MXN\n`
            },
            {
              table: {
                body: [
                  [`$${documentData.montoCheque}`],
                ]
              }
            }
          ]
        },
        {
          //alignment: 'justify',
          columns: [
            {
              fontSize: 10,
              text: `\n\n${documentData.accountNumber}`
            },
            {
              fontSize: 10,
              bold: true,
              text: '\n\n_________________________'
            }
          ]
        },
        {
          columns: [
            {
              fontSize: 10,
              text: ''
            },
            {
              fontSize: 10,
              bold: true,
              text: 'Firma',
              width: 90,
            }
          ]
        }
      ],
      defaultStyle: {
        lineHeight: 1.3
      },
    };


    this.pdfOjb = pdfMake.createPdf(docDef);

    this.pdfOjb.download(documentData.chequeName + '.pdf');
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
      const unidadesDeMil = Math.floor(numero / 1000);
      const resto = numero % 1000;
      const resultado = centenas[Math.floor(unidadesDeMil / 100)] + ' ' + this.convertirNumeroALetras(unidadesDeMil % 100);

      if (resto === 0) {
        return resultado + ' mil';
      } else {
        return resultado + ' mil ' + this.convertirNumeroALetras(resto);
      }
    } else if (numero < 1000000000) {
      const millones = Math.floor(numero / 1000000);
      const restoMillones = numero % 1000000;
      const resultado = this.convertirNumeroALetras(millones) + ' millones';

      if (restoMillones === 0) {
        return resultado;
      } else {
        return resultado + ' ' + this.convertirNumeroALetras(restoMillones);
      }
    } else {
      return 'Número fuera de rango';
    }
  }

}
