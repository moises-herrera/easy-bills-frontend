/**
 * Represents all the information about a category.
 */
export interface Category {
  /** Category id. */
  id: string;

  /** Name of the category. */
  name: string;

  /** Category icon. */
  icon: string;

  /** Color. */
  color: string;

  /** Description. */
  description?: string;

  /** User id. */
  userId?: string;
}
