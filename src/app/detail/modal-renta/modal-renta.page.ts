import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosContratoService } from 'src/app/services/datos-contrato.service';

interface Estado {
  nombre: string;
  abreviatura: string;
}

@Component({
  selector: 'app-modal-renta',
  templateUrl: './modal-renta.page.html',
  styleUrls: ['./modal-renta.page.scss'],
})
export class ModalRentaPage implements OnInit {

  constructor(private modalCtrl:ModalController, private datosContrato:DatosContratoService, private http:HttpClient) { }

  domicileHouseToRent: any;
  metrosCuadrados: any;
  noHabitaciones: any;
  duracionContrato: any;
  inicioRenta: any;
  mensualidadRenta: any;
  contractMunicipe: any;

  estados: Estado[]| undefined;
  selectedState: any;

  ngOnInit() {
    this.http.get<{ estados: Estado[] }>('assets/estados.json').subscribe(data => {
      this.estados = data.estados;
    });

    this.domicileHouseToRent = this.datosContrato.domicileHouseToRent;
    this.metrosCuadrados = this.datosContrato.metrosCuadrados;
    this.noHabitaciones = this.datosContrato.noHabitaciones;
    this.duracionContrato = this.datosContrato.duracionContrato;
    this.inicioRenta = this.datosContrato.inicioRenta;
    this.mensualidadRenta = this.datosContrato.mensualidadRenta;
    this.contractMunicipe = this.datosContrato.contractMunicipe;
    this.selectedState = this.datosContrato.selectedState;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      domicileHouseToRent: this.domicileHouseToRent,
      metrosCuadrados: this.metrosCuadrados,
      noHabitaciones: this.noHabitaciones,
      duracionContrato: this.duracionContrato,
      inicioRenta: this.inicioRenta,
      mensualidadRenta: this.mensualidadRenta,
      contractMunicipe: this.contractMunicipe,
      selectedState: this.selectedState,
    }

    this.datosContrato.domicileHouseToRent = data.domicileHouseToRent;
    this.datosContrato.metrosCuadrados = data.metrosCuadrados;
    this.datosContrato.noHabitaciones = data.noHabitaciones;
    this.datosContrato.duracionContrato = data.duracionContrato;
    this.datosContrato.inicioRenta = data.inicioRenta;
    this.datosContrato.mensualidadRenta = data.mensualidadRenta;
    this.datosContrato.contractMunicipe = data.contractMunicipe;
    this.datosContrato.selectedState = data.selectedState;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
