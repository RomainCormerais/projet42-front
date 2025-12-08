import { TestBed } from '@angular/core/testing';

import { LoginLogout } from './login-logout';

describe('LoginLogout', () => {
  let service: LoginLogout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginLogout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
