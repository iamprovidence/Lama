import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { PhotoDetailsService } from '../photo-details.service';
import * as PhotoDetailsActions from '../store/actions';

@Injectable()
export class PhotoDetailssEffects {
  constructor(private actions$: Actions, private photosService: PhotoDetailsService) {}

  @Effect()
  uploadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoDetailsActions.ActionTypes.LoadPhoto),
    map((action: PhotoDetailsActions.LoadPhoto) => action.payload),
    mergeMap((photoId: string) =>
      this.photosService.getPhoto(photoId).pipe(
        map(photo => new PhotoDetailsActions.LoadPhotoSucceed(photo)),
        catchError(err => of(new PhotoDetailsActions.LoadPhotoFailed(err)))
      )
    )
  );
}
