import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalHabilidadesCvPage } from './modal-habilidades-cv.page';

const routes: Routes = [
  {
    path: '',
    component: ModalHabilidadesCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalHabilidadesCvPageRoutingModule {}
