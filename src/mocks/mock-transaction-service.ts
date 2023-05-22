import { Observable, of, delay } from 'rxjs';
import {
  PagedResponse,
  TransactionInfo,
  Transaction,
  TransactionType,
  FinanceAccountType,
} from 'src/models';

/**
 * Mock transactions service.
 */
export class MockTransactionService {
  /**
   * Get all the transactions.
   *
   * @param from The from date.
   * @param to The to date.
   * @param pageNumber The page number.
   * @returns List of transactions.
   */
  getTransactions(
    from: string = '',
    to: string = '',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse<TransactionInfo>> {
    const transactionResponse: PagedResponse<TransactionInfo> = {
      data: [
        {
          id: '1',
          description: 'Transaction 1',
          amount: 100,
          transactionType: TransactionType.Spending,
          account: {
            id: '1',
            name: 'Account 1',
            balance: 1000,
            typeAccount: FinanceAccountType.Cash,
            userId: '1',
          },
          category: {
            id: '1',
            name: 'Category 1',
            icon: 'icon',
            color: '#000000',
          },
          createdDate: new Date(),
        },
      ],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 1,
    };

    return of(transactionResponse).pipe(delay(1000));
  }

  /**
   * Get a transaction by id.
   *
   * @param transactionId The transaction id.
   * @returns The transaction.
   */
  getTransactionById(transactionId: string): Observable<TransactionInfo> {
    const transaction: TransactionInfo = {
      id: '1',
      description: 'Transaction 1',
      amount: 100,
      transactionType: TransactionType.Spending,
      account: {
        id: '1',
        name: 'Account 1',
        balance: 1000,
        typeAccount: FinanceAccountType.Cash,
        userId: '1',
      },
      category: {
        id: '1',
        name: 'Category 1',
        icon: 'icon',
        color: '#000000',
      },
      createdDate: new Date(),
    };

    return of(transaction).pipe(delay(1000));
  }

  /**
   * Create a new transaction.
   *
   * @param transaction The transaction data.
   * @returns An empty observable.
   */
  createTransaction(transaction: Partial<Transaction>): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Update a transaction.
   *
   * @param transactionId The transaction id.
   * @param transaction The transaction data.
   * @returns An empty observable.
   */
  updateTransaction(
    transactionId: string,
    transaction: Partial<Transaction>
  ): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Delete a transaction.
   *
   * @param transactionId The transaction id.
   * @returns An empty observable.
   */
  deleteTransaction(transactionId: string): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Get all the transactions by category.
   *
   * @param transactionType The type of the transaction.
   * @returns The transactions grouped by category.
   */
  getTransactionsByCategory(
    transactionType: TransactionType = TransactionType.Spending,
    from: string = '',
    to: string = ''
  ): Observable<TransactionInfo[][]> {
    const transactionsResponse: TransactionInfo[][] = [
      [
        {
          id: '1',
          description: 'Transaction 1',
          amount: 100,
          transactionType: TransactionType.Spending,
          account: {
            id: '1',
            name: 'Account 1',
            balance: 1000,
            typeAccount: FinanceAccountType.Cash,
            userId: '1',
          },
          category: {
            id: '1',
            name: 'Finance',
            icon: 'icon',
            color: '#000000',
          },
          createdDate: new Date(),
        },
      ],
      [
        {
          id: '2',
          description: 'Transaction 2',
          amount: 100,
          transactionType: TransactionType.Spending,
          account: {
            id: '2',
            name: 'Account 2',
            balance: 1000,
            typeAccount: FinanceAccountType.Cash,
            userId: '1',
          },
          category: {
            id: '2',
            name: 'Food',
            icon: 'icon',
            color: '#000000',
          },
          createdDate: new Date(),
        },
      ],
    ];

    return of(transactionsResponse).pipe(delay(1000));
  }
}
