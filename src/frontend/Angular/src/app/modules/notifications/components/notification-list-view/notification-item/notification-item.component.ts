import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { NotificationListDTO } from '@app/core/models';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.less'],
  animations: [
    trigger('slideFadeAnimation', [
      transition(':leave', [
        query('.notification', [animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(1000px)' }))])
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationItemComponent implements OnInit {
  @HostBinding('@slideFadeAnimation')
  @Input()
  public notification: NotificationListDTO;

  @Output()
  public clickNotificationEvent = new EventEmitter<NotificationListDTO>();

  constructor() {}

  ngOnInit() {}

  public clickNotification(): void {
    this.clickNotificationEvent.emit(this.notification);
  }
}
