import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from 'src/app/app.state';
import * as fromAlbumDetails from './selectors';
import * as AlbumActions from '../store/actions';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, flatMap, reduce, first, withLatestFrom, filter } from 'rxjs/operators';

import { AlbumDetailsService as ApiService } from '../album-details.service';
import { PhotoAlbumDTO } from 'src/app/core/models';

@Injectable()
export class AlbumDetailsEffects {
  constructor(private actions$: Actions, private store$: Store<State>, private apiService: ApiService) {}

  @Effect()
  loadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumActions.ActionTypes.LoadPhotos),
    mergeMap(() =>
      this.apiService.getCurrentUserPhotos().pipe(
        map(photos => new AlbumActions.LoadPhotosSucceed(photos)),
        catchError(err => of(new AlbumActions.LoadPhotosFailed(err)))
      )
    )
  );

  @Effect()
  loadAlbumPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumActions.ActionTypes.LoadAlbumPhotos),
    map((action: AlbumActions.LoadAlbumPhotos) => action.payload),
    mergeMap(albumId =>
      this.apiService.getAlbumPhotos(albumId).pipe(
        map(photos => new AlbumActions.LoadAlbumPhotosSucceed(photos)),
        catchError(err => of(new AlbumActions.LoadAlbumPhotosFailed(err)))
      )
    )
  );

  @Effect()
  updateAlbumPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumActions.ActionTypes.UpdateAlbumPhotos),
    map((action: AlbumActions.UpdateAlbumPhotos) => action.payload),
    mergeMap(albumId =>
      this.store$.pipe(
        select(fromAlbumDetails.getSelectedUpdateAlbumPhotos),
        first(),
        flatMap(photoId => photoId),
        map(photoId => ({ albumId, photoId } as PhotoAlbumDTO)),
        reduce((acc: PhotoAlbumDTO[], value: PhotoAlbumDTO) => acc.concat(value), []),
        mergeMap(albumPhotos =>
          this.apiService
            .updateAlbumPhotos(albumId, albumPhotos)
            .pipe(
              mergeMap(() => [
                new AlbumActions.LoadAlbumPhotos(albumId),
                new AlbumActions.SetIsAddPhotosToModalOpen(false)
              ])
            )
        )
      )
    )
  );

  @Effect()
  deleteSelectedPhotosFromAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(AlbumActions.ActionTypes.DeleteSelectedPhotos),
    map((action: AlbumActions.UpdateAlbumPhotos) => action.payload),
    mergeMap(albumId =>
      this.store$.pipe(
        select(fromAlbumDetails.getSelectedPhotos),
        first(),
        flatMap(photoId => photoId),
        map(photoId => ({ albumId, photoId } as PhotoAlbumDTO)),
        reduce((acc: PhotoAlbumDTO[], value: PhotoAlbumDTO) => acc.concat(value), []),
        mergeMap(albumPhotos =>
          this.apiService.deleteAlbumPhotos(albumPhotos).pipe(map(() => new AlbumActions.DeleteSelectedPhotosSucceed()))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  downloadSelectedPhotosFromAlbum$: Observable<object> = this.actions$.pipe(
    ofType(AlbumActions.ActionTypes.DownloadSelectedPhotos),
    withLatestFrom(this.store$.select(fromAlbumDetails.getSelectedPhotos)),
    map(([action, selectedPhotos]) => [...selectedPhotos]),
    filter((photosIds: string[]) => photosIds.length > 0),
    mergeMap((photosIds: string[]) => this.apiService.downloadPhotos(photosIds))
  );
}
