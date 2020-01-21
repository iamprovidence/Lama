import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';

import { UploadPhotosComponent } from './containers/upload-photos/upload-photos.component';
import { UploadPhotosModalComponent } from './components/upload-photos-modal/upload-photos-modal.component';
import { UploadedPhotoItemComponent } from './components/uploaded-photo-item/uploaded-photo-item.component';

import { SLICE_NAME } from './store/state';
import { reducer } from './store/reducer';
import { UploadPhotosEffects } from './store/effects';

import { DragAndDropPanelDirective } from './directives';
import { UploadPhotosService } from './upload-photos.service';

@NgModule({
  declarations: [
    UploadPhotosComponent,
    UploadPhotosModalComponent,
    UploadedPhotoItemComponent,
    DragAndDropPanelDirective
  ],
  imports: [SharedModule, StoreModule.forFeature(SLICE_NAME, reducer), EffectsModule.forFeature([UploadPhotosEffects])],
  providers: [UploadPhotosService],
  exports: [UploadPhotosComponent]
})
export class UploadPhotosModule {}
