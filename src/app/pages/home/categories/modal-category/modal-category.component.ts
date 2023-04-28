import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { tap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-modal-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ColorPickerModule,
    ButtonModule,
    errorTailorImports,
    DividerModule,
    ProgressSpinnerModule,
    InputTextareaModule,
  ],
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css'],
})
export class ModalCategoryComponent {
  /** Set modal visibility. */
  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
    this.isVisibleChange.emit(this._isVisible);
  }

  /** Emit visibility value. */
  @Output() isVisibleChange = new EventEmitter<boolean>();

  /** Category id. */
  @Input() categoryId?: string = '';

  /** Emit category id. */
  @Output() categoryIdChange = new EventEmitter<string>();

  /** Emit event when it is necessary to reload the data. */
  @Output() reloadData = new EventEmitter<void>();

  /** Form builder. */
  private _fb = inject(FormBuilder);

  /** User service. */
  private _userService = inject(UserService);

  /** Category service. */
  private _categoryService = inject(CategoryService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** If the modal is visible. */
  private _isVisible = false;

  /**
   * If the modal is visible.
   *
   * @returns True if visible, false otherwise.
   */
  get isVisible(): boolean {
    return this._isVisible;
  }

  /** If the information is loading. */
  isLoading = false;

  /** If the information is being saved. */
  isSaving = false;

  /** Category form. */
  categoryForm = this._fb.nonNullable.group({
    name: ['', [Validators.required]],
    icon: ['fa-solid fa-list'],
    color: ['#858585', Validators.required],
    description: [''],
    userId: [this._userService.user?.id],
  });

  /**
   * Get category data.
   */
  getCategoryData(): void {
    if (this.categoryId) {
      this.isLoading = true;
      this._categoryService
        .getCategoryById(this.categoryId)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe({
          next: (category) => {
            this.categoryForm.patchValue(category);
          },
        });
    }
  }

  /**
   * Save the category info.
   */
  saveCategory(): void {
    this.isSaving = true;
    const categoryRequest$ = !this.categoryId
      ? this._categoryService.createCategory(this.categoryForm.value)
      : this._categoryService.updateCategory(
          this.categoryId,
          this.categoryForm.value
        );

    categoryRequest$.pipe(tap(() => this.reloadData.emit())).subscribe({
      next: () => {
        this.isSaving = false;
        this._alertService.displayMessage({
          severity: 'success',
          summary: 'Categoría guardada exitosamente',
        });
      },
      error: (err: unknown) => {
        this.isSaving = false;
        this._alertService.displayMessage({
          severity: 'error',
          summary:
            (err as HttpErrorResponse)?.error?.error || 'Ha ocurrido un error',
        });
      },
    });
  }

  /**
   * Handle event when the modal is closed.
   */
  hideModal(): void {
    this.isVisible = false;
    this.categoryIdChange.emit('');
    this.categoryForm.reset();
  }
}
