import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { User } from './shared/user.interface';
import { DetailPage } from './detail/detail.page';
import { ModalEmpresaPage } from './detail/modal-empresa/modal-empresa.page';
import { ModalClientePage } from './detail/modal-cliente/modal-cliente.page';
import { ModalProductosPage } from './detail/modal-productos/modal-productos.page';
import { ModalPagoPage } from './detail/modal-pago/modal-pago.page';
import { ModalAcuerdoPage } from './detail/modal-acuerdo/modal-acuerdo.page';
import { ModalDeudorPage } from './detail/modal-deudor/modal-deudor.page';
import { ModalAcredorPage } from './detail/modal-acredor/modal-acredor.page';
import { ModalArrendadorPage } from './detail/modal-arrendador/modal-arrendador.page';
import { ModalArrendatarioPage } from './detail/modal-arrendatario/modal-arrendatario.page';
import { ModalRentaPage } from './detail/modal-renta/modal-renta.page';
import { DatosfacturaService } from './services/datosfactura.service';
import { DatosPagareService } from './services/datos-pagare.service';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { DocumentsService } from './services/documents.service';
import { AuthenticationService } from './services/authentication.service';
import { ɵAngularFireSchedulers} from '@angular/fire'
import { FirestoreModule} from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { BrowserModule } from '@angular/platform-browser';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { StorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import * as moment from 'moment';
import * as numberToWords from 'number-to-words';

import { ToWords } from 'to-words';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@NgModule({
  declarations: [AppComponent],
  entryComponents:[],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule,
    AngularFireAuthModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy} ,DocumentsService, File, FileOpener],
  bootstrap: [AppComponent],
})

export class AppModule {}
