import { Account, Category, TransactionType } from '.';

/**
 * Represents all the information about a transaction with its navigation properties.
 */
export interface TransactionInfo {
  /** Id. */
  id: string;

  /** Amount of the transaction. */
  amount: number;

  /** Description of the transaction. */
  description: string;

  /** Account data. */
  account: Account;

  /** Category data. */
  category: Category;

  /** Type of the transaction. */
  transactionType: TransactionType;
}
