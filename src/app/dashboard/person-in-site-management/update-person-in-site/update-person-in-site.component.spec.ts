import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonInSiteComponent } from './update-person-in-site.component';

describe('UpdatePersonInSiteComponent', () => {
  let component: UpdatePersonInSiteComponent;
  let fixture: ComponentFixture<UpdatePersonInSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePersonInSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonInSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
