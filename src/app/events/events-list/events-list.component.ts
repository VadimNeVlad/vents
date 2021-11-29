import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Event } from 'src/app/shared/models/event';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'ven-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
  @Input() events: Event[] = [];
  @Input() userData: User | null = null;

  @Output() eventInfo = new EventEmitter<Event>();
  @Output() modalType = new EventEmitter<string>();

  constructor() {}

  trackById(idx: number, event: Event): number {
    return event.id;
  }

  onModalHandle(event: Event, modalType: string): void {
    this.eventInfo.emit(event);
    this.modalType.emit(modalType + event.id);
  }
}
