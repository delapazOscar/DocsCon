import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFormacionCvPage } from './modal-formacion-cv.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormacionCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFormacionCvPageRoutingModule {}
