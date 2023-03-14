import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login/login.page';
import { usuario } from './shared/user.interface';
import { DetailPage } from './detail/detail.page';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { DocumentsService } from './services/documents.service';
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



@NgModule({
  declarations: [AppComponent],
  entryComponents:[],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    ReactiveFormsModule, BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()), provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), FirestoreModule,
    AngularFireModule,
    AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy} ,DocumentsService],
  bootstrap: [AppComponent],
})

export class AppModule {}
