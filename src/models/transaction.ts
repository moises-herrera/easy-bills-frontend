import { TransactionType } from '.';

/**
 * Represents all the information about a transaction.
 */
export interface Transaction {
  /** Id. */
  id: string;

  /** Amount of the transaction. */
  amount: number;

  /** Description of the transaction. */
  description: string;

  /** Account id. */
  accountId: string;

  /** Category id. */
  categoryId: string;

  /** Type of the transaction. */
  transactionType: TransactionType;

  /** Created date. */
  createdDate: Date;
}
