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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
