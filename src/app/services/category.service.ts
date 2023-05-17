import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, PagedResponse } from 'src/models';

const baseUrl = `${environment.baseUrl}/categories`;

/**
 * Category service.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  /** Http client. */
  private _http = inject(HttpClient);

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
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this._http
      .get<PagedResponse<Category>>(baseUrl, { params })
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Get a category by id.
   *
   * @param categoryId The category id.
   * @returns The category.
   */
  getCategoryById(categoryId: string): Observable<Category> {
    return this._http
      .get<Category>(`${baseUrl}/${categoryId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Create a new category.
   *
   * @param category The category data.
   * @returns An empty observable.
   */
  createCategory(category: Partial<Category>): Observable<void> {
    return this._http
      .post<void>(baseUrl, category)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
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
    return this._http
      .put<void>(`${baseUrl}/${categoryId}`, category)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }

  /**
   * Delete a category.
   *
   * @param categoryId The category id.
   * @returns An empty observable.
   */
  deleteCategory(categoryId: string): Observable<void> {
    return this._http
      .delete<void>(`${baseUrl}/${categoryId}`)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}
