import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEventRoutingModule } from './create-event-routing.module';
import { CreateEventComponent } from './create-event.component';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { EventFormComponent } from './event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateEventComponent, EventFormComponent],
  imports: [
    CommonModule,
    CreateEventRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
})
export class CreateEventModule {}
