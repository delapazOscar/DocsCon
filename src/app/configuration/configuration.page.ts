import { Component, OnInit } from '@angular/core';
import { Tab3Page } from '../tab3/tab3.page';
import { WelcomePage } from '../welcome/welcome.page';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { setErrorHandler } from 'ionicons/dist/types/stencil-public-runtime';
import { ModalTerminosYCondicionesPage } from '../modal-terminos-y-condiciones/modal-terminos-y-condiciones.page';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  selectedValue:any;
  message: any;

  constructor(private router:Router, private alertController:AlertController, private modalCtrl:ModalController) { }

  ngOnInit() {

  }

  async openModalTerms(){
    const modal = await this.modalCtrl.create({
      component: ModalTerminosYCondicionesPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

}
