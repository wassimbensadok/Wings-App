import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllListOfferComponent } from './all-list-offer.component';

describe('AllListOfferComponent', () => {
  let component: AllListOfferComponent;
  let fixture: ComponentFixture<AllListOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllListOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllListOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
