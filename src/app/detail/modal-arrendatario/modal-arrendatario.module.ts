import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArrendatarioPageRoutingModule } from './modal-arrendatario-routing.module';

import { ModalArrendatarioPage } from './modal-arrendatario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArrendatarioPageRoutingModule
  ],
  declarations: [ModalArrendatarioPage]
})
export class ModalArrendatarioPageModule {}
