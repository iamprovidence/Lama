import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { State } from 'src/app/app.state';
import * as Selectors from './selectors';
import * as PhotosActions from '../store/actions';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import { PhotoToDeleteRestoreDTO } from 'src/app/core/models';
import { DeletedPhotosService } from '../deleted-photos.service';

@Injectable()
export class PhotosEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private deletedPhotosService: DeletedPhotosService
  ) {}

  @Effect()
  loadDeletedPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.LoadPhotos),
    mergeMap(() =>
      this.deletedPhotosService.getCurrentUserDeletedPhotos().pipe(
        map(photos => new PhotosActions.LoadPhotosSucceed(photos)),
        catchError(err => of(new PhotosActions.LoadPhotosFailed(err)))
      )
    )
  );

  @Effect()
  deleteSelectedPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.DeleteSelectedPhotos),
    withLatestFrom(this.store$.select(Selectors.getSelectedPhotosIds)),
    map(([action, selectedPhotos]) =>
      [...selectedPhotos].map(
        v =>
          ({
            id: v
          } as PhotoToDeleteRestoreDTO)
      )
    ),
    mergeMap((photos: PhotoToDeleteRestoreDTO[]) =>
      this.deletedPhotosService.deletePhotosPermanently(photos).pipe(
        map(() => new PhotosActions.RestoreDeleteSelectedPhotosSucceed()),
        catchError(err => of(new PhotosActions.RestoreDeleteSelectedPhotosFailed(err)))
      )
    )
  );

  @Effect()
  restoreSelectedPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.RestoreSelectedPhotos),
    withLatestFrom(this.store$.select(Selectors.getSelectedPhotosIds)),
    map(([action, selectedPhotos]) =>
      [...selectedPhotos].map(
        v =>
          ({
            id: v
          } as PhotoToDeleteRestoreDTO)
      )
    ),
    mergeMap((photos: PhotoToDeleteRestoreDTO[]) =>
      this.deletedPhotosService.restoresDeletedPhotos(photos).pipe(
        map(() => new PhotosActions.RestoreDeleteSelectedPhotosSucceed()),
        catchError(err => of(new PhotosActions.RestoreDeleteSelectedPhotosFailed(err)))
      )
    )
  );
}
