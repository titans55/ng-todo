import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { UserModel } from '../model/user.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<UserModel>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<UserModel>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credential.user).then(() => {
      this.router.navigate(['/']);
    });
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/landing']);
  }

  private async updateUserData(user: firebase.User) {
    const usersDoc: AngularFirestoreDocument<UserModel> = this.afs.doc(
      `users/${user.uid}`
    );
    let userExists: boolean = false;
    await usersDoc
      .get()
      .toPromise()
      .then((user) => {
        userExists = user.exists;
      });
    if (!userExists) {
      const data = {
        boards: [],
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      return usersDoc.set(data, { merge: true });
    }
  }
}
