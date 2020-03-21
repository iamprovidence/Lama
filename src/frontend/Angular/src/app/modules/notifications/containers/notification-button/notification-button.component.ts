import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Actions from '../../store/actions';
import * as fromNotification from '../../store/selectors';

@Component({
  selector: 'app-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.less']
})
export class NotificationButtonComponent implements OnInit, OnDestroy {
  public notificationsAmount$: Observable<number>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new Actions.LoadNotifications());

    this.notificationsAmount$ = this.store.select(fromNotification.getNotificationsAmount);
  }

  ngOnDestroy() {
    this.store.dispatch(new Actions.ClearNotifications());
  }
}
