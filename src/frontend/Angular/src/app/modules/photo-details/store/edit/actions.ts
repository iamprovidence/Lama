import { Action } from '@ngrx/store';
import { EditTab } from 'src/app/core/enums';
import {
  ImageCroppedDTO,
  ImageFilterDTO,
  ColorAdjustmentstDTO,
  ImageRotatedDTO,
  PhotoViewDTO
} from 'src/app/core/models';

export enum ActionTypes {
  RestoreOriginal = '[PHOTO-DETAILS] RestoreOriginal',
  ResetEditingChanges = '[PHOTO-DETAILS] ResetEditingChanges',
  CancelChanges = '[PHOTO-DETAILS] CancelChanges',
  SaveChanges = '[PHOTO-DETAILS] SaveChanges',
  SaveChangesSucceed = '[PHOTO-DETAILS] SaveChangesSucceed',

  SelectEditPhotoTab = '[PHOTO-DETAILS] SelectEditPhotoTab',

  SetImageBase64 = '[PHOTO-DETAILS] SetImageBase64',
  SetCroppedImage = '[PHOTO-DETAILS] SetCroppedImage',
  SetRotatedImage = '[PHOTO-DETAILS] SetRotatedImage',
  SetCroppedSizes = '[PHOTO-DETAILS] SetCroppedSizes',

  LoadFiltersThumbnails = '[PHOTO-DETAILS] LoadFiltersThumbnails',
  LoadFiltersThumbnailsSucceed = '[PHOTO-DETAILS] LoadFiltersThumbnailsSucceed',

  ApplyFilter = '[PHOTO-DETAILS] ApplyFilter',
  SetColorAdjustments = '[PHOTO-DETAILS] SetColorAdjustments',

  EditImage = '[PHOTO-DETAILS] EditImage',
  EditImageSucceed = '[PHOTO-DETAILS] EditImageSucceed'
}

export class RestoreOriginal implements Action {
  readonly type = ActionTypes.RestoreOriginal;
}

export class ResetEditingChanges implements Action {
  readonly type = ActionTypes.ResetEditingChanges;
}

export class CancelChanges implements Action {
  readonly type = ActionTypes.CancelChanges;
}

export class SaveChanges implements Action {
  readonly type = ActionTypes.SaveChanges;
}

export class SaveChangesSucceed implements Action {
  readonly type = ActionTypes.SaveChangesSucceed;
  constructor(public payload: PhotoViewDTO) {}
}

export class SetImageBase64 implements Action {
  readonly type = ActionTypes.SetImageBase64;
  constructor(public payload: string) {}
}

export class SetCroppedImage implements Action {
  readonly type = ActionTypes.SetCroppedImage;
  constructor(public payload: ImageCroppedDTO) {}
}

export class SetRotatedImage implements Action {
  readonly type = ActionTypes.SetRotatedImage;
  constructor(public payload: ImageRotatedDTO) {}
}

export class SetCroppedSizes implements Action {
  readonly type = ActionTypes.SetCroppedSizes;
  constructor(public payload: ImageCroppedDTO) {}
}

export class SelectEditPhotoTab implements Action {
  readonly type = ActionTypes.SelectEditPhotoTab;
  constructor(public payload: EditTab) {}
}

export class LoadFiltersThumbnails implements Action {
  readonly type = ActionTypes.LoadFiltersThumbnails;
}

export class LoadFiltersThumbnailsSucceed implements Action {
  readonly type = ActionTypes.LoadFiltersThumbnailsSucceed;
  constructor(public payload: ImageFilterDTO[]) {}
}

export class ApplyFilter implements Action {
  readonly type = ActionTypes.ApplyFilter;
  constructor(public payload: number) {}
}

export class SetColorAdjustments implements Action {
  readonly type = ActionTypes.SetColorAdjustments;
  constructor(public payload: ColorAdjustmentstDTO) {}
}

export class EditImage implements Action {
  readonly type = ActionTypes.EditImage;
}

export class EditImageSucceed implements Action {
  readonly type = ActionTypes.EditImageSucceed;
  constructor(public payload: string) {}
}

export type Actions =
  | RestoreOriginal
  | ResetEditingChanges
  | CancelChanges
  | SaveChanges
  | SaveChangesSucceed
  | SetImageBase64
  | SetCroppedImage
  | SetRotatedImage
  | SetCroppedSizes
  | SelectEditPhotoTab
  | LoadFiltersThumbnails
  | LoadFiltersThumbnailsSucceed
  | ApplyFilter
  | SetColorAdjustments
  | EditImage
  | EditImageSucceed;
