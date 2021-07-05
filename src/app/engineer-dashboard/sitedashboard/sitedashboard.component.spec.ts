import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitedashboardComponent } from './sitedashboard.component';

describe('SitedashboardComponent', () => {
  let component: SitedashboardComponent;
  let fixture: ComponentFixture<SitedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitedashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
