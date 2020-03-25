import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { NotificationListDTO } from '@app/core/models';

@Component({
  selector: 'app-notification-list-view',
  templateUrl: './notification-list-view.component.html',
  styleUrls: ['./notification-list-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationListViewComponent implements OnInit {
  @Input()
  public notifications: NotificationListDTO[];

  @Output()
  public clickNotificationEvent = new EventEmitter<NotificationListDTO>();

  constructor() {}

  ngOnInit() {}

  public clickNotification(notification: NotificationListDTO): void {
    this.clickNotificationEvent.emit(notification);
  }
}
