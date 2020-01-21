import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { PhotosEffects } from './store/effects';

import { PhotosService } from './photos.service';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [
    RoutingModule,
    SharedModule,
    StoreModule.forFeature(SLICE_NAME, reducer),
    EffectsModule.forFeature([PhotosEffects])
  ],
  providers: [PhotosService]
})
export class PhotosModule {}
