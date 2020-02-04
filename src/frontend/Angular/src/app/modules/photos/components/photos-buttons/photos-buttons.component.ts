import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataState } from 'src/app/core/enums';

@Component({
  selector: 'app-photos-buttons',
  templateUrl: './photos-buttons.component.html',
  styleUrls: ['./photos-buttons.component.less']
})
export class PhotosButtonsComponent implements OnInit {
  @Input()
  public viewType: DataState;

  @Output()
  public changeViewTypeEvent = new EventEmitter<DataState>();

  @Output()
  public deleteSelectedPhotosEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public changeView(newViewType: DataState): void {
    this.changeViewTypeEvent.emit(newViewType);
  }

  public deleteSelected(): void {
    this.deleteSelectedPhotosEvent.emit();
  }
}
