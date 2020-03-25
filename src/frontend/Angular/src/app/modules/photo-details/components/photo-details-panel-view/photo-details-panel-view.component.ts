import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { EventBase } from 'src/app/core/eventBus';

import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

import * as Events from '../../events';

import { PhotoViewDTO, ImageCroppedDTO, ImageRotatedDTO } from 'src/app/core/models';
import { FlipTypes, RotateTypes, PhotoMenuState } from 'src/app/core/enums';

@Component({
  selector: 'app-photo-details-panel-view',
  templateUrl: './photo-details-panel-view.component.html',
  styleUrls: ['./photo-details-panel-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailsPanelViewComponent implements OnInit, OnChanges {
  @ViewChild('editor', { static: false, read: ImageCropperComponent })
  public imageEditor: ImageCropperComponent;

  @Input()
  public menuState: PhotoMenuState;

  @Input()
  public photo: PhotoViewDTO;

  @Input()
  public imageFileBase64: string;

  @Input()
  public editEvent: EventBase;

  @Output()
  public cropAreaChangedEvent = new EventEmitter<ImageCroppedDTO>();

  @Output()
  public imageCroppedEvent = new EventEmitter<ImageCroppedDTO>();

  @Output()
  public imageRotatedEvent = new EventEmitter<ImageRotatedDTO>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.editEvent) return;

    const editEvent = changes.editEvent.currentValue;

    if (editEvent instanceof Events.CropImageEvent) this.cropImage();
    if (editEvent instanceof Events.RotateImageEvent) this.rotateImage(editEvent);
    if (editEvent instanceof Events.FlipImageEvent) this.flipImage(editEvent);
    if (editEvent instanceof Events.ApplyRotationEvent) this.applyRotation();
  }

  private async cropImage(): Promise<void> {
    const event = await this.imageEditor.crop();
    this.imageCroppedEvent.emit({ ...event, imageBase64: event.base64 });
  }

  private rotateImage(event: Events.RotateImageEvent): void {
    if (event.rotateType === RotateTypes.Left) this.imageEditor.rotateLeft();
    if (event.rotateType === RotateTypes.Right) this.imageEditor.rotateRight();
  }

  private flipImage(event: Events.FlipImageEvent): void {
    if (event.flipType === FlipTypes.Vertical) this.imageEditor.flipVertical();
    if (event.flipType === FlipTypes.Horizontal) this.imageEditor.flipHorizontal();
  }

  private async applyRotation(): Promise<void> {
    const event = await this.imageEditor.crop();
    this.imageRotatedEvent.emit({ ...event, imageBase64: event.base64 });
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.cropAreaChangedEvent.emit({ ...event, imageBase64: event.base64 });
  }
}
