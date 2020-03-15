import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedEmailsListDTO, SharePhotoDTO, DeleteSharedPhotoDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

@Component({
  selector: 'app-share-photo-panel-view',
  templateUrl: './share-photo-panel-view.component.html',
  styleUrls: ['./share-photo-panel-view.component.less']
})
export class SharePhotoPanelViewComponent implements OnInit {
  public shareWithEmail: string;

  @Input()
  public error: string;

  @Input()
  public isLoading: DataState;

  @Input()
  public photoId: string;

  @Input()
  public sharedEmails: SharedEmailsListDTO[];

  @Output()
  public sharePhotoEvent = new EventEmitter<SharePhotoDTO>();

  @Output()
  public deleteSharedEvent = new EventEmitter<DeleteSharedPhotoDTO>();

  constructor() {}

  ngOnInit() {}

  public deleteShared(sharedEmails: SharedEmailsListDTO): void {
    this.deleteSharedEvent.emit(sharedEmails);
  }

  public sharePhoto(userToShareEmail: string): void {
    this.shareWithEmail = null;

    const sharePhoto: SharePhotoDTO = { photoId: this.photoId, userEmail: userToShareEmail };

    this.sharePhotoEvent.emit(sharePhoto);
  }
}
