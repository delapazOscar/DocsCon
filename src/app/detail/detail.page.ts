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
import { ModalUserCvPage } from './modal-user-cv/modal-user-cv.page';
import { ModalFormacionCvPage } from './modal-formacion-cv/modal-formacion-cv.page';
import { ModalHabilidadesCvPage } from './modal-habilidades-cv/modal-habilidades-cv.page';
import { ModalExperienciaCvPage } from './modal-experiencia-cv/modal-experiencia-cv.page';
import { ModalIdiomCvPage } from './modal-idiom-cv/modal-idiom-cv.page';
import { DatosPrestamoService } from '../services/datos-prestamo.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FirestoreDataConverter } from 'firebase/firestore';
import { FirestoreDataService } from '../services/firestore-data.service';
import { DatosCurriculumService } from '../services/datos-curriculum.service';

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

  empresafill: boolean = this.datosFactura.empresafill;
  clienteFill: boolean = this.datosFactura.clienteFill;
  productosFill: boolean = this.datosFactura.productosFill;
  formaPagoFill: boolean = this.datosFactura.formaPagoFill;

  deudorFill: boolean = false;
  acreedorFill: boolean = false;
  acuerdoFill: boolean = false;


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
  curriculumName: any;

  constructor(private router:Router,
    private documentsService:DocumentsService,
    private activatedRoute:ActivatedRoute, private loadingController:LoadingController,
    private alertController:AlertController,
    private modalCtrl: ModalController,
    public datosFactura:DatosfacturaService,
    public datosPagare: DatosPagareService,
    public datosContrato: DatosContratoService,
    public datosCheque: DatosChequeService,
    public datosPrestamo: DatosPrestamoService,
    public datosCurriculum: DatosCurriculumService,
    private fileOpener:FileOpener,
    private file:File,
    private platform:Platform,
    private toastController: ToastController,
    private firestoreData: FirestoreDataService) {
      this.documentos = this.documentsService.getDocuments();
      this.searchedDocument= this.documentos;

     }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.datos = this.documentsService.getDocumentsByName(p.get('name') ?? '')
    })
    //this.empresafill = this.datosFactura.empresafill;
    this.empresafill = this.datosFactura.empresafill;
    this.clienteFill = this.datosFactura.clienteFill;
    this.productosFill = this.datosFactura.productosFill;
    this.formaPagoFill = this.datosFactura.formaPagoFill;
  }

  navigateBack(){
    this.router.navigate(['welcome']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Documento creado exitosamente!',
      duration: 2500,
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

  async showDocumentoAlert() {
    const alert = await this.alertController.create({
      header: 'Nombre del documento:',
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            this.facturaName = data.facturaName;
            this.datosFactura.facturaName = data.facturaName;
            console.log(this.facturaName);
            // this.showLoading();
            this.datosFactura.pdfDownload();

            // this.datosFactura.resetValues();
            this.presentToast();
            this.datosFactura.clienteFill = false;
            this.datosFactura.productosFill = false;
            this.datosFactura.formaPagoFill = false;
            this.datosFactura.empresafill = false;
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Name',
          type: 'text',
          name: 'facturaName',
          attributes: {
            maxlength: 15,
            inputmode: 'text',
          },
        },
      ],
    });

    await alert.present();
  }

  factNum: any;
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
        const factNo = await this.alertController.create({
          header: 'Factura #',
          buttons: [
            {
              text: 'OK',
              handler: (data) => {
                this.factNum = data.factNum;
                this.datosFactura.factNo = data.factNum;

                // Once the invoice number is entered, show the dialog to enter the document name
                this.showDocumentoAlert();
              },
            },
          ],
          inputs: [
            {
              placeholder: 'Factura No.#',
              type: 'number',
              name: 'factNum',
              attributes: {
                maxlength: 5,
                inputmode: 'numeric',
              },
            },
          ],
        });

        await factNo.present();
      }
      break;

    // Handle other cases if needed
    default:
      // Handle default case
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
                  this.presentToast();
                  this.datosContrato.arrendadorFill = false;
                  this.datosContrato.rentaFill = false;
                  this.datosContrato.arrendatarioFill = false;
                }
              }],
              inputs: [
                {
                  placeholder: 'Name',
                  type: 'text',
                  name: 'contratoName',
                  attributes: {
                    maxlength: 15,
                    inputmode: 'text'
                  },
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
                    this.presentToast();
                    this.datosPagare.deudorFill = false;
                    this.datosPagare.acuerdoFill = false;
                    this.datosPagare.acreedorFill = false;
                  }
                }],
                inputs: [
                  {
                    placeholder: 'Name',
                    type: 'text',
                    name: 'pagareName',
                    attributes: {
                      maxlength: 15,
                      inputmode: 'text'
                    },
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
                      this.presentToast();
                      this.datosCheque.detallesFill = false;
                      this.datosCheque.beneficiarioFill = false;
                    }
                  }],
                  inputs: [
                    {
                      placeholder: 'Name',
                      type: 'text',
                      name: 'chequeName',
                      attributes: {
                        maxlength: 15,
                        inputmode: 'text'
                      },
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
                      this.presentToast();
                      this.datosPrestamo.garanteFill = false;
                      this.datosPrestamo.prestamoFill = false;
                      this.datosPrestamo.prestamistaFill = false;
                      this.datosPrestamo.prestatarioFill = false;
                    }
                  }],
                  inputs: [
                    {
                      placeholder: 'Name',
                      type: 'text',
                      name: 'prestamoName',
                      attributes: {
                        maxlength: 15,
                        inputmode: 'text'
                      },
                    },
                  ],
                });
                await alert.present();
              }

            break;

            case 'Curriculum':
              if (!this.datosCurriculum.allValuesEntered()) {
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
                      this.curriculumName = data.curriculumName;
                      this.datosCurriculum.curriculumName = data.curriculumName;
                      console.log(this.datosCurriculum.curriculumName);
                      this.datosCurriculum.pdfDownload();
                      this.presentToast();
                      this.datosCurriculum.idiomasFill = false;
                      this.datosCurriculum.formacionFill = false;
                      this.datosCurriculum.experienciaFill = false;
                      this.datosCurriculum.habilidadesFill = false;
                      this.datosCurriculum.personalesFill = false;
                    }
                  }],
                  inputs: [
                    {
                      placeholder: 'Name',
                      type: 'text',
                      name: 'curriculumName',
                      attributes: {
                        maxlength: 15,
                        inputmode: 'text'
                      },
                    },
                  ],
                });
                await alert.present();
              }
            break;

    }
  }

  message = 'This modal example uses the modalController to present and dismiss modals.';

  updateAlertIcon() {
    const iconElement = document.querySelector('.item-empresa ion-icon');
    if (iconElement) {
      iconElement.setAttribute('name', 'checkmark-circle');
    }
  }

  async openModalEmpresa() {
    const modal = await this.modalCtrl.create({
      component: ModalEmpresaPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    } else {
    }
  }

  async openModalCliente() {
    const modal = await this.modalCtrl.create({
      component: ModalClientePage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    } else {
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
    }else{
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
    }else{
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
    }else{
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
    }else{
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
    }else{
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

  async openModalDatosPersonales(){
    const modal = await this.modalCtrl.create({
      component: ModalUserCvPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalFormacion(){
    const modal = await this.modalCtrl.create({
      component: ModalFormacionCvPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalHabilidades(){
    const modal = await this.modalCtrl.create({
      component: ModalHabilidadesCvPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalExperiencia(){
    const modal = await this.modalCtrl.create({
      component: ModalExperienciaCvPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  async openModalIdiomas(){
    const modal = await this.modalCtrl.create({
      component: ModalIdiomCvPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }


}
