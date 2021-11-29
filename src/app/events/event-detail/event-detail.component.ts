import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { SubscribeContainer } from 'src/app/core/utils/subscribe-container';
import { Comment } from 'src/app/shared/models/comment';
import { CommentForm } from 'src/app/shared/models/comment-form';
import { Event } from 'src/app/shared/models/event';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'ven-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event$ = new Observable<Event>();
  comments$ = new Observable<Comment[]>();
  eventStatus$ = new Observable<boolean>();
  pending$ = new Observable<boolean>();
  authData$ = new Observable<User | null>();

  eventId = '';
  subs = new SubscribeContainer();

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private authService: AuthService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.eventStatus$ = this.eventsService.eventStatus$;
    this.comments$ = this.commentsService.comments$;
    this.pending$ = this.eventsService.pending$;
    this.authData$ = this.authService.authData$;
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    this.getEvent();
    this.getComments();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  getEvent(): void {
    this.event$ = this.eventsService.getEvent(this.eventId);
  }

  getComments(): void {
    this.subs.add = this.commentsService.getComments(this.eventId).subscribe();
  }

  setEventStatus(eventData: { currentStatus: boolean; id: number }): void {
    this.subs.add = this.eventsService
      .setEventStatus(eventData.id.toString(), eventData.currentStatus)
      .subscribe();
  }

  addComment(comment: CommentForm): void {
    this.subs.add = this.commentsService.addComment(comment).subscribe();
  }
}
