import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/services/user.service';
import { MockAlertService, MockUserService, mockErrorsConfig } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule],
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
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
