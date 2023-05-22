import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/mocks';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: UserService, useClass: MockUserService },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
