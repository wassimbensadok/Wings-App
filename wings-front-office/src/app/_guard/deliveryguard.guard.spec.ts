import { TestBed } from '@angular/core/testing';

import { DeliveryguardGuard } from './deliveryguard.guard';

describe('DeliveryguardGuard', () => {
  let guard: DeliveryguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeliveryguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
