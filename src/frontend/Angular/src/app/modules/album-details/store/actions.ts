import { Action } from '@ngrx/store';
import { PhotoListDTO, PhotoAlbumDTO } from 'src/app/core/models';

export enum ActionTypes {
  LoadAlbumPhotos = '[ALBUM-DETAILS] LoadAlbumPhotos',
  LoadAlbumPhotosSucceed = '[ALBUM-DETAILS] LoadAlbumPhotosSucceed',
  LoadAlbumPhotosFailed = '[ALBUM-DETAILS] LoadAlbumPhotosFailed',
  ClearAlbumPhotos = '[ALBUM-DETAILS] ClearAlbumPhotos',

  LoadPhotos = '[ALBUM-DETAILS] LoadPhotos',
  LoadPhotosSucceed = '[ALBUM-DETAILS] LoadPhotosSucceed',
  LoadPhotosFailed = '[ALBUM-DETAILS] LoadPhotosFailed',
  ClearPhotos = '[ALBUM-DETAILS] ClearPhotos',

  SetIsAddPhotosToModalOpen = '[ALBUM-DETAILS] SetIsAddPhotosToModalOpen',

  UpdateAlbumPhotos = '[ALBUM-DETAILS] UpdateAlbumPhotos',

  SelectPhoto = '[ALBUM-DETAILS] SelectPhoto',
  SelectAlbumPhoto = '[ALBUM-DETAILS] SelectAlbumPhoto',

  DeleteSelectedPhotos = '[ALBUM-DETAILS] DeleteSelectedPhotos',
  DeleteSelectedPhotosSucceed = '[ALBUM-DETAILS] DeleteSelectedPhotosSucceed',

  DownloadSelectedPhotos = '[ALBUM-DETAILS] DownloadSelectedPhotos'
}

export class LoadAlbumPhotos implements Action {
  readonly type = ActionTypes.LoadAlbumPhotos;
  constructor(public payload: number) {}
}

export class LoadAlbumPhotosSucceed implements Action {
  readonly type = ActionTypes.LoadAlbumPhotosSucceed;
  constructor(public payload: PhotoAlbumDTO[]) {}
}

export class LoadAlbumPhotosFailed implements Action {
  readonly type = ActionTypes.LoadAlbumPhotosFailed;
  constructor(public payload: string) {}
}

export class ClearAlbumPhotos implements Action {
  readonly type = ActionTypes.ClearAlbumPhotos;
}

export class LoadPhotos implements Action {
  readonly type = ActionTypes.LoadPhotos;
}

export class LoadPhotosSucceed implements Action {
  readonly type = ActionTypes.LoadPhotosSucceed;
  constructor(public payload: PhotoListDTO[]) {}
}

export class LoadPhotosFailed implements Action {
  readonly type = ActionTypes.LoadPhotosFailed;
  constructor(public payload: string) {}
}

export class ClearPhotos implements Action {
  readonly type = ActionTypes.ClearPhotos;
}

export class SetIsAddPhotosToModalOpen implements Action {
  readonly type = ActionTypes.SetIsAddPhotosToModalOpen;
  constructor(public payload: boolean) {}
}

export class UpdateAlbumPhotos implements Action {
  readonly type = ActionTypes.UpdateAlbumPhotos;
  constructor(public payload: number) {}
}

export class SelectPhoto implements Action {
  readonly type = ActionTypes.SelectPhoto;
  constructor(public payload: string) {}
}

export class SelectAlbumPhoto implements Action {
  readonly type = ActionTypes.SelectAlbumPhoto;
  constructor(public payload: string) {}
}

export class DeleteSelectedPhotos implements Action {
  readonly type = ActionTypes.DeleteSelectedPhotos;
  constructor(public payload: number) {}
}

export class DeleteSelectedPhotosSucceed implements Action {
  readonly type = ActionTypes.DeleteSelectedPhotosSucceed;
}

export class DownloadSelectedPhotos implements Action {
  readonly type = ActionTypes.DownloadSelectedPhotos;
}

export type Actions =
  | LoadAlbumPhotos
  | LoadAlbumPhotosSucceed
  | LoadAlbumPhotosFailed
  | ClearAlbumPhotos
  | LoadPhotos
  | LoadPhotosSucceed
  | LoadPhotosFailed
  | ClearPhotos
  | SetIsAddPhotosToModalOpen
  | UpdateAlbumPhotos
  | SelectPhoto
  | SelectAlbumPhoto
  | DeleteSelectedPhotos
  | DeleteSelectedPhotosSucceed
  | DownloadSelectedPhotos;
