import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { FirestoreDataService } from './firestore-data.service';
import { AuthService } from './auth.service';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';

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

  // montoLetter:any;
  chequeName: any;
  chequeDate: any;

  pdfOjb: any;

  beneficiarioFill: boolean = false;
  detallesFill: boolean = false;

  constructor(private authService: AuthService, private firestoreData: FirestoreDataService,
    private fileOpener: FileOpener, private plt:Platform, private file: File ) {
    this.chequeDate = new Date().toLocaleDateString('ES');
    this.getUid();
   }

   async firestoreCheque(){
    //await this.getUid();
    const uid = await this.getUid();
    if(uid !== null){
      const subcoleccion = 'cheques';
      const documento = this.chequeName;
      const datos = { // Crea un objeto con los datos que deseas subir
        bankName: this.bankName,
        beneficiarioName: this.beneficiarioName,
        beneficiarioDirection: this.beneficiarioDirection,
        beneficiarioNumber: this.beneficiarioNumber,
        montoCheque:this.montoCheque,
        accountNumber: this.accountNumber,

        //montoLetter:this.montoLetter,
        chequeName: this.chequeName,
        chequeDate: this.chequeDate,
        name: "Cheque",
        icon: "./assets/img/cheque-bancario.png",
        color: "linear-gradient(to bottom right, #91FFD7, #19C788)",
        description: "Un cheque es un documento financiero que se utiliza para realizar pagos a terceros. Es una orden escrita emitida por una persona o entidad (el librador o emisor del cheque) que autoriza a otra persona o entidad (el beneficiario o tenedor del cheque) a retirar una cantidad específica de dinero de una cuenta bancaria."
      };
      console.log(datos)
      this.firestoreData.createDocument(datos, uid, subcoleccion, documento);
    }else{
      console.log('Error en UID');
    }
  }

  async getUid(){
    let uid = await this.authService.getUser();
    return uid;
  }

  allValuesEntered(): boolean {
    return !!this.bankName && !!this.beneficiarioName && !!this.beneficiarioDirection && !!this.beneficiarioNumber &&
           !!this.montoCheque && !!this.accountNumber ;
  }

  resetValues(){
    this.bankName = null;
    this.beneficiarioName = null;
    this.beneficiarioDirection = null;
    this.beneficiarioNumber = null;
    this.montoCheque = null;
    this.accountNumber = null;
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




  async pdfDownload(){
    const montoEnLetras = this.convertirNumeroALetras(this.montoCheque);
    const docDef = {
      pageSize: {
        width: 7 * 72,       // 6 pulgadas convertidas a puntos (1 pulgada = 72 puntos)
        height: 3.80 * 75   // 2.75 pulgadas convertidas a puntos
      },
      pageMargin: [ 20 , 15 , 20 , 20 ],
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
              text: `\nCobrar el monto de: ${montoEnLetras} MXN\n`
            },
            {
              table: {
                body: [
                  [`$${this.montoCheque}`],
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

    await this.firestoreCheque();

    this.openFile();

    this.resetValues();
  }

  openFile(){
    if(this.plt.is('capacitor')){
      this.pdfOjb.getBuffer((buffer: Uint8Array) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(this.file.dataDirectory, `${this.chequeName}.pdf`, blob, { replace: true }).then(fileEntry =>{
          this.fileOpener.open(this.file.dataDirectory + `${this.chequeName}.pdf`, 'application/pdf');
        });
      });
      return true;
    }else{
      return undefined;
    }
  }

}
