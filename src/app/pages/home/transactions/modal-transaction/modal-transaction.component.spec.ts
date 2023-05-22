import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransactionComponent } from './modal-transaction.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { MockAccountService, MockAlertService, MockCategoryService, MockTransactionService, mockErrorsConfig } from 'src/mocks';
import { CategoryService } from 'src/app/services/category.service';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';

describe('ModalTransactionComponent', () => {
  let component: ModalTransactionComponent;
  let fixture: ComponentFixture<ModalTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalTransactionComponent ],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: AccountService, useClass: MockAccountService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: ErrorTailorConfigProvider, useValue: mockErrorsConfig }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
