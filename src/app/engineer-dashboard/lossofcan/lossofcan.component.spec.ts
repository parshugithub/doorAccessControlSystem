import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LossofcanComponent } from './lossofcan.component';

describe('LossofcanComponent', () => {
  let component: LossofcanComponent;
  let fixture: ComponentFixture<LossofcanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LossofcanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LossofcanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
