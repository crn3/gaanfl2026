import { TestBed } from '@angular/core/testing';

import { ScoreStatsService } from './score-stats.service';

describe('ScoreStatsService', () => {
  let service: ScoreStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
