import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SubscribeContainer } from '../core/utils/subscribe-container';
import { SignIn } from '../shared/models/sign-in';
import { SignUp } from '../shared/models/sign-up';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { ModalService } from '../shared/services/modal.service';

@Component({
  selector: 'ven-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isAuth$ = new Observable<boolean>();
  authData$ = new Observable<User | null>();
  modalOpenType$ = new Observable<string>();
  pending$ = new Observable<boolean>();
  subs = new SubscribeContainer();

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.authData$ = this.authService.authData$;
    this.modalOpenType$ = this.modalService.modalType$;
    this.pending$ = this.authService.pending$;
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  openModal(modalType: string): void {
    this.modalService.openModal(modalType);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  signup(data: SignUp): void {
    this.subs.add = this.authService.signup(data).subscribe();
  }

  signin(data: SignIn): void {
    this.subs.add = this.authService.signin(data).subscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
