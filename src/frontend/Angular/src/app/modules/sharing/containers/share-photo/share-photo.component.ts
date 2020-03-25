import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Actions from '../../store/actions';
import * as fromSharing from '../../store/selectors';
import * as fromPhoto from 'src/app/modules/photo-details/store/details/selectors';

import { DataState } from 'src/app/core/enums';
import { SharedEmailsListDTO, SharePhotoDTO, DeleteSharedPhotoDTO } from 'src/app/core/models';

@Component({
  selector: 'app-share-photo',
  templateUrl: './share-photo.component.html',
  styleUrls: ['./share-photo.component.less']
})
export class SharePhotoComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<DataState>;
  public sharedEmails$: Observable<SharedEmailsListDTO[]>;
  public error$: Observable<string>;
  public photoId$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromSharing.getIsLoading);
    this.sharedEmails$ = this.store.select(fromSharing.getSharedEmails);
    this.error$ = this.store.select(fromSharing.getError);
    this.photoId$ = this.store.select(fromPhoto.getCurrentPhotoId);

    this.photoId$.subscribe(photoId => photoId && this.store.dispatch(new Actions.LoadSharedEmails(photoId)));
  }

  ngOnDestroy() {
    this.store.dispatch(new Actions.ClearSharedEmails());
  }

  public sharePhoto(sharePhoto: SharePhotoDTO): void {
    this.store.dispatch(new Actions.SharePhoto(sharePhoto));
  }
  public deleteShared(deleteShared: DeleteSharedPhotoDTO): void {
    this.store.dispatch(new Actions.DeleteShared(deleteShared));
  }
}
