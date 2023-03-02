import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActionCodeOperation, AuthCredential, EmailAuthCredential, User, sendEmailVerification, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserInfo, userInfo } from 'os';
import { AuthService } from '../services/auth.service';
import { FirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  uid: string = ""

  constructor(private authService:AuthService ) { }

  async ngOnInit() {
    this.getUid();
  }

  async getUid(){
    const uid = await this.authService.getUser();
    if(uid){
      this.uid = uid;
      console.log(uid);
    }
  }

  avatarAccount(){

  }

}
