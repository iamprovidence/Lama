import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from '../../../modules/upload-photos/store/state';
import * as Actions from '../../../modules/upload-photos/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {}

  public setIsModalOpen(isOpen: boolean): void {
    this.store.dispatch(new Actions.SetIsUploadPhotoModalOpen(isOpen));
  }
}
