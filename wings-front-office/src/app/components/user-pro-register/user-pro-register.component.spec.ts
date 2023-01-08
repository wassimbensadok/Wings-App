import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProRegisterComponent } from './user-pro-register.component';

describe('UserProRegisterComponent', () => {
  let component: UserProRegisterComponent;
  let fixture: ComponentFixture<UserProRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
