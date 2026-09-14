import { TestBed } from '@angular/core/testing';

import { authEditorGuard } from './auth-editor.guard';

describe('AuthUserGuard', () => {
  let guard: authEditorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authEditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
