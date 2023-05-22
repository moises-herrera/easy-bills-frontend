import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { MockUserService, MockAlertService, mockErrorsConfig } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: AlertService,
          useClass: MockAlertService,
        },
        {
          provide: ErrorTailorConfigProvider,
          useValue: mockErrorsConfig,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
