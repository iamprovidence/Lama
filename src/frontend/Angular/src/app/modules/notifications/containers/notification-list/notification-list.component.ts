import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Actions from '../../store/actions';
import * as fromNotification from '../../store/selectors';

import { DataState } from '@core/enums';
import { NotificationListDTO } from '@core/models';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.less']
})
export class NotificationListComponent implements OnInit {
  public isLoading$: Observable<DataState>;
  public notifications$: Observable<NotificationListDTO[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromNotification.getIsLoading);
    this.notifications$ = this.store.select(fromNotification.getNotifications);

    this.store.dispatch(new Actions.LoadNotifications());
  }

  public clickNotification(notification: NotificationListDTO): void {
    this.store.dispatch(new Actions.MarkNotificationAsRead(notification.id));
  }
}
