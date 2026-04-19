import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsPerRoundComponent } from './teams-per-round.component';

describe('TeamsPerRoundComponent', () => {
  let component: TeamsPerRoundComponent;
  let fixture: ComponentFixture<TeamsPerRoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsPerRoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamsPerRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
