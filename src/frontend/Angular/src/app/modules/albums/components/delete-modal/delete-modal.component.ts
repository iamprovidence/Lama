import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AlbumListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteModalComponent implements OnInit {
  @Input()
  public isActive: boolean;

  @Input()
  public album: AlbumListDTO;

  @Output()
  public closeModalEvent = new EventEmitter();

  @Output()
  public deleteAlbumEvent = new EventEmitter<AlbumListDTO>();

  constructor() {}

  ngOnInit() {}

  public closeModal(): void {
    this.closeModalEvent.emit();
  }

  public deleteAlbum(): void {
    this.deleteAlbumEvent.emit(this.album);
  }
}
