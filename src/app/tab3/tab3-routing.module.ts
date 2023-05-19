import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page
  },
  {
    path: 'modal-terms',
    loadChildren: () => import('./modal-terms/modal-terms.module').then( m => m.ModalTermsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab3PageRoutingModule {}
