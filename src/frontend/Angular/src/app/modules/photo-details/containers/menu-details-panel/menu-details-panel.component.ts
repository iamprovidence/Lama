import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Selectors from '../../store/details/selectors';

import { Observable } from 'rxjs';

import { PhotoViewDTO } from 'src/app/core/models';
import { PhotoMenuItems } from 'src/app/core/enums';

@Component({
  selector: 'app-menu-details-panel',
  templateUrl: './menu-details-panel.component.html',
  styleUrls: ['./menu-details-panel.component.less']
})
export class MenuDetailsPanelComponent implements OnInit {
  public photo$: Observable<PhotoViewDTO>;
  public photoMenuItem$: Observable<PhotoMenuItems>;

  constructor(private store: Store<State>, private location: Location) {}

  ngOnInit() {
    this.photo$ = this.store.select(Selectors.getPhoto);
    this.photoMenuItem$ = this.store.select(Selectors.getCurrentMenuItem);
  }

  // TODO: merge this with one in photo details
  public closePhotoDetails(): void {
    this.location.back();
    // TODO: fix this
    // this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }
}
