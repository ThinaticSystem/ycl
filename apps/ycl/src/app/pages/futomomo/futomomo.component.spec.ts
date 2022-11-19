import { ComponentFixture, TestBed } from '@angular/core/testing';

import FutomomoComponent from './futomomo.component';

describe('FutomomoComponent', () => {
  let component: FutomomoComponent;
  let fixture: ComponentFixture<FutomomoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutomomoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FutomomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
