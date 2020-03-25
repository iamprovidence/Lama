import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosData } from '@core/routes-data';
import { PhotosType } from '@core/enums';

import { SharePhotoComponent } from './containers/share-photo/share-photo.component';
import { SharePhotoPanelViewComponent } from './components/share-photo-panel-view/share-photo-panel-view.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/modules/photos/photos.module#PhotosModule',
    data: {
      photosType: PhotosType.Shared
    } as PhotosData
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [SharePhotoComponent, SharePhotoPanelViewComponent];
}
