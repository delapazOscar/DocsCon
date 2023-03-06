import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  searching = false;
  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  toogleSearch(){
    this.searching = !this.searching;
  }

  async addTemplateButton(){
    // alert('Eso no está programado');
    const alert = await this.alertController.create({
      header: 'Selecciona el documento',
      buttons: ['OK'],
      inputs: [
        {
          label: 'Factura',
          type: 'radio',
          value: 'factura',
        },
        {
          label: 'Contrato',
          type: 'radio',
          value: 'contrato',
        },
        {
          label: 'Préstamo',
          type: 'radio',
          value: 'prestamo',
        },
      ],
    });

    await alert.present();
  }

}
