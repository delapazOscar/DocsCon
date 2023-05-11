import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDeudorPageRoutingModule } from './modal-deudor-routing.module';

import { ModalDeudorPage } from './modal-deudor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDeudorPageRoutingModule
  ],
  declarations: [ModalDeudorPage]
})
export class ModalDeudorPageModule {}
