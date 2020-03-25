import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as Selectors from '../../../store/details/selectors';
import * as Actions from '../../../store/details/actions';

import { Observable } from 'rxjs';

import { PhotoViewDTO, UpdatePhotoDTO } from 'src/app/core/models';

@Component({
  selector: 'app-photo-info',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.less']
})
export class PhotoInfoComponent implements OnInit {
  public photo$: Observable<PhotoViewDTO>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.photo$ = this.store.select(Selectors.getPhoto);
  }

  public updatePhoto(updatedPhoto: UpdatePhotoDTO): void {
    this.store.dispatch(new Actions.UpdatePhoto(updatedPhoto));
  }
}
