import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _modalType = new BehaviorSubject('');
  modalType$: Observable<string> = this._modalType.asObservable();

  constructor() {}

  openModal(modalType: string): void {
    this._modalType.next(modalType);
  }

  closeModal(): void {
    this._modalType.next('');
  }
}
