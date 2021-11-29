import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'ven-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isAuth = false;
  @Input() authData: User | null = null;

  @Output() modalType = new EventEmitter<string>();
  @Output() logout = new EventEmitter();

  constructor() {}

  onModalHandle(modalType: string): void {
    this.modalType.emit(modalType);
  }

  onLogout(): void {
    this.logout.emit();
  }
}
