import { TestBed } from '@angular/core/testing';

import { FireRegionService } from './fire-region.service';

describe('FireRegionService', () => {
  let service: FireRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
