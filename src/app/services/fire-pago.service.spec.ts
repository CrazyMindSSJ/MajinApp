import { TestBed } from '@angular/core/testing';

import { FirePagoService } from './fire-pago.service';

describe('FirePagoService', () => {
  let service: FirePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
