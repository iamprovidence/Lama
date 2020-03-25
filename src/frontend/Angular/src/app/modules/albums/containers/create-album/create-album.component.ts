import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromAlbums from '../../store/selectors';
import * as Actions from '../../store/actions';

import { CreateAlbumDTO } from 'src/app/core/models';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.less']
})
export class CreateAlbumComponent implements OnInit {
  public iaActive$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.iaActive$ = this.store.select(fromAlbums.getIsCreateAlbumModalOpen);
  }

  public closeCreateAlbumModal(): void {
    this.store.dispatch(new Actions.SetIsCreateAlbumModalOpen(false));
  }

  public createAlbum(albumToCreate: CreateAlbumDTO): void {
    this.store.dispatch(new Actions.CreateAlbum(albumToCreate));
  }
}
