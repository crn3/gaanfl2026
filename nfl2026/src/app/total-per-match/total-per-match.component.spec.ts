import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPerMatchComponent } from './total-per-match.component';

describe('TotalPerMatchComponent', () => {
  let component: TotalPerMatchComponent;
  let fixture: ComponentFixture<TotalPerMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPerMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalPerMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
