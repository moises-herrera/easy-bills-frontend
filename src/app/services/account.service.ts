import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, Category, PagedResponse } from 'src/models';

const baseUrl = `${environment.baseUrl}/accounts`;

/**
 * Account service.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  /** Http client. */
  private _http = inject(HttpClient);

  /**
   * Get all the accounts of the user.
   *
   * @param to The to date.
   * @param pageNumber The page number.
   * @returns List of accounts.
   */
  getAccounts(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse<Account>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this._http
      .get<PagedResponse<Account>>(baseUrl, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Get an account by id.
   *
   * @param accountId The account id.
   * @returns The account.
   */
  getAccountById(accountId: string): Observable<Account> {
    return this._http
      .get<Account>(`${baseUrl}/${accountId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Create a new account.
   *
   * @param account The account data.
   * @returns An empty observable.
   */
  createAccount(account: Partial<Account>): Observable<void> {
    return this._http
      .post<void>(baseUrl, account)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Update an account.
   *
   * @param accountId The account id.
   * @param account The account data.
   * @returns An empty observable.
   */
  updateAccount(
    accountId: string,
    account: Partial<Account>
  ): Observable<void> {
    return this._http
      .put<void>(`${baseUrl}/${accountId}`, account)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Delete an account.
   *
   * @param accountId The account id.
   * @returns An empty observable.
   */
  deleteAccount(accountId: string): Observable<void> {
    return this._http
      .delete<void>(`${baseUrl}/${accountId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
