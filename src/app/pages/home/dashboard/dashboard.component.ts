import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import {
  TimePeriod,
  TransactionInfo,
  TransactionType,
  WidgetType,
} from 'src/models';
import { ButtonModule } from 'primeng/button';
import { TransactionService } from 'src/app/services/transaction.service';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { WidgetSettingsComponent } from './widget-settings/widget-settings.component';
import { DateHelper } from 'src/helpers';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    DividerModule,
    ButtonModule,
    MenuModule,
    WidgetSettingsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  /** Transactions service. */
  private _transactionsService = inject(TransactionService);

  /** Spending transactions chart data. */
  spendingTransactionsData: any;

  /** Spending chart options. */
  spendingOptions: any;

  /** Income transactions chart data. */
  incomeTransactionsData: any;

  /** Income chart options. */
  incomeOptions: any;

  /** Recent transactions data. */
  recentTransactions$!: Observable<TransactionInfo[]>;

  /** If the widget settings modal is visible. */
  isSettingsModalVisible = false;

  /** Options of the menu. */
  options: MenuItem[] = [
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      command: () => {
        this.isSettingsModalVisible = true;
      },
    },
  ];

  /** Widget type enum. */
  widgetType = WidgetType;

  /** Widget type selected. */
  widgetSelected!: WidgetType;

  /**
   * Initial life cycle hook.
   */
  ngOnInit() {
    this.getSpendingByCategory();
    this.getIncomeByCategory();
    this.getRecentTransactions();
    let documentStyle = getComputedStyle(document.documentElement);
    let textColor = documentStyle.getPropertyValue('--text-color');

    this.spendingOptions = {
      cutout: '50%',
      plugins: {
        title: {
          display: true,
          text: 'Gastos',
          font: {
            size: 20,
          },
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };

    this.incomeOptions = {
      cutout: '50%',
      plugins: {
        title: {
          display: true,
          text: 'Ingresos',
          font: {
            size: 20,
          },
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }

  /**
   * Set the transactions by category data.
   *
   * @param transactions The transactions to set the data.
   * @returns The chart data object.
   */
  setTransactionsByCategoryData(transactions: TransactionInfo[][]): any {
    const colors: string[] = [];
    const chartData: any = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        },
      ],
    };
    const amountByCategory: { [key: string]: number } = {};

    transactions.map((group) => {
      group.map(({ category: { id, name, color }, amount }) => {
        if (!amountByCategory[id]) {
          amountByCategory[id] = amount;
          chartData.labels = [...chartData.labels, name];
        } else {
          amountByCategory[id] += amount;
        }

        if (!colors.includes(color)) {
          colors.push(color);
        }
      });
    });

    chartData.datasets[0].data = [...Object.values(amountByCategory)];
    chartData.datasets[0].backgroundColor = [...colors];
    chartData.datasets[0].hoverBackgroundColor = [...colors];

    return chartData;
  }

  /**
   * Get the spending data by category.
   *
   * @param from From date.
   * @param to To date.
   */
  getSpendingByCategory(from: string = '', to: string = ''): void {
    const fromDate =
      from || DateHelper.addDaysToDate(new Date(), -30).toISOString();
    const toDate = to || new Date().toISOString();

    this._transactionsService
      .getTransactionsByCategory(TransactionType.Spending, fromDate, toDate)
      .subscribe({
        next: (transactions) => {
          this.spendingTransactionsData =
            this.setTransactionsByCategoryData(transactions);
        },
      });
  }

  /**
   * Get the income data by category.
   *
   * @param from From date.
   * @param to To date.
   */
  getIncomeByCategory(from: string = '', to: string = ''): void {
    const fromDate =
      from || DateHelper.addDaysToDate(new Date(), -30).toISOString();
    const toDate = to || new Date().toISOString();

    this._transactionsService
      .getTransactionsByCategory(TransactionType.Income, fromDate, toDate)
      .subscribe({
        next: (transactions) => {
          this.incomeTransactionsData =
            this.setTransactionsByCategoryData(transactions);
        },
      });
  }

  /**
   * Get the list of the recent transactions.
   */
  getRecentTransactions(): void {
    const from = DateHelper.addDaysToDate(new Date(), -3).toISOString();
    const to = new Date().toISOString();

    this.recentTransactions$ = this._transactionsService.getTransactions(
      from,
      to
    );
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

  onClickWidgetSettings(widgetType: WidgetType): void {
    this.widgetSelected = widgetType;
  }

  /**
   * Handle the event when a period is selected.
   */
  onPeriodSelected(timePeriod: TimePeriod): void {
    const startDate = timePeriod.startDate.toISOString();
    const endDate = timePeriod.endDate.toISOString();

    switch (this.widgetSelected) {
      case WidgetType.SpendingByCategory:
        this.getSpendingByCategory(startDate, endDate);
        break;
      case WidgetType.IncomeByCategory:
        this.getIncomeByCategory(startDate, endDate);
        break;
    }
  }
}
