import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUserCvPage } from './modal-user-cv.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUserCvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUserCvPageRoutingModule {}
