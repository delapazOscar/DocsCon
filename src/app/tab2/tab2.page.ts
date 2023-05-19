import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { delay } from 'rxjs';
import { DocumentsService, Document } from '../services/documents.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  //Barra de busqueda
  searching = false;
  textInput:string = '';

  documentos:Document[] = [];
  searchedDocument: any;

  documents: any[] = [];

  constructor(private router:Router, private alertController:AlertController, private documentsService:DocumentsService, private httpClient:HttpClient) { }

  ngOnInit() {
    this.documentos = this.documentsService.getDocuments();
    this.searchedDocument= this.documentos;
  }

  toogleSearch(){
    this.searching = !this.searching;
    this.textInput = '';
  }

  async addTemplateButton(){
    this.router.navigate(['welcome']);
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
