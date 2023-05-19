import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActionCodeOperation, AuthCredential, EmailAuthCredential, User, sendEmailVerification, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserInfo, userInfo } from 'os';
import { AuthService } from '../services/auth.service';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { ref, Storage, uploadBytes } from '@angular/fire/storage'
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  profile: DocumentData | undefined;

  uid: string | null = null;

  constructor(private authService: AuthService, private router: Router,
    private storage:Storage,
    private loadingController:LoadingController,
    private authenticationService:AuthenticationService,
    private alertController:AlertController) {
    this.authenticationService.getUserProfile().then((data) => {
      this.profile = data;
    }).catch((error) => {
      console.log(error);
    });
   }


  async changeImage(){
     const image = await Camera.getPhoto({
       quality: 90,
       allowEditing: false,
       resultType: CameraResultType.Base64,
       source: CameraSource.Photos,
     });
     console.log(image);
     if(image){
       const loading = await this.loadingController.create();
       await loading.present();
       const result = await this.authenticationService.uploadImage(image);
       loading.dismiss();
       if(!result){
         const alert = await this.alertController.create({
           header: 'Error',
           message: 'Hubo un problema subiendo tu foto',
           buttons: ['OK'],
         });
         await alert.present();
       }
     }
  }

  async ngOnInit() {
    await this.getUid();
  }

  async getUid(){
    let uid = await this.authService.getUser();
    if(uid){
      this.uid = uid;
      localStorage.setItem('uid', uid);
      console.log(uid);
    } else {
      uid = localStorage.getItem('uid');
      if(uid){
        this.uid = uid;
      } else {
        console.log('No se pudo encontrar un UID válido');
      }
    }
  }

  uploadImage($event:any){

  }

  btnCuenta(){
    this.router.navigate(['account']);
  }

  btnConfiguration(){
    this.router.navigate(['configuration'])
  };

  btnAyuda(){
    const url = 'https://www.instagram.com/delapaz.oscar/';
    window.open(url, '_system');
    //this.router.navigate(['configuration'])
  };

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 1500
    });

    await loading.present();

    this.authService.logout();
    await loading.onWillDismiss();
    this.router.navigate(['login']);
  }


}
