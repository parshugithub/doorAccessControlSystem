import { TestBed } from '@angular/core/testing';

import { PersonInSiteService } from './person-in-site.service';

describe('PersonInSiteService', () => {
  let service: PersonInSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonInSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
