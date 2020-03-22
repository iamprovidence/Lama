import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from 'src/app/app.state';
import * as Selectors from '../store/selectors';

import { Observable, of } from 'rxjs';
import { map, mergeMap, withLatestFrom, catchError, switchMap, tap, filter } from 'rxjs/operators';

import { PhotosService } from '../photos.service';
import * as PhotosActions from '../store/actions';
import * as UploadPhotosActions from '../../upload-photos/store/actions';

import { PhotoToUploadDTO, PhotoToDeleteRestoreDTO } from 'src/app/core/models';

@Injectable()
export class PhotosEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private photosService: PhotosService,
    private router: Router
  ) {}

  @Effect()
  loadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.LoadPhotos),
    mergeMap(() =>
      this.photosService.getCurrentUserPhotos().pipe(
        map(photos => new PhotosActions.LoadPhotosSucceed(photos)),
        catchError(err => of(new PhotosActions.LoadPhotosFailed(err)))
      )
    )
  );

  @Effect()
  loadShared$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.LoadSharedPhotos),
    mergeMap(() =>
      this.photosService.getSharedPhotos().pipe(
        map(photos => new PhotosActions.LoadPhotosSucceed(photos)),
        catchError(err => of(new PhotosActions.LoadPhotosFailed(err)))
      )
    )
  );

  @Effect()
  searchPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.SearchPhotos),
    map((action: PhotosActions.SearchPhotos) => action.payload),
    tap(() => this.router.navigate(['/search'])),
    switchMap(searchInput =>
      this.photosService.searchPhotos(searchInput).pipe(
        map(photos => new PhotosActions.LoadPhotosSucceed(photos)),
        catchError(err => of(new PhotosActions.LoadPhotosFailed(err)))
      )
    )
  );

  @Effect()
  uploadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(UploadPhotosActions.ActionTypes.SavePhotos),
    map((action: UploadPhotosActions.SavePhotos) => action.payload),
    mergeMap((photosToUpload: PhotoToUploadDTO[]) =>
      this.photosService
        .uploadPhotos(photosToUpload)
        .pipe(
          mergeMap(createdPhotos => [
            new UploadPhotosActions.SavePhotosSucceed(),
            new PhotosActions.AddPhotos(createdPhotos)
          ])
        )
    )
  );

  @Effect()
  deletePhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.DeleteSelectedPhotos),
    withLatestFrom(this.store$.select(Selectors.getSelectedPhotos)),
    map(([action, selectedPhotos]) =>
      [...selectedPhotos].map(
        v =>
          ({
            id: v
          } as PhotoToDeleteRestoreDTO)
      )
    ),
    mergeMap((photos: PhotoToDeleteRestoreDTO[]) =>
      this.photosService.markPhotosAsDeleted(photos).pipe(map(() => new PhotosActions.DeleteSelectedPhotosSucceed()))
    )
  );

  @Effect({ dispatch: false })
  downloadPhotos$: Observable<object> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.DownloadSelectedPhotos),
    withLatestFrom(this.store$.select(Selectors.getSelectedPhotos)),
    map(([action, selectedPhotos]) => [...selectedPhotos]),
    filter((photosIds: string[]) => photosIds.length > 0),
    mergeMap((photosIds: string[]) => this.photosService.downloadPhotos(photosIds))
  );
}
