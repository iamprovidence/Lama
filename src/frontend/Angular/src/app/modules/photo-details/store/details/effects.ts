import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { PhotoDetailsService } from '../../photo-details.service';
import * as PhotoDetailsActions from './actions';
import * as ImageActions from '../edit/actions';
import { PhotoViewDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

@Injectable()
export class PhotoDetailsEffects {
  constructor(private actions$: Actions, private photosService: PhotoDetailsService) {}

  @Effect()
  loadPhoto$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoDetailsActions.ActionTypes.LoadPhoto),
    map((action: PhotoDetailsActions.LoadPhoto) => action.payload),
    mergeMap((photoId: string) =>
      this.photosService.getPhoto(photoId).pipe(
        map(photo => new PhotoDetailsActions.LoadPhotoSucceed(photo)),
        catchError(err => of(new PhotoDetailsActions.LoadPhotoFailed(err)))
      )
    )
  );

  @Effect()
  updatePhoto$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoDetailsActions.ActionTypes.UpdatePhoto),
    map((action: PhotoDetailsActions.UpdatePhoto) => action.payload),
    mergeMap(updatePhoto =>
      this.photosService.updatePhoto(updatePhoto).pipe(
        map(photo => new PhotoDetailsActions.UpdatePhotoSucceed(photo)),
        catchError(err => of(new PhotoDetailsActions.UpdatePhotoFailed(err)))
      )
    )
  );

  @Effect()
  startSavingPhoto$: Observable<Action> = this.actions$.pipe(
    ofType(ImageActions.ActionTypes.SaveChanges),
    mergeMap(() => of(new PhotoDetailsActions.SetIsLoading(DataState.Loading)))
  );

  @Effect()
  updateEditedPhoto$: Observable<Action> = this.actions$.pipe(
    ofType(ImageActions.ActionTypes.SaveChangesSucceed),
    map((action: ImageActions.SaveChangesSucceed) => action.payload),
    mergeMap((editedPhoto: PhotoViewDTO) => of(new PhotoDetailsActions.LoadPhotoSucceed(editedPhoto)))
  );
}
