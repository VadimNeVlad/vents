import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUserItemComponent } from './auth-user-item.component';

describe('AuthUserItemComponent', () => {
  let component: AuthUserItemComponent;
  let fixture: ComponentFixture<AuthUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthUserItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
