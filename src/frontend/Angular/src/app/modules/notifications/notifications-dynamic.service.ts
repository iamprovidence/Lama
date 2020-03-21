import { Injectable } from '@angular/core';

import { NotifierService } from 'angular-notifier';
import { NotificationTypes } from '@core/enums';

@Injectable()
export class NotificationsDynamicService {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  public showNotification(type: NotificationTypes, message: string): void {
    this.notifier.notify(type, message);
  }
}
