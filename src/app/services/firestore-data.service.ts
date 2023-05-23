import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { DatosfacturaService } from './datosfactura.service';
import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {
  uid: any;

  constructor(public angularFirestore: AngularFirestore, private authService: AuthService) {
  }

  async getUid(){
    let uid = await this.authService.getUser();
    return uid;
  }

  async createDocument<tipo extends DocumentData>(data: tipo, uid: string, subcoleccion: string, documento: string) {
    try {
      const userRef = this.angularFirestore.collection('users').doc(uid);
      const subcollectionRef = userRef.collection(subcoleccion);
      const documentRef = subcollectionRef.doc(documento);

      await documentRef.set(data);
      console.log('Datos subidos correctamente a Firestore.');
    } catch (error) {
      console.error('Error al subir los datos a Firestore:', error);
    }
  }

  async deleteDocument(uid: string, subcoleccion: string, documento: string) {
    try {
      const userRef = this.angularFirestore.collection('users').doc(uid);
      const subcollectionRef = userRef.collection(subcoleccion);
      const documentRef = subcollectionRef.doc(documento);

      await documentRef.delete();
      console.log('Documento eliminado correctamente de Firestore.');
    } catch (error) {
      console.error('Error al eliminar el documento de Firestore:', error);
    }
  }

  getDocumentNames(uid: string, subcoleccion: string): Observable<any[]> {
    const userRef = this.angularFirestore.collection('users').doc(uid);
    const subcollectionRef = userRef.collection(subcoleccion);

    return subcollectionRef.get().pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            icon: data['icon'],
            color: data['color'],
            name: data['name']
          };
        });
      })
    );
  }

}


