import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRentaPage } from './modal-renta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRentaPageRoutingModule {}
