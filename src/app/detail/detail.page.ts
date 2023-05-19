import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModalEmpresaPage } from './modal-empresa/modal-empresa.page';
import { ModalClientePage } from './modal-cliente/modal-cliente.page';
import { ModalProductosPage } from './modal-productos/modal-productos.page';
import { ModalPagoPage } from './modal-pago/modal-pago.page';
import { ModalAcuerdoPage } from './modal-acuerdo/modal-acuerdo.page';
import { ModalDeudorPage } from './modal-deudor/modal-deudor.page';
import { ModalAcredorPage } from './modal-acredor/modal-acredor.page';
import { ModalArrendadorPage } from './modal-arrendador/modal-arrendador.page';
import { ModalArrendatarioPage } from './modal-arrendatario/modal-arrendatario.page';
import { ModalRentaPage } from './modal-renta/modal-renta.page';
import { ModalBeneficiarioPage } from './modal-beneficiario/modal-beneficiario.page';
import { ModalDetalleschequePage } from './modal-detallescheque/modal-detallescheque.page';
import { DatosfacturaService } from '../services/datosfactura.service';
import { DatosPagareService } from '../services/datos-pagare.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { DatosContratoService } from '../services/datos-contrato.service';
import { DatosChequeService } from '../services/datos-cheque.service';
import { ModalPrestamoPage } from './modal-prestamo/modal-prestamo.page';
import { ModalPrestatarioPage } from './modal-prestatario/modal-prestatario.page';
import { ModalPrestamistaPage } from './modal-prestamista/modal-prestamista.page';
import { ModalGarantePage } from './modal-garante/modal-garante.page';
import { DatosPrestamoService } from '../services/datos-prestamo.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


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
  facturaName: string | undefined;
  pagareName: string | undefined;
  contratoName: any;
  chequeName: any;
  prestamoName: any;

  constructor(private router:Router,
    private documentsService:DocumentsService,
    private activatedRoute:ActivatedRoute, private loadingController:LoadingController,
    private alertController:AlertController,
    private modalCtrl: ModalController,
    private datosFactura:DatosfacturaService,
    private datosPagare: DatosPagareService,
    private datosContrato: DatosContratoService,
    private datosCheque: DatosChequeService,
    private datosPrestamo: DatosPrestamoService,
    private fileOpener:FileOpener,
    private file:File,
    private platform:Platform,
    private toastController: ToastController) {
      this.documentos = this.documentsService.getDocuments();
      this.searchedDocument= this.documentos;

     }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.datos = this.documentsService.getDocumentsByName(p.get('name') ?? '')
    })
  }

  navigateBack(){
    this.router.navigate(['welcome']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Documento creado exitosamente!',
      duration: 3000,
      position: 'top',
      icon: 'checkmark-circle'
    });

    await toast.present();
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      duration: 2000,
      spinner: 'circles',
    });

    loading.present();
  }

  async createDocument(){

    switch (this.datos.name) {
      case 'Factura':
        if (!this.datosFactura.allValuesEntered()) {
          const alert = await this.alertController.create({
            header: 'Datos Incompletos',
            subHeader: 'Por favor llene todos los datos requeridos',
            buttons: ['OK'],
          });

          await alert.present();

        } else {
          const alert = await this.alertController.create({
            header: 'Nombre del documento:',
            buttons: [{
              text: 'OK',
              handler: (data) => {
                this.facturaName = data.facturaName;
                this.datosFactura.facturaName = data.facturaName;
                console.log(this.facturaName);
                // this.showLoading();
                this.datosFactura.pdfDownload();
                this.datosFactura.resetValues();
                this.presentToast();

              }
            }],
            inputs: [
              {
                placeholder: 'Name',
                type: 'text',
                name: 'facturaName'
              },
            ],
          });
          await alert.present();
        }
        break;

        case 'Contrato':
          if (!this.datosContrato.allValuesEntered()) {
            const alert = await this.alertController.create({
              header: 'Datos Incompletos',
              subHeader: 'Por favor llene todos los datos requeridos',
              buttons: ['OK'],
            });

            await alert.present();

          } else {
            const alert = await this.alertController.create({
              header: 'Nombre del documento:',
              buttons: [{
                text: 'OK',
                handler: (data) => {
                  this.contratoName = data.contratoName;
                  this.datosContrato.contratoName = data.contratoName;
                  console.log(this.datosContrato.contratoName);
                  this.datosContrato.pdfDownload();
                  this.datosContrato.resetValues();
                  this.presentToast();
                }
              }],
              inputs: [
                {
                  placeholder: 'Name',
                  type: 'text',
                  name: 'contratoName'
                },
              ],
            });
            await alert.present();
          }


          break;

          case 'Pagaré':
            if (!this.datosPagare.allValuesEntered()) {
              const alert = await this.alertController.create({
                header: 'Datos Incompletos',
                subHeader: 'Por favor llene todos los datos requeridos',
                buttons: ['OK'],
              });

              await alert.present();

            } else {
              const alert = await this.alertController.create({
                header: 'Nombre del documento:',
                buttons: [{
                  text: 'OK',
                  handler: (data) => {
                    this.pagareName = data.pagareName;
                    this.datosPagare.pagareName = data.pagareName;
                    console.log(this.datosPagare.pagareName);
                    this.datosPagare.pdfDownload();
                    this.datosPagare.resetValues();
                    this.presentToast();
                  }
                }],
                inputs: [
                  {
                    placeholder: 'Name',
                    type: 'text',
                    name: 'pagareName'
                  },
                ],
              });
              await alert.present();
            }
            break;

            case 'Cheque':
              if (!this.datosCheque.allValuesEntered()) {
                const alert = await this.alertController.create({
                  header: 'Datos Incompletos',
                  subHeader: 'Por favor llene todos los datos requeridos',
                  buttons: ['OK'],
                });

                await alert.present();

              } else {
                const alert = await this.alertController.create({
                  header: 'Nombre del documento:',
                  buttons: [{
                    text: 'OK',
                    handler: (data) => {
                      this.chequeName = data.chequeName;
                      this.datosCheque.chequeName = data.chequeName;
                      console.log(this.datosCheque.chequeName);
                      this.datosCheque.pdfDownload();
                      this.datosCheque.resetValues();
                      this.presentToast();
                    }
                  }],
                  inputs: [
                    {
                      placeholder: 'Name',
                      type: 'text',
                      name: 'chequeName'
                    },
                  ],
                });
                await alert.present();
              }

            break;

            case 'Préstamo':
              if (!this.datosPrestamo.allValuesEntered()) {
                const alert = await this.alertController.create({
                  header: 'Datos Incompletos',
                  subHeader: 'Por favor llene todos los datos requeridos',
                  buttons: ['OK'],
                });

                await alert.present();

              } else {
                const alert = await this.alertController.create({
                  header: 'Nombre del documento:',
                  buttons: [{
                    text: 'OK',
                    handler: (data) => {
                      this.prestamoName = data.prestamoName;
                      this.datosPrestamo.prestamoName = data.prestamoName;
                      console.log(this.datosPrestamo.prestamoName);
                      this.datosPrestamo.pdfDownload();
                      this.datosPrestamo.resetValues();
                      this.presentToast();
                    }
                  }],
                  inputs: [
                    {
                      placeholder: 'Name',
                      type: 'text',
                      name: 'prestamoName'
                    },
                  ],
                });
                await alert.present();
              }

            break;

    }
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

  async openModalAcuerdo(){
    const modal = await this.modalCtrl.create({
      component: ModalAcuerdoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalDeudor(){
    const modal = await this.modalCtrl.create({
      component: ModalDeudorPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalAcredor(){
    const modal = await this.modalCtrl.create({
      component: ModalAcredorPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalArrendador(){
    const modal = await this.modalCtrl.create({
      component: ModalArrendadorPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalArrendatario(){
    const modal = await this.modalCtrl.create({
      component: ModalArrendatarioPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalRenta(){
    const modal = await this.modalCtrl.create({
      component: ModalRentaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalBeneficiario(){
    const modal = await this.modalCtrl.create({
      component: ModalBeneficiarioPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModaldetallescheque(){
    const modal = await this.modalCtrl.create({
      component: ModalDetalleschequePage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalPrestamo(){
    const modal = await this.modalCtrl.create({
      component: ModalPrestamoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalPrestatario(){
    const modal = await this.modalCtrl.create({
      component: ModalPrestatarioPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalPrestamista(){
    const modal = await this.modalCtrl.create({
      component: ModalPrestamistaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalGarante(){
    const modal = await this.modalCtrl.create({
      component: ModalGarantePage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }


}
