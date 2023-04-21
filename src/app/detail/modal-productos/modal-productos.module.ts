import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProductosPageRoutingModule } from './modal-productos-routing.module';

import { ModalProductosPage } from './modal-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProductosPageRoutingModule
  ],
  declarations: [ModalProductosPage]
})
export class ModalProductosPageModule {}
