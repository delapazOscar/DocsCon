import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalGarantePageRoutingModule } from './modal-garante-routing.module';

import { ModalGarantePage } from './modal-garante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalGarantePageRoutingModule
  ],
  declarations: [ModalGarantePage]
})
export class ModalGarantePageModule {}
