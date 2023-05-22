import { Observable, delay, of } from 'rxjs';
import { PagedResponse, Account, FinanceAccountType } from 'src/models';

/**
 * Mock Account service.
 */
export class MockAccountService {
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
    const accountsResponse: PagedResponse<Account> = {
      data: [
        {
          id: '1',
          name: 'Account 1',
          typeAccount: FinanceAccountType.Cash,
          balance: 100,
          userId: '1',
        },
      ],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 1,
    };

    return of(accountsResponse).pipe(delay(1000));
  }

  /**
   * Get an account by id.
   *
   * @param accountId The account id.
   * @returns The account.
   */
  getAccountById(accountId: string): Observable<Account> {
    const account: Account = {
      id: '1',
      name: 'Account 1',
      typeAccount: FinanceAccountType.Cash,
      balance: 100,
      userId: '1',
    };

    return of(account).pipe(delay(1000));
  }

  /**
   * Create a new account.
   *
   * @param account The account data.
   * @returns An empty observable.
   */
  createAccount(account: Partial<Account>): Observable<void> {
    return of().pipe(delay(1000));
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
    return of().pipe(delay(1000));
  }

  /**
   * Delete an account.
   *
   * @param accountId The account id.
   * @returns An empty observable.
   */
  deleteAccount(accountId: string): Observable<void> {
    return of().pipe(delay(1000));
  }
}
