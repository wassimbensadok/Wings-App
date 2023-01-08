import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeDeliveryComponent } from './become-delivery.component';

describe('BecomeDeliveryComponent', () => {
  let component: BecomeDeliveryComponent;
  let fixture: ComponentFixture<BecomeDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BecomeDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
