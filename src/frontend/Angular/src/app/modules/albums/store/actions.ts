import { Action } from '@ngrx/store';
import { AlbumListDTO, CreateAlbumDTO, EditAlbumDTO } from 'src/app/core/models';

export enum ActionTypes {
  SetCurrentAlbumId = '[ALBUMS] SetCurrentAlbumId',
  LoadAlbums = '[ALBUMS] LoadAlbums',
  LoadAlbumsSucceed = '[ALBUMS] LoadAlbumsSucceed',
  LoadAlbumsFailed = '[ALBUMS] LoadAlbumsFailed',
  ClearAlbums = '[ALBUMS] ClearAlbums',

  SetIsCreateAlbumModalOpen = '[ALBUMS] SetIsCreateAlbumModalOpen',
  CreateAlbum = '[ALBUMS] CreateAlbum',
  CreateAlbumSucceed = '[ALBUMS] CreateAlbumSucceed',

  SetIsEditAlbumModalOpen = '[ALBUMS] SetIsEditAlbumModalOpen',
  EditAlbum = '[ALBUMS] EditAlbum',
  EditAlbumSucceed = '[ALBUMS] EditAlbumSucceed',

  SetIsDeleteAlbumModalOpen = '[ALBUMS] SetIsDeleteAlbumModalOpen',
  DeleteAlbum = '[ALBUMS] DeleteAlbum',
  DeleteAlbumSucceed = '[ALBUMS] DeleteAlbumSucceed',

  DownloadAlbum = '[ALBUMS] DownloadAlbum'
}

export class SetCurrentAlbumId implements Action {
  readonly type = ActionTypes.SetCurrentAlbumId;
  constructor(public payload: number | null) {}
}

export class LoadAlbums implements Action {
  readonly type = ActionTypes.LoadAlbums;
}

export class LoadAlbumsSucceed implements Action {
  readonly type = ActionTypes.LoadAlbumsSucceed;
  constructor(public payload: AlbumListDTO[]) {}
}

export class LoadAlbumsFailed implements Action {
  readonly type = ActionTypes.LoadAlbumsFailed;
  constructor(public payload: string) {}
}

export class ClearAlbums implements Action {
  readonly type = ActionTypes.ClearAlbums;
}

export class SetIsCreateAlbumModalOpen implements Action {
  readonly type = ActionTypes.SetIsCreateAlbumModalOpen;
  constructor(public payload: boolean) {}
}

export class CreateAlbum implements Action {
  readonly type = ActionTypes.CreateAlbum;
  constructor(public payload: CreateAlbumDTO) {}
}

export class CreateAlbumSucceed implements Action {
  readonly type = ActionTypes.CreateAlbumSucceed;
  constructor(public payload: AlbumListDTO) {}
}

export class SetIsEditAlbumModalOpen implements Action {
  readonly type = ActionTypes.SetIsEditAlbumModalOpen;
  constructor(public payload: boolean) {}
}

export class EditAlbum implements Action {
  readonly type = ActionTypes.EditAlbum;
  constructor(public payload: EditAlbumDTO) {}
}

export class EditAlbumSucceed implements Action {
  readonly type = ActionTypes.EditAlbumSucceed;
  constructor(public payload: AlbumListDTO) {}
}

export class SetIsDeleteAlbumModalOpen implements Action {
  readonly type = ActionTypes.SetIsDeleteAlbumModalOpen;
  constructor(public payload: boolean) {}
}

export class DeleteAlbum implements Action {
  readonly type = ActionTypes.DeleteAlbum;
  constructor(public payload: number) {}
}

export class DeleteAlbumSucceed implements Action {
  readonly type = ActionTypes.DeleteAlbumSucceed;
  constructor(public payload: number) {}
}

export class DownloadAlbum implements Action {
  readonly type = ActionTypes.DownloadAlbum;
  constructor(public payload: number) {}
}

export type Actions =
  | SetCurrentAlbumId
  | LoadAlbums
  | LoadAlbumsSucceed
  | LoadAlbumsFailed
  | ClearAlbums
  | SetIsCreateAlbumModalOpen
  | CreateAlbum
  | CreateAlbumSucceed
  | SetIsEditAlbumModalOpen
  | EditAlbum
  | EditAlbumSucceed
  | SetIsDeleteAlbumModalOpen
  | DeleteAlbum
  | DeleteAlbumSucceed
  | DownloadAlbum;
