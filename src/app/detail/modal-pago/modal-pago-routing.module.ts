import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPagoPage } from './modal-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPagoPageRoutingModule {}
