/**
 * Represents a paged response.
 */
export interface PagedResponse<T> {
  /** List of items. */
  data: T[];

  /** Total number of items. */
  totalRecords: number;

  /** Current page number. */
  pageNumber: number;

  /** Number of items per page. */
  pageSize: number;

  /** Number of pages. */
  totalPages: number;
}
