import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosContratoService } from 'src/app/services/datos-contrato.service';

@Component({
  selector: 'app-modal-arrendatario',
  templateUrl: './modal-arrendatario.page.html',
  styleUrls: ['./modal-arrendatario.page.scss'],
})
export class ModalArrendatarioPage implements OnInit {

  arrendatarioName: any;
  arrendatarioDomicile: any;
  arrendatarioSexo: any;

  arrendatarioFill: boolean = false;

  constructor(private modalCtrl:ModalController, private datosContrato:DatosContratoService) { }

  ngOnInit() {
    this.arrendatarioName = this.datosContrato.arrendatarioName;
    this.arrendatarioDomicile = this.datosContrato.arrendatarioDomicile;
    this.arrendatarioSexo = this.datosContrato.arrendatarioSexo;
    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      arrendatarioName: this.arrendatarioName,
      arrendatarioDomicile: this.arrendatarioDomicile,
      arrendatarioSexo: this.arrendatarioSexo,
      arrendatarioFill: this.arrendatarioFill
    }

    this.datosContrato.arrendatarioName = data.arrendatarioName;
    this.datosContrato.arrendatarioDomicile = data.arrendatarioDomicile;
    this.datosContrato.arrendatarioSexo = data.arrendatarioSexo;
    data.arrendatarioFill = true;
    this.datosContrato.arrendatarioFill = data.arrendatarioFill;

    // console.log(this.datosContrato.arrendadorName);
    // console.log(this.datosContrato.arrendadorDomicile);
    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

  checkFormValues() {
    if (
      this.arrendatarioName &&
      this.arrendatarioDomicile &&
      this.arrendatarioSexo
    ) {
      this.arrendatarioFill = true;
    } else {
      this.arrendatarioFill = false;
    }
  }
}
