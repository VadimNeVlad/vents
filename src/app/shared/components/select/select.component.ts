import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputOptions } from '../../models/inputs';

@Component({
  selector: 'ven-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() control!: FormControl;
  @Input() options: InputOptions[] = [];
  @Input() placeholder = '';

  constructor() {}
}
