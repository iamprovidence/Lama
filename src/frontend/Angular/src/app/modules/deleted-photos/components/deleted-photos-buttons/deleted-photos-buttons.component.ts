import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-deleted-photos-buttons',
  templateUrl: './deleted-photos-buttons.component.html',
  styleUrls: ['./deleted-photos-buttons.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletedPhotosButtonsComponent implements OnInit {
  @Input()
  public selectedPhotosAmount: number;

  @Output()
  public deleteSelectedPhotosEvent = new EventEmitter();
  @Output()
  public restoreSelectedPhotosEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public deleteSelectedPhotos(): void {
    this.deleteSelectedPhotosEvent.emit();
  }
  public restoreSelectedPhotos(): void {
    this.restoreSelectedPhotosEvent.emit();
  }
}
