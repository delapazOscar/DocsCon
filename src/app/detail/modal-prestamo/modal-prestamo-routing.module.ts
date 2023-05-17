import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPrestamoPage } from './modal-prestamo.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPrestamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPrestamoPageRoutingModule {}
