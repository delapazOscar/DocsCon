import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPrestamoPageRoutingModule } from './modal-prestamo-routing.module';

import { ModalPrestamoPage } from './modal-prestamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPrestamoPageRoutingModule
  ],
  declarations: [ModalPrestamoPage]
})
export class ModalPrestamoPageModule {}
