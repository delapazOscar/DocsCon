import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalExperienciaCvPageRoutingModule } from './modal-experiencia-cv-routing.module';

import { ModalExperienciaCvPage } from './modal-experiencia-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalExperienciaCvPageRoutingModule
  ],
  declarations: [ModalExperienciaCvPage]
})
export class ModalExperienciaCvPageModule {}
