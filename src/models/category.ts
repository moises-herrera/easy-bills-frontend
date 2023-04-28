/**
 * Represents all the information about a category.
 */
export interface Category {
  /** Category id. */
  id: string;

  /** Name of the category. */
  name: string;

  /** Description. */
  description?: string;

  /** User id. */
  userId?: string;
}
