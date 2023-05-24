import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatosCurriculumService } from 'src/app/services/datos-curriculum.service';

@Component({
  selector: 'app-modal-experiencia-cv',
  templateUrl: './modal-experiencia-cv.page.html',
  styleUrls: ['./modal-experiencia-cv.page.scss'],
})
export class ModalExperienciaCvPage implements OnInit {

  experienceCv: Array<any> = [];
  experienceState: any;

  constructor(private modalCtrl:ModalController, private datosCurriculum:DatosCurriculumService,
    private alertController: AlertController) {
      this.experienceState = [
        {
          experienceCv: ''
        }
      ];
     }

  ngOnInit() {
    this.experienceCv = this.datosCurriculum.experienceCv;
    const storedProductsCount = this.experienceCv.length;
    for (let i = 1; i < storedProductsCount; i++) {
      this.addFormation();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      experienceCv: this.experienceCv,
    };

    this.datosCurriculum.experienceCv = data.experienceCv;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss('confirm');
  }

  async addFormation() {
    if (this.experienceState.length < 6) {
      const newProduct = {
        experienceCv: ''
      };
      this.experienceState.push(newProduct);
    }else{
      const alert = await this.alertController.create({
        header: 'Advertencia',
        subHeader: 'Solo se pueden agregar 6 experiencias por curriculum',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

}