import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction, TransactionInfo, TransactionType } from 'src/models';

const baseUrl = `${environment.baseUrl}/transactions`;

/**
 * Transaction service.
 */
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  /** Http client. */
  private _http = inject(HttpClient);

  /**
   * Get all the transactions.
   *
   * @returns List of transactions.
   */
  getTransactions(
    from: string = '',
    to: string = '',
    limit: number = 0
  ): Observable<TransactionInfo[]> {
    const params = new HttpParams().set('from', from).set('to', to).set('limit', limit);

    return this._http
      .get<TransactionInfo[]>(baseUrl, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Get a transaction by id.
   *
   * @param transactionId The transaction id.
   * @returns The transaction.
   */
  getTransactionById(transactionId: string): Observable<TransactionInfo> {
    return this._http
      .get<TransactionInfo>(`${baseUrl}/${transactionId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Create a new transaction.
   *
   * @param transaction The transaction data.
   * @returns An empty observable.
   */
  createTransaction(transaction: Partial<Transaction>): Observable<void> {
    return this._http
      .post<void>(baseUrl, transaction)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
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
    return this._http
      .put<void>(`${baseUrl}/${transactionId}`, transaction)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Delete a transaction.
   *
   * @param transactionId The transaction id.
   * @returns An empty observable.
   */
  deleteTransaction(transactionId: string): Observable<void> {
    return this._http
      .delete<void>(`${baseUrl}/${transactionId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
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
    const params = new HttpParams()
      .set('transactionType', transactionType)
      .set('from', from)
      .set('to', to);

    return this._http
      .get<TransactionInfo[][]>(`${baseUrl}/group/category`, {
        params,
      })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
