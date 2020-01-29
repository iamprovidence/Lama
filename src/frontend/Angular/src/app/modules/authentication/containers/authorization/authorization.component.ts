import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from '../../store/state';
import * as Actions from '../../store/actions';
import * as Selectors from '../../store/selectors';
import { UserCredential } from 'src/app/core/models';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit {
  public isModalOpen$: Observable<boolean>;
  public error$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isModalOpen$ = this.store.select(Selectors.getIsSignInModalOpen);
    this.error$ = this.store.select(Selectors.getError);
  }

  public closeModal(): void {
    this.store.dispatch(new Actions.SetIsSignInModalOpen(false));
  }

  public onSignInWithGoogle(): void {
    this.store.dispatch(new Actions.LoginWithGoogle());
  }
  public onSignInWithFacebook(): void {
    this.store.dispatch(new Actions.LoginWithFacebook());
  }

  public onSignInWithTwitter(): void {
    this.store.dispatch(new Actions.LoginWithTwitter());
  }

  public onSignInManually(userCredential: UserCredential): void {
    this.store.dispatch(new Actions.LoginManually(userCredential));
  }

  public onSignUp(userCredential: UserCredential): void {
    this.store.dispatch(new Actions.SignUp(userCredential));
  }
}
