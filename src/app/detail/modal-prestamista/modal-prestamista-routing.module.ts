import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPrestamistaPage } from './modal-prestamista.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPrestamistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPrestamistaPageRoutingModule {}
