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

  constructor(private modalCtrl: ModalController, private datosContrato:DatosContratoService) { }

  ngOnInit() {
    this.arrendadorName = this.datosContrato.arrendadorName;
    this.arrendadorDomicile = this.datosContrato.arrendadorDomicile;
    this.arrendadorSexo = this.datosContrato.arrendadorSexo;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      arrendadorName: this.arrendadorName,
      arrendadorDomicile: this.arrendadorDomicile,
      arrendadorSexo: this.arrendadorSexo,
    }

    this.datosContrato.arrendadorName = data.arrendadorName;
    this.datosContrato.arrendadorDomicile = data.arrendadorDomicile;
    this.datosContrato.arrendadorSexo = data.arrendadorSexo;

    // if(this.arrendadorSexo = 'Hombre'){
    //   this.obligado = 'obligado'
    // }else{
    //   this.obligado = 'obligada'
    // }

    // console.log(this.datosContrato.arrendadorName);
    // console.log(this.datosContrato.arrendadorDomicile);

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.modalCtrl, 'confirm');
  }

}
