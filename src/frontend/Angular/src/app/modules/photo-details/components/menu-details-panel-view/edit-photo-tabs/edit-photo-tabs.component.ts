import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditTab, FlipTypes, RotateTypes } from 'src/app/core/enums';
import { ImageFilterDTO, ColorAdjustmentstDTO } from 'src/app/core/models';

@Component({
  selector: 'app-edit-photo-tabs',
  templateUrl: './edit-photo-tabs.component.html',
  styleUrls: ['./edit-photo-tabs.component.less']
})
export class EditPhotoTabsComponent implements OnInit {
  @Input()
  public editTab: EditTab;

  @Input()
  public imageWidth: number;

  @Input()
  public imageHeight: number;

  @Input()
  public filtersThumbnails: ImageFilterDTO[];

  @Input()
  public colorAdjustments: ColorAdjustmentstDTO;

  @Output()
  public selectEditTabEvent = new EventEmitter<EditTab>();

  @Output()
  public cropEvent = new EventEmitter();

  @Output()
  public flipEvent = new EventEmitter<FlipTypes>();

  @Output()
  public rotateEvent = new EventEmitter<RotateTypes>();

  @Output()
  public applyRotationEvent = new EventEmitter();

  @Output()
  public filterSelectedEvent = new EventEmitter<number>();

  @Output()
  public colorAdjustmentsChangedEvent = new EventEmitter<ColorAdjustmentstDTO>();

  constructor() {}

  ngOnInit() {}

  public selectTab(selectedTab: EditTab): void {
    this.selectEditTabEvent.emit(selectedTab);
  }

  public cropImage(): void {
    this.cropEvent.emit();
  }

  public flipImage(flitType: FlipTypes): void {
    this.flipEvent.emit(flitType);
  }

  public rotateImage(rotateType: RotateTypes): void {
    this.rotateEvent.emit(rotateType);
  }

  public applyRotation(): void {
    this.applyRotationEvent.emit();
  }

  public filterSelected(filterIndex: number): void {
    this.filterSelectedEvent.emit(filterIndex);
  }

  public colorAdjustmentsChanged(value: ColorAdjustmentstDTO): void {
    this.colorAdjustmentsChangedEvent.emit(value);
  }
}
