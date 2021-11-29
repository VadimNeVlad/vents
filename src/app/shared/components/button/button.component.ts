import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ven-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() isButton = false;
  @Input() linkUrl = '/';
  @Input() classType = 'main';
  @Input() color = 'teal';
  @Input() smallBtn = false;
  @Input() buttonType = 'submit';
  @Input() disabled = false;
  @Input() width = 'auto';

  constructor() {}
}
