import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-album-button.',
  templateUrl: './add-album-button.component.html',
  styleUrls: ['./add-album-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAlbumButtonComponent implements OnInit {
  @Output()
  public openCreateAlbumModalEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public openCreateAlbumModal(): void {
    this.openCreateAlbumModalEvent.emit();
  }
}
