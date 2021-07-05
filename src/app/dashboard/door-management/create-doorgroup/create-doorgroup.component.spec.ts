import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoorgroupComponent } from './create-doorgroup.component';

describe('CreateDoorgroupComponent', () => {
  let component: CreateDoorgroupComponent;
  let fixture: ComponentFixture<CreateDoorgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDoorgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDoorgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
