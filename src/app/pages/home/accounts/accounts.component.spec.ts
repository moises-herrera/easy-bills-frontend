import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsComponent } from './accounts.component';
import { AccountService } from 'src/app/services/account.service';
import {
  MockAccountService,
  MockAlertService,
  MockUserService,
  mockErrorsConfig,
} from 'src/mocks';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

describe('AccountsComponent', () => {
  let component: AccountsComponent;
  let fixture: ComponentFixture<AccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: AccountService, useClass: MockAccountService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: ErrorTailorConfigProvider, useValue: mockErrorsConfig },
        ConfirmationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
