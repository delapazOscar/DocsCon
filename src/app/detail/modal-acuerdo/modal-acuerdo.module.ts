import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAcuerdoPageRoutingModule } from './modal-acuerdo-routing.module';

import { ModalAcuerdoPage } from './modal-acuerdo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAcuerdoPageRoutingModule
  ],
  declarations: [ModalAcuerdoPage]
})
export class ModalAcuerdoPageModule {}
