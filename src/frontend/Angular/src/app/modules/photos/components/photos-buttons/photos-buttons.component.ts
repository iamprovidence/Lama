import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoViewType } from 'src/app/core/enums';

@Component({
  selector: 'app-photos-buttons',
  templateUrl: './photos-buttons.component.html',
  styleUrls: ['./photos-buttons.component.less']
})
export class PhotosButtonsComponent implements OnInit {
  @Input()
  public viewType: PhotoViewType;

  @Output()
  public changeViewTypeEvent = new EventEmitter<PhotoViewType>();

  @Output()
  public deleteSelectedPhotosEvent = new EventEmitter();

  @Output()
  public downloadSelectedPhotosEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public changeView(newViewType: PhotoViewType): void {
    this.changeViewTypeEvent.emit(newViewType);
  }

  public deleteSelected(): void {
    this.deleteSelectedPhotosEvent.emit();
  }

  public downloadSelected(): void {
    this.downloadSelectedPhotosEvent.emit();
  }
}
