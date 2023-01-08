import { TestBed } from '@angular/core/testing';

import { VonderguardGuard } from './vonderguard.guard';

describe('VonderguardGuard', () => {
  let guard: VonderguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VonderguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
