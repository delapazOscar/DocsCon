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

  estados: string[] | undefined;

  constructor(private modalCtrl:ModalController, private datosContrato:DatosContratoService, private http:HttpClient) {
    this.estados = [
      'Aguascalientes',
      'Baja California',
      'Baja California Sur',
      'Campeche',
      'Chiapas',
      'Chihuahua',
      'Ciudad de México',
      'Coahuila',
      'Colima',
      'Durango',
      'Estado de México',
      'Guanajuato',
      'Guerrero',
      'Hidalgo',
      'Jalisco',
      'Michoacán',
      'Morelos',
      'Nayarit',
      'Nuevo León',
      'Oaxaca',
      'Puebla',
      'Querétaro',
      'Quintana Roo',
      'San Luis Potosí',
      'Sinaloa',
      'Sonora',
      'Tabasco',
      'Tamaulipas',
      'Tlaxcala',
      'Veracruz',
      'Yucatán',
      'Zacatecas'
    ];
   }

  domicileHouseToRent: any;
  metrosCuadrados: any;
  noHabitaciones: any;
  duracionContrato: any;
  inicioRenta: any;
  mensualidadRenta: any;
  contractMunicipe: any;
  selectedState: any;

  rentaFill:boolean = false;

  ngOnInit() {
    this.domicileHouseToRent = this.datosContrato.domicileHouseToRent;
    this.metrosCuadrados = this.datosContrato.metrosCuadrados;
    this.noHabitaciones = this.datosContrato.noHabitaciones;
    this.duracionContrato = this.datosContrato.duracionContrato;
    this.inicioRenta = this.datosContrato.inicioRenta;
    this.mensualidadRenta = this.datosContrato.mensualidadRenta;
    this.contractMunicipe = this.datosContrato.contractMunicipe;
    this.selectedState = this.datosContrato.selectedState;
    this.checkFormValues();
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
      rentaFill: this.rentaFill
    }

    this.datosContrato.domicileHouseToRent = data.domicileHouseToRent;
    this.datosContrato.metrosCuadrados = data.metrosCuadrados;
    this.datosContrato.noHabitaciones = data.noHabitaciones;
    this.datosContrato.duracionContrato = data.duracionContrato;
    this.datosContrato.inicioRenta = data.inicioRenta;
    this.datosContrato.mensualidadRenta = data.mensualidadRenta;
    this.datosContrato.contractMunicipe = data.contractMunicipe;
    this.datosContrato.selectedState = data.selectedState;
    data.rentaFill = true;
    this.datosContrato.rentaFill = data.rentaFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.domicileHouseToRent &&
      this.metrosCuadrados &&
      this.noHabitaciones &&
      this.duracionContrato &&
      this.inicioRenta &&
      this.mensualidadRenta &&
      this.contractMunicipe &&
      this.selectedState
    ) {
      this.rentaFill = true;
    } else {
      this.rentaFill = false;
    }
  }

}
