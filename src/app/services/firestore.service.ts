
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';

import { Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

interface User {
  names: string;
  lastnames: string;
  email: string;
  password: string;
  photo:string;
  id:string;
}

export class FirestoreService {

  private userCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.userCollection = collection(this.firestore, 'User');
  }

  createUser(usuario:User){
    return addDoc(this.userCollection, user);
  }

}
