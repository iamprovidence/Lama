import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from '../../authentication/store/state';
import * as Actions from '../../authentication/store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  constructor(public store: Store<State>) {}

  ngOnInit() {}

  public openAuthModal(): void {
    this.store.dispatch(new Actions.SetIsSignInModalOpen(true));
  }
}
