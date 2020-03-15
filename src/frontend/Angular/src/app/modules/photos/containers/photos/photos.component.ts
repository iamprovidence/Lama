import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { State } from '../../store/state';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';

import { Observable } from 'rxjs';

import { PhotosData } from '@core/routes-data';
import { PhotoListDTO } from '@core/models';
import { PhotoViewType, DataState, PhotosType } from '@core/enums';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.less']
})
export class PhotosComponent implements OnInit, OnDestroy {
  public photos$: Observable<PhotoListDTO[]>;
  public viewType$: Observable<PhotoViewType>;
  public isLoading$: Observable<DataState>;
  public selected$: Observable<Set<string>>;

  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.photos$ = this.store.select(Selectors.getPhotos);
    this.viewType$ = this.store.select(Selectors.getViewType);
    this.isLoading$ = this.store.select(Selectors.getIsLoading);
    this.selected$ = this.store.select(Selectors.getSelectedPhotos);

    this.LoadPhotos(this.route.snapshot.data as PhotosData);
  }

  private LoadPhotos(photosRouteData: PhotosData): void {
    const { photosType } = photosRouteData;

    switch (photosType) {
      case PhotosType.All:
        this.store.dispatch(new Actions.LoadPhotos());
        break;
      case PhotosType.Shared:
        this.store.dispatch(new Actions.LoadSharedPhotos());
        break;
      case PhotosType.Search /* Loads on effect */:
        break;
      default:
        throw new Error('Invalid enum type');
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new Actions.ClearPhotos());
  }

  public changeView(viewType: PhotoViewType): void {
    this.store.dispatch(new Actions.SetViewType(viewType));
  }

  public selectPhoto(photoId: string): void {
    this.store.dispatch(new Actions.SelectPhoto(photoId));
  }

  public deleteSelectedPhotos(): void {
    this.store.dispatch(new Actions.DeleteSelectedPhotos());
  }
}
