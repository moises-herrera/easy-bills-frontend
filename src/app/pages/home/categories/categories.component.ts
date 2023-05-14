import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoryService } from 'src/app/services/category.service';
import { Category, User } from 'src/models';
import { Observable, map, tap } from 'rxjs';
import { ModalCategoryComponent } from './modal-category/modal-category.component';
import { MenuItem } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { NoDataComponent } from 'src/app/shared/no-data/no-data.component';

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
    ModalCategoryComponent,
    MenuModule,
    ConfirmDialogModule,
    NoDataComponent
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  /** User service. */
  private _userService = inject(UserService);

  /** Category service. */
  private _categoryService = inject(CategoryService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Search text. */
  search = '';

  /** List of categories. */
  categories$!: Observable<Category[]>;

  /** If the data is loading. */
  isLoading = false;

  /** If the category modal is visible. */
  isModalVisible = false;

  /** Current category id selected. */
  categoryId: string = '';

  /** Options of the menu. */
  options: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        this.showCategoryModal();
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-times',
      command: () => {
        this.deleteCategory();
      },
    },
  ];

  /**
   * Get the current user.
   *
   * @returns The current user.
   */
  get user(): User {
    return this._userService.user;
  }

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Get all the categories.
   */
  getCategories(): void {
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

  /**
   * Show the category modal.
   */
  showCategoryModal(): void {
    this.isModalVisible = true;
  }

  /**
   * Handle event when clicking a category.
   *
   * @param id The category id.
   */
  onClickCategory(id: string): void {
    this.categoryId = id;
  }

  /**
   * Delete the current category selected.
   */
  deleteCategory(): void {
    this._alertService.displayConfirm(() => {
      this._categoryService.deleteCategory(this.categoryId).subscribe({
        next: () => {
          this._alertService.displayMessage({
            severity: 'success',
            summary: 'La categoría ha sido eliminada',
          });
          this.categoryId = '';
          this.getCategories();
        },
        error: (err: unknown) => {
          this.categoryId = '';
          this._alertService.displayMessage({
            severity: 'error',
            summary:
              (err as HttpErrorResponse)?.error?.error ||
              'Ha ocurrido un error',
          });
        },
      });
    });
  }
}
