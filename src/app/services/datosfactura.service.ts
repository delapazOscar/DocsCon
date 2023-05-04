import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosfacturaService {

  companyName: any;
  domicileCompany: any;
  cpCompany: any;
  rfcCompany: any;
  companyNumber: any;

  rfcClient: string | undefined;
  selectedState: string | undefined;
  domicileClient: string | undefined;
  clientName: string | undefined;
  clientNumber: any;
  cfdiUse: string | undefined;

  productName:string| undefined;
  productDescription: any;
  productPrice: any;
  productQuantity: any;

  selectedPayment: any;
  bankName: any;
  moneda:any;


  constructor() { }

  allValuesEntered(): boolean {
    return !!this.companyName && !!this.domicileCompany && !!this.cpCompany && !!this.rfcCompany && !!this.companyNumber &&
           !!this.rfcClient && !!this.selectedState && !!this.domicileClient && !!this.clientName && !!this.clientNumber &&
           !!this.cfdiUse && !!this.productName && !!this.productDescription && !!this.productPrice && !!this.productQuantity &&
           !!this.selectedPayment && !!this.bankName && !!this.moneda;
  }
}
