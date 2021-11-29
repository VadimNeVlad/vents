import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'ven-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() modalType = '';
  @Input() currentModal: string | null = null;
  @Input() title = '';

  @Output() closeModal = new EventEmitter();

  constructor() {}

  onCloseModal(): void {
    this.closeModal.emit();
  }
}
