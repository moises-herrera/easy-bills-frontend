import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { errorTailorImports } from '@ngneat/error-tailor';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertService } from 'src/app/services/alert.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Account, Category, TransactionType } from 'src/models';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-modal-transaction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    errorTailorImports,
    DividerModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    RadioButtonModule,
    CalendarModule,
  ],
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.css'],
})
export class ModalTransactionComponent {
  /** Set modal visibility. */
  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
    this.isVisibleChange.emit(this._isVisible);
  }

  /** Emit visibility value. */
  @Output() isVisibleChange = new EventEmitter<boolean>();

  /** Transaction id. */
  @Input() transactionId?: string = '';

  /** Emit transaction id. */
  @Output() transactionIdChange = new EventEmitter<string>();

  /** Emit event when it is necessary to reload the data. */
  @Output() reloadData = new EventEmitter<void>();

  /** Form builder. */
  private _fb = inject(FormBuilder);

  /** Transaction service. */
  private _transactionService = inject(TransactionService);

  /** Account service. */
  private _accountService = inject(AccountService);

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

  /**
   * Get the label of the header.
   *
   * @returns The label.
   */
  get headerLabel(): string {
    return `${!this.transactionId ? 'Agregar' : 'Editar'} transacción`;
  }

  /** If the information is loading. */
  isLoading = false;

  /** If the information is being saved. */
  isSaving = false;

  /** Min date value for the created date field. */
  minDate = new Date();

  /** Transaction types list. */
  transactionTypes = [
    {
      name: 'Gasto',
      value: TransactionType.Spending,
    },
    {
      name: 'Ingreso',
      value: TransactionType.Income,
    },
  ];

  /** Transaction form. */
  transactionForm = this._fb.nonNullable.group({
    amount: [0, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
    accountId: ['', Validators.required],
    categoryId: ['', Validators.required],
    transactionType: [this.transactionTypes[0].value, Validators.required],
    createdDate: [new Date(), Validators.required],
  });

  /** User accounts. */
  userAccounts$!: Observable<Account[]>;

  /** List of categories. */
  categories$!: Observable<Category[]>;

  /**
   * Get transaction data.
   */
  getTransactionData(): void {
    this.getUserAccounts();
    this.getAllCategories();

    if (this.transactionId) {
      this.isLoading = true;
      this._transactionService
        .getTransactionById(this.transactionId)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe({
          next: (transaction) => {
            this.transactionForm.patchValue({
              ...transaction,
              accountId: transaction.account.id,
              categoryId: transaction.category.id,
              createdDate: new Date(transaction.createdDate),
            });
          },
        });
    }
  }

  /**
   * Get user's finance accounts.
   */
  getUserAccounts(): void {
    this.userAccounts$ = this._accountService
      .getAccounts()
      .pipe(map(({ data }) => data));
  }

  /**
   * Get all the categories.
   */
  getAllCategories(): void {
    this.categories$ = this._categoryService
      .getCategories()
      .pipe(map(({ data }) => data));
  }

  /**
   * Save the transaction info.
   */
  saveTransaction(): void {
    this.isSaving = true;
    const transactionRequest$ = !this.transactionId
      ? this._transactionService.createTransaction(this.transactionForm.value)
      : this._transactionService.updateTransaction(
          this.transactionId,
          this.transactionForm.value
        );

    transactionRequest$.pipe(tap(() => this.reloadData.emit())).subscribe({
      next: () => {
        this.isSaving = false;
        this._alertService.displayMessage({
          severity: 'success',
          summary: 'Transacción guardada exitosamente',
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
    this.transactionIdChange.emit('');
    this.transactionForm.reset();
  }
}
