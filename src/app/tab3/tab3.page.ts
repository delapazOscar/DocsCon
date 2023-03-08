import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActionCodeOperation, AuthCredential, EmailAuthCredential, User, sendEmailVerification, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserInfo, userInfo } from 'os';
import { AuthService } from '../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  uid: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

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

  avatarAccount(){

  }

  btnCuenta(){
    this.router.navigate(['account']);
  }

}
