import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatosContratoService {

  arrendadorName: any;
  arrendadorDomicile: any;
  arrendadorSexo: any;

  arrendatarioName: any;
  arrendatarioDomicile: any;
  arrendatarioSexo: any;

  domicileHouseToRent: any;
  metrosCuadrados: any;
  noHabitaciones: any;
  duracionContrato: any;
  inicioRenta: any;
  mensualidadRenta: any;

  contractDate: any;
  contractState: any;
  contractMunicipe:any;
  selectedState: any;

  contratoName:any;
  obligado:any;
  obligado2: any;

  pdfOjb: any;

  constructor() {
    this.contractDate = new Date().toLocaleDateString('ES');

    if(this.arrendadorSexo = 'Hombre'){
      this.obligado = 'obligado'
    }else{
      this.obligado = 'obligada'
    }

    if(this.arrendatarioSexo = 'Hombre'){
      this.obligado2 = 'obligado'
    }else{
      this.obligado2 = 'obligada'
    }
   }

  allValuesEntered(): boolean {
    return !!this.arrendadorName && !!this.arrendadorDomicile && !!this.arrendadorSexo && !!this.arrendatarioName &&
           !!this.arrendatarioDomicile && !!this.arrendatarioSexo && !!this.domicileHouseToRent && !!this.metrosCuadrados && !!this.noHabitaciones &&
           !!this.duracionContrato && !!this.inicioRenta ;
  }

  resetValues(){
    this.arrendadorName = null;
    this.arrendadorDomicile = null;
    this.arrendadorSexo = null;
    this.arrendatarioDomicile = null;
    this.arrendatarioName = null;
    this.arrendatarioSexo = null;
    this.domicileHouseToRent = null;
    this.metrosCuadrados = null;
    this.noHabitaciones = null;
    this.duracionContrato = null;
    this.inicioRenta = null;
  }

  pdfDownload(){
    const docDef = {
      content: [
        {
			style: 'tableExample',
			table: {
				headerRows: 1,
				widths: ['*'],
				body: [
					[{text: 'Contrato de arrendamiento',
          alignment: 'center',
          fontSize: 14, bold: true,}],
				]
			},
			layout: 'noBorders'
		},
		{
		  text: `\nEn ${this.selectedState}, ${this.contractMunicipe} a ${this.contractDate}`, fontSize: 14,
      //alignment: 'right',
      bold: true,
		},
		{
		  text: `\nContrato de arrendamiento que celebran en calidad de arrendador: \n ${this.arrendadorName} `
		},
		{
		  text: `\n  En calidad de arrendatario: \n ${this.arrendatarioName}`
		},
		{
		  //alignment: 'justify' ,
      text: '\nQuienes se reconocen expresa y recíprocamente con capacidad plena para obligarse y para tal efecto, la primera de ellas será identificada como la “PARTE ARRENDADORA” y la segunda de ellas será identificada como la “PARTE ARRENDATARIA”, además se hará referencia a ellas de manera conjunta como “LAS PARTES”; En este sentido, las partes manifiestan en primer lugar las siguientes:'
		},
		{
		  text: '\nDeclaraciones',
      //alignment: 'center',
      fontSize: 14, bold: true,
		},
		{
		  text: `\n${this.arrendadorName} señala como domicilio ubicado en: \n${this.arrendadorDomicile}`
		},
		{
		  text: `\n${this.arrendatarioName} señala como domicilio ubicado en: \n${this.arrendatarioDomicile}`
		},
		{
		  text: `\n${this.arrendadorName} manifiesta tener el derecho y la capacidad jurídica para otorgar el uso y goce temporal del inmueble objeto del presente contrato, mismo que se encuentra ubicado en: \n ${this.domicileHouseToRent}`
		},
		{
		  text: `El inmueble al que se hace referencia tiene una superficie de ${this.metrosCuadrados}m² y comprende de: \n ${this.noHabitaciones} habitaciones. \n`, //pageBreak: 'after'
		},
		{
			style: 'tableExample',
			table: {
				headerRows: 1,
				widths: ['*'],
				body: [
					[{text: '\nCláusulas',
          //alignment: 'center',
          fontSize: 14, bold: true,}],
				]
			},
			layout: 'noBorders'
		},
		{
		  text: '\n PRIMERA. OBJETO Y MATERIA DEL CONTRATO.', fontSize: 12, bold: true
		},
		{
		  //alignment: 'justify',
      text: `A través del presente contrato, ${this.arrendadorName} concede a ${this.arrendatarioName} el uso y goce temporal del inmueble objeto del presente contrato, señalado como tal en el apartado de las declaraciones, obligándose ${this.arrendatarioName} a destinar el uso de dicho inmueble exclusivamente para habitación.`
		},
		{
		  text: '\n SEGUNDA. VIGENCIA', fontSize: 12, bold: true
		},
		{
		  //alignment: 'justify',
      text: `Se estipula que la duración del presente contrato de arrendamiento será de ${this.duracionContrato} años, plazo que será forzoso para todas LAS PARTES, y que iniciará a partir de ${this.inicioRenta}.\n\nEn caso de expirar la vigencia fijada en este contrato y LAS PARTES estuvieran de acuerdo, podrá celebrarse uno nuevo en los términos que estas acuerden, o bien, prorrogarse o modificarse este instrumento, lo cual deberá hacerse por escrito; En caso contrario, si ${this.arrendatarioName} no manifiesta su deseo de desocupar el inmueble y ${this.arrendadorName} no requiere su devolución, se entenderá que este contrato seguirá produciendo todos sus efectos por tratarse de un contrato de arrendamiento destinado a la habitación.`
		},
		{
		  text: '\n TERCERA. RENTA', fontSize: 12, bold: true,
		},
		{
		  //pageBreak: 'after',
      //alignment: 'justify',
      text: `De común acuerdo LAS PARTES establecen que ${this.arrendatarioName} pagará a ${this.arrendadorName} por concepto de renta del inmueble objeto de este contrato, la cantidad de $${this.mensualidadRenta}, cantidad que deberá ser pagada mensualmente por adelantado dentro de los primeros 10 días naturales de cada mes. Llegado el caso, a partir del momento en que el contrato rebase un año de duración, la renta podrá ser actualizada. La renta actualizada será exigible a ${this.arrendatarioName} a partir de que ${this.arrendadorName} le notifique de dicha actualización por escrito con al menos 20 días de anticipación al mes en el que se pretenda comenzar a cobrar la renta actualizada y no podrá actualizarse de nuevo hasta que haya transcurrido un año nuevamente. En todo caso ${this.arrendatarioName} no está ${this.obligado2} a pagar la renta sino desde el día en que reciba el inmueble objeto del contrato.`
		},
		{
		  text: '\n CUARTA. FORMAS DE REALIZAR EL PAGO DE LA RENTA', fontSize: 12, bold: true
		},
		{
		  //alignment: 'justify',
      text: 'El pago de la renta se podrá realizar de las siguientes formas:'
		},
		{
			ul: [
				'En efectivo, en el domicilio del inmueble objeto de este contrato.',
				`Mediante transferencias bancarias a la cuenta designada por ${this.arrendadorName}.`,
			]
		},
		{
		    text: `\nEn todo caso ${this.arrendadorName} se encuentra ${this.obligado} a emitir los recibos por los pagos efectivamente realizados por la PARTE ARRENDATARIA.`
		},
		{
    		  text: '\n QUINTA. ENTREGA, RECEPCIÓN Y DEVOLUCIÓN DEL INMUEBLE ARRENDADO.', fontSize: 12, bold: true
		},
		{
		  //alignment: 'justify',
      text: `${this.arrendatarioName} acepta recibir el inmueble objeto del arrendamiento, en condiciones de higiene y seguridad, suficientes y necesarias para ser habitable, pues cuenta con instalaciones adecuadas de luz, agua y drenaje, por lo cual, acepta recibir el inmueble en buen estado y a su entera satisfacción de conformidad con lo dispuesto en el artículo 2412, fracción I y 2443 del Código Civil Federal vigente y su correlativo aplicable del Código Local.Una vez concluido este contrato de arrendamiento, ${this.arrendatarioName} entregará la posesión material del inmueble a ${this.arrendadorName} en el mismo estado en que lo recibió a la celebración del presente contrato. En consecuencia, ${this.arrendatarioName}, se compromete a devolver el inmueble objeto del arrendamiento sin mas deterioro que el causado por el uso normal y racional del mismo.`
		},
		{
		  text: '\n SEXTA. MEJORAS, MODIFICACIONES Y CONSERVACIÓN DEL INMUEBLE.', fontSize: 12, bold: true
		},
		{
		  text: `En concordancia con lo establecido en la cláusula relativa a la entrega y devolución del inmueble objeto de este contrato, ${this.arrendatarioName} se obliga a devolver dicho inmueble en las condiciones en las que esta lo recibe salvo el desgaste normal y natural por el uso que se les dé; por lo cual, no podrá realizar sin el consentimiento de ${this.arrendadorName}, ningún tipo de obra, particularmente, aquellas que modifiquen la estructura del lugar, y tampoco podrá perforar las paredes, techos y/o en el suelo de este salvo que ${this.arrendatarioName} lo autorice. \n\nSin perjuicio de poder exigir una indemnización por daños y perjuicios, ${this.arrendadorName} podrá exigir además, que ${this.arrendatarioName} reponga las cosas al estado previo a las modificaciones efectuadas sin autorización, sin que ${this.arrendatarioName} pueda reclamar pago alguno. En todo caso, las obras que sí fueran autorizadas quedarán en beneficio del lugar, no pudiendo reclamar ${this.arrendatarioName} pago alguno, sin perjuicio de que LAS PARTES puedan convenir algo distinto al momento de otorgar la autorización, conforme a lo establecido en el artículo 2423 del Código Civil Federal. \n\nAun existiendo autorización por ${this.arrendadorName}, ${this.arrendatarioName} será exclusivamente responsable de los daños que puedan llegar a ocasionarse con las obras que se realicen. \n\nPor otro lado, ${this.arrendadorName} se encuentra ${this.obligado} a realizar, todas las reparaciones que sean necesarias para conservar el inmueble en buen estado y servir así adecuadamente al uso convenido en el presente contrato, salvo cuando el deterioro sea imputable a ${this.arrendatarioName}, en cuyo caso esta deberá realizar las reparaciones correspondientes.`
		},
		{
		  text: '\n SÉPTIMA. SERVICIOS Y CUOTAS.', fontSize: 12, bold: true
		},
		{
		  text: `${this.arrendatarioName} se obliga a llevar a cabo el pago de los servicios como los de agua, luz o gas, y demás servicios que sean necesarios para la habitación del inmueble. Respecto a los servicios como televisión de paga, teléfono o internet, ${this.arrendatarioName} podrá optar entre hacer uso de ellos, quedando obligada a realizar los pagos por dichos servicios, o bien solicitar a ${this.arrendadorName} su cancelación, esto último podrá ser realizado por ${this.arrendatarioName} en cualquier momento durante la vigencia del contrato. \n\nTodos los servicios que sean contratados por ${this.arrendatarioName} deberán ser pagados por esta y cancelados antes de la devolución del inmueble a ${this.arrendadorName}, salvo que esta última solicite que los servicios no sean cancelados y se obligue por escrito a realizar el pago correspondiente, en cuyo caso LAS PARTES deberán coordinarse para realizar los trámites que permitan a ${this.arrendadorName} ocupar la titularidad de estos servicios. \n\nSerá obligación del ${this.arrendatarioName} conservar los recibos o facturas de los servicios mencionados, como una manera de acreditar que se encuentra al corriente en el pago de los mismos. La falta de pago de los servicios necesarios para la habitación del inmueble será motivo de rescisión del contrato con responsabilidad para ${this.arrendatarioName}. \n\nEn todo caso se entenderá que el costo de los servicios que deberá cubrir el arrendatario, no está incluido en el monto de la renta del inmueble fijada en la cláusula tercera.`
		},
		{
		  text: '\n OCTAVA. ADQUISICIÓN PREFERENTE POR PARTE DEL ARRENDATARIO.', fontSize: 12, bold: true
		},
		{
		  text: `De conformidad con lo establecido en el artículo 2448-J del Código Civil Federal, en el momento en que ${this.arrendadorName} manifieste su deseo de vender el inmueble, ${this.arrendatarioName} dispondrá de un periodo de 15 días para dar aviso por escrito a ${this.arrendadorName} de su voluntad para ejercitar el derecho de preferencia que se consigna de forma genérica en el artículo referido de forma específica en el correlativo del Código Estatal (derecho de preferencia por el tanto), por lo cual podrá adquirir de manera preferente el inmueble de acuerdo a los términos en los que ${this.arrendadorName} realice la oferta de venta.`
		},
		{
		  text: '\n NOVENA. OBLIGACIONES ESPECÍFICAS DE LAS PARTES.', fontSize: 12, bold: true
		},
		{text: `${this.arrendatarioName} se compromete a:`, style: 'header'},
		{
			//type: 'upper-roman',
			ol: [
				'Facilitar una convivencia pacífica con los vecinos y a dar un uso correcto y adecuado al inmueble.',
				'Mantener el lugar en condiciones de aseo adecuadas para su uso.',
				`Tener especial cuidado de las llaves, pases de acceso y/o controles o dispositivos de acceso al lugar y en caso de pérdida de alguno de estos, deberá comunicarlo inmediatamente a ${this.arrendadorName}, además de pagar todos los gastos que se deriven de tal pérdida.`,
				`Dar aviso de manera inmediata a ${this.arrendadorName} cuando se produzcan desperfectos o incidentes en el inmueble durante el periodo de arrendamiento.`,
			]
		},
		{text: `\nPor otro lado ${this.arrendadorName} se compromete a:`, style: 'header'},
		{
			//type: 'upper-roman',
			ol: [
				`Poner el inmueble a disposición de ${this.arrendatarioName} en condiciones que permitan la habitación del mismo y su uso de manera normal y sin interrupciones (sin reparaciones o trabajos de acomodo pendientes), respetando en todo momento los derechos de ${this.arrendatarioName} que se configuran a partir de la firma del presente contrato.`,
				'Reparar, en el menor tiempo posible, cualquier desperfecto o mal funcionamiento que presente el inmueble.',
			]
		},
		{
		  text: '\n DÉCIMO PRIMERA. IMPUNTUALIDAD EN EL PAGO DE LA RENTA.', fontSize: 12, bold: true
		},
		{
		  text: `En caso de que ${this.arrendatarioName} no esté en condiciones de realizar el pago de acuerdo a lo establecido en la cláusula tercera, deberá dar aviso a ${this.arrendadorName} de manera inmediata.`
		},
		{
		  text: '\n DÉCIMO SEGUNDA. TERMINACIÓN DEL CONTRATO.', fontSize: 12, bold: true
		},
		{
		  text: `Al terminar la vigencia del presente contrato y precisamente en el día de su conclusión, ${this.arrendatarioName} hará entrega a ${this.arrendadorName} del bien inmueble objeto del contrato, sin necesidad de que esto sea requerido por ${this.arrendadorName}. \n\nLAS PARTES estipulan, que, si ${this.arrendatarioName} no desocupa voluntariamente el inmueble arrendado al término de la vigencia del presente instrumento legal, daré motivo al pago de los daños y perjuicios generados, además del precio establecido como renta. \n\nAunado a lo anterior, en caso de que ${this.arrendadorName} demande judicialmente la desocupación y entrega del inmueble a ${this.arrendatarioName}, y esta resulte condenada, pagar los honorarios y gastos que origine el juicio correspondiente, constituyéndose deudor solidario de esta obligación y renunciando ambos a los beneficios de orden y excusión.`
		},
		{
		  text: '\n DÉCIMO TERCERA. CAUSAS DE RECISIÓN DEL CONTRATO.', fontSize: 12, bold: true
		},
		{
		  text: 'El incumplimiento, de cualquiera de las partes de las obligaciones que emanan de este contrato, dará derecho a la otra, a exigir el cumplimiento de la obligación o a promover la rescisión del contrato de acuerdo con lo dispuesto en los artículos 2489 y 2490 del Código Civil Federal.'
		},
		{text: `\nSerán además causas de rescisi6n del presente contrato a favor de ${this.arrendadorName}, las siguientes:`, style: 'header'},
		{
			//type: 'upper-roman',
			ol: [
				`Que ${this.arrendatarioName} de en subarrendamiento, ceda o traspase, total o parcialmente los derechos que se deriven del presente contrato.`,
				'Variar o modificar sin autorización el inmueble, sean estas modificaciones útiles o de ornato.',
				'Dedicar el inmueble a un fin diferente al estipulado en el presente contrato.',
				'El retraso reiterado en el pago de la renta sin dar el aviso correspondiente, así como el no pago de la misma.',
				'Causar daños al inmueble.',
				'Manejar sustancias peligrosas o ilegales en el inmueble.',

			]
		},
		{
		  text: '\n DÉCIMO CUARTA. MODIFICACIONES DEL CONTRATO.', fontSize: 12, bold: true
		},
		{
		  text: 'El presente contrato solo puede ser modificado mediante convenio por escrito suscrito por LAS PARTES.'
		},
		{
		  text: '\n DÉCIMO QUINTA. PRIVACIDAD DEL CONTRATO.', fontSize: 12, bold: true
		},
		{
		  text: 'LAS PARTES convienen que el presente Contrato es de carácter privado y, por lo tanto, se abstendrán de comunicar a un tercero su contenido o hacerlo público, así como tampoco podrán divulgar, compartir o hacer un mal uso de los datos aportados por LAS PARTES para celebrar el contrato, no obstante, prevalecerán todos los derechos y obligaciones de LAS PARTES, y por tanto podrán ejercitarse todas las acciones legales que se deriven del mismo conforme a la Ley.'
		},
		{
		  text: '\n DÉCIMO SEXTA. ABROGACIÓN DE ACUERDOS ANTERIORES.', fontSize: 12, bold: true
		},
		{
		  text: 'LAS PARTES reconocen y aceptan que este contrato y sus adiciones constituyen un acuerdo total entre ellas, por lo que desde el momento de su firma dejan sin efecto cualquier acuerdo o negociación previa, prevaleciendo lo dispuesto en este instrumento respecto de cualquier otro contrato o convenio.'
		},
		{
		  text: '\n DÉCIMO SÉPTIMA. JURISDICCIÓN.', fontSize: 12, bold: true
		},
		{
		  text: 'Para la interpretación y cumplimiento de este contrato, así como para todo lo no previsto en el mismo, las partes se someten expresamente a la jurisdicción de los Juzgados y Tribunales que conforme a derecho deban conocer el asunto en razón del lugar en el que es firmado el acuerdo, con renuncia a su propio fuero en caso que este les aplique y sea procedente Leído que fue por las partes el presente contrato y en señal de expresa conformidad y aceptación de los términos en él recogidos, y enteradas LAS PARTES de su contenido y alcances, lo firman por duplicado, en el lugar y fecha indicados al comienzo de este contrato.\n\n\n'
		},
		{
		  //alignment: 'center',
          table: {
            widths: ['*', '*'],
            body: [
              ['Firma del Arrendador', 'Firma del Arrendatario'],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['',''],
              ['_______________________', '________________________'],
            ],
          },
          layout: 'noBorders',
          margins: [0, 50, 0, 40],
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
    lineHeight: 1.5,
    fontSize: 12,
    alignments: 'justify'
  },
    }

    this.pdfOjb = pdfMake.createPdf(docDef);

    this.pdfOjb.download(this.contratoName + '.pdf');

    // pdfMake.createPdf(docDef).download();

  }
}
