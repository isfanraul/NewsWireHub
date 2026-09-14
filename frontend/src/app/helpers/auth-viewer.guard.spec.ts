import { TestBed } from '@angular/core/testing';

import { authViewerGuard } from './auth-viewer.guard';

describe('AuthUserGuard', () => {
  let guard: authViewerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authViewerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
