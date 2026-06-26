import { TestBed } from '@angular/core/testing';

import { RegisterPtService } from './register-pt.service';

describe('RegisterPtService', () => {
  let service: RegisterPtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
