import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTermsPage } from './modal-terms.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTermsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTermsPageRoutingModule {}
