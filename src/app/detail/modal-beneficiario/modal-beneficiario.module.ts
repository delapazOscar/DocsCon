import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBeneficiarioPageRoutingModule } from './modal-beneficiario-routing.module';

import { ModalBeneficiarioPage } from './modal-beneficiario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBeneficiarioPageRoutingModule
  ],
  declarations: [ModalBeneficiarioPage]
})
export class ModalBeneficiarioPageModule {}
