import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

const childRoutes: Routes = [
  {
    path: '',
    redirectTo: 'photos'
  },
  {
    path: 'photos',
    loadChildren: 'src/app/modules/photos/photos.module#PhotosModule'
  },
  {
    path: 'albums',
    loadChildren: 'src/app/modules/albums/albums.module#AlbumsModule'
  },
  {
    path: 'bin',
    loadChildren: 'src/app/modules/deleted-photos/deleted-photos.module#DeletedPhotosModule'
  },
  {
    path: 'profile',
    loadChildren: 'src/app/modules/profile/profile.module#ProfileModule'
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
