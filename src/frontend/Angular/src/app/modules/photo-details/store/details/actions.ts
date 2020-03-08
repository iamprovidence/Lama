import { Action } from '@ngrx/store';
import { PhotoViewDTO, UpdatePhotoDTO } from 'src/app/core/models';
import { PhotoMenuItems, DataState } from 'src/app/core/enums';

export enum ActionTypes {
  SetIsLoading = '[PHOTO-DETAILS] SetIsLoading',

  LoadPhoto = '[PHOTO-DETAILS] LoadPhoto',
  LoadPhotoSucceed = '[PHOTO-DETAILS] LoadPhotoSucceed',
  LoadPhotoFailed = '[PHOTO-DETAILS] LoadPhotoFailed',
  ClearPhoto = '[PHOTO-DETAILS] ClearPhoto',

  UpdatePhoto = '[PHOTO-DETAILS] UpdatePhoto',
  UpdatePhotoSucceed = '[PHOTO-DETAILS] UpdatePhotoSucceed',
  UpdatePhotoFailed = '[PHOTO-DETAILS] UpdatePhotoFailed',

  SelectMenuItem = '[PHOTO-DETAILS] SelectMenuItem'
}

export class SetIsLoading implements Action {
  readonly type = ActionTypes.SetIsLoading;
  constructor(public payload: DataState) {}
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

export class UpdatePhoto implements Action {
  readonly type = ActionTypes.UpdatePhoto;
  constructor(public payload: UpdatePhotoDTO) {}
}

export class UpdatePhotoSucceed implements Action {
  readonly type = ActionTypes.UpdatePhotoSucceed;
  constructor(public payload: PhotoViewDTO) {}
}

export class UpdatePhotoFailed implements Action {
  readonly type = ActionTypes.UpdatePhotoFailed;
  constructor(public payload: string) {}
}

export class SelectMenuItem implements Action {
  readonly type = ActionTypes.SelectMenuItem;
  constructor(public payload: PhotoMenuItems) {}
}

export type Actions =
  | SetIsLoading
  | LoadPhoto
  | LoadPhotoSucceed
  | LoadPhotoFailed
  | ClearPhoto
  | UpdatePhoto
  | UpdatePhotoSucceed
  | UpdatePhotoFailed
  | SelectMenuItem;
