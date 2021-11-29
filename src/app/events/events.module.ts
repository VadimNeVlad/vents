import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { EventsListComponent } from './events-list/events-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventDetailInfoComponent } from './event-detail-info/event-detail-info.component';
import { EventCommentsListComponent } from './event-comments-list/event-comments-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsComponent,
    EventsViewComponent,
    EventsListComponent,
    EventDetailComponent,
    EventDetailInfoComponent,
    EventCommentsListComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class EventsModule {}
