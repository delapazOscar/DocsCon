import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatosChequeService {

  bankName: any;
  beneficiarioName: any;
  beneficiarioDirection: any;
  beneficiarioNumber: any;
  montoCheque:any;
  accountNumber: any;

  accountLetter:any;
  chequeName: any;
  chequeDate: any;

  pdfOjb: any;

  constructor( ) {
    this.chequeDate = new Date().toLocaleDateString('ES');
   }

  allValuesEntered(): boolean {
    return !!this.bankName && !!this.beneficiarioName && !!this.beneficiarioDirection && !!this.beneficiarioNumber &&
           !!this.montoCheque && !!this.accountNumber ;
  }

  pdfDownload(){
    const docDef = {
      pageSize: {
        width: 6 * 72,       // 6 pulgadas convertidas a puntos (1 pulgada = 72 puntos)
        height: 2.90 * 75   // 2.75 pulgadas convertidas a puntos
      },
      // pageMargins: [ 20 , 15 , 20 , 20 ],
      content: [
        {
          //alignment: 'justify',
          columns: [
            {
              fontSize: 12,
              bold: true,
              text: `${this.bankName}`
            },
            {
              fontSize: 12,
              bold: true,
              text: `No° de Cuenta: ${this.accountNumber}`
            }
          ]
        },
        {
          //alignment: 'justify',
          columns: [
            {
              fontSize: 10,
              text: `\n${this.beneficiarioName}`
            },
            {
              fontSize: 10,
              bold: true,
              text: `\nFecha: ${this.chequeDate} `
            }
          ]
        },
        {
          fontSize: 10,
          text: `${this.beneficiarioDirection} \n${this.beneficiarioNumber}`
        },
        {
          //alignment: 'justify',
          columns: [
            {
              width: 200,
              fontSize: 10,
              text: `\nCobrar el monto de: ${this.accountLetter} MXN\n`
            },
            {
              table: {
                body: [
                  ['Monto'],
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
              text: `\n\n${this.accountNumber}`
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

    this.pdfOjb.download(this.chequeName + '.pdf');

    // pdfMake.createPdf(docDef).download();

  }
}
