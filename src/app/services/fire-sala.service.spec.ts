import { TestBed } from '@angular/core/testing';

import { FireSalaService } from './fire-sala.service';

describe('FireSalaService', () => {
  let service: FireSalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireSalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
