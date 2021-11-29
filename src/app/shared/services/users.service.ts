import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/users/${userId}`).pipe(
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error);
        return throwError(e);
      })
    );
  }
}
