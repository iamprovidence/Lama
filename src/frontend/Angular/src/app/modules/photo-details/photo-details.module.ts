import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsModule } from 'src/app/modules/comments/comments.module';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { PhotoDetailssEffects as Effects } from './store/effects';

import { PhotoDetailsService } from './photo-details.service';

@NgModule({
  declarations: [RoutingModule.components],
  exports: [RoutingModule.components],
  imports: [
    RoutingModule,
    SharedModule,
    CommentsModule,
    StoreModule.forFeature(SLICE_NAME, reducer),
    EffectsModule.forFeature([Effects])
  ],
  providers: [PhotoDetailsService]
})
export class PhotoDetailsModule {}
