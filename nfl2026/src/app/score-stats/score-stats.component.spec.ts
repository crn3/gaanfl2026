import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreStatsComponent } from './score-stats.component';

describe('ScoreStatsComponent', () => {
  let component: ScoreStatsComponent;
  let fixture: ComponentFixture<ScoreStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
