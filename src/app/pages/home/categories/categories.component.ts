import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/models';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  /** Category service. */
  private _categoryService = inject(CategoryService);

  /** Search text. */
  search = '';

  /** List of categories. */
  categories$!: Observable<Category[]>;

  /** If the data is loading. */
  isLoading = false;

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.categories$ = this._categoryService
      .getCategories()
      .pipe(tap(() => (this.isLoading = false)));
  }

  /**
   * Search categories.
   */
  searchCategories(): void {
    this.categories$ = this.categories$.pipe(
      map((categories) =>
        categories.filter(({ name }) =>
          name.toLowerCase().includes(this.search.toLowerCase())
        )
      )
    );
  }
}
