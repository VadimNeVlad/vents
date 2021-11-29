import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { EventForm } from '../models/event-form';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private _baseUrl = environment.apiUrl;
  private _pending = new BehaviorSubject<boolean>(false);
  private _eventStatus = new BehaviorSubject<boolean>(false);

  pending$: Observable<boolean> = this._pending.asObservable();
  eventStatus$: Observable<boolean> = this._eventStatus.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private modalService: ModalService
  ) {}

  getEvents(): Observable<Event[]> {
    return this.http
      .get<Event[]>(`${this._baseUrl}/events`)
      .pipe(catchError((e: HttpErrorResponse) => this.errorHandler(e)));
  }

  getUserEvents(userId: string): Observable<Event[]> {
    return this.http
      .get<Event[]>(`${this._baseUrl}/events?uid=${userId}`)
      .pipe(catchError((e: HttpErrorResponse) => this.errorHandler(e)));
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this._baseUrl}/events/${eventId}`).pipe(
      map((event) => {
        this._eventStatus.next(event.cancelEvent);
        return event;
      }),
      catchError((e: HttpErrorResponse) => this.errorHandler(e))
    );
  }

  addEvent(event: EventForm): Observable<Event> {
    this._pending.next(true);

    return this.http.post<Event>(`${this._baseUrl}/events`, event).pipe(
      map((event) => {
        this.toastr.success('Event published');
        this.router.navigateByUrl('/events');
        this._pending.next(false);

        return event;
      }),
      catchError((e: HttpErrorResponse) => this.errorHandler(e))
    );
  }

  deleteEvent(eventId: string): Observable<void> {
    this._pending.next(true);

    return this.http.delete<void>(`${this._baseUrl}/events/${eventId}`).pipe(
      map(() => {
        this.toastr.success('Event Deleted');
        this.modalService.closeModal();
        this._pending.next(false);
      }),
      catchError((e: HttpErrorResponse) => this.errorHandler(e))
    );
  }

  setEventStatus(eventId: string, status: boolean): Observable<Event> {
    this._pending.next(true);

    return this.http
      .patch<Event>(`${this._baseUrl}/events/${eventId}`, {
        cancelEvent: status,
      })
      .pipe(
        map((event) => {
          this._pending.next(false);
          this._eventStatus.next(event.cancelEvent);
          return event;
        }),
        catchError((e: HttpErrorResponse) => this.errorHandler(e))
      );
  }

  private errorHandler(e: HttpErrorResponse): Observable<never> {
    this.toastr.error(e.error);
    this._pending.next(false);
    return throwError(e);
  }
}
