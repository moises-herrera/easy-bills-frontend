import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { TransactionInfo, TransactionType } from 'src/models';
import { TransactionService } from 'src/app/services/transaction.service';
import { Observable, tap } from 'rxjs';
import { DateHelper } from 'src/helpers';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NoDataComponent } from 'src/app/shared/no-data/no-data.component';
import { SpendingTransactionsWidgetComponent } from './spending-transactions-widget/spending-transactions-widget.component';
import { IncomeTransactionsWidgetComponent } from './income-transactions-widget/income-transactions-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ProgressSpinnerModule,
    SpendingTransactionsWidgetComponent,
    IncomeTransactionsWidgetComponent,
    NoDataComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /** Transactions service. */
  private _transactionsService = inject(TransactionService);

  /** Recent transactions data. */
  recentTransactions$!: Observable<TransactionInfo[]>;

  /** If the recent transactions are loading. */
  isLoadingRecentTransactions = false;

  /**
   * Initial life cycle hook.
   */
  ngOnInit() {
    this.getRecentTransactions();
  }

  /**
   * Get the list of the recent transactions.
   */
  getRecentTransactions(): void {
    this.isLoadingRecentTransactions = true;
    const from = DateHelper.addDaysToDate(new Date(), -3).toISOString();
    const to = new Date().toISOString();

    this.recentTransactions$ = this._transactionsService
      .getTransactions(from, to, 5)
      .pipe(tap(() => (this.isLoadingRecentTransactions = false)));
  }

  /**
   * Check if the type of a transaction is an income.
   *
   * @param transactionType The transaction type.
   * @returns True if is an income, false otherwise.
   */
  isIncome(transactionType: TransactionType): boolean {
    return transactionType === TransactionType.Income;
  }
}
