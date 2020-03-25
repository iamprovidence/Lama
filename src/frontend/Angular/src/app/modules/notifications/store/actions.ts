import { Action } from '@ngrx/store';
import { NotificationListDTO } from '@app/core/models';

export enum ActionTypes {
  LoadNotifications = '[NOTIFICATIONS] LoadNotifications',
  LoadNotificationsSucceed = '[NOTIFICATIONS] LoadNotificationsSucceed',
  LoadNotificationsFailed = '[NOTIFICATIONS] LoadNotificationsFailed',
  ClearNotifications = '[NOTIFICATIONS] ClearNotifications',

  MarkNotificationAsRead = '[NOTIFICATIONS] MarkNotificationAsRead'
}

export class LoadNotifications implements Action {
  readonly type = ActionTypes.LoadNotifications;
}

export class LoadNotificationsSucceed implements Action {
  readonly type = ActionTypes.LoadNotificationsSucceed;
  constructor(public payload: NotificationListDTO[]) {}
}

export class LoadNotificationsFailed implements Action {
  readonly type = ActionTypes.LoadNotificationsFailed;
  constructor(public payload: string) {}
}

export class ClearNotifications implements Action {
  readonly type = ActionTypes.ClearNotifications;
}

export class MarkNotificationAsRead implements Action {
  readonly type = ActionTypes.MarkNotificationAsRead;
  constructor(public payload: number) {}
}

export type Actions =
  | LoadNotifications
  | LoadNotificationsSucceed
  | LoadNotificationsFailed
  | ClearNotifications
  | MarkNotificationAsRead;
