import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRankComponent } from './team-rank.component';

describe('TeamRankComponent', () => {
  let component: TeamRankComponent;
  let fixture: ComponentFixture<TeamRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
