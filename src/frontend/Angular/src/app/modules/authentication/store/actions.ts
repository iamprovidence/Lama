import { Action } from '@ngrx/store';
import { UserCredential, FirebaseUser } from 'src/app/core/models';
import { auth } from 'firebase';

export enum ActionTypes {
  SetIsSignInModalOpen = '[AUTHENTICATION] SetIsSignInModalOpen',

  LoadUser = '[AUTHENTICATION] LoadUser',

  LoginWithGoogle = '[AUTHENTICATION] LoginWithGoogle',
  LoginWithFacebook = '[AUTHENTICATION] LoginWithFacebook',
  LoginWithTwitter = '[AUTHENTICATION] LoginWithTwitter',
  LoginManually = '[AUTHENTICATION] LoginManually',

  SignUp = '[AUTHENTICATION] SignUp',

  LoginSuccessed = '[AUTHENTICATION] LoginSuccessed',
  LoginFailed = '[AUTHENTICATION] LoginFailed',

  UpdateCredentials = '[AUTHENTICATION] UpdateCredentials',

  Logout = '[AUTHENTICATION] Logout'
}

export class SetIsSignInModalOpen implements Action {
  readonly type = ActionTypes.SetIsSignInModalOpen;
  constructor(public payload: boolean) {}
}

export class LoadUser implements Action {
  readonly type = ActionTypes.LoadUser;
}

export class LoginWithGoogle implements Action {
  readonly type = ActionTypes.LoginWithGoogle;
}

export class LoginWithFacebook implements Action {
  readonly type = ActionTypes.LoginWithFacebook;
}

export class LoginWithTwitter implements Action {
  readonly type = ActionTypes.LoginWithTwitter;
}

export class LoginManually implements Action {
  readonly type = ActionTypes.LoginManually;
  constructor(public payload: UserCredential) {}
}

export class LoginSuccessed implements Action {
  readonly type = ActionTypes.LoginSuccessed;
  constructor(public payload: FirebaseUser) {}
}

export class LoginFailed implements Action {
  readonly type = ActionTypes.LoginFailed;
  constructor(public payload: string) {}
}

export class SignUp implements Action {
  readonly type = ActionTypes.SignUp;
  constructor(public payload: UserCredential) {}
}

export class UpdateCredentials implements Action {
  readonly type = ActionTypes.UpdateCredentials;
  constructor(public payload: auth.UserCredential) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export type Actions =
  | SetIsSignInModalOpen
  | LoadUser
  | LoginWithGoogle
  | LoginWithFacebook
  | LoginWithTwitter
  | LoginManually
  | LoginSuccessed
  | LoginFailed
  | SignUp
  | UpdateCredentials
  | Logout;
