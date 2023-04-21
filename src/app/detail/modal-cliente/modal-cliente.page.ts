import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
  rfcClient: string| undefined;
  cfdiUse: string| undefined;
  domicileClient: string| undefined;
  selectedState: string = "";
  clientNumber:string | undefined;
  estados: Estado[]| undefined;

  constructor(private modalCtrl:ModalController, private http:HttpClient) {}

  ngOnInit() {
    this.http.get<{ estados: Estado[] }>('assets/estados.json').subscribe(data => {
      this.estados = data.estados;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.clientName, 'confirm');
  }

}
