import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlbumListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['./album-item.component.less']
})
export class AlbumItemComponent implements OnInit {
  @Input()
  public album: AlbumListDTO;

  @Output()
  public renameAlbumEvent = new EventEmitter<AlbumListDTO>();

  @Output()
  public deleteAlbumEvent = new EventEmitter<AlbumListDTO>();

  @Output()
  public downloadAlbumEvent = new EventEmitter<AlbumListDTO>();

  public isDropdownActive: boolean;

  constructor() {}

  ngOnInit() {}

  public toggleDropdown(): void {
    this.isDropdownActive = !this.isDropdownActive;
  }

  public renameAlbum(): void {
    this.renameAlbumEvent.emit(this.album);

    this.toggleDropdown();
  }

  public deleteAlbum(): void {
    this.deleteAlbumEvent.emit(this.album);

    this.toggleDropdown();
  }

  public downloadAlbum(): void {
    this.downloadAlbumEvent.emit(this.album);

    this.toggleDropdown();
  }
}
