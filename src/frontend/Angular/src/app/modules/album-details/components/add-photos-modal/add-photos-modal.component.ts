import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataState } from 'src/app/core/enums';
import { PhotoListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-add-photos-modal',
  templateUrl: './add-photos-modal.component.html',
  styleUrls: ['./add-photos-modal.component.less']
})
export class AddPhotosModalComponent implements OnInit {
  @Input()
  public isActive: boolean;

  @Input()
  public isLoading: DataState;

  @Input()
  public photos: PhotoListDTO[];

  @Input()
  public selected: Set<string>;

  @Output()
  public selectPhotoEvent = new EventEmitter<PhotoListDTO>();

  @Output()
  public updateAlbumEvent = new EventEmitter();

  @Output()
  public closeModalEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public isSelected(photo: PhotoListDTO): boolean {
    return this.selected.has(photo.id);
  }

  public selectPhoto(photo: PhotoListDTO): void {
    this.selectPhotoEvent.emit(photo);
  }

  public updateAlbum(): void {
    this.updateAlbumEvent.emit();
  }
  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
