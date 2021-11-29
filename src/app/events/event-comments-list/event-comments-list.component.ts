import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Comment } from 'src/app/shared/models/comment';
import { CommentForm } from 'src/app/shared/models/comment-form';
import { Event } from 'src/app/shared/models/event';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'ven-event-comments-list',
  templateUrl: './event-comments-list.component.html',
  styleUrls: ['./event-comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCommentsListComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() event!: Event;
  @Input() userData: User | null = null;
  @Input() pending = false;

  @Output() commentData = new EventEmitter<CommentForm>();

  commentsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInit();
  }

  trackById(idx: number, comment: Comment): number {
    return comment.id;
  }

  formInit(): void {
    this.commentsForm = this.fb.group({
      message: ['', [Validators.required]],
    });
  }

  getInputControl(control: string): FormControl {
    return this.commentsForm.get(control) as FormControl;
  }

  onSubmit(): void {
    if (this.userData) {
      this.commentData.emit({
        eventId: this.event.id,
        userName: this.userData.name,
        createdAt: new Date(),
        message: this.commentsForm.value.message,
        uid: this.userData.id,
      });
    }

    this.commentsForm.reset();
  }
}
