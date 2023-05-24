import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalIdiomCvPageRoutingModule } from './modal-idiom-cv-routing.module';

import { ModalIdiomCvPage } from './modal-idiom-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalIdiomCvPageRoutingModule
  ],
  declarations: [ModalIdiomCvPage]
})
export class ModalIdiomCvPageModule {}
