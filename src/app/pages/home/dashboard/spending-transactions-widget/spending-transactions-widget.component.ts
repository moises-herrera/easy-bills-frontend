import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { NoDataComponent } from 'src/app/shared/no-data/no-data.component';
import { ChartModule } from 'primeng/chart';
import { DateHelper, TransactionsHelper } from 'src/helpers';
import { TransactionService } from 'src/app/services/transaction.service';
import { TimePeriod, TransactionType, WidgetType } from 'src/models';
import { MenuItem } from 'primeng/api';
import { WidgetSettingsComponent } from '../widget-settings/widget-settings.component';
import { ButtonModule } from 'primeng/button';
import { tap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spending-transactions-widget',
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    NoDataComponent,
    ChartModule,
    WidgetSettingsComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './spending-transactions-widget.component.html',
  styleUrls: ['./spending-transactions-widget.component.css'],
})
export class SpendingTransactionsWidgetComponent implements OnInit {
  /** Transactions service. */
  private _transactionsService = inject(TransactionService);

  /** Spending transactions chart data. */
  spendingTransactionsData: any;

  /** Spending chart options. */
  spendingOptions: any;

  /** If the widget settings modal is visible. */
  isSettingsModalVisible = false;

  /** Widget type enum. */
  widgetType = WidgetType;

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

  /** If the widget is loading. */
  isLoading = false;

  /**
   * Initial life cycle hook.
   */
  ngOnInit() {
    this.getSpendingByCategory();
    this.setChartOptions();
  }

  /**
   * Get the spending data by category.
   *
   * @param from From date.
   * @param to To date.
   */
  getSpendingByCategory(from: string = '', to: string = ''): void {
    this.isLoading = true;
    const fromDate =
      from || DateHelper.addDaysToDate(new Date(), -30).toISOString();
    const toDate = to || new Date().toISOString();

    this._transactionsService
      .getTransactionsByCategory(TransactionType.Spending, fromDate, toDate)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe({
        next: (transactions) => {
          this.spendingTransactionsData =
            TransactionsHelper.setTransactionsByCategoryData(transactions);
        },
      });
  }

  /**
   * Set the chart options.
   */
  setChartOptions(): void {
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
  }

  /**
   * Handle the event when a period is selected.
   */
  onPeriodSelected(timePeriod: TimePeriod): void {
    const startDate = timePeriod.startDate.toISOString();
    const endDate = timePeriod.endDate.toISOString();

    this.getSpendingByCategory(startDate, endDate);
  }
}
