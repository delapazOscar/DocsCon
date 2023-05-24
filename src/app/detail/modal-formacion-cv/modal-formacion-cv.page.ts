import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DatosCurriculumService } from 'src/app/services/datos-curriculum.service';

@Component({
  selector: 'app-modal-formacion-cv',
  templateUrl: './modal-formacion-cv.page.html',
  styleUrls: ['./modal-formacion-cv.page.scss'],
})
export class ModalFormacionCvPage implements OnInit {

  formacionState: any;
  formacionCv: Array<any> = [];

  constructor(private modalCtrl:ModalController, private http:HttpClient, private datosCurriculum:DatosCurriculumService,
    private alertController: AlertController) {
      this.formacionState = [
        {
          formacionCv: ''
        }
      ];
     }

  ngOnInit() {
    this.formacionCv = this.datosCurriculum.formacionCv;
    const storedProductsCount = this.formacionCv.length;
    for (let i = 1; i < storedProductsCount; i++) {
      this.addFormation();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      formacionCv: this.formacionCv,
    };

    this.datosCurriculum.formacionCv = data.formacionCv;

    // Asignar los valores de las variables del servicio
    //this.datosFactura.clientName = data.clientName;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss('confirm');
  }

  async addFormation() {
    if (this.formacionState.length < 5) {
      const newProduct = {
        formacionCv: ''
      };
      this.formacionState.push(newProduct);
    }else{
      const alert = await this.alertController.create({
        header: 'Advertencia',
        subHeader: 'Solo se pueden agregar 5 títulos por curriculum',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

}
