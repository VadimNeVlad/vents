import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth';
import { ChangePassword } from '../models/change-password';
import { SignIn } from '../models/sign-in';
import { SignUp } from '../models/sign-up';
import { User } from '../models/user';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.apiUrl;
  private _pending = new BehaviorSubject<boolean>(false);
  private _isAuth = new BehaviorSubject<boolean>(false);
  private _authData = new BehaviorSubject<User | null>(null);

  pending$: Observable<boolean> = this._pending.asObservable();
  isAuth$: Observable<boolean> = this._isAuth.asObservable();
  authData$: Observable<User | null> = this._authData.asObservable();

  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  signup(data: SignUp): Observable<AuthResponse> {
    this._pending.next(true);

    return this.http.post<AuthResponse>(`${this._baseUrl}/signup`, data).pipe(
      map((authData) => {
        this.modalService.openModal('signin');
        this.toastr.success('Registration completed successfully');
        this._pending.next(false);

        return authData;
      }),
      catchError((e: HttpErrorResponse) => {
        this.toastr.error(e.error);
        this._pending.next(false);
        return throwError(e);
      })
    );
  }

  signin(data: SignIn): Observable<AuthResponse> {
    this._pending.next(true);

    return this.http.post<AuthResponse>(`${this._baseUrl}/signin`, data).pipe(
      map((authData) => {
        localStorage.setItem('vents', authData.accessToken);
        localStorage.setItem('vents-user', JSON.stringify(authData.user));

        this.modalService.closeModal();
        this._pending.next(false);
        this.isAuthStatus(true, authData.user);

        return authData;
      }),
      catchError((e: HttpErrorResponse) => {
        this.toastr.error('Incorrect email or password');
        this._pending.next(false);
        this.isAuthStatus(false, null);

        return throwError(e);
      })
    );
  }

  changePassword(data: ChangePassword): Observable<User> {
    this._pending.next(true);

    return this.http
      .patch<User>(`${this._baseUrl}/users/${data.uid}`, data)
      .pipe(
        map((user) => {
          this.logout();
          this.toastr.success('Password successfully changed');
          this._pending.next(false);
          return user;
        }),
        catchError((e: HttpErrorResponse) => {
          this.toastr.error(e.error);
          this._pending.next(false);
          this.isAuthStatus(false, null);

          return throwError(e);
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.isAuthStatus(false, null);
    this.router.navigateByUrl('/');
  }

  isAuthStatus(status: boolean, authData: User | null): void {
    this._isAuth.next(status);

    if (this._isAuth.getValue() === true) {
      this._authData.next(authData);
    } else {
      this._authData.next(null);
    }
  }
}
