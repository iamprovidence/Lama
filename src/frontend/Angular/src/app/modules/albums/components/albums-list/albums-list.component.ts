import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AlbumListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsListComponent implements OnInit {
  @Input()
  public albums: AlbumListDTO[];

  @Output()
  public openCreateAlbumModalEvent = new EventEmitter();

  @Output()
  public renameAlbumEvent = new EventEmitter<AlbumListDTO>();

  @Output()
  public deleteAlbumEvent = new EventEmitter<AlbumListDTO>();

  @Output()
  public downloadAlbumEvent = new EventEmitter<AlbumListDTO>();

  constructor() {}

  ngOnInit() {}

  public openCreateAlbumModal(): void {
    this.openCreateAlbumModalEvent.emit();
  }

  public renameAlbum(album: AlbumListDTO): void {
    this.renameAlbumEvent.emit(album);
  }

  public deleteAlbum(album: AlbumListDTO): void {
    this.deleteAlbumEvent.emit(album);
  }

  public downloadAlbum(album: AlbumListDTO): void {
    this.downloadAlbumEvent.emit(album);
  }
}
