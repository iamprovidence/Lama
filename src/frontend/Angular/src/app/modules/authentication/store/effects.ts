import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError, tap } from 'rxjs/operators';

import { FirebaseUser, UserCredential } from 'src/app/core/models';
import { AuthService } from '../auth.service';
import * as AuthActions from '../store/actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LoadUser),
    exhaustMap(() =>
      this.authService.getCurrentUser().pipe(map((user: FirebaseUser) => new AuthActions.LoginSuccessed(user)))
    )
  );

  @Effect()
  loginWithGoogle$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LoginWithGoogle),
    exhaustMap(() =>
      this.authService.signInWithGoogle().pipe(
        map((userCredentials: auth.UserCredential) => new AuthActions.UpdateCredentials(userCredentials)),
        catchError(err => of(new AuthActions.LoginFailed(err)))
      )
    )
  );

  @Effect()
  loginWithFacebook$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LoginWithFacebook),
    exhaustMap(() =>
      this.authService.signInWithFacebook().pipe(
        map((userCredentials: auth.UserCredential) => new AuthActions.UpdateCredentials(userCredentials)),
        catchError(err => of(new AuthActions.LoginFailed(err)))
      )
    )
  );

  @Effect()
  loginWithTwitter$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LoginWithTwitter),
    exhaustMap(() =>
      this.authService.signInWithTwitter().pipe(
        map((userCredentials: auth.UserCredential) => new AuthActions.UpdateCredentials(userCredentials)),
        catchError(err => of(new AuthActions.LoginFailed(err)))
      )
    )
  );

  @Effect()
  loginManually$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.LoginManually),
    map((action: AuthActions.LoginManually) => action.payload),
    exhaustMap((userCredential: UserCredential) =>
      this.authService.signInManually(userCredential).pipe(
        map((userCredentials: auth.UserCredential) => new AuthActions.UpdateCredentials(userCredentials)),
        catchError(err => of(new AuthActions.LoginFailed(err)))
      )
    )
  );

  @Effect()
  signUp$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.SignUp),
    map((action: AuthActions.SignUp) => action.payload),
    exhaustMap((userCredential: UserCredential) =>
      this.authService.signUp(userCredential).pipe(
        map((userCredentials: auth.UserCredential) => new AuthActions.UpdateCredentials(userCredentials)),
        catchError(err => of(new AuthActions.LoginFailed(err)))
      )
    )
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.UpdateCredentials),
    map((action: AuthActions.UpdateCredentials) => action.payload),
    mergeMap((userCredentials: auth.UserCredential) =>
      this.authService.updateUserData(userCredentials.user).pipe(
        tap(() => this.router.navigate([''])),
        map((user: FirebaseUser) => new AuthActions.LoginSuccessed(user))
      )
    )
  );

  @Effect({ dispatch: false })
  logout$: Observable<void> = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.Logout),
    mergeMap(() => this.authService.signOut().pipe(tap(() => this.router.navigate(['/landing']))))
  );

  public ngrxOnInitEffects(): Action {
    return new AuthActions.LoadUser();
  }
}
