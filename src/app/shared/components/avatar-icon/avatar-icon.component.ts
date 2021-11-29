import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ven-avatar-icon',
  templateUrl: './avatar-icon.component.html',
  styleUrls: ['./avatar-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarIconComponent {
  @Input() name = '';
  @Input() size = 'medium';

  constructor() {}
}
