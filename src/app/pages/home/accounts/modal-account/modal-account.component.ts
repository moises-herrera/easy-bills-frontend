import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinanceAccountType } from 'src/models';
import { ButtonModule } from 'primeng/button';
import { errorTailorImports } from '@ngneat/error-tailor';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { tap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-modal-account',
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
  ],
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.css'],
})
export class ModalAccountComponent {
  /** Set modal visibility. */
  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
    this.isVisibleChange.emit(this._isVisible);
  }

  /** Emit visibility value. */
  @Output() isVisibleChange = new EventEmitter<boolean>();

  /** Account id. */
  @Input() accountId?: string = '';

  /** Emit account id. */
  @Output() accountIdChange = new EventEmitter<string>();

  /** Emit event when it is necessary to reload the data. */
  @Output() reloadData = new EventEmitter<void>();

  /** Form builder. */
  private _fb = inject(FormBuilder);

  /** User service. */
  private _userService = inject(UserService);

  /** Account service. */
  private _accountService = inject(AccountService);

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
    return `${!this.accountId ? 'Agregar' : 'Editar'} cuenta`;
  }

  /** If the information is loading. */
  isLoading = false;

  /** If the information is being saved. */
  isSaving = false;

  /** Account form. */
  accountForm = this._fb.nonNullable.group({
    name: ['', Validators.required],
    typeAccount: [0, Validators.required],
    balance: [0, [Validators.required, Validators.min(0)]],
    userId: [this._userService.user?.id],
  });

  /** Account types. */
  accountTypes = [
    {
      label: 'Banco',
      value: FinanceAccountType.Bank,
    },
    {
      label: 'Efectivo',
      value: FinanceAccountType.Cash,
    },
  ];

  /**
   * Get account data.
   */
  getAccountData(): void {
    if (this.accountId) {
      this.isLoading = true;
      this._accountService
        .getAccountById(this.accountId)
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe({
          next: (account) => {
            this.accountForm.patchValue(account);
          },
        });
    }
  }

  /**
   * Save the account info.
   */
  saveAccount(): void {
    this.isSaving = true;
    const accountRequest$ = !this.accountId
      ? this._accountService.createAccount(this.accountForm.value)
      : this._accountService.updateAccount(
          this.accountId,
          this.accountForm.value
        );

    accountRequest$.pipe(tap(() => this.reloadData.emit())).subscribe({
      next: () => {
        this.isSaving = false;
        this._alertService.displayMessage({
          severity: 'success',
          summary: 'Cuenta guardada exitosamente',
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
    this.accountIdChange.emit('');
    this.accountForm.reset();
  }
}
