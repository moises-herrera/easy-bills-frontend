/**
 * Represents common methods for date manipulation.
 */
export class DateHelper {
  static addDaysToDate(date: Date, days: number): Date {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);

    return currentDate;
  }
}
