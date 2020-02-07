import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/state';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';

import { Observable } from 'rxjs';

import { PhotoListDTO } from 'src/app/core/models';
import { PhotoViewType, DataState } from 'src/app/core/enums';

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

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.photos$ = this.store.select(Selectors.getPhotos);
    this.viewType$ = this.store.select(Selectors.getViewType);
    this.isLoading$ = this.store.select(Selectors.getIsLoading);
    this.selected$ = this.store.select(Selectors.getSelectedPhotos);

    this.store.dispatch(new Actions.LoadPhotos());
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
