import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetalleschequePageRoutingModule } from './modal-detallescheque-routing.module';

import { ModalDetalleschequePage } from './modal-detallescheque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetalleschequePageRoutingModule
  ],
  declarations: [ModalDetalleschequePage]
})
export class ModalDetalleschequePageModule {}
