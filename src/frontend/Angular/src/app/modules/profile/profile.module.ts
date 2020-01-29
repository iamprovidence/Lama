import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [RoutingModule, SharedModule]
})
export class ProfileModule {}
