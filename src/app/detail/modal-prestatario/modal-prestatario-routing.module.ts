import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPrestatarioPage } from './modal-prestatario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPrestatarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPrestatarioPageRoutingModule {}
