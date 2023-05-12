import { TransactionInfo } from 'src/models';

/**
 * Represents all the common functions that are used in the transactions.
 */
export class TransactionsHelper {
  /**
   * Set the transactions by category data.
   *
   * @param transactions The transactions to set the data.
   * @returns The chart data object.
   */
  static setTransactionsByCategoryData(transactions: TransactionInfo[][]): any {
    const colors: string[] = [];
    const chartData: any = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ['gray'],
          hoverBackgroundColor: ['gray'],
        },
      ],
    };

    if (transactions.length) {
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
    }

    return chartData;
  }
}
