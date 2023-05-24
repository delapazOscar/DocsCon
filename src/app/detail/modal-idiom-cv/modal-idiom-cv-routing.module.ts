import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalIdiomCvPage } from './modal-idiom-cv.page';

const routes: Routes = [
  {
    path: '',
    component: ModalIdiomCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalIdiomCvPageRoutingModule {}
