import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { UploadPhotosModule } from 'src/app/modules/upload-photos/upload-photos.module';

@NgModule({
  declarations: [RoutingModule.components],
  imports: [RoutingModule, UploadPhotosModule]
})
export class MainModule {}
