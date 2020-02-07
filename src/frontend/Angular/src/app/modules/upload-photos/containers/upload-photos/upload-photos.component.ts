import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/state';
import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';

import { Observable, of } from 'rxjs';

import { PhotoToUploadDTO } from 'src/app/core/models';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.less']
})
export class UploadPhotosComponent implements OnInit {
  public photos$: Observable<PhotoToUploadDTO[]> = of([]);
  public isActive$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isActive$ = this.store.select(Selectors.getIsUploadPhotoModalOpen);
    this.photos$ = this.store.select(Selectors.getUploadedPhotos);
  }

  public onSetIsModalOpen(isOpen: boolean): void {
    this.store.dispatch(new Actions.SetIsUploadPhotoModalOpen(isOpen));
  }

  public onPhotoUploaded(files: File[]): void {
    this.store.dispatch(new Actions.LoadFiles(files));
  }

  public onPhotoRemoved(photoName: string): void {
    this.store.dispatch(new Actions.RemoveUploadedPhoto(photoName));
  }

  public onPhotoUpdated(photoToUpdate: PhotoToUploadDTO): void {
    this.store.dispatch(new Actions.UpdatePhoto(photoToUpdate));
  }

  public onSaveUploadedPhotos(photos: PhotoToUploadDTO[]): void {
    this.store.dispatch(new Actions.SavePhotos(photos));
  }
}
