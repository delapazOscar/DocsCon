import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFormacionCvPageRoutingModule } from './modal-formacion-cv-routing.module';

import { ModalFormacionCvPage } from './modal-formacion-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFormacionCvPageRoutingModule
  ],
  declarations: [ModalFormacionCvPage]
})
export class ModalFormacionCvPageModule {}
