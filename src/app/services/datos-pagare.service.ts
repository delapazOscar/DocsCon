import { Injectable } from '@angular/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { buffer } from 'rxjs';
import * as numberToWords from 'number-to-words';
import { FirestoreDataService } from './firestore-data.service';
import { AuthService } from './auth.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
//import * as moment from 'moment';


declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class DatosPagareService {

  acredorName:any;

  deudorName: any;
  deudorDomicile: any;
  deudorNumber: any;

  dateAcuerdo:any;
  acuerdoPlace: any;
  acuerdoQuantity: any;
  quantityLetter: any;
  acuerdoInteres: any;
  acuerdoMunicipio: any;
  moneda:any;

  selectedState:any;

  pagareName:any;

  pdfOjb: any;

  lugar: any;

  constructor (private authService: AuthService, private firestoreData: FirestoreDataService,
    private fileOpener: FileOpener, private plt:Platform, private file: File) {
    this.getUid();
   }

   async getUid(){
    let uid = await this.authService.getUser();
    return uid;
  }

  async firestorePagare(){
    //await this.getUid();
    const uid = await this.getUid();
    if(uid !== null){
      const subcoleccion = 'pagarés';
      const documento = this.pagareName;
      const datos = { // Crea un objeto con los datos que deseas subir
        acredorName:this.acredorName,
        deudorName: this.deudorName,
        deudorDomicile: this.deudorDomicile,
        deudorNumber: this.deudorNumber,

        dateAcuerdo:this.dateAcuerdo,
        acuerdoPlace: this.acuerdoPlace,
        acuerdoQuantity: this.acuerdoQuantity,
        quantityLetter: this.quantityLetter,
        acuerdoInteres: this.acuerdoInteres,
        acuerdoMunicipio: this.acuerdoMunicipio,
        moneda:this.moneda,

        selectedState:this.selectedState,

        pagareName:this.pagareName,
        //lugar: this.lugar,
        name: "Pagaré",
        icon: "./assets/img/metodo-de-pago.png",
        color: "linear-gradient(to bottom right, #B2FFBC, #08951B)",
        description: "Es un instrumento legal que formaliza la obligación de una persona o entidad (llamada el deudor) de pagar una cantidad específica de dinero a otra persona o entidad (llamada el acreedor) en una fecha determinada o a solicitud del acreedor. El pagaré se utiliza principalmente en el ámbito empresarial y comercial como una forma de garantizar el pago de una deuda o un préstamo."
      };
      console.log(datos)
      this.firestoreData.createDocument(datos, uid, subcoleccion, documento);
    }else{
      console.log('Error en UID');
    }
  }

  allValuesEntered(): boolean {
    return !!this.acredorName && !!this.deudorName && !!this.deudorDomicile && !!this.deudorNumber &&
           !!this.dateAcuerdo && !!this.acuerdoPlace && !!this.acuerdoQuantity && !!this.acuerdoInteres && !!this.acuerdoMunicipio &&
           !!this.selectedState ;
  }

  resetValues(){
    this.acredorName = null;
    this.deudorName = null;
    this.deudorDomicile = null;
    this.deudorNumber = null;
    this.dateAcuerdo = null;
    this.acuerdoPlace = null;
    this.acuerdoQuantity = null;
    this.acuerdoInteres = null;
    this.acuerdoMunicipio = null;
    this.selectedState = null;
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

  // openFile(){

  //   this.fileOpener.open(this.file.dataDirectory + this.pagareName + '.pdf', 'application/pdf')
  //   .then(() => console.log('File opened'))
  //   .catch(e => console.log('Error opening file', e));

  // }

  async pdfDownload(){
    const quantityLetterdos = this.convertirNumeroALetras(this.acuerdoQuantity);
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
					text: `Lugar:   ${this.selectedState}, ${this.acuerdoMunicipio} \n Fecha:   ${this.dateAcuerdo}`,
					fontSize: 15,
					//alignment: 'left',
					lineHeight: 1.5,
					margins: [40, 0, 0, 0]
				},

			]
		},
		{
		    text: ` \n Debo y pagaré incondicionalmente este pagaré a la orden de ${this.acredorName} en ${this.selectedState}, ${this.acuerdoMunicipio} en la fecha: ${this.dateAcuerdo} la cantidad de $${this.acuerdoQuantity} en moneda: ${this.moneda} en letra:  \n `,
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
		    text: ` \n Este pagaré forma parte de una serie numerada y todos están sujetos a la condición de que al, no pagarse cualquiera de ellos a su fecha de vencimiento serán exigibles todos los que le sigan en número además de los ya vencidos, desde la fecha de vencimiento de este documento hasta el día de su liquidación, causará intereses moratorios al tipo de ${this.acuerdoInteres}% mensual.\n `,
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
        					[{text: `Nombre: ${this.deudorName}`, fontSize: 16}],
        					[{text: `Domicilio: ${this.deudorDomicile}`, fontSize: 16}],
        					[{text: `Teléfono: ${this.deudorNumber}`, fontSize: 16}]
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

    this.pdfOjb.download(this.pagareName + '.pdf');

    // pdfMake.createPdf(docDef).download();

    await this.firestorePagare();

    this.openFile();

    this.resetValues();
  }

  openFile(){
    if(this.plt.is('capacitor')){
      this.pdfOjb.getBuffer((buffer: Uint8Array) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(this.file.dataDirectory, `${this.pagareName}.pdf`, blob, { replace: true }).then(fileEntry =>{
          this.fileOpener.open(this.file.dataDirectory + `${this.pagareName}.pdf`, 'application/pdf');
        });
      });
      return true;
    }else{
      return undefined;
    }
  }

}
