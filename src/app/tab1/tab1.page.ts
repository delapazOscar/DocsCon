import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  //Barra de busqueda
  searching = false;
  textInput:string = '';

  //Documentos
  documentos:Document[] = [];
  searchedDocument: any;

  constructor(private router:Router, private documentsService:DocumentsService, private alertController:AlertController,
    private platform: Platform, private navCtrl: NavController) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        // Lógica personalizada para controlar el comportamiento del botón de retroceso del dispositivo
        this.onBackButton();
      });
   }
   async onBackButton() {
    const isLoggedIn = true; // Tu lógica para verificar si el usuario ha iniciado sesión

    if (isLoggedIn) {
      // Mostrar mensaje o redirigir a otra página
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'No puedes regresar a la página anterior.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      // Permitir navegar hacia atrás
      this.navCtrl.navigateBack('/home');
    }
  }

  ngOnInit() {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      history.go(1);
    };
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   // Desactivar el botón de retroceso
    //   return;
    // });

    this.documentos = this.documentsService.getDocuments();
    this.searchedDocument= this.documentos;
  }

  toogleSearch(){
    this.searching = !this.searching;
    this.textInput = '';
  }

  searchCustomer(event:any){
    const text = event.target.value;
    this.searchedDocument = this.documentos;
    if(text && text.trim() != ''){
      this.searchedDocument = this.searchedDocument.filter((documents: any)=>{
        return (documents.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  cardDocument(name: string){
    this.router.navigate(['detail', name]);
  }

}

