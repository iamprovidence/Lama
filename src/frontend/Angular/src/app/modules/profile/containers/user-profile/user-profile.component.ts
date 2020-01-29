import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from 'src/app/modules/authentication/store/state';
import * as Selectors from 'src/app/modules/authentication/store/selectors';

import { FirebaseUser } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  public user$: Observable<FirebaseUser>;
  public isLoading$: Observable<DataState>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.user$ = this.store.select(Selectors.getUser);
    this.isLoading$ = this.store.select(Selectors.getIsLoading);
  }
}
