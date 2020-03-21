import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { EventBase } from './eventBase';
import { filter } from 'rxjs/operators';

@Injectable()
export class EventBusService {
  private events = new Subject<EventBase>();

  public emit(event: EventBase): void {
    this.events.next(event);
  }

  public on<TEvent extends EventBase>(action: (event?: TEvent) => void): Subscription {
    return this.events.pipe(filter((e: EventBase) => this.isCorrectEvent<TEvent>(e))).subscribe(action);
  }

  private isCorrectEvent<TEvent extends EventBase>(event: EventBase): event is TEvent {
    return (event as TEvent) !== undefined;
  }
}
