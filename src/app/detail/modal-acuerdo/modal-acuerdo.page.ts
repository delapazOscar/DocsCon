import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosPagareService } from 'src/app/services/datos-pagare.service';

import * as moment from 'moment';
import * as numberToWords from 'number-to-words';
import { toWords } from 'number-to-words';

interface Estado {
  nombre: string;
  abreviatura: string;
}

interface Moneda{
  nombre: string;
}

@Component({
  selector: 'app-modal-acuerdo',
  templateUrl: './modal-acuerdo.page.html',
  styleUrls: ['./modal-acuerdo.page.scss'],
})

export class ModalAcuerdoPage implements OnInit {

  dateAcuerdo:any;
  acuerdoPlace: any;
  acuerdoQuantity: any;
  quantityLetter: any;
  acuerdoInteres: any;
  acuerdoMunicipio: any;
  fechaAcuerdo: any;
  public selectedCurrency: string = '';

  estados: Estado[]| undefined;
  selectedState: any;

  constructor(private modalCtrl: ModalController, private http:HttpClient, private datosPagare:DatosPagareService) {}

  public monedas = [
    { nombre: 'Peso mexicano', codigo: 'MXN' },
    { nombre: 'Dólar estadounidense', codigo: 'USD' },
    { nombre: 'Euro', codigo: 'EUR' },
    { nombre: 'Libra esterlina', codigo: 'GBP' },
    { nombre: 'Yen japonés', codigo: 'JPY' },
    { nombre: 'Dólar canadiense', codigo: 'CAD' },
  ];

  ngOnInit() {
    this.http.get<{ estados: Estado[] }>('assets/estados.json').subscribe(data => {
      this.estados = data.estados;
    });

    this.dateAcuerdo = this.datosPagare.dateAcuerdo;
    this.acuerdoPlace = this.datosPagare.acuerdoPlace;
    this.acuerdoQuantity = this.datosPagare.acuerdoQuantity;
    this.acuerdoInteres = this.datosPagare.acuerdoInteres;
    this.acuerdoMunicipio = this.datosPagare.acuerdoMunicipio;
    this.selectedState = this.datosPagare.selectedState;
    this.selectedCurrency = this.datosPagare.moneda;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    this.dateAcuerdo = this.ajustarLongitud(this.dateAcuerdo);

    const data = {
      dateAcuerdo: this.dateAcuerdo,
      acuerdoPlace: this.acuerdoPlace,
      acuerdoQuantity: this.acuerdoQuantity,
      acuerdoInteres: this.acuerdoInteres,
      acuerdoMunicipio: this.acuerdoMunicipio,
      selectedState: this.selectedState,
      fechaAcuerdo: this.fechaAcuerdo,
      quantityLetter: this.quantityLetter,
      selectedCurrency: this.selectedCurrency,
    };

    this.quantityLetter = toWords(this.acuerdoQuantity);

    // Asignar los valores de las variables del servicio
    //this.datosPagare.moneda = data.moneda
    this.datosPagare.quantityLetter = this.quantityLetter;
    this.datosPagare.dateAcuerdo = data.dateAcuerdo;
    this.datosPagare.acuerdoPlace = data.acuerdoPlace;
    this.datosPagare.acuerdoQuantity = data.acuerdoQuantity;
    this.datosPagare.acuerdoInteres = data.acuerdoInteres;
    this.datosPagare.selectedState = data.selectedState;
    this.datosPagare.acuerdoMunicipio = data.acuerdoMunicipio;
    this.datosPagare.moneda = data.selectedCurrency;

    // Imprimir los valores asignados en consola

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  public ajustarLongitud(cadena: string): string {
    if (cadena.length > 5) {
      cadena = cadena.substring(0, 9);
    }
    return cadena;
  }

}
