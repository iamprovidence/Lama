import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PhotoMenuState, PhotoMenuItems } from 'src/app/core/enums';

@Component({
  selector: 'app-photo-top-bar-menu-view',
  templateUrl: './photo-top-bar-menu-view.component.html',
  styleUrls: ['./photo-top-bar-menu-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoTopBarMenuViewComponent implements OnInit {
  @Input()
  public menuState: PhotoMenuState;

  @Input()
  public currentMenuItem: PhotoMenuItems;

  @Output()
  public menuClickedEvent = new EventEmitter<PhotoMenuItems>();

  @Output()
  public restoreOriginalEvent = new EventEmitter();

  @Output()
  public resetChangesEvent = new EventEmitter();

  @Output()
  public cancelChangesEvent = new EventEmitter();

  @Output()
  public saveChangesEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public clickMenu(menuItem: PhotoMenuItems): void {
    this.menuClickedEvent.emit(menuItem);
  }

  public restoreOriginal(): void {
    this.menuClickedEvent.emit(PhotoMenuItems.Edit);
    this.restoreOriginalEvent.emit();
  }

  public resetChanges(): void {
    this.menuClickedEvent.emit(PhotoMenuItems.Edit);
    this.resetChangesEvent.emit();
  }

  public cancelChanges(): void {
    this.menuClickedEvent.emit(PhotoMenuItems.Cancel);
    this.cancelChangesEvent.emit();
  }

  public saveChanges(): void {
    this.menuClickedEvent.emit(PhotoMenuItems.Save);
    this.saveChangesEvent.emit();
  }
}
