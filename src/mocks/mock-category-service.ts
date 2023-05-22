import { Observable, delay, of } from 'rxjs';
import { PagedResponse, Category } from 'src/models';

/**
 * Mock category service.
 */
export class MockCategoryService {
  /**
   * Get all the categories.
   *
   * @param to The to date.
   * @param pageNumber The page number.
   * @returns List of categories.
   */
  getCategories(
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResponse<Category>> {
    const categoriesResponse: PagedResponse<Category> = {
      data: [
        {
          id: '1',
          name: 'Category 1',
          icon: 'fa-solid fa-list',
          color: '#000',
          userId: '1',
        },
      ],
      pageNumber: 1,
      pageSize: 10,
      totalPages: 1,
      totalRecords: 1,
    };

    return of(categoriesResponse).pipe(delay(1000));
  }

  /**
   * Get a category by id.
   *
   * @param categoryId The category id.
   * @returns The category.
   */
  getCategoryById(categoryId: string): Observable<Category> {
    const category: Category = {
      id: '1',
      name: 'Category 1',
      icon: 'fa-solid fa-list',
      color: '#000',
      userId: '1',
    };

    return of(category).pipe(delay(1000));
  }

  /**
   * Create a new category.
   *
   * @param category The category data.
   * @returns An empty observable.
   */
  createCategory(category: Partial<Category>): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Update a category.
   *
   * @param categoryId The category id.
   * @param category The category data.
   * @returns An empty observable.
   */
  updateCategory(
    categoryId: string,
    category: Partial<Category>
  ): Observable<void> {
    return of().pipe(delay(1000));
  }

  /**
   * Delete a category.
   *
   * @param categoryId The category id.
   * @returns An empty observable.
   */
  deleteCategory(categoryId: string): Observable<void> {
    return of().pipe(delay(1000));
  }
}
