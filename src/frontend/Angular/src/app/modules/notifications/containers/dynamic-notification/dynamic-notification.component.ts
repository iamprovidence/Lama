import { Component, OnInit } from '@angular/core';
import { EventBusService } from '@core/eventBus';
import * as Events from '@shared/events';

import { NotificationsDynamicService } from '@modules/notifications/notifications-dynamic.service';

@Component({
  selector: 'app-dynamic-notification',
  templateUrl: './dynamic-notification.component.html',
  styleUrls: ['./dynamic-notification.component.less']
})
export class DynamicNotificationComponent implements OnInit {
  constructor(private eventBus: EventBusService, private notificationService: NotificationsDynamicService) {}

  ngOnInit() {
    this.eventBus.on<Events.ShowNotificationEvent>(this.showNotification.bind(this));
  }

  private showNotification(event: Events.ShowNotificationEvent): void {
    const { type, message } = event;
    this.notificationService.showNotification(type, message);
  }
}
