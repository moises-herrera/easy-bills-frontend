import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTransactionsWidgetComponent } from './income-transactions-widget.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { MockTransactionService } from 'src/mocks';

describe('IncomeTransactionsWidgetComponent', () => {
  let component: IncomeTransactionsWidgetComponent;
  let fixture: ComponentFixture<IncomeTransactionsWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncomeTransactionsWidgetComponent],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService }
      ]
    });
    fixture = TestBed.createComponent(IncomeTransactionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
