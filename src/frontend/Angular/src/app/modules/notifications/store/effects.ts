import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { NotificationsApiService as ApiService } from '../notifications-api.service';
import * as StoreActions from '../store/actions';

@Injectable()
export class NotificationsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadNotifications$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.LoadNotifications),
    mergeMap(() =>
      this.apiService.getCurrentUserNotifications().pipe(
        map(notifications => new StoreActions.LoadNotificationsSucceed(notifications)),
        catchError(err => of(new StoreActions.LoadNotificationsFailed(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  markNotificationAsRead$: Observable<object> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.MarkNotificationAsRead),
    map((action: StoreActions.MarkNotificationAsRead) => action.payload),
    mergeMap((notificationId: number) => this.apiService.markNotificationAsRead(notificationId))
  );
}
