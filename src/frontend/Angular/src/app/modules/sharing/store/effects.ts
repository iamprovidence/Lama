import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { State } from './state';
import * as StoreActions from './actions';
import * as fromSharing from './selectors';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, filter, tap } from 'rxjs/operators';

import { SharingService as ApiService } from '../sharing.service';
import { SharePhotoDTO, DeleteSharedPhotoDTO } from 'src/app/core/models';

@Injectable()
export class SharingEffects {
  constructor(private actions$: Actions, private store$: Store<State>, private apiService: ApiService) {}

  @Effect()
  loadSharingEmailForPhoto$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.LoadSharedEmails),
    map((action: StoreActions.LoadSharedEmails) => action.payload),
    mergeMap((photoId: string) =>
      this.apiService.getSharedEmails(photoId).pipe(
        map(photo => new StoreActions.LoadSharedEmailsSucceed(photo)),
        catchError(err => of(new StoreActions.LoadSharedEmailsFailed(err)))
      )
    )
  );

  @Effect()
  sharePhoto$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.SharePhoto),
    map((action: StoreActions.SharePhoto) => action.payload),
    withLatestFrom(this.store$.select(fromSharing.getSharedEmails)),
    map(([photoToShare, sharedEmails]) =>
      sharedEmails.some(se => se.photoId === photoToShare.photoId && se.userEmail === photoToShare.userEmail)
        ? null
        : photoToShare
    ),
    filter(v => v !== null),
    filter(v => v.userEmail !== null),
    mergeMap((sharePhoto: SharePhotoDTO) =>
      this.apiService.sharePhoto(sharePhoto).pipe(
        map(sharedPhoto => new StoreActions.SharePhotoSucceed(sharedPhoto)),
        catchError(err => of(new StoreActions.SharePhotoFailed(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  deleteShared$: Observable<object> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.DeleteShared),
    map((action: StoreActions.DeleteShared) => action.payload),
    mergeMap((deleteShared: DeleteSharedPhotoDTO) => this.apiService.deleteSharedPhoto(deleteShared))
  );
}
