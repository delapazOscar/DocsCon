import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireAuthModule,
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
