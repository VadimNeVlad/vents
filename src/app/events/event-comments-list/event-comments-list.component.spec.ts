import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCommentsListComponent } from './event-comments-list.component';

describe('EventCommentsListComponent', () => {
  let component: EventCommentsListComponent;
  let fixture: ComponentFixture<EventCommentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCommentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
