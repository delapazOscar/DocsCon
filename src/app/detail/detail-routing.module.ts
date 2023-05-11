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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
