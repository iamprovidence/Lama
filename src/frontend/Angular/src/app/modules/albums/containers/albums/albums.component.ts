import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromAlbums from '../../store/selectors';
import * as Actions from '../../store/actions';

import { AlbumListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  public albums$: Observable<AlbumListDTO[]>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.albums$ = this.store.select(fromAlbums.getAlbums);

    this.store.dispatch(new Actions.LoadAlbums());
  }

  ngOnDestroy() {
    this.store.dispatch(new Actions.ClearAlbums());
  }

  public openCreateAlbumModal(): void {
    this.store.dispatch(new Actions.SetIsCreateAlbumModalOpen(true));
  }

  public renameAlbum(albumToRename: AlbumListDTO): void {
    this.store.dispatch(new Actions.SetCurrentAlbumId(albumToRename.id));
    this.store.dispatch(new Actions.SetIsEditAlbumModalOpen(true));
  }

  public deleteAlbum(albumToDelete: AlbumListDTO): void {
    this.store.dispatch(new Actions.SetCurrentAlbumId(albumToDelete.id));
    this.store.dispatch(new Actions.SetIsDeleteAlbumModalOpen(true));
  }

  public downloadAlbum(albumToDownload: AlbumListDTO): void {
    this.store.dispatch(new Actions.DownloadAlbum(albumToDownload.id));
  }
}
