import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatosCurriculumService } from 'src/app/services/datos-curriculum.service';

@Component({
  selector: 'app-modal-habilidades-cv',
  templateUrl: './modal-habilidades-cv.page.html',
  styleUrls: ['./modal-habilidades-cv.page.scss'],
})
export class ModalHabilidadesCvPage implements OnInit {

  habilidadesState: any;
  habilitiesCv: Array<any> = [];

  constructor(private modalCtrl:ModalController, private datosCurriculum:DatosCurriculumService,
    private alertController: AlertController) {
      this.habilidadesState = [
        {
          habilitiesCv: ''
        }
      ];
    }

  ngOnInit() {
    this.habilitiesCv = this.datosCurriculum.habilitiesCv;
    const storedProductsCount = this.habilitiesCv.length;
    for (let i = 1; i < storedProductsCount; i++) {
      this.addFormation();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const data = {
      habilitiesCv: this.habilitiesCv,
    };

    this.datosCurriculum.habilitiesCv = data.habilitiesCv;

    // Cierra el modal con un resultado de this.companyName
    this.modalCtrl.dismiss('confirm');
  }

  async addFormation() {
    if (this.habilidadesState.length < 10) {
      const newProduct = {
        habilitiesCv: ''
      };
      this.habilidadesState.push(newProduct);
    }else{
      const alert = await this.alertController.create({
        header: 'Advertencia',
        subHeader: 'Solo se pueden agregar 10 habilidades por curriculum',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }

}
