import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingTransactionsWidgetComponent } from './spending-transactions-widget.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { MockTransactionService } from 'src/mocks';

describe('SpendingTransactionsWidgetComponent', () => {
  let component: SpendingTransactionsWidgetComponent;
  let fixture: ComponentFixture<SpendingTransactionsWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpendingTransactionsWidgetComponent],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
      ],
    });
    fixture = TestBed.createComponent(SpendingTransactionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
