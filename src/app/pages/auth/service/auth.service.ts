import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
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

  private updateUserData(user) {
    const usersDoc: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      boards: user.boards,
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return usersDoc.set(data, { merge: true });
  }
}
