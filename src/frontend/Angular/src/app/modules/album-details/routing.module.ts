import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumViewComponent } from './containers/album-view/album-view.component';
import { AlbumButtonsComponent } from './components/album-buttons/album-buttons.component';

import { AddPhotosToAlbumComponent } from './containers/add-photos-to-album/add-photos-to-album.component';
import { AddPhotosModalComponent } from './components/add-photos-modal/add-photos-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumViewComponent,
    children: [
      {
        path: 'id/:photoId',
        loadChildren: 'src/app/modules/photo-details/photo-details.module#PhotoDetailsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [AlbumViewComponent, AlbumButtonsComponent, AddPhotosToAlbumComponent, AddPhotosModalComponent];
}
