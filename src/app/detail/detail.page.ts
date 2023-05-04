import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModalEmpresaPage } from './modal-empresa/modal-empresa.page';
import { ModalClientePage } from './modal-cliente/modal-cliente.page';
import { ModalProductosPage } from './modal-productos/modal-productos.page';
import { ModalPagoPage } from './modal-pago/modal-pago.page';
import { DatosfacturaService } from '../services/datosfactura.service';

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
  selectedDocument: any;


  setOpen(isOpen: boolean){
    this.isModalOpen = isOpen;
  }

  public datos: DocumentData = {};

  constructor(private router:Router,
    private documentsService:DocumentsService,
    private activatedRoute:ActivatedRoute, private loadingController:LoadingController,
    private alertController:AlertController,
    private modalCtrl: ModalController,
    private datosFactura:DatosfacturaService) {
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

    if (!this.datosFactura.allValuesEntered()) {
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        subHeader: 'Por favor llene todos los datos requeridos',
        buttons: ['OK'],
      });

      await alert.present();

    }else{
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
    }

    // const loading = await this.loadingController.create({
    //   message: 'Creando documento...',
    //   duration: 3000
    //   });

    // await loading.present();
    // await loading.onWillDismiss();
    // this.router.navigate(['welcome/tab2']);
  }

  message = 'This modal example uses the modalController to present and dismiss modals.';

  async openModalEmpresa(){
    const modal = await this.modalCtrl.create({
      component: ModalEmpresaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalCliente(){
    const modal = await this.modalCtrl.create({
      component: ModalClientePage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalProductos(){
    const modal = await this.modalCtrl.create({
      component: ModalProductosPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalPago(){
    const modal = await this.modalCtrl.create({
      component: ModalPagoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }


}
