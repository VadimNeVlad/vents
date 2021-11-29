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

import { EventForm } from 'src/app/shared/models/event-form';
import { InputOptions } from 'src/app/shared/models/inputs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'ven-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  inputOptions: InputOptions[] = [
    { name: 'Party', value: 'party' },
    { name: 'Culture', value: 'culture' },
    { name: 'Film', value: 'film' },
    { name: 'Food', value: 'food' },
  ];

  @Input() userData!: User;
  @Input() pending = false;

  @Output() eventFormData = new EventEmitter<EventForm>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      city: ['', Validators.required],
      venue: ['', Validators.required],
      eventDate: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  getInputControl(control: string): FormControl {
    return this.eventForm.get(control) as FormControl;
  }

  onSubmit(): void {
    this.eventFormData.emit({
      ...this.eventForm.value,
      author: `${this.userData.name} ${this.userData.lastname}`,
      cancelEvent: false,
      createAt: new Date(),
      uid: this.userData.id,
    });
  }
}
