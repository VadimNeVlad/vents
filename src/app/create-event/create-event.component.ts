import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SubscribeContainer } from '../core/utils/subscribe-container';
import { EventForm } from '../shared/models/event-form';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { EventsService } from '../shared/services/events.service';

@Component({
  selector: 'ven-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit, OnDestroy {
  authData$ = new Observable<User | null>();
  pending$ = new Observable<boolean>();
  subs = new SubscribeContainer();

  constructor(
    private authService: AuthService,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.authData$ = this.authService.authData$;
    this.pending$ = this.eventsService.pending$;
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe;
    }
  }

  onSubmit(event: EventForm): void {
    this.subs.add = this.eventsService.addEvent(event).subscribe();
  }
}
