import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

interface DocumentData {
  name?: string;
  icon?: string;
  color?: string;
  description?: string;
  pregunta1?: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  customAlertOptions = {
    header: 'Selecciona tu empresa',
    message: 'Facturación para:',
    translucent: true,
  }

  isModalOpen = false;
  documentos: Document[];
  searchedDocument: any;

  setOpen(isOpen: boolean){
    this.isModalOpen = isOpen;
  }

  public datos: DocumentData = {};

  constructor(private router:Router,
    private documentsService:DocumentsService,
    private activatedRoute:ActivatedRoute, private loadingController:LoadingController,
    private alertController:AlertController) {
      this.documentos = this.documentsService.getDocuments();
      this.searchedDocument= this.documentos;
     }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.datos = this.documentsService.getDocumentsByName(p.get('name') ?? '')
      console.log(this.datos)

    })
  }

  navigateBack(){
    this.router.navigate(['welcome']);
  }

  async createDocument(){

    const alert = await this.alertController.create({
      header: 'Nombre del documento:',
      buttons: [{
        text: 'OK',
        handler: (data) => {

        }
      }],
      inputs: [
        {
          placeholder: 'Name',
          type: 'text',
          name: 'name'
        },
      ],
    });
    await alert.present();

    // const loading = await this.loadingController.create({
    //   message: 'Creando documento...',
    //   duration: 3000
    //   });

    // await loading.present();
    // await loading.onWillDismiss();
    // this.router.navigate(['welcome/tab2']);
  }

}
