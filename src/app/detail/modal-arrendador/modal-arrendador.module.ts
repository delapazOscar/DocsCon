import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArrendadorPageRoutingModule } from './modal-arrendador-routing.module';

import { ModalArrendadorPage } from './modal-arrendador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArrendadorPageRoutingModule
  ],
  declarations: [ModalArrendadorPage]
})
export class ModalArrendadorPageModule {}
