import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatchPasswords } from 'src/app/core/validators/match-passwords';
import { ChangePassword } from 'src/app/shared/models/change-password';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'ven-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsViewComponent implements OnInit {
  @Input() userData!: User;
  @Input() pending = false;

  @Output() changePassword = new EventEmitter<ChangePassword>();

  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matchPasswords: MatchPasswords
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: [this.matchPasswords.validate] }
    );
  }

  getInputControl(control: string): FormControl {
    return this.passwordForm.get(control) as FormControl;
  }

  onSubmit(): void {
    this.changePassword.emit({
      ...this.passwordForm.value,
      uid: this.userData.id,
    });
  }
}
