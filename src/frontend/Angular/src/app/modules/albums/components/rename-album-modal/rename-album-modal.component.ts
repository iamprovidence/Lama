import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AlbumListDTO, EditAlbumDTO } from 'src/app/core/models';

@Component({
  selector: 'app-rename-album-modal',
  templateUrl: './rename-album-modal.component.html',
  styleUrls: ['./rename-album-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenameAlbumModalComponent implements OnInit {
  @Input()
  public isActive: boolean;

  @Input()
  public album: AlbumListDTO;

  @Output()
  public closeModalEvent = new EventEmitter();

  @Output()
  public editAlbumEvent = new EventEmitter<EditAlbumDTO>();

  constructor() {}

  ngOnInit() {}

  public closeModal(): void {
    this.closeModalEvent.emit();
  }

  public editAlbum(): void {
    this.editAlbumEvent.emit(this.album);
  }
}
