import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotifierModule } from 'angular-notifier';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DynamicNotificationInterceptor } from './interceptors/dynamic-notification.interceptor';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { NotificationsEffects as Effects } from './store/effects';

import { NotificationsApiService } from './notifications-api.service';
import { NotificationsDynamicService } from './notifications-dynamic.service';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [
    RoutingModule,
    SharedModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'
        }
      }
    }),
    StoreModule.forFeature(SLICE_NAME, reducer),
    EffectsModule.forFeature([Effects])
  ],
  providers: [
    NotificationsApiService,
    NotificationsDynamicService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: DynamicNotificationInterceptor,
      multi: true
    }
  ],
  exports: [RoutingModule.components]
})
export class NotificationsModule {}
