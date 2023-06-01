import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTerminosYCondicionesPage } from './modal-terminos-y-condiciones.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTerminosYCondicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTerminosYCondicionesPageRoutingModule {}
