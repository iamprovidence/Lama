import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './containers/photos/photos.component';
import { PhotosCardsComponent } from './components/photos-cards/photos-cards.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotosButtonsComponent } from './components/photos-buttons/photos-buttons.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosComponent,
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
  static components = [PhotosComponent, PhotosCardsComponent, PhotosListComponent, PhotosButtonsComponent];
}
