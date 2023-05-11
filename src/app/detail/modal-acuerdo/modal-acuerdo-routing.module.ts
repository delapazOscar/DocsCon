import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAcuerdoPage } from './modal-acuerdo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAcuerdoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAcuerdoPageRoutingModule {}
