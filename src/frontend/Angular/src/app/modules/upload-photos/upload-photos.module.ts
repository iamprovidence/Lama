import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadPhotosComponent } from './containers/upload-photos/upload-photos.component';
import { UploadPhotosModalComponent } from './components/upload-photos-modal/upload-photos-modal.component';
import { UploadedPhotoItemComponent } from './components/uploaded-photo-item/uploaded-photo-item.component';

@NgModule({
  declarations: [UploadPhotosComponent, UploadPhotosModalComponent, UploadedPhotoItemComponent],
  imports: [SharedModule],
  exports: [UploadPhotosComponent, UploadPhotosModalComponent]
})
export class UploadPhotosModule {}
