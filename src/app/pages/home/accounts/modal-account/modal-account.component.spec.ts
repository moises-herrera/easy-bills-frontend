import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAccountComponent } from './modal-account.component';
import { UserService } from 'src/app/services/user.service';
import { MockAccountService, MockAlertService, MockUserService, mockErrorsConfig } from 'src/mocks';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';

describe('ModalAccountComponent', () => {
  let component: ModalAccountComponent;
  let fixture: ComponentFixture<ModalAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalAccountComponent ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: AccountService, useClass: MockAccountService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: ErrorTailorConfigProvider, useValue: mockErrorsConfig }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
