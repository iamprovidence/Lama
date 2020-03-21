import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { UploadPhotosModule } from '@modules/upload-photos/upload-photos.module';
import { PhotosSearchModule } from '@modules/photos-search/photos-search.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [RoutingModule, UploadPhotosModule, PhotosSearchModule, NotificationsModule]
})
export class MainModule {}
