import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputOptions } from '../../models/inputs';

@Component({
  selector: 'ven-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRadioComponent {
  @Input() control!: FormControl;
  @Input() options: InputOptions[] = [];
  @Input() fieldName = '';

  constructor() {}

  trackByName(idx: number, option: InputOptions): string {
    return option.name;
  }
}
