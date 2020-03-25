import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromAlbums from '../../store/selectors';
import * as Actions from '../../store/actions';

import { AlbumListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.less']
})
export class DeleteAlbumComponent implements OnInit {
  public isActive$: Observable<boolean>;
  public album$: Observable<AlbumListDTO>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isActive$ = this.store.select(fromAlbums.getIsDeleteAlbumModalOpen);
    this.album$ = this.store.select(fromAlbums.getCurrentAlbum);
  }

  public closeModal(): void {
    this.store.dispatch(new Actions.SetIsDeleteAlbumModalOpen(false));
    this.store.dispatch(new Actions.SetCurrentAlbumId(null));
  }

  public deleteAlbum(album: AlbumListDTO): void {
    this.store.dispatch(new Actions.DeleteAlbum(album.id));
  }
}
