import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromAlbumsDetails from '../../store/selectors';
import * as Actions from '../../store/actions';

import { PhotoListDTO, PhotoAlbumDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

@Component({
  selector: 'app-add-photos-to-album',
  templateUrl: './add-photos-to-album.component.html',
  styleUrls: ['./add-photos-to-album.component.less']
})
export class AddPhotosToAlbumComponent implements OnInit {
  public isActive$: Observable<boolean>;
  public isLoading$: Observable<DataState>;
  public photos$: Observable<PhotoListDTO[]>;
  public selected$: Observable<Set<string>>;

  constructor(private store: Store<State>, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isActive$ = this.store.select(fromAlbumsDetails.getIsAddPhotoToAlbumModalActive);
    this.isLoading$ = this.store.select(fromAlbumsDetails.getIsPhotosLoading);
    this.photos$ = this.store.select(fromAlbumsDetails.getPhotos);
    this.selected$ = this.store.select(fromAlbumsDetails.getSelectedUpdateAlbumPhotos);
  }

  public selectPhoto(photo: PhotoListDTO): void {
    this.store.dispatch(new Actions.SelectAlbumPhoto(photo.id));
  }

  public updateAlbum(): void {
    const albumId: number = Number(this.activateRoute.snapshot.params['albumId']);
    this.store.dispatch(new Actions.UpdateAlbumPhotos(albumId));
  }

  public closeModal(): void {
    this.store.dispatch(new Actions.SetIsAddPhotosToModalOpen(false));
  }
}
