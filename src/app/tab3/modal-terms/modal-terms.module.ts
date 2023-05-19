import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTermsPageRoutingModule } from './modal-terms-routing.module';

import { ModalTermsPage } from './modal-terms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTermsPageRoutingModule
  ],
  declarations: [ModalTermsPage]
})
export class ModalTermsPageModule {}
