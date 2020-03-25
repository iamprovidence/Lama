import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { PhotosType } from '@core/enums';
import { PhotosData } from '@core/routes-data';

const childRoutes: Routes = [
  {
    path: '',
    redirectTo: 'photos'
  },
  {
    path: 'photos',
    loadChildren: 'src/app/modules/photos/photos.module#PhotosModule',
    data: {
      photosType: PhotosType.All
    } as PhotosData
  },
  {
    path: 'albums',
    loadChildren: 'src/app/modules/albums/albums.module#AlbumsModule'
  },
  {
    path: 'sharing',
    loadChildren: 'src/app/modules/sharing/sharing.module#SharingModule'
  },
  {
    path: 'bin',
    loadChildren: 'src/app/modules/deleted-photos/deleted-photos.module#DeletedPhotosModule'
  },
  {
    path: 'profile',
    loadChildren: 'src/app/modules/profile/profile.module#ProfileModule'
  },
  {
    path: 'search',
    loadChildren: 'src/app/modules/photos-search/photos-search.module#PhotosSearchModule'
  },
  {
    path: 'notifications',
    loadChildren: 'src/app/modules/notifications/notifications.module#NotificationsModule'
  }
];

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: childRoutes
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [ContentComponent, MenuComponent, HeaderComponent, NotFoundComponent];
}
