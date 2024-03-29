import { Component, OnInit } from '@angular/core';
import { Tab3Page } from '../tab3/tab3.page';
import { WelcomePage } from '../welcome/welcome.page';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { setErrorHandler } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  selectedValue:any;

  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {

  }

  async appareance(){
    const alert = await this.alertController.create({
      header: 'Selecciona el tema de tu preferencia',
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            this.selectedValue = data;
            console.log(this.selectedValue)
            if(this.selectedValue == "dark"){
              document.body.classList.toggle('dark');
            }
          }
        }
      ],
      inputs: [
        {
          label: 'Oscuro',
          type: 'radio',
          value: 'dark',
        },
        {
          label: 'Claro',
          type: 'radio',
          value: 'light',
        },
      ],
    });
    await alert.present();
    console.log(this.selectedValue)
  }

}
