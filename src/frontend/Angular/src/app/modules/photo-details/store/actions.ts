import { Action } from '@ngrx/store';
import { PhotoViewDTO } from 'src/app/core/models';

export enum ActionTypes {
  LoadPhoto = '[PHOTO-DETAILS] LoadPhoto',
  LoadPhotoSucceed = '[PHOTO-DETAILS] LoadPhotoSucceed',
  LoadPhotoFailed = '[PHOTO-DETAILS] LoadPhotoFailed',
  ClearPhoto = '[PHOTO-DETAILS] ClearPhoto'
}

export class LoadPhoto implements Action {
  readonly type = ActionTypes.LoadPhoto;
  constructor(public payload: string) {}
}

export class LoadPhotoSucceed implements Action {
  readonly type = ActionTypes.LoadPhotoSucceed;
  constructor(public payload: PhotoViewDTO) {}
}

export class LoadPhotoFailed implements Action {
  readonly type = ActionTypes.LoadPhotoFailed;
  constructor(public payload: string) {}
}

export class ClearPhoto implements Action {
  readonly type = ActionTypes.ClearPhoto;
}

export type Actions = LoadPhoto | LoadPhotoSucceed | LoadPhotoFailed | ClearPhoto;
