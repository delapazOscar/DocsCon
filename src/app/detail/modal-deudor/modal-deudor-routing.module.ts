import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDeudorPage } from './modal-deudor.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDeudorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDeudorPageRoutingModule {}
