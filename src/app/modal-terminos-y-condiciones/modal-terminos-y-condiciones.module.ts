import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTerminosYCondicionesPageRoutingModule } from './modal-terminos-y-condiciones-routing.module';

import { ModalTerminosYCondicionesPage } from './modal-terminos-y-condiciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTerminosYCondicionesPageRoutingModule
  ],
  declarations: [ModalTerminosYCondicionesPage]
})
export class ModalTerminosYCondicionesPageModule {}
