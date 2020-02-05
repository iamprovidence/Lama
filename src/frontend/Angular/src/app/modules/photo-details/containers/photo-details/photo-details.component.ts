import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';

import { Observable } from 'rxjs';

import { DataState } from 'src/app/core/enums';
import { PhotoViewDTO } from 'src/app/core/models';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.less']
})
export class PhotoDetailsComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<DataState>;
  public photo$: Observable<PhotoViewDTO>;

  constructor(private store: Store<State>, private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(Selectors.getIsLoading);
    this.photo$ = this.store.select(Selectors.getPhoto);

    const photoId: string = this.activateRoute.snapshot.params['photoId'];
    this.store.dispatch(new Actions.LoadPhoto(photoId));
  }
  ngOnDestroy(): void {
    this.store.dispatch(new Actions.ClearPhoto());
  }

  public closePhotoDetails(): void {
    this.router.navigate(['photos']);
  }
}
