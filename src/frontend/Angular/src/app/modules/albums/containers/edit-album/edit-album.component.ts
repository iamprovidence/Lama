import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromAlbums from '../../store/selectors';
import * as Actions from '../../store/actions';

import { AlbumListDTO, EditAlbumDTO } from 'src/app/core/models';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.less']
})
export class EditAlbumComponent implements OnInit {
  public isActive$: Observable<boolean>;
  public album$: Observable<AlbumListDTO>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isActive$ = this.store.select(fromAlbums.getIsEditAlbumModalOpen);
    this.album$ = this.store.select(fromAlbums.getCopyOfCurrentAlbum);
  }

  public closeModal(): void {
    this.store.dispatch(new Actions.SetIsEditAlbumModalOpen(false));
    this.store.dispatch(new Actions.SetCurrentAlbumId(null));
  }

  public editAlbum(album: EditAlbumDTO): void {
    this.store.dispatch(new Actions.EditAlbum(album));
  }
}
