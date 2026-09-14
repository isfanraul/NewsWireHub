import { TestBed } from '@angular/core/testing';

import { authAdminGuard } from './auth-admin.guard';

describe('AuthUserGuard', () => {
  let guard: authAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
