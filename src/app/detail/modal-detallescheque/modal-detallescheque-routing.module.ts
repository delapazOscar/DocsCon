import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetalleschequePage } from './modal-detallescheque.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetalleschequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetalleschequePageRoutingModule {}
