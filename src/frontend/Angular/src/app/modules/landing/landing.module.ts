import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RoutingModule } from './routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [SharedModule, RoutingModule],
  declarations: [RoutingModule.components, LoginComponent]
})
export class LandingModule {}
