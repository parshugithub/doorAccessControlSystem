import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonInSiteComponent } from './create-person-in-site.component';

describe('CreatePersonInSiteComponent', () => {
  let component: CreatePersonInSiteComponent;
  let fixture: ComponentFixture<CreatePersonInSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePersonInSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonInSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
