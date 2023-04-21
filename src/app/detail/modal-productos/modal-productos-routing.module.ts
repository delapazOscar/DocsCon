import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalProductosPage } from './modal-productos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalProductosPageRoutingModule {}
