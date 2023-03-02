import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController } from '@ionic/angular';

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

  constructor(private router:Router, private _documentsService:DocumentsService, private alertController:AlertController) {

   }

  ngOnInit() {
    this.documentos = this._documentsService.getDocuments();
    this.searchedDocument= this.documentos;
  }

  async addTemplateButton(){
    // alert('Eso no está programado');
    const alert = await this.alertController.create({
      header: 'Nuevo Documento',
      buttons: [
        {
        text:'Crear',
        handler:()=>{
            //console.log("Crear perron");
            //let nameDocument: string;
        }
        }
      ],
      inputs: [
        {
          placeholder: 'Nombre del documento',
          min:1,
          max:15
        },
      ],
    });

    await alert.present();
  }

  toogleSearch(){
    this.searching = !this.searching;
    this.textInput = '';
  }

  goToDocument(){

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

}

