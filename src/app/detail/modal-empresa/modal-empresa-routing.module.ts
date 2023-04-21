import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEmpresaPage } from './modal-empresa.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEmpresaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEmpresaPageRoutingModule {}
