import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalHabilidadesCvPageRoutingModule } from './modal-habilidades-cv-routing.module';

import { ModalHabilidadesCvPage } from './modal-habilidades-cv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalHabilidadesCvPageRoutingModule
  ],
  declarations: [ModalHabilidadesCvPage]
})
export class ModalHabilidadesCvPageModule {}
