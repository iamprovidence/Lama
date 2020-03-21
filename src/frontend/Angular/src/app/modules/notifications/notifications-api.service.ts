import { environment } from '@environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { NotificationListDTO } from '@app/core/models';

@Injectable()
export class NotificationsApiService {
  private apiUri = `${environment.apiUrl}/api/Notifications`;

  constructor(private httpClient: HttpClient) {}

  public getCurrentUserNotifications(): Observable<NotificationListDTO[]> {
    return this.httpClient.get<NotificationListDTO[]>(`${this.apiUri}/all`);
  }

  public markNotificationAsRead(notificationId: number): Observable<object> {
    return this.httpClient.post(`${this.apiUri}/markAsRead`, { notificationId });
  }
}
