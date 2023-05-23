import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { delay, forkJoin } from 'rxjs';
import { DocumentsService, Document } from '../services/documents.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { FirestoreDataService } from '../services/firestore-data.service';
import { FacturaFirestoreService } from '../services/firestore/factura-firestore.service';
import { ContratoService } from '../services/firestore/contrato.service';
import { PagareFirestoreService } from '../services/firestore/pagare-firestore.service';
import { PrestamoFirestoreService } from '../services/firestore/prestamo-firestore.service';
import { ChequeFirestoreService } from '../services/firestore/cheque-firestore.service';


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

  uid: any;

  documentNames: any[] = [];
  filteredDocuments: any[] = [];

  isLoading: boolean = true;
  popover?: HTMLIonPopoverElement;

  constructor(private router:Router, private alertController:AlertController, private toastController:ToastController,
    private documentsService:DocumentsService, private httpClient:HttpClient,
    private angularFirestore: AngularFirestore, private authService: AuthService,
    private firestoreData: FirestoreDataService, private popoverController: PopoverController,
    private facturaFirestoreService: FacturaFirestoreService, private contratoService: ContratoService,
    private pagareFirestoreService:PagareFirestoreService, private prestamoFirestoreService: PrestamoFirestoreService,
    private chequeFirestoreService:ChequeFirestoreService) { }

    async ngOnInit() {
      this.documentos = this.documentsService.getDocuments();
      await this.getUid();
      const facturas$ = this.firestoreData.getDocumentNames(this.uid, 'facturas');
      const contratos$ = this.firestoreData.getDocumentNames(this.uid, 'contratos');
      const pagares$ = this.firestoreData.getDocumentNames(this.uid, 'pagarés');
      const cheques$ = this.firestoreData.getDocumentNames(this.uid, 'cheques');
      const prestamos$ = this.firestoreData.getDocumentNames(this.uid, 'préstamos');

      forkJoin([facturas$, contratos$, pagares$, cheques$, prestamos$]).subscribe(([facturas, contratos, pagares, cheques, prestamos]) => {
        this.documentNames = [...facturas, ...contratos, ...pagares, ...cheques, ...prestamos];
        this.filterDocuments('');
        this.refreshData(null);
        this.isLoading = false; // Loading is complete, set the flag to false
      });
    }

    async refreshData(event: any) {
      const facturas$ = this.firestoreData.getDocumentNames(this.uid, 'facturas');
      const contratos$ = this.firestoreData.getDocumentNames(this.uid, 'contratos');
      const pagares$ = this.firestoreData.getDocumentNames(this.uid, 'pagarés');
      const chques$ = this.firestoreData.getDocumentNames(this.uid, 'cheques');
      const prestamos$ = this.firestoreData.getDocumentNames(this.uid, 'préstamos');


      forkJoin([facturas$, contratos$, pagares$, chques$, prestamos$]).subscribe(([facturas, contratos, pagares, cheques, prestamos]) => {
        this.documentNames = [...facturas, ...contratos, ...pagares, ...cheques, ...prestamos];
        this.filteredDocuments = this.documentNames;
        this.isLoading = false;// Actualiza filteredDocuments con los nuevos datos
      });
      this.isLoading = true;
      event.target.complete();
    }

  async deleteDocument(uid: string, subcoleccion: string, documento: string) {
    await this.firestoreData.deleteDocument(uid, subcoleccion, documento);
    // Realizar cualquier otra lógica después de eliminar el documento
    this.refreshData(null);
  }

  async confirmDelete(uid: string, subcoleccion: string, documento: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este documento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteDocument(uid, subcoleccion, documento);
          }
        }
      ]
    });

    await alert.present();
  }


  async getUid(){
    let uid = await this.authService.getUser();
    if(uid){
      this.uid = uid;
      localStorage.setItem('uid', uid);
      console.log(uid);
    } else {
      uid = localStorage.getItem('uid');
      if(uid){
        this.uid = uid;
      } else {
        console.log('No se pudo encontrar un UID válido');
      }
    }
  }

  toogleSearch(){
    this.searching = !this.searching;
    this.textInput = '';
  }

  async addTemplateButton(){
    this.router.navigate(['welcome']);
  }

  searchCustomer(event: any) {
    const text = event.target.value;
    this.filterDocuments(text);
  }

  filterDocuments(text: string) {
    this.filteredDocuments = this.documentNames.filter((document: any) => {
      return document.id.toLowerCase().includes(text.toLowerCase());
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Documento descargado!',
      duration: 2500,
      position: 'top',
      icon: 'checkmark-circle'
    });

    await toast.present();
  }

  async downloadFirestorePdf(uid: string, documentId: string, documentName: string) {
    try {
      const documentData = await this.facturaFirestoreService.getDocumentData(uid, documentName.toLowerCase() + 's', documentId);
      if (documentData) {
        switch (documentName) {
          case 'Contrato':
            this.contratoService.pdfDownload(uid, documentData);
            this.presentToast();
            break;
          case 'Factura':
            this.facturaFirestoreService.pdfDownload(uid, documentData);
            this.presentToast();
            break;
          case 'Pagaré':
            this.pagareFirestoreService.pdfDownload(uid, documentData);
            this.presentToast();
            break;
          case 'Cheque':
            this.chequeFirestoreService.pdfDownload(uid, documentData);
            this.presentToast();
            break;
          case 'Préstamo':
            this.prestamoFirestoreService.pdfDownload(uid, documentData);
            this.presentToast();
            break;
          // Agrega más casos según los nombres de los documentos que tengas
          default:
            console.log('No se encontró una función específica para el documento:', documentName);
            break;
        }
      } else {
        console.log('El documento no existe o no se encontraron datos.');
      }
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  }



}
