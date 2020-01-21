import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { PhotosService } from '../photos.service';
import * as PhotosActions from '../store/actions';
import * as UploadPhotosActions from '../../upload-photos/store/actions';

import { PhotoToUploadDTO } from 'src/app/core/models';

@Injectable()
export class PhotosEffects {
  constructor(private actions$: Actions, private photosService: PhotosService) {}

  @Effect()
  loadPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.LoadPhotos),
    mergeMap(() =>
      this.photosService.getCurrentUserPhotos().pipe(map(photos => new PhotosActions.LoadPhotosSucceed(photos)))
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
}
