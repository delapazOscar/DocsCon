import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController } from '@ionic/angular';

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

  constructor(private router:Router, private documentsService:DocumentsService, private alertController:AlertController) {

   }

  ngOnInit() {
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

