import { Component, OnInit } from '@angular/core';
import { EventBusService } from 'src/app/core/eventBus';

import * as Events from '../../../events';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import * as fromPhotoEdit from '../../../store/edit/selectors';
import * as PhotoEditActions from '../../../store/edit/actions';

import { Observable } from 'rxjs';

import { EditTab, FlipTypes, RotateTypes } from 'src/app/core/enums';
import { ImageFilterDTO, ColorAdjustmentstDTO } from 'src/app/core/models';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.less']
})
export class EditPanelComponent implements OnInit {
  public editTab$: Observable<EditTab>;
  public imageWidth$: Observable<number>;
  public imageHeight$: Observable<number>;
  public filtersThumbnails$: Observable<ImageFilterDTO[]>;
  public colorAdjustments$: Observable<ColorAdjustmentstDTO>;

  constructor(private store: Store<State>, private eventBus: EventBusService) {}

  ngOnInit() {
    this.editTab$ = this.store.select(fromPhotoEdit.getCurrentEditPhotoTab);
    this.imageWidth$ = this.store.select(fromPhotoEdit.getImageWidth);
    this.imageHeight$ = this.store.select(fromPhotoEdit.getImageHeight);
    this.filtersThumbnails$ = this.store.select(fromPhotoEdit.getFiltersThumbnails);
    this.colorAdjustments$ = this.store.select(fromPhotoEdit.getColorAdjustments);

    this.store.dispatch(new PhotoEditActions.LoadFiltersThumbnails());
  }

  public selectEditTab(selectedTab: EditTab): void {
    this.store.dispatch(new PhotoEditActions.SelectEditPhotoTab(selectedTab));
  }

  public cropImage(): void {
    this.eventBus.emit(new Events.CropImageEvent());
  }

  public flipImage(flipType: FlipTypes): void {
    this.eventBus.emit(new Events.FlipImageEvent(flipType));
  }

  public rotateImage(rotateType: RotateTypes): void {
    this.eventBus.emit(new Events.RotateImageEvent(rotateType));
  }

  public applyRotation(): void {
    this.eventBus.emit(new Events.ApplyRotationEvent());
  }
  public filterSelected(filterIndex: number): void {
    this.store.dispatch(new PhotoEditActions.ApplyFilter(filterIndex));
  }

  public colorAdjustmentsChanged(value: ColorAdjustmentstDTO): void {
    this.store.dispatch(new PhotoEditActions.SetColorAdjustments(value));
  }
}
