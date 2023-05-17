import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalGarantePage } from './modal-garante.page';

const routes: Routes = [
  {
    path: '',
    component: ModalGarantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalGarantePageRoutingModule {}
