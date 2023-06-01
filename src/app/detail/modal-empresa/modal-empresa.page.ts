import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatosfacturaService } from 'src/app/services/datosfactura.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.page.html',
  styleUrls: ['./modal-empresa.page.scss'],
})
export class ModalEmpresaPage implements OnInit {
  companyName: string = '';
  domicileCompany: string = '';
  cpCompany: string = '';
  rfcCompany: string = '';
  companyNumber: string = '';

  empresaFill: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private httpClient: HttpClient,
    private datosFactura: DatosfacturaService,
    private alertController: AlertController
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      companyName: this.companyName,
      domicileCompany: this.domicileCompany,
      cpCompany: this.cpCompany,
      rfcCompany: this.rfcCompany,
      companyNumber: this.companyNumber,
      empresaFill: this.empresaFill,
    };

    // Asignar los valores de las variables del servicio
    this.datosFactura.companyName = data.companyName;
    this.datosFactura.domicileCompany = data.domicileCompany;
    this.datosFactura.cpCompany = data.cpCompany;
    this.datosFactura.rfcCompany = data.rfcCompany;
    this.datosFactura.companyNumber = data.companyNumber;
    data.empresaFill = true;
    this.datosFactura.empresafill = data.empresaFill;
    console.log(this.datosFactura.empresafill);

    this.checkFormValues(); // Actualizar el estado de empresaFill

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.companyName, 'confirm');
  }

  checkFormValues() {
    if (
      this.companyName &&
      this.domicileCompany &&
      this.cpCompany &&
      this.rfcCompany &&
      this.companyNumber
    ) {
      this.empresaFill = true;
    } else {
      this.empresaFill = false;
    }
  }

  ngOnInit() {
    this.companyName = this.datosFactura.companyName;
    this.domicileCompany = this.datosFactura.domicileCompany;
    this.cpCompany = this.datosFactura.cpCompany;
    this.rfcCompany = this.datosFactura.rfcCompany;
    this.companyNumber = this.datosFactura.companyNumber;

    this.checkFormValues(); // Actualizar el estado inicial de empresaFill
  }
}
