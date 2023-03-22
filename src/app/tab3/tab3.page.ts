import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActionCodeOperation, AuthCredential, EmailAuthCredential, User, sendEmailVerification, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserInfo, userInfo } from 'os';
import { AuthService } from '../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { ref, Storage, uploadBytes } from '@angular/fire/storage'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  uid: string | null = null;

  constructor(private authService: AuthService, private router: Router, private storage:Storage, private loadingController:LoadingController) { }

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
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  btnCuenta(){
    this.router.navigate(['account']);
  }

  btnConfiguration(){
    this.router.navigate(['configuration'])
  };

  async logout(){
    const loading = await this.loadingController.create({
      message: 'Cerrando sesión...',
      duration: 1500
    });

    await loading.present();

    this.authService.logout();
    await loading.onWillDismiss();
    this.router.navigate(['home']);
  }


}
