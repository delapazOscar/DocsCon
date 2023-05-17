import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBeneficiarioPage } from './modal-beneficiario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBeneficiarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBeneficiarioPageRoutingModule {}
