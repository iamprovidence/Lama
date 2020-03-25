import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Actions from '../../store/details/actions';
import * as Selectors from '../../store/details/selectors';

import { Observable } from 'rxjs';

import { DataState } from 'src/app/core/enums';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.less']
})
export class PhotoDetailsComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<DataState>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(Selectors.getIsLoading);

    const photoId: string = this.activateRoute.snapshot.params['photoId'];
    this.store.dispatch(new Actions.LoadPhoto(photoId));
  }
  ngOnDestroy(): void {
    this.store.dispatch(new Actions.ClearPhoto());
  }

  public closePhotoDetails(): void {
    this.location.back();
    // TODO: fix this
    // this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }
}
