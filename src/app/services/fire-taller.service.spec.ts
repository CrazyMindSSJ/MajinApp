import { TestBed } from '@angular/core/testing';

import { FireTallerService } from './fire-taller.service';

describe('FireTallerService', () => {
  let service: FireTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
