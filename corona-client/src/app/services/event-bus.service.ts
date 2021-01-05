import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Events } from '../../events';
import { EmitEvent } from '../../emit-event';
@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private _eventsSubject$ = new Subject<EmitEvent>();

  on(event: Events, action: any): Subscription {
    return this._eventsSubject$
      .pipe(
        filter((emitEvent: EmitEvent) => {
          return emitEvent.name === event;
        }),
        map((emitEvent: EmitEvent) => {
          return emitEvent.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this._eventsSubject$.next(event);
  }
}
