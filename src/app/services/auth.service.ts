import { Injectable } from '@angular/core';
import { ActionCodeOperation, sendEmailVerification, updateProfile, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { userInfo } from 'os';

import * as auth from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


@Injectable({
  providedIn: 'root'
 })
 export class AuthService {
  signOut() {
    throw new Error('Method not implemented.');
  }
 	constructor(private auth:Auth, private afAuth: AngularFireAuthModule, private alertController:AlertController) {}


   async register({email, password}:any){
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  }



  async login({email, password}:any){
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    if(!userCredential.user.emailVerified){
      throw new Error('Please verify your email before logging in.');
    }
    return userCredential;
  }

  logout(){
    return signOut(this.auth);
  }

  async loginWithGoogle(){
    const userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider);
    return userCredential;
  }

  async registerWithGoogle(){
    const userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  }

  verifyEmail(){
    const user = this.auth.currentUser;
    user?.emailVerified;
  }

  async resetPassword(email:string){
    try {
      await sendPasswordResetEmail(this.auth, email)
    } catch (error) {
      console.error(error);
    }
  }

  EmailIsVerified(){

  }

  async getUser(){
    const user = await this.auth.currentUser;
    if(user){
      return user?.email;
    }else{
      return null;
    }
  }

 }

