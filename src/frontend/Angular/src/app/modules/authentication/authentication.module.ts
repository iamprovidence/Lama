import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';

import { SharedModule } from 'src/app/shared/shared.module';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { AuthorizationComponent } from './containers/authorization/authorization.component';
import { environment } from 'src/environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { IsAuthorizedGuard, IsAnonymousGuard } from './guards';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { AuthEffects } from './store/effects';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddAuthHeaderInterceptor } from './interceptors/add-auth-header.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  imports: [
    SharedModule,

    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),

    StoreModule.forFeature(SLICE_NAME, reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthService,
    IsAuthorizedGuard,
    IsAnonymousGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  declarations: [AuthorizationComponent, SignInModalComponent],
  exports: [AuthorizationComponent]
})
export class AuthenticationModule {}
