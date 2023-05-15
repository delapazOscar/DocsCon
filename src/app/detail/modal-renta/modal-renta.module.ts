import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRentaPageRoutingModule } from './modal-renta-routing.module';

import { ModalRentaPage } from './modal-renta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRentaPageRoutingModule
  ],
  declarations: [ModalRentaPage]
})
export class ModalRentaPageModule {}
