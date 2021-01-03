import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventsSubject$ = new Subject<EmitEvent>();

  on(event: Events, action: any): Subscription {
    return this.eventsSubject$
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((e: EmitEvent) => {
          return e.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.eventsSubject$.next(event);
  }
}

export class EmitEvent {
  constructor(public name: any, public value?: any) {}
}

export enum Events {
  MarkerSelect,
  ToggleAddMode,
  UpdateMap,
}
