import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewDeliveryComponent } from './list-new-delivery.component';

describe('ListNewDeliveryComponent', () => {
  let component: ListNewDeliveryComponent;
  let fixture: ComponentFixture<ListNewDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
