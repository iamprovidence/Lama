import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromPhoto from '../../store/details/selectors';
import * as PhotoActions from '../../store/details/actions';
import * as ImageEditActions from '../../store/edit/actions';

import { Observable } from 'rxjs';

import { PhotoMenuState, PhotoMenuItems } from 'src/app/core/enums';

@Component({
  selector: 'app-photo-top-bar-menu',
  templateUrl: './photo-top-bar-menu.component.html',
  styleUrls: ['./photo-top-bar-menu.component.less']
})
export class PhotoTopBarMenuComponent implements OnInit {
  public photoMenuState$: Observable<PhotoMenuState>;
  public photoMenuItem$: Observable<PhotoMenuItems>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.photoMenuState$ = this.store.select(fromPhoto.getPhotoMenuState);
    this.photoMenuItem$ = this.store.select(fromPhoto.getCurrentMenuItem);
  }

  public menuClicked(clickedMenuItem: PhotoMenuItems): void {
    this.store.dispatch(new PhotoActions.SelectMenuItem(clickedMenuItem));
  }

  public restoreOriginal(): void {
    this.store.dispatch(new ImageEditActions.RestoreOriginal());
  }

  public resetChanges(): void {
    this.store.dispatch(new ImageEditActions.ResetEditingChanges());
  }

  public cancelChanges(): void {
    this.store.dispatch(new ImageEditActions.CancelChanges());
  }

  public saveChanges(): void {
    this.store.dispatch(new ImageEditActions.SaveChanges());
  }
}
