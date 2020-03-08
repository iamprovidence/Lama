import { Component, OnInit } from '@angular/core';

import { EventBusService, EventBase } from 'src/app/core/eventBus';
import * as Events from '../../events';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromPhoto from '../../store/details/selectors';
import * as fromImageEdit from '../../store/edit/selectors';
import * as ImageAction from '../../store/edit/actions';

import { Observable } from 'rxjs';

import { PhotoViewDTO, ImageCroppedDTO, ImageRotatedDTO } from 'src/app/core/models';
import { PhotoMenuState } from 'src/app/core/enums';

@Component({
  selector: 'app-photo-details-panel',
  templateUrl: './photo-details-panel.component.html',
  styleUrls: ['./photo-details-panel.component.less']
})
export class PhotoDetailsPanelComponent implements OnInit {
  public menuState$: Observable<PhotoMenuState>;
  public photo$: Observable<PhotoViewDTO>;
  public imageBase64$: Observable<string>;

  public editEvent: EventBase;

  constructor(private store: Store<State>, private eventBus: EventBusService) {}

  ngOnInit() {
    this.menuState$ = this.store.select(fromPhoto.getPhotoMenuState);
    this.photo$ = this.store.select(fromPhoto.getPhoto);
    this.imageBase64$ = this.store.select(fromImageEdit.getDisplayedlImageBase64);

    this.eventBus.on<Events.FlipImageEvent>(event => (this.editEvent = event));
    this.eventBus.on<Events.RotateImageEvent>(event => (this.editEvent = event));
    this.eventBus.on<Events.CropImageEvent>(event => (this.editEvent = event));
    this.eventBus.on<Events.ApplyRotationEvent>(event => (this.editEvent = event));
  }

  public imageCropped(event: ImageCroppedDTO): void {
    this.store.dispatch(new ImageAction.SetCroppedImage(event));
  }

  public imageRotated(event: ImageRotatedDTO): void {
    this.store.dispatch(new ImageAction.SetRotatedImage(event));
  }

  public cropAreaChanged(event: ImageCroppedDTO): void {
    this.store.dispatch(new ImageAction.SetCroppedSizes(event));
  }
}
