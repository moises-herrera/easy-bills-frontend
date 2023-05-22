import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsComponent } from './transactions.component';
import {
  MockAccountService,
  MockAlertService,
  MockCategoryService,
  MockTransactionService,
  mockErrorsConfig,
} from 'src/mocks';
import { AlertService } from 'src/app/services/alert.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { ConfirmationService } from 'primeng/api';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsComponent],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: AccountService, useClass: MockAccountService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: ErrorTailorConfigProvider, useValue: mockErrorsConfig },
        ConfirmationService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
