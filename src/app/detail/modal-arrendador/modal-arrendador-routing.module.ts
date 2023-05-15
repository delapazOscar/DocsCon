import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArrendadorPage } from './modal-arrendador.page';

const routes: Routes = [
  {
    path: '',
    component: ModalArrendadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalArrendadorPageRoutingModule {}
