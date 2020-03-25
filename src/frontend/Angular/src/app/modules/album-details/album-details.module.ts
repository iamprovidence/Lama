import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhotosModule } from 'src/app/modules/photos/photos.module';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { AlbumDetailsEffects as Effects } from './store/effects';

import { AlbumDetailsService as ApiService } from './album-details.service';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [
    RoutingModule,
    SharedModule,
    PhotosModule,
    StoreModule.forFeature(SLICE_NAME, reducer),
    EffectsModule.forFeature([Effects])
  ],
  providers: [ApiService]
})
export class AlbumDetailsModule {}
