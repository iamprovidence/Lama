import { FlipTypes } from 'src/app/core/enums';
import { EventBase } from 'src/app/core/eventBus';

export class FlipImageEvent implements EventBase {
  constructor(public flipType: FlipTypes) {}
}
