import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharingModule } from 'src/app/modules/sharing/sharing.module';
import { CommentsModule } from 'src/app/modules/comments/comments.module';

import { SLICE_NAME } from './store';

import { reducer as DetailsReduces } from './store/details/reducer';
import { SLICE_NAME as DETAILS_SLICE_NAME } from './store/details/state';
import { PhotoDetailsEffects } from './store/details/effects';
import { PhotoDetailsService } from './photo-details.service';

import { SLICE_NAME as EDIT_SLICE_NAME } from './store/edit/state';
import { reducer as EditReduces } from './store/edit/reducer';
import { PhotoEditEffects } from './store/edit/effects';
import { ImageEditService } from './image-edit.service';

@NgModule({
  declarations: [RoutingModule.components],
  exports: [RoutingModule.components],
  imports: [
    RoutingModule,
    SharedModule,
    SharingModule,
    CommentsModule,
    ImageCropperModule,
    StoreModule.forFeature(SLICE_NAME, {
      [DETAILS_SLICE_NAME]: DetailsReduces,
      [EDIT_SLICE_NAME]: EditReduces
    }),
    EffectsModule.forFeature([PhotoDetailsEffects, PhotoEditEffects])
  ],
  providers: [PhotoDetailsService, ImageEditService]
})
export class PhotoDetailsModule {}
