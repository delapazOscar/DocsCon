import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUserCvPageRoutingModule } from './modal-user-cv-routing.module';

import { ModalUserCvPage } from './modal-user-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUserCvPageRoutingModule
  ],
  declarations: [ModalUserCvPage]
})
export class ModalUserCvPageModule {}
