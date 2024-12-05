import { TestBed } from '@angular/core/testing';

import { FireUsuarioService } from './fire-usuario.service';

describe('FireUsuarioService', () => {
  let service: FireUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
