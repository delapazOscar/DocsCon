import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatosCurriculumService } from 'src/app/services/datos-curriculum.service';

@Component({
  selector: 'app-modal-idiom-cv',
  templateUrl: './modal-idiom-cv.page.html',
  styleUrls: ['./modal-idiom-cv.page.scss'],
})
export class ModalIdiomCvPage implements OnInit {

  idiomsCv: Array<any> = [];
  idiomState:any;

  constructor(private modalCtrl:ModalController, private datosCurriculum:DatosCurriculumService,
    private alertController: AlertController) {
      this.idiomState = [
        {
          idiomsCv: ''
        }
      ];
    }

  ngOnInit() {
    this.idiomsCv = this.datosCurriculum.idiomsCv;
    const storedProductsCount = this.idiomsCv.length;
    for (let i = 1; i < storedProductsCount; i++) {
      this.addFormation();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      idiomsCv: this.idiomsCv
    };

    this.datosCurriculum.idiomsCv = data.idiomsCv;

    this.modalCtrl.dismiss('confirm');
  }

  async addFormation() {
    if (this.idiomState.length < 10) {
      const newProduct = {
        idiomsCv: ''
      };
      this.idiomState.push(newProduct);
    }else{
      const alert = await this.alertController.create({
        header: 'Advertencia',
        subHeader: 'Solo se pueden agregar 10 idiomas por curriculum',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

}
