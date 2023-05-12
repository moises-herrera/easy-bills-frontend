import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TimePeriod, TimePeriodType } from 'src/models';
import { DateHelper } from 'src/helpers';

@Component({
  selector: 'app-widget-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.css'],
})
export class WidgetSettingsComponent {
  /** Set modal visibility. */
  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
    this.isVisibleChange.emit(this._isVisible);
  }

  /** Emit visibility value. */
  @Output() isVisibleChange = new EventEmitter<boolean>();

  /** Widget type. */
  @Input() widgetType = '';

  /** Time period settings. */
  @Output() periodSelected = new EventEmitter<TimePeriod>();

  /** Form builder. */
  private _fb = inject(FormBuilder);

  /** If the modal is visible. */
  private _isVisible = false;

  /**
   * If the modal is visible.
   *
   * @returns True if visible, false otherwise.
   */
  get isVisible(): boolean {
    return this._isVisible;
  }

  /** Time period options. */
  periodOptions = [
    {
      name: 'Últimos 7 días',
      value: TimePeriodType.Week,
    },
    {
      name: 'Últimos 30 días',
      value: TimePeriodType.Month,
    },
    {
      name: 'Últimos 3 meses',
      value: TimePeriodType.Quarter,
    },
    {
      name: 'Último año',
      value: TimePeriodType.Year,
    },
    {
      name: 'Personalizado',
      value: TimePeriodType.Custom,
    },
  ];

  /** Min date value for date fields. */
  minDate = new Date();

  /** Settings form. */
  settingsForm = this._fb.nonNullable.group({
    period: [TimePeriodType.Week],
    startDate: [new Date()],
    endDate: [new Date()],
  });

  /**
   * The time period value.
   *
   * @returns The value of the period field.
   */
  get period(): string {
    return this.settingsForm.get('period')?.value || '';
  }

  /**
   * Save the widget settings.
   */
  saveWidgetSettings(): void {
    switch (this.period) {
      case TimePeriodType.Week:
        this.periodSelected.emit({
          startDate: DateHelper.addDaysToDate(new Date(), -7),
          endDate: new Date(),
        });
        break;

      case TimePeriodType.Month:
        this.periodSelected.emit({
          startDate: DateHelper.addDaysToDate(new Date(), -30),
          endDate: new Date(),
        });
        break;

      case TimePeriodType.Quarter:
        this.periodSelected.emit({
          startDate: DateHelper.addDaysToDate(new Date(), -90),
          endDate: new Date(),
        });
        break;

      case TimePeriodType.Year:
        this.periodSelected.emit({
          startDate: DateHelper.addDaysToDate(new Date(), -365),
          endDate: new Date(),
        });
        break;

      case TimePeriodType.Custom:
        this.periodSelected.emit({
          startDate: this.settingsForm.value.startDate!,
          endDate: this.settingsForm.value.endDate!,
        });
        break;
    }
  }

  /**
   * Handle event when the modal is closed.
   */
  hideModal(): void {
    this.isVisible = false;
    this.settingsForm.reset();
  }
}
