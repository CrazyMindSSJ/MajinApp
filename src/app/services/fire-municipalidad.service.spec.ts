import { TestBed } from '@angular/core/testing';

import { FireMunicipalidadService } from './fire-municipalidad.service';

describe('FireMunicipalidadService', () => {
  let service: FireMunicipalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireMunicipalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
