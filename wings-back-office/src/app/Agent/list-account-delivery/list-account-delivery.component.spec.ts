import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccountDeliveryComponent } from './list-account-delivery.component';

describe('ListAccountDeliveryComponent', () => {
  let component: ListAccountDeliveryComponent;
  let fixture: ComponentFixture<ListAccountDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccountDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccountDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
