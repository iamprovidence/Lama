import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Selectors from '../../store/selectors';
import * as Actions from '../../store/actions';

import { DataState } from 'src/app/core/enums';
import { DeletedPhotosListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-deleted-photos',
  templateUrl: './deleted-photos.component.html',
  styleUrls: ['./deleted-photos.component.less']
})
export class DeletedPhotosComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<DataState>;
  public deletedPhotos$: Observable<DeletedPhotosListDTO[]>;
  public selectedPhotosIds$: Observable<Set<string>>;
  public selectedPhotosAmount$: Observable<number>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(Selectors.getIsLoading);
    this.deletedPhotos$ = this.store.select(Selectors.getDeletedPhotos);
    this.selectedPhotosIds$ = this.store.select(Selectors.getSelectedPhotosIds);
    this.selectedPhotosAmount$ = this.store.select(Selectors.getSelectedPhotosAmount);

    this.store.dispatch(new Actions.LoadPhotos());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new Actions.ClearPhotos());
  }

  public selectPhoto(photoId: string): void {
    this.store.dispatch(new Actions.SelectPhoto(photoId));
  }

  public restoreSelectedPhotos(): void {
    this.store.dispatch(new Actions.RestoreSelectedPhotos());
  }

  public deleteSelectedPhotos(): void {
    this.store.dispatch(new Actions.DeleteSelectedPhotos());
  }
}
