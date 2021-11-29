import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
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
import { InputOptions } from 'src/app/shared/models/inputs';
import { SignUp } from 'src/app/shared/models/sign-up';

@Component({
  selector: 'ven-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  @Input() pending = false;

  @Output() formData = new EventEmitter<SignUp>();

  signUpForm!: FormGroup;
  inputOptions: InputOptions[] = [
    { name: 'gender', value: 'male' },
    { name: 'gender', value: 'female' },
  ];

  constructor(
    private fb: FormBuilder,
    private matchPasswords: MatchPasswords
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: [this.matchPasswords.validate] }
    );
  }

  getInputControl(control: string): FormControl {
    return this.signUpForm.get(control) as FormControl;
  }

  onSubmit(): void {
    this.formData.emit({ ...this.signUpForm.value, createdAt: new Date() });
  }
}
