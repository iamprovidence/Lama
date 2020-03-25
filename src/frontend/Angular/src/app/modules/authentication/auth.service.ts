import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseUser, UserCredential } from 'src/app/core/models';

@Injectable()
export class AuthService {
  private readonly apiUri = `${environment.apiUrl}/api/Users`;
  private readonly firebaseUri = `users`;

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private httpClient: HttpClient) {}

  public getCurrentUserToken(): Observable<string> {
    return this.afAuth.idToken;
  }

  public getCurrentUser(): Observable<FirebaseUser> {
    return this.afAuth.user.pipe(
      map(({ uid, email, displayName, photoURL }) => ({ uid, email, displayName, photoURL }))
    );
  }

  public signOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

  public signInWithGoogle(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();

    return from(this.afAuth.auth.signInWithPopup(provider));
  }

  public signInWithFacebook(): Observable<auth.UserCredential> {
    const provider = new auth.FacebookAuthProvider();

    return from(this.afAuth.auth.signInWithPopup(provider));
  }

  public signInWithTwitter(): Observable<auth.UserCredential> {
    const provider = new auth.TwitterAuthProvider();

    return from(this.afAuth.auth.signInWithPopup(provider));
  }

  public signInManually(userCredential: UserCredential): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(userCredential.email, userCredential.password));
  }

  public signUp(userCredential: UserCredential): Observable<auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(userCredential.email, userCredential.password));
  }

  public updateUserData({ uid, email, displayName, photoURL }: FirebaseUser): Observable<FirebaseUser> {
    const userData = { uid, email, displayName, photoURL };

    this.updateUserInFirebase(userData);
    this.updateUserInServer(userData);

    return of(userData);
  }

  private updateUserInFirebase(user: FirebaseUser): void {
    const userRef: AngularFirestoreDocument<FirebaseUser> = this.afStore.doc(`${this.firebaseUri}/${user.uid}`);

    userRef.set(user, { merge: true });
  }

  private updateUserInServer(user: FirebaseUser): void {
    this.httpClient.post<boolean>(`${this.apiUri}/update`, user).subscribe();
  }
}
