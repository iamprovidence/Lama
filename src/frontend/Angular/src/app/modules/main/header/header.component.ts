import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as UploadPhotoActions from 'src/app/modules/upload-photos/store/actions';
import * as AuthActions from 'src/app/modules/authentication/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {}

  public setIsModalOpen(isOpen: boolean): void {
    this.store.dispatch(new UploadPhotoActions.SetIsUploadPhotoModalOpen(isOpen));
  }

  public logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
