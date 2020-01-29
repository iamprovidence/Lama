import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State as UploadPhotoState } from 'src/app/modules/upload-photos/store/state';
import * as UploadPhotoActions from 'src/app/modules/upload-photos/store/actions';
import { State as AuthState } from 'src/app/modules/authentication/store/state';
import * as AuthActions from 'src/app/modules/authentication/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(private authStore: Store<AuthState>, private uploadPhotoStore: Store<UploadPhotoState>) {}

  ngOnInit() {}

  public setIsModalOpen(isOpen: boolean): void {
    this.uploadPhotoStore.dispatch(new UploadPhotoActions.SetIsUploadPhotoModalOpen(isOpen));
  }

  public logout(): void {
    this.authStore.dispatch(new AuthActions.Logout());
  }
}
