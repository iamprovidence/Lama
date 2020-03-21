import { EventBase } from '@core/eventBus';
import { NotificationTypes } from '@app/core/enums';

export class ShowNotificationEvent implements EventBase {
  constructor(public type: NotificationTypes, public message: string) {}
}
