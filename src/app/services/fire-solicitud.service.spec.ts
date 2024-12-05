import { TestBed } from '@angular/core/testing';

import { FireSolicitudService } from './fire-solicitud.service';

describe('FireSolicitudService', () => {
  let service: FireSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
