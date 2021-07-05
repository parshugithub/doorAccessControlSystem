import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonInSiteComponent } from './edit-person-in-site.component';

describe('EditPersonInSiteComponent', () => {
  let component: EditPersonInSiteComponent;
  let fixture: ComponentFixture<EditPersonInSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPersonInSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonInSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
