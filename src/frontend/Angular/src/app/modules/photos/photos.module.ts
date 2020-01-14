import { NgModule } from '@angular/core';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// TODO: remove from here
import { UploadPhotosModule } from '../upload-photos/upload-photos.module';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [RoutingModule, SharedModule, UploadPhotosModule]
})
export class PhotosModule {}
