import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewVendorsComponent } from './list-new-vendors.component';

describe('ListNewVendorsComponent', () => {
  let component: ListNewVendorsComponent;
  let fixture: ComponentFixture<ListNewVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNewVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
