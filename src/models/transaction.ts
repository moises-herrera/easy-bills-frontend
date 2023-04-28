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

  /** If the transaction is an income. */
  isIncome: boolean;
}
