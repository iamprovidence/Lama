import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { UploadPhotosService } from '../upload-photos.service';
import * as UploadPhotosActions from '../store/actions';

@Injectable()
export class UploadPhotosEffects {
  constructor(private actions$: Actions, private uploadPhotosService: UploadPhotosService) {}

  @Effect()
  uploadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(UploadPhotosActions.ActionTypes.LoadFiles),
    map((action: UploadPhotosActions.LoadFiles) => action.payload),
    mergeMap((loadedFiles: File[]) =>
      this.uploadPhotosService
        .readFilesAsImages(loadedFiles)
        .pipe(map(photos => new UploadPhotosActions.SetUploadedPhotos(photos)))
    )
  );

  @Effect()
  photosSaved$: Observable<Action> = this.actions$.pipe(
    ofType(UploadPhotosActions.ActionTypes.SavePhotosSucceed),
    mergeMap(() => of(new UploadPhotosActions.ClearUploadedPhotos()))
  );
}
