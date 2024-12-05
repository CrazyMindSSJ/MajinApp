import { TestBed } from '@angular/core/testing';

import { FirePerfilService } from './fire-perfil.service';

describe('FirePerfilService', () => {
  let service: FirePerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirePerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
