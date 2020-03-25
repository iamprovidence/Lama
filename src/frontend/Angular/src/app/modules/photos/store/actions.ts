import { Action } from '@ngrx/store';
import { PhotoListDTO, PhotoThumbnailDTO } from 'src/app/core/models';
import { PhotoViewType } from 'src/app/core/enums';

export enum ActionTypes {
  SetViewType = '[PHOTOS] SetViewType',

  LoadPhotos = '[PHOTOS] LoadPhotos',
  SearchPhotos = '[PHOTOS] SearchPhotos',
  LoadSharedPhotos = '[PHOTOS] LoadSharedPhotos',
  LoadPhotosSucceed = '[PHOTOS] LoadPhotosSucceed',
  LoadPhotosFailed = '[PHOTOS] LoadPhotosFailed',
  ClearPhotos = '[PHOTOS] ClearPhotos',

  AddPhotos = '[PHOTOS] AddPhotos',

  SelectPhoto = '[PHOTOS] SelectPhoto',

  DeleteSelectedPhotos = '[PHOTOS] DeleteSelectedPhotos',
  DeleteSelectedPhotosSucceed = '[PHOTOS] DeleteSelectedPhotosSucceed',

  DownloadSelectedPhotos = '[PHOTOS] DownloadSelectedPhotos',

  UpdateThumbnails = '[PHOTOS] UpdateThumbnails'
}

export class SetViewType implements Action {
  readonly type = ActionTypes.SetViewType;
  constructor(public payload: PhotoViewType) {}
}

export class LoadPhotos implements Action {
  readonly type = ActionTypes.LoadPhotos;
}

export class SearchPhotos implements Action {
  readonly type = ActionTypes.SearchPhotos;
  constructor(public payload: string) {}
}

export class LoadSharedPhotos implements Action {
  readonly type = ActionTypes.LoadSharedPhotos;
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

export class AddPhotos implements Action {
  readonly type = ActionTypes.AddPhotos;
  constructor(public payload: PhotoListDTO[]) {}
}

export class SelectPhoto implements Action {
  readonly type = ActionTypes.SelectPhoto;
  constructor(public payload: string) {}
}

export class DeleteSelectedPhotos implements Action {
  readonly type = ActionTypes.DeleteSelectedPhotos;
}

export class DeleteSelectedPhotosSucceed implements Action {
  readonly type = ActionTypes.DeleteSelectedPhotosSucceed;
}

export class DownloadSelectedPhotos implements Action {
  readonly type = ActionTypes.DownloadSelectedPhotos;
}

export class UpdateThumbnails implements Action {
  readonly type = ActionTypes.UpdateThumbnails;
  constructor(public payload: PhotoThumbnailDTO[]) {}
}

export type Actions =
  | SetViewType
  | LoadPhotos
  | SearchPhotos
  | LoadSharedPhotos
  | LoadPhotosSucceed
  | LoadPhotosFailed
  | ClearPhotos
  | AddPhotos
  | SelectPhoto
  | DeleteSelectedPhotos
  | DeleteSelectedPhotosSucceed
  | DownloadSelectedPhotos
  | UpdateThumbnails;
