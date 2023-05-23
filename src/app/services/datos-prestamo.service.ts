import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FirestoreDataService } from './firestore-data.service';

@Injectable({
  providedIn: 'root'
})
export class DatosPrestamoService {

  prestamoDate: any;
  prestamoPeriod: any;
  prestamoQuantity: any;
  prestamoPurpose: any;

  prestatarioName: any;
  prestatarioDirection: any;

  prestamistaName: any;
  prestamistaDirection: any;

  garanteName: any;
  garanteDirection: any;

  prestamoName: any;

  pdfOjb: any;

  allDocuments: any[] = []; // Array para almacenar los datos de todos los documentos creados

  constructor(private file:File, private httpClient:HttpClient, private authService: AuthService,
    private firestoreData: FirestoreDataService) {
      this.prestamoDate = new Date().toLocaleDateString('ES');
      this.getUid();
  }

  async firestorePrestamo(){
    //await this.getUid();
    const uid = await this.getUid();
    if(uid !== null){
      const subcoleccion = 'préstamos';
      const documento = this.prestamoName;
      const datos = { // Crea un objeto con los datos que deseas subir
        prestamoDate: this.prestamoDate,
        prestamoPeriod: this.prestamoPeriod,
        prestamoQuantity: this.prestamoQuantity,
        prestamoPurpose: this.prestamoPurpose,
        prestatarioName: this.prestatarioName,
        prestatarioDirection: this.prestatarioDirection,
        prestamistaName: this.prestamistaName,
        prestamistaDirection: this.prestamistaDirection,
        garanteName: this.garanteName,
        garanteDirection: this.garanteDirection,
        prestamoName: this.prestamoName,
        name: "Préstamo",
        icon: "./assets/img/prestamo.png",
        color: "linear-gradient(to bottom right, #05C0C9, #017579)",
        description: "Un préstamo es un contrato financiero en el cual una persona o entidad (el prestamista) presta una cantidad específica de dinero a otra persona o entidad (el prestatario) con la obligación de devolver ese dinero en un plazo determinado, junto con el pago de intereses acordados."
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

  async pdfDownload(){
    const docDef = {
      content: [
        {
            bold: true,
            fontSize: 14,
            text: 'Acuerdo de préstamo'
		},
		{
		    //alignment: 'justify',
            fontSize: 12,
            text: `\nEste contrato de préstamo, se ejecuta a partir de ${this.prestamoDate}. \nEntre:`
		},
		{
		    //alignment: 'justify',
            fontSize: 12,
            text: `${this.prestatarioName}, ubicado en ${this.prestatarioDirection}, en adelante denominado el "prestatario", cuya expresión, a menos que sea repugnante para el contexto, significará e incluirá a sus representantes legales, su cesionario, su(s) representante(s) y su administrador; \n Y:`
		},
		{
		    //alignment: 'justify',
            fontSize: 12,
            text: `${this.prestamistaName}, ubicado en ${this.prestamistaDirection}, en adelante denominado el "prestamista", cuya expresión, a menos que sea repugnante para el contexto, significará e incluirá a sus representantes legales, cesionario, persona(s) designada(s) y administrador;`
		},
		{
		    //alignment: 'justify',
            fontSize: 12,
            text: `\nMientras que a petición del Prestatario, el Prestamista ha acordado conceder un préstamo que no exceda la suma de ${this.prestamoQuantity} al Prestatario por un periodo de ${this.prestamoPeriod} en los términos y condiciones que se indican a continuación. \n\nLas partes acuerdan lo siguiente:`
		},
		{
			ul: [

			    [{text: 'Cantidad del préstamo: ', bold: true},{text: `El Prestamista se compromete a prestar al Prestatario la suma principal de ${this.prestamoQuantity}, con fines ${this.prestamoPurpose}, y de acuerdo con los términos que se establecen a continuación.`}],
				[{text: 'Interéses: ', bold: true},{text: `El saldo principal devengará intereses al tipo del % anual, que se devengarán diariamente. No obstante, el total de los intereses cobrados no excederá la cantidad máxima permitido por la ley y el Prestatario no estará obligado a pagar ningún interés que exceda de dicho importe.`}],
				[{text: 'Pago del préstamo: ', bold: true},{text: `El préstamo, junto con los intereses devengados y no pagados y todos los demás cargos, costos y gastos, vence y es pagadero en o antes de ${this.prestamoPeriod}.`}],
				[{text: 'Garantía: ', bold: true},{text: `${this.garanteName} ubicado en ${this.garanteDirection} promete garantizar incondicionalmente al prestamista, el pago completo y el cumplimiento por parte de ${this.prestatarioName} de todos los deberes y obligaciones que surjan bajo este contrato. ${this.garanteName} acepta que esta garantía permanecerá en pleno vigor y efecto, y será vinculante para el garante hasta que se cumpla este acuerdo.`}],
				[{ text: 'Costos y Gastos:', bold: true }, 'El Prestatario pagará al Prestamista todos los costos incluyendo los honorarios razonables de abogados, en los que incurra el Prestamista al hacer cumplir este Contrato.'],
                [{ text: 'Renuncia:', bold: true }, 'El Prestatario y todos los fiadores, garantes y endosantes aquí presentes, renuncian a la presentación, protesta y demanda, notificación de protesta, demanda y deshonor y no pago de este Acuerdo.'],
                [{ text: 'Sucesores y Cesionarios:', bold: true }, 'Este Acuerdo se aplicará en beneficio de y será vinculante para los respectivos sucesores y cesionarios permitidos del prestamista y del prestatario.'],
                [{ text: 'Enmienda:', bold: true }, 'Este Acuerdo puede ser enmendado o modificado únicamente mediante un acuerdo escrito, debidamente firmado tanto por el Prestatario como por el Prestamista.'],
                [{ text: 'Notificaciones:', bold: true }, 'Cualquier notificación o comunicación en virtud de este Préstamo debe ser por escrito y enviada únicamente a través de la Entrega en persona.'],
                [{ text: 'Sin Renuncia:', bold: true }, 'No se considerará que el prestamista ha renunciado a ninguna disposición de este Acuerdo o al ejercicio de los derechos que le corresponden en virtud de este Acuerdo, a menos que dicha renuncia se haga de manera expresa y por escrito. La renuncia del prestamista al incumplimiento o violación de cualquier disposición de este Acuerdo no constituirá una renuncia a cualquier otro incumplimiento o violación subsiguiente.'],
                [{ text: 'Divisibilidad:', bold: true }, 'En el caso de que alguna de las disposiciones de este Acuerdo se considere inválida o no ejecutable en todo o en parte, las disposiciones restantes no se verán afectadas y continuarán siendo válidas y ejecutables como si las partes inválidas o no ejecutables no hubieran sido incluidas en este Acuerdo.'],
                [{ text: 'Asignación:', bold: true }, 'El Prestatario no cederá este Acuerdo, en todo o en parte, sin el consentimiento escrito del Prestamista. El prestamista puede ceder todo o parte de este Acuerdo con notificación por escrito al prestatario.'],
                [{ text: 'Ley aplicable:', bold: true }, 'Este Acuerdo se regirá e interpretará de acuerdo con las leyes de la constitución mexicana, sin incluir sus disposiciones sobre conflictos de leyes.'],
                [{ text: 'Disputas:', bold: true }, 'Cualquier controversia que surja del presente Acuerdo se resolverá en los tribunales de [Tribunal].'],
                [{ text: 'Acuerdo completo:', bold: true }, 'Este Acuerdo contiene el entendimiento completo entre las partes y reemplaza y cancela todos los acuerdos previos de las partes, ya sean orales o escritos, con respecto a dicha materia.']

			]
		},
		{
		    text: 'En fe de lo cual, las partes han suscrito el presente acuerdo a partir de la fecha indicada anteriormente.'
		},
		{
		    text: '\n\nFirmas', bold: true, fontSize: 14,
        //alignment: 'center'
		},
		{
		    //alignment: 'center',
		    columns: [
				{
					text: '\n\n\n\n______________________________'
				},
				{
					text: '\n\n\n\n______________________________'
				},
			]
		},
		{
		    //alignment: 'center',
		    columns: [
				{
					text: 'Firma del prestatario'
				},
				{
					text: 'Firma del prestamista'
				},
			]
		},
		{
		    //alignment: 'center',
		    text:'\n\n\n\n______________________________'
		},
		{
		    //alignment: 'center',
		    text:'Firma del garante'
		}
    ],
    defaultStyle: {
        lineHeight: 1.5
    },
    };


    this.pdfOjb = pdfMake.createPdf(docDef);

    this.pdfOjb.download(this.prestamoName + '.pdf');

    await this.firestorePrestamo();

    this.resetValues();

  }

  allValuesEntered(): boolean {
    return !!this.prestamoPeriod && !!this.prestamoQuantity && !!this.prestamoPurpose && !!this.prestatarioName &&
           !!this.prestatarioDirection && !!this.prestamistaName && !!this.prestamistaDirection && !!this.garanteName
           && !!this.garanteDirection ;
  }

  resetValues(){
    this.prestamoPeriod = null;
    this.prestamoQuantity = null;
    this.prestamoPurpose = null;
    this.prestatarioName = null;
    this.prestatarioDirection = null;
    this.prestamistaName = null;
    this.prestamistaDirection = null;
    this.garanteName = null;
    this.garanteDirection = null;
  }


}
