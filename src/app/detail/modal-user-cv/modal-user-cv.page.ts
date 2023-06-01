import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatosCurriculumService } from 'src/app/services/datos-curriculum.service';
import { ChequeFirestoreService } from 'src/app/services/firestore/cheque-firestore.service';

interface Estado {
  nombre: string;
  abreviatura: string;
}

@Component({
  selector: 'app-modal-user-cv',
  templateUrl: './modal-user-cv.page.html',
  styleUrls: ['./modal-user-cv.page.scss'],
})
export class ModalUserCvPage implements OnInit {

  nameCv: any;
  municipeCv: any;
  selectedState: any;
  emailCv: any;
  numberCv: any;
  descriptionCv: any;
  estados: Estado[]| undefined;

  personalesFill: boolean = false;
  constructor(private modalCtrl:ModalController, private http:HttpClient, private datosCurriculum:DatosCurriculumService) { }

  ngOnInit() {
    this.http.get<{ estados: Estado[] }>('assets/estados.json').subscribe(data => {
      this.estados = data.estados;
    });
    this.checkFormValues();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      nameCv: this.nameCv,
      municipeCv: this.municipeCv,
      selectedState: this.selectedState,
      emailCv: this.emailCv,
      numberCv: this.numberCv,
      descriptionCv: this.descriptionCv,
      personalesFill: this.personalesFill
    };

    // Asignar los valores de las variables del servicio
    //this.datosFactura.clientName = data.clientName;
    this.datosCurriculum.nameCv = data.nameCv;
    this.datosCurriculum.municipeCv = data.municipeCv;
    this.datosCurriculum.selectedState = data.selectedState;
    this.datosCurriculum.emailCv = data.emailCv;
    this.datosCurriculum.numberCv = data.numberCv;
    this.datosCurriculum.descriptionCv = data.descriptionCv;
    data.personalesFill = true;
    this.datosCurriculum.personalesFill = data.personalesFill;

    this.checkFormValues();
    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss(this.nameCv, 'confirm');
  }

  checkFormValues() {
    if (
      this.nameCv &&
      this.municipeCv &&
      this.selectedState &&
      this.emailCv &&
      this.numberCv &&
      this.descriptionCv
    ) {
      this.personalesFill = true;
    } else {
      this.personalesFill = false;
    }
  }

}
