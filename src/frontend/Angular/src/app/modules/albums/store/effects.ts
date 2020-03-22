import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { AlbumsService as ApiService } from '../albums.service';
import * as AlbumsActions from '../store/actions';

@Injectable()
export class AlbumsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActions.ActionTypes.LoadAlbums),
    mergeMap(() =>
      this.apiService.getCurrentUserAlbums().pipe(
        map(albums => new AlbumsActions.LoadAlbumsSucceed(albums)),
        catchError(err => of(new AlbumsActions.LoadAlbumsFailed(err)))
      )
    )
  );

  @Effect()
  createAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActions.ActionTypes.CreateAlbum),
    map((action: AlbumsActions.CreateAlbum) => action.payload),
    mergeMap(albumToCreate =>
      this.apiService
        .createAlbum(albumToCreate)
        .pipe(
          mergeMap(album => [
            new AlbumsActions.CreateAlbumSucceed(album),
            new AlbumsActions.SetIsCreateAlbumModalOpen(false)
          ])
        )
    )
  );

  @Effect()
  editAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActions.ActionTypes.EditAlbum),
    map((action: AlbumsActions.EditAlbum) => action.payload),
    mergeMap(albumToEdit =>
      this.apiService
        .editAlbum(albumToEdit)
        .pipe(
          mergeMap(album => [
            new AlbumsActions.EditAlbumSucceed(album),
            new AlbumsActions.SetIsEditAlbumModalOpen(false),
            new AlbumsActions.SetCurrentAlbumId(null)
          ])
        )
    )
  );

  @Effect()
  deleteAlbums$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumsActions.ActionTypes.DeleteAlbum),
    map((action: AlbumsActions.DeleteAlbum) => action.payload),
    mergeMap(albumToDeleteId =>
      this.apiService
        .deleteAlbum(albumToDeleteId)
        .pipe(
          mergeMap(() => [
            new AlbumsActions.DeleteAlbumSucceed(albumToDeleteId),
            new AlbumsActions.SetIsDeleteAlbumModalOpen(false),
            new AlbumsActions.SetCurrentAlbumId(null)
          ])
        )
    )
  );

  @Effect({ dispatch: false })
  downloadAlbum$: Observable<object> = this.actions$.pipe(
    ofType(AlbumsActions.ActionTypes.DownloadAlbum),
    map((action: AlbumsActions.DownloadAlbum) => action.payload),
    mergeMap((albumId: number) => this.apiService.downloadAlbum(albumId))
  );
}
