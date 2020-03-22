import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromAlbumsDetails from '../../store/selectors';
import * as Actions from '../../store/actions';

import { PhotoListDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.less']
})
export class AlbumViewComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<DataState>;
  public photos$: Observable<PhotoListDTO[]>;
  public selected$: Observable<Set<string>>;

  constructor(private store: Store<State>, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromAlbumsDetails.getIsAlbumPhotosLoading);
    this.photos$ = this.store.select(fromAlbumsDetails.getCurrentAlbumPhotos);
    this.selected$ = this.store.select(fromAlbumsDetails.getSelectedPhotos);

    const albumId: number = Number(this.activateRoute.snapshot.params['albumId']);
    this.store.dispatch(new Actions.LoadPhotos());
    this.store.dispatch(new Actions.LoadAlbumPhotos(albumId));
  }

  ngOnDestroy() {
    this.store.dispatch(new Actions.ClearPhotos());
    this.store.dispatch(new Actions.ClearAlbumPhotos());
  }

  public openAddPhotosModal(): void {
    this.store.dispatch(new Actions.SetIsAddPhotosToModalOpen(true));
  }

  public selectPhoto(photoId: string): void {
    this.store.dispatch(new Actions.SelectPhoto(photoId));
  }

  public downloadSelectedPhotos(): void {
    this.store.dispatch(new Actions.DownloadSelectedPhotos());
  }

  public deleteSelected(): void {
    const albumId: number = Number(this.activateRoute.snapshot.params['albumId']);
    this.store.dispatch(new Actions.DeleteSelectedPhotos(albumId));
  }
}
