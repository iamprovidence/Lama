import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// dynamic notifications
import { DynamicNotificationComponent } from './containers/dynamic-notification/dynamic-notification.component';
import { DynamicNotificationViewComponent } from './components/dynamic-notification-view/dynamic-notification-view.component';

// notifications
import { NotificationListComponent } from './containers/notification-list/notification-list.component';
import { NotificationListViewComponent } from './components/notification-list-view/notification-list-view.component';
import { NotificationItemComponent } from './components/notification-list-view/notification-item/notification-item.component';

// notificationsButton
import { NotificationButtonComponent } from './containers/notification-button/notification-button.component';
import { NotificationButtonViewComponent } from './components/notification-button-view/notification-button-view.component';

const dynamicNotification = [DynamicNotificationComponent, DynamicNotificationViewComponent];
const notifications = [NotificationListComponent, NotificationListViewComponent, NotificationItemComponent];
const notificationsButton = [NotificationButtonComponent, NotificationButtonViewComponent];

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [dynamicNotification, notifications, notificationsButton];
}
