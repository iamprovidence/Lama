import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { UploadPhotosModule } from 'src/app/modules/upload-photos/upload-photos.module';
import { PhotosSearchModule } from 'src/app/modules/photos-search/photos-search.module';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [RoutingModule, UploadPhotosModule, PhotosSearchModule]
})
export class MainModule {}
