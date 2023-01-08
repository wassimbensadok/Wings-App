import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClprfComponent } from './clprf.component';

describe('ClprfComponent', () => {
  let component: ClprfComponent;
  let fixture: ComponentFixture<ClprfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClprfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClprfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
