import { Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PhotoListDTO } from 'src/app/core/models';

@Injectable()
export abstract class PhotosViewBaseComponent implements OnInit {
  @Input()
  public photos: PhotoListDTO[];

  @Input()
  public selected: Set<string>;

  @Output()
  public selectPhotoEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public select(photo: PhotoListDTO): void {
    this.selectPhotoEvent.emit(photo.id);
  }

  public isSelected(photo: PhotoListDTO): boolean {
    return this.selected.has(photo.id);
  }
}
