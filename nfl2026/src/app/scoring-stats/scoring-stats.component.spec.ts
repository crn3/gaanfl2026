import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringStatsComponent } from './scoring-stats.component';

describe('ScoringStatsComponent', () => {
  let component: ScoringStatsComponent;
  let fixture: ComponentFixture<ScoringStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoringStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoringStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
