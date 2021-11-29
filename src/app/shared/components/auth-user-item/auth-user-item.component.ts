import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'ven-auth-user-item',
  templateUrl: './auth-user-item.component.html',
  styleUrls: ['./auth-user-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthUserItemComponent {
  @Input() userData!: User;
  @Output() logout = new EventEmitter();

  constructor() {}

  onLogout(): void {
    this.logout.emit();
  }
}
