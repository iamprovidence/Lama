import { Action } from '@ngrx/store';
import { SharedEmailsListDTO, SharePhotoDTO } from 'src/app/core/models';

export enum ActionTypes {
  LoadSharedEmails = '[SHARING] LoadSharedEmails',
  LoadSharedEmailsSucceed = '[SHARING] LoadSharedEmailsSucceed',
  LoadSharedEmailsFailed = '[SHARING] LoadSharedEmailsFailed',
  ClearSharedEmails = '[SHARING] ClearSharedEmails',

  SharePhoto = '[SHARING] SharePhoto',
  SharePhotoSucceed = '[SHARING] SharePhotoSucceed',
  SharePhotoFailed = '[SHARING] SharePhotoFailed',

  DeleteShared = '[SHARING] DeleteShared'
}

export class LoadSharedEmails implements Action {
  readonly type = ActionTypes.LoadSharedEmails;
  constructor(public payload: string) {}
}
export class LoadSharedEmailsSucceed implements Action {
  readonly type = ActionTypes.LoadSharedEmailsSucceed;
  constructor(public payload: SharedEmailsListDTO[]) {}
}
export class LoadSharedEmailsFailed implements Action {
  readonly type = ActionTypes.LoadSharedEmailsFailed;
  constructor(public payload: string) {}
}
export class ClearSharedEmails implements Action {
  readonly type = ActionTypes.ClearSharedEmails;
}

export class SharePhoto implements Action {
  readonly type = ActionTypes.SharePhoto;
  constructor(public payload: SharePhotoDTO) {}
}
export class SharePhotoSucceed implements Action {
  readonly type = ActionTypes.SharePhotoSucceed;
  constructor(public payload: SharedEmailsListDTO) {}
}
export class SharePhotoFailed implements Action {
  readonly type = ActionTypes.SharePhotoFailed;
  constructor(public payload: string) {}
}

export class DeleteShared implements Action {
  readonly type = ActionTypes.DeleteShared;
  constructor(public payload: SharePhotoDTO) {}
}

export type Actions =
  | LoadSharedEmails
  | LoadSharedEmailsSucceed
  | LoadSharedEmailsFailed
  | ClearSharedEmails
  | SharePhoto
  | SharePhotoSucceed
  | SharePhotoFailed
  | DeleteShared;
