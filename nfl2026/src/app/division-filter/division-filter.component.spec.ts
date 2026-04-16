import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionFilterComponent } from './division-filter.component';

describe('DivisionFilterComponent', () => {
  let component: DivisionFilterComponent;
  let fixture: ComponentFixture<DivisionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisionFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DivisionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
