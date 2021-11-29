import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { CommentForm } from '../models/comment-form';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _baseUrl = environment.apiUrl;
  private _comments = new BehaviorSubject<Comment[]>([]);

  comments$: Observable<Comment[]> = this._comments.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getComments(eventId: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this._baseUrl}/events/${eventId}/comments`)
      .pipe(
        map((comment) => {
          this._comments.next(comment);
          return comment;
        }),
        catchError((e: HttpErrorResponse) => this.errorHandler(e))
      );
  }

  addComment(comment: CommentForm): Observable<Comment> {
    return this.http.post<Comment>(`${this._baseUrl}/comments`, comment).pipe(
      map((comment) => {
        this.toastr.success('Comment published');
        this._comments.next([...this._comments.getValue(), comment]);
        return comment;
      }),
      catchError((e: HttpErrorResponse) => this.errorHandler(e))
    );
  }

  private errorHandler(e: HttpErrorResponse): Observable<never> {
    this.toastr.error(e.error);
    return throwError(e);
  }
}
