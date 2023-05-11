import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAcredorPageRoutingModule } from './modal-acredor-routing.module';

import { ModalAcredorPage } from './modal-acredor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAcredorPageRoutingModule
  ],
  declarations: [ModalAcredorPage]
})
export class ModalAcredorPageModule {}
