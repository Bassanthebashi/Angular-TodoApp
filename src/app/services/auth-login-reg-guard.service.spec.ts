import { TestBed } from '@angular/core/testing';

import { AuthLoginRegGuardService } from './auth-login-reg-guard.service';

describe('AuthLoginRegGuardService', () => {
  let service: AuthLoginRegGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLoginRegGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
