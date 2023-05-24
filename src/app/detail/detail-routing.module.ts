import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  },
  {
    path: 'modal-empresa',
    loadChildren: () => import('./modal-empresa/modal-empresa.module').then( m => m.ModalEmpresaPageModule)
  },
  {
    path: 'modal-cliente',
    loadChildren: () => import('./modal-cliente/modal-cliente.module').then( m => m.ModalClientePageModule)
  },
  {
    path: 'modal-productos',
    loadChildren: () => import('./modal-productos/modal-productos.module').then( m => m.ModalProductosPageModule)
  },
  {
    path: 'modal-pago',
    loadChildren: () => import('./modal-pago/modal-pago.module').then( m => m.ModalPagoPageModule)
  },
  {
    path: 'modal-acuerdo',
    loadChildren: () => import('./modal-acuerdo/modal-acuerdo.module').then( m => m.ModalAcuerdoPageModule)
  },
  {
    path: 'modal-deudor',
    loadChildren: () => import('./modal-deudor/modal-deudor.module').then( m => m.ModalDeudorPageModule)
  },
  {
    path: 'modal-acredor',
    loadChildren: () => import('./modal-acredor/modal-acredor.module').then( m => m.ModalAcredorPageModule)
  },
  {
    path: 'modal-arrendador',
    loadChildren: () => import('./modal-arrendador/modal-arrendador.module').then( m => m.ModalArrendadorPageModule)
  },
  {
    path: 'modal-arrendatario',
    loadChildren: () => import('./modal-arrendatario/modal-arrendatario.module').then( m => m.ModalArrendatarioPageModule)
  },
  {
    path: 'modal-renta',
    loadChildren: () => import('./modal-renta/modal-renta.module').then( m => m.ModalRentaPageModule)
  },
  {
    path: 'modal-beneficiario',
    loadChildren: () => import('./modal-beneficiario/modal-beneficiario.module').then( m => m.ModalBeneficiarioPageModule)
  },
  {
    path: 'modal-detallescheque',
    loadChildren: () => import('./modal-detallescheque/modal-detallescheque.module').then( m => m.ModalDetalleschequePageModule)
  },
  {
    path: 'modal-prestamo',
    loadChildren: () => import('./modal-prestamo/modal-prestamo.module').then( m => m.ModalPrestamoPageModule)
  },
  {
    path: 'modal-prestatario',
    loadChildren: () => import('./modal-prestatario/modal-prestatario.module').then( m => m.ModalPrestatarioPageModule)
  },
  {
    path: 'modal-prestamista',
    loadChildren: () => import('./modal-prestamista/modal-prestamista.module').then( m => m.ModalPrestamistaPageModule)
  },
  {
    path: 'modal-garante',
    loadChildren: () => import('./modal-garante/modal-garante.module').then( m => m.ModalGarantePageModule)
  },  {
    path: 'modal-user-cv',
    loadChildren: () => import('./modal-user-cv/modal-user-cv.module').then( m => m.ModalUserCvPageModule)
  },
  {
    path: 'modal-formacion-cv',
    loadChildren: () => import('./modal-formacion-cv/modal-formacion-cv.module').then( m => m.ModalFormacionCvPageModule)
  },
  {
    path: 'modal-habilidades-cv',
    loadChildren: () => import('./modal-habilidades-cv/modal-habilidades-cv.module').then( m => m.ModalHabilidadesCvPageModule)
  },
  {
    path: 'modal-experiencia-cv',
    loadChildren: () => import('./modal-experiencia-cv/modal-experiencia-cv.module').then( m => m.ModalExperienciaCvPageModule)
  },
  {
    path: 'modal-idiom-cv',
    loadChildren: () => import('./modal-idiom-cv/modal-idiom-cv.module').then( m => m.ModalIdiomCvPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
