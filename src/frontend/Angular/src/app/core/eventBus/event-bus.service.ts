import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EventBase } from './eventBase';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class EventBusService {
  private events = new Subject<EventBase>();

  public emit(event: EventBase): void {
    this.events.next(event);
  }

  public on<TEvent extends EventBase>(action: (event?: TEvent) => void): Subscription {
    return this.events.pipe(filter((e: EventBase) => this.isCorrentEvent<TEvent>(e))).subscribe(action);
  }

  private isCorrentEvent<TEvent extends EventBase>(event: EventBase): event is TEvent {
    return (event as TEvent) !== undefined;
  }
}
