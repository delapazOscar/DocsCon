import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalExperienciaCvPage } from './modal-experiencia-cv.page';

const routes: Routes = [
  {
    path: '',
    component: ModalExperienciaCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalExperienciaCvPageRoutingModule {}
