import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PhotoToUploadDTO } from 'src/app/core/models';

@Component({
  selector: 'app-upload-photos-modal',
  templateUrl: './upload-photos-modal.component.html',
  styleUrls: ['./upload-photos-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPhotosModalComponent implements OnInit {
  @Input()
  public photos: PhotoToUploadDTO[];
  @Input()
  public isActive: boolean;

  @Output()
  public photoUploadedEvent = new EventEmitter<File[]>();
  @Output()
  public removePhotoEvent = new EventEmitter<string>();
  @Output()
  public updatePhotoEvent = new EventEmitter<PhotoToUploadDTO>();

  @Output()
  public setIsModalOpenEvent = new EventEmitter<boolean>();
  @Output()
  public saveUploadedPhotosEvent = new EventEmitter<PhotoToUploadDTO[]>();

  constructor() {}

  ngOnInit() {}

  public closeModal(): void {
    this.setIsModalOpenEvent.emit(false);
  }

  public onFileSelected(files: FileList): void {
    this.photosUploaded(Array.from(files));
  }

  public onFileDropped(files: File[]): void {
    this.photosUploaded(files);
  }

  private photosUploaded(files: File[]): void {
    this.photoUploadedEvent.emit(files);
  }

  public onRemovePhoto(photoName: string): void {
    this.removePhotoEvent.emit(photoName);
  }

  public onPhotoUpdated(updatedPhoto: PhotoToUploadDTO): void {
    this.updatePhotoEvent.emit(updatedPhoto);
  }

  public onSaveChanges(photos: PhotoToUploadDTO[]): void {
    this.saveUploadedPhotosEvent.emit(photos);
  }
}
