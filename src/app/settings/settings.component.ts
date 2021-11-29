import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscribeContainer } from '../core/utils/subscribe-container';
import { ChangePassword } from '../shared/models/change-password';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'ven-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  authData$ = new Observable<User | null>();
  pending$ = new Observable<boolean>();
  subs = new SubscribeContainer();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authData$ = this.authService.authData$;
    this.pending$ = this.authService.pending$;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  changePassword(data: ChangePassword): void {
    this.subs.add = this.authService.changePassword(data).subscribe();
  }
}
