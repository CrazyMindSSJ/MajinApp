import { TestBed } from '@angular/core/testing';

import { FireMaterialService } from './fire-material.service';

describe('FireMaterialService', () => {
  let service: FireMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
