import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { DocumentData, Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Photo } from '@capacitor/camera'
import { ref, Storage } from '@angular/fire/storage';
import { getDownloadURL, uploadBytesResumable, uploadString } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
// import { AngularFireStorage } from '@angular/fire/compat/storage'



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  firebaseApp: any;

  constructor(private auth:Auth, private firestore:Firestore, private storage:Storage) { }

  async getUserProfile(): Promise<Observable<DocumentData> | undefined> {
    const user = this.auth.currentUser;
    if (user !== null) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      return docData(userDocRef);
    } else {
      // Handle the case where there is no user signed in
      return undefined;
    }
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    if (!user || !cameraFile || !cameraFile.base64String) {
      return;
    }
    const path = `uploads/${user.uid}/profile.png`;
    const storageRef = ref(this.firebaseApp.storage().ref(), path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const imageUrl = await getDownloadURL(storageRef);

      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {
        imageUrl,
      });
      return true;

    } catch (e) {
      return null;
    }
  }



}
