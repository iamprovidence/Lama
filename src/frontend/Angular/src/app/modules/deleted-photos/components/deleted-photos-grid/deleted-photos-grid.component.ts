import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { DeletedPhotosListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-deleted-photos-grid',
  templateUrl: './deleted-photos-grid.component.html',
  styleUrls: ['./deleted-photos-grid.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletedPhotosGridComponent implements OnInit {
  @Input()
  public deletedPhotos: DeletedPhotosListDTO;
  @Input()
  public selectedPhotosIds: Set<string>;

  @Output()
  public selectPhotoEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  public selectPhoto(photo: DeletedPhotosListDTO): void {
    this.selectPhotoEvent.emit(photo.id);
  }

  public isSelected(photo: DeletedPhotosListDTO): boolean {
    return this.selectedPhotosIds.has(photo.id);
  }
}
