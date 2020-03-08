import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import { State } from 'src/app/app.state';
import * as fromPhoto from '../details/selectors';
import * as fromImageEdit from '../edit/selectors';

import { Observable, combineLatest, of } from 'rxjs';
import { map, mergeMap, withLatestFrom, first, flatMap, reduce } from 'rxjs/operators';

import { PhotoDetailsService } from '../../photo-details.service';
import * as PhotoDetailsActions from '../details/actions';
import { ImageEditService } from '../../image-edit.service';
import * as ImageAction from '../edit/actions';

import { PhotoViewDTO, ImageFilterDTO, EditPhotoDTO } from 'src/app/core/models';

@Injectable()
export class PhotoEditEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<State>,
    private photoApiService: PhotoDetailsService,
    private imageService: ImageEditService
  ) {}

  @Effect()
  restoreOriginal$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.RestoreOriginal),
    withLatestFrom(this.store$.select(fromPhoto.getPhoto)),
    map(([action, photo]) => photo),
    mergeMap((photo: PhotoViewDTO) =>
      this.photoApiService.getOriginalPhoto(photo.id).pipe(
        mergeMap(originalPhoto => this.imageService.getImageBase64(originalPhoto.photoUrl)),
        map(photoBase64 => new ImageAction.SetImageBase64(photoBase64))
      )
    )
  );

  @Effect()
  resetChanges$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.ResetEditingChanges),
    withLatestFrom(this.store$.select(fromPhoto.getPhoto)),
    map(([action, photo]) => photo),
    mergeMap((photo: PhotoViewDTO) =>
      this.imageService
        .getImageBase64(photo.photoUrl)
        .pipe(map(photoBase64 => new ImageAction.SetImageBase64(photoBase64)))
    )
  );

  @Effect()
  saveChanges$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.SaveChanges),
    mergeMap(() =>
      combineLatest(
        this.store$.pipe(select(fromPhoto.getPhoto), first()),
        this.store$.pipe(select(fromImageEdit.getDisplayedlImageBase64), first())
      ).pipe(
        map(
          ([photo, editedPhotoBase64]) =>
            ({
              id: photo.id,
              base64Image: editedPhotoBase64
            } as EditPhotoDTO)
        ),
        mergeMap(editPhotoDTO =>
          this.photoApiService
            .editPhoto(editPhotoDTO)
            .pipe(map(editedPhoto => new ImageAction.SaveChangesSucceed(editedPhoto)))
        )
      )
    )
  );

  @Effect()
  loadImageBase64$: Observable<Action> = this.actions$.pipe(
    ofType(PhotoDetailsActions.ActionTypes.LoadPhotoSucceed),
    map((action: PhotoDetailsActions.LoadPhotoSucceed) => action.payload),
    mergeMap((photo: PhotoViewDTO) =>
      this.imageService
        .getImageBase64(photo.photoUrl)
        .pipe(map(photoBase64 => new ImageAction.SetImageBase64(photoBase64)))
    )
  );

  @Effect()
  loadFiltersThumbnails$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.LoadFiltersThumbnails),
    mergeMap(() =>
      combineLatest(
        this.store$.pipe(select(fromImageEdit.getCurrentImageBase64), first()),
        this.store$.pipe(
          select(fromImageEdit.getAllFilters),
          first(),
          flatMap(filter => filter)
        )
      ).pipe(
        mergeMap(([image, filter]) => this.imageService.applyFilter(image, filter)),
        reduce((acc: ImageFilterDTO[], value: ImageFilterDTO) => acc.concat(value), [] as ImageFilterDTO[]),
        map(filteredImages => new ImageAction.LoadFiltersThumbnailsSucceed(filteredImages))
      )
    )
  );

  @Effect()
  applyFilter$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.ApplyFilter),
    mergeMap(() => of(new ImageAction.EditImage()))
  );

  @Effect()
  setColorAdjustments$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.SetColorAdjustments),
    mergeMap(() => of(new ImageAction.EditImage()))
  );

  @Effect()
  editImage$: Observable<Action> = this.actions$.pipe(
    ofType(ImageAction.ActionTypes.EditImage),
    mergeMap(() =>
      combineLatest(
        this.store$.pipe(select(fromImageEdit.getCurrentImageBase64), first()),
        this.store$.pipe(select(fromImageEdit.getCurrentFilter), first()),
        this.store$.pipe(select(fromImageEdit.getColorAdjustments), first())
      ).pipe(
        mergeMap(([image, filter, colorAdjustments]) =>
          this.imageService.applyFilter(image, filter).pipe(
            map(imageFilter => imageFilter.imageBase64Thumbnails),
            mergeMap(imageWithFilter => this.imageService.setColorAdjustments(imageWithFilter, colorAdjustments)),
            map((editedImageBase64: string) => new ImageAction.EditImageSucceed(editedImageBase64))
          )
        )
      )
    )
  );
}
