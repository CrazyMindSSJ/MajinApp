import { TestBed } from '@angular/core/testing';

import { FireComunasService } from './fire-comunas.service';

describe('FireComunasService', () => {
  let service: FireComunasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireComunasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
