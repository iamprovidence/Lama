import { Action } from '@ngrx/store';
import { PhotoToUploadDTO } from 'src/app/core/models';

export enum ActionTypes {
  SetIsUploadPhotoModalOpen = '[UPLOAD PHOTOS] SetIsUploadPhotoModalOpen',

  LoadFiles = '[UPLOAD PHOTOS] LoadFiles',
  SetUploadedPhotos = '[UPLOAD PHOTOS] SetUploadedPhotos',
  UpdatePhoto = '[UPLOAD PHOTOS] UpdatePhoto',

  RemoveUploadedPhoto = '[UPLOAD PHOTOS] RemoveUploadedPhoto',
  ClearUploadedPhotos = '[UPLOAD PHOTOS] ClearUploadedPhotos',

  SavePhotos = '[UPLOAD PHOTOS] SavePhotos',
  SavePhotosSucceed = '[UPLOAD PHOTOS] SavePhotosSucceed'
}

export class SetIsUploadPhotoModalOpen implements Action {
  readonly type = ActionTypes.SetIsUploadPhotoModalOpen;
  constructor(public payload: boolean) {}
}

export class LoadFiles implements Action {
  readonly type = ActionTypes.LoadFiles;
  constructor(public payload: File[]) {}
}

export class SetUploadedPhotos implements Action {
  readonly type = ActionTypes.SetUploadedPhotos;
  constructor(public payload: PhotoToUploadDTO[]) {}
}

export class RemoveUploadedPhoto implements Action {
  readonly type = ActionTypes.RemoveUploadedPhoto;
  constructor(public payload: string) {}
}

export class ClearUploadedPhotos implements Action {
  readonly type = ActionTypes.ClearUploadedPhotos;
}

export class UpdatePhoto implements Action {
  readonly type = ActionTypes.UpdatePhoto;
  constructor(public payload: PhotoToUploadDTO) {}
}

export class SavePhotos implements Action {
  readonly type = ActionTypes.SavePhotos;
  constructor(public payload: PhotoToUploadDTO[]) {}
}

export class SavePhotosSucceed implements Action {
  readonly type = ActionTypes.SavePhotosSucceed;
}

export type Actions =
  | SetIsUploadPhotoModalOpen
  | LoadFiles
  | SetUploadedPhotos
  | RemoveUploadedPhoto
  | ClearUploadedPhotos
  | UpdatePhoto
  | SavePhotos
  | SavePhotosSucceed;
