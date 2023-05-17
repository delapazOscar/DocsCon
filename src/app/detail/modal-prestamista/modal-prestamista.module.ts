import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPrestamistaPageRoutingModule } from './modal-prestamista-routing.module';

import { ModalPrestamistaPage } from './modal-prestamista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPrestamistaPageRoutingModule
  ],
  declarations: [ModalPrestamistaPage]
})
export class ModalPrestamistaPageModule {}
