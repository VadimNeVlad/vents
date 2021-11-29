import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Event } from 'src/app/shared/models/event';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'ven-user-detail-info',
  templateUrl: './user-detail-info.component.html',
  styleUrls: ['./user-detail-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailInfoComponent {
  @Input() userData!: User;
  @Input() userEvents: Event[] = [];

  constructor() {}

  trackById(idx: number, event: Event): number {
    return event.id;
  }
}
