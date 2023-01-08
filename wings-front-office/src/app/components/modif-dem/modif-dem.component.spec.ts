import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifDemComponent } from './modif-dem.component';

describe('ModifDemComponent', () => {
  let component: ModifDemComponent;
  let fixture: ComponentFixture<ModifDemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifDemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifDemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
