import { Action } from '@ngrx/store';
import { DeletedPhotosListDTO } from 'src/app/core/models';

export enum ActionTypes {
  LoadPhotos = '[DELETED-PHOTOS] LoadPhotos',
  LoadPhotosSucceed = '[DELETED-PHOTOS] LoadPhotosSucceed',
  LoadPhotosFailed = '[DELETED-PHOTOS] LoadPhotosFailed',
  ClearPhotos = '[DELETED-PHOTOS] ClearPhotos',

  SelectPhoto = '[DELETED-PHOTOS] SelectPhoto',

  RestoreSelectedPhotos = '[DELETED-PHOTOS] RestoreSelectedPhotos',
  DeleteSelectedPhotos = '[DELETED-PHOTOS] DeleteSelectedPhotos',
  RestoreDeleteSelectedPhotosSucceed = '[DELETED-PHOTOS] RestoreDeleteSelectedPhotosSucceed',
  RestoreDeleteSelectedPhotosFailed = '[DELETED-PHOTOS] RestoreDeleteSelectedPhotosFailed'
}

export class LoadPhotos implements Action {
  readonly type = ActionTypes.LoadPhotos;
}

export class LoadPhotosSucceed implements Action {
  readonly type = ActionTypes.LoadPhotosSucceed;
  constructor(public payload: DeletedPhotosListDTO[]) {}
}

export class LoadPhotosFailed implements Action {
  readonly type = ActionTypes.LoadPhotosFailed;
  constructor(public payload: string) {}
}

export class ClearPhotos implements Action {
  readonly type = ActionTypes.ClearPhotos;
}

export class SelectPhoto implements Action {
  readonly type = ActionTypes.SelectPhoto;
  constructor(public payload: string) {}
}

export class RestoreSelectedPhotos implements Action {
  readonly type = ActionTypes.RestoreSelectedPhotos;
}

export class DeleteSelectedPhotos implements Action {
  readonly type = ActionTypes.DeleteSelectedPhotos;
}

export class RestoreDeleteSelectedPhotosSucceed implements Action {
  readonly type = ActionTypes.RestoreDeleteSelectedPhotosSucceed;
}

export class RestoreDeleteSelectedPhotosFailed implements Action {
  readonly type = ActionTypes.RestoreDeleteSelectedPhotosFailed;
  constructor(public payload: string) {}
}

export type Actions =
  | LoadPhotos
  | LoadPhotosSucceed
  | LoadPhotosFailed
  | ClearPhotos
  | SelectPhoto
  | RestoreSelectedPhotos
  | DeleteSelectedPhotos
  | RestoreDeleteSelectedPhotosSucceed
  | RestoreDeleteSelectedPhotosFailed;
