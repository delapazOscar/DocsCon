import { Injectable } from '@angular/core';
import { ActionCodeOperation, sendEmailVerification, updateProfile, user } from '@angular/fire/auth';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';



import * as auth from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { FirestoreDataService } from './firestore-data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
 	constructor(private auth:Auth, private afAuth: AngularFireAuthModule, private alertController:AlertController,
    private angularFirestore: AngularFirestore) {}


   async register({email, password, names, lastnames}:any){
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    const usersCollection = this.angularFirestore.collection('users');

    // Crear el documento con los datos del usuario
    await usersCollection.doc(email).set({
      email: email,
      names: names,
      lastnames: lastnames
    });
    return userCredential;
  }

  async login({email, password}:any){
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    if(!userCredential.user.emailVerified){
      throw new Error('Please verify your email before logging in.');
    }
    return userCredential;
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

  getUserProfile(uid: string): Observable<DocumentData | undefined> {
    const usersCollection = this.angularFirestore.collection('users');
    const userProfileDoc = usersCollection.doc(uid);
    return userProfileDoc.valueChanges({ idField: 'id' }) as Observable<DocumentData | undefined>;
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAccount() {
    try {
      const user: User | null = this.auth.currentUser;
      if (user) {
        // Delete the user's account
        await user.delete();

        // Perform any additional cleanup or tasks here

        // Log the user out
        await this.auth.signOut();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  }


 }

