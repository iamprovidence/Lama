import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { AlbumsEffects as Effects } from './store/effects';

import { AlbumsService as ApiService } from './albums.service';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [
    RoutingModule,
    SharedModule,
    StoreModule.forFeature(SLICE_NAME, reducer),
    EffectsModule.forFeature([Effects])
  ],
  providers: [ApiService]
})
export class AlbumsModule {}
