import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateHelper, TransactionsHelper } from 'src/helpers';
import { TimePeriod, TransactionType, WidgetType } from 'src/models';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { NoDataComponent } from 'src/app/shared/no-data/no-data.component';
import { WidgetSettingsComponent } from '../widget-settings/widget-settings.component';
import { MenuItem } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { tap } from 'rxjs';

@Component({
  selector: 'app-income-transactions-widget',
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
  templateUrl: './income-transactions-widget.component.html',
  styleUrls: ['./income-transactions-widget.component.css'],
})
export class IncomeTransactionsWidgetComponent implements OnInit {
  /** Transactions service. */
  private _transactionsService = inject(TransactionService);

  /** Income transactions chart data. */
  incomeTransactionsData: any;

  /** Income chart options. */
  incomeOptions: any;

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
    this.getIncomeByCategory();
    this.setChartOptions();
  }

  /**
   * Get the income data by category.
   *
   * @param from From date.
   * @param to To date.
   */
  getIncomeByCategory(from: string = '', to: string = ''): void {
    this.isLoading = true;
    const fromDate =
      from || DateHelper.addDaysToDate(new Date(), -30).toISOString();
    const toDate = to || new Date().toISOString();

    this._transactionsService
      .getTransactionsByCategory(TransactionType.Income, fromDate, toDate)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe({
        next: (transactions) => {
          this.incomeTransactionsData =
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
   * Handle the event when a period is selected.
   */
  onPeriodSelected(timePeriod: TimePeriod): void {
    const startDate = timePeriod.startDate.toISOString();
    const endDate = timePeriod.endDate.toISOString();

    this.getIncomeByCategory(startDate, endDate);
  }
}
