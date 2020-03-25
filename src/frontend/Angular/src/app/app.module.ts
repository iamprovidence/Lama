import { environment } from '@environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from '@app/app.component';
import { RoutingModule } from '@app/app.routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RoutingModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    NotificationsModule,

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({
      name: 'Lama',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
