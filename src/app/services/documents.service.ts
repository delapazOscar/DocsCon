import { Injectable } from "@angular/core";
import { Icon } from "ionicons/dist/types/components/icon/icon";

@Injectable()
export class DocumentsService{

  public documents = [
    {
      name: "Factura",
      // icon: "../assets/img/factura.png",
      icon: "./assets/img/factura.png",
      color: "linear-gradient(to bottom right, #81C9FA, #055084)",
      description: "Este documento se utiliza para registrar una operación comercial y detallar los bienes o servicios que se han vendido, así como el precio de venta y la información fiscal de las partes involucradas en la transacción."
    },
    {
      name: "Contrato",
      //icon: "../assets/img/acuerdo.png",
      icon: "./assets/img/acuerdo.png",
      color: "linear-gradient(to bottom right, #C7B5FF, #5A2CEC)",
      description: "Este documento se utiliza para formalizar y establecer las obligaciones y responsabilidades de cada una de las partes involucradas en un acuerdo, ya sea en un contexto personal o comercial."
    },
    {
      name: "Pagaré",
      // icon: "../assets/img/metodo-de-pago.png",
      icon: "./assets/img/metodo-de-pago.png",
      color: "linear-gradient(to bottom right, #B2FFBC, #08951B)",
      description: "Es un instrumento legal que formaliza la obligación de una persona o entidad (llamada el deudor) de pagar una cantidad específica de dinero a otra persona o entidad (llamada el acreedor) en una fecha determinada o a solicitud del acreedor. El pagaré se utiliza principalmente en el ámbito empresarial y comercial como una forma de garantizar el pago de una deuda o un préstamo."
    },
    {
      name: "Cheque",
      // icon: "../assets/img/cheque-bancario.png",
      icon: "./assets/img/cheque-bancario.png",
      color: "linear-gradient(to bottom right, #91FFD7, #19C788)",
      description: "Un cheque es un documento financiero que se utiliza para realizar pagos a terceros. Es una orden escrita emitida por una persona o entidad (el librador o emisor del cheque) que autoriza a otra persona o entidad (el beneficiario o tenedor del cheque) a retirar una cantidad específica de dinero de una cuenta bancaria."
    },
    {
      name: "Préstamo",
      // icon: "../assets/img/prestamo.png",
      icon: "./assets/img/prestamo.png",
      color: "linear-gradient(to bottom right, #05C0C9, #017579)",
      description: "Un préstamo es un contrato financiero en el cual una persona o entidad (el prestamista) presta una cantidad específica de dinero a otra persona o entidad (el prestatario) con la obligación de devolver ese dinero en un plazo determinado, junto con el pago de intereses acordados."
    },
    // {
    //   name: "Firma",
    //   icon: "../assets/img/firma-digital.png",
    //   color: "linear-gradient(to bottom right, #999999, #FFFFFF)",
    //   description: ""
    // },
    // {
    //   name: "Derechos",
    //   //icon: "../assets/img/derechos-de-autor.png",
    //   icon: "./assets/img/derechos-de-autor.png",
    //   color: "linear-gradient(to bottom right, #FFC7B1, #D13C02)",
    //   description: ""
    // },
    // {
    //   name: "Cotización",
    //   //icon: "../assets/img/solicitud-de-cotizacion.png",
    //   icon: "./assets/img/solicitud-de-cotizacion.png",
    //   color: "linear-gradient(to bottom right, #FFA8A8, #A61B1B)",
    //   description: ""
    // },
    {
      name: "Curriculum",
      //icon: "../assets/img/curriculum.png",
      icon: "./assets/img/curriculum.png",
      color: "linear-gradient(to bottom right, #4F91A5, #7ECEE8)",
      description: "Un currículum es un documento que sintetiza la información clave sobre la formación, experiencia y habilidades de una persona, con el objetivo de presentarse de manera efectiva a posibles empleadores o instituciones educativas. Es una herramienta fundamental en la búsqueda de empleo y en la solicitud de oportunidades profesionales."
    },
  ];

  constructor(){}

  getDocuments():Document[]{
    return [...this.documents];
  }

  getDocumentsByName(name:string){
    return{
      ...this.documents.find(p => p.name === name)
    };
  }


}

export interface Document{
  name: string;
  icon: string;
  color: string;
  description: string;
}
