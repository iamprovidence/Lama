import { Action } from '@ngrx/store';
import { PhotoListDTO } from 'src/app/core/models';
import { PhotoViewType } from 'src/app/core/enums';

export enum ActionTypes {
  SetViewType = '[PHOTOS] SetViewType',

  LoadPhotos = '[PHOTOS] LoadPhotos',
  LoadPhotosSucceed = '[PHOTOS] LoadPhotosSucceed',
  ClearPhotos = '[PHOTOS] ClearPhotos',

  AddPhotos = '[PHOTOS] AddPhotos'
}

export class SetViewType implements Action {
  readonly type = ActionTypes.SetViewType;
  constructor(public payload: PhotoViewType) {}
}

export class LoadPhotos implements Action {
  readonly type = ActionTypes.LoadPhotos;
}

export class LoadPhotosSucceed implements Action {
  readonly type = ActionTypes.LoadPhotosSucceed;
  constructor(public payload: PhotoListDTO[]) {}
}

export class ClearPhotos implements Action {
  readonly type = ActionTypes.ClearPhotos;
}

export class AddPhotos implements Action {
  readonly type = ActionTypes.AddPhotos;
  constructor(public payload: PhotoListDTO[]) {}
}

export type Actions = SetViewType | LoadPhotos | LoadPhotosSucceed | ClearPhotos | AddPhotos;
