import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ven-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  constructor() {}
}
