import { Injectable } from '@angular/core';
import { ActionCodeOperation, sendEmailVerification, updateProfile, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { userInfo } from 'os';
import * as auth from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
 })
 export class AuthService {
 	constructor(private auth:Auth, private firestore:AngularFirestore ) {}


   async register({names, lastnames, email, password, profileImage}:any){
    const userCredential = await createUserWithEmailAndPassword(this.auth,email,password);
    await sendEmailVerification(userCredential.user);

    // Guardar campos adicionales en Firestore
    await this.firestore.collection('users').doc(userCredential.user.uid).set({
      names,
      lastnames,
      email,
      profileImage
    });

    return userCredential;
  }

  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  async loginWithGoogle(){
    const userCredential = await signInWithPopup(this.auth, new GoogleAuthProvider);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  }

  verifyEmail(){
    const user = this.auth.currentUser;
    user?.emailVerified;
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

