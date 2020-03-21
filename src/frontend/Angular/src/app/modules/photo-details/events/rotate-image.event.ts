import { RotateTypes } from 'src/app/core/enums';
import { EventBase } from 'src/app/core/eventBus';

export class RotateImageEvent implements EventBase {
  constructor(public rotateType: RotateTypes) {}
}
