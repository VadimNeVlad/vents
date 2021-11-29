import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { SignIn } from 'src/app/shared/models/sign-in';

@Component({
  selector: 'ven-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  @Input() pending = false;

  @Output() formData = new EventEmitter<SignIn>();

  signInForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getInputControl(control: string): FormControl {
    return this.signInForm.get(control) as FormControl;
  }

  onSubmit(): void {
    this.formData.emit(this.signInForm.value);
  }
}
