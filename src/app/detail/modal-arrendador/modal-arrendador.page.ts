import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosContratoService } from 'src/app/services/datos-contrato.service';

@Component({
  selector: 'app-modal-arrendador',
  templateUrl: './modal-arrendador.page.html',
  styleUrls: ['./modal-arrendador.page.scss'],
})
export class ModalArrendadorPage implements OnInit {

  arrendadorName: any;
  arrendadorDomicile: any;
  arrendadorSexo: any;

  obligado: any;

  arrendadorFill: boolean = false;

  constructor(private modalCtrl: ModalController, private datosContrato:DatosContratoService) { }

  ngOnInit() {
    this.arrendadorName = this.datosContrato.arrendadorName;
    this.arrendadorDomicile = this.datosContrato.arrendadorDomicile;
    this.arrendadorSexo = this.datosContrato.arrendadorSexo;

    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      arrendadorName: this.arrendadorName,
      arrendadorDomicile: this.arrendadorDomicile,
      arrendadorSexo: this.arrendadorSexo,
      arrendadorFill: this.arrendadorFill
    }

    this.datosContrato.arrendadorName = data.arrendadorName;
    this.datosContrato.arrendadorDomicile = data.arrendadorDomicile;
    this.datosContrato.arrendadorSexo = data.arrendadorSexo;
    data.arrendadorFill = true;
    this.datosContrato.arrendadorFill = data.arrendadorFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.arrendadorName &&
      this.arrendadorDomicile &&
      this.arrendadorSexo
    ) {
      this.arrendadorFill = true;
    } else {
      this.arrendadorFill = false;
    }
  }

}
