import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringChartTableComponent } from './scoring-chart-table.component';

describe('ScoringChartTableComponent', () => {
  let component: ScoringChartTableComponent;
  let fixture: ComponentFixture<ScoringChartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoringChartTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoringChartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
