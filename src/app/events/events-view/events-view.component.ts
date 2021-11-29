import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscribeContainer } from 'src/app/core/utils/subscribe-container';
import { Event } from 'src/app/shared/models/event';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventsService } from 'src/app/shared/services/events.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'ven-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss'],
})
export class EventsViewComponent implements OnInit, OnDestroy {
  events$ = new Observable<Event[]>();
  authData$ = new Observable<User | null>();
  modalOpenType$ = new Observable<string>();
  pending$ = new Observable<boolean>();

  event!: Event;
  subs = new SubscribeContainer();

  constructor(
    private eventsService: EventsService,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.authData$ = this.authService.authData$;
    this.modalOpenType$ = this.modalService.modalType$;
    this.pending$ = this.eventsService.pending$;

    this.getEvents();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  getEvents(): void {
    this.events$ = this.eventsService.getEvents();
  }

  getEventInfo(event: Event): void {
    this.event = event;
  }

  deleteEvent(): void {
    this.subs.add = this.eventsService
      .deleteEvent(this.event.id.toString())
      .subscribe(() => this.getEvents());
  }

  openModal(modalType: string): void {
    this.modalService.openModal(modalType);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
