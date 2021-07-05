import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoweronresetComponent } from './poweronreset.component';

describe('PoweronresetComponent', () => {
  let component: PoweronresetComponent;
  let fixture: ComponentFixture<PoweronresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoweronresetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoweronresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
