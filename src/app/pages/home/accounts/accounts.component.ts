import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Account, FinanceAccountType } from 'src/models';
import { AccountService } from 'src/app/services/account.service';
import { TypeAccountPipe } from 'src/app/core/type-account.pipe';
import { ModalAccountComponent } from './modal-account/modal-account.component';
import { Observable, map, tap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuItem } from 'primeng/api';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NoDataComponent } from 'src/app/shared/no-data/no-data.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ProgressSpinnerModule,
    TypeAccountPipe,
    ModalAccountComponent,
    MenuModule,
    ConfirmDialogModule,
    NoDataComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  /** Account service. */
  private _accountService = inject(AccountService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** Search text. */
  search = '';

  /** List of accounts. */
  accounts$!: Observable<Account[]>;

  /** If the account modal is visible. */
  isModalVisible = false;

  /** If the data is loading. */
  isLoading = false;

  /** Current account id selected. */
  accountId: string = '';

  /** Options of the menu. */
  options: MenuItem[] = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        this.showAccountModal();
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-times',
      command: () => {
        this.deleteAccount();
      },
    },
  ];

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this.getAccounts();
  }

  /**
   * Get all the accounts.
   */
  getAccounts(): void {
    this.isLoading = true;
    this.accounts$ = this._accountService
      .getAccounts()
      .pipe(tap(() => (this.isLoading = false)));
  }

  /**
   * Search accounts.
   */
  searchAccounts(): void {
    this.accounts$ = this.accounts$.pipe(
      map((accounts) =>
        accounts.filter(({ name }) =>
          name.toLowerCase().includes(this.search.toLowerCase())
        )
      )
    );
  }

  /**
   * Show the account modal.
   */
  showAccountModal(): void {
    this.isModalVisible = true;
  }

  /**
   * Handle event when clicking a account.
   *
   * @param id The account id.
   */
  onClickAccount(id: string): void {
    this.accountId = id;
  }

  /**
   * Delete the current account selected.
   */
  deleteAccount(): void {
    this._alertService.displayConfirm(() => {
      this._accountService.deleteAccount(this.accountId).subscribe({
        next: () => {
          this._alertService.displayMessage({
            severity: 'success',
            summary: 'La cuenta ha sido eliminada',
          });
          this.getAccounts();
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

  /**
   * Check if the type of an account is bank.
   *
   * @param typeAccount The type of the account.
   * @returns True if is a bank account, false otherwise.
   */
  isBankAccount(typeAccount: FinanceAccountType): boolean {
    return FinanceAccountType.Bank === typeAccount;
  }
}
