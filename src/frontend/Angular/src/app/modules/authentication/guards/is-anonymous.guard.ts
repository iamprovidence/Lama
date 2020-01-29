import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from '../store/state';
import * as Selectors from '../store/selectors';

@Injectable()
export class IsAnonymousGuard implements CanActivate {
  private isAuthorized$: Observable<boolean>;

  constructor(private store: Store<State>, private router: Router) {
    this.isAuthorized$ = this.store.select(Selectors.getIsAuthorized);
  }

  public canActivate(): Observable<boolean> {
    return this.isAuthorized$.pipe(
      map(isAuthorized => {
        if (isAuthorized) this.router.navigate(['/']);

        return !isAuthorized;
      })
    );
  }
}
