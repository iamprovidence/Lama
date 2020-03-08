import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FlipTypes, RotateTypes } from 'src/app/core/enums';

@Component({
  selector: 'app-rotate-tab',
  templateUrl: './rotate-tab.component.html',
  styleUrls: ['./rotate-tab.component.less']
})
export class RotateTabComponent implements OnInit {
  @Output()
  public flipEvent = new EventEmitter<FlipTypes>();

  @Output()
  public rotateEvent = new EventEmitter<RotateTypes>();

  @Output()
  public applyRotationEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public flipImage(flipType: FlipTypes): void {
    this.flipEvent.emit(flipType);
  }

  public rotateImage(rotateType: RotateTypes): void {
    this.rotateEvent.emit(rotateType);
  }

  public applyRotation(): void {
    this.applyRotationEvent.emit();
  }
}
