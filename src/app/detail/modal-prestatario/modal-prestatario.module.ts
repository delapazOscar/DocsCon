import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPrestatarioPageRoutingModule } from './modal-prestatario-routing.module';

import { ModalPrestatarioPage } from './modal-prestatario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPrestatarioPageRoutingModule
  ],
  declarations: [ModalPrestatarioPage]
})
export class ModalPrestatarioPageModule {}
