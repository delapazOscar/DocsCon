import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEmpresaPageRoutingModule } from './modal-empresa-routing.module';

import { ModalEmpresaPage } from './modal-empresa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEmpresaPageRoutingModule
  ],
  declarations: [ModalEmpresaPage]
})
export class ModalEmpresaPageModule {}
