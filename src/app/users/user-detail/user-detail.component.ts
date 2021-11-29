import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { SubscribeContainer } from 'src/app/core/utils/subscribe-container';
import { Event } from 'src/app/shared/models/event';
import { User } from 'src/app/shared/models/user';
import { EventsService } from 'src/app/shared/services/events.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'ven-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user$ = new Observable<User>();
  userEvents$ = new Observable<Event[]>();

  subs = new SubscribeContainer();

  constructor(
    private usersService: UsersService,
    private eventsService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.add = this.route.params.subscribe(({ id }) => {
      this.getUser(id);
      this.getUserEvents(id);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  getUser(id: string): void {
    this.user$ = this.usersService.getUser(id);
  }

  getUserEvents(id: string): void {
    this.userEvents$ = this.eventsService.getUserEvents(id);
  }
}
