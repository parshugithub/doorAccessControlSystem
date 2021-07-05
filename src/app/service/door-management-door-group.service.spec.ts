import { TestBed } from '@angular/core/testing';

import { DoorManagementDoorGroupService } from './door-management-door-group.service';

describe('DoorManagementDoorGroupService', () => {
  let service: DoorManagementDoorGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoorManagementDoorGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
