import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemComponent } from './list-dem.component';

describe('ListDemComponent', () => {
  let component: ListDemComponent;
  let fixture: ComponentFixture<ListDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
