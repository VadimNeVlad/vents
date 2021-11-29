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
  selector: 'ven-event-detail-info',
  templateUrl: './event-detail-info.component.html',
  styleUrls: ['./event-detail-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailInfoComponent {
  @Input() event!: Event;
  @Input() userData: User | null = null;
  @Input() eventStatus = false;
  @Input() pending = false;

  @Output() setEventStatus = new EventEmitter<{
    currentStatus: boolean;
    id: number;
  }>();

  constructor() {}

  onSetEventStatus(): void {
    const currentStatus = !this.eventStatus;
    this.setEventStatus.emit({ currentStatus, id: this.event.id });
  }
}
