import { Injectable } from "@angular/core";
import { Icon } from "ionicons/dist/types/components/icon/icon";

@Injectable()
export class DocumentsService{

  private documents:Document[] = [
    {
      name: "Factura",
      icon: "",
      color: "linear-gradient(to bottom right, #81C9FA, #055084)"
    },
    {
      name: "Contrato",
      icon: "",
      color: "linear-gradient(to bottom right, #C7B5FF, #5A2CEC)"
    },
    {
      name: "Pagaré",
      icon: "",
      color: "linear-gradient(to bottom right, #B2FFBC, #08951B)"
    },
    {
      name: "Cheque",
      icon: "",
      color: "linear-gradient(to bottom right, #91FFD7, #19C788)"
    },
    {
      name: "Préstamo",
      icon: "",
      color: "linear-gradient(to bottom right, #05C0C9, #017579)"
    },
    {
      name: "Firma",
      icon: "",
      color: "linear-gradient(to bottom right, #999999, #FFFFFF)"
    },
  ];

  constructor(){}

  getDocuments():Document[]{
    return this.documents;
  }

}

export interface Document{
  name: string;
  icon: string;
  color: string;
}
