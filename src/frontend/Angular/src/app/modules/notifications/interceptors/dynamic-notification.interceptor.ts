import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, merge } from 'rxjs';
import { map, tap, filter, partition, share } from 'rxjs/operators';

import { EventBusService } from '@core/eventBus';
import { NotificationTypes } from '@core/enums';
import { NotificationResult } from '@core/models';
import * as Events from '@shared/events';

@Injectable()
export class DynamicNotificationInterceptor implements HttpInterceptor {
  constructor(private eventBus: EventBusService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpResponse = next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      map((event: HttpEvent<any>) => event as HttpResponse<any>),
      share()
    );

    const [notificationResponse, regularResponse] = partition((response: HttpResponse<any>) =>
      this.isNotificationResponse(response)
    )(httpResponse);

    const notificationUnwrapped = notificationResponse.pipe(
      tap((response: HttpResponse<NotificationResult>) => {
        const { body } = response;
        const { notificationType, message } = body;

        this.eventBus.emit(new Events.ShowNotificationEvent(NotificationTypes.byIndex(notificationType), message));
      }),
      map((response: HttpResponse<NotificationResult>) => {
        const responseResult = response.body.result;
        return response.clone({ body: { ...responseResult } });
      })
    );

    return merge(notificationUnwrapped, regularResponse);
  }

  private isNotificationResponse(response: HttpResponse<any>): response is HttpResponse<NotificationResult> {
    const { body } = response;
    if (!body) return false;

    const bodyObject = body as NotificationResult;
    if (bodyObject.message === undefined) return false;
    if (bodyObject.notificationType === undefined) return false;
    if (bodyObject.result === undefined) return false;

    return true;
  }
}
