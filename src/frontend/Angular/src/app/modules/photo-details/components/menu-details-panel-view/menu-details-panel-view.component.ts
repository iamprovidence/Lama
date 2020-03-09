import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PhotoViewDTO } from 'src/app/core/models';
import { PhotoMenuItems } from 'src/app/core/enums';

@Component({
  selector: 'app-menu-details-panel-view',
  templateUrl: './menu-details-panel-view.component.html',
  styleUrls: ['./menu-details-panel-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuDetailsPanelViewComponent implements OnInit {
  @Input()
  public photo: PhotoViewDTO;

  @Input()
  public menuItem: PhotoMenuItems;

  @Output()
  public closeModalEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public closeModal(): void {
    this.closeModalEvent.emit();
  }
}
