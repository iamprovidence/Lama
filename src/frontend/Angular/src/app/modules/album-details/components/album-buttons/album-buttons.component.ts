import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album-buttons',
  templateUrl: './album-buttons.component.html',
  styleUrls: ['./album-buttons.component.less']
})
export class AlbumButtonsComponent implements OnInit {
  @Output()
  public downloadSelectedEvent = new EventEmitter();

  @Output()
  public deleteSelectedEvent = new EventEmitter();

  @Output()
  public addPhotosEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public deleteSelected(): void {
    this.deleteSelectedEvent.emit();
  }

  public addPhotos(): void {
    this.addPhotosEvent.emit();
  }
}
