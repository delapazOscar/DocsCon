import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArrendatarioPage } from './modal-arrendatario.page';

const routes: Routes = [
  {
    path: '',
    component: ModalArrendatarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalArrendatarioPageRoutingModule {}
