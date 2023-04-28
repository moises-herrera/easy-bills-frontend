import { FinanceAccountType } from '.';

/**
 * Account model.
 */
export interface Account {
  /** Account id. */
  id: string;

  /** Account name. */
  name: string;

  /** Type of account. */
  typeAccount: FinanceAccountType;

  /** Balance. */
  balance: number;

  /** User id. */
  userId: string;

  /** Transactions. */
  transactions: any;
}
