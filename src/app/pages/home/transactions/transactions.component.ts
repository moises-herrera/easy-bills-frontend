import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TransactionService } from 'src/app/services/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { Observable, tap, map } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { Transaction, TransactionInfo, TransactionType } from 'src/models';
import { ModalTransactionComponent } from './modal-transaction/modal-transaction.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ProgressSpinnerModule,
    MenuModule,
    ModalTransactionComponent,
    ConfirmDialogModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent {
  /** Transaction service. */
  private _transactionService = inject(TransactionService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Search text. */
  search = '';

  /** List of transactions. */
  transactions$!: Observable<TransactionInfo[]>;

  /** If the data is loading. */
  isLoading = false;

  /** If the transaction modal is visible. */
  isModalVisible = false;

  /** Current transaction id selected. */
  transactionId: string = '';

  /** Options of the menu. */
  options: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        this.showTransactionModal();
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-times',
      command: () => {
        this.deleteTransaction();
      },
    },
  ];

  /**
   * Check if the type of a transaction is an income.
   *
   * @param transactionType The transaction type.
   * @returns True if is an income, false otherwise.
   */
  isIncome(transactionType: TransactionType): boolean {
    return transactionType === TransactionType.Income;
  }

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this.getTransactions();
  }

  /**
   * Get all the transactions.
   */
  getTransactions(): void {
    this.isLoading = true;
    this.transactions$ = this._transactionService
      .getTransactions()
      .pipe(tap(() => (this.isLoading = false)));
  }

  /**
   * Search transactions.
   */
  searchTransactions(): void {
    this.transactions$ = this.transactions$.pipe(
      map((transactions) =>
        transactions.filter(({ description }) =>
          description.toLowerCase().includes(this.search.toLowerCase())
        )
      )
    );
  }

  /**
   * Show the transaction modal.
   */
  showTransactionModal(): void {
    this.isModalVisible = true;
  }

  /**
   * Handle event when clicking a transaction.
   *
   * @param id The transaction id.
   */
  onClickTransaction(id: string): void {
    this.transactionId = id;
  }

  /**
   * Delete the current transaction selected.
   */
  deleteTransaction(): void {
    this._alertService.displayConfirm(() => {
      this._transactionService.deleteTransaction(this.transactionId).subscribe({
        next: () => {
          this._alertService.displayMessage({
            severity: 'success',
            summary: 'La transacción ha sido eliminada',
          });
          this.getTransactions();
        },
        error: (err: unknown) => {
          this.isLoading = false;
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
