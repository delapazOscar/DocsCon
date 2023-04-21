import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  // state:boolean | undefined;

  constructor(private modalCtrl: ModalController, private httpClient:HttpClient) { }


  cancel() {
    localStorage.removeItem('companyData');
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ionViewDidEnter() {
    // Obtiene los datos guardados en el almacenamiento local
    const companyData = JSON.parse(localStorage.getItem('companyData') || '[]');
    const lastCompany = companyData[companyData.length - 1];

    // Completar los campos del ion-input con los datos guardados
    this.companyName = lastCompany?.companyName || '';
    this.domicileCompany = lastCompany?.domicileCompany || '';
    this.cpCompany = lastCompany?.cpCompany || '';
    this.rfcCompany = lastCompany?.rfcCompany || '';
    this.companyNumber = lastCompany?.companyNumber || '';
  }

  confirm() {
    const data = {
      companyName: this.companyName,
      domicileCompany: this.domicileCompany,
      cpCompany: this.cpCompany,
      rfcCompany: this.rfcCompany,
      companyNumber: this.companyNumber
    };

    // Obtiene los datos anteriores del almacenamiento local y agrega el nuevo dato
    const companyData = JSON.parse(localStorage.getItem('companyData') || '[]');
    companyData.push(data);

    // Guarda los datos actualizados en el almacenamiento local
    localStorage.setItem('companyData', JSON.stringify(companyData));

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.companyName, 'confirm');
  }

  ngOnInit() {
    // if(this.state==false){

    // }
  }

}
