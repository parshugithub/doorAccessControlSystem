import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoorgroupComponent } from './edit-doorgroup.component';

describe('EditDoorgroupComponent', () => {
  let component: EditDoorgroupComponent;
  let fixture: ComponentFixture<EditDoorgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoorgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoorgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
