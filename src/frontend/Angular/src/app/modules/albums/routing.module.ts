import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsComponent } from './containers/albums/albums.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';
import { AddAlbumButtonComponent } from './components/add-album-button/add-album-button.component';

import { CreateAlbumComponent } from './containers/create-album/create-album.component';
import { CreateAlbumViewComponent } from './components/create-album-view/create-album-view.component';

import { EditAlbumComponent } from './containers/edit-album/edit-album.component';
import { RenameAlbumModalComponent } from './components/rename-album-modal/rename-album-modal.component';

import { DeleteAlbumComponent } from './containers/delete-album/delete-album.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

const albumsComponents = [AlbumsComponent, AlbumsListComponent, AlbumItemComponent, AddAlbumButtonComponent];
const createAlbumComponets = [CreateAlbumComponent, CreateAlbumViewComponent];
const editAlbumComponets = [EditAlbumComponent, RenameAlbumModalComponent];
const deleteAlbumComponets = [DeleteAlbumComponent, DeleteModalComponent];

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent
  },
  {
    path: 'id/:albumId',
    loadChildren: 'src/app/modules/album-details/album-details.module#AlbumDetailsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [...albumsComponents, ...createAlbumComponets, ...editAlbumComponets, ...deleteAlbumComponets];
}
