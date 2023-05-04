import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosfacturaService } from 'src/app/services/datosfactura.service';

interface Estado {
  nombre: string;
  abreviatura: string;
}

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.page.html',
  styleUrls: ['./modal-cliente.page.scss'],
})
export class ModalClientePage implements OnInit {

  clientName: string | undefined;
  rfcClient: any;
  cfdiUse: string| undefined;
  domicileClient: string| undefined;
  selectedState: any;
  clientNumber: string | undefined;
  estados: Estado[]| undefined;

  selectedUse: any;

  constructor(private modalCtrl:ModalController, private http:HttpClient, private datosFactura:DatosfacturaService) {}

  ngOnInit() {
    this.http.get<{ estados: Estado[] }>('assets/estados.json').subscribe(data => {
      this.estados = data.estados;
    });
    this.clientName = this.datosFactura.clientName;
    this.domicileClient = this.datosFactura.domicileClient;
    this.selectedState = this.datosFactura.selectedState;
    this.cfdiUse = this.datosFactura.cfdiUse;
    this.clientNumber = this.datosFactura.clientNumber;
    this.rfcClient = this.datosFactura.rfcClient;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      clientName: this.clientName,
      cfdiUse: this.cfdiUse,
      domicileClient: this.domicileClient,
      selectedState: this.selectedState,
      rfcClient: this.rfcClient,
      clientNumber: this.clientNumber
    };

    // Asignar los valores de las variables del servicio
    this.datosFactura.clientName = data.clientName;
    this.datosFactura.cfdiUse = data.cfdiUse;
    this.datosFactura.clientNumber = data.clientNumber;
    this.datosFactura.domicileClient = data.domicileClient;
    this.datosFactura.selectedState = data.selectedState;
    this.datosFactura.rfcClient = data.rfcClient;

    // Imprimir los valores asignados en consola
    // console.log(this.datosFactura.companyName);
    // console.log(this.datosFactura.domicileCompany);
    // console.log(this.datosFactura.cpCompany);
    // console.log(this.datosFactura.rfcCompany);
    // console.log(this.datosFactura.companyNumber);

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.clientName, 'confirm');
  }

}
