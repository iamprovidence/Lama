import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './login/login.component';
import { AuthenticationModule } from 'src/app/modules/authentication/authentication.module';

@NgModule({
  imports: [SharedModule, RoutingModule, AuthenticationModule],
  declarations: [RoutingModule.components, LoginComponent]
})
export class LandingModule {}
