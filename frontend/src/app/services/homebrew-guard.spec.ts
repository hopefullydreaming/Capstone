import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { homebrewGuard } from './homebrew-guard';

describe('homebrewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => homebrewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
