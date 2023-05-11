import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAcredorPage } from './modal-acredor.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAcredorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAcredorPageRoutingModule {}
